const SEARCH_KEY_HISTORY = 'searchHistory';

export default class SearchInput {
  constructor({ $target, onSearch, onRandom, getItem, setItem }) {
    const $searchWrapper = document.createElement('div');
    $searchWrapper.className = 'SearchWrap';

    const $searchInput = document.createElement('input');
    $searchInput.className = 'SearchInput';
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.';
    this.$searchInput.autofocus = true;


    const $randomButton = document.createElement('button');
    this.$randomButton = $randomButton;
    this.$randomButton.innerHTML = "랜덤이미지";
    this.$randomButton.className = 'RandomButton';

    const $historyList = document.createElement('ul');
    this.$historyList = $historyList;
    const historyRender = () => getItem(SEARCH_KEY_HISTORY).reverse().map(v => `
      <li>
        <a href="#" class="history">${v}</a>
      </li>
    `).join('');
    $historyList.innerHTML = historyRender();

    $searchWrapper.appendChild($searchInput);
    $searchWrapper.appendChild($randomButton);

    $target.appendChild($searchWrapper);
    $target.append($historyList);

    const loading = async (func = () => {}) => {
      const $loading = document.createElement('div');
      $loading.innerHTML = `<div class='loading'>가져오는 중</div>`;
      document.body.appendChild($loading);
      await func;
      document.querySelectorAll('.loading').forEach(v => v.remove());
    };

    const search = (searchKey) => loading(onSearch(searchKey));

    $searchInput.addEventListener('keyup', e => {
      const searchKey = e.target.value;
      if (e.keyCode === 13 && searchKey.length) {
        search(searchKey);
        setItem([...getItem(SEARCH_KEY_HISTORY), searchKey].slice(-5), SEARCH_KEY_HISTORY);
        $historyList.innerHTML = historyRender();
        $searchInput.value = '';
      }
    });

    $randomButton.onclick = _ => loading(onRandom());

    $historyList.addEventListener('click', e => {
      const target = e.target;
      if (target.className === 'history') search(target.innerHTML);
    })
  }
}
