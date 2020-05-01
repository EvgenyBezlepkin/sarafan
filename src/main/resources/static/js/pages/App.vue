<template>
    <div>
        <nav class="navbar navbar-light margin-bottom back">
            <a class="navbar-brand" href="#">Navbar</a>
        </nav>
        <div>
            <messages-list v-bind:messagesList="messagesPull"/>
        </div>
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
        created() {
            addHandler(data => {
                let index = getIndex(messages, data.id)
                if (index != -1) {
                    messages.splice(index, 1, data)
                } else {
                    messages.push(data)
                }
            })
        }
    }
</script>


<style>
    body {
        background-color: azure;
    }
    .margin-bottom {
        margin-bottom: 5rem;
    }
    div {
        margin: 0 0.5rem 0 0.5rem;
    }
    .back {
        background: cornflowerblue;
    }
</style>