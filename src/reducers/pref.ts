const initial_state = {
  firstRun: true,
  setupComplete: false,
  isAuthenticated: false,
  isNewUser: true,
  isHeaderTransparent: false,
  headerHeight: 0,
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const prefReducer = (state = initial_state, { type, payload }: ActionTypes) => {
  switch (type) {
    case 'SET_FIRST_RUN':
      return { ...state, firstRun: payload };

    case 'SET_SETUP_COMPLETE':
      return { ...state, setupComplete: payload };

    case 'SET_IS_AUTHENTICATED':
      return { ...state, isAuthenticated: payload };

    case 'SET_IS_NEW_USER':
      return { ...state, isNewUser: payload };

    case 'TOGGLE_HEADER_TRANSPARENT':
      return { ...state, isHeaderTransparent: payload };

    case 'SET_HEADER_HEIGHT':
      return { ...state, headerHeight: payload };

    default:
      return state;
  }
};

export default prefReducer;
