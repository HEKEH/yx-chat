import { PropType, defineComponent } from 'vue';
import { ContactItem } from '../ContactItem';
import s from './index.module.sass';
import { FriendCollection } from '~/domain/models/contact/friend-collection';

export const FriendList = defineComponent({
  name: 'FriendList',
  props: {
    friendCollection: {
      type: Object as PropType<FriendCollection>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { friendCollection } = props;
      return (
        <div class={s['friend-list']}>
          {friendCollection.list.map(item => (
            <ContactItem
              key={item.id}
              value={item}
              isSelected={item.id === friendCollection.selectedId}
              onSelect={() => {
                friendCollection.selectById(item.id);
              }}
            />
          ))}
        </div>
      );
    };
  },
});
