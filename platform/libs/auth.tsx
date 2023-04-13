/*******************************************************************/
/*                                                                 */
/*                  BLANKLY FINANCE CONFIDENTIAL                   */
/*                   _ _ _ _ _ _ _ _ _ _ _ _ _                     */
/*                                                                 */
/* Copyright 2022 Blankly Finance Incorporated                     */
/* All Rights Reserved.                                            */
/*                                                                 */
/* NOTICE:  All information contained herein is, and remains the   */
/* property of Blankly Finance Incorporated and its suppliers, if  */
/* any.  The intellectual and technical concepts contained         */
/* herein are proprietary to Blankly Finance Incorporated and its  */
/* suppliers and may be covered by U.S. and Foreign Patents,       */
/* patents in process, and are protected by trade secret or        */
/* copyright law.  Dissemination of this information or            */
/* reproduction of this material is strictly forbidden unless      */
/* prior written permission is obtained from Blankly Finance       */
/* Incorporated.                                                   */
/*                                                                 */
/*******************************************************************/

import {createContext, useContext, useEffect, useState} from "react";
import Router, {useRouter} from "next/router";
import {firebase} from "./firebase";
import {User} from "@/types/user";
import {getDoc, setDoc} from "./firestore";
import {useIntercom} from "react-use-intercom";
import {getUserOnce, getUserSubscription} from "@/services/user-store";
import {createProject} from "@/services/projects-store";
import {getModelsOnce} from "@/services/models-store";

const authContext = createContext({});

export function AuthProvider({children}: any): any {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = (): any => {
  return useContext(authContext);
};

function createNewUser(user: firebase.User) {
  const name = user.displayName;
  let firstName = '', lastName = '';

  if (name) {
    firstName = name.split(' ')[0];
    lastName = name.split(' ')[1];
  }

  const userData: User = {
    uid: user.uid,
    email: user.email as string,
    phone: user.phoneNumber ?? "",
    profileUrl: user.photoURL ?? "",
    firstName,
    activeId: user.uid,
    lastName,
    createdAt: Date.now() / 1000,
    bio: "",
  };

  return userData;
}

function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUID] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {update} = useIntercom();

  useEffect(() => {
    if (uid) {
      const unsubscribe = getUserSubscription(uid).onSnapshot((query) => {
        if (query.data()) {
          setUser({...query!.data() as any, uid: query.id});
        }
      });
      return () => unsubscribe();
    }
    return
  }, [uid])

  const handleUser = async (user: firebase.User | null) => {
    if (user) {
      const userId = user.uid;
      setRefreshToken(user.refreshToken);
      const idToken = await user.getIdToken();
      setToken(idToken);
      setUID(userId);

      const doc = await getDoc(`users/${userId}`);
      let userData = doc.data() as User;

      if (!userData) {
        const newUser = createNewUser(user);
        await createProject({id: user.uid,}, user.uid)
        setUser(newUser);
        setLoading(false);
        await setDoc(`users/${userId}`, newUser);
        Router.push('/auth/setup')
      } else {
        setUser(userData);
        setLoading(false);

        if (userData && userData.firstName && userData.firstName.length > 0) {
          update({
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            userId: userData.uid,
          })
        } else { // no first name means has to go to set up
          Router.push('/auth/setup');
        }
      }
      return user;
    } else {
      setUser(null);
      setUID(null);
      setRefreshToken(null);
      setToken(null);
      setUser(null);
      setLoading(false);
      return false;
    }
  };

  const updateFirebaseUser = (displayName?: string, photoURL?: string) => {
    const current = firebase.auth().currentUser
    if (current) {
      if (displayName && photoURL) {
        return current.updateProfile({displayName, photoURL})
      } else if (displayName) {
        return current.updateProfile({displayName})
      } else if (photoURL) {
        return current.updateProfile({photoURL})
      }
    }
    return;
  }

  const signinWithEmailPassword = (
    email: string,
    password: string,
    redirect: string,
  ) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        if (redirect.indexOf("/deploy") !== -1) {
          handleDeployment();
        } else {
          const user = response.user as any

          getUserOnce(user.uid).then((doc) => {
            const activeId = doc.data()?.activeId

            getModelsOnce(activeId).then((val) => {
              if (val.empty && redirect === '/dashboard') {
                Router.push(`/${activeId}/create`);
              } else if (redirect === '/dashboard') {
                Router.push(`/${activeId}`);
              } else {
                Router.push(redirect);
              }
            })
          })
        }
      });
  };

  const createAccountWithEmailPassword = (
    email: string,
    password: string,
    redirect: string
  ) => {
    setLoading(true);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        if (redirect) {
          Router.push(`/auth/setup?redirectUrl=${redirect}`);
        } else {
          Router.push(`/auth/setup`);
        }
      });
  };

  const signinWithGoogle = (redirect: string, location = 'Sign In') => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
        if (redirect.indexOf("/deploy") !== -1) {
          handleDeployment();
        } else {
          const user = response.user as any
          getModelsOnce(user.uid).then((val) => {
            if (val.empty && redirect === '/dashboard') {
              Router.push(`/${user.uid}/create`);
            } else if (redirect === '/dashboard') {
              Router.push(`/${user.uid}`);
            } else {
              Router.push(redirect);
            }
          })
        }
      }).catch((e) => {
        alert(e.message)
      });
  };

  const signinWithFacebook = (redirect: string, location = 'Sign In') => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((response) => {
        handleUser(response.user);
        if (redirect.indexOf("/deploy") !== -1) {
          handleDeployment();
        } else {
          const user = response.user as any
          getModelsOnce(user.uid).then((val) => {
            if (val.empty && redirect === '/dashboard') {
              Router.push(`/${user.uid}/create`);
            } else if (redirect === '/dashboard') {
              Router.push(`/${user.uid}`);
            } else {
              Router.push(redirect);
            }
          })
        }
      }).catch((e) => {
        alert(e.message)
      });
  };

  const handleDeployment = async () => {
    window.location.href = `http://localhost:9082/?token=${refreshToken}`;
  };

  const signinWithGithub = (redirect: string, location: string = 'Sign In') => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
        if (redirect.indexOf("/deploy") !== -1) {
          handleDeployment();
        } else {
          const user = response.user as any
          getModelsOnce(user.uid).then((val) => {
            if (val.empty && redirect === '/dashboard') {
              Router.push(`/${user.uid}/create`);
            } else if (redirect === '/dashboard') {
              Router.push(`/${user.uid}`);
            } else {
              Router.push(redirect);
            }
          })
        }
      }).catch((e) => {
        alert(e.message)
      });
  };

  const resetPassword = (email: string) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
  }

  const signout = () => {
    return router.push('/auth/signin').then(() => {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          handleUser(null);
        });
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => handleUser(user));
    return () => unsubscribe();
  }, []);

  return {
    user,
    uid,
    loading,
    refreshToken,
    token,
    updateFirebaseUser,
    signinWithGoogle,
    signinWithEmailPassword,
    createAccountWithEmailPassword,
    signinWithFacebook,
    signinWithGithub,
    resetPassword,
    signout,
  };
}
