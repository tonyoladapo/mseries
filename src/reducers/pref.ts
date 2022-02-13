const initial_state = {
  firstRun: true,
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const prefReducer = (state = initial_state, { type, payload }: ActionTypes) => {
  switch (type) {
    case 'SET_FIRST_RUN':
      return { ...state, firstRun: payload };

    default:
      return state;
  }
};

export default prefReducer;
