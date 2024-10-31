import { ElImage } from 'element-plus';
import { PropType, defineComponent } from 'vue';
import { FileDraftItem } from '~/domain/models/chat/massage-draft/file-draft-item';
import commonS from './Common.module.sass';
import s from './FileDraftInput.module.sass';
import Close from '@/assets/icons/close.svg';

export const FileDraftInput = defineComponent({
  name: 'FileDraftInput',
  components: {
    ElImage,
  },
  props: {
    item: {
      type: Object as PropType<FileDraftItem>,
      required: true,
    },
  },
  emits: {
    delete: (item: FileDraftItem) => typeof item === 'object',
  },
  setup(props, { emit }) {
    return () => {
      return (
        <div class={s['file-wrapper']} onClick={e => e.stopPropagation()}>
          <div class={s.filename}>{props.item.filename}</div>
          {props.item.errorMsg ? (
            <span class={commonS.error}>{`(${props.item.errorMsg})`}</span>
          ) : null}
          <div
            class="delete-icon"
            onClick={() => {
              emit('delete', props.item);
            }}
          >
            <Close width={12} height={12} />
          </div>
        </div>
      );
    };
  },
});
