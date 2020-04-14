export default class SearchResult {
  constructor({ $target, catData }) {
    const $searchResult = document.createElement('div');
    this.$searchResult = $searchResult;
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = catData;
  }
  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if(this.data === false) {
      this.$searchResult.innerHTML = '정상적인 요청이 아닙니다.';
      return
    }
    this.$searchResult.innerHTML = this.data.length
      ? this.data.map(cat => `
        <article class='item'>
            <img src=${cat.url} alt=${(cat.breeds.length && cat.breeds[0].name)|| cat.id}>
        </article>
      `).join("")
      : '검색 결과가 없습니다.';
  }
}