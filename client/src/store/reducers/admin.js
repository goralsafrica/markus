export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const FETCH_ERROR = 'FETCH_ERROR';

const INITIAL_STATE = {
    profiles: [],
    profile: {},
    error: []
};

const admin = (state=INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type) {
        case REGISTER_SUCCESS:
            return {...state, profiles: payload }
        default:
            return state
    }
}

export default admin;