// import { db } from "../firebaseApp";
// import { collection, getDocs } from "firebase/firestore";

// export default async function handler(req, res) {
//   let data = null;
//   let error = null;

//   try {
//     snapshot = await getDocs(collection(db, "quotes"));
//     data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (e) {
//     error = e;
//   }

//   if (error) {
//     res.status(500).json({ error: "Failed to fetch data" });
//   } else {
//     res.status(200).json(data);
//   }
// }