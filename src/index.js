import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.esm.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import debounce from 'lodash.debounce';
import refs from './js/refs';
import markup from './templates/photo-card.hbs';
import PixabayApiService from './js/apiService';
import LoadMore from './js/load-more';
import modal from './js/modal';

const loadMore = new LoadMore({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const pixabayApiService = new PixabayApiService();

refs.serchForm.addEventListener(
  'input',
  debounce(e => onSearch(e), 500),
);

refs.serchForm.addEventListener('submit', e => e.preventDefault());

loadMore.refs.btn.addEventListener('click', fetchImages);

refs.galleryContainer.addEventListener('click', e => modal(e));

function onSearch(e) {
  pixabayApiService.query = e.target.value;

  if (pixabayApiService.query === '') {
    clearImagesContainer();
    loadMore.hide();
    return;
  }

  loadMore.show();
  pixabayApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  loadMore.disable();
  pixabayApiService.fetchImages().then(imgs => {
    appendImagesMarkup(imgs);
    loadMore.enable();
    if (refs.galleryContainer.childElementCount > 12) {
      loadMore.refs.btn.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  });
}

function appendImagesMarkup(imgs) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup(imgs));
}

function clearImagesContainer() {
  refs.galleryContainer.innerHTML = '';
}
