import {LOGOUT} from "./AppTemplateActions";
import {LOGIN} from "../login/LoginPageActions";

const initialState = {
    token: null,
    authenticated: false,
    userId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {...initialState};
        case LOGIN:
            return {
                ...state,
                token: action.token,
                authenticated: true,
                userId: action.userId
            };
        default:
            return state
    }
}
