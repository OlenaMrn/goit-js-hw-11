import axios from 'axios';

const API_KEY = '34494219-18836f66a27c5c5fdb378157c';

export default class PixApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  async fetchPictures() {
    const params = {
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    };

    const response = await axios.get('https://pixabay.com/api/', { params });
    const { data } = response;
    this.page += 1;
    return data.hits;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get hits() {
    return this.totalHits;
  }

  set hits(newTotalHits) {
    this.totalHits = newTotalHits;
  }
}
