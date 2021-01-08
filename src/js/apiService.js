const baseUrl = 'https://pixabay.com/api/';
const apikey = '19742000-8f2cd71a75112bf6e0b5f6064';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
  }

  async fetchImages() {
    const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${apikey}`;
    const resp = await fetch(url);
    const { hits } = await resp.json();
    this.incrementPage();
    return hits;
  }

  incrementPage() {
    this.page += 1;
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
