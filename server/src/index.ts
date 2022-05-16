import App from './App';
import AuthenticatorController from './controllers/Authenticator/authenticator.controller';
import AdministratorController from './controllers/Administrators/administrator.controller';

App.getInstance([new AuthenticatorController(),
    new AdministratorController()]);