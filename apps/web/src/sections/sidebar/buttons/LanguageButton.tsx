import { LANGUAGE } from '@yx-chat/shared/constants';
import { ElPopover, ElTooltip } from 'element-plus';
import { defineComponent, ref } from 'vue';
import { LanguageSelect } from '~/components/LanguageSelect';
import i18n from '~/infra/i18n';
import s from './style.module.sass';

export const LanguageButton = defineComponent({
  name: 'LanguageButton',
  setup() {
    const buttonRef = ref<HTMLElement | null>(null);
    const popoverVisible = ref(false);

    return () => {
      const lang = i18n.global.locale.value;
      return (
        <>
          <ElPopover
            visible={popoverVisible.value}
            onUpdate:visible={val => {
              popoverVisible.value = val;
            }}
            trigger="click"
            placement="right-start"
            virtual-ref={buttonRef.value}
            virtual-triggering
            popperStyle={{
              padding: '10px',
              width: 'fit-content',
              minWidth: 'unset',
            }}
            showArrow={false}
            offset={6}
            hideAfter={0}
          >
            <LanguageSelect
              direction="vertical"
              onSelect={() => {
                popoverVisible.value = false;
              }}
            />
          </ElPopover>

          <ElTooltip effect="dark" content="Language" placement="right">
            <div ref={buttonRef} class={[s.button, s.language]}>
              {lang === LANGUAGE.ZH_CN ? '中' : 'En'}
            </div>
          </ElTooltip>
        </>
      );
    };
  },
});
