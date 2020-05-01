<template>
    <div class="form-row">
        <div class="col-7">
            <label class="form-control"><i>{{currentMessage.id}} </i> : {{currentMessage.text}}</label>
        </div>
        <input type="button" value="Edit" class="btn margin" v-on:click="edit"/>
        <input type="button" value="X" class="btn margin" v-on:click="del"/>
    </div>
</template>


<script>
    import MessageForm from 'components/messages/MessageForm.vue'

    export default {
        components: {
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
    .margin {
        margin: 0 1rem 1rem 1rem;
    }
</style>