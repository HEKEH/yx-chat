import { PropType, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { FriendModel } from '~/domain/models/contact/friend';
import { GroupModel } from '~/domain/models/contact/group';
import { ContactItem } from '../contact-tabs/ContactItem';
import s from './SearchContent.module.sass';

const SearchContactList = defineComponent(
  (props, { emit }) => {
    return () => {
      const { contacts, title } = props;
      return (
        <>
          <div class={s.title}>{title}</div>
          <div class={s['contact-list']}>
            {contacts.map(item => (
              <ContactItem
                key={item.id}
                class={s['contact-item']}
                value={item}
                onSelect={() => {
                  emit('click', item);
                }}
              />
            ))}
          </div>
        </>
      );
    };
  },
  {
    name: 'SearchContactList',
    props: {
      contacts: {
        type: Array as PropType<(FriendModel | GroupModel)[]>,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    emits: {
      click: (contact: FriendModel | GroupModel) =>
        contact && typeof contact === 'object',
    },
  },
);

export const SearchContent = defineComponent({
  name: 'SearchContent',
  props: {
    searchResult: {
      type: [Object, null] as PropType<{
        friends: FriendModel[];
        groups: GroupModel[];
      } | null>,
      required: true,
    },
  },
  emits: {
    click: (contact: FriendModel | GroupModel) =>
      contact && typeof contact === 'object',
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    return () => {
      const { friends, groups } = props.searchResult || {};
      const isEmpty = !friends?.length && !groups?.length;
      if (isEmpty) {
        return (
          <div class={[s['search-content'], s['is-empty']]}>
            {t('common.searchNoResult')}
          </div>
        );
      }
      const searchContactLists = [];
      const items = [
        { key: 'friends', title: t('main.friends'), contacts: friends },
        { key: 'groups', title: t('main.groups'), contacts: groups },
      ];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const { key, title, contacts } = item;
        if (contacts?.length) {
          if (searchContactLists.length) {
            searchContactLists.push(<hr key={`hr-${i}`} />);
          }
          searchContactLists.push(
            <SearchContactList
              key={key}
              title={title}
              contacts={contacts}
              onClick={contact => {
                emit('click', contact);
              }}
            />,
          );
        }
      }
      return <div class={s['search-content']}>{searchContactLists}</div>;
    };
  },
});
