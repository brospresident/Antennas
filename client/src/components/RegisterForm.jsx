import * as React from 'react';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { register } from '../requests';

const RegisterForm = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [code, setCode] = React.useState('');
    const goToLogin = () => {
        props.setRegister(false);
        props.setLogin(true);
    }
    const registerF = async () => {
        if (password !== confirmPassword) return;
        const data = {
            username,
            password,
            email,
            code
        }
        const registerResponse = await register(data);
        if (registerResponse === true) {
            props.setLogin(false);
            props.setRegister(false);
        }
    }
    return (
    <div style={{ padding: 30 }}>
        <Paper>
            <Grid
                container
                spacing={3}
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
            >
                <Grid item xs={12}>
                    <TextField label="Username" onChange={(e) => {setUsername(e.target.value)}}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Password" type={'password'} onChange={(e) => {setPassword(e.target.value)}}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Confirm password" type={'password'} onChange={(e) => {setConfirmPassword(e.target.value)}}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="E-Mail" onChange={(e) => {setEmail(e.target.value)}}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Invitation Code" onChange={(e) => {setCode(e.target.value)}}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth onClick = {registerF}> Register </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth onClick = {goToLogin}> Go to Login </Button>
                </Grid>
            </Grid>
        </Paper>
    </div>
    )
}

export default RegisterForm;