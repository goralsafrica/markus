import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AdminDashboard from './dashboard-view/admin';



const Dashboard = ({isAuthenticated, user}) => {

    if(!isAuthenticated){
        return <Redirect to='/login' />
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {
                user.role === 'admin' && (<AdminDashboard />)
            }
            {
                user.role === 'sub-admin' && (<AdminDashboard />)
            }
            {
                user.role === 'user' && (<AdminDashboard />)
            }
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(Dashboard);