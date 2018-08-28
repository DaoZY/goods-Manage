
<script>
    export default {
        name: 'SjColumnRender',
        props:{
            row: Object,
            render: Function,
            methods: Object
        },
        created() {
            let contentHtml = this.$props.render(this.$props.row);
            // alert(contentHtml);
            this.$options.template = contentHtml;

        }

    }
</script>

<style>

</style>