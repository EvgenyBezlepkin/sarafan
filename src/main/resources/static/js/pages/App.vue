<template>
    <div>
        <messages-list v-bind:messagesList="messagesPull"/>
    </div>
</template>


<script>
    import MessagesList from 'components/messages/MessagesList.vue'
    export default {
        components: {
            MessagesList
        },
        data() {
            return {
                messagesPull: messages
            }
        }
    }
</script>


<style>

</style>