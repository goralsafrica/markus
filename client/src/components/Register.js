import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import { registerAction } from '../store/actions/admin';

const Register = ({ isAuthenticated, registerAction }) => {
    const data = {
        role: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordRepeat: ''
    }

    const [formData, setFormData] = useState(data);
    const [departments, setDepartments] = useState([]);

    const onChangeHandler = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = e => {
        e.preventDefault();
        registerAction(formData);
    }

    const getDepartments = async() => {
        const url = `https://aqueous-reef-54770.herokuapp.com/api`;
        try {
            const response = await Axios.get(`${url}/admin/departments`);
            setDepartments(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getDepartments();
    }, [])

    if(!isAuthenticated) {
        return <Redirect to="/login" />
    } 

    return (
        <div className="register-section">
            <h1>Registration Section</h1>
            <form onSubmit = {onSubmitHandler}>
                <div className="form-radio">
                    <input type="radio" id="subAdmin" name="role" value="sub-admin" onChange={onChangeHandler} />
                    <label htmlFor="subAdmin">Sub Admin</label>
                    <input type="radio" id="user" name="role" value="user" onChange={onChangeHandler} />
                    <label htmlFor="user">User</label>
                </div>
                <div className="form-element">
                    <label htmlFor="firstName">first name: </label>
                    <input type="text" name="firstName" required autoComplete="true" onChange={onChangeHandler} />
                </div>
                <div className="form-element">
                    <label htmlFor="lastName">last name: </label>
                    <input type="text" name="lastName" required autoComplete="true" onChange={onChangeHandler} />
                </div>
                <div className="form-element">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" required autoComplete="true" onChange={onChangeHandler} />
                </div>
                <div className="form-element">
                    <label htmlFor="email">Departments: </label>
                    <select name="departmentId" onChange={onChangeHandler}>
                        {
                            departments.map(department => (<option key={department._id} value={department._id}>{department.name}</option>))
                        }
                        <option></option>
                    </select>
                    {/* <input type="email" name="email" required autoComplete="true" onChange={onChangeHandler} /> */}
                </div>
                <div className="form-element">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" required autoComplete="true" onChange={onChangeHandler} />
                </div>
                <div className="form-element">
                    <label htmlFor="passwordRepeat">Repeat Password: </label>
                    <input type="password" name="passwordRepeat" required autoComplete="true" onChange={onChangeHandler} />
                </div>
                <button type="submit" className="submit">Register</button>
            </form>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
}

const mapStateToProp = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProp, { registerAction } )(Register);