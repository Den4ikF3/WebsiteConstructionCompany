// script.js

// Чекаємо, поки весь HTML завантажиться
document.addEventListener("DOMContentLoaded", function() {

    // === ЧАСТИНА 1: Плавна прокрутка ===
    
    // Знаходимо всі посилання, які починаються з #
    const allSmoothLinks = document.querySelectorAll('a[href^="#"]');
    
    // Знаходимо нашу "липку" шапку (в .css вона .main-header)
    const header = document.querySelector('.main-header');

    allSmoothLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            const href = link.getAttribute('href');
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // 1. Отримуємо висоту шапки
                const headerHeight = header.offsetHeight;
                
                // 2. Отримуємо позицію секції
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                // 3. Розраховуємо фінальну позицію
                const offsetPosition = targetPosition - headerHeight - 20; // 20px відступ

                // 4. Плавно прокручуємо
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === ЧАСТИНА 2: Модальне вікно для форми ===

    // Знаходимо елементи модального вікна
    const modalOverlay = document.querySelector("#generic-modal-overlay");
    const modalContent = document.querySelector("#modal-dynamic-content");
    const modalCloseBtn = document.querySelector("#generic-modal-close");
    
    // Знаходимо саму форму
    const contactForm = document.querySelector(".contact-form");

    // Функція: ВІДКРИТИ модальне вікно
    function openModal(contentHTML) {
        modalContent.innerHTML = contentHTML;
        modalOverlay.classList.add("active");
        document.body.classList.add("modal-open"); // Блокуємо фон
    }

    // Функція: ЗАКРИТИ модальне вікно
    function closeModal() {
        modalOverlay.classList.remove("active");
        document.body.classList.remove("modal-open");
    }

    // Обробники для закриття
    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Обробник для ВІДПРАВКИ ФОРМИ
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Зупиняємо реальну відправку
        
        // 1. Готуємо HTML-код для вікна "Дякуємо"
        const thankYouHTML = `
            <div style="text-align: center;">
                <i class="fas fa-check-circle modal-icon-success"></i>
                <h2>Request Accepted</h2>
                <p>Thank you for your message! We will contact you shortly.</p>
                <button class="btn btn-dark" id="modal-ok-button">OK</button>
            </div>
        `;
        
        // 2. Відкриваємо модальне вікно з цим HTML
        openModal(thankYouHTML);
        
        // 3. Очищуємо поля форми
        contactForm.reset(); 
        
        // 4. Додаємо слухач для нової кнопки "OK"
        document.querySelector("#modal-ok-button").addEventListener("click", closeModal);
    });

    console.log("BuildCraft Construction JavaScript is active!");
});