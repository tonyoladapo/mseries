const initial_state = {
  discoverShows: [],
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const discoverReducer = (
  state = initial_state,
  { type, payload }: ActionTypes,
) => {
  switch (type) {
    case 'SET_DISCOVER_SHOWS':
      return { ...state, discoverShows: payload };

    default:
      return state;
  }
};

export default discoverReducer;
