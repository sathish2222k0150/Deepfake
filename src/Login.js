// eslint-disable-next-line no-unused-vars
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();  // Hook to navigate to another page

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Log user data to verify login
      console.log("User info:", user);

      // Get the ID token of the authenticated user
      const idToken = await user.getIdToken();

      // Send the ID token to Firebase Identity Toolkit API
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDiR0NjdRwvnF3FgrOdSMLqmag0iIxhMYI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: idToken,  // Use the valid Firebase ID token
        }),
      });

      const data = await response.json();
      console.log("Response from Firebase API:", data);

      if (response.ok) {
        alert("Login successful");
        // Redirect to the Deepfake page
        navigate('/deepfake');
      } else {
        alert("Error: " + data.error.message);
      }

    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Login</h2>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
