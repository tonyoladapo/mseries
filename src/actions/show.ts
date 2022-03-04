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

export const setUnwatched = (show: any) => {
  return {
    type: 'SET_UNWATCHED',
    payload: show,
  };
};

export const removeFromUnwatched = (id: string) => {
  return {
    type: 'REMOVE_FROM_UNWATCHED',
    payload: id,
  };
};

export const setUnwatchedCollection = (collection: any) => {
  return {
    type: 'SET_UNWATCHED_COLLECTION',
    payload: collection,
  };
};
