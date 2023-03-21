import './css/styles.css';
import axios from 'axios';
import PixApiService from './pix-api-service.js'

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const pixApiService = new PixApiService();

let searchQuery = "";

function onSearch(e) {
    e.preventDefault();

    pixApiService.query = e.currentTarget.elements.searchQuery.value;
    pixApiService.resetPage ();
pixApiService.fetchPictures(searchQuery);

}

function onLoadMore() {
 pixApiService.fetchPictures(searchQuery);
 };