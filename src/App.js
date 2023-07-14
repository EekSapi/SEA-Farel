import './App.css';
import './Responsive.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Myticket from './MyTicket';
import Balance from './Balance';
import { useState,useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { addData,editDataById,deleteDataById } from "./function";
import profile from "./profile.svg"


function App() {
  
  const [isLogin,setisLogin]=useState("Login")
  const [username_now,setusername_now]=useState(null)
  const [age_now,setage_now]=useState(null)
  const [isShowLogin,showLogin] = useState(false)
  const [isShowSignup,showSignup] = useState(false)
  const [isShowLogout,showLogout] = useState(false)
  const [index,setindex]=useState(0)
  const [dataseats,setseats] = useState([])

  const [userData,setUserData]=useState('')
  const fetchData = () => {
    fetch("https://eeksapi-api.vercel.app/api/data")
      .then(res => res.json())
      .then(data => {
        setUserData(data);
      });
  };
  
  useEffect(() => {
    fetchData();
  
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [seat, setSeat] = useState([]);
  useEffect(() => {
    const fetchData2 = () => {
      fetch("https://eeksapi-api.vercel.app/api/seat")
        .then((res) => res.json())
        .then((data) => {
          setSeat(data);
          setseats(data[0].seat_data[0].seat)
        })
        .catch((error) => {
          console.error("Error fetching seat data:", error);
        });
    };
    fetchData2();
    const interval = setInterval(fetchData2, 20000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [small_success,showsmall_success]=useState(false)
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
            setindex(i)
            setage_now(userData[i].age)
          }
        }
      }
      if(username_valid===true){
        if(password_valid===true){
          setusername_now(username)
          setisLogin("Logout")
          showLogin(false)
          showsmall_success(false)
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
          {small_success && 
          <small className="small-success">Account has registered !<br />Please kindly wait for 30 seconds to login</small>
          }
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
        showSignup(false)
        addData(newData)
        showLogin(true)
        showsmall_success(true)
        alert("Data created successfully")
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

  function dropdown_validation(username_now){
    if (username_now==null){
      showLogin(true)
    }
    else{
      dropdownclick2()
    }
  }

  const dropdownclick2 = () => {
    setdropclick(dropclick + 1)
    setdropdown(false)
  }

  function profile_name(username_now){
    if (username_now==null){
      return "Profile"
    }
    else{
      return(username_now)
    }
  }

  return (
    <Router>
        <div className="App">
        <div>
        <div class="feature-box" >
          <div class="logo">
          <Link onClick={dropdownclick2} className="home" to="/">SEA CINEMAXX</Link>
          </div>
          <div class="menu">
            <ul>
              <li className="dropdown">
              <button className="dropbtn" onClick={dropdownclick}>{profile_name(username_now)}</button>
              {dropdown && <div className="dropdown-content" onBlur={()=>setdropdown(false)}>
                { isLogin =="Logout" &&
                <>
                  <Link onClick={()=>dropdown_validation(username_now)} to="/MyTicket">My Ticket</Link>
                  <Link onClick={()=>dropdown_validation(username_now)} to="/Balance">Balance</Link>
                </>
                }
                <Link onClick={nav_login} className="login" to={window.location}>{isLogin}</Link>
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
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home username_now={username_now} showLogin={showLogin} age_now={age_now} index={index} userData={userData} seat={seat} dataseats={dataseats}/>
            </Route>
            <Route path="/MyTicket">
            { isLogin =="Logout" && <Myticket username_now={username_now} userData={userData} index={index} seat={seat}/>}
            </Route>
            <Route path="/Balance">
            { isLogin =="Logout" && <Balance username_now={username_now} index={index}/>}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
