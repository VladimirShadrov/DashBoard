export class Cards {
  constructor(cards) {
    this.el = cards;
    this.data = JSON.parse(sessionStorage.getItem('cards'));
    this.sliderContainer = this.el.querySelector('.cards__card-wrapper');
    this.slidesBand = this.el.querySelector('.cards__band');
    this.btnNext = this.el.querySelector('.cards__btn-next');
    this.btnPrev = this.el.querySelector('.cards__btn-prev');
    this.currentBalance = this.el.querySelector(
      '.cards__current-balance-value'
    );
    this.income = this.el.querySelector('.cards__imcome-value');
    this.outcome = this.el.querySelector('.cards__outcome-value');
    this.cardBalanceOutcome = this.el.querySelector(
      '.cards__balance-item-outcome'
    );
    this.cardBalanceTotal = this.el.querySelector('.cards__balance-item-total');
    this.cardProgressBar = this.el.querySelector('.cards__progress-bar');

    this.counter = 0;
    this.slideDirection;
    console.log(this.slideDirection);

    this.init();
    this.renderSlider(this.data);
    this.updateBalanceInformation(this.data[this.counter]);
    this.changeSlidePosition();
  }

  init() {
    this.el.addEventListener('click', cardsClickHandler.bind(this));
  }

  renderSlider(data) {
    this.slidesHtml = createSlides(data);
    this.slidesBand.insertAdjacentHTML('beforeend', this.slidesHtml);
  }

  increaseCounter() {
    if (this.counter >= 0 && this.counter < this.data.length) this.counter++;
    if (this.counter === this.data.length) this.counter = 0;

    sessionStorage.setItem('counter', this.counter.toString());
  }

  reduceCounter() {
    if (this.counter < this.data.length && this.counter >= 0) this.counter--;
    if (this.counter < 0) this.counter = this.data.length - 1;

    sessionStorage.setItem('counter', this.counter.toString());
  }

  updateBalanceInformation(card) {
    let progressBarWidth = `${parseInt((card.outcome / card.income) * 100)}%`;
    this.currentBalance.textContent = `${card.balance}`;
    this.income.textContent = `${card.income}`;
    this.outcome.textContent = `${card.outcome}`;
    this.cardBalanceOutcome.textContent = `$${parseFloat(
      card.outcome
    ).toLocaleString()}`;
    this.cardBalanceTotal.textContent = `$${(
      parseInt(card.balance) +
      parseInt(card.income) -
      parseInt(card.outcome)
    ).toLocaleString()}`;

    this.cardProgressBar.style.width = progressBarWidth;
  }

  showNextSlide() {
    if (this.slideDirection === 'back') {
      this.slidesBand.prepend(this.slidesBand.lastElementChild);
    }

    this.slideDirection = 'forward';

    this.slidesBand.style.left = '0';
    this.slidesBand.style.right = 'unset';
    this.slidesBand.style.transform = `translateX(-${
      +this.slidesBand.getBoundingClientRect().width / this.data.length
    }px)`;
  }

  showPreviousSlide() {
    if (this.slideDirection === 'forward' || !this.slideDirection) {
      this.slideDirection = 'back';
      this.slidesBand.append(this.slidesBand.firstElementChild);
    }

    this.slidesBand.style.left = 'unset';
    this.slidesBand.style.right = '0';
    this.slidesBand.style.transform = `translateX(${
      +this.slidesBand.getBoundingClientRect().width / this.data.length
    }px)`;
  }

  changeSlidePosition() {
    this.slidesBand.addEventListener('transitionend', () => {
      if (this.slideDirection === 'back') {
        this.slidesBand.prepend(this.slidesBand.lastElementChild);
      } else if (this.slideDirection === 'forward') {
        this.slidesBand.append(this.slidesBand.firstElementChild);
      }

      this.slidesBand.style.transition = 'none';
      this.slidesBand.style.transform = 'translateX(0)';
      this.updateBalanceInformation(this.data[this.counter]);
      this.btnNext.removeAttribute('disabled');
      this.btnPrev.removeAttribute('disabled');

      setTimeout(() => {
        this.slidesBand.style.transition = '0.3s';
      });
    });
  }
}

function cardsClickHandler(event) {
  if (event.target.classList.contains('cards__btn-next')) {
    this.increaseCounter();
    this.showNextSlide();
    this.btnNext.setAttribute('disabled', true);
  }

  if (event.target.classList.contains('cards__btn-prev')) {
    this.reduceCounter();
    this.showPreviousSlide();
    this.btnPrev.setAttribute('disabled', true);
  }
}

function createSlides(slidesData) {
  let html = '';

  slidesData.forEach((slide) => {
    html += `
      <div class="cards__card">
        <img
          class="cards__card-image"
          src="./images/card-image.png"
          alt="card-image"
        />
        <h6 class="cards__card-title">cloudcash</h6>
        <span class="cards__premium-account">
          PREMIUM ACCOUNT
        </span>
        <div class="cards__card-number">
          <span>${slide.cardNumberFirst}</span>
          <span>****</span>
          <span>****</span>
          <span>${slide.cardNumberLast}</span>
        </div>
        <div class="cards__card-holder">
          <div class="cards__card-holder-item">
            <p class="cards__card-holder-title">Card holder</p>
            <p class="cards__card-holder-value">${slide.cardHolder}</p>
          </div>
          <div class="cards__card-holder-item">
            <p class="cards__card-holder-title">Expire date</p>
            <p class="cards__card-holder-value">${slide.expireDate}</p>
          </div>
        </div>
      </div>
    `;
  });

  return html;
}
