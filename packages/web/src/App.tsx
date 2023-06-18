import { ElNotification } from 'element-plus';
import 'element-plus/dist/index.css';
import { defineComponent } from 'vue';
import { Homepage } from '~/components/homepage';
import { SocketIO } from '~/infrastructure/socketIO/SocketIO';

export default defineComponent({
  beforeCreate() {
    // socket连接
    SocketIO.instance.connect();
  },
  beforeUnmount() {
    // socket断开连接
    SocketIO.instance.disconnect();
  },
  errorCaptured(e) {
    ElNotification.error({
      message: typeof e === 'string' ? e : (e as Error).message,
    });
    console.error(e);
    return false;
  },
  setup(props, ctx) {
    return () => (
      <>
        <Homepage />
      </>
    );
  },
});
