let add_buttons = document.getElementsByClassName('button-cart')

const user_id = JSON.parse(document.getElementById('user_id').textContent);
console.log(add_buttons)

for (let index = 0; index < add_buttons.length; index++) {
    const element = add_buttons[index];
    element.onclick = function () {
        shopSocket.send(JSON.stringify({
            "message": "add_cart",
            "product_id":element.id.split('_')[3],
        }));
    }
    
}

let shopSocket = null;

function connect() {
    shopSocket = new WebSocket("ws://" + window.location.host + "/ws/user/" + user_id + "/");

    shopSocket.onopen = function(e) {
        console.log("Successfully connected to the WebSocket.");
    }

    shopSocket.onclose = function(e) {
        console.log("WebSocket connection closed unexpectedly. Trying to reconnect in 2s...");
        setTimeout(function() {
            console.log("Reconnecting...");
            connect();
        }, 2000);
    };

    chatSocket.onerror = function(err) {
        console.log("WebSocket encountered an error: " + err.message);
        console.log("Closing the socket.");
        chatSocket.close();
    }
}

connect()