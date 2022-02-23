const initial_state = {
  genres: [],
  userGenres: [],
  userShows: [],
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const showReducer = (state = initial_state, { type, payload }: ActionTypes) => {
  switch (type) {
    case 'SET_GENRES':
      return { ...state, genres: payload };

    case 'SET_USER_GENRES':
      return { ...state, userGenres: payload };

    default:
      return state;
  }
};

export default showReducer;
