import {Component} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar position="fixed">
            <Toolbar>{
                <h3>5G Antennas Map in Romania</h3>    
            }</Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    )
  }
}

export default Header;