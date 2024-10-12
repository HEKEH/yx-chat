import { CSSProperties, PropType, defineComponent } from 'vue';
import { ElButton, ElPopover } from 'element-plus';
import { Plus } from '@icon-park/vue-next';
import { getGlobalStore } from '~/utils/vue';
import { useI18n } from 'vue-i18n';
import s from './AddContactButton.module.sass';
import { GroupCreateItem } from './GroupCreateItem';
import { ContactAddItem } from './ContactAddItem';

export const AddContactButton = defineComponent({
  name: 'AddContactButton',
  props: {
    buttonStyle: Object as PropType<CSSProperties>,
  },
  setup(props) {
    const globalStore = getGlobalStore();
    const { t } = useI18n();
    return () => {
      return (
        <ElPopover
          trigger="click"
          placement="bottom-start"
          popperStyle={{
            padding: '10px',
            width: '140px',
            minWidth: '140px',
          }}
          showArrow={false}
          v-slots={{
            reference: () => (
              <ElButton class={s.button} style={props.buttonStyle}>
                <Plus
                  theme="outline"
                  size="24"
                  fill={globalStore.themeManager.getThemeColor(0.6)}
                />
              </ElButton>
            ),
          }}
          offset={8}
          hideAfter={0}
        >
          <GroupCreateItem />
          <ContactAddItem />
        </ElPopover>
      );
    };
  },
});
