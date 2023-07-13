import { useState,useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { addData,editDataById,deleteDataById } from "./function";
import profile from "./profile.svg"


const Navbar = () => {

  const [isLogin,setisLogin]=useState("Login")
  const [username_now,setusername_now]=useState(null)
  const [isShowLogin,showLogin] = useState(false)
  const [isShowSignup,showSignup] = useState(false)
  const [isShowLogout,showLogout] = useState(false)

  const [userData,setUserData]=useState('')
  useEffect(() => {
    fetch("https://api-eeksapi-eeksapi.vercel.app/api/data")
    .then(res => res.json())
    .then(data => {
        setUserData(data)
    })
  },[]);

  const Login = () => {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [small,showsmall]=useState(false)

    const login_validation = (e) =>{
      e.preventDefault()
      let username_valid=false
      let password_valid=false

      for(let i=0;i<userData.length;i++){
        if (username===userData[i].username){
          username_valid=true
          if (password===userData[i].password){
            password_valid=true
          }
        }
      }
      if(username_valid===true){
        if(password_valid===true){
          setusername_now(username)
          setisLogin("Logout")
          showLogin(false)
        }
      }
      else{
        showsmall(true)
      }
    }

    return (
      <div className="login-blur">
        <div className="login-box">
          <form id="login" onSubmit={login_validation}></form>
          <div className="popup-title">Login</div>
          <label className="input-label">Username</label>
          <input required id="username" className="input-popup" type="text" placeholder="Username" form="login" onChange={(e)=>setUsername(e.target.value)}/>
          {small && <small className="small-login">username not found</small>}
          <label className="input-label">Password</label>
          <input required id="password" className="input-popup" type="password" placeholder="Password" form="login" onChange={(e)=>setPassword(e.target.value)}/>
          <div className="input-label signup-toggle">
            Don't have an account yet?
            <Link onClick={()=>{
              showLogin(false)
              showSignup(true)}} 
              to={window.location} className="toggle"> signup
            </Link>
          </div>
          <div><button type="submit" className="confirm" form="login">Login</button></div>
          <div><button className="cancel" onClick={()=>showLogin(false)}>Cancel</button></div>
        </div>
      </div>
    );
  }

  const Signup = () => {
    const[name,setName]=useState('')
    const[age,setAge]=useState('20')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [small,showsmall]=useState(false)

    const signup_validation = (e) => {
      e.preventDefault();
      let username_valid=true
      for(let i=0;i<userData.length;i++){
        if (username===userData[i].username){
          username_valid=false
        }
      }
      
      const newData = {
        name,
        age,
        username,
        password,
        balance:0,
        history:[],
        ticket:[],
        id: 1
      };

      if(username_valid===true){
        setusername_now(username)
        setisLogin("Logout")
        showSignup(false)
        addData(newData)
      }
      else{
        showsmall(true)
      }
    };

    return (
      <div className="signup-blur">
        <div className="signup-box">
            <div className="popup-title">Signup</div>
            <form id="signup" onSubmit={signup_validation}></form>
              <label className="input-label">Name</label>
              <input required id="username" className="input-popup" type="text" placeholder="Full Name" onChange={(e)=>setName(e.target.value)}/>
              <label className="input-label">Age</label>
              <label className="age-label">{age} years old</label>
              <input required id="age-range" className="age-popup" type="range" value={age} min={0} max={100} onChange={(e)=>setAge(e.target.value)}/>
              <label className="input-label">Username</label>
              <input required id="username" className="input-popup" type="text" placeholder="Username" form="signup" onChange={(e)=>setUsername(e.target.value)}/>
              {small && <small className="small-signup">username already in use</small>}
              <label className="input-label">Password</label>
              <input required id="password" className="input-popup" type="password" placeholder="Password" form="signup" onChange={(e)=>setPassword(e.target.value)}/>
              <div className="input-label login-toggle">
                Already an account?
                <Link onClick={()=>{
                  showLogin(true)
                  showSignup(false)}} 
                  to={window.location} className="toggle"> login
                </Link>
              </div>
              <div><button type="submit" id="confirm-account" className="confirm" form="signup">Create Account</button></div>
            <div><button className="cancel" onClick={()=>showSignup(false)}>Cancel</button></div>
        </div>
      </div>
    );
  }

  const Logout =() =>{

    const logout_validation =() =>{
      setusername_now(null)
      setisLogin("Login")
      showLogout(false)
    }

    return(
    <div className="logout-blur">
        <div className="logout-box">
          <div className="popup-title">Logout</div>
          <div className="logout-text">Are you sure want you to Logout ?</div>
          <div className="logout-button">
            <button className="logout-confirm" onClick={logout_validation}>Logout</button>
            <button className="logout-cancel" onClick={()=>showLogout(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  function nav_login(){
    dropdownclick2()
    if (isLogin==="Login"){
      showLogin(true)
    }
    else if(isLogin==="Logout"){
      showLogout(true)
    }
  }

  const [dropdown,setdropdown] = useState(false)
  const [dropclick,setdropclick] = useState(0)
  const dropdownclick = () => {
    if (dropclick%2==0){
      setdropdown(true)
    }
    else{
      setdropdown(false)
    }
    setdropclick(dropclick + 1);
  }

  const dropdownclick2 = () => {
    setdropclick(dropclick + 1)
    setdropdown(false)
  }

  return (
    <div>
      <div class="feature-box" >
        <div class="logo">
        <Link onClick={dropdownclick2} className="home" to="/">SEA CINEMAXX</Link>
        </div>
        <div class="menu">
          <ul>
            <li className="dropdown">
            <button className="dropbtn" onClick={dropdownclick}>Profile</button>
            {dropdown && <div className="dropdown-content" onBlur={()=>setdropdown(false)}>
              <Link onClick={dropdownclick2} to="/MyTicket">My Ticket</Link>
              <Link onClick={dropdownclick2} to="/Balance">Balance</Link>
              <Link onClick={nav_login} className="login" to={window.location}>Login</Link>
            </div>}
            </li>
            <li><img src={profile} onClick={dropdownclick} className="profile"/></li>
          </ul>
        </div>
      </div>
      {isShowLogin && (<Login/>)}
      {isShowSignup && (<Signup/>)}
      {isShowLogout && (<Logout/>)}
    </div> 
  );
}
 
export default Navbar;