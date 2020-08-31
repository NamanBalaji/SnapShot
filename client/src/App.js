import React, {useEffect, createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer, initialState} from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile';
import SubscribedUserPost from './components/screens/SubscribedUserPost'
import SinglePost from './components/screens/SinglePost';
import EditPost from './components/screens/EditPost';
import './App.css';

 export const UserContext = createContext()

 const Routing = ()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
     const user = JSON.parse(localStorage.getItem("user"))
     if(user){
        dispatch({type:"USER",payload:user})
     }
     else{
        history.push('/login')
     }
    },[])
    return(
       <Switch>
      <Route exact path="/">
      <Home />
   </Route>
   <Route path="/login">
      <Login />
   </Route>
   <Route path="/signup">
      <Signup />
   </Route>
   <Route exact path="/profile">
      <Profile />
   </Route>
   <Route path="/create">
      <CreatePost />
   </Route>
   <Route path="/profile/:userid">
      <UserProfile />
   </Route>
   <Route path="/singlepost/:postid">
      <SinglePost />
   </Route>
   <Route path="/editpost/:postid">
      <EditPost />
   </Route>
   <Route path="/myfollowingpost">
      <SubscribedUserPost />
   </Route>
   </Switch>
    )
 }

function App() {
   const [state,dispatch] = useReducer(reducer, initialState)
  return (
     <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
   
  );
}

export default App;
