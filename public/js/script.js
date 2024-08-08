document.getElementById('userForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

    const name = document.getElementById('name').value; // Получаем значение поля "name"
    const email = document.getElementById('email').value; // Получаем значение поля "email"

    // Отправляем данные на сервер с использованием метода POST
    const response = await fetch('/users', {
        method: 'POST', // Метод запроса
        headers: {
            'Content-Type': 'application/json' // Тип содержимого (JSON)
        },
        body: JSON.stringify({ name, email }) // Преобразуем данные в строку JSON
    });

    const result = await response.json(); // Ожидаем и парсим JSON-ответ от сервера
    if (response.ok) {
        document.getElementById('message').innerText = `User ${result.name} added successfully!`; // Сообщение об успешном добавлении пользователя
    } else {
        document.getElementById('message').innerText = `Error: ${result.message}`; // Сообщение об ошибке
    }

    document.getElementById('userForm').reset(); // Очищаем форму после отправки
});
