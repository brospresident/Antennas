import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addAntenna } from '../requests';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AntennaModal(props) {
    const [provider, setProvider] = React.useState('');
    const handleProviderChange = (e) => {
        setProvider(e.target.value);
    }

    const addAntennaModal = async () => {
        const data = {
            lat: props.position.lat,
            lng: props.position.lng,
            provider: provider
        }
        const added = await addAntenna(data);
        if (!added) console.log('eroare la adaugare antena');
        // pentru erorile astea ai putea sa bagi notificari
        // https://mui.com/material-ui/react-alert/
        // documentatia
        // daca added === true pui una de succes, altfel una de eroare

        props.handleClose();
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add a new 5G antenna
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Provider</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={provider}
                        label="Select a provider"
                        onChange={handleProviderChange}
                    >
                        <MenuItem value={"Orange"}>Orange</MenuItem>
                        <MenuItem value={"Digi"}>Digi</MenuItem>
                        <MenuItem value={"Vodafone"}>Vodafone</MenuItem>
                    </Select>
                    <Button onClick = {addAntennaModal} style = {{width: '50%'}}>Add antenna</Button>
                    </FormControl>
                </Box>
            </Modal>
        </div>
    );
}