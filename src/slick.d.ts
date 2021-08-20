declare module 'vue-slick' {
    import 'vue-slick';
    import { ComponentRenderProxy } from '@vue/composition-api';
  
    interface Props {
      arrows: boolean;
      dots: boolean;
      dotsClass: string;
      // ...
    }
  
    interface VueSlick {
      new (): ComponentRenderProxy<Props>;
    }
  
    const vueSlick: VueSlick;
    export = vueSlick;
  }