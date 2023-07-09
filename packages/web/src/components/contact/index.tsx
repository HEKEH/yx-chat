import { PropType, Ref, defineComponent, ref } from 'vue';
import { ElTabPane, ElTabs } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { FriendList } from './friend-list';

import s from './index.module.sass';
import { ContactManager } from '~/domain/models/contact';

export const ContactTabs = defineComponent({
  name: 'ContactTabs',
  props: {
    contactManager: {
      type: Object as PropType<ContactManager>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const activeTab: Ref<'friends' | 'groups'> = ref('friends');
      const { t } = useI18n();
      const { contactManager } = props;
      return (
        <div class={s['contact-tabs']}>
          <ElTabs type="card" stretch v-model={activeTab.value}>
            <ElTabPane name="friends" label={t('main.friends')}>
              <FriendList friendCollection={contactManager.friendCollection} />
            </ElTabPane>
            <ElTabPane name="groups" label={t('main.groups')}>
              {/* <ThemePanel /> */}
            </ElTabPane>
          </ElTabs>
        </div>
      );
    };
  },
});
