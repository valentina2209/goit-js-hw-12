import { fetchImages } from "./js/pixabay-api.js";
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
  notifyError,
  notifyInfo,
  smoothScroll,
} from "./js/render-functions.js";

const formEl = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;

// Приховуємо кнопку на старті
loadMoreBtn.hidden = true;

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  currentQuery = event.currentTarget.query.value.trim();
  if (currentQuery === "") {
    notifyError("Please enter a search query.");
    return;
  }

  currentPage = 1;
  totalHits = 0;
  clearGallery();
  loadMoreBtn.hidden = true; // Ховаємо перед пошуком

  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      notifyError("Sorry, there are no images matching your search query.");
      return;
    }

    totalHits = data.totalHits;
    renderImages(data.hits);

    // Показуємо кнопку, якщо ще є сторінки
    if (currentPage * 40 < totalHits) {
      loadMoreBtn.hidden = false;
    }
  } catch (error) {
    hideLoader();
    notifyError("Something went wrong. Please try again later.");
    console.error(error);
  }
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      notifyInfo("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.hidden = true;
      return;
    }

    renderImages(data.hits);
    smoothScroll();

    // Якщо досягли кінця – ховаємо кнопку
    if (currentPage * 40 >= totalHits) {
      loadMoreBtn.hidden = true;
      notifyInfo("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    hideLoader();
    notifyError("Something went wrong. Please try again later.");
    console.error(error);
  }
});

