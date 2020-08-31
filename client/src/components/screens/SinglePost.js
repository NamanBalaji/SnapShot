import React,{useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App'
import { Link,useHistory } from 'react-router-dom';
import {useParams} from 'react-router-dom'

const SinglePost = ()=>{
    const history = useHistory()
    const {postid} = useParams()
    const [data,setData] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch(`/singlepost/${postid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then( result=>{
           console.log(result.post)
           setData(result.post)
           console.log(data)
       })
    },[data])

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data=>{
                if(data._id==result._id){
                    return result
                }else{
                    return data
                }
            }
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data=>{
                if(data._id==result._id){
                    return result
                }else{
                    return data
                }
            }
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data=>{
                if(data._id==result._id){
                    return result
                }else{
                    return data
                }
             }
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            
            setData(null)
            history.push('/')
        })
    }
    return (
        <>
        {data!=undefined?
       <div className="home">
                       <div className="card home-card" key={data._id}>
                       
<h5  style={{padding:"5px"}}><div onClick={()=>{if(data.postedBy._id !== state._id){
              let path = '/profile/'+data.postedBy._id 
              history.push(path) 
            }
            else{
               history.push('/profile')
            }
            }
            }>{data.postedBy.name}</div><div>{data.postedBy._id == state._id
              && <i className="material-icons" style={{
               float:"right"
               }} 
               onClick={()=>deletePost(data._id)}
               >delete</i>
               }</div></h5>
               {data.postedBy._id == state._id?<div><button className="btn waves-effect waves-light grey darken-4"onClick={()=>{
                   let pa = '/editpost/'+data._id
                   history.push(pa)}}><i class="small material-icons">more_vert</i></button></div>:<div></div>
                }
                            <div className="card-image">
                                <img src={data.photo}/>
                            </div>
                            <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                            {data.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(data._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(data._id)}}
                            >thumb_up</i>
                            }
                            
                           
                                <h6>{data.likes.length} likes</h6>
                                <h6>{data.title}</h6>
                                <p>{data.body}</p>
                                {
                                    data.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,data._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                                
                            </div>
                        </div> 
                  
           
          
          
       </div>
       :"loading"}
       </>
  )
}

export default SinglePost;

//<Link style={{color:"black"}} to={data.postedBy._id !== state._id?'/profile/'+data.postedBy._id : '/profile'}>
