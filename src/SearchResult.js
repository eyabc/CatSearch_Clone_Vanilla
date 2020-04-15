export default class SearchResult {
  constructor({ $target, catData, openInfo, onScroll }) {
    this.onScroll = onScroll;
    this.data = catData;
    this.openInfo = openInfo;

    this.loading = false;
    const $searchResult = document.createElement('div');
    this.$searchResult = $searchResult;
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);
  }
  lazyLoading = async () => {
    const imgs = document.querySelectorAll('.item img[data-src]');
    const last = imgs[imgs.length - 1];
    const start = window.scrollY;
    const end = start + window.outerHeight;
    const onImages = [ ...imgs ].filter(v =>  start <= v.offsetTop && v.offsetTop <= end && !v.src);
    onImages.forEach((v, k) => {
      v.src = v.dataset.src;
      v.parentElement.style = '';
    });
    if (last && last.src && !this.loading) {
      this.loading = true;
      await this.onScroll();
      setTimeout(() => this.loading = false, 1000);
    }
  };
  onClick = () => {
    this.$searchResult.querySelectorAll('.item')
      .forEach(($item, index) => {
        $item.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          this.openInfo(this.data[index].id);
        })
      })
  };
  dataDOM = data => data.map(cat => `
        <article class="item" style="height: 200px;">
            <img data-src="${cat.url}" alt="${(cat.breeds.length && cat.breeds[0].name)|| cat.id}"  />
        </article>
      `).join("");

  appendData(newData) {
    const img = newData.length
      ? this.dataDOM(newData) : '검색 결과가 없습니다.';
    this.$searchResult.innerHTML+= img;
    this.onClick();

  }
  setState(nextData) {
    this.data = nextData;
  }
  render() {
    window.addEventListener('load', this.lazyLoading);
    window.addEventListener('scroll', this.lazyLoading);

    this.$searchResult.innerHTML = this.data.length
      ? this.dataDOM(this.data) : '검색 결과가 없습니다.';
    this.onClick();
    this.lazyLoading();
  }
}