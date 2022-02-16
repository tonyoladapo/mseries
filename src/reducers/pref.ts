const initial_state = {
  firstRun: true,
  setupComplete: false,
  isAuthenticated: false,
  isNewUser: true,
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

    default:
      return state;
  }
};

export default prefReducer;
