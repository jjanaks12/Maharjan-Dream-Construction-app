declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
  interface IntrinsicElements {
    $el: HTMLElement
    [elem: string]: any
  }
}