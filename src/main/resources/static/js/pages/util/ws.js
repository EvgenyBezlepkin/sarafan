
import SockJS from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'

var stompClient = null;
const handlers = []

export function connect() {

    // конечная точка для подключения к серверу
    const socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        //console.log('Connected: ' + frame);

        // добавляем подписку на сообщения из брокера
        stompClient.subscribe('/topic/activity', message => {
            handlers.forEach(handler => handler(JSON.parse(message.body)))
        })
    })
}

export function addHandler(handler){
    handlers.push(handler)
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    //console.log("Disconnected");
}

export function sendMessage(message) {

    // отправляем сообщения на адрес контроллера,
    // который передаст сообщение на адрес брокера
    stompClient.send("/app/changeMessage", {}, JSON.stringify(message));
}

