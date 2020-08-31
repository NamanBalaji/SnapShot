import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams,useHistory} from 'react-router-dom'
import M from 'materialize-css';

const EditPost = ()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [imageData,setImageData] = useState(null)
    const [tit,setTit] = useState(imageData?imageData.title:"")
    const [bd, setBd] = useState(imageData?imageData.body:"")
    const {postid} = useParams()

    useEffect(()=>{
       
        fetch(`/singlepost/${postid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setImageData(result.post)
        })
     },[])

     const edit = (id)=>{
        fetch(`/editpost/${id}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                title: tit,
                body: bd
            })
        }).then(res=>res.json())
        .then(data=>{
          if(data.error){
            M.toast({html: data.error})
          }
          else{
            M.toast({html: data.message})
            history.push('/profile')
          }
        }).catch(err=> {console.log(err);})
     }
     
     return(
         <>{
         imageData?
         
        <div className="mycard">
    <div className="card input-field post-card"
    style={{margin:'30px auto',maxWidth:"60%",padding:"20px",textAlign:"center"}}>
      <div className="card-image">
      <img src={imageData.photo} ></img>
      </div> 
       <input type="text" placeholder={imageData.title} onChange={(e)=>{setTit(e.target.value)}}/>
       <input type="text" placeholder={imageData.body} onChange={(e)=>{setBd(e.target.value)}}/>
    <button className="btn waves-effect waves-light grey darken-4" onClick={()=>edit(imageData._id)}>Post</button>
    </div>
    </div> :
    "Loading"
}
    </>
     )
}

export default EditPost