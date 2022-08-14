import { CSSProperties, defineComponent, PropType, ref } from "vue";
import { HelloWorld } from "./components/HelloWorld";
import s from "./App.module.sass";
import vueImg from "./assets/vue.svg";
import { fetch } from "./infrastructure/socketFetch";

fetch();
export default defineComponent({
  // emits: ["tileClick"],
  setup(props, ctx) {
    return () => (
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class={s.logo} alt="Vite logo" />
          </a>
          <a href="https://vuejs.org/" target="_blank">
            <img src={vueImg} class={[s.logo, s.vue]} alt="Vue logo" />
          </a>
        </div>
        <HelloWorld
          msg="Vite + Vue"
          onTileClick={(count: number) => {
            console.log("tile Click", count);
          }}
        />
      </>
    );
  },
});
