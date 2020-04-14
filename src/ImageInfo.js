export default class ImageInfo {
  constructor ({$target, getCharacter}) {

    this.visible = false;
    this.id = null;
    this.$target = $target;
    this.getCharacter = getCharacter;
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;

    this.close = () => {
      this.$imageInfo.remove();
    }
  }

  async setState ({id, visible}) {
    this.id = id;
    this.visible = visible;
    await this.render();
  }

  async render () {
    if (this.visible) {
      const {breeds, url} = await this.getCharacter(this.id);
      const data = Object.assign({
        name: '이름없음',
        temperament: '알수없음',
        origin: '알수없음',
        country_code: '알수없음',
      }, breeds);

      this.$imageInfo.innerHTML = `
        <article class="content-wrapper">
            <header class="title">
                <h2>${data.name }</h2>
                <a href="#" class="close">X</a>
            </header>       
            <img src="${ url }" alt="${ data.name }"/>
            <ul class="description">
              <li>성격: ${data.temperament}</li>
              <li>origin : ${data.origin}</li>
              <li>국적: ${data.country_code}</li>
            </ul> 
        </article>
      `;
      this.$target.appendChild(this.$imageInfo);

      this.$imageInfo.querySelector('.close')
        .addEventListener('click', e => {
          this.setState({ id: null, visible: false})
      });

      this.$imageInfo.addEventListener('click', e => {
        this.close();
      });
      this.$imageInfo.querySelector('.content-wrapper').onclick = e => {
        e.stopPropagation();
      };
      window.addEventListener('keyup', e => {
        if(e.keyCode === 27) this.close();
      })
    } else this.close();
  }
}