import { initFirebase } from "../firebaseApp";
import { signOut } from "firebase/auth";
import { useAuthContext } from '../../app/context/AuthContext'
import { useRouter } from "next/navigation";

export default function SignOut() {
  const { clear, loading, user } = useAuthContext();
  const router = useRouter();

  const handleSignOut = () => {
    signOut(initFirebase)
      .then(() => {
        clear();
        router.push('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  if (!loading && !user) {
    handleSignOut();
  }

  return null;
}