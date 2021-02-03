const INITIAL_STATE = {
  updateList: false,
};

const clickRequestList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {
        ...state,
        updateList: action.updateList,
      };
    default:
      return state;
  }
};

export default clickRequestList;
