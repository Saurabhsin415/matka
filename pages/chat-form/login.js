import React, { useEffect, useState,Component,useRef } from "react";
import Link from 'next/link';
import {Logout} from "../api/app"; 
export default function Login({token,user}) {
 //logout
//  {console.log(user)}
const logout=()=>{
    let result=Logout();
  
    result.then(response=>{
  // console.log(response);
      toast(response.data.message); 
      setUser('');
      settoken('');
      Cookies.remove('auth_token');
      Cookies.remove('user_info');
    }).catch(error=>{
     console.log(error);
    })
  
  }

  return (
    <>
       {token?<div className="content-wrap1 py-20 text-center">
 <h2 className="text-uppercase m-0">hi, {user.username}</h2>
 <div className="text-center">  <a className="btn button" onClick={logout} >Logout</a> </div> 
      </div>
      :''}
     {token?'':<div className="content-wrap1 py-20 text-center">
 <h2 className="text-uppercase m-0">User Login</h2>
 <div className="text-center">  <Link href="login" ><a className="btn button" >Login</a></Link>  <Link href="register" ><a className="btn button">Register</a></Link></div>
 
      </div>}
 
   </>
    
  );
}