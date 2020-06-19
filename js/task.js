import urls from './gallery-items.js';
const refs = {
  galleryListRef: document.querySelector('.js-gallery'),
  lightboxRef: document.querySelector('.lightbox'),
  modalBoxImgRef: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('button[data-action= "close-lightbox"]'),
  lightboxOverlay: document.querySelector('.lightbox__content'),
};

urls.forEach(galleryItem => {
  refs.galleryListRef.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${galleryItem.original}"
    >
      <img
        class="gallery__image"
        src="${galleryItem.preview}"
        data-source="${galleryItem.original}"
        alt="${galleryItem.description}"
      />
    </a>
  </li>`,
  );
});

refs.galleryListRef.addEventListener('click', onImgClick);
refs.closeBtn.addEventListener('click', closeImage);
refs.lightboxOverlay.addEventListener('click', closeImageWithOverlay);

function onImgClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const imgRef = event.target;
  const largeImgURL = imgRef.dataset.source;
  setModalBoxImgAts(largeImgURL);
  refs.lightboxRef.classList.add('is-open');
  document.addEventListener('keydown', closeImageWithEsc);
}
function setModalBoxImgAts(url) {
  refs.modalBoxImgRef.src = url;
  refs.modalBoxImgRef.alt = event.target.alt;
}

function closeImage(event) {
  refs.lightboxRef.classList.remove('is-open');
  removeModalBoxImgAts();
  document.removeEventListener('keydown', closeImageWithEsc);
}
function removeModalBoxImgAts() {
  refs.modalBoxImgRef.src = '';
  refs.modalBoxImgRef.alt = '';
}
function closeImageWithOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeImage();
}

function closeImageWithEsc(event) {
  if (event.code !== 'Escape') {
    return;
  }
  closeImage();
}
