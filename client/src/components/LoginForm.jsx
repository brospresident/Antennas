import * as React from 'react';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { login } from '../requests';

const LoginForm = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const goToRegister = () => {
        props.setRegister(true);
        props.setLogin(false);
    }
    const logIn = async () => {
        const data = {
            username,
            password
        }
        const loginResponse = await login(data);
        if (loginResponse === true) {
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
                    <Button fullWidth onClick = {logIn}> Login </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth onClick={goToRegister}> Go to Register </Button>
                </Grid>
            </Grid>
        </Paper>
    </div>
    )
}

export default LoginForm;