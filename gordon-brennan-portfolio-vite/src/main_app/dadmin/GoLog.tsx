import DadBoard from "./DadBoard";
import LoginButton from "./login/LoginButton";
import LogoutButton from "./login/LogoutButton";
import Profile from "./login/Profile";
import { useAuth0 } from '@auth0/auth0-react';

const GoLog = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="logDiv">
            <p>This is the GoLog page</p>
            <Profile />
            <LoginButton />
            <LogoutButton />
            {isAuthenticated && <DadBoard />}
        </div>
    );
}

export default GoLog;