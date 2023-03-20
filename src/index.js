import './css/styles.css';
import axios from 'axios';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.currentTarget.elements.searchQuery.value;

    const API_KEY = '34494219-18836f66a27c5c5fdb378157c';
    // const search_term = 'cat';
    const per_page = 40;
    // const image_type = 'photo';
    // const orientation = 'horizontal';
    // const safesearch = true;

    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&per_page=40`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Обробка даних
      })
      .catch(error => console.log('error'));
}

