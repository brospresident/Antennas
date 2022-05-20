import App from './App';
import AuthenticatorController from './controllers/Authenticator/authenticator.controller';
import AdministratorController from './controllers/Administrators/administrator.controller';
import AntennaController from './controllers/Antennas/antenna.controller';

App.getInstance(
    [new AuthenticatorController(),
    new AdministratorController(),
    new AntennaController()]);