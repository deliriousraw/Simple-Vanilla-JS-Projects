function EventObserver() {
    this.observers = [];
}

EventObserver.prototype = {
    subscribe: function(fn) {
        this.observers.push(fn);
        console.log(`You are subscribed on ${fn.name}`);
    },
    unsubscribe: function(fn) {
        this.observers = this.observers.filter(item => {
            if (item !== fn) {
                return item;
            }
        });
        console.log(`You are unsubscribed from ${fn.name}`);
    },
    fire: function() {
        this.observers.forEach(item => {
            item.call();
        });
    }
}

const observer = new EventObserver();
// Event Listeners

document.querySelector('.sub-ms').addEventListener('click', function() {
    observer.subscribe(getTime);
});
document.querySelector('.unsub-ms').addEventListener('click', function() {
    observer.unsubscribe(getTime);
});
document.querySelector('.fire').addEventListener('click', function() {
    observer.fire();
});
const getMilliseconds = function() {
    console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
};
const getTime = function() {
    console.log(`Current Milliseconds: ${new Date()}`);
};