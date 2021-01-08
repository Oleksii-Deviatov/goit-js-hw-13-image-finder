import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function modal(e) {
  if (e.target.nodeName !== 'IMG') return;

  return basicLightbox
    .create(
      `
    <img src="${e.target.dataset.source}" >
`,
      {
        onShow: instance => {
          document.body.classList.add('overflow');
        },
        onClose: instance => {
          document.body.classList.remove('overflow');
        },
      },
    )
    .show();
}

export default modal;
