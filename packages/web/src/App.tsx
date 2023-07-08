import { ElNotification } from 'element-plus';
import 'element-plus/dist/index.css';
import { defineComponent, onBeforeUnmount, onErrorCaptured, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGlobalStore } from './utils/vue';
import { initI18n } from './infrastructure/i18n';
import { HomePage } from '~/components/homepage';
import { SocketEventType, SocketIO } from '~/infrastructure/socket-io';

function addSocketEventListeners(socketIO: SocketIO) {
  const { t } = useI18n();
  const onSocketConnectError = () => {
    ElNotification.error({
      message: t('server.connectError'),
    });
  };

  const onSocketDisconnect = (reason: string) => {
    ElNotification.error({
      message: `${t('server.disconnect')}: ${reason}`,
    });
  };

  socketIO.addSocketEventListener(
    SocketEventType.connectError,
    onSocketConnectError,
  );

  socketIO.addSocketEventListener(
    SocketEventType.disconnect,
    onSocketDisconnect,
  );

  onBeforeUnmount(() => {
    socketIO.removeSocketEventListener(
      SocketEventType.connectError,
      onSocketConnectError,
    );
    socketIO.removeSocketEventListener(
      SocketEventType.disconnect,
      onSocketDisconnect,
    );
  });
}

export default defineComponent({
  name: 'App',
  setup() {
    onErrorCaptured(e => {
      ElNotification.error({
        message: typeof e === 'string' ? e : (e as Error).message,
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
    // 尝试根据token登录
    const globalStore = getGlobalStore();
    globalStore.loginByToken().finally(() => {
      /** 不管成不成功，都进入主页 */
      isReady.value = true;
    });

    return () => {
      if (!isI18nReady.value) {
        return null;
      }
      if (!isReady.value) {
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
