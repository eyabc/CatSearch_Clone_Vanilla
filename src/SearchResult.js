export default class SearchResult {
  constructor({ $target }) {
    const $searchResult = document.createElement('div');
    this.$searchResult = $searchResult;
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);
  }
}