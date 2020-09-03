import Axios from "axios";
import { LOGIN_SUCCESS, LOGIN_ERROR } from "../reducers/auth";

const url = `https://aqueous-reef-54770.herokuapp.com/api`;


export const userData = () => async(dispatch) => {
    
}

export const loginAction = (formData) => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify(formData);
    try {
        const response = await Axios.post(`${url}/auth/login`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: LOGIN_ERROR,
            payload: err.message
        })
    }
}
