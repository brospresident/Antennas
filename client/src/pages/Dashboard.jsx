import * as React from 'react';
import LoginForm from '../components/LoginForm';


const Dashboard = () => {
    const [register, setRegister] = React.useState(false);
    const [login, setLogin] = React.useState(true);
    const dashboard = localStorage.getItem('token') !== null ? true : false;
    return (
        <div>
            {
                login === true ? <LoginForm /> : null
            }
        </div>
    );
}

export default Dashboard;