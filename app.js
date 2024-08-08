const express = require('express'); // Импортируем модуль Express для создания веб-приложения
const path = require('path'); // Импортируем модуль path для работы с файловыми путями
const usersRouter = require('./routes/users'); // Импортируем маршруты, связанные с пользователями
const app = express(); // Создаем экземпляр приложения Express
const PORT = process.env.PORT || 3000; // Устанавливаем порт для сервера (используем порт из переменной окружения или 3000)

// Настраиваем EJS как движок шаблонов
app.set('view engine', 'ejs'); // Указываем EJS как шаблонизатор
app.set('views', path.join(__dirname, 'views')); // Устанавливаем каталог для шаблонов

// Подключаем middleware для обработки JSON и статических файлов
app.use(express.json()); // Middleware для обработки JSON-запросов
app.use(express.static(path.join(__dirname, 'public'))); // Middleware для обслуживания статических файлов

// Подключаем маршруты для пользователей
app.use('/users', usersRouter); // Все запросы к /users обрабатываются usersRouter

// Главная страница (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Отправляем файл index.html в ответ на GET-запрос к корню сайта
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Логируем информацию о запущенном сервере
});
