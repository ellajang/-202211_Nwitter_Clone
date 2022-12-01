import React,{useState,useEffect} from 'react';
import AppRouter from "components/Router";
import {authService} from "fbase";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faTrashAlt,faPencilAlt);

function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userObj,setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args) => user.updateProfile(args),
        });
      }else{
        setIsLoggedIn(false);
        setUserObj(null);
      }
        setInit(true);
    });
  },[]);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:(args) => user.updateProfile(args),
    });
  }
  return(
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn = {Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
  </>
  );
}

export default App;
