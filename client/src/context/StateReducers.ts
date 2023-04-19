import { reducerCases } from "./constants";

export const initialState = {
  userInfo: undefined,
  showLoginModal: false,
  showSignupModal: false,
  isSeller: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: action.showLoginModal,
      };
    case reducerCases.TOGGLE_SIGNUP_MODAL:
      return {
        ...state,
        showSignupModal: action.showSignupModal,
      };
    case reducerCases.CLOSE_AUTH_MODAL:
      return {
        ...state,
        showSignupModal: false,
        showLoginModal: false,
      };
    case reducerCases.SWITCH_MODE:
      return {
        ...state,
        isSeller: !state.isSeller,
      };
    default:
      return state;
  }
};

export default reducer;
