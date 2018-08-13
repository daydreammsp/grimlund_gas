function toggleInfoReducer(state = true, action) {
   
    switch (action.type) {
      case 'TOGGLE_INFO':
      console.log(action.payload)
        return action.payload;
      default:
        return state;
    }
  }

export default toggleInfoReducer;