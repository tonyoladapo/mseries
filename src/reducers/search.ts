const initial_state = {
  searchResults: [],
  loading: false,
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const searchReducer = (
  state = initial_state,
  { type, payload }: ActionTypes,
) => {
  switch (type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: payload };

    case 'TOGGLE_SEARCH_LOADING':
      return { ...state, loading: payload };

    default:
      return state;
  }
};

export default searchReducer;
