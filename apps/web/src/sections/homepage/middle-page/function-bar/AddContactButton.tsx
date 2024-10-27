import { CSSProperties, PropType, defineComponent } from 'vue';
import { ElButton, ElPopover } from 'element-plus';
import s from './AddContactButton.module.sass';
import { GroupCreateItem } from './GroupCreateItem';
import { ContactAddItem } from './ContactAddItem';
import Plus from '@/assets/icons/plus.svg';

export const AddContactButton = defineComponent({
  name: 'AddContactButton',
  props: {
    buttonStyle: Object as PropType<CSSProperties>,
  },
  setup(props) {
    return () => {
      return (
        <ElPopover
          trigger="click"
          placement="bottom-start"
          popperStyle={{
            padding: '10px',
            width: 'fit-content',
            minWidth: '140px',
          }}
          showArrow={false}
          v-slots={{
            reference: () => (
              <ElButton class={s.button} style={props.buttonStyle}>
                <Plus stroke="var(--primary-color-6)" />
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
