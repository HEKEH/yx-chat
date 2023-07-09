import { PropType, defineComponent } from 'vue';
import { Avatar } from '../common/avatar';
import s from './ContactItem.module.sass';

export const ContactItem = defineComponent({
  name: 'ContactItem',
  props: {
    value: {
      type: Object as PropType<{
        readonly name: string;
        readonly avatar: string;
      }>,
      required: true,
    },
    isSelected: Boolean,
  },
  emits: {
    select: () => true,
  },
  setup(props, { emit }) {
    const onSelect = () => {
      emit('select');
    };
    return () => {
      const { value, isSelected } = props;
      return (
        <div
          class={{ [s['contact-item']]: true, [s.selected]: isSelected }}
          onClick={onSelect}
        >
          <Avatar url={value.avatar} class={s.avatar} />
          <div class={s.name}>{value.name}</div>
        </div>
      );
    };
  },
});
