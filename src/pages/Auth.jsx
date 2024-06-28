import { signInWithPopup, signInAnonymously } from "firebase/auth";
import { auth, provider } from "../Firebase";
import { Navigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";

const signInWithGoogle = () => { signInWithPopup(auth, provider) };
const signInGuest = () => { signInAnonymously(auth) };

export default function Auth({user}) {
    if (user) {
        return <Navigate to="/"></Navigate>;
      }
    return(
        <div className="bg-gray-300 flex w-screen h-screen justify-center items-center cursor-default">
            <div>
                <GoogleLoginButton onClick={signInWithGoogle} />
                <button className="my-4 w-full h-12 bg-white shadow-lg rounded-lg" onClick={signInGuest}>Guest</button>
            </div>
        </div>
        
        
    )
}