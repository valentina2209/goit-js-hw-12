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


loadMoreBtn.style.display = "none";

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
  loadMoreBtn.style.display = "none"; 
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

    
    if (currentPage * 40 < totalHits) {
      loadMoreBtn.style.display = "block";
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
      loadMoreBtn.style.display = "none";
      return;
    }

    renderImages(data.hits);
    smoothScroll();

   
    if (currentPage * 40 >= totalHits) {
      loadMoreBtn.style.display = "none";
      notifyInfo("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    hideLoader();
    notifyError("Something went wrong. Please try again later.");
    console.error(error);
  }
});
