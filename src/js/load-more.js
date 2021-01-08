export default class LoadMore {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.btn = document.querySelector(selector);
    refs.label = refs.btn.querySelector('.label');
    refs.spinner = refs.btn.querySelector('.spinner');

    return refs;
  }

  enable() {
    this.refs.btn.disabled = false;
    this.refs.label.textContent = 'Показать ещё';
    this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.refs.btn.disabled = true;
    this.refs.label.textContent = 'Загрузка...';
    this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.refs.btn.classList.remove('is-hidden');
  }

  hide() {
    this.refs.btn.classList.add('is-hidden');
  }
}
