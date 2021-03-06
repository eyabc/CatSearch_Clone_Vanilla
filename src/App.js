import api from './api.js'
import Theme from './Theme.js'
import SearchInput from './SearchInput.js'
import SearchResult from './SearchResult.js'
import ImageInfo from './ImageInfo.js'

const LAST_DATA = 'lastData';
const LAST_SEARCH_KEY = 'lastSearchKey';
const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;


export default class App {
  constructor ($target) {
    this.data = [];

    const applyTheme = (value) => {
      const $bodyClass = document.body.classList;
      if(value) {
        $bodyClass.remove('white');
        $bodyClass.add('dark');
      } else {
        $bodyClass.remove('dark');
        $bodyClass.add('white');
      }
    };
    applyTheme(isDark);


    new Theme({
      $target,
      isDark,
      toggleTheme: (value) => applyTheme(value)
    });

    new SearchInput({
      $target,
      getItem: this.getItem,
      setItem: this.setItem,
      onSearch: async keyword => {
        const data = await api.fetchCats(keyword);
        this.setItem(keyword, LAST_SEARCH_KEY);
        this.setState(data);
      },
      onRandom: async () => {
        const data = await api.fetchRandomImages();
        this.setItem('cat', LAST_SEARCH_KEY);
        this.setState(data);
      }
    });
    this.searchResult = new SearchResult({
      $target,
      openInfo: id => {
        this.imageInfo.setState({
          visible: true,
          id
        })
      },
      onScroll: async () => {
        const lastSearchKey = this.getItem(LAST_SEARCH_KEY);
        const lastData = this.getItem(LAST_DATA);
        const newData = await api.fetchCats(lastSearchKey);
        this.data = [...lastData, ...newData];
        this.setItem(this.data, LAST_DATA);
        this.searchResult.setState(this.data);
        this.searchResult.appendData(newData)
      }
    });
    this.imageInfo = new ImageInfo({
      $target,
      isDark,
      getCharacter: async id => api.fetchCharacter(id)
    });
    this.setState(this.getItem(LAST_DATA));
  }
  getItem = key => JSON.parse(localStorage.getItem(key) || '[]');
  setItem = (item, key) => localStorage.setItem(key, JSON.stringify(item));

  setState(nextData) {
    this.data = nextData;
    this.setItem(nextData, LAST_DATA);
    this.searchResult.setState(nextData);
    this.searchResult.render(nextData);
  }
}
