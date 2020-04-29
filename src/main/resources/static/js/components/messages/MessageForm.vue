<template>
    <div>
    <input type="text" placeholder="Write something" v-model="text"/>
    <input type="button" value="Save" v-on:click="save"/>
    </div>
</template>


<script>

    import {sendMessage} from '../../pages/util/ws.js'

    export default {
        props: ['messagesList', 'editMessageInForm'],
        data: function() {
            return {
                text: '',
                id: ''
            }
        },
        methods: {
            save() {
                sendMessage({id: this.id, text: this.text})
                this.text=''
                this.id=''

                // код сохранения через vue-resource
                // var message = { text: this.text}
                //
                // if (this.id) {
                //     this.$resource("/messages/{id}").update({id: this.id}, {'text':this.text}).then(res => res.json().then(res => {
                //         var index = getIndex(this.messagesList, this.id)
                //         this.messagesList.splice(index, 1, res)
                //         this.text=''
                //     }))
                // } else {
                //     this.$resource("/messages/{id}")
                //         .save({}, message)
                //         .then(result => result.json()
                //             .then(data => {
                //                 this.messagesList.push(data)
                //                 this.text=''
                //             })
                //         )}
            }
        },
        watch: {
            editMessageInForm: function (newVal, oldVal){
                this.text = newVal.text;
                this.id = newVal.id
            }
        }
    }
</script>


<style>

</style>