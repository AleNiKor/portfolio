const btnDarkMode = document.querySelector(".dark-mode-btn");

// 1. Проверка тёмной темы на уровне системных настроек
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
}

// 2. Проверка тёмной темы в localStorage
if (localStorage.getItem('darkMode') === 'dark') {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
} else if (localStorage.getItem("darkMode") === "light") {
    btnDarkMode.classList.remove("dark-mode-btn--active");
    document.body.classList.remove("dark");
}

// Если меняются системные настройки, меняем тему
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener('change', (event) => {
        const newColorScheme = event.matches ? "dark" : 'light';

        if (newColorScheme === 'dark') {
            btnDarkMode.classList.add("dark-mode-btn--active");
            document.body.classList.add("dark");
            localStorage.setItem('darkMode', 'dark');
        } else {
            btnDarkMode.classList.remove("dark-mode-btn--active");
            document.body.classList.remove("dark");
            localStorage.setItem("darkMode", "dark");
        }
    })

// Включение ночного режима по кнопке
btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle("dark-mode-btn--active");
    const isDark = document.body.classList.toggle('dark');

    if (isDark) {
        localStorage.setItem('darkMode', 'dark');
    } else {
        localStorage.setItem("darkMode", "light");
    }
}

// Обработка формы
const form = document.getElementById('feedback-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Валидация формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }

    // Имитация отправки формы
    const btn = form.querySelector('.btn');
    const originalText = btn.textContent;

    btn.textContent = 'Отправка...';
    btn.disabled = true;

    setTimeout(() => {
        alert('Сообщение отправлено! Спасибо за ваше обращение.');
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 2000);
});

// Маска для телефона
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        value = !value[2] ? value[1] : value[1] + ' ' + value[2] + (value[3] ? ' ' + value[3] : '') + (value[4] ? ' ' + value[4] : '');
    }
    e.target.value = value;
});