import { PropType, defineComponent } from 'vue';
import { ContactItem } from '../ContactItem';
import s from './index.module.sass';
import { ContactUnitCollection } from '~/domain/models/contact/contact-unit-collection';

export const ContactUnitList = defineComponent({
  name: 'ContactUnitList',
  props: {
    contactUnitCollection: {
      type: Object as PropType<ContactUnitCollection>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { contactUnitCollection } = props;
      return (
        <div class={s.list}>
          {contactUnitCollection.list.map(item => (
            <ContactItem
              key={item.id}
              value={item}
              isSelected={item.id === contactUnitCollection.selectedId}
              onSelect={() => {
                contactUnitCollection.selectById(item.id);
              }}
            />
          ))}
        </div>
      );
    };
  },
});
