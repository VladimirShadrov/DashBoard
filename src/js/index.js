import '../styles/styles.scss';
import '../styles/left-bar.scss';
import '../styles/right-bar.scss';
import '../styles/header.scss';
import '../styles/main-page.scss';
import '../styles/cards.scss';
import '../styles/transactions.scss';
import '../styles/goals.scss';
import '../styles/statistics.scss';
import '../styles/transfer.scss';
import { LeftBar } from './components/leftBar';
import { SaveCardsDataToStorage } from './data/data';
import { Cards } from './components/cards';
import { OutcomeStatistics } from './components/outcomeStatistics';

const leftBar = document.querySelector('.left-bar');
const cards = document.querySelector('.cards');
const statistics = document.querySelector('.statistics');

new LeftBar(leftBar);
new SaveCardsDataToStorage();
new Cards(cards, statistics);
new OutcomeStatistics(statistics);

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);
