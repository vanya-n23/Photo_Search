import axios from 'axios';

const API_KEY = '46793752-15e3775c3640735c851618a54';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15; 

export async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;

  const response = await axios.get(url);
  return response.data;
}