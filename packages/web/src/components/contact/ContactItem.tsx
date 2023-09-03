import { PropType, defineComponent } from 'vue';
import { IContactUnit } from '~/domain/models/contact/typing';
import { Avatar } from '../common/avatar';
import s from './ContactItem.module.sass';

export const ContactItem = defineComponent({
  name: 'ContactItem',
  props: {
    value: {
      type: Object as PropType<IContactUnit>,
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
          <div class={s.container}>
            <div class={[s.row, s['name-row']]}>
              <div class={s.name}>{value.name}</div>
              <div class={s.time}>{value.displayTime}</div>
            </div>
            <div class={s.row}>
              <div class={s.message}>
                {value.latestMessageBrief ?? '暂无消息'}
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
});
