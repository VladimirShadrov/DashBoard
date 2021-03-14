const cards = [
  {
    cardNumberFirst: '5789',
    cardNumberLast: '2847',
    cardHolder: 'Mike Smith',
    expireDate: '06/21',
    balance: '2850.75',
    income: '1500.50',
    outcome: '350.60',
    shopping: 52,
    electronics: 21,
    travels: 74,
  },
  {
    cardNumberFirst: '3987',
    cardNumberLast: '2143',
    cardHolder: 'John First',
    expireDate: '09/22',
    balance: '3890.45',
    income: '2600.74',
    outcome: '2150.00',
    shopping: 14,
    electronics: 83,
    travels: 37,
  },
  {
    cardNumberFirst: '6214',
    cardNumberLast: '9754',
    cardHolder: 'Joe Louis',
    expireDate: '01/22',
    balance: '7025.54',
    income: '5971.50',
    outcome: '2864.10',
    shopping: 87,
    electronics: 22,
    travels: 78,
  },
];

export function SaveCardsDataToStorage() {
  sessionStorage.setItem('cards', JSON.stringify(cards));
}
