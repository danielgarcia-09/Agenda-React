import { useReducer } from "react";
import AxiosClient from "../../config/axios";
import tokenAuth from "../../config/token";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  OBTAIN_USER,
  REGISTER_SUCCESS,
  SIGN_OFF,
} from "../../types";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Func

  const logIn = async (data) => {
    try {
      const result = await AxiosClient.post("Login", data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.data,
      });

      getUserAuthenticated();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAuthenticated = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }

    try {
      const result = await AxiosClient.get("Login/auth");
      dispatch({
        type: OBTAIN_USER,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const createUser = async(user) => {
    try {
      const result = await AxiosClient.post("Login/create", user);
      console.log(result);
    } catch (error) {
      return;
    }
  };

  const signOut = () => {
    dispatch({
      type: SIGN_OFF,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        logIn,
        createUser,
        getUserAuthenticated,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
