export default class Theme {
  constructor ({ $target, toggleTheme, isDark }) {
    const $fragment = document.createDocumentFragment();
    const $label = document.createElement('label');
    $label.innerHTML = `<input type="checkbox" ${isDark ? 'checked' : ''} /> 다크모드`;

    const $checkbox = $label.querySelector('input');
    $checkbox.addEventListener('change', e => {
      const value = e.target.checked;
      toggleTheme(value);
    });
    $fragment.appendChild($label);
    $target.appendChild($fragment);
  }
}