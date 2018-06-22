class Http {
    constructor() {
        this.http = new XMLHttpRequest();
    }

    get(url, callback) {
        this.http.open("GET", url);
        const self = this; // сохранить контекст вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200) {
                callback(null, self.http.responseText); // вызываем callback после ответа сервера
            } else {
                callback(`Error: ${self.http.status}`, null);
            }
        });

        this.http.send();
    }

    post(url, data, callback) {
        if (!data) return callback('Error: Data обязательный параметр');

        this.http.open("POST", url);
        this.http.setRequestHeader("Content-type", "application/json");

        const self = this; // сохранить контекст вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, self.http.responseText);
            } else {
                callback(`Error: ${self.http.status}`, null);
            }
        });

        this.http.send(JSON.stringify(data));
    }

    put(url, data, callback) {
        if (!data) return callback('Error: Data обязательный параметр');

        this.http.open("PUT", url);
        this.http.setRequestHeader("Content-type", "application/json");

        const self = this; // сохранить контекст вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, self.http.responseText);
            } else {
                callback(`Error: ${self.http.status}`, null);
            }
        });

        this.http.send(JSON.stringify(data));
    }

    delete(url, callback) {
        this.http.open("DELETE", url);
        this.http.setRequestHeader("Content-type", "application/json");

        const self = this; // сохранить контекст вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, "Post deleted");
            } else {
                callback(`Error: ${self.http.status}`, null);
            }
        });

        this.http.send();
    }
}

const http = new Http();
// Получаем кнопку
const btn = document.querySelector('button');
// Получаем список
const ul = document.getElementById('user-list');
// Получаем дочерние элементы списка (HTMLCollection)
const li = ul.children;
const liArr = Array.from(li);


// Вешаем событие клик на кнопку
btn.addEventListener('click', function (e) {
    http.get('https://jsonplaceholder.typicode.com/users', function (err, res) {
        // переводим полученые данные в массив
        let userList = (JSON.parse(res));
        console.log(userList);
        // перебираем полученый массив и выводим в разметку имя каждого юзера
        userList.forEach(function (user) {
            let userName = `<li class="user-name">${user.name}</li>`;
            ul.insertAdjacentHTML('beforeend', userName);
        })
    });
});

const http1 = new Http();
ul.addEventListener('click', function (e) {
    if (e.target.classList.contains('user-name')){
        http1.get('https://jsonplaceholder.typicode.com/users', function (err, res) {
            // переводим полученые данные в массив
            let userList = (JSON.parse(res));
            userList.forEach(function (user) {
                if (user.name === e.target.textContent) {
                    const currenttDiv = document.querySelector('.user-info');
                    if (currenttDiv) {
                        currenttDiv.remove();
                    }
                    let info = `<div class="user-info"><span>name: ${user.name} <button class="close-info"><i class="fas fa-times"></i></button><br>phone: ${user.phone}<br>company: ${user.company.name}</span></div>`;
                    e.target.insertAdjacentHTML('afterend', info);
                }
            })
        });

    }
});


