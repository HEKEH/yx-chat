import { Search } from '@icon-park/vue-next';
import { ElButton, ElDialog, ElInput } from 'element-plus';
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import st from './AddContactButton.module.sass';
import s from './ContactAddItem.module.sass';

const ContactSearchPanel = defineComponent({
  name: 'ContactSearchPanel',
  setup() {
    const searchText = ref('');
    const { t } = useI18n();
    const onSearch = async () => {
      console.log(searchText.value, 'searchText');
    };
    return () => {
      return (
        <div class={s['search-row']}>
          <div class={s['search-input']}>
            <ElInput
              size="large"
              v-model={searchText.value}
              placeholder={t('common.searchPlaceholder2')}
              clearable
              prefix-icon={<Search />}
            />
          </div>
          <div class={s['search-button-container']}>
            <ElButton
              type="primary"
              onClick={onSearch}
              size="large"
              class={s['search-button']}
            >
              {t('common.search')}
            </ElButton>
          </div>
        </div>
      );
    };
  },
});

const AddContactDialog = defineComponent({
  props: {
    modelValue: Boolean,
  },
  emits: {
    'update:modelValue': (val: boolean) => typeof val === 'boolean',
  },
  name: 'AddContactDialog',
  setup(props, { emit }) {
    const { t } = useI18n();
    const onClose = () => {
      emit('update:modelValue', false);
    };
    return () => {
      return (
        <ElDialog
          modelValue={props.modelValue}
          title={t('main.addFriendOrGroup')}
          onClose={onClose}
          width="400px"
          align-center
          class={s.dialog}
        >
          <ContactSearchPanel />
        </ElDialog>
      );
    };
  },
});

/** Add group or friend */
export const ContactAddItem = defineComponent({
  name: 'ContactAddItem',
  setup() {
    const { t } = useI18n();
    const dialogVisible = ref(false);
    const onClick = () => {
      dialogVisible.value = true;
    };
    return () => {
      return (
        <>
          <div class={st.item} onClick={onClick}>
            {t('main.addFriendOrGroup')}
          </div>
          <AddContactDialog v-model={dialogVisible.value} />
        </>
      );
    };
  },
});
