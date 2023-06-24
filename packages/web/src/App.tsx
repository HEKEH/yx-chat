import { ElNotification } from 'element-plus';
import 'element-plus/dist/index.css';
import { defineComponent, onBeforeUnmount, onErrorCaptured, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getServices } from './utils/vue';
import { Homepage } from '~/components/homepage';
import { SocketEventType, SocketIO } from '~/infrastructure/socketIO';

function addSocketEventListeners() {
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

  const socketIO = SocketIO.instance;

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
  setup() {
    onErrorCaptured(e => {
      ElNotification.error({
        message: typeof e === 'string' ? e : (e as Error).message,
      });
      console.error(e);
      return false;
    });

    addSocketEventListeners();

    const isReady = ref(false);

    const socketIO = SocketIO.instance;

    // socket连接
    socketIO.connect();
    socketIO.onReady(() => {
      isReady.value = true;
    });

    onBeforeUnmount(() => {
      // socket断开连接
      socketIO.disconnect();
    });

    // 尝试根据token登录
    const services = getServices();
    services.account.loginByToken();

    return () => {
      return isReady.value ? (
        <Homepage />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
          v-loading="loading"
          element-loading-text="Loading..."
        />
      );
    };
  },
});
