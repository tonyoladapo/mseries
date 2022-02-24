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

export const setUnwatched = (id: string, unwatched: any) => {
  return {
    type: 'SET_UNWATCHED',
    payload: { id, unwatched },
  };
};

export const removeFromUnwatched = (id: string) => {
  return {
    type: 'REMOVE_FROM_UNWATCHED',
    payload: id,
  };
};
