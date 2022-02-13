const initial_state = {};

interface ActionTypes {
  type: string;
  payload?: any;
}

const prefReducer = (state = initial_state, { type, payload }: ActionTypes) => {
  switch (type) {
    case '':
      return state;

    default:
      return state;
  }
};

export default prefReducer;
