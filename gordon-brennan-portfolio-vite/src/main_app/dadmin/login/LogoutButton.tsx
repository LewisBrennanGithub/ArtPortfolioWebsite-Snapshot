import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    // <button onClick={() => logout({ returnTo: `${window.location.origin}/gologger` } as any)}>
    <button onClick={() => logout({ returnTo: 'https://www.gordon-brennan.co.uk/gologger' } as any)}>
      Log Out
    </button>
  );
};

export default LogoutButton;

