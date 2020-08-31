import React,{useContext,useRef,useEffect,useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../App'
import M from 'materialize-css'
const Navbar = ()=>{
  const  searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
   const {state,dispatch} = useContext(UserContext)
   const history = useHistory()
    
    useEffect(()=>{
      M.Modal.init(searchModal.current)
  },[])
    
    const renderList = ()=>{
      if(state){
        return [
          <li key="1"><i data-target="modal1" className="large material-icons modal-trigger">search</i></li>,
          <li key="2"><Link to="/myfollowingpost">Home</Link></li>,
          <li key="3" ><Link to="/profile">Profile</Link></li>,
          <li key="4"><Link to="/create">Create Post</Link></li>,
          
          <li  key="5">
            <button className="btn waves-effect waves-light grey darken-4"
             onClick={()=>{
               localStorage.clear()
               dispatch({type:"CLEAR"})
               history.push('/login')
             }} >Logout</button>
          </li>]
        
    }
    else{
       return(
         [<li  key="6"><Link to="/login">LogIn</Link></li>,
         <li  key="7"><Link to="/signup">SignUp</Link></li>]
       );
    }
  }

  const fetchUsers = (query)=>{
    setSearch(query)
    fetch('/search-users',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      setUserDetails(results.user)
    })
 }
    return(
        <nav>
    <div className="nav-wrapper teal darken-2">
      <Link to={state?"/":"/login"} className="brand-logo left">SnapShot</Link>
      <ul id="nav-mobile" className="right ">
        {renderList()}
      </ul>
    </div>
    <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <div  onClick={()=>{
                  M.Modal.getInstance(searchModal.current).close()
                  setSearch('')
                  if(item._id !== state._id){
                    let path = "/profile/"+item._id
                    history.push(path)
                   }
                   else{
                     let path='/profile'
                     history.push(path)
                   }
                   
                 }}><li className="collection-item">{item.email}</li></div> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
  </nav>
    );
}

export default Navbar;