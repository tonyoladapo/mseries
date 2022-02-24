const initial_state = {
  loading: false,
  added: false,
  seasons: [],
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const showDetailsReducer = (
  state = initial_state,
  { type, payload }: ActionTypes,
) => {
  switch (type) {
    case 'TOGGLE_LOADING':
      return { ...state, loading: payload };

    case 'TOGGLE_ADDED':
      return { ...state, added: payload };

    case 'SET_SEASONS':
      return { ...state, seasons: payload };

    default:
      return state;
  }
};

export default showDetailsReducer;
