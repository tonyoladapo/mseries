import { Show } from './../types/show';
import { Genre } from '../types/reducerTypes';

export const setGenres = (genres: Genre[]) => ({
  type: 'SET_GENRES',
  payload: genres,
});

export const setUserGenres = (genres: Genre[]) => ({
  type: 'SET_USER_GENRES',
  payload: genres,
});

export const setUserShows = (shows: Show[]) => ({
  type: 'SET_USER_SHOWS',
  payload: shows,
});
