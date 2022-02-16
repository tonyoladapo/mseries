import { Genre } from '../types/reducerTypes';

export const setGenres = (genres: Genre[]) => ({
  type: 'SET_GENRES',
  payload: genres,
});

export const setUserGenres = (genres: Genre[]) => ({
  type: 'SET_GENRES',
  payload: genres,
});
