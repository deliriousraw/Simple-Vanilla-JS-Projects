document.getElementById('button1').addEventListener('click', getText);

document.getElementById('button2').addEventListener('click', getJson);

document.getElementById('button3').addEventListener('click', getExternal);

// GET Text
function getText() {
    fetch('data.txt').then(res => res.text()).then(data => document.getElementById('output').textContent = data);
}

// GET JSON 
function getJson() {
    fetch('database.json').then(res => res.json()).then(data => {
        let output = '';
        data.forEach(elem => {
            output += `<p>${elem.title} ${elem.body}</p>`
        });
        document.getElementById('output').innerHTML = output;
    })
}

// GET External Data
function getExternal() {
    fetch('https://api.github.com/users').then(res => res.json()).then(data => {
        let output = '';
        data.forEach(user => {
            output += `<p>${user.login}</p>`
        });
        document.getElementById('output').innerHTML = output;
    }).catch(err => console.log(err));
}