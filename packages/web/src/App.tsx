import { ElNotification } from 'element-plus';
import 'element-plus/dist/index.css';
import { defineComponent, onBeforeUnmount, onErrorCaptured, ref } from 'vue';
import { Homepage } from '~/components/homepage';
import { SocketEventType, SocketIO } from '~/infrastructure/socketIO/SocketIO';

export default defineComponent({
  setup() {
    const isReady = ref(false);

    const onSocketConnectError = () => {
      ElNotification.error({
        message: '服务器连接失败',
      });
    };

    const socketIO = SocketIO.instance;

    socketIO.addSocketEventListener(
      SocketEventType.connectError,
      onSocketConnectError,
    );
    // socket连接
    socketIO.connect();
    socketIO.onReady(() => {
      isReady.value = true;
    });

    onBeforeUnmount(() => {
      socketIO.removeSocketEventListener(
        SocketEventType.connectError,
        onSocketConnectError,
      );
      // socket断开连接
      socketIO.disconnect();
    });

    onErrorCaptured(e => {
      ElNotification.error({
        message: typeof e === 'string' ? e : (e as Error).message,
      });
      console.error(e);
      return false;
    });

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
