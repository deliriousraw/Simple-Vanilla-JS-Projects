// MAPS = key-value pairs - can use ANY type as a key or value

const map1 = new Map();

// Set Keys

const key1 = 'some string',
    key2 = {},
    key3 = function() {};

// Set map values by key
map1.set(key1, 'value of key1');
map1.set(key2, 'value of key2');
map1.set(key3, 'value of key3');

// Get values of key
// console.log(map1.get(key1), map1.get(key2), map1.get(key3));

// Count values
// console.log(map1.size);

// Iterating Maps


// Loop using for..of to get keys and values
for (let [key, value] of map1) {
    console.log(`${key} = ${value}`)
}

// Iterate keys only
// for (let key of map1.keys()) {
//     console.log(key)
// }
// Iterate values only
// for (let value of map1.values()) {
//     console.log(value)
// }


// Loop with forEach 
// map1.forEach((value, key) => {
//     console.log(`${key} = ${value}`);
// })

// Conver to ARRAYS

// Create an array of the key value pairs
// const keyValArray = Array.from(map1);
// console.log(keyValArray);

// Create an array of the values 
// const ValArray = Array.from(map1.values());
// console.log(ValArray);

// Create an array of the keys 
// const keyArray = Array.from(map1.keys());
// console.log(keyArray);