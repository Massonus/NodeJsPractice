const { Pool } = require('pg'); // Импортируем класс Pool из модуля pg для работы с PostgreSQL

// Создаем пул соединений с базой данных PostgreSQL с указанными параметрами
const pool = new Pool({
    user: 'postgres',        // Имя пользователя для подключения к базе данных
    host: 'localhost',       // Хост, на котором запущен сервер базы данных
    database: 'TestNodeJs',  // Имя базы данных
    password: 'root',        // Пароль для подключения к базе данных
    port: 5432,              // Порт подключения к базе данных (по умолчанию 5432)
});

// Функция для добавления нового пользователя в базу данных
async function addUser(name, email) {
    // Выполняем SQL-запрос на вставку нового пользователя в таблицу users
    const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', // Запрос с использованием параметров $1 и $2
        [name, email] // Передаем значения name и email в качестве параметров
    );
    return result.rows[0]; // Возвращаем первого добавленного пользователя
}

// Функция для получения всех пользователей из базы данных
async function getUsers() {
    // Выполняем SQL-запрос на получение всех записей из таблицы users
    const result = await pool.query('SELECT * FROM users');
    return result.rows; // Возвращаем массив пользователей
}

// Экспортируем функции addUser и getUsers для использования в других файлах
module.exports = { addUser, getUsers };
