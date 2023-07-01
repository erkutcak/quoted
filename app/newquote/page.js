'use client'
import { db } from '@/firebase/firebaseApp';
import { useEffect, useState, React } from 'react';

// export default async function handler(req, res) {
//   try {
//     const response = await axios.post('/api/addData', {
//       key1: 'value1',
//       key2: 'value2',
//       // add more data if needed
//     });
//     console.log(response.data);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.log(error);
//     res.status(error.response.status).json({ message: error.message });
//   }
// }

export default function NewQuote() {

  const [quote, setQuote] = useState('');

  const onSubmit =  (event) => {
    console.log(quote)
   try {
     db.collection("quotes").add({
      title : quote,
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
 } catch(error)  {
      console.error("Error adding document: ", error);
  };
    event.preventDefault()
  };

  return (
    <div>
      <form className="form mx-3" onSubmit={onSubmit}>
        <label className="flex flex-col">
            <span className='font-medium mb-4'>New Quote</span>
            <input
              className='py-4 px-6 text-white rounded-lg outlined-none border-none font-medium'
              id="name"
              type="text"
              name="name"
              rows='4'
              onChange={(event) => setQuote(event.target.value)}
              value={quote}
              placeholder='Be creative!'
            />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}