## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Tapply Coding Challenge**

**Assignment** - Create a web app called **Quoted**. The features of **Quoted** include:

- Users can create an account for themselves
- Users can edit their basic information
- Users can upload their profile picture
- Users can upload quotes to the app for everyone to see. Each entry should contain the following entities:
    - The quote
    - Name of the author
    - Profile pic of the author or a placeholder if no profile pic uploaded
    - timestamp of when the quote was created
- A homepage where all the quotes ever written on the app are shown in descending order of their timestamp with the most recent one on top
- Users should be logged in to use the features of the app.
- Users can edit and delete the quotes only if they are the author of the same
- **(Optional) Bonus:** Users can like quotes and quotes should display the number of likes received.

**Note:** The app should have firebase’s **Firestore** integrated. All the users and quotes should be stored in
the firestore. Use all the CRUD operations provided by firestore for implementing the features. Here’s a good [Firestore starting point](https://firebase.google.com/docs/firestore/quickstart?hl=en&authuser=0)

For uploading profile pictures you can use firebase’s ******************Storage.****************** Here’s a good [Firebase storage starting point](https://firebase.google.com/docs/storage?authuser=0&hl=en)

Since we use **Next.js** as our frontend framework here's a good [Next.js starting point](https://nextjs.org/learn/basics/create-nextjs-app).

Please be sure to use a **mobile-first approach** for this challenge. Make the app desktop-responsive only if time allows, **but it is mandatory for the app to be mobile-responsive**.

This exercise is designed to give you unlimited creative freedom as you develop a solution /
implementation. Feel free to use any packages/tools as you see fit; the goal is a functional mobile-responsive app
with a reasonable amount of CSS stylings and efficient use of Firestore.

****************************Time Duration:****************************

The challenge is designed in a way that it should take 15 - 18 hours for a candidate to complete it. But we expect you to complete the challenge within 7-10 days from now, ideally.

**Upon Completion**:

Reply all to julian@tapply.us, smane2@stevens.edu with a link to your repo for review and please use a free hosting resource such as **Netlify**
(https://www.netlify.com/) so that we can review a live version of the challenge. Feel free to mention anything about your approach that you want to highlight about.

Good luck and happy coding!

- Team Tapply