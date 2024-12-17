import { ElNotification } from 'element-plus';
import { defineComponent, onBeforeUnmount, onErrorCaptured, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { SocketEventType, SocketIO } from '~/infra/socket-io';
import { HomePage } from '~/sections/homepage';
import { initI18n as _initI18n } from './infra/i18n';
import { provideGlobalStore } from './utils/vue';
import 'element-plus/dist/index.css';

function initI18n() {
  const isI18nReady = ref(false);
  _initI18n().then(() => {
    isI18nReady.value = true;
  });
  const { t } = useI18n();
  return {
    isI18nReady,
    t,
  };
}

function initSocketIO() {
  const addSocketEventListeners = (_socketIO: SocketIO) => {
    const { t } = useI18n();
    const onSocketConnectError = () => {
      ElNotification.error({
        message: t('server.connectError'),
      });
    };

    const onSocketDisconnect = (reason: string) => {
      ElNotification.error({
        message: `${t('server.disconnect')}: ${t(reason)}`,
      });
    };

    const subscriptions = [
      _socketIO.addSocketEventListener(
        SocketEventType.connectError,
        onSocketConnectError,
      ),
      _socketIO.addSocketEventListener(
        SocketEventType.disconnect,
        onSocketDisconnect,
      ),
    ];

    onBeforeUnmount(() => {
      subscriptions.forEach(subscription => subscription.unsubscribe());
    });
  };
  const socketIO = SocketIO.instance;
  addSocketEventListeners(socketIO);
  socketIO.connect(); // socket连接
  onBeforeUnmount(() => {
    // socket断开连接
    socketIO.disconnect();
  });
}

function initGlobalStore() {
  const isGlobalStoreReady = ref(false);
  const globalStore = provideGlobalStore();
  // 尝试根据token登录
  globalStore.loginByToken().finally(() => {
    // 不管成不成功，都进入主页
    isGlobalStoreReady.value = true;
  });
  return {
    isGlobalStoreReady,
    globalStore,
  };
}

export default defineComponent({
  name: 'App',
  setup() {
    const { isI18nReady, t } = initI18n();

    onErrorCaptured(e => {
      ElNotification.error({
        message: t(typeof e === 'string' ? e : (e as Error).message),
      });
      console.error(e);
      return false;
    });
    initSocketIO();

    const { isGlobalStoreReady } = initGlobalStore();

    return () => {
      if (!isI18nReady.value) {
        return null;
      }
      if (!isGlobalStoreReady.value) {
        // loading
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
            v-loading="loading"
            element-loading-text={`${t('common.loading')}...`}
          />
        );
      }
      return <HomePage />;
    };
  },
});
