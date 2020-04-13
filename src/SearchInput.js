const TEMPLATE = '<input type="text">';
const SEARCH_HISTORY = 'searchHistory';

export default class SearchInput {
  constructor({ $target }) {
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
  }
}
