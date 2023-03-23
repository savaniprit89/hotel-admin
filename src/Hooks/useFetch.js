import axios from "axios"

import { useEffect, useState } from "react"

const useFetch=(url)=>{
    const [data,setData]=useState([])
    const [loading,setloading]=useState(false)//hen request start request loading strue and if get data then set into data and if error then error true and then loading false

    const [error,seterror]=useState(false)


    useEffect(()=>{
const fetchData=async()=>{
    setloading(true)
    try {
        const user = localStorage.getItem('user');
        const json = JSON.parse(user);
        console.log("Sdssd")
        const token=json["token"];
        const headers = { Authorization: `Bearer ${token}`};
        const res=await axios.get(url,{headers:headers});//get data from url given
        setData(res.data)//set data recieved from url
    } catch (error) {
        seterror(error)
    }
    setloading(false)
};
fetchData()//calling above funcion
    },[url])//when url changes this function will be fire


const reFetch=async()=>{
        setloading(true)
        try {
            const user = localStorage.getItem('user');
        const json = JSON.parse(user);
        console.log("Sdssd")
        const token=json["token"];
        const headers = { Authorization: `Bearer ${token}`};
            const res=await axios.get(url,{headers:headers});//get data from url given
            setData(res.data)//set data recieved from url
        } catch (error) {
            seterror(error)
        }
        setloading(false)
}
return {data,loading,error,reFetch}//exporting these functions and datas 
   
}

export default useFetch;