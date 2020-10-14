import boxGallery from './gallery-items.js';

// Создание галлереи

const galleryEl = options => {
    const { original, preview, desc } = options;

    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${desc}"
    />
  </a>
</li>
    `;
};

// console.log(boxGallery);

const parentGalleryEl = document.querySelector('.gallery');

const galleryPushImg = boxGallery
  .map(galleryEl)
  .join('');

parentGalleryEl.insertAdjacentHTML('afterbegin', galleryPushImg);

// console.log(galleryPushImg);

// Операции над модалкой

const refs = {
    bigPicture: document.querySelector('.lightbox__image'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    backDrop: document.querySelector('.js-lightbox'),
}

parentGalleryEl.addEventListener('click', onOpenModal);

function onOpenModal(ev) {
    ev.preventDefault();

    window.addEventListener('keydown', onEscPress);

    if (ev.target.nodeName === "IMG") {
    refs.backDrop.classList.add('is-open');
    refs.bigPicture.src = ev.target.dataset.source;
    }

    return;
}

refs.closeModalBtn.addEventListener('click', onCloseBtnClick);

function onCloseBtnClick(ev) {
    window.removeEventListener('keydown', onEscPress);

    refs.backDrop.classList.remove('is-open');
    refs.bigPicture.src = '';

    return;
}

refs.backDrop.addEventListener('click', onBackdropClick);

function onBackdropClick(ev) {
    if (event.currentTarget === event.target) {
        onCloseBtnClick();
    }
}



