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

export const markEpWatched = (
  id: string,
  seasonNumber: number,
  episodeNumber: number,
) => {
  return {
    type: 'MARK_EPISODE_WATCHED',
    payload: {
      id,
      seasonNumber,
      episodeNumber,
    },
  };
};

export const markEpUnwatched = (
  id: string,
  seasonNumber: number,
  episodeNumber: number,
) => {
  return {
    type: 'MARK_EPISODE_UNWATCHED',
    payload: {
      id,
      seasonNumber,
      episodeNumber,
    },
  };
};

export const seasonUnwatched = (id: string, seasonNumber: number) => {
  return {
    type: 'MARK_SEASON_UNWATCHED',
    payload: {
      id,
      seasonNumber,
    },
  };
};

export const seasonWatched = (id: string, seasonNumber: number) => {
  return {
    type: 'MARK_SEASON_WATCHED',
    payload: {
      id,
      seasonNumber,
    },
  };
};
