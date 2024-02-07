import { PropType, defineComponent } from 'vue';
import { FriendAddNotificationModel } from '~/domain/models/notification/friend-add-notification';

export const FriendAddNotificationItem = defineComponent({
  name: 'FriendAddNotificationItem',
  props: {
    model: {
      type: Object as PropType<FriendAddNotificationModel>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      return 'hhh';
    };
  },
});
