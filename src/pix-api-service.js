export default class PixApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchPictures() {
    // console.log(this);
    const API_KEY = '34494219-18836f66a27c5c5fdb378157c';
    const per_page = 40;
    // const image_type = 'photo';
    // const orientation = 'horizontal';
    // const safesearch = true;

    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&per_page=40&page=${this.page}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
          this.page += 1;
      })
      .catch(error => console.log('error'));
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


}

