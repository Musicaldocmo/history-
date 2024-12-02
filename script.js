document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    let currentIndex = 0;
    let startX, moveX;
    let autoSlideInterval;
    // Calculate items per view based on screen width
    const getItemsPerView = () => {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    };
    const updateCarousel = () => {
      const itemWidth = carousel.clientWidth / getItemsPerView();
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };
    const nextSlide = () => {
      const maxIndex = items.length - getItemsPerView();
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    };
    const prevSlide = () => {
      const maxIndex = items.length - getItemsPerView();
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    };
    // Touch events for mobile swipe
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      clearInterval(autoSlideInterval);
    });
    carousel.addEventListener('touchmove', (e) => {
      moveX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', () => {
      if (startX - moveX > 50) nextSlide();
      if (startX - moveX < -50) prevSlide();
      startAutoSlide();
    });
    // Button controls
    leftBtn.addEventListener('click', () => {
      prevSlide();
      clearInterval(autoSlideInterval);
      startAutoSlide();
    });
    rightBtn.addEventListener('click', () => {
      nextSlide();
      clearInterval(autoSlideInterval);
      startAutoSlide();
    });
    // Auto slide
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    };
    // Window resize handler
    window.addEventListener('resize', updateCarousel);
    // Initialize auto slide
    startAutoSlide();
    // Pause auto slide on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', startAutoSlide);
  });
  const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;

        // Close all other open answers
        document.querySelectorAll('.faq-answer').forEach((ans) => {
            if (ans !== answer) {
                ans.style.maxHeight = '0';
                ans.style.opacity = '0';
                ans.classList.remove('active');
            }
        });

        document.querySelectorAll('.faq-question').forEach((q) => {
            if (q !== question) {
                q.classList.remove('active');
            }
        });

        // Toggle visibility of the answer
        if (answer.classList.contains('active')) {
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            answer.classList.remove('active');
            question.classList.remove('active');
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            answer.classList.add('active');
            question.classList.add('active');
        }
    });
});
// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Get all destination cards
  const cards = document.querySelectorAll('.destination-card');
  
  // Add click event to each card
  cards.forEach(card => {
      card.addEventListener('click', function() {
          const modalId = this.getAttribute('data-modal');
          const modal = document.getElementById(modalId);
          modal.classList.add('show');
      });
  });

  // Add click event to all close buttons
  const closeButtons = document.querySelectorAll('.close-button');
  closeButtons.forEach(button => {
      button.addEventListener('click', function() {
          const modal = this.closest('.modal');
          modal.classList.remove('show');
      });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
          event.target.classList.remove('show');
      }
  });
});