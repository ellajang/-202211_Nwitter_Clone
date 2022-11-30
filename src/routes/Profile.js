import React,{useState,useEffect} from "react";
import {authService} from "fbase";
import {useHistory} from "react-router-dom";
import {dbService,storageService} from "fbase";


const Profile=({userObj}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyNweets = async() => {
        const nweets = await dbService.collection("nweets").where("creatorId","==", userObj.uid).orderBy("createdAt").get();
        console.log(nweets.docs.map(doc=>doc.data()));
    }
    useEffect(()=>{
        getMyNweets();
    },[])
    return (
        <>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile