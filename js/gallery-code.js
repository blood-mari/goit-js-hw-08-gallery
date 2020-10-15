import boxGallery from './gallery-items.js';
//console.log(boxGallery);

// Создание галлереи

const parentGalleryEl = document.querySelector('.js-gallery');

function onGalleryCreate(pictures) {
    return pictures.map(({original, preview, desc}) => {
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
    />
  </a>
</li>
    `;}).join('');
};


parentGalleryEl.insertAdjacentHTML('beforeend', onGalleryCreate(boxGallery));

// Операции над модалкой

const refs = {
    bigPicture: document.querySelector('.lightbox__image'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    backDrop: document.querySelector('.lightbox__overlay'),
    openModal: document.querySelector('.js-lightbox')
}

parentGalleryEl.addEventListener('click', onOpenModal);

function onOpenModal(ev) {
    ev.preventDefault();

    window.addEventListener('keydown', onEscPress);

    window.addEventListener('keydown', previousImage);

    window.addEventListener('keydown', nextImage);

    if (ev.target.nodeName !== "IMG") {
        return;
     }
        refs.openModal.classList.add('is-open');

        refs.bigPicture.src = ev.target.dataset.source;
        refs.bigPicture.alt = ev.target.alt;

        refs.closeModalBtn.addEventListener('click', onCloseBtnClick, ({ once: true }))


}

function onCloseBtnClick() {
    window.removeEventListener('keydown', onEscPress);

    window.removeEventListener('keydown', previousImage);

    window.removeEventListener('keydown', nextImage);

    refs.openModal.classList.remove('is-open');
    refs.bigPicture.src = '';
    refs.bigPicture.alt = '';
}

function onBackdropClick(ev) {

    if (ev.currentTarget === refs.backDrop) {
        console.log('Кликнули в бекдроп');
        onCloseBtnClick();
    }
}

refs.backDrop.addEventListener('click', onBackdropClick);

function onEscPress(ev) {
    if (ev.code !== "Escape") {
        return;
    }
    onCloseBtnClick();
}

function previousImage(ev) {
    console.log(ev.key);

    if (ev.key !== "ArrowLeft") {
        return;
    }

        let index = boxGallery.findIndex((el) => {
            return el.original === refs.bigPicture.getAttribute("src");
        });
        if (index === 0) {
            index = boxGallery.length;
        }
        index -= 1;
        const previousPic = boxGallery[index].original;
    refs.bigPicture.setAttribute("src", previousPic);
    refs.bigPicture.setAttribute("alt", previousPic);
}

function nextImage(ev) {
    if (ev.key !== "ArrowRight") {
        return;
    }

    let index = boxGallery.findIndex((el) => {
      return el.original === refs.bigPicture.getAttribute("src");
    });

      if (index === boxGallery.length - 1) {
            index = -1;
        }
        index += 1;
        const nextPic = boxGallery[index].original;
    refs.bigPicture.setAttribute("src", nextPic);
    refs.bigPicture.setAttribute("alt", nextPic);

    }
