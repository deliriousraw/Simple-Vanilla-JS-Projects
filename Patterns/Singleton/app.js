const SingleTon = (function() {
    let instance;

    function createInstance() {
        const object = new Object({ name: 'Brad' });
        return object;
    }
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
})();

const instanceA = SingleTon.getInstance();
const instanceB = SingleTon.getInstance();
console.log(instanceA);
console.log(instanceB);