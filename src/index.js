import './css/styles.css';

// бібліотеки
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
    return alert('type something');
  }

  pixApiService.resetPage();

  loadMoreBtn.show();

  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  pixApiService.fetchPictures().then(hits => {
    appendGalleryMarkup(hits);
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
