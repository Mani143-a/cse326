// Image Slider
const imageSlider = document.querySelector('.image-slider');
if (imageSlider) {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Auto advance slides
    setInterval(() => showSlide(currentSlide + 1), 5000);

    // Slider button controls
    document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));
    document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));
}

// Animated Statistics
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.round(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Animate statistics when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const donorCount = document.getElementById('donorCount');
            const bloodUnits = document.getElementById('bloodUnits');
            const livesSaved = document.getElementById('livesSaved');

            if (donorCount) animateNumber(donorCount, 1500);
            if (bloodUnits) animateNumber(bloodUnits, 2000);
            if (livesSaved) animateNumber(livesSaved, 6000);
            
            observer.unobserve(entry.target);
        }
    });
});

const statistics = document.querySelector('.statistics');
if (statistics) observer.observe(statistics);

// Form Validation and Submission
const donorForm = document.getElementById('donorForm');
if (donorForm) {
    donorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const age = document.getElementById('age').value;
        if (age < 18 || age > 65) {
            alert('Age must be between 18 and 65 years.');
            return;
        }

        // Phone number validation
        const phone = document.getElementById('phone').value;
        if (!/^\d{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        // Success message
        alert('Thank you for registering as a donor! We will contact you soon.');
        donorForm.reset();
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});