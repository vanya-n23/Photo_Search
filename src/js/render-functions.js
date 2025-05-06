import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map((image) => {
    return `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" class="gallery-image"/>
        <div class="info">
          <p class="article-strick"><b class="main-word">Likes:</b> ${image.likes}</p>
          <p class="article-strick"><b class="main-word">Views:</b> ${image.views}</p>
          <p class="article-strick"><b class="main-word">Comments:</b> ${image.comments}</p>
          <p class="article-strick"><b class="main-word">Downloads:</b> ${image.downloads}</p>
        </div>
      </a>`;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoadMoreButton() {
  document.querySelector('.load-more').style.display = 'block';
}

export function hideLoadMoreButton() {
  document.querySelector('.load-more').style.display = 'none';
}

export function showEndOfResultsMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
  });
}