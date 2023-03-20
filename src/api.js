import axios from 'axios';
// export 

const options = {
  headers: {
    Authorization: '34494219-18836f66a27c5c5fdb378157c',
  },
};

const options = {
  headers: {
    Authorization: '34494219-18836f66a27c5c5fdb378157c',
  },
};

fetch(`https://pixabay.com/api/?q=cat&per_page=40`, options)
  .then(response => response.json())
  .then(data => console.log(data));

// Your API key: 34494219-18836f66a27c5c5fdb378157c

// async function getImages() {
//   const API_KEY = '34494219-18836f66a27c5c5fdb378157c';
//   const URL = `https://pixabay.com/api/?key=${API_KEY}&q=cat`;

//   try {
//     const response = await axios.get(URL);
//     console.log(response.data.hits);
//   } catch (error) {
//     console.log(error);
//   }
// }

// getImages();

