import { ElTabPane, ElTabs } from 'element-plus';
import { PropType, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { ContactManager } from '~/domain/models/contact';
import { ContactUnitList } from './contact-unit-list';
import s from './index.module.sass';

export const ContactTabs = defineComponent({
  name: 'ContactTabs',
  props: {
    contactManager: {
      type: Object as PropType<ContactManager>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    return () => {
      const { contactManager } = props;
      return (
        <div class={s['contact-tabs']}>
          <ElTabs
            type="card"
            stretch
            modelValue={contactManager.currentContactCollectionKey}
            onUpdate:modelValue={val => {
              contactManager.setContactCollectionKey(
                val as 'friends' | 'groups',
              );
            }}
          >
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
