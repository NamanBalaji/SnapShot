import React,{useState,useEffect} from 'react';
import{Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = ()=>{
  const history  = useHistory();
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [image,  setImage] = useState("")
  const [url,setUrl] = useState(undefined)
  
  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])

  const uploadPic = ()=>{
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
  const uploadFields = ()=>{
    fetch("/signup",{
      method: "post",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic:url
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error})
      }
      else{
        M.toast({html: data.message})
        history.push('/login')
      }
    }).catch(err=> {console.log(err);})
  }

  const postData =()=>{
    if(image){
      uploadPic()
    }else{
       uploadFields()
    }
    
  }

   return(
    <div className="mycard">
    <div className="card auth-card">
      <h2>SnapShot</h2>
      <input type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
      <input type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
      <div className="file-field input-field">
      <div className="btn">
        <span>Upload Profile Picture</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
      <button className="btn waves-effect waves-light grey darken-4" onClick={()=>postData()}>Signup</button>
      <h6>
          <Link to='/login'>Already a user?</Link>
      </h6>
    </div>
</div>
   );
}

export default Signup;