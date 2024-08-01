import { combineReducers } from 'redux';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  // Tambahkan reducer lain di sini
});

export default rootReducer;
