import './css/styles.css';

// бібліотеки
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// клас
import PixApiService from './pix-api-service';
import LoadMoreBtn from './loadMoreBtn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  //   loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', fetchImages);

const pixApiService = new PixApiService();

let searchQuery = '';

function onSearch(e) {
  e.preventDefault();
  clearGalleryContainer();

  pixApiService.query = e.currentTarget.elements.searchQuery.value;

  if (pixApiService.query === '') {
    return Notify.info(
      'Type something for search.'
    );
  }

  pixApiService.resetPage();

  loadMoreBtn.show();

  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  pixApiService.fetchPictures().then(hits => {
    if (hits.length === 0) {
      throw new Error('Images not found');
    }
    appendGalleryMarkup(hits);
    loadMoreBtn.enable();
  }).catch(error => {
    // console.error(error);
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.enable();
  });
}


function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    createGalleryCardsMarkup(hits)
  );
}

function createGalleryCardsMarkup(hits) {
  return hits
    .map(
      hit => `
      <div class="photo-card">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${hit.likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${hit.views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${hit.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${hit.downloads}</b>
          </p>
        </div>
      </div>`
    )
    .join('');
}

// const lightbox = new SimpleLightbox('.gallery', {
//   captionDelay: 250,
//   captionsData: 'alt',
//   enableKeyboard: true,
// });

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
