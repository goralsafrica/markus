import { REGISTER_SUCCESS, REGISTER_ERROR } from "../reducers/admin";
import Axios from "axios";

const url = `https://aqueous-reef-54770.herokuapp.com/api`;

export const registerAction = (formData) => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify(formData);
    try {
        const response = await Axios.post(`${url}/admin/user`, body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: REGISTER_ERROR,
            payload: err.message
        })
    }
}
