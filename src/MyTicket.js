import { useState,useEffect } from "react"
import axios from 'axios'
import { getTime } from "./function"

const Myticket = ({username_now,userData,index,seat}) => {
    const [ticket_temp,setticket]=useState([])
    const fetchData = () => {
        fetch("https://eeksapi-api.vercel.app/api/data")
          .then(res => res.json())
          .then(data => {
            setticket(data[index].ticket)
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
    }
    }, [])

    function editDataById(updatedData) {
    axios
        .put(`https://eeksapi-api.vercel.app/api/data/${userData[index].id}`, updatedData)
        .then((response) => {
        console.log(response.data.message); 
        })
        .catch((error) => {
        console.error(error)
        })
    }

    function editanotherDataById(updatedData) {
    console.log(updatedData)
    axios
        .put(`https://eeksapi-api.vercel.app/api/seat/1`, updatedData)
        .then((response) => {
        console.log(response.data.message); 
        })
        .catch((error) => {
        console.error(error)
        })
    }

    function restore(ticket){
    let seatData=seat[0].seat_data[0].seat

    const i=ticket_temp.findIndex(item=>item.seat==ticket.seat)
    if (i !== -1) {
        ticket_temp.splice(i, 1);
        }
    let history_temp=userData[index].history
    history_temp.push("Payment Rp. "+(ticket.price)+" for ticket movie : ("+(ticket.title)+") seats : ("+ticket.seat+") has been refunded "+getTime())

    let updatedData={
        name :userData[index].name,
        age :userData[index].age,
        username :userData[index].username,
        password:userData[index].password,
        balance :userData[index].balance+ticket.price,
        history :history_temp,
        ticket :ticket_temp,
        id :userData[index].id
    }

    editDataById(updatedData)

    const Data = seatData.map((seat) => {
        if ((ticket.seat).includes(seat.number)) {
            return { ...seat, status: "available" };
        }
        return seat;
        });


    let anotherData={
        title:"Fast X",
        seat_data:[
            {
                time:"09:00",
                seat:Data
            },
            {time:"12:00",seat:[
                {number:1,status:"available"},
                {number:2,status:"available"},
                {number:3,status:"available"},
                {number:4,status:"available"},
                {number:5,status:"available"},
                {number:6,status:"available"},
                {number:7,status:"available"},
                {number:8,status:"available"},
                {number:9,status:"available"},
                {number:10,status:"available"},
                {number:11,status:"available"},
                {number:12,status:"available"},
                {number:13,status:"available"},
                {number:14,status:"available"},
                {number:15,status:"available"},
                {number:16,status:"available"},
                {number:17,status:"available"},
                {number:18,status:"available"},
                {number:19,status:"available"},
                {number:20,status:"available"},
                {number:21,status:"available"},
                {number:22,status:"available"},
                {number:23,status:"available"},
                {number:24,status:"available"},
                {number:25,status:"available"},
                {number:26,status:"available"},
                {number:27,status:"available"},
                {number:28,status:"available"},
                {number:29,status:"available"},
                {number:30,status:"available"},
                {number:31,status:"available"},
                {number:32,status:"available"},
                {number:33,status:"available"},
                {number:34,status:"available"},
                {number:35,status:"available"},
                {number:36,status:"available"},
                {number:37,status:"available"},
                {number:38,status:"available"},
                {number:39,status:"available"},
                {number:40,status:"available"},
                {number:41,status:"available"},
                {number:42,status:"available"},
                {number:43,status:"available"},
                {number:44,status:"available"},
                {number:45,status:"available"},
                {number:46,status:"available"},
                {number:47,status:"available"},
                {number:48,status:"available"},
                {number:49,status:"available"},
                {number:50,status:"available"},
                {number:51,status:"available"},
                {number:52,status:"available"},
                {number:53,status:"available"},
                {number:54,status:"available"},
                {number:55,status:"available"},
                {number:56,status:"available"},
                {number:57,status:"available"},
                {number:58,status:"available"},
                {number:59,status:"available"},
                {number:60,status:"available"},
                {number:61,status:"available"},
                {number:62,status:"available"},
                {number:63,status:"available"},
                {number:64,status:"available"},
            ]},
            {time:"15:00",seat:[
                {number:1,status:"available"},
                {number:2,status:"available"},
                {number:3,status:"available"},
                {number:4,status:"available"},
                {number:5,status:"available"},
                {number:6,status:"available"},
                {number:7,status:"available"},
                {number:8,status:"available"},
                {number:9,status:"available"},
                {number:10,status:"available"},
                {number:11,status:"available"},
                {number:12,status:"available"},
                {number:13,status:"available"},
                {number:14,status:"available"},
                {number:15,status:"available"},
                {number:16,status:"available"},
                {number:17,status:"available"},
                {number:18,status:"available"},
                {number:19,status:"available"},
                {number:20,status:"available"},
                {number:21,status:"available"},
                {number:22,status:"available"},
                {number:23,status:"available"},
                {number:24,status:"available"},
                {number:25,status:"available"},
                {number:26,status:"available"},
                {number:27,status:"available"},
                {number:28,status:"available"},
                {number:29,status:"available"},
                {number:30,status:"available"},
                {number:31,status:"available"},
                {number:32,status:"available"},
                {number:33,status:"available"},
                {number:34,status:"available"},
                {number:35,status:"available"},
                {number:36,status:"available"},
                {number:37,status:"available"},
                {number:38,status:"available"},
                {number:39,status:"available"},
                {number:40,status:"available"},
                {number:41,status:"available"},
                {number:42,status:"available"},
                {number:43,status:"available"},
                {number:44,status:"available"},
                {number:45,status:"available"},
                {number:46,status:"available"},
                {number:47,status:"available"},
                {number:48,status:"available"},
                {number:49,status:"available"},
                {number:50,status:"available"},
                {number:51,status:"available"},
                {number:52,status:"available"},
                {number:53,status:"available"},
                {number:54,status:"available"},
                {number:55,status:"available"},
                {number:56,status:"available"},
                {number:57,status:"available"},
                {number:58,status:"available"},
                {number:59,status:"available"},
                {number:60,status:"available"},
                {number:61,status:"available"},
                {number:62,status:"available"},
                {number:63,status:"available"},
                {number:64,status:"available"},
            ]},
            {time:"18:00",seat:[
                {number:1,status:"available"},
                {number:2,status:"available"},
                {number:3,status:"available"},
                {number:4,status:"available"},
                {number:5,status:"available"},
                {number:6,status:"available"},
                {number:7,status:"available"},
                {number:8,status:"available"},
                {number:9,status:"available"},
                {number:10,status:"available"},
                {number:11,status:"available"},
                {number:12,status:"available"},
                {number:13,status:"available"},
                {number:14,status:"available"},
                {number:15,status:"available"},
                {number:16,status:"available"},
                {number:17,status:"available"},
                {number:18,status:"available"},
                {number:19,status:"available"},
                {number:20,status:"available"},
                {number:21,status:"available"},
                {number:22,status:"available"},
                {number:23,status:"available"},
                {number:24,status:"available"},
                {number:25,status:"available"},
                {number:26,status:"available"},
                {number:27,status:"available"},
                {number:28,status:"available"},
                {number:29,status:"available"},
                {number:30,status:"available"},
                {number:31,status:"available"},
                {number:32,status:"available"},
                {number:33,status:"available"},
                {number:34,status:"available"},
                {number:35,status:"available"},
                {number:36,status:"available"},
                {number:37,status:"available"},
                {number:38,status:"available"},
                {number:39,status:"available"},
                {number:40,status:"available"},
                {number:41,status:"available"},
                {number:42,status:"available"},
                {number:43,status:"available"},
                {number:44,status:"available"},
                {number:45,status:"available"},
                {number:46,status:"available"},
                {number:47,status:"available"},
                {number:48,status:"available"},
                {number:49,status:"available"},
                {number:50,status:"available"},
                {number:51,status:"available"},
                {number:52,status:"available"},
                {number:53,status:"available"},
                {number:54,status:"available"},
                {number:55,status:"available"},
                {number:56,status:"available"},
                {number:57,status:"available"},
                {number:58,status:"available"},
                {number:59,status:"available"},
                {number:60,status:"available"},
                {number:61,status:"available"},
                {number:62,status:"available"},
                {number:63,status:"available"},
                {number:64,status:"available"},
            ]},
            {time:"21:00",seat:[
                {number:1,status:"available"},
                {number:2,status:"available"},
                {number:3,status:"available"},
                {number:4,status:"available"},
                {number:5,status:"available"},
                {number:6,status:"available"},
                {number:7,status:"available"},
                {number:8,status:"available"},
                {number:9,status:"available"},
                {number:10,status:"available"},
                {number:11,status:"available"},
                {number:12,status:"available"},
                {number:13,status:"available"},
                {number:14,status:"available"},
                {number:15,status:"available"},
                {number:16,status:"available"},
                {number:17,status:"available"},
                {number:18,status:"available"},
                {number:19,status:"available"},
                {number:20,status:"available"},
                {number:21,status:"available"},
                {number:22,status:"available"},
                {number:23,status:"available"},
                {number:24,status:"available"},
                {number:25,status:"available"},
                {number:26,status:"available"},
                {number:27,status:"available"},
                {number:28,status:"available"},
                {number:29,status:"available"},
                {number:30,status:"available"},
                {number:31,status:"available"},
                {number:32,status:"available"},
                {number:33,status:"available"},
                {number:34,status:"available"},
                {number:35,status:"available"},
                {number:36,status:"available"},
                {number:37,status:"available"},
                {number:38,status:"available"},
                {number:39,status:"available"},
                {number:40,status:"available"},
                {number:41,status:"available"},
                {number:42,status:"available"},
                {number:43,status:"available"},
                {number:44,status:"available"},
                {number:45,status:"available"},
                {number:46,status:"available"},
                {number:47,status:"available"},
                {number:48,status:"available"},
                {number:49,status:"available"},
                {number:50,status:"available"},
                {number:51,status:"available"},
                {number:52,status:"available"},
                {number:53,status:"available"},
                {number:54,status:"available"},
                {number:55,status:"available"},
                {number:56,status:"available"},
                {number:57,status:"available"},
                {number:58,status:"available"},
                {number:59,status:"available"},
                {number:60,status:"available"},
                {number:61,status:"available"},
                {number:62,status:"available"},
                {number:63,status:"available"},
                {number:64,status:"available"},
            ]}
        ],
        id:1
    }

    editanotherDataById(anotherData)
    }

    const [isCancel,setCancel]=useState(false)
    function hiderestore(ticket){
        restore(ticket)
        setCancel(false)
    }

    const TicketList = () => {
        return ticket_temp.map((ticket, i) => {

            return (
                <div className="ticket-content" key={i}>
                    <div className="ticket-title">{ticket.title}<br/>{"Seats : "+ticket.seat}</div>
                    <button className="ticket-button" onClick={()=>setCancel(true)}>Cancel Booking</button>
                    {isCancel &&<div className="myticket-blur">
                        <div className="myticket-box">
                        <div className="popup-title">Cancel Booking</div>
                        <div className="myticket-text">Are you sure want you to Cancel Booking<br/>and get Refunded?</div>
                        <div className="logout-button">
                            <button className="logout-confirm" onClick={()=>hiderestore(ticket)}>Refund</button>
                            <button className="logout-cancel"onClick={()=>setCancel(false)}>Cancel</button>
                        </div>
                        </div>
                    </div>}
                </div>
            )
        })
    }


    return (
        <div>
            <div className="myticket">
                <div className="title">My Ticket</div>
                <div className="ticket-box">
                    <TicketList/>
                </div>
            </div>
        </div>
    );
}
 
export default Myticket;