import api from './api.js'
import Theme from './Theme.js'
import SearchInput from './SearchInput.js'
import SearchResult from './SearchResult.js'
import ImageInfo from './ImageInfo.js'

const LAST_DATA = 'lastData';


export default class App {
  $target = null;
  data = [];

  constructor ($target, data) {
    this.getItem = key => JSON.parse(localStorage.getItem(key) || '[]');
    this.setItem = (item, key) => localStorage.setItem(key, JSON.stringify(item));

    this.$target = $target;
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;

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
        console.log(data);
        this.setState(data);
      },
      onRandom: async () => {
        const data = await api.fetchRandomImages();
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
      }
    });
    this.imageInfo = new ImageInfo({
      $target,
      isDark,
      getCharacter: async id => api.fetchCharacter(id)
    });
    this.setState(this.getItem(LAST_DATA));
  }

  setState(nextData) {
    this.data = nextData;
    this.setItem(nextData, LAST_DATA);
    this.searchResult.setState(nextData);
  }
}
