import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginAction } from "../store/actions/auth";
import { Redirect } from 'react-router-dom';

const Login = ({ loginAction, isAuthenticated }) => {
    const data = {
        email: '',
        password: ''
    }
    const [userInput, setUserInput] = useState(data);

    const onChangeHandler = e => setUserInput({...userInput, [e.target.name]: e.target.value});

    const onSubmitHandler = e => {
        e.preventDefault();
        loginAction(userInput)
    }

    if(isAuthenticated){
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="login-section">
            <h1 className="login-heading">Login Section</h1>
            <form className="login-form" onSubmit={onSubmitHandler}>
                <div className="form-element">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" required autoComplete="true" onChange={onChangeHandler} />
                </div>
                <div className="form-element">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" required autoComplete="true" onChange={onChangeHandler} />
                </div>
                <button type="submit" className="submit">Login</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {loginAction})(Login);
