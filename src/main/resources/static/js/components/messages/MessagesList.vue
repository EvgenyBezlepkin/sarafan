<template>
    <form>
        <message-form v-bind:messagesList="messagesList" v-bind:editMessageInForm="currentMessage"/>
        <message-row v-for="message in sortedMessages"
                     v-bind:key="message.id"
                     v-bind:currentMessage="message"
                     v-bind:editMessage="editMessage"
                     v-bind:deleteMessage="deleteMessage"
                     v-bind:messagesList="messagesList" />
    </form>
</template>


<script>
    import MessageRow from 'components/messages/MessageRow.vue'
    import MessageForm from 'components/messages/MessageForm.vue'
    export default {
        components:{
            MessageRow,
            MessageForm
        },
        props: ['messagesList'],
        data:function(){
            return {
                currentMessage: ''
            }
        },
        computed: {
            sortedMessages(){
                let a = this.messagesList.sort((a,b) => (b.id - a.id))
                console.log(a)
                return a
            }
        },
        methods:{
            editMessage(message){
                this.currentMessage = message
            },
            deleteMessage(message){
                this.$resource("/messages/{id}").remove({id: message.id}).then(result => {
                    if (result.ok) {
                        this.messagesList.splice(this.messagesList.indexOf(message), 1)
                    }
                })
            }
        },
    }
</script>


<style>

</style>