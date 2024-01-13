import {
  UserAndGroupSearchItem,
  UserAndGroupSearchResult,
} from '@yx-chat/shared/types';
import { ElButton } from 'element-plus';
import { PropType, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { Avatar } from '~/components/common/avatar';
import s from './UserAndGroupSearchContent.module.sass';

export const SearchItem = defineComponent({
  name: 'SearchItem',
  props: {
    value: {
      type: Object as PropType<Pick<UserAndGroupSearchItem, 'name' | 'avatar'>>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { value } = props;
      const { name, avatar } = value;
      return (
        <div class={{ [s['search-item']]: true }}>
          <Avatar url={avatar} class={s.avatar} />
          <div class={s.name}>{name}</div>
        </div>
      );
    };
  },
});

const UserAndGroupSearchList = defineComponent(
  (props, { emit }) => {
    return () => {
      const { t } = useI18n();
      const { items, title } = props;
      return (
        <div class={s['search-list-container']}>
          <div class={s.title}>{title}</div>
          <div class={s['search-list']}>
            {items.map(item => (
              <div class={s['search-item-row']}>
                <SearchItem key={item.id} value={item} />
                <ElButton size="small">{t('common.add')}</ElButton>
              </div>
            ))}
          </div>
        </div>
      );
    };
  },
  {
    name: 'UserAndGroupSearchList',
    props: {
      items: {
        type: Array as PropType<UserAndGroupSearchItem[]>,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    emits: {
      click: (item: UserAndGroupSearchItem) => item && typeof item === 'object',
    },
  },
);

export const UserAndGroupSearchContent = defineComponent({
  name: 'UserAndGroupSearchContent',
  props: {
    searchResult: [Object, undefined] as PropType<
      UserAndGroupSearchResult | undefined
    >,
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    return () => {
      const { searchResult } = props;
      if (!searchResult) {
        return (
          <div class={[s['search-content'], s['is-empty']]}>
            {t('common.toFindNewFriends')}
          </div>
        );
      }
      const { users, groups } = searchResult;
      if (!users.length && !groups.length) {
        return (
          <div class={[s['search-content'], s['is-empty']]}>
            {t('common.searchNoResult')}
          </div>
        );
      }
      const searchListViews = [];
      const lists = [
        { key: 'users', title: t('main.users'), items: users },
        { key: 'groups', title: t('main.groups'), items: groups },
      ];
      for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        const { key, title, items } = list;
        if (items?.length) {
          if (searchListViews.length) {
            searchListViews.push(<hr key={`hr-${i}`} />);
          }
          searchListViews.push(
            <UserAndGroupSearchList
              key={key}
              title={title}
              items={items}
              onClick={item => {
                emit('click', item);
              }}
            />,
          );
        }
      }
      return (
        <div class={[s['search-content'], s['not-empty']]}>
          {searchListViews}
        </div>
      );
    };
  },
});
