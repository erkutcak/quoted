'use client'

import { useState } from "react";
import signUp from "../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { storage } from "@/firebase/firebaseApp";
import { ref, uploadBytes } from "@firebase/storage";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    const addNewUser = async (username, email, profile_pic, date) => {
        try {
            await axios.post(
                "/api/addUser",
                { username, email, profile_pic, date },
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
            await addNewUser(username, email, profilePic.name, new Date().toISOString());
            console.log("User added successfully");
            console.log(profilePic);
            router.push("/home");
        } catch (error) {
            console.error("Failed to add user:", error);
        }
    };


    return (
        <div className="wrapper">
        <div className="form-wrapper">
            <h1>Sign up</h1>
            <form onSubmit={handleForm} className="form">
            <label htmlFor="email">
                <p>Email</p>
                <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                />
            </label>
            <label htmlFor="password">
                <p>Password</p>
                <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
                />
            </label>
            <label htmlFor="username">
                <p>Username</p>
                <input
                onChange={(e) => setUsername(e.target.value)}
                required
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                />
            </label>
            <label htmlFor="profile-pic">
                <p>Profile Picture</p>
                <input
                onChange={handleProfilePicChange}
                required
                type="file"
                name="profile-pic"
                id="profile-pic"
                />
            </label>
            <button type="submit">Sign up</button>
            <Link href="/">
                <button>Back</button>
            </Link>
            </form>
        </div>
        </div>
    );
}
