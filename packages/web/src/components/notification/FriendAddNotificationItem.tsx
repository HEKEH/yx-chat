import { PropType, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { FriendAddNotificationModel } from '~/domain/models/notification/friend-add-notification';
import { ElButton, ElDialog, ElPopconfirm } from 'element-plus';
import { Avatar } from '../common/avatar';
import s from './FriendAddNotificationItem.module.sass';

export const FriendAddNotificationItem = defineComponent({
  name: 'FriendAddNotificationItem',
  props: {
    model: {
      type: Object as PropType<FriendAddNotificationModel>,
      required: true,
    },
    remove: {
      type: Function as PropType<
        (model: FriendAddNotificationModel) => Promise<void>
      >,
      required: true,
    },
  },
  setup(props, { expose }) {
    const { t } = useI18n();
    const isDialogOpen = ref(false);

    expose({
      click: () => {
        isDialogOpen.value = true;
      },
    });

    const onClose = () => {
      isDialogOpen.value = false;
    };
    const onReject = async () => {
      await props.remove(props.model);
      onClose();
    };
    return () => {
      const { model } = props;
      return (
        <>
          <div class={s['friend-add-notification']}>
            <Avatar class={s.avatar} url={model.from.avatar} />
            <div class={s.username}>{model.from.username}</div>
            <div class={s.message}>{t('common.addYouAsFriend')}</div>
          </div>
          <ElDialog
            modelValue={isDialogOpen.value}
            onClose={onClose}
            width="300px"
            align-center
            appendToBody
            class={s.dialog}
          >
            <div class={s['dialog-text']}>
              {t('main.whetherAcceptFriend', {
                username: model.from.username,
              })}
            </div>
            <div class={s['button-group']}>
              <ElPopconfirm
                v-slots={{
                  reference: () => <ElButton>{t('common.reject')}</ElButton>,
                }}
                title={t('common.confirm', { text: t('common.reject') })}
                onConfirm={onReject}
              ></ElPopconfirm>
              <ElButton
                type="primary"
                // onClick={onReject}
                class={s['agree-button']}
              >
                {t('common.agree')}
              </ElButton>
            </div>
          </ElDialog>
        </>
      );
    };
  },
});
