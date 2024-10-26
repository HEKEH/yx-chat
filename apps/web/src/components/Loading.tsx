import { defineComponent } from 'vue';
import s from './Loading.module.sass';
import LoadingSvg from '@/assets/icons/loading.svg';

const Loading = defineComponent({
  name: 'LoadingIcon',
  inheritAttrs: false,
  props: {
    size: {
      type: Number,
      default: 16,
    },
  },
  setup(props, { attrs }) {
    return () => (
      <LoadingSvg
        class={s.icon}
        width={props.size}
        height={props.size}
        {...(attrs as Record<string, unknown>)}
      />
    );
  },
});
export default Loading;
