// Define Saavn API endpoints for different types of searches
const API_BASE_URL = 'https://saavn.me/search';
const trending = 'https://saavn.me/modules?trending';
const searchAll = (query) => `${API_BASE_URL}/all?query=${query}`;
const searchSongs = (query) => `${API_BASE_URL}/songs?query=${query}`;
const searchAlbums = (query) => `${API_BASE_URL}/albums?query=${query}`;
const searchArtists = (query) => `${API_BASE_URL}/artists?query=${query}`;
const searchPlaylists = (query) => `${API_BASE_URL}/playlists?query=${query}`;

const getSongDetailsURL = (songUrl) => `https://saavn.me/songs?link=${encodeURIComponent(songUrl)}`;

module.exports = {
  searchAll,
  searchSongs,
  searchAlbums,
  searchArtists,
  searchPlaylists,
  trending,
  getSongDetailsURL,
};
