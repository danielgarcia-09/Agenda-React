import { LOGIN_ERROR, LOGIN_SUCCESS, OBTAIN_USER, SIGN_OFF } from "../../types";

const AuthReducer = (state, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload);

            return {
                ...state,
                token: localStorage.getItem('token'),
                authenticated: true,
            }

        case OBTAIN_USER:
            return {
                ...state,
                authenticated: true,
                user: {
                    id : parseInt(action.payload[0]),
                    name: action.payload[1],
                    lastName: action.payload[2] 
                },
            }

        case LOGIN_ERROR:
        case SIGN_OFF:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticated : false,
                user : null
            }

        default:
            return state;
    }
}

export default AuthReducer;