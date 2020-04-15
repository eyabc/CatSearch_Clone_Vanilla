export default class SearchResult {
  constructor({ $target, catData, openInfo, onScroll }) {
    this.loading = false;
    this.lazyLoading = async () => {
      const imgs = document.querySelectorAll('.item img[data-src]');
      const last = imgs[imgs.length - 1];
      const start = window.scrollY;
      const end = start + window.outerHeight;
      const onImages = [ ...imgs ].filter(v =>  start <= v.offsetTop && v.offsetTop <= end && !v.src);
      onImages.forEach((v, k) => {
        v.src = v.dataset.src;
        v.parentElement.style = '';
        v.dataset.loaded = true;
        v.onload = e => console.log([...imgs].findIndex(v2 => v2 === v));

      });
      if (last && last.src && !this.loading) {
        this.loading = true;
        await onScroll();
        setTimeout(() => {
        this.loading = false;
        }, 1000)
      }
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
  appendData(newData) {
    const img = newData.length
      ? newData.map(cat => `
        <article class="item" style="height: 200px;">
            <img data-src="${cat.url}" alt="${(cat.breeds.length && cat.breeds[0].name)|| cat.id}"  />
        </article>
      `).join("")
      : '검색 결과가 없습니다.';
    this.$searchResult.innerHTML+= img;

    this.$searchResult.querySelectorAll('.item')
      .forEach(($item, index) => {
        $item.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          this.openInfo(this.data[index].id);
        })
      })
  }
  setState(nextData) {
    this.data = nextData;
  }
  render() {
    this.$searchResult.innerHTML = this.data.length
      ? this.data.map(cat => `
        <article class="item" style="height: 200px;">
            <img data-src="${cat.url}" alt="${(cat.breeds.length && cat.breeds[0].name)|| cat.id}" />
        </article>
      `).join("")
      : '검색 결과가 없습니다.';
    this.$searchResult.querySelectorAll('.item')
      .forEach(($item, index) => {
        $item.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          this.openInfo(this.data[index].id);
        })
      });
    this.lazyLoading();
  }
}