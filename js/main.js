import { getAllNews, updateNews } from "./service.js";

let data = [];

async function getData() {
    data = await getAllNews();
    console.log(data);
    renderCards();
    addLikeDislikeEvents();
    incrementView()
}

function renderCards() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    data.forEach(news => {
        const card = `
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-sm text-[#051d39]">
            <a href="details.html?id=${news.id}" onclick="incrementView(${news.id})">
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
                <h5 class="text-lg font-semibold tracking-tight h-[80px]">
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

        newsContainer.innerHTML += card;
    });
}

function incrementView(newsId) {
    const newsItem = data.find(news => news.id === newsId);
    if (newsItem) {
        newsItem.view++;
        updateNews(newsId, {
            view: newsItem.view,
            like: newsItem.like,
            dislike: newsItem.dislike,
        });
    }
}

function addLikeDislikeEvents() {
    data.forEach(news => {
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

            await updateNews(news.id, {
                like: news.like,
                dislike: news.dislike,
            });
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

            await updateNews(news.id, {
                like: news.like,
                dislike: news.dislike,
            });
        });
    });
}
function animateButton(button) {
    button.classList.add("scale-110"); 
    button.classList.add("transition", "duration-200"); 

    setTimeout(() => {
        button.classList.remove("scale-110");
    }, 200); 
}

getData();

