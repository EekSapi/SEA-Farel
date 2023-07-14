import { useState,useEffect } from "react"
import plus_symbol from "./plus.svg"
import minus_symbol from "./minus.svg"
import {dotting,getTime} from "./function.js"
import axios from 'axios'

const Balance = ({ username_now,index }) => {
    const [userData,setUserData]=useState('')
    const [balance,balanceupdate] = useState(null)
    const [history_temp,sethistory]=useState([])

    const fetchData = () => {
        fetch("http://localhost:5000/api/data")
          .then(res => res.json())
          .then(data => {
            setUserData(data);
            if (index >= data.length) {
              balanceupdate(0);
              sethistory([]);
            } else {
              balanceupdate(data[index].balance);
              sethistory(data[index].history);
            }
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          })
          .finally(() => {
            setTimeout(fetchData, 5000);
          });
      };
      
      useEffect(() => {
        fetchData();
      
        return () => {
          clearTimeout(fetchData);
        };
      }, [username_now]);

    const [isshowtopup,setTopup]=useState(false)
    function showtopup(){
        setTopup(true)
    }
    function hidetopup(){
        setTopup(false)
    }

    const [isshowwithdrawal,setWithdrawal]=useState(false)
    function showwithdrawal(){
        setWithdrawal(true)
    }
    function hidewithdrawal(){
        setWithdrawal(false)
    }

    const [thevalue,setvalue] = useState(0)
    const increase= () => {
        setvalue(thevalue + 10000)
    }
    const  decrease= () => {
        if(thevalue>0){
            setvalue(thevalue - 10000)
        }
    }

    const [thevalue2,setvalue2] = useState(10000)
    const increase2= () => {
        if(thevalue2<balance){
            if(thevalue2<500000){
                setvalue2(thevalue2 + 10000)
            }
        }
    }
    const  decrease2= () => {
        if(thevalue2>10000){
            setvalue2(thevalue2 - 10000)
        }
    }

    function editDataById(updatedData) {
        axios
          .put(`http://localhost:5000/api/data/${userData[index].id}`, updatedData)
          .then((response) => {
            console.log(response.data.message); 
          })
          .catch((error) => {
            console.error(error);
          });
      }

    const confirmtopup = () =>{
        if(thevalue>0){
            balanceupdate(balance+thevalue)
            hidetopup()
            history_temp.push("Topup Rp."+thevalue+" succesful "+ getTime())

            let updatedData={
                name :userData[index].name,
                age :userData[index].age,
                username :userData[index].username,
                password:userData[index].password,
                balance :balance+thevalue,
                history :history_temp,
                ticket :userData[index].ticket,
                id :userData[index].id
            }
            editDataById(updatedData)

            setvalue(0)
        }
    }

    const confirmwithdrawal = () =>{
        balanceupdate(balance-thevalue2)
        if (balance>0){
            setvalue2(10000)
        }
        hidewithdrawal()
        history_temp.push("Withdrawal Rp."+thevalue2+" succesful "+ getTime())

        let updatedData={
            name :userData[index].name,
            age :userData[index].age,
            username :userData[index].username,
            password:userData[index].password,
            balance :balance-thevalue2,
            history :history_temp,
            ticket :userData[index].ticket,
            id :userData[index].id
        }
        editDataById(updatedData)
    }

    const Topup = () =>{
        return (
            <div className="blury">
                <div className="box">
                    <div className="popup-title">Topup</div>
                    <div>
                        <input disabled className="input-popup" type="text" value={"Rp. "+dotting(thevalue)}></input>
                        <div className="operator">
                            <button onClick={decrease} className="operator-box"><img src={minus_symbol} className="minus" /></button>
                            <button onClick={increase} className="operator-box"><img src={plus_symbol} className="plus" /></button>
                        </div>
                    </div>
                    <div><button className="confirm" onClick={confirmtopup}>Confirm Payment</button></div>
                    <div><button className="cancel" onClick={hidetopup}>Cancel</button></div>
                </div>
            </div>
        )
    }

    const Withdrawal = () =>{
        return (
            <div className="blury">
                <div className="box">
                    <div className="popup-title">Withdrawal</div>
                    <div>
                        <input disabled className="input-popup" type="text" value={"Rp. "+dotting(thevalue2)}></input>
                        <div className="operator">
                            <button onClick={decrease2} className="operator-box"><img src={minus_symbol} className="minus" /></button>
                            <button onClick={increase2} className="operator-box"><img src={plus_symbol} className="plus" /></button>
                        </div>
                    </div>
                    <div><button className="confirm" onClick={confirmwithdrawal}>Confirm Withdrawal</button></div>
                    <div><button className="cancel" onClick={hidewithdrawal}>Cancel</button></div>
                </div>
            </div>
        )
    }

    const HistoryList = () => {
        return history_temp.map((history, i) => {

            return (
                <div className="history-content" key={i}>
                    {history}
                </div>
            )
        })
    }
    
    return (
        <div className="balance">
            <div className="title">Balance<div>Rp. {dotting(balance)}</div></div>
            <div className="request">
                <button onClick={showtopup} className="topup">Topup</button>
                <button onClick={showwithdrawal} className="withdrawal">Withdrawal</button>
            </div>
            <div className="history">History</div>
            <div className="history-box">
                <HistoryList/>
            </div>
            {isshowtopup && (<Topup />)}
            {isshowwithdrawal && (<Withdrawal />)}
        </div>
    );
}
 
export default Balance;