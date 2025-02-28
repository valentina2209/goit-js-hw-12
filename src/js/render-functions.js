import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const galleryEl = document.querySelector(".gallery");
let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function clearGallery() {
  galleryEl.innerHTML = "";
}

export function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <li class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes: ${likes}</b></p>
          <p class="info-item"><b>Views: ${views}</b></p>
          <p class="info-item"><b>Comments: ${comments}</b></p>
          <p class="info-item"><b>Downloads: ${downloads}</b></p>
        </div>
      </li>
      `;
      }
    )
    .join("");
  galleryEl.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}



export function showLoader() {
  document.querySelector(".loader").hidden = false;
}

export function hideLoader() {
  document.querySelector(".loader").hidden = true;
}

export function notifyError(message) {
  iziToast.error({
    title: "Error",
    message,
    position: "topRight",
  });
}

export function notifyInfo(message) {
  iziToast.info({
    title: "Info",
    message,
    position: "topRight",
  });
}

export function smoothScroll() {
  // Отримуємо висоту першої карточки для розрахунку прокручування
  const firstCard = document.querySelector(".gallery .photo-card");
  if (firstCard) {
    const { height: cardHeight } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  }
}
