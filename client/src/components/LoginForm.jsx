import * as React from 'react';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const LoginForm = () => {
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
                    <TextField label="Username"></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Password" type={'password'}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth> Login </Button>
                </Grid>
            </Grid>
        </Paper>
    </div>
    )
}

export default LoginForm;