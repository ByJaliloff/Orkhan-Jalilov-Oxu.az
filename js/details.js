import { getAllNews, updateNews } from "./service.js";

const container = document.getElementById("news-detail-container");

async function renderDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const data = await getAllNews();
  const news = data.find((item) => item.id == id);

  if (!news) {
    container.innerHTML = "<p>Xəbər tapılmadı.</p>";
    return;
  }

  const popularNews = data.sort((a, b) => b.view - a.view).slice(0, 10);

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 pt-[120px]">
      <div class="space-y-4 bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <img class="w-full h-[420px] object-cover" src="${news.img}" alt="${news.title}">
        <div class="p-6 space-y-4">
          <div class="flex justify-between">
            <nav class="text-sm text-gray-500 space-x-1">
              <a href="index.html" class="hover:underline">Ana səhifə</a> /
              <a href="#" class="hover:underline">${news.category}</a>
            </nav>
            <div class="flex text-sm text-gray-500">
              <span class="ml-4"><i class="far fa-clock"></i> ${news.date}</span>
              <span class="ml-4"><i class="far fa-eye"></i> ${news.view}</span>
            </div>
          </div>
          <h1 class="text-2xl font-bold leading-snug">${news.title}</h1>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <button id="like-btn-${news.id}" class="flex items-center gap-1 text-[18px] text-[black] hover:text-[#1894a0]">
              <i class="fa-regular fa-thumbs-up"></i>
              <span id="like-${news.id}" class="text-[14px]">${news.like}</span>
            </button>
            <button id="dislike-btn-${news.id}" class="flex items-center gap-1 text-[18px] text-[black] hover:text-[red]">
              <i class="fa-regular fa-thumbs-down"></i>
              <span id="dislike-${news.id}" class="text-[14px]">${news.dislike}</span>
            </button>
          </div>
          <p class="text-base leading-[36px] pt-2 border-t border-gray-200">
            ${news.content}
          </p>
        </div>
      </div>
      <aside class="space-y-4 h-full">
        <h2 class="text-[24px] text-[#1894a0] font-semibold pb-2">Ən çox oxunanlar</h2>
        <div id="popular-news" class="space-y-3 text-sm h-screen overflow-y-auto w-[300px]">
          ${renderPopularNews(popularNews)}
        </div>
      </aside>
    </div>
  `;

  news.view++;
  await updateNews(news.id, { view: news.view, like: news.like, dislike: news.dislike });

  addLikeDislikeEvents(news.id);
}

function renderPopularNews(data) {
  return data
    .map(item => `
      <a href="details.html?id=${item.id}">
        <div class="flex space-x-4 bg-white p-4 shadow rounded-lg border border-gray-200" style="width: 282px; height: auto;">
          <div class="flex-1">
            <div class="flex justify-between text-xs text-gray-500">
              <span><i class="far fa-clock"></i> ${item.date}</span>
              <span><i class="far fa-eye"></i> ${item.view}</span>
            </div>
            <div class="flex space-x-2 mt-[10px]">
              <span class="bg-yellow-400 p-[4px_6px] rounded">
                <i class="fa-solid fa-bell text-white"></i>
              </span>
              <span class="bg-[#72b73b99] p-[4px_6px] text-white font-semibold text-[14px] rounded">
                <i class="fa-solid fa-video text-white mr-[5px]"></i>
              </span>
            </div>
            <p class="text-[18px] font-semibold leading-[26px] tracking-wide mt-[10px] text-[#464646]">${item.title}</p>
          </div>
        </div>
      </a>
    `)
    .join('');
}

async function addLikeDislikeEvents(newsId) {
  const data = await getAllNews();
  const news = data.find(item => item.id === newsId);

  if (!news) return;

  const likeBtn = document.getElementById(`like-btn-${news.id}`);
  const dislikeBtn = document.getElementById(`dislike-btn-${news.id}`);
  const likeCount = document.getElementById(`like-${news.id}`);
  const dislikeCount = document.getElementById(`dislike-${news.id}`);

  let liked = false;
  let disliked = false;

  likeBtn.addEventListener("click", async () => {
    animateButton(likeBtn);

    if (liked) {
      news.like--;
      liked = false;
      likeBtn.classList.remove("text-[#1894a0]");
      likeBtn.classList.add("text-[black]");
    } else {
      news.like++;
      liked = true;
      likeBtn.classList.add("text-[#1894a0]");
      likeBtn.classList.remove("text-[black]");
      if (disliked) {
        news.dislike--;
        disliked = false;
        dislikeBtn.classList.remove("text-[red]");
        dislikeBtn.classList.add("text-[black]");
      }
    }

    likeCount.textContent = news.like;
    dislikeCount.textContent = news.dislike;

    await updateNews(news.id, { like: news.like, dislike: news.dislike });
  });

  dislikeBtn.addEventListener("click", async () => {
    animateButton(dislikeBtn);

    if (disliked) {
      news.dislike--;
      disliked = false;
      dislikeBtn.classList.remove("text-[red]");
      dislikeBtn.classList.add("text-[black]");
    } else {
      news.dislike++;
      disliked = true;
      dislikeBtn.classList.add("text-[red]");
      dislikeBtn.classList.remove("text-[black]");
      if (liked) {
        news.like--;
        liked = false;
        likeBtn.classList.remove("text-[#1894a0]");
        likeBtn.classList.add("text-[black]");
      }
    }

    likeCount.textContent = news.like;
    dislikeCount.textContent = news.dislike;

    await updateNews(news.id, { like: news.like, dislike: news.dislike });
  });
}

function animateButton(button) {
  button.classList.add("scale-110");
  button.classList.add("transition", "duration-200");

  setTimeout(() => {
    button.classList.remove("scale-110");
  }, 200);
}

async function renderMainNewsCards() {
  const mainNewsContainer = document.getElementById("main-news-container");

  const data = await getAllNews();
  data.forEach(news => {
    const card = `
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-sm text-[#051d39]">
        <a href="details.html?id=${news.id}">
          <img class="w-full h-[200px] object-cover rounded-t-lg" src="${news.img}" alt="" />
        </a>
        <div class="p-5 space-y-3">
          <div class="flex justify-between text-sm text-[#051d39]">
            <span class="flex items-center gap-1">
              <i class="fa-regular fa-clock"></i>
              ${news.date}
            </span>
            <span class="flex items-center gap-1">
              <i class="fa-regular fa-eye"></i>
              ${news.view}
            </span>
          </div>
          <h5 class="text-lg font-semibold tracking-tight h-[100px]">
            ${news.title}
          </h5>
          <div class="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
            <span class="font-bold uppercase text-[#1894a0] tracking-wider">${news.category}</span>
            <div class="flex items-center gap-4">
              <button id="like-btn-${news.id}" class="flex items-center gap-1 text-[18px] text-[black] hover:text-[#1894a0]">
                <i class="fa-regular fa-thumbs-up"></i>
                <span id="like-${news.id}" class="text-[14px]">${news.like}</span>
              </button>
              <button id="dislike-btn-${news.id}" class="flex items-center gap-1 text-[18px] text-[black] hover:text-[red]">
                <i class="fa-regular fa-thumbs-down"></i>
                <span id="dislike-${news.id}" class="text-[14px]">${news.dislike}</span>
              </button>
            </div>
          </div>
        </div>
      </div>`;

    mainNewsContainer.innerHTML += card;
  });
}

// Başlanğıc funksiyalar
renderMainNewsCards();
renderDetail();
