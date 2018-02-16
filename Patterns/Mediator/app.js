const User = function(name) {
    this.name = name;
    this.chatroom = null;
}

User.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function(message, from) {
        console.log(`${from.name} to ${this.name} : ${message}`)
    }
}

const ChatRoom = function() {
    let users = {};

    return {
        register: function(user) {
            users[user.name] = user;
            user.chatroom = this;
        },
        send: function(message, from, to) {
            if (to) {
                to.receive(message, from);
            } else {
                for (key in users) {
                    if (users[key] !== from) {
                        users[key].receive(message, from);
                    }
                }
            }
        }
    }
}

const brad = new User('Brad');
const jeff = new User('Jeff');
const sara = new User('Sara');

const chatroom = new ChatRoom();

chatroom.register(brad);
chatroom.register(jeff);
chatroom.register(sara);

sara.send('Hello Brad', brad);
brad.send('Hello Sara', sara);
jeff.send('Hello Everyone');