const express = require('express'); // Импортируем Express для создания маршрутов
const { addUser, getUsers } = require('../models/User'); // Импортируем функции для работы с пользователями
const router = express.Router(); // Создаем новый объект роутера

// Обрабатываем POST-запрос для добавления нового пользователя
router.post('/', async (req, res) => {
    const { name, email } = req.body; // Получаем имя и email из тела запроса
    if (!name || !email) { // Проверяем наличие имени и email
        return res.status(400).json({ message: 'Name and email are required.' }); // Возвращаем ошибку, если данные не указаны
    }

    try {
        const newUser = await addUser(name, email); // Добавляем нового пользователя в базу данных
        res.status(201).json(newUser); // Возвращаем созданного пользователя с кодом 201
    } catch (error) {
        res.status(500).json({ message: 'Error adding user to the database.' }); // Возвращаем ошибку в случае неудачи
    }
});

// Обрабатываем GET-запрос для получения всех пользователей
router.get('/', async (req, res) => {
    try {
        const users = await getUsers(); // Получаем всех пользователей из базы данных
        res.render('users', { users }); // Отображаем пользователей с помощью шаблона users.ejs
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users from the database.' }); // Возвращаем ошибку в случае неудачи
    }
});

// Экспортируем роутер для использования в других файлах
module.exports = router;
