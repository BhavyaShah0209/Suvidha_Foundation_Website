document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Menu
    const navToggle = document.createElement('div');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '<span></span><span></span><span></span>'; // Hamburger icon

    const nav = document.querySelector('nav');
    if (nav) {
        nav.insertBefore(navToggle, nav.firstChild);
        const navLinks = nav.querySelectorAll('a');

        navToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            this.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) { // Adjust breakpoint as needed
                    nav.classList.remove('nav-open');
                    navToggle.classList.remove('open');
                }
            });
        });
    }

    // Lazy Loading for Images
    const imagesToLoad = document.querySelectorAll('img[data-src]');
    const loadImages = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = () => {
            image.removeAttribute('data-src');
        };
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImages(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        imagesToLoad.forEach(img => {
            observer.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        imagesToLoad.forEach(loadImages);
    }

    // Basic Contact Form Validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');

            if (!nameInput.value.trim()) {
                alert('Please enter your name.');
                isValid = false;
            }

            if (!emailInput.value.trim()) {
                alert('Please enter your email.');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                alert('Please enter your message.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }

    // Scroll-to-Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) { // Show button after scrolling down 300px
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Basic Gallery Image Preview (Simple Overlay)
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const overlay = document.createElement('div');
    overlay.id = 'imageOverlay';
    const overlayImage = document.createElement('img');
    overlay.appendChild(overlayImage);
    document.body.appendChild(overlay);

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            overlayImage.src = this.src;
            overlay.style.display = 'flex';
        });
    });

    overlay.addEventListener('click', function(event) {
        if (event.target === this) { // Close overlay when clicking outside the image
            this.style.display = 'none';
        }
    });
});