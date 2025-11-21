document.addEventListener("DOMContentLoaded", function() {

    const allSmoothLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('.main-header');

    allSmoothLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            const href = link.getAttribute('href');
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - headerHeight - 20;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const modalOverlay = document.querySelector("#generic-modal-overlay");
    const modalContent = document.querySelector("#modal-dynamic-content");
    const modalCloseBtn = document.querySelector("#generic-modal-close");
    const contactForm = document.querySelector(".contact-form");

    function openModal(contentHTML) {
        modalContent.innerHTML = contentHTML;
        modalOverlay.classList.add("active");
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        modalOverlay.classList.remove("active");
        document.body.classList.remove("modal-open");
    }

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const thankYouHTML = `
            <div style="text-align: center;">
                <i class="fas fa-check-circle modal-icon-success"></i>
                <h2>Request Accepted</h2>
                <p>Thank you for your message! We will contact you shortly.</p>
                <button class="btn btn-dark" id="modal-ok-button">OK</button>
            </div>
        `;
        
        openModal(thankYouHTML);
        contactForm.reset(); 
        document.querySelector("#modal-ok-button").addEventListener("click", closeModal);
    });

    console.log("BuildCraft Construction JavaScript is active!");
});