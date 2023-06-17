import { CSSProperties, defineComponent, PropType, ref } from 'vue';
import s from './HelloWorld.module.sass';

export const HelloWorld = defineComponent({
  props: {
    msg: {
      type: String, // as PropType<String>
      required: true,
    },
    // onTileClick: {
    //   required: true,
    // },
  },
  emits: {
    tileClick: (count: number) => typeof count === 'number',
  },
  setup(props, { slots, emit }) {
    const count = ref(1);
    return () => (
      <>
        <h1 class={s.msg}>{props.msg}</h1>

        <div class="card">
          <button
            type="button"
            onClick={() => {
              count.value++;
              emit('tileClick', count.value);
            }}
          >
            count is {count.value}
          </button>
          <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
          </p>
        </div>

        <p>
          Check out
          <a
            href="https://vuejs.org/guide/quick-start.html#local"
            target="_blank"
          >
            create-vue
          </a>
          , the official Vue + Vite starter
        </p>
        <p>
          Install
          <a href="https://github.com/johnsoncodehk/volar" target="_blank">
            Volar
          </a>
          in your IDE for a better DX
        </p>
        <p class={s['read-the-docs']}>
          Click on the Vite and Vue logos to learn more
        </p>
      </>
    );
  },
});
