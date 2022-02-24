import { Season } from '../types/show';

export const toggleLoading = (loading: boolean) => {
  return {
    type: 'TOGGLE_LOADING',
    payload: loading,
  };
};

export const toggleAdded = (added: boolean) => {
  return {
    type: 'TOGGLE_ADDED',
    payload: added,
  };
};

export const setSeasons = (seasons: Season[]) => {
  return {
    type: 'SET_SEASONS',
    payload: seasons,
  };
};
