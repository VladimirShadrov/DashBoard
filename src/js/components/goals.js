export class Goals {
  constructor(el) {
    this.el = el;
    this.slides = JSON.parse(sessionStorage.getItem('slides'));
    this.slidesBelt = this.el.querySelector('.goals__row');
    this.slideItem = this.el.querySelectorAll('.goals__item');
    this.btnNext = this.el.querySelector('.goals__arrow');
    this.overlay = this.el.querySelector('.goals__overlay');
    this.modalHTML = createModalHTML();
    this.goalIcon;

    this.init();
    this.renderSlides(this.slides);
    // this.setWidth();
    this.moveItemToEnd();
    this.setTransparencySlides();
  }

  init() {
    this.el.addEventListener('click', goalsClickHandler.bind(this));
  }

  renderSlides(slides) {
    const slidesHTML = createSlidesHtml(slides);
    this.slidesBelt.innerHTML = '';
    this.slidesBelt.insertAdjacentHTML('afterbegin', slidesHTML);
    this.setWidth();
  }

  getSlides() {
    let slides = this.el.querySelectorAll('.goals__item');
    return slides;
  }

  setWidth() {
    this.slideItem = this.getSlides();
    this.slidesBelt.style.width = `calc((33.33% * ${this.slideItem.length})`;
    this.slideItem.forEach((slide) => {
      slide.style.width = `calc(100% / ${this.slideItem.length} - 7.5px)`;
    });
  }

  setTransparencySlides() {
    const slides = this.getSlides();

    if (slides.length > 3) {
      for (let i = 3; i < slides.length; i++) {
        slides[i].style.opacity = '0';
      }
    }
  }

  getSlideWidth() {
    let slides = this.getSlides();
    let slideWidth = slides[0].getBoundingClientRect().width;

    return slideWidth;
  }

  showNextSlide() {
    let slides = this.getSlides();

    if (slides.length > 3) {
      slides[3].style.opacity = '1';
    }

    this.cloneFirstSlide();

    this.setWidth();
    let stepLength = `${this.getSlideWidth() + 15}px`;
    this.slidesBelt.style.transition = '0.3s';
    this.slidesBelt.style.transform = `translateX(-${stepLength})`;
    this.btnNext.style.pointerEvents = 'none';
  }

  cloneFirstSlide() {
    const slides = this.getSlides();

    const clone = slides[0].cloneNode(true);
    this.slidesBelt.style.transition = 'none';
    this.slidesBelt.appendChild(clone);
  }

  moveItemToEnd() {
    this.slidesBelt.addEventListener('transitionend', () => {
      this.slidesBelt.append(this.slidesBelt.firstElementChild);
      this.slidesBelt.style.transition = 'none';
      this.slidesBelt.style.transform = `translateX(0)`;
      this.slidesBelt.removeChild(this.slidesBelt.lastElementChild);
      this.setWidth();
      this.setTransparencySlides();
      this.btnNext.style.pointerEvents = 'auto';

      setTimeout(() => {
        this.slidesBelt.style.transition = '0.3s';
      }, 0);
    });
  }

  getItem(way) {
    const item = this.el.querySelector(way);
    return item;
  }

  renderGoaslModal() {
    this.overlay.insertAdjacentHTML('afterbegin', this.modalHTML);
    this.overlay.style.opacity = '1';
    this.overlay.style.zIndex = '1';
  }

  showGoalsModal() {
    const modal = this.getItem('.goals__modal');
    setTimeout(() => {
      modal.style.transform = 'translateY(0)';
    }, 50);
  }

  hideGoalsModal() {
    const modal = this.getItem('.goals__modal');

    modal.style.transform = 'translateY(200%)';
    this.overlay.style.opacity = '0';
    this.overlay.style.zIndex = '-1';

    setTimeout(() => {
      this.overlay.innerHTML = '';
    }, 500);
  }

  selectImage() {
    const images = this.el.querySelectorAll('.goals__image-link');
    images.forEach((image) => {
      image.addEventListener('click', (event) => {
        images.forEach((image) =>
          image.classList.remove('goals__image-link-active')
        );
        event.target.classList.add('goals__image-link-active');
        let picture = event.target.firstElementChild.getAttribute('src');
        this.goalIcon = picture;
      });
    });
  }

  createNewGoal() {
    const price =
      this.el.querySelector('.goals__data-entry-amount').value || '120';
    const amount = parseFloat(price).toLocaleString();
    const title =
      this.el.querySelector('.goals__data-entry-name').value || 'Holidays';

    return {
      price: amount,
      date: '12/20/20',
      image: this.goalIcon || './images/holidays.svg',
      title,
    };
  }

  clearInputs() {
    const price = this.el.querySelector('.goals__data-entry-amount');
    const title = this.el.querySelector('.goals__data-entry-name');
    price.value = '';
    title.value = '';
    this.el
      .querySelectorAll('.goals__image-link')
      .forEach((item) => item.classList.remove('goals__image-link-active'));
  }
}

function goalsClickHandler(event) {
  event.preventDefault();

  if (event.target.classList.contains('goals__arrow')) {
    this.showNextSlide();
  }

  if (event.target.classList.contains('goals__button')) {
    this.renderGoaslModal();
    this.showGoalsModal();
    this.selectImage();
  }

  if (event.target.classList.contains('goals__add-goal-btn')) {
    const newGoal = this.createNewGoal();
    this.clearInputs();
    this.hideGoalsModal();
    this.slidesBelt.style.transition = 'none';
    this.slides.push(newGoal);
    this.renderSlides(this.slides);
    this.setTransparencySlides();

    setTimeout(() => (this.slidesBelt.style.transition = '0.3s'), 50);
  }

  if (event.target.classList.contains('goals__overlay')) {
    this.hideGoalsModal();
  }
}

function createSlidesHtml(slides) {
  let html = '';

  slides.forEach((slide) => {
    html += `
    <div class="goals__item">
      <p class="goals__item-expense">$${slide.price}</p>
      <span class="goals__date">${slide.date}</span>
      <div class="goals__item-image">
        <img
          class="goals__item-img"
          src="${slide.image}"
          alt="${slide.title}"
        />
      </div>
      <p class="goals__item-goal">${slide.title}</p>
    </div>
  
    `;
  });

  return html;
}

function createModalHTML() {
  const html = `
  <div class="goals__modal">
    <p class="goals__modal-text">Enter the goal amount</p>
    <input
      type="text"
      class="goals__data-entry-amount"
      data-name="amount"
    />
    <p class="goals__modal-text">Select a picture</p>
    <div class="goals__pictures-container">
      <a href="#" class="goals__image-link">
        <img
          src="./images/holidays.svg"
          alt="Holidays"
          class="goals__image"
        />
      </a>
      <a href="#" class="goals__image-link">
        <img
          src="./images/renovation.svg"
          alt="Renovation"
          class="goals__image"
        />
      </a>
      <a href="#" class="goals__image-link">
        <img
          src="./images/xbox.svg"
          alt="Xbox"
          class="goals__image"
        />
      </a>
    </div>
    <p class="goals__modal-text">Enter the goal name</p>
    <input
      type="text"
      class="goals__data-entry-name"
      data-name="amount"
    />
    <a href="#" class="goals__add-goal-btn">Add the goal</a>
  </div>

  `;
  return html;
}
