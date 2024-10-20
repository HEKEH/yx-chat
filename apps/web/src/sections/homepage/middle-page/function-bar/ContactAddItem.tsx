import {
  UserAndGroupSearchItem,
  UserAndGroupSearchResult,
} from '@yx-chat/shared/types';
import { ElButton, ElDialog, ElInput, ElMessage } from 'element-plus';
import { Ref, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGlobalStore } from '~/utils/vue';
import st from './AddContactButton.module.sass';
import s from './ContactAddItem.module.sass';
import { UserAndGroupSearchContent } from './UserAndGroupSearchContent';
import Search from '@/assets/icons/search.svg';

const ContactSearchRow = defineComponent({
  name: 'ContactSearchRow',
  emits: {
    search: (val: string) => typeof val === 'string',
  },
  setup(_, { emit }) {
    const searchText = ref('');
    const { t } = useI18n();
    const onSearch = async () => {
      emit('search', searchText.value);
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
              prefix-icon={
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '18px',
                  }}
                >
                  <Search />
                </span>
              }
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

const ContactSearchPanel = defineComponent({
  name: 'ContactSearchPanel',
  emits: {
    finish: () => true,
  },
  setup(_, { emit }) {
    const { t } = useI18n();
    const globalStore = getGlobalStore();
    const searchResult: Ref<UserAndGroupSearchResult | undefined> = ref();
    const onSearch = async (searchText: string) => {
      if (!searchText) {
        searchResult.value = undefined;
        return;
      }
      const resp = await globalStore.searchUsersAndGroups(searchText);
      searchResult.value = resp;
    };
    const onAddItem = async (
      type: 'groups' | 'users',
      item: UserAndGroupSearchItem,
    ) => {
      if (type === 'groups') {
        await globalStore.joinGroup(item.id);
      } else {
        const res = await globalStore.sendFriendAddRequest(item.id);
        if (!res.success) {
          ElMessage.error(t(res.message));
          return;
        }
        ElMessage.success(t('common.sendFriendRequestSuccess'));
      }
      emit('finish');
    };
    return () => {
      return (
        <div class={s['search-panel']}>
          <ContactSearchRow onSearch={onSearch} />
          <UserAndGroupSearchContent
            onAddItem={onAddItem}
            searchResult={searchResult.value}
          />
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
          destroyOnClose
        >
          <ContactSearchPanel onFinish={onClose} />
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
