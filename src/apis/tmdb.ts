import axios from 'axios';
import * as RNLocalize from 'react-native-localize';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: RNLocalize.getLocales()[0].languageTag,
  },
});

export default tmdb;
