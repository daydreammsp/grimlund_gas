
function driverIdGetReducer(state = false, action) {
   
    switch (action.type) {
      case 'DRIVER_ID':
      console.log(action.payload)
        return action.payload;
      default:
        return state;
    }
  }

export default driverIdGetReducer;