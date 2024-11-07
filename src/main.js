import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showLoadMoreButton, hideLoadMoreButton, showEndOfResultsMessage } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
let totalHits = 0;

function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}

document.querySelector('.search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  await loadImages();
});

document.querySelector('.load-more').addEventListener('click', loadImages);

async function loadImages() {
  showLoader();

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(data.hits);

      if (page * 15 < totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        showEndOfResultsMessage();
      }

      smoothScroll();
      page += 1;
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}