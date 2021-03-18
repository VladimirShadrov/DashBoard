export class Transaction {
  constructor(el) {
    this.el = el;
    this.input = this.el.querySelector('.transfer__input-field');
    this.overlay = this.el.querySelector('.transfer__overlay');
    this.transferModalHtml = createTransferModalHtml();
    this.successModalHtml = createSuccessModalHtml();
    this.transferModal;
    this.dropdown;
    this.dropdownText;
    this.dropdownArrow;
    this.dropdownList;
    this.successModal;
    this.okButton;
    this.amountText;
    this.recipientName;
    this.transferAmount;
    this.transferRecipient;

    this.init();
  }

  init() {
    this.el.addEventListener('click', transferClickHandler.bind(this));
  }

  getTransferAmount() {
    this.transferAmount = parseFloat(this.input.value).toLocaleString();

    if (!parseFloat(this.transferAmount)) {
      this.inputError();
    } else {
      this.clearInput();
    }
  }

  inputError() {
    this.input.style.border = '1px solid red';
    this.input.style.fontSize = '16px';
    this.input.setAttribute('placeholder', 'Enter a number');
    this.input.style.color = 'red';
    this.input.value = '';
  }

  clearInput() {
    this.input.value = '';
    this.input.style.fontSize = '24px';
    this.input.setAttribute('placeholder', '0');
    this.input.style.border = '1px solid rgba(174, 174, 174, 1)';
    this.input.style.color = 'rgba(64, 64, 64, 1)';
  }

  showOverlay() {
    this.overlay.style.opacity = '1';
    this.overlay.style.zIndex = '1';
  }

  hideOverlay() {
    this.overlay.style.opacity = '0';
    this.overlay.style.zIndex = '-1';
  }

  createModal(html) {
    this.destroyModal();
    this.overlay.insertAdjacentHTML('afterbegin', html);
  }

  renderTransferModal() {
    this.showOverlay();
    this.createModal(this.transferModalHtml);
    this.getTransferModalItems();
  }

  showTransferModal() {
    this.transferModal.style.transform = 'translateY(0)';
  }

  hideModal(el) {
    el.style.transform = 'translateY(200%)';
    this.hideOverlay();
    setTimeout(() => {
      this.destroyModal();
    }, 500);
  }

  getTransferModalItems() {
    this.transferModal = this.el.querySelector('.transfer__modal-transfer');
    this.dropdown = this.el.querySelector('.transfer__dropdown-container');
    this.dropdownText = this.el.querySelector('.transfer__dropdown-text');
    this.dropdownList = this.el.querySelector('.transfer__dropdown');
    this.dropdownArrow = this.el.querySelector('.transfer__arrow-container');
  }

  destroyModal() {
    this.overlay.innerHTML = '';
  }

  openDropdownList() {
    this.dropdownList.classList.remove('hide');
    this.rotateDropdownArrow();
    this.cancelDropdownError();
  }

  hideDropdownList() {
    this.dropdownList.classList.add('hide');
    this.cancelRotateDropdownArrow();
  }

  rotateDropdownArrow() {
    this.dropdownArrow.style.transform = 'rotate(135deg)';
  }

  cancelRotateDropdownArrow() {
    this.dropdownArrow.style.transform = 'rotate(-45deg)';
  }

  selectRecipientTransfer() {
    this.dropdownText.textContent = this.transferRecipient;
  }

  dropdownError() {
    if (!this.transferRecipient) {
      this.dropdown.style.border = '1px solid red';
      this.dropdownText.style.color = 'red';
    }
  }

  cancelDropdownError() {
    this.dropdown.style.border = '1px solid rgba(64, 64, 64, 1)';
    this.dropdownText.style.color = 'rgba(64, 64, 64, 1)';
  }

  getSuccessModalItems() {
    this.okButton = this.el.querySelector('.transfer__ok');
    this.successModal = this.el.querySelector('.transfer__modal-success');
    this.amountText = this.el.querySelector('.transfer__amount');
    this.recipientName = this.el.querySelector('.transfer__recipient');
  }

  renderSuccessModal() {
    this.createModal(this.successModalHtml);
    this.getSuccessModalItems();
    this.amountText.textContent = this.transferAmount;
    this.recipientName.textContent = this.transferRecipient;
  }
}

function transferClickHandler(event) {
  event.preventDefault();

  if (event.target.classList.contains('transfer__transfer-link')) {
    this.getTransferAmount();

    if (parseFloat(this.transferAmount)) {
      this.renderTransferModal();
      setTimeout(() => {
        this.showTransferModal();
      }, 100);
    }
  }

  if (event.target.classList.contains('transfer__dropdown-container')) {
    this.openDropdownList();
  }

  if (event.target.dataset.name === 'recipient') {
    this.transferRecipient = event.target.dataset.id;
    this.hideDropdownList();
    this.selectRecipientTransfer();
  }

  if (
    event.target.classList.contains('transfer__close') ||
    event.target.classList.contains('transfer__overlay')
  ) {
    this.hideModal(this.transferModal);
    this.transferRecipient = '';
  }

  if (event.target.classList.contains('transfer__send-transfer')) {
    this.dropdownError();

    if (this.transferRecipient) {
      this.destroyModal();
      this.renderSuccessModal();
      this.transferRecipient = '';
    }
  }

  if (event.target.classList.contains('transfer__ok')) {
    this.successModal.style.transform = 'translateY(500%)';
    this.hideOverlay();
    setTimeout(() => {
      this.destroyModal();
    }, 500);
  }
}

function createTransferModalHtml() {
  const html = `
  <div class="transfer__modal-transfer">
    <span class="transfer__close">X</span>
    <div
      class="transfer__dropdown-container"
      data-name="container"
      >
      <span class="transfer__dropdown-text">Select a recipient</span>
      <div class="transfer__arrow-container">
        <span class="transfer__arrow-icon"></span>
      </div>
      <ul class="transfer__dropdown hide">
        <li
          class="transfer__dropdown-item"
          data-name="recipient"
          data-id="Ann"
          >
          Ann
        </li>
        <li
          class="transfer__dropdown-item"
          data-name="recipient"
          data-id="Monica"
          >
          Monica
        </li>
        <li
          class="transfer__dropdown-item"
          data-name="recipient"
          data-id="John"
          >
          John
        </li>
        <li
          class="transfer__dropdown-item"
          data-name="recipient"
          data-id="Mike"
          >
          Mike
        </li>
        <li
          class="transfer__dropdown-item"
          data-name="recipient"
          data-id="Mia"
         >
          Mia
        </li>
      </ul>
    </div>
    <a href="#" class="transfer__send-transfer">Transfer</a>
  </div>

  `;
  return html;
}

function createSuccessModalHtml() {
  const html = `
  <div class="transfer__modal-success">
    <span class="transfer__close">X</span>
    <p class="transfer__success-text">
      Your transfer of $
      <span class="transfer__amount"></span>
      was successfully sent to the recipient
      <span class="transfer__recipient"></span>
    </p>
    <button class="transfer__ok">OK</button>
  </div>

  `;
  return html;
}
