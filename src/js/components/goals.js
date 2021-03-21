export class Goals {
  constructor(el) {
    this.el = el;
    this.slides = JSON.parse(sessionStorage.getItem('slides'));
    this.slidesBelt = this.el.querySelector('.goals__row');
    this.slideItem = this.el.querySelectorAll('.goals__item');
    this.btnNext = this.el.querySelector('.goals__arrow');

    this.init();
    this.renderSlides(this.slides);
    this.setWidth();
    this.moveItemToEnd();
    this.setTransparencySlides();
  }

  init() {
    this.el.addEventListener('click', goalsClickHandler.bind(this));
  }

  renderSlides(slides) {
    const slidesHTML = createSlidesHtml(slides);
    this.slidesBelt.insertAdjacentHTML('afterbegin', slidesHTML);
  }

  getSlides() {
    let slides = this.el.querySelectorAll('.goals__item');
    return slides;
  }

  setWidth() {
    this.slideItem = this.el.querySelectorAll('.goals__item');
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
    let slides = this.getSlides();
    let clone = slides[0].cloneNode(true);
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

      setTimeout(() => {
        this.slidesBelt.style.transition = '0.3s';
      }, 0);
      this.btnNext.style.pointerEvents = 'auto';
    });
  }
}

function goalsClickHandler(event) {
  event.preventDefault();

  if (event.target.classList.contains('goals__arrow')) {
    this.showNextSlide();
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
