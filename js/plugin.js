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
}

const http = new Http();
// Получаем кнопку
const btn = document.querySelector('button');
btn.disabled = false;
// Получаем список
const ul = document.getElementById('user-list');

// Вешаем событие клик на кнопку
btn.addEventListener('click', function (e) {
    http.get('https://jsonplaceholder.typicode.com/users', function (err, res) {
        // переводим полученые данные в массив
        let userList = (JSON.parse(res));
        // перебираем полученый массив и выводим в разметку имя каждого юзера и блокируем кнопку вывода пользователей
        userList.forEach(function (user) {
            let userName = `<li class="user-name text-white">${user.name}</li>`;
            ul.insertAdjacentHTML('beforeend', userName);
            btn.disabled = true;
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
                    // получаем карточку с информацией о пользователе
                    const currenttDiv = document.querySelector('.user-info');
                    // если карточка уже существует то удаляем ее
                    if (currenttDiv) {
                        currenttDiv.remove();
                    }
                    // создаем разметку карточки с информацией о пользователе
                    let info = `<div class="user-info text-white">
                                    <span class="user-info-name">name: ${user.name}</span>
                                    <span class="user-info-phone">phone: ${user.phone}</span>
                                    <span class="user-info-company">company: ${user.company.name}</span>
                                    <button class="hide-info text-red"><i class="fas fa-times"></i></button>
                                </div>`;
                    // выводим в разметку карточку пользователя
                    e.target.insertAdjacentHTML('afterend', info);
                }
            })
        });

    }
    if (e.target.classList.contains('fa-times')) {
        // находим родителя кнопки удаления и удаляем его
        const currnetDiv = e.target.closest('div');
        currnetDiv.remove();
    }
});





