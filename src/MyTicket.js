import { useState,useEffect } from "react"

const Myticket = ({username_now,index}) => {
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
            setTimeout(fetchData, 10000);
          });
      };
      
      useEffect(() => {
        fetchData();
      
        return () => {
          clearTimeout(fetchData);
        };
      }, []);

      const TicketList = () => {
        return ticket_temp.map((ticket, i) => {

            return (
                <div className="ticket-content" key={i}>
                    <div className="ticket-title">{ticket.title}<br/>{"Seats : "+ticket.seat}</div>
                    <button className="ticket-button">Cancel Booking</button>
                </div>
            )
        })
    }


    return (
        <div className="myticket">
            <div className="title">My Ticket</div>
            <div className="ticket-box">
                <TicketList/>
            </div>
        </div>
    );
}
 
export default Myticket;