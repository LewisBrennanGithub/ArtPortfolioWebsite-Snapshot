import './App.css';
import RoutingPage from './main_app/router/RoutingPage';
import { Auth0Provider } from '@auth0/auth0-react';

const App = () => {
  return (
    <Auth0Provider
      domain="dev-jbsvjbwih2gygs04.uk.auth0.com"
      clientId="HEDSC1dUMDNgij4a7C5NN2dR6iDmrEDC"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <RoutingPage />
    </Auth0Provider>
  );
}

export default App;
