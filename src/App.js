import React from "react";
import "./styles.css";

// Import the MongoDB Realm Web SDK
import * as Realm from "realm-web";

// Connect to your MongoDB Realm app
const REALM_APP_ID = "ehr_realm_app-lfyfr";
const app = new Realm.App({ id: REALM_APP_ID });
const username = "test_therapist@glpg.net";
const password = "testglpg1";

// Create a component that displays the given user's details
function UserDetail({ user }) {
  return (
    <div>
      <h1>Logged in with user id: {user.id}</h1>
    </div>
  );
}

// Create a component that lets a user log in
function Login({ setUser }) {
  const loginUser = async () => {
    const credentials = Realm.Credentials.emailPassword(username, password); // creates creds object
    const user = await app.logIn(credentials); // creates authorization user object
    setUser(user);
  };
  return <button onClick={loginUser}>Log In</button>;
}

const App = () => {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  const [user, setUser] = React.useState(app.currentUser);

  // If a user is logged in, show their details.
  // Otherwise, show the login screen.
  return (
    <div className="App">
      <div className="App-header">
        {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
      </div>
    </div>
  );
};

export default App;
