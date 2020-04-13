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
    });
    this.searchResult = new SearchResult({
      $target,
    });
    this.imageInfo = new ImageInfo({
      $target,
    })
  }


}