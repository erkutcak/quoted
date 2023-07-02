import { db } from "../../firebase/firebaseApp";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function handler(req, res) {
  const author = req.query.author;

  let snapshot = null;
  let data = null;
  let error = null;

  const q = query(collection(db, "quotes"), where("author", "==", author));

  try {
    snapshot = await getDocs(q);
    data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    error = error;
  }

  if (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  } else {
    res.status(200).json(data);
  }
}