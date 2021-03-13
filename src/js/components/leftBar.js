export class LeftBar {
  constructor(el) {
    this.el = el;
    this.burgerButton = this.el.querySelector('.left-bar__open');
    this.overlay = this.el.previousElementSibling;

    this.init();
  }

  openMenu() {
    this.burgerButton.classList.add('left-bar__close');

    setTimeout(() => {
      this.el.classList.add('left-bar__open-menu');
      this.el.classList.remove('left-bar');
      this.burgerButton.style.right = '5px';
      this.burgerButton.style.top = '55px';
      this.burgerButton.removeAttribute('data-name');
      this.burgerButton.setAttribute('data-name', 'close');
      this.overlay.style.opacity = '1';
      this.overlay.style.zIndex = '1';
    }, 300);
  }

  closeMenu() {
    this.burgerButton.classList.remove('left-bar__close');

    setTimeout(() => {
      this.el.classList.remove('left-bar__open-menu');
      this.el.classList.add('left-bar');
      this.burgerButton.style.right = '-50px';
      this.burgerButton.style.top = '42px';
      this.burgerButton.removeAttribute('data-name');
      this.burgerButton.setAttribute('data-name', 'open');
      this.overlay.style.opacity = '0';
      this.overlay.style.zIndex = '-1';
    }, 300);
  }

  init() {
    this.el.addEventListener('click', manageLeftBar.bind(this));
  }
}

function manageLeftBar(event) {
  if (event.target.dataset.name === 'open') {
    this.openMenu();
  }

  if (event.target.dataset.name === 'close') {
    this.closeMenu();
  }
}
