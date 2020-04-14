export default class SearchResult {
  constructor({ $target, catData, openInfo }) {
    this.lazyLoading = () => {
      const imgs = document.querySelectorAll('.item img[data-src]');
      const start = window.scrollY;
      const end = start + window.outerHeight;
      const onImages = [ ...imgs ].filter(v =>  start <= v.offsetTop && v.offsetTop <= end);
      onImages.forEach(v => {
        v.src = v.dataset.src;
        v.parentElement.style = '';
      })
    };
    const $searchResult = document.createElement('div');
    this.$searchResult = $searchResult;
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = catData;
    this.openInfo = openInfo;
    window.addEventListener('load', this.lazyLoading);
    window.addEventListener('scroll', this.lazyLoading);
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
        <article class="item" style="height: 200px;">
            <img data-src="${cat.url}" alt="${(cat.breeds.length && cat.breeds[0].name)|| cat.id}" />
        </article>
      `).join("")
      : '검색 결과가 없습니다.';

    this.lazyLoading();

    this.$searchResult.querySelectorAll('.item')
      .forEach(($item, index) => {
        $item.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          this.openInfo(this.data[index].id);
        })
    })
  }
}