import '../styles/styles.scss';
import '../styles/left-bar.scss';
import '../styles/right-bar.scss';
import '../styles/header.scss';

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);
