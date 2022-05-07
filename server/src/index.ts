import App from './App';
import AuthenticatorController from './controllers/Authenticator/authenticator.controller';

App.getInstance([new AuthenticatorController()]);