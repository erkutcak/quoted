import { initFirebase } from "../firebaseApp";
import { signOut, getAuth } from "firebase/auth";
import { useAuthContext } from '../context/AuthContext'

const auth = initFirebase;

export default async function signOut() {
    const { authUser, loading } = useAuthContext();
      // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
    if (!loading && !authUser)
        router.push('/')
    }, [authUser, loading])

    auth.signOut().then(clear);
}