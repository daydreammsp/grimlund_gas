function carsGetReducer(state = [], action) {
   
    switch (action.type) {
      case 'CAR_DISPLAY':
      console.log(action.payload)
        return action.payload;
      default:
        return state;
    }
  }

export default carsGetReducer;