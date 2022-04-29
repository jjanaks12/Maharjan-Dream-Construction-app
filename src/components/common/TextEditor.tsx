import { VNode } from 'vue/types/umd'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

@Component({
    components: { 'editor-content': EditorContent }
})
export default class TextEditor extends Vue {
    private editor: Editor = new Editor({
        extensions: [StarterKit],
        parseOptions: {
            preserveWhitespace: 'full'
        },
        onUpdate: () => {
            this.$emit('input', this.editor.getHTML())
        }
    })

    constructor(prop: any) {
        super(prop)
    }

    @Prop({ required: true, default: '' }) value!: string
    @Prop({ default: false }) invalid!: boolean
    @Prop({ default: '150px' }) minHeight!: string

    mounted() {
        this.$nextTick(() => {
            this.editor.commands.setContent(this.value)
        })
    }

    render(): VNode {
        return (<div class={{ 'editor': true, 'editor--invalid': this.invalid }}>
            <div class="editor__action">
                <button type="button" class="font-bold" onClick={() => this.editor.chain().focus().toggleBold().run()}>B</button>
                <button type="button" class="italic" onClick={() => this.editor.chain().focus().toggleItalic().run()}>I</button>
                <button type="button" class="line-through" onClick={() => this.editor.chain().focus().toggleStrike().run()}>S</button>
                <div class="btn__group">
                    <button type="button" onClick={() => this.editor.chain().focus().setHeading({ level: 1 }).run()}>h1</button>
                    <button type="button" onClick={() => this.editor.chain().focus().setHeading({ level: 2 }).run()}>h2</button>
                    <button type="button" onClick={() => this.editor.chain().focus().setHeading({ level: 3 }).run()}>h3</button>
                    <button type="button" onClick={() => this.editor.chain().focus().setHeading({ level: 4 }).run()}>h4</button>
                    <button type="button" onClick={() => this.editor.chain().focus().setHeading({ level: 5 }).run()}>h5</button>
                    <button type="button" onClick={() => this.editor.chain().focus().setHeading({ level: 6 }).run()}>h6</button>
                </div>
                <button type="button" onClick={() => this.editor.chain().focus().toggleBulletList().run()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="2" cy="4" r="2" />
                        <circle cx="2" cy="12" r="2" />
                        <circle cx="2" cy="20" r="2" />
                        <path d="m8 5h15c.553 0 1-.447 1-1s-.447-1-1-1h-15c-.553 0-1 .447-1 1s.447 1 1 1z" />
                        <path d="m23 11h-15c-.553 0-1 .447-1 1s.447 1 1 1h15c.553 0 1-.447 1-1s-.447-1-1-1z" />
                        <path d="m23 19h-15c-.553 0-1 .447-1 1s.447 1 1 1h15c.553 0 1-.447 1-1s-.447-1-1-1z" />
                    </svg>
                </button>
                <button type="button" onClick={() => this.editor.chain().focus().toggleOrderedList().run()}>
                    <svg viewBox="0 -10 490.66667 490" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m48 171h-32c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h32c2.945312 0 5.332031 2.390625 5.332031 5.332031v5.335938c0 2.941406-2.386719 5.332031-5.332031 5.332031h-10.667969c-20.585937 0-37.332031 16.746094-37.332031 37.332031v26.667969c0 8.832031 7.167969 16 16 16h53.332031c8.832031 0 16-7.167969 16-16s-7.167969-16-16-16h-37.332031v-10.667969c0-2.941406 2.390625-5.332031 5.332031-5.332031h10.667969c20.585938 0 37.332031-16.746094 37.332031-37.332031v-5.335938c0-20.585937-16.746093-37.332031-37.332031-37.332031zm0 0" /><path d="m48 341.667969h-32c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h32c2.945312 0 5.332031 2.386719 5.332031 5.332031v5.332031c0 2.945313-2.386719 5.335938-5.332031 5.335938h-21.332031c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h21.332031c2.945312 0 5.332031 2.386719 5.332031 5.332031v5.332031c0 2.945313-2.386719 5.335938-5.332031 5.335938h-32c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h32c20.585938 0 37.332031-16.746094 37.332031-37.335938v-5.332031c0-7.9375-2.539062-15.273438-6.78125-21.332031 4.242188-6.058594 6.78125-13.398438 6.78125-21.335938v-5.332031c0-20.585938-16.746093-37.332031-37.332031-37.332031zm0 0" /><path d="m16 32.332031h16v80c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-96c0-8.832031-7.167969-16-16-16h-32c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16zm0 0" /><path d="m149.332031 85.667969h320c11.796875 0 21.335938-9.539063 21.335938-21.335938s-9.539063-21.332031-21.335938-21.332031h-320c-11.796875 0-21.332031 9.535156-21.332031 21.332031s9.535156 21.335938 21.332031 21.335938zm0 0" /><path d="m469.332031 213.667969h-320c-11.796875 0-21.332031 9.535156-21.332031 21.332031s9.535156 21.332031 21.332031 21.332031h320c11.796875 0 21.335938-9.535156 21.335938-21.332031s-9.539063-21.332031-21.335938-21.332031zm0 0" /><path d="m469.332031 384.332031h-320c-11.796875 0-21.332031 9.539063-21.332031 21.335938s9.535156 21.332031 21.332031 21.332031h320c11.796875 0 21.335938-9.535156 21.335938-21.332031s-9.539063-21.335938-21.335938-21.335938zm0 0" /></svg>
                </button>
            </div>
            <editor-content class="editor__content" editor={this.editor} style={{ "min-height": this.minHeight }} />
        </div>)
    }

    beforeDestory() {
        this.editor.destroy()
    }
}