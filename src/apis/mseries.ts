import axios from 'axios';
import * as RNLocalize from 'react-native-localize';

const mseries = axios.create({
  baseURL: 'https://mseries.herokuapp.com/api/v1',
  params: {
    language: RNLocalize.getLocales()[0].languageTag,
  },
});

export default mseries;
