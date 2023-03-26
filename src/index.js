import './css/styles.css';

// бібліотеки
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// клас
import PixApiService from './pix-api-service';
import LoadMoreBtn from './loadMoreBtn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  //   loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

const pixApiService = new PixApiService();



let searchQuery = '';

function onSearch(e) {
  e.preventDefault();
  clearGalleryContainer();

  pixApiService.query = e.currentTarget.elements.searchQuery.value;

  if (pixApiService.query === '') {
    return Notify.info('Type something for search.');
  }

  pixApiService.resetPage();

  fetchGallery();
}



function fetchGallery() {
  loadMoreBtn.disable();
  pixApiService
    .fetchPictures()
    .then(hits => {
      const totalResult = pixApiService.totalHits;
      // console.log(totalResult);

      if (totalResult === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadMoreBtn.disable();
        return;
      }

      const currentPage = pixApiService.page - 1;
      // console.log(currentPage);

      // if (!hits.length) {
      //   loadMoreBtn.hide();
      //   Notify.info(
      //     "We are sorry, but you've reached the end of search results."
      //   );
      //   return;
      // }

      if (currentPage === 1) {
        Notify.success(`Hooray! We found ${totalResult} images.`);
      }

      loadMoreBtn.show();
      appendGalleryMarkup(hits);
      loadMoreBtn.enable();

      const lastPage = Math.ceil(totalResult / pixApiService.perPage);
      // console.log(pixApiService.perPage);
      // console.log(lastPage);

      if (currentPage === lastPage) {
        Notify.success(
          "We are sorry, but you've reached the end of search results."
        );
        loadMoreBtn.hide();
      }
    })
    .catch(error => {
      Notify.warning('Sorry,something went wrong with your search!');
      loadMoreBtn.disable();
    });
}

function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    createGalleryCardsMarkup(hits)
  );

    lightbox.refresh();
}

function createGalleryCardsMarkup(hits) {
  return hits
    .map(
      hit => `<a class = "gallery-item" href = "${hit.largeImageURL}">
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
      </div></a>`
    )
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: `alt`,
  captionDelay: 250,
});


function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
