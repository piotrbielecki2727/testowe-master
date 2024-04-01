


const initialState = {
  show: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        show: true
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
};

