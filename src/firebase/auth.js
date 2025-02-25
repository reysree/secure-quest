// src/firebase/auth.js
import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Signup function
export const signUp = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email: user.email,
      createdAt: new Date(),
    });

    return { uid: user.uid, firstName, lastName, email: user.email };
  } catch (error) {
    throw error;
  }
};

//Ensure login function is correctly exported
export const login = async (email, password) => {
  try {
    console.log("Attempting login for:", email);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User authenticated:", user);

    // Fetch user details from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      let userData = userDoc.data();

      //Convert Firestore Timestamp to ISO String (serializable)
      return {
        uid: user.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        createdAt: userData.createdAt
          ? userData.createdAt.toDate().toISOString()
          : null,
      };
    } else {
      throw new Error("User profile not found in Firestore");
    }
  } catch (error) {
    console.error("Firebase Auth Error:", error.code, error.message);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Password reset email sent!" };
  } catch (error) {
    throw error;
  }
};
