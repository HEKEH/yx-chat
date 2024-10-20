import { defineComponent, ref } from 'vue';
import { getGlobalStore } from '~/utils/vue';
import { ElTooltip } from 'element-plus';
import { Avatar } from '../../components/avatar';
import s from './index.module.sass';
import { HighButtons } from './buttons/HighButtons';
import { LowButtons } from './buttons/LowButtons';

export const Sidebar = defineComponent({
  name: 'MainSidebar',
  setup() {
    const globalStore = getGlobalStore();
    const showUserEditInfoPanel = ref<boolean>(false);
    return () => {
      const { self } = globalStore;
      const avatar = self.avatar;
      return (
        <div class={s.sidebar}>
          <div class={s['avatar-container']}>
            <ElTooltip effect="dark" content={self.name} placement="right">
              <Avatar
                url={avatar}
                onClick={() => (showUserEditInfoPanel.value = true)}
              />
            </ElTooltip>
          </div>
          <div class={s['buttons-container']}>
            <div class={s['high-buttons-container']}>
              {self.hasLogged && <HighButtons />}
            </div>
            <div class={s['low-buttons-container']}>
              <LowButtons />
            </div>
          </div>
        </div>
      );
    };
  },
});
