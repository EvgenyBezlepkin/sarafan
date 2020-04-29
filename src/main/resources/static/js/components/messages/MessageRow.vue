<template>
    <div>
        <i>{{currentMessage.id}} </i> : {{currentMessage.text}}
        <input type="button" value="Edit" v-on:click="edit"/>
        <input type="button" value="X" v-on:click="del"/>
    </div>
</template>


<script>
    import MessageForm from 'components/messages/MessageForm.vue'
    export default {
        components:{
            MessageForm
        },
        props: ['currentMessage', 'editMessage', 'messagesList', 'deleteMessage'],
        methods: {
            edit() {
                this.editMessage(this.currentMessage)
            },
            del() {
                this.deleteMessage(this.currentMessage)
            }
        }
    }
</script>


<style>

</style>