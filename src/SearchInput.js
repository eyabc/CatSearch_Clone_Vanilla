const SEARCH_HISTORY = 'searchHistory';

export default class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchWrapper = document.createElement('div');
    $searchWrapper.className = 'searchWrap';

    const $searchInput = document.createElement('input');
    $searchInput.className = 'searchInput';
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.';
    this.$searchInput.autofocus = true;


    const $randomButton = document.createElement('button');
    this.$randomButton = $randomButton;
    this.$randomButton.innerHTML = "랜덤이미지";
    this.$randomButton.className = 'randomButton';

    const $historyList = document.createElement('ul');
    this.$historyList = $historyList;

    $searchWrapper.appendChild($searchInput);
    $searchWrapper.appendChild($randomButton);

    $target.appendChild($searchWrapper);
    $target.append($historyList);

    const saveHistory = () => {

    };
    const search = (searchKey, after = () => {}) => {
      const $loading = document.createElement('div');
      $loading.innerHTML = `<div class='loading'>가져오는 중</div>`
      document.body.appendChild($loading);
      onSearch(searchKey).then(() => {
        document.querySelectorAll('.loading').forEach(v => v.remove());
        after()
      })
    };
    $searchInput.addEventListener('keyup', e => {
      const searchKey = e.target.value;
      if (e.keyCode === 13 && searchKey.length) {
        search(searchKey, saveHistory);
      }
    })
  }


}
