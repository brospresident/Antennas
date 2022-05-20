import * as React from 'react';
import Header from './Header'
import Menu from './Menu';
import InviteUser from './InviteUser';
import Map from './Map';

const DashboardComponent = () => {
    const [invitingUser, setInvitingUser] = React.useState(false);
    const [addingAntenna, setAddingAntenna] = React.useState(false);
    return (
        <div>
            <Header />
            <Menu inviting = {setInvitingUser} addingAntenna = {setAddingAntenna} />
            {
                invitingUser === true ? <InviteUser /> : null
            }
            {
                addingAntenna === true ? <Map /> : null
            }
        </div>
    );
}

export default DashboardComponent;