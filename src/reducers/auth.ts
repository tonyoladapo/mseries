const initial_state = {
  user: null,
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const authReducer = (state = initial_state, { type, payload }: ActionTypes) => {
  switch (type) {
    case 'SET_USER':
      return { ...state, user: payload };

    default:
      return state;
  }
};

export default authReducer;
