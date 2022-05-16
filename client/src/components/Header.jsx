import {Component} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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