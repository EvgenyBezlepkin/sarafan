

var resource = Vue.resource("/messages/{id}")

function getIndex(list, id){
    for (var i = 0; i < list.length; i++){
        if (list[i].id === id){
            return i;
        }
    }
    return -1;
}


function getRequest(massive){
    resource
        .get()
        .then(result => result.json()
            .then(data => data.forEach(message => massive.push(message))))
}


Vue.component('message-form', {
    props: ['messagesList', 'editMessageInForm'],
    template:
        '<div>' +
            '<input type="text" placeholder="Write something" v-model="text"/> ' +
            '<input type="button" value="Save" v-on:click="save"/> ' +
        '</div>',
    data: function() {
        return {
            text: '',
            id: ''
        }
    },
    methods: {
        save: function() {
            var message = { text: this.text}

            if (this.id) {
                resource.update({id: this.id}, {'text':this.text}).then(res => res.json().then(res => {
                    var index = getIndex(this.messagesList, this.id)
                    this.messagesList.splice(index, 1, res)
                    this.text=''
                }))
            } else {
            resource
                .save({}, message)
                .then(result => result.json()
                    .then(data => {
                        this.messagesList.push(data)
                        this.text=''
                    })
                )}
        }
    },
    watch: {
        editMessageInForm: function (newVal, oldVal){
            this.text = newVal.text;
            this.id = newVal.id
        }
    }
});


Vue.component('message-row', {
    props: ['currentMessage', 'editMessage', 'messagesList'],
    template:
        '<div>' +
        '<i>{{currentMessage.id}} </i> : {{currentMessage.text}}' +
        '<input type="button" value="Edit" v-on:click="edit"/>' +
        '<input type="button" value="X" v-on:click="del"/> ' +
        '</div>',

    methods:{
        edit: function(){
            this.editMessage(this.currentMessage)
        },
        del: function(){
            resource.remove({id: this.currentMessage.id}).then(result => {
                if (result.ok) {
                    this.messagesList.splice(this.messagesList.indexOf(this.currentMessage), 1)
                }
            })
        }
    }
});


Vue.component('messages-list', {
    props: ['messagesList'],
    data:function(){
        return {
            currentMessage: ''
        }
    },
    template:
        '<div>' +
            '<message-form v-bind:messagesList="messagesList" v-bind:editMessageInForm="currentMessage"/>' +
            '<message-row v-for="message in messagesList" ' +
                'v-bind:key="message.id"  ' +
                'v-bind:currentMessage="message" ' +
                'v-bind:editMessage="editMessage"' +
                'v-bind:messagesList="messagesList"/>' +
        '</div>',
    created: function(){
        getRequest(this.messagesList)
    }, methods:{
        editMessage: function(message){
            this.currentMessage = message
        }
    }
});


var app = new Vue({
    el: '#app',
    template:
        '<div>' +
            '<messages-list v-bind:messagesList="messagesPull"/>' +
        '</div>',
    data: {
        messagesPull: []
    },

});
