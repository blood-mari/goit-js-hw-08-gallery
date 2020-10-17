import boxGallery from './gallery-items.js';
//console.log(boxGallery);

// Создание галлереи

const parentGalleryEl = document.querySelector('.js-gallery');

let currentIndex;

function onGalleryCreate(pictures) {
    return pictures.map(({original, preview, desc}, currentIndex) => {
      return  `
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
      data-index="${currentIndex}"
    />
  </a>
</li>
    `;
    }).join('');

};

parentGalleryEl.insertAdjacentHTML('beforeend', onGalleryCreate(boxGallery));

// Операции над модалкой

const refs = {
    bigPicture: document.querySelector('.lightbox__image'),
    backDrop: document.querySelector('.lightbox__overlay'),
    openModal: document.querySelector('.js-lightbox'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
}

parentGalleryEl.addEventListener('click', onOpenModal);

refs.backDrop.addEventListener('click', onCloseModal);

function onOpenModal(ev) {
    ev.preventDefault();

    if (ev.target.nodeName !== "IMG") {
        return;
    }

    refs.openModal.classList.add('is-open');

    document.addEventListener('keydown', onPressHandler);

        refs.bigPicture.src = ev.target.dataset.source;
    refs.bigPicture.alt = ev.target.alt;

    currentIndex = Number(ev.target.dataset.index);

        refs.closeModalBtn.addEventListener('click', onCloseModal, ({ once: true }))

}

function onCloseModal() {

    refs.openModal.classList.remove('is-open');
    refs.bigPicture.src = '';
    refs.bigPicture.alt = '';
}

// Перелистывание стрелками

function moveImageLeft(ev) {

    if (currentIndex === 0) { currentIndex = boxGallery.length; }

    currentIndex -= 1;

    const previousPic = boxGallery[currentIndex].original;

    refs.bigPicture.setAttribute("src", previousPic);

    refs.bigPicture.setAttribute("alt", previousPic);

}

function moveImageRight(ev) {

      if (currentIndex === boxGallery.length - 1) {
        currentIndex = -1;
        }
        currentIndex += 1;
    const nextPic = boxGallery[currentIndex].original;

    refs.bigPicture.setAttribute("src", nextPic);
    refs.bigPicture.setAttribute("alt", nextPic);

    }

function onPressHandler(ev) {
    if (ev.code === "Escape" || ev.currentTarget === refs.backDrop) onCloseModal();
    if (ev.code === 'ArrowLeft') moveImageLeft();
    if (ev.code === 'ArrowRight') moveImageRight();
    }