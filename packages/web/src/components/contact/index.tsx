import { ElTabPane, ElTabs } from 'element-plus';
import { PropType, Ref, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ContactUnitList } from './contact-unit-list';
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
              <ContactUnitList
                contactUnitCollection={contactManager.friendCollection}
              />
            </ElTabPane>
            <ElTabPane name="groups" label={t('main.groups')}>
              <ContactUnitList
                contactUnitCollection={contactManager.groupCollection}
              />
            </ElTabPane>
          </ElTabs>
        </div>
      );
    };
  },
});
