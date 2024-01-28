import { defineComponent } from 'vue';
import { FunctionBar } from './function-bar';
import s from './index.module.sass';

export const MiddlePage = defineComponent({
  name: 'MiddlePage',
  setup(_, { slots }) {
    return () => (
      <div class={s['middle-page']}>
        <div class={s.header}>
          <FunctionBar />
        </div>
        <div class={s.body}>{slots.default?.()}</div>
      </div>
    );
  },
});
