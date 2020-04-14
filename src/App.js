import api from './api.js'
import Theme from './Theme.js'
import SearchInput from './SearchInput.js'
import SearchResult from './SearchResult.js'
import ImageInfo from './ImageInfo.js'

export default class App {
  $target = null;
  data = [];

  constructor ($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        const data = await api.fetchCats(keyword);
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
      getCharacter: async id => api.fetchCharacter(id)
    })
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }


}