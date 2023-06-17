
import { defineComponent, reactive } from "vue";
import { LoginPage } from "./LoginPage";
import { LoginData } from "./typing";

export const Login = defineComponent({
  setup(props, ctx) {
    const userInfo = reactive<LoginData>({
        username: '',
        password: '',
    });
    const onLogin = async () => {
        console.log(userInfo);
    };
    return () => (
      <LoginPage data={userInfo} onSubmit={onLogin} />
    );
  },
});
