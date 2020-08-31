import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error})
           }
           else{
               M.toast({html:"Created post Successfully"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  
   const PostDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","snapshot")
       data.append("cloud_name","namanmadridcloud")
       fetch("https://api.cloudinary.com/v1_1/namanmadridcloud/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })

    
   }
   return(
       <div className="mycard">
    <div className="card input-field post-card"
    style={{margin:'30px auto',maxWidth:"60%",padding:"20px",textAlign:"center"}}>
       <input type="text" placeholder="title" onChange={(e)=>{setTitle(e.target.value)}}/>
       <input type="text" placeholder="caption" onChange={(e)=>{setBody(e.target.value)}}/>
       <div className="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
    <button className="btn waves-effect waves-light grey darken-4" onClick={()=>PostDetails()}>Post</button>
    </div>
    </div>
   );
}

export default CreatePost;