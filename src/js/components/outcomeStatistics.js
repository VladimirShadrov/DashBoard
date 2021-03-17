export class OutcomeStatistics {
  constructor(el) {
    this.el = el;
    this.shoppingProgressBar = this.el.querySelector(
      '.statistics__shopping-progress-bar'
    );
    this.electronicsProgressBar = this.el.querySelector(
      '.statistics__electronics-progress-bar'
    );
    this.travelsProgressBar = this.el.querySelector(
      '.statistics__travels-progress-bar'
    );
    this.shoppingValue = this.el.querySelector('.statistics__shopping-value');
    this.electronicsValue = this.el.querySelector(
      '.statistics__electronics-value'
    );
    this.travelsValue = this.el.querySelector('.statistics__travels-value');
  }

  cangeProgressBarWidth(arr) {
    this.shoppingProgressBar.style.width = `${arr.shopping}%`;
    this.shoppingValue.innerHTML = `${arr.shopping}%`;
    this.electronicsProgressBar.style.width = `${arr.electronics}%`;
    this.electronicsValue.innerHTML = `${arr.electronics}%`;
    this.travelsProgressBar.style.width = `${arr.travels}%`;
    this.travelsValue.innerHTML = `${arr.travels}%`;
  }
}
