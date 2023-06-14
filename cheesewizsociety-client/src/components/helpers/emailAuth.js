import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
  
  // userObject expected ---->
  // {
  //   email: "",
  //   password: "",
  //   fullName: "",
  // }
  
  export const emailAuth = {
    // Register New User
    register: function(userObj, navigate) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then((userCredential) => {
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            displayName: userObj.fullName,
          }).then(
            function() {
              const userAuth = {
                Email: userCredential.user.email,
                UserName: userObj.fullName,
                FirebaseUid: userCredential.user.uid,
                ImageUrl: userObj.imageUrl,
                Type: "email",
              };

              fetch("/Users", {
                method: 'POST',
                headers: {
                  'Content-type': "application/json",
                },
                body: JSON.stringify(userAuth)
              })

              // Saves the user to localstorage
              localStorage.setItem("user", JSON.stringify(userAuth));
              // Navigate us back to home
              navigate("/");
            },
            function(error) {
              console.log("Email Register Name Error");
              console.log("error code", error.code);
              console.log("error message", error.message);
            }
          );
        })
        .catch((error) => {
          console.log("Email Register Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
        });
    },
    // Sign in existing user
    signIn: function(userObj, navigate) {
      return new Promise((res) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, userObj.email, userObj.password)
          .then((userCredential) => {
            const userAuth = {
              Email: userCredential.user.email,
              UserName: userObj.fullName,
              FirebaseUid: userCredential.user.uid,
              ImageUrl: "",
              Type: "email",
            };

            fetch(`https://localhost:7241/api/Users/${userAuth.FirebaseUid}`)
            .then((response) => {
              response.json().then((json) => {
                userAuth.ImageUrl = json.imageUrl
                userAuth.Id = json.id
                localStorage.setItem("user", JSON.stringify(userAuth));
                navigate("/")
              })
            });
          })
          .catch((error) => {
            console.log("Email SignIn Error");
            console.log("error code", error.code);
            console.log("error message", error.message);
          });
      });
    },
    // Sign out
    signOut: function(navigate) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Remove the user from localstorage
          localStorage.removeItem("user");
          // Navigate us back to home
          navigate("/login");
          console.log("Sign Out Success!");
        })
        .catch((error) => {
          console.log("signOut Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
        });
    },
  };