export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';


const INITIAL_STATE = {
    isAuthenticated: false,
    user: {}
};

const auth = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {...state, isAuthenticated: true, user: payload}
        case LOGIN_ERROR:
            return {...state, isAuthenticated:false, user: null}
        default:
            return state;
    }
}

export default auth;