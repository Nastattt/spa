
// document.addEventListener('click', (event) =>{
//     event.preventDefault();
//     if (event.target.tagName == 'A'){
//         console.log(event.target.textContent)
//     }
// })

// const route = (event) => {
//     window.history.pushState({}, '',event.target.href)
// }

// const routes = {
//     '/':index1.html,
// }

// const heandleLocation = async () => {
//     let path = window.location.pathname;
//     const html = await fetch(routes[path]).then(data => data.text());
//     document.querySelector('.wrap').innerHTML = html
//     console.log(path)
// }

const imagesContainer = document.getElementById('images-container');
fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
    .then(response => response.json())
    .then(data => {
        data.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.thumbnailUrl;
            img.alt = photo.title;

            const title = document.createElement('p');
            title.textContent = photo.title;

            const imageWrapper = document.createElement('div');
            imageWrapper.appendChild(img);
            imageWrapper.appendChild(title);

            imagesContainer.appendChild(imageWrapper);
        });
    })
    .catch(error => {
        console.error('Error fetching images:', error);
    });

const todosList = document.getElementById("todos-list");
fetch('https://jsonplaceholder.typicode.com/users/1/todos')
    .then(response => response.json())
    .then(data => {
        data.forEach(todo => {
            const listItem = document.createElement("li");
            listItem.textContent = todo.title;
            todosList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
    });


// Массив пользователей
let users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" }
];

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;
    let foundUser = users.find(user => user.username === username && user.password === password);
    if (foundUser) {
        alert('Успешная авторизация!');
        document.getElementById('login-form').parentElement.style.display = 'none';
        document.getElementById('error-message').innerHTML = '';
        document.getElementById('page-header').style.display = 'block';
    } else {
        document.getElementById('error-message').innerText = 'Неверное имя пользователя или пароль.';
    }
});

document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const registrationHeader = document.createElement("h2");
    registrationHeader.textContent = "Регистрация";

    let username = document.getElementById('reg-username').value;
    let password = document.getElementById('reg-password').value;
    console.log("Введенные данные:", { username: username, password: password }); // Выводим данные в консоль
    let existingUser = users.find(user => user.username === username);
    if (existingUser) {
        document.getElementById('error-message').innerText = 'Пользователь с таким именем уже существует.';
    } else {
        users.push({ username: username, password: password });
        alert('Пользователь успешно зарегистрирован!');
        document.getElementById('reg-username').value = '';
        document.getElementById('reg-password').value = '';
        document.getElementById('registration-form').parentElement.style.display = 'none';
        document.getElementById('login-form').parentElement.style.display = 'block';
    }


});

document.addEventListener("DOMContentLoaded", function () {
    const albumsList = document.getElementById("albums-list");

    fetch('https://jsonplaceholder.typicode.com/users/1/albums')
        .then(response => response.json())
        .then(data => {
            data.forEach(album => {
                const listItem = document.createElement("li");
                listItem.textContent = album.title;
                albumsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching albums:', error);
        });
});

function showContent(contentId) {
    // Скрыть все содержимое
    var allContent = document.querySelectorAll('#app > div');
    allContent.forEach(function (element) {
        element.style.display = 'none';
    });



    // Показать только выбранное содержимое
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}
// heandleLocation();
// window.onpopstate = heandleLocation;
// window.route = route;

document.addEventListener("DOMContentLoaded", function () {
    const postsList = document.getElementById("posts-list");

    // Функция для создания элемента комментария
    function createCommentElement(comment) {
        const li = document.createElement("li");
        li.textContent = comment;
        return li;
    }

    // Функция для отображения описания поста
    function showDescription(post, postElement) {
        const descriptionParagraph = document.createElement("p");
        descriptionParagraph.textContent = post.body;
        postElement.appendChild(descriptionParagraph);
    }

    // Функция для добавления комментария к посту
    function addComment(postElement, comment) {
        let commentList = postElement.querySelector(".comments-list");
        if (!commentList) {
            // Если элемент .comments-list не найден, создаем его
            commentList = document.createElement("ul");
            commentList.className = "comments-list";
            postElement.appendChild(commentList);
        }
        const commentElement = createCommentElement(comment);
        commentList.appendChild(commentElement);
    }


    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const li = document.createElement("li");
                const h2 = document.createElement("h2");
                const detailsButton = document.createElement("button");
                const commentsList = document.createElement("ul");
                const commentForm = document.createElement("form");
                const commentInput = document.createElement("input");
                const commentButton = document.createElement("button");

                h2.textContent = post.title;
                detailsButton.textContent = "Подробнее";
                commentInput.placeholder = "Введите комментарий";
                commentButton.textContent = "Добавить комментарий";

                detailsButton.addEventListener("click", () => {
                    showDescription(post, li);
                });

                commentForm.addEventListener("submit", event => {
                    event.preventDefault();
                    const comment = commentInput.value;
                    if (comment.trim() !== "") {
                        addComment(li, comment);
                        commentInput.value = "";
                    }
                });

                li.appendChild(h2);
                li.appendChild(detailsButton);
                li.appendChild(commentsList);
                li.appendChild(commentForm);
                commentForm.appendChild(commentInput);
                commentForm.appendChild(commentButton);
                li.appendChild(commentForm);
                postsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
        });
});