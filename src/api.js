/* API_DOCS : https://docs.thecatapi.com/authentication */
const API_ENDPOINT = 'https://api.thecatapi.com/v1/images/search?';

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
  fetchRandomImages: () => request(`${API_ENDPOINT}/limit=50`)
}