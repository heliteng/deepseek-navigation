import { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import NavGrid from './components/NavGrid.vue';
import NavCard from './components/NavCard.vue';
import './styles/main.scss';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('NavGrid', NavGrid);
    app.component('NavCard', NavCard);
  }
} satisfies Theme; 