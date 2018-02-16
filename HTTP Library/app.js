// const http = new easyHTTP();

// GET Posts
// http.get('https://jsonplaceholder.typicode.com/posts', function(err, response) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(response);
//     }
// });

// GET Single Post
// http.get('https://jsonplaceholder.typicode.com/posts/1', function(err, response) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(response);
//     }
// });

// POST data
// const data = {
//     title: 'Custom Post',
//     body: 'This is a custom post'
// };

// http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, response) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(response);
//     }
// });

// PUT data
// const data = {
//     title: 'Custom Post',
//     body: 'This is a custom post'
// };

// http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(err, response) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(response);
//     }
// });

// DELETE data
// http.delete('https://jsonplaceholder.typicode.com/posts/1', function(err, response) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(response);
//     }
// });

// FETCH Implementation

// const http = new EasyHTTP();

// GET Users
// http.get('https://jsonplaceholder.typicode.com/users')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// Create a data
// const data = {
//     name: 'John Doe',
//     username: 'deliriousraw',
//     email: 'deliriousraw@gmaill.com',
// }

// POST User
// http.post('https://jsonplaceholder.typicode.com/users', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// PUT User
// http.put('https://jsonplaceholder.typicode.com/users/2', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// DELETE User
// http.delete('https://jsonplaceholder.typicode.com/users/2')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));


// Async & Await Implementation
const http = new EasyHTTP();

// GET Users
http.get('https://jsonplaceholder.typicode.com/users')
    .then(data => console.log(data))
    .catch(err => console.log(err));

// Create a data
const data = {
    name: 'John Doe',
    username: 'deliriousraw',
    email: 'deliriousraw@gmaill.com',
}

// POST User
// http.post('https://jsonplaceholder.typicode.com/users', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// PUT User
// http.put('https://jsonplaceholder.typicode.com/users/2', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// DELETE User
// http.delete('https://jsonplaceholder.typicode.com/users/2')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));