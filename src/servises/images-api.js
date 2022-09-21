import axios from 'axios';

const KEY = '25783532-c25c49afce5183be9881181c4';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  const params = {
    key: KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: pageSize,
  };
  return axios({ params }).then(response => response.data);
};

export default fetchImages;
