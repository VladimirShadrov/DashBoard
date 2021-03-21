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
import { saveSlidesToStorage } from './data/slides';
import { Cards } from './components/cards';
import { OutcomeStatistics } from './components/outcomeStatistics';
import { Transaction } from './components/transaction';
import { Goals } from './components/goals';

const leftBar = document.querySelector('.left-bar');
const cards = document.querySelector('.cards');
const statistics = document.querySelector('.statistics');
const transaction = document.querySelector('.transfer');
const goals = document.querySelector('.goals');

new LeftBar(leftBar);
new SaveCardsDataToStorage();
new saveSlidesToStorage();
new Cards(cards, statistics);
new OutcomeStatistics(statistics);
new Transaction(transaction);
new Goals(goals);

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);
