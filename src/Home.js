import { MouseEvent, useEffect, useState } from "react";
import {year,rated,dating, dotting,getTime} from "./function.js"
import back_symbol from "./back.svg"
import axios from "axios"
import plus_symbol from "./plus.svg"
import minus_symbol from "./minus.svg"



const Home = ({username_now,showLogin,age_now,index,userData,seat}) => {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        fetch("https://seleksi-sea-2023.vercel.app/api/movies")
        .then(res => res.json())
        .then(data => {
            setMovie(data)
        })
    },[]);

    const [balance,balanceupdate] = useState(null)
    const [history_temp,sethistory]=useState([])
    const [ticket_temp,setticket]=useState([])
    const fetchData = () => {
        fetch("https://eeksapi-api.vercel.app/api/data")
          .then(res => res.json())
          .then(data => {
            balanceupdate(data[index].balance)
            sethistory(data[index].history)
            setticket(data[index].ticket)
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          })
          .finally(() => {
            setTimeout(fetchData, 30000);
          });
      };
      
      useEffect(() => {
        fetchData();
      
        return () => {
          clearTimeout(fetchData);
        };
      }, []);

    const [hoverMovie, sethoverMovie] = useState(null);
    const showDesc = (movie) => {
        sethoverMovie(movie);
    };

    const hideDesc = () => {
        sethoverMovie(null);
    };

    const [ActiveMovie, setActiveMovie] = useState(null);
    const showPage = (movie) => {
        setActiveMovie(movie)
    };

    const hidePage = () => {
        setActiveMovie(null)
        showage(false)
        settimeselect(null)
        showsmall(false)
    };

    const [selectSeat,isselect]=useState(null)
    const showPageSeat = (movie) => {
        isselect(movie)
        setActiveMovie(null)
    };

    const hidePageSeat = (movie) => {
        isselect(null)
        setActiveMovie(movie)
        settimeselect(null)
        setSelectedSeats([])
    };

    const [checkup,ischeckup]=useState(null)
    const showcheckup = (movie) => {
        if(selectedSeats.length!=0){
            isselect(null)
            ischeckup(movie)
        }
        else{
        }
    };

    const hidecheckup = (movie) => {
        isselect(movie)
        ischeckup(null)
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

    const [isshowtopup,setTopup]=useState(false)
    function showtopup(){
        setTopup(true)
    }
    function hidetopup(){
        setTopup(false)
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

    const Timelist = (title) =>{
        let Time=[]
        for (let i=0;i<seat.length;i++){
            if(title.title===seat[i].title){
                for (let j=0;j<seat[i].seat_data.length;j++){
                    Time.push(seat[i].seat_data[j].time)
                }
            }
        }
        const [ActiveTime, setActiveTime] = useState(null);
        function timechoose(e,time){
            setActiveTime(time)
            showsmall(false)
            settimeselect(e.target.textContent)
        }
        return Time.map((time, i) => {
            const isTime = ActiveTime === time;
            return(
                <div onClick={(e)=>timechoose(e,time)} className={`time-box ${isTime ? 'time-click' : 'hidden'}`} key={i}>
                    <div className="time-option">{time}</div>
                </div>
            )
        })

    }

    const [timeselect,settimeselect] = useState(null)
    const [small,showsmall]=useState(false)
    const [age_require,showage]=useState(false)
    function seatshow(movie,username_now){
        if(username_now==null){
            showLogin(true)
        }
        else{
            if(Number(age_now)>=movie.age_rating){
                showage(false)
                if(timeselect==null){
                    showsmall(true)
                }
                else{
                    showPageSeat(movie)
                }
            }
            else{
                showage(true)
            }
        }
    }

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [max_seat,showmax]=useState(false)
    const [no_seat,shownoseat]=useState(false)
    const [seats,setseats] = useState([])
    const Seat = ({ seatData }) => {
        const { number, status } = seatData;
        const isSelected = selectedSeats.includes(number);
      
        const handleClick = () => {
          if (isSelected) {
            setSelectedSeats((prevSelectedSeats) =>
              prevSelectedSeats.filter((seat) => seat !== number)
            );
          } else {
            if (selectedSeats.length < 6 && status === "available") {
              setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, number]);
            }
          }
        };
      
        let seatClassName;
        if (isSelected) {
          seatClassName = "seat-wrapper clicked";
        } else if (status === "reserved") {
          seatClassName = "seat-wrapper reserved";
        } else {
          seatClassName = "seat-wrapper unclicked";
        }

        if(selectedSeats.length == 6){
            showmax(true)
            shownoseat(false)
        }
        else if(selectedSeats.length == 0){
            shownoseat(true)
        }
        else{
            showmax(false)
            shownoseat(false)
        }
      
        return (
          <div className={seatClassName} onClick={handleClick}>
            {number}
          </div>
        )
      }
      
      
      const SeatContainer = ({ seats, selectedSeats, setSelectedSeats,movie }) => {
        setseats(seat[0].seat_data[0].seat)
        return (
          <div className="seat-container">
            
            {seats.map((seat) => (
              <Seat
                key={seat.number}
                seatData={seat}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
              />
            ))}
          </div>
        )
      }

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

    const confirmpayment = (movie) =>{
        if (balance>=(selectedSeats.length*movie.ticket_price)){
            balanceupdate(balance-(selectedSeats.length*movie.ticket_price))
            history_temp.push("Payment Rp. "+(selectedSeats.length*movie.ticket_price)+" for ticket movie : ("+(movie.title)+") seats : ("+selectedSeats+") succesful "+getTime())
            ticket_temp.push(
                {
                    title:movie.title,
                    time: timeselect,
                    seat :selectedSeats,
                    price:selectedSeats.length*movie.ticket_price
                }
            )
            let updatedData={
                name :userData[index].name,
                age :userData[index].age,
                username :userData[index].username,
                password:userData[index].password,
                balance :balance-(selectedSeats.length*movie.ticket_price),
                history :history_temp,
                ticket :ticket_temp,
                id :userData[index].id
            }

            let seatData=seat[0].seat_data[0].seat

            const Data = seatData.map((seat) => {
                if (selectedSeats.includes(seat.number)) {
                  return { ...seat, status: "reserved" };
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

            console.log(updatedData)
            editDataById(updatedData)
            ischeckup(null)
            isselect(null)
            setActiveMovie(null)
            settimeselect(null)
            setSelectedSeats([])
        }
        else{
            showtopup()
        }
    }
    
    const Movielist = () => {
        return movie.map((movie, i) => {
            const isHover = hoverMovie === movie;
            const isActive = ActiveMovie === movie;
            const seatActive = selectSeat === movie;
            const seatClicked = checkup === movie;

            return (
            <div onMouseEnter={() => showDesc(movie)} onMouseLeave={hideDesc} className="Movie-wrapper" key={i}>

                    <div className={`Hover ${isHover ? 'show' : 'hidden'}`}>
                        <div onClick={() => showPage(movie)} className="synopsis">
                            <div className="age-rating">{rated(movie.age_rating)}</div>
                            <textarea disabled className="synopsis-text">{movie.description}</textarea>
                        </div>
                    </div>

                    <div className={`Movie ${isActive ? 'show' : 'hidden'}`}>
                        <div className="specific">
                            <div className="specific-box">
                                <div><img alt="" className="specific-icon" src={movie.poster_url} /></div>
                                <div className="specific-synopsis">
                                    Synopsis
                                    <textarea disabled className="specific-content">{movie.description}</textarea>
                                </div>
                                <div className="specific-title">Movie Title<span className="span-content">: {movie.title}</span></div>
                                <div className="specific-rated">Age Rating<span className="span-content">: {movie.age_rating}+ ({rated(movie.age_rating)})</span></div>
                                <div className="specific-date"> Release Date<span className="span-content">: {dating(movie.release_date)}</span></div>
                                <div className="time-title">Movie Schedule</div>
                                <div className="time-select">
                                    <Timelist title={movie.title}/>
                                </div>
                                <div className="price">Ticket Price<br/>Rp. {dotting(movie.ticket_price)}</div>
                                <div className="seat"><button className="seat-button"onClick={()=>seatshow(movie,username_now)}>Select Seat</button></div>
                                {small && <small className="small-seat">choose available movie time</small>}
                                {age_require && <small className="small-age">You didn't meet the age requirement</small>}
                                <div onClick={()=>hidePage()} className="specific-close"><img alt="" src={back_symbol}/></div>
                            </div>
                        </div>
                    </div>

                    <div className={`Movie ${seatActive ? 'show' : 'hidden'}`}>
                        <div className="specific-seat">
                            <div className="specific-box" >
                                <div className="movie-seat-box">
                                    <div className="screen">Screen</div>
                                    <div className="screen-title">Movie Title : {movie.title}</div>
                                    <div className="screen-time">Time : {timeselect}</div>
                                    <SeatContainer
                                        seats={seats}
                                        selectedSeats={selectedSeats}
                                        setSelectedSeats={setSelectedSeats}
                                        movie={movie}
                                    />
                                </div>
                                <label className="selected-seat">{"Selected Seat : "+selectedSeats}</label>
                                <button className="confirm-seat" onClick={()=>showcheckup(movie)}>Choose Seat</button>
                                <label className="price-seat">{"Total Price : Rp. "+(selectedSeats.length*movie.ticket_price)}</label>
                                {max_seat && <small className="small-max-seat">Only 6 seats can be chosen per transaction</small>}
                                {no_seat && <small className="small-max-seat">Select at leat 1 seat</small>}
                                <div onClick={()=>hidePageSeat(movie)} className="specific-close"><img alt="" src={back_symbol} className="button-close"/></div>
                            </div>
                        </div>
                    </div>

                    <div className={`Movie ${seatClicked ? 'show' : 'hidden'}`}>
                        <div className="specific-seat">
                            <div className="specific-checkup" >
                            <div className="popup-title">Checkup</div>
                                <div className="checkup-content">
                                    <div>Movie Title<span>: {movie.title}</span></div>
                                    <div>Age Rating<span>: {movie.age_rating}+ ({rated(movie.age_rating)})</span></div>
                                    <div>Movie Time<span>: {timeselect}</span></div>
                                    <div>Selected Seat<span>: {""+selectedSeats}</span></div>
                                </div>
                                <div className="checkup-price">Total Price<br/>Rp. {dotting(selectedSeats.length*movie.ticket_price)}</div>
                                <label className="balance-now">Balance : {balance}</label>
                                <div><button className="confirm"onClick={()=>confirmpayment(movie)}>Confirm Payment</button></div>
                                <div><button className="cancel" onClick={()=>hidecheckup(movie)}>Cancel</button></div>
                            </div>
                        </div>
                    </div>

                    <img alt="" className="icon" src={movie.poster_url} />
                    <div onClick={() => showPage(movie)} className="movie-title">{movie.title}</div>
                    <div onClick={() => showPage(movie)} className="year">({year(movie.release_date)})</div>
            </div>
            );
        });
    };

    return (
        <div className="homepage">
            <div className="airing">Now Showing</div>
            <div className="Movie-container">
                <Movielist />
                {isshowtopup && (<Topup />)}
            </div>
        </div>
    );
}
 
export default Home;