'use client'

import { useState } from "react";
import signUp from "../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { storage } from "@/firebase/firebaseApp";
import { ref, uploadBytes } from "@firebase/storage";

export default function SignUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    const addNewUser = async (firstname, lastname, username, email, profile_pic, date) => {
        try {
            await axios.post(
                "/api/addUser",
                { firstname, lastname, username, email, profile_pic, date },
                {
                headers: {
                    "Content-Type": "application/json",
                },
                }
            );
            console.log("User added successfully");
        } catch (error) {
            console.error("Failed to add user:", error);
            throw error;
        }
    };

    const uploadImage = async () => {
        if (profilePic == null) return;
        try {
            const imageRef = ref(storage, `images/${profilePic.name}`)
            await uploadBytes(imageRef, profilePic)
            console.log("Image added successfully");
        } catch (error) {
            console.error("Failed to add image:", error);
        }
    };

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        setProfilePic(file);
    };

    const handleForm = async (event) => {
        event.preventDefault();

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error);
        }
        try {
            uploadImage()
            await addNewUser(firstName, lastName, username, email, profilePic.name, new Date().toISOString());
            console.log("User added successfully");
            console.log(profilePic);
            router.push("/home");
        } catch (error) {
            console.error("Failed to add user:", error);
        }
    };


    return (
        <div className='flex flex-col items-center justfiy-center mt-5 top-20'>
            <h1 className='font-archivoblack text-2xl mb-5'>-signup.</h1>
            <div className="flex flex-col items-center justify-center w-[95%] max-w-lg mx-auto mb-5 font-medium px-4 py-8 rounded-md bg-[#A37774] shadow-xl">
                <form onSubmit={handleForm} className='flex flex-col items-center justfiy-center'>
                <label htmlFor="firstname">
                    <p className="text-off-white text-md font-montserrat font-light italic mb-2">First Name</p>
                    <input
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                    className="text-off-white text-lg font-montserrat font-medium italic mb-6 px-2"
                    />
                </label>
                <label htmlFor="lastname">
                    <p className="text-off-white text-md font-montserrat font-light italic mb-2">Last Name</p>
                    <input
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    className="text-off-white text-lg font-montserrat font-medium italic mb-6 px-2"
                    />
                </label>
                <label htmlFor="username">
                    <p className="text-off-white text-md font-montserrat font-light italic mb-2">Username</p>
                    <input
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className="text-off-white text-lg font-montserrat font-medium italic mb-6 px-2"
                    />
                </label>
                <label htmlFor="email">
                    <p className="text-off-white text-md font-montserrat font-light italic mb-2">E-mail</p>
                    <input
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="text-off-white text-lg font-montserrat font-medium italic mb-6 px-2"
                    />
                </label>
                <label htmlFor="password">
                    <p className="text-off-white text-md font-montserrat font-light italic mb-2">Password</p>
                    <input
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="text-off-white text-lg font-montserrat font-medium italic mb-6 px-2"
                    />
                </label>
                <label htmlFor="profile-pic">
                    <p className="text-off-white text-md font-montserrat font-light italic mb-2">Profile Picture</p>
                    <input
                    onChange={handleProfilePicChange}
                    required
                    type="file"
                    name="profile-pic"
                    id="profile-pic"
                    />
                </label>
                <div className="flex justify-around items-center mt-4">
                    <button className='text-off-white bg-steel-blue py-2 px-4 rounded' type="submit">Sign up</button>
                    <Link href="/">
                        <button className='text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded'>Back</button>
                    </Link>
                </div>
                </form>
            </div>
        </div>
    );
}
