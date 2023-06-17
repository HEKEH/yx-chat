import { ElButton, ElForm, ElFormItem, ElInput, FormInstance, FormItemRule } from "element-plus";
import { defineComponent, PropType, ref } from "vue";
import { LoginData } from "./typing";
import type { Arrayable } from "element-plus/es/utils/typescript";

const USER_NAME: keyof LoginData = 'username';
const PASSWORD: keyof LoginData = 'password';

export const LoginPage = defineComponent({
  props: {
    data: {
      type: Object as PropType<LoginData>,
      required: true,
    },
  },
  emits: {
    change: (data: LoginData) => data && typeof data === "object",
    submit: () => true,
  },
  setup(props, ctx) {
    const loginData = props.data;
    const { emit } = ctx;
    const rules: Partial<Record<keyof LoginData, Arrayable<FormItemRule>>> = {
      username: { required: true, 'message': '用户名为必填项' },
      password: [{ required: true, 'message': '密码为必填项'}],
    };
    const formRef = ref<FormInstance>();
    const onSubmit = async () => {
      try {
        await formRef.value?.validate();
        emit('submit');
      } catch (e) {
        console.warn(e);
      }
    };
    return () => (
      <ElForm model={loginData} rules={rules} ref={formRef} labelWidth="80px">
        <ElFormItem prop={USER_NAME} label="用户名">
          <ElInput
            v-model={loginData.username}
          />
        </ElFormItem>
        <ElFormItem prop={PASSWORD} label="密码">
          <ElInput
            v-model={loginData.password}
            type="password"
            autocomplete="off"
          />
        </ElFormItem>
        <ElFormItem>
          <ElButton
            type="primary"
            onClick={onSubmit}
          >登录</ElButton>
        </ElFormItem>
      </ElForm>
    );
  },
});
