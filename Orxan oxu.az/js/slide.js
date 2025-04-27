import { getAllNews } from "./service.js";

async function renderNews() {
  const newsWrapper = document.getElementById('news-wrapper');
  const newsData = await getAllNews();

  if (!newsData) return;

  newsData.forEach(news => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    slide.innerHTML = `
      <img src="${news.img}" alt="Xəbər şəkli" class="slide-img">
      <div class="slide-overlay">
        <div class="category">${news.category || 'İQTİSADİYYAT'}</div>
        <div class="info">${news.date || 'Tarix yoxdur'} • ${news.views || 0} baxış</div>
        <div class="title">${news.title}</div>
        <div class="slide-controls">
          <button class="custom-prev"><i class="fas fa-chevron-left"></i></button>
          <div class="custom-pagination"></div>
          <button class="custom-next"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    `;

    newsWrapper.appendChild(slide);
  });

  // Swiper-i yaradırıq
  const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1, // Bir dəfə yalnız bir slide
    spaceBetween: 10, // Slider arasında məsafə
    pagination: {
      el: '.custom-pagination',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
    navigation: {
      nextEl: '.custom-next', // Next button üçün custom class
      prevEl: '.custom-prev', // Prev button üçün custom class
    },
  });

  // Custom oxlar üçün ayrıca eventləri burda idarə etmirik
}

renderNews();
