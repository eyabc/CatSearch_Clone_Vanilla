/* API_DOCS : https://docs.thecatapi.com/authentication */
const API_ENDPOINT = 'https://api.thecatapi.com/v1';
const LIMIT = 50;
const request = async url => {
  try {
    const result = await fetch(url);
    if(result.status !== 200) throw(result.status);
    return result.json();
  } catch (status) {
    console.warn(`${status} : 정상적인 응답이 아닙니다. `);
    return Promise.resolve({ data: false })
  }
};

export default {
  fetchRandomImages: () => request(`${API_ENDPOINT}/images/search?limit=${LIMIT}&mime_types=jpg`),
  fetchCats: keyword => {
    const pattern = /고양이|cat/;
    if (pattern.test(keyword)) {
      return request(`${API_ENDPOINT}/images/search?limit=${LIMIT}&mime_types=jpg`);
    }
    return [];
  },
  fetchCharacter: id => {
    return request(`${API_ENDPOINT}/images/${id}`)
  }
}