import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
  } from "firebase/auth";
  
  // SignIn brings up the google sign in pop up AND works
  // for both signing in AND registering a user
  
  export const googleAuth = {
    // Works to sign in AND register a user
    signInRegister: function(navigate) {
      return new Promise((res) => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((userCredential) => {
            const userAuth = {
              Email: userCredential.user.email,
              UserName: userCredential.fullName,
              Id: userCredential.Id,
              FirebaseUid: userCredential.user.uid,
              ImageUrl: userCredential.imageUrl,
              Type: "google",
            };

            fetch("/Users", {
              method: 'POST',
              headers: {
                'Content-type': "application/json",
              },
              body: JSON.stringify(userAuth)
            })
            
            // Add user object to localStorage
            localStorage.setItem("user", JSON.stringify(userAuth));
            // Navigate us back home
            navigate("/");
            console.log("you did it");
          })
          .catch((error) => {
            console.log("Google Sign In Error");
            console.log("error code", error.code);
            console.log("error message", error.message);
            console.log("error email", error.email);
          });
      });
    },
    // Sign out a user
    signOut: function(navigate) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Remove user from localStorage
          localStorage.removeItem("user");
          // Navigate us back home
          navigate("/");
          console.log("Sign Out Success!");
        })
        .catch((error) => {
          console.log("Google SignOut Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
        });
    },
  };