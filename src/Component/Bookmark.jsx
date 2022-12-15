import { useState } from "react"
import { useEffect } from "react"
import { Link } from 'react-router-dom';

export const Bookmark = ()=>{
    const [loading , setloading] = useState(true)
    const [data , setdata] = useState([])
    useEffect(()=>{
        fetch('https://mock11-backend.onrender.com/bookmarks').then((res)=>{
            return res.json()
        }).then((res)=>{
            setloading(false)
            setdata(res)
        }).catch((err)=>{
            console.log(err)
        })
    } , [])

    if(loading){
        return <div>....loading</div>
    }
    return <>

        <Link to='/' style={{color:'#000' , padding:'10px'}}>back to</Link>
        <h1>Bookmarks List</h1>
    <div>
        {data.map((e)=>{
            return <div key={e._id} className='card'>
            <div>
                <h2> Title : {e.title}</h2>
                <p> Quantity : {e.Quantity}</p>
                <p>Priority : {e.Priority}</p>
                <p>Description : {e.Description}</p>
                <p>Time :  {new Date(e.createdAt).toTimeString().slice(0,5)}{new Date(e.createdAt).toTimeString().slice(0,5).split(':')[0] > 12 ? 'PM': 'AM'}</p>
                </div>
            </div>
        })}
    </div>
    </>
}