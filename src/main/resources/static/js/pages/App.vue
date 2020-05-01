<template>
    <div>
        <messages-list v-bind:messagesList="messagesPull"/>
    </div>
</template>


<script>
    import MessagesList from 'components/messages/MessagesList.vue'
    import {addHandler} from 'pages/util/ws.js'
    import {getIndex} from 'pages/util/collections.js'
    export default {
        components: {
            MessagesList
        },
        data() {
            return {
                messagesPull: messages
            }
        },
        created(){
            addHandler(data => {
                let index = getIndex(messages, data.id)
                console.log(index)
                if (index != -1) {
                    messages.splice(index,1,data)
                } else {
                    messages.push(data)
                }
            })
        }
    }
</script>


<style>

</style>