const slides = [
  {
    price: '550',
    date: '12/20/20',
    image: './images/holidays.svg',
    title: 'Holidays',
  },
  {
    price: '200',
    date: '12/20/20',
    image: './images/renovation.svg',
    title: 'Renovation',
  },
  {
    price: '820',
    date: '12/20/20',
    image: './images/xbox.svg',
    title: 'Xbox',
  },
];

export function saveSlidesToStorage() {
  sessionStorage.setItem('slides', JSON.stringify(slides));
}
