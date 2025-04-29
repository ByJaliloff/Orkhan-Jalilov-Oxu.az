import { getAllNews } from "./service.js";

async function renderNews() {
  const newsWrapper = document.getElementById("news-wrapper");
  const newsData = await getAllNews();

  if (!newsData || !Array.isArray(newsData)) return;

  const limitedNews = newsData.slice(0, 8);

  newsWrapper.innerHTML = "";

  limitedNews.forEach((news) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
    <img src="${news.img}" alt="Xəbər şəkli" class="slide-img">
    <div class="slide-overlay">
      <div class="w-full h-auto">
        <div style="display: flex; justify-content: flex-start; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px;">
          <span class="category">${news.category}</span>
          <span class="info">
            <span class="mr-[14px]">
                     <i class="fa-regular fa-clock"></i> ${news.date}
            </span>
            <i class="fa-regular fa-eye"></i> ${news.view}
          </span>
        </div>
        <div class="title">${news.title}</div>
      </div>
    </div>
  `;
  
    newsWrapper.appendChild(slide);
  });

  new Swiper(".swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".custom-pagination",
      clickable: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    },
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
  });
}

renderNews();
