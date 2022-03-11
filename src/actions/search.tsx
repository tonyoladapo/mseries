export const setSearchResults = (results: any[]) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: results,
});

export const toggleSearchLoading = (state: boolean) => ({
  type: 'TOGGLE_SEARCH_LOADING',
  payload: state,
});
