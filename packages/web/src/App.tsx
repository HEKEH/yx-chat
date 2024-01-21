import { ElNotification } from 'element-plus';
import 'element-plus/dist/index.css';
import { defineComponent, onBeforeUnmount, onErrorCaptured, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { HomePage } from '~/components/homepage';
import { SocketEventType, SocketIO } from '~/infra/socket-io';
import { initI18n } from './infra/i18n';
import { provideGlobalStore } from './utils/vue';

function addSocketEventListeners(socketIO: SocketIO) {
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
    socketIO.addSocketEventListener(
      SocketEventType.connectError,
      onSocketConnectError,
    ),
    socketIO.addSocketEventListener(
      SocketEventType.disconnect,
      onSocketDisconnect,
    ),
  ];

  onBeforeUnmount(() => {
    subscriptions.forEach(subscription => subscription.unsubscribe());
  });
}

export default defineComponent({
  name: 'App',
  setup() {
    onErrorCaptured(e => {
      ElNotification.error({
        message: t(typeof e === 'string' ? e : (e as Error).message),
      });
      console.error(e);
      return false;
    });

    const isI18nReady = ref(false);
    initI18n().then(() => {
      isI18nReady.value = true;
    });
    const { t } = useI18n();

    const socketIO = SocketIO.instance;
    addSocketEventListeners(socketIO);
    socketIO.connect(); // socket连接
    onBeforeUnmount(() => {
      // socket断开连接
      socketIO.disconnect();
    });

    const isReady = ref(false);
    const globalStore = provideGlobalStore();
    // 尝试根据token登录
    globalStore.loginByToken().finally(() => {
      // 不管成不成功，都进入主页
      isReady.value = true;
    });

    return () => {
      if (!isI18nReady.value) {
        return null;
      }
      if (!isReady.value) {
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
