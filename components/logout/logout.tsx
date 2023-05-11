// import { GoogleLogout } from "react-google-login";

export default function LogOut() {
  const clientId = "455652837948-boocpjrcb1vheu255b9uqc9n8dd27i5o.apps.googleusercontent.com";

  // const onSuccess = (res) => console.log("Success!", res);

  return (
    <div id="signOutButton">
      {`<GoogleLogout clientId={clientId} buttonText="Login" onLogoutSuccess={onSuccess} />`}
    </div>
  );
}
