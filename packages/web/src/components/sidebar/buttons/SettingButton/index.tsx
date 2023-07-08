import { SettingTwo } from '@icon-park/vue-next';
import { ElDialog, ElTabPane, ElTabs, ElTooltip } from 'element-plus';
import { Ref, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import u from '../style.module.sass';
import { GeneralPanel } from './GeneralPanel';
import { ThemePanel } from './ThemePanel';
import s from './index.module.sass';

export const SettingButton = defineComponent({
  name: 'SettingButton',
  setup() {
    const showDialog = ref(false);
    const activeTab: Ref<'general' | 'theme'> = ref('general');
    const { t } = useI18n();
    return () => {
      return (
        <>
          <ElTooltip
            effect="dark"
            content={t('common.setting')}
            placement="right"
          >
            <SettingTwo
              theme="outline"
              class={u.button}
              strokeWidth={3}
              onClick={() => {
                showDialog.value = true;
              }}
            />
          </ElTooltip>
          <ElDialog v-model={showDialog.value} width="450px" class={s.dialog}>
            <ElTabs v-model={activeTab.value}>
              <ElTabPane name="general" label={t('setting.general')}>
                <GeneralPanel />
              </ElTabPane>
              <ElTabPane name="theme" label={t('setting.theme')}>
                <ThemePanel />
              </ElTabPane>
            </ElTabs>
          </ElDialog>
        </>
      );
    };
  },
});
