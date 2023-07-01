import { defineComponent } from 'vue';
import s from './index.module.sass';

export const Avatar = defineComponent({
  props: {
    url: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    return () => {
      const { url } = props;
      if (!url) {
        return null;
      }
      return <img class={s.avatar} src={url}></img>;
    };
  },
});
