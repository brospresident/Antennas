import * as React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import DashboardComponent from '../components/Dashboard';


const Dashboard = () => {
    const [register, setRegister] = React.useState(false);
    const [login, setLogin] = React.useState(true);
    const dashboard = localStorage.getItem('token') !== null ? true : false;

    if (dashboard === true && (register === true || login === true)) {
        setRegister(false);
        setLogin(false);
    }
    return (
        <div>
            {
                login === true ? <LoginForm setLogin = {setLogin} setRegister = {setRegister} /> : null
            }
            {
                register === true ? <RegisterForm setLogin = {setLogin} setRegister = {setRegister} /> : null
            }
            {
                dashboard === true ? <DashboardComponent /> : null
            }
        </div>
    );
}

export default Dashboard;