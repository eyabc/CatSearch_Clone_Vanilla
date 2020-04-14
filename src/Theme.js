export default class Theme {
  constructor ({ $target, toggleTheme }) {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;

    const $label = document.createElement('label');
    $label.innerHTML = `<input type="checkbox" ${isDark ? 'checked' : ''} /> 다크모드`

    const $checkbox = $label.querySelector('input');
    $checkbox.addEventListener('change', toggleTheme);
    $target.appendChild($label);
  }
}