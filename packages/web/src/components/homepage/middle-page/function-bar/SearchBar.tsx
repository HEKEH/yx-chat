import { Search } from '@icon-park/vue-next';
import { ElInput, ElPopover } from 'element-plus';
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { FriendModel } from '~/domain/models/contact/friend';
import { GroupModel } from '~/domain/models/contact/group';
import { getGlobalStore } from '~/utils/vue';
import { SearchContent } from './SearchContent';
import s from './SearchBar.module.sass';

export const SearchBar = defineComponent({
  name: 'SearchBar',
  setup() {
    const { t } = useI18n();
    const globalStore = getGlobalStore();
    const searchText = ref<string>('');
    const isPopoverVisible = ref<boolean>(false);
    const searchResult = computed(() =>
      searchText.value
        ? globalStore.contactManager.findByText(searchText.value)
        : null,
    );
    const onSelectContact = (contact: FriendModel | GroupModel) => {
      globalStore.selectContactInCurrentMenu(contact);
    };
    return () => {
      const input = (
        <ElInput
          class={s['search-bar-input']}
          size="large"
          v-model={searchText.value}
          clearable
          prefix-icon={<Search />}
          placeholder={t('common.searchPlaceholder')}
          onFocus={() => {
            isPopoverVisible.value = true;
          }}
          onBlur={() => {
            isPopoverVisible.value = false;
          }}
        />
      );
      return (
        <div class={s['search-bar']}>
          <ElPopover
            visible={isPopoverVisible.value && Boolean(searchText.value)}
            placement="bottom-start"
            popper-style={{
              padding: '0',
              transform: 'translateX(-12px)',
            }}
            width="auto"
            showArrow={false}
            v-slots={{
              reference: () => input,
            }}
            offset={8}
          >
            <SearchContent
              searchResult={searchResult.value}
              onClick={onSelectContact}
            />
          </ElPopover>
        </div>
      );
    };
  },
});
