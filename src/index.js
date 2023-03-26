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


const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

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



// function fetchGallery() {
//   loadMoreBtn.disable();
//   pixApiService
//     .fetchPictures()
//     .then(response => {

//       console.log(response.totalHits);
//       // const totalHits = response.totalHits;
//       // const currentHits = response.hits.length;

//       loadMoreBtn.show();
//       appendGalleryMarkup(response);
//       loadMoreBtn.enable();

//       if (totalHits === currentHits) {
//         loadMoreBtn.hide();
//         Notify.info("We're sorry, but you've reached the end of search results.");
//       }
//     })
//     .catch(error => {
//       const message = error.status === 404 ? 'Images not found' : 'An error occurred. Please try again.';
//       Notify.warning(message);
//       loadMoreBtn.disable();
//     });
// }









function fetchGallery() {
  loadMoreBtn.disable();
  pixApiService
    .fetchPictures()
    .then(hits => {

     
      const totalResult = pixApiService.hits;
      console.log(totalResult);
      

      if (totalResult === 0 && hits.length === 0) {
        throw new Error('Images not found');
      }

      if (!hits.length) {
        loadMoreBtn.hide();
        Notify.info("Wea re sorry, but you've reached the end of search results.");
        return;
      }  

      loadMoreBtn.show();
      appendGalleryMarkup(hits);
      loadMoreBtn.enable();
     
    }
  
  
  )
    .catch(error => {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.disable();
    });
}





 


function onLoadMore() {
  fetchGallery();
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
