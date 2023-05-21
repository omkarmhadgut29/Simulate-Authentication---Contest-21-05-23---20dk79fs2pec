// import React from "react";
// import "../styles/App.css";
// import User from "../models/user";

// const App = () => {
//   return (
//     <div id="main">
//       <table id="all-users">
//       <tbody>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Password</th>
//           </tr>
//           <tr>
//             <td>{/** user's name */}</td>
//             <td>{/** user's email */}</td>
//             <td>{/** user's password */}</td>
//           </tr>
//         </tbody>
//       </table>

//       <div>
//         <form className="signup-form">
//           <label htmlFor="name">Name</label>
//           <input type="text" name="signupName" id="signupName" />
//           <label htmlFor="email">Email</label>
//           <input type="email" name="signupEmail" id="signupEmail" />
//           <label htmlFor="password">Password</label>
//           <input type="password" name="signupPassword" id="signupPassword" />
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             name="signupConfirmPassword"
//             id="signupConfirmPassword"
//           />
//         </form>
//         <button id="signup-button">Signup</button>
//         <form className="login-styles">
//           <label htmlFor="loginEmail">Email</label>
//           <input id="loginEmail" name="loginEmail" type="email" />
//           <label htmlFor="loginPassword">Password</label>
//           <input id="loginPassword" name="loginPassword" type="password" />
//         </form>
//         <button id="login-button">Login</button>
//       </div>

//       <div>
//         <h3 id="username">{/** Logged in user's name */}</h3>
//         <h3 id="email">{/** Logged in user's email */}</h3>
//         <button id="logout-button">Logout</button>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import "../styles/App.css";
import User from "../models/user";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);

    const handleSignup = (e) => {
        e.preventDefault();

        const signupName = e.target.signupName.value;
        const signupEmail = e.target.signupEmail.value;
        const signupPassword = e.target.signupPassword.value;
        const signupConfirmPassword = e.target.signupConfirmPassword.value;

        // Check if passwords match
        if (signupPassword !== signupConfirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Create a new user
        const newUser = new User(signupEmail, signupPassword, signupName);

        // Update the users array
        setUsers((prevUsers) => [...prevUsers, newUser]);

        // Clear the signup form
        e.target.reset();
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const loginEmail = e.target.loginEmail.value;
        const loginPassword = e.target.loginPassword.value;

        // Find the user in the users array
        const foundUser = users.find(
            (user) =>
                user.email === loginEmail && user.password === loginPassword
        );

        // Check if the user exists
        if (foundUser) {
            setCurrentUser(foundUser);
            setLoggedIn(true);
        } else {
            alert("Invalid email or password.");
        }

        // Clear the login form
        e.target.reset();
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setLoggedIn(false);
    };

    return (
        <div id="main">
            <table id="all-users">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                {!loggedIn && (
                  <div>
                    <form className="signup-form" onSubmit={handleSignup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="signupName"
                            id="signupName"
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="signupEmail"
                            id="signupEmail"
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="signupPassword"
                            id="signupPassword"
                            required
                        />
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="signupConfirmPassword"
                            id="signupConfirmPassword"
                            required
                        />
                        <button id="signup-button" type="submit">
                            Signup
                        </button>
                    </form>
                    <div>
                        <form className="login-styles" onSubmit={handleLogin}>
                            <label htmlFor="loginEmail">Email</label>
                            <input
                                id="loginEmail"
                                name="loginEmail"
                                type="email"
                                required
                            />
                            <label htmlFor="loginPassword">Password</label>
                            <input
                                id="loginPassword"
                                name="loginPassword"
                                type="password"
                                required
                            />
                            <button id="login-button" type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                    </div>
                )}
                {loggedIn && (
                    <div>
                        <h3 id="username">{currentUser.name}</h3>
                        <h3 id="email">{currentUser.email}</h3>
                        <button id="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
