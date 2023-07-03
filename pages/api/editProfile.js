import { db } from "../../firebase/firebaseApp";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { userId } = req.query;
    const { username } = req.body;

    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { username });
      res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
      console.error("Error editing user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}