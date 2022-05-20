import * as React from 'react';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { inviteUser } from '../requests';

const InviteUser = () => {
    const [email, setEmail] = React.useState('');
    const inviteUserF = async () => {
        await inviteUser(email);
    }
    return (
        <div style={{ padding: 30 }}>
            
            <Grid
                container
                spacing={3}
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
            >
                <Grid item xs={12}>
                    <h3>In order to invite an user type his E-Mail below.</h3>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="E-Mail" onChange={(e) => {setEmail(e.target.value)}}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth onClick = {inviteUserF}> Invite User </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default InviteUser;