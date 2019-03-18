import './index.css';
import './App.css';

var queryAnime = `
query ($id: Int) {
  Media (id: $id, type: ANIME, format: TV) {
    id
    title {
      romaji
      native
    }
    coverImage {
      extraLarge
    }
    isAdult
  }
}
`;

export {queryAnime};
