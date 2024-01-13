import { PropType, defineComponent } from 'vue';
import { IContactUnit } from '~/domain/models/contact/typing';
import { IUser } from '~/domain/models/typing';
import { Avatar } from '../../../common/avatar';
import s from './ContactItem.module.sass';

export const ContactItem = defineComponent({
  name: 'ContactItem',
  props: {
    value: {
      type: Object as PropType<
        Pick<IUser, 'name' | 'avatar'> &
          Partial<
            Pick<IContactUnit, 'displayTime' | 'latestMessageBrief' | 'unread'>
          >
      >,
      required: true,
    },
    isSelected: Boolean,
    showMessage: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    select: () => true,
  },
  setup(props, { emit }) {
    const onSelect = () => {
      emit('select');
    };
    return () => {
      const { value, isSelected, showMessage } = props;
      const { name, avatar, displayTime, latestMessageBrief, unread } = value;
      return (
        <div
          class={{ [s['contact-item']]: true, [s.selected]: isSelected }}
          onClick={onSelect}
        >
          <Avatar url={avatar} class={s.avatar} />
          <div class={s.container}>
            <div class={[s.row, s['name-row']]}>
              <div class={s.name}>{name}</div>
              {displayTime && (
                <div class={s.time}>{displayTime.toBriefFormat()}</div>
              )}
            </div>
            <div class={s.row}>
              {showMessage && (
                <div class={s.message}>{latestMessageBrief ?? '暂无消息'}</div>
              )}
              {unread ? (
                <div class={s.unread}>{unread > 99 ? '99+' : unread}</div>
              ) : undefined}
            </div>
          </div>
        </div>
      );
    };
  },
});
