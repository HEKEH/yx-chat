import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  FormInstance,
} from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGlobalStore } from '~/utils/vue';
import st from './AddContactButton.module.sass';
import s from './GroupCreateItem.module.sass';

const GroupNameInput = defineComponent({
  emits: {
    submit: (val: string) => typeof val === 'string',
  },
  name: 'GroupNameInput',
  setup(_, { emit }) {
    const model = reactive({
      groupName: '',
    });
    const { t } = useI18n();
    const formRef = ref<FormInstance>();
    const onSubmit = async () => {
      try {
        await formRef.value?.validate();
        emit('submit', model.groupName);
      } catch (e) {
        console.warn(e);
      }
    };
    return () => {
      return (
        <ElForm ref={formRef} model={model}>
          <ElFormItem
            rules={[
              { required: true, message: t('validate.required') },
              { max: 20, message: t('validate.maxLength', { len: 20 }) },
              {
                validator: (_, val, cb) => {
                  if (val.includes(' ')) {
                    return cb(t('validate.noWhitespace'));
                  }
                  cb();
                },
              },
            ]}
            prop="groupName"
          >
            <ElInput
              v-model={model.groupName}
              placeholder={t('main.inputGroupName')}
            />
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" onClick={onSubmit}>
              {t('common.create')}
            </ElButton>
          </ElFormItem>
        </ElForm>
      );
    };
  },
});

const CreateGroupDialog = defineComponent({
  props: {
    modelValue: Boolean,
  },
  emits: {
    'update:modelValue': (val: boolean) => typeof val === 'boolean',
  },
  name: 'CreateGroupDialog',
  setup(props, { emit }) {
    const { t } = useI18n();
    const globalStore = getGlobalStore();
    const onClose = () => {
      emit('update:modelValue', false);
    };
    const onSubmit = async (groupName: string) => {
      await globalStore.createGroup(groupName);
      onClose();
    };
    return () => {
      return (
        <ElDialog
          modelValue={props.modelValue}
          title={t('main.createGroup')}
          onClose={onClose}
          width="400px"
          align-center
          class={s.dialog}
        >
          <GroupNameInput onSubmit={onSubmit} />
        </ElDialog>
      );
    };
  },
});

/** 创建群组 */
export const GroupCreateItem = defineComponent({
  name: 'GroupCreateItem',
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
            {t('main.createGroup')}
          </div>
          <CreateGroupDialog v-model={dialogVisible.value} />
        </>
      );
    };
  },
});
