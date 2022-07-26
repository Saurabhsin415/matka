import dynamic from "next/dynamic";
import React, { useEffect, useState,Component,useRef } from "react";
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from "react-toastify";
import {GuessingFormGet,GuessingFormPost,Like,Dislike} from "../api/app"; 
import Login from "./login"; 
import Cookies from 'js-cookie'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Quill = dynamic(() => import("react-quill"), { ssr: false });
import { usePagination } from "../../components/lib/hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faRefresh,faUser,faUserCheck,faUserFriends,faThumbsDown,faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import 'react-quill/dist/quill.snow.css';
  
export default function Guessingforum() {
 
   
//  console.log(token);
const [token,settoken]=useState();
  const [data, setData] = useState('');
  const [editor, setEditor] = useState();
 const [value, setValue] =useState('');
 const [user,setUser]=useState('');


 useEffect(()=>{
      
  if(Cookies.get('auth_token'))
  {
    settoken(Cookies.get('auth_token'));
    setUser(JSON.parse(Cookies.get('user_info')));
  }
},[])
 const style = {
   position: 'absolute',
   top: '40%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   background:'linear-gradient(119deg, #d0e5f9, #b4bfcb);',
   boxShadow: 24,
   borderRadius:'5px',
   p: 4,
 };
 const [open, setOpen] = React.useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const emoji=[
{'src':'https://dpboss.rocks/emoji/congrats.gif','icon':'name'},
{'src':'https://dpboss.rocks/emoji/Thanks.gif','icon':'name'},
{'src':'https://dpboss.rocks/emoji/angry.gif','icon':'name'},
]

 
//add emoji
const addemoji=(item)=>{
 toast("Emoji Added Succefully.")
 let img=`${value}`+'<img src='+`${item.src}` +' className="img1"/>';
 setValue(img);
 setOpen(false);
}

//submit
const submit =()=>{
 let fd={'comment':value}
let result=GuessingFormPost(fd);
result.then(response=>{
 
 if(response.data.status==true)
 {
   setValue('');
   toast(response.data.message);
 }

}) 
}

 //like
 const like=(item)=>
 {
   console.log(item);
   let fd={id:item.id}
   let result=Like(fd);
   result.then(response=>{
 if(response.data.status==true)
 {
   toast(response.data.message);
 }
   });

 }
 //dislike
 const dislike=(item)=>
 {
   console.log(item);
   let fd={id:item.id}
   let result=Dislike(fd);
   result.then(response=>{
 if(response.data.status==true)
 {
   toast(response.data.message);
 }
   });

 }

const {loadingMore,isReachedEnd,error,size,setSize,paginatedPost}=usePagination('guessing-forum');
  return (
    <>
 
<div className="text-center py-3 text-family1 guessing-forum">
<h3 style={{'marginBottom':'0px'}}>Guessing Forum</h3> 
 {/* <div className='text-color1'>Date:10/07/2022</div> */}
 </div> 
 
 <div className='content-wrap1'>
  <img src="https://html.themexriver.com/Saasio/assets/img/port-img-31/cta-bg-shape.png"  className='img1'/>
  {/* <div></div> */}
 
  <div className="text-center text-family text-justify">
  Satta Matka Kalyan Main Mumbai Fastest Results
Get Kalyan Matka Main Mumbai Satta Matka Market Results Fastest Live Update. Get All Kalyan,Main Mumbai,Madhur Matka,Rajdhani,Milan,Madhur Matka And Time Bazar Jodi Penal Panel Patti Panna Charts For Free . All Matka Guessing.With Best Guessers , Online Old Charts , Satta Matka Number Software Links, Online Charts List Pdf Download And Top Matka Guessing Free Number Provided By Sattamatka143 Professor And Master Dr Admin Sir.
Other Special Features Include 220 Patti Satta Weekly Matka Jodi Chart With Direct Access To Guessing Form Of Experts Tricks Access Via Website

</div>
</div>
 
      <CssBaseline />
<Login token={token} user={user}/>
      {!token?'': <Container maxWidth="lg" className="content-wrap1 py-20 text-center">
      <Button onClick={handleOpen} className="emoji_img">Add Emoji</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
   
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
  
          </Typography>
          <div className="">
            {emoji && emoji.map((item,index)=>{
 return(
<img key={index} className="emoji_img" src={item.src} alt="df"  onClick={() => addemoji(item)}/> 
            )
            })}
          </div>
        </Box>
      </Modal>
       
       {console.log(value)}
      <ReactQuill value={value} onChange={setValue}/>

<div className="text-center">   <a href="#" className="btn button" onClick={submit}>Submit</a></div>
      </Container>
      }
 
<div className="content-wrap2 text-center">
 <div className="guessing-button">Top 10 Users</div>
 <div className="guessing-button">Show Original Post</div>

</div>
 
  {/* form list */}
      {/* {console.log(paginatedPost)} */}
 {error && <p>something went wrong</p>}
 {!paginatedPost && <Box sx={{ display: 'flex' }}>
      <CircularProgress className="m-auto mt-20"/>
    </Box>}
 {paginatedPost?.map((item,index)=>
 (

  <div className='guessing-content' key={index}>

<div className='guessing-heading clearfix'>
    <div className='float-left bold'><FontAwesomeIcon icon={faUser} /> {item.username}</div>
    <div className='float-right date'>{item.time}</div>

</div>
 
<div className="text-center py-3 text-capitalize" dangerouslySetInnerHTML={{__html: item.comment}}></div>  

<div className="clearfix guessing-footer">
  <div className="float-left">(Quote)</div>
 
  <div className="float-right"><span style={{'margin':'0px 8px 0px 0px','color':'#ec017d','cursor':'pointer'}}  onClick={() => like(item)}><FontAwesomeIcon icon={faThumbsUp} /> {item.like}</span>
  <span style={{'margin':'0px 15px 0px 0px','color':'rgb(138 10 164)','cursor':'pointer'}} onClick={() => dislike(item)}><FontAwesomeIcon icon={faThumbsDown} /><span style={{'margin':'0px 0px 0px 5px','color':'rgb(138 10 164)'}}>{item.dislike}</span></span> </div>
</div>
 </div>
  
 )
 )}
  
 
  {loadingMore && <Box sx={{ display: 'flex' }}>
      <CircularProgress className="m-auto mt-20"/>
    </Box>}
  {!isReachedEnd  && <div className="text-center "><a className="btn button mt-10" onClick={()=>setSize(size+1)}>Load More</a></div>}
    </>
  );
}
