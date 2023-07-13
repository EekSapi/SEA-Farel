import axios from 'axios'

function year(date){
    let temp=[]
    for (let i=0;i<4;i++){
        temp+=date[i]
    }
    return temp
}

function rated(year){
    if (year<10){
        return "G"
    }

    else if (year>=10 && year<13){
        return "PG"
    }

    else if (year>=13){
        return "PG-13"
    }
}

function dotting(x){
    x=String(x)
    let temp=[]
    if(x>=100000&& x<1000000){
        for (let i=0;i<x.length;i++){
            temp+=x[i]
            if (i===2){
                temp+="."
            }
        }
    }
    else if(x>=10000 && x<100000){
        for (let i=0;i<x.length;i++){
            temp+=x[i]
            if (i===1){
                temp+="."
            }
        }
    }
    else if(x>=1000 && x<10000){
        for (let i=0;i<x.length;i++){
            temp+=x[i]
            if (i===0){
                temp+="."
            }
        }
    }
    else if(x>=1000000){
        for (let i=0;i<x.length;i++){
            temp+=x[i]
            if (i===0 || i===3){
                temp+="."
            }
        }
    }
    else{
        temp+="0"
    }
    return temp
}

function dating(x){
    x=String(x)
    let year=[]
    let month=x[5]+x[6]
    let day=x[8]+x[9]

    for (let i=0;i<x.length;i++){
        if(i<4){
            year+=x[i]
        }
    }

    if (month==="01"){
        month="January"
    }
    else if (month==="02"){
        month="February"
    }
    else if (month==="03"){
        month="March"
    }
    else if (month==="04"){
        month="April"
    }
    else if (month==="05"){
        month="May"
    }
    else if (month==="06"){
        month="June"
    }
    else if (month==="07"){
        month="July"
    }
    else if (month==="08"){
        month="August"
    }
    else if (month==="09"){
        month="September"
    }
    else if (month==="10"){
        month="October"
    }
    else if (month==="11"){
        month="November"
    }
    else if (month==="12"){
        month="December"
    }

    return(day+" "+month+" "+year)
}

function addData(newData) {
    axios.post('https://eeksapi-api.vercel.app/api/data', newData)
        .then(response => {
            console.log(response.data.message); // Response message from the API
        })
        .catch(error => {
            console.error(error);
        });
}

function deleteDataById(id) {
    axios.delete(`https://eeksapi-api.vercel.app/api/data/${id}`)
      .then(response => {
        console.log(response.data.message); // Response message from the API
      })
      .catch(error => {
        console.error(error);
      });
}

function editDataById(id, updatedData) {
    axios.put(`https://api-eeksapi-eeksapi.vercel.app/api/data/${id}`, updatedData)
        .then(response => {
        console.log(response.data.message); // Response message from the API
        })
        .catch(error => {
        console.error(error);
        });
}

function getTime(){
    var currentdate = new Date(); 
    var datetime = "on " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " at "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    return datetime
}

export {year,rated,dotting,dating,addData,deleteDataById,editDataById,getTime}