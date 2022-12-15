import { useState } from "react"
import { useEffect } from "react"
import { Link } from 'react-router-dom';
import { From } from "./From";

export const HomePage = ()=>{
    const [loading , setloading] = useState(true)
    const [data , setdata] = useState([])
    const [temp , settemp] = useState([])
    const [count , setcount] = useState(0)
    const[hide , sethide] = useState(false)

  function handleFrom(){
    sethide(!hide)
  }


    useEffect(()=>{
        async function getData(){
            let res = await fetch('https://mock11-backend.onrender.com/products');
            let data = await res.json()
            console.log(data)
            setdata(data)
            settemp(data)
            setloading(false)
        }
        getData()
    },[])

    function handleRemoveItem(_id){
        console.log(_id)
        fetch('https://mock11-backend.onrender.com/removeItem' , {
            method:'DELETE',
            body:JSON.stringify({_id}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            alert('sucefully remove...')
            console.log(res)
            window.location.reload();
        }).catch((err)=>{
            console.log(err)
        })

    }

    function handleBookmarkItem(e){
        const {title , Quantity , Priority , Description} = e
        fetch('https://mock11-backend.onrender.com/addbookmark' , {
            method:'POST',
            body:JSON.stringify({title , Quantity , Priority , Description}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            alert('sucefully added in bookmark...')
        }).catch((err)=>{
            console.log(err)
        })
    }

    if(loading){
        return <div>Loading......</div>
    }


    function handlesort(){
        settemp(data)
        temp.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
        console.log(temp)
        setcount(count+1)
        setdata(temp)
    }
    function handlefilter(value){
        settemp(data)
        let filteredData = temp.filter((e)=> e.Priority == value)
        setdata(filteredData)
    }
    return <>
    <div className="nav">
        <button className="btn" onClick={handlesort}>sort by latest one</button>
        <div>
            <label>Filter by Priority</label>
            <select onChange={(e)=>handlefilter(e.target.value)}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>
        </div>
        <Link to='/bookmark'>show All bookmarks</Link>
        <button className="btn" onClick={handleFrom}>Add Item</button>
    </div>
    <h1>Welcome to your shopping List</h1>
    <div className="container">
        {data.map((e)=>{
            return <div key={e._id} className='card'>
                <div>
                <h2> Title : {e.title}</h2>
                <p> Quantity : {e.Quantity}</p>
                <p>Priority : {e.Priority}</p>
                <p>Description : {e.Description}</p>
                <p>Time :  {new Date(e.createdAt).toTimeString().slice(0,5)}{new Date(e.createdAt).toTimeString().slice(0,5).split(':')[0] > 12 ? 'PM': 'AM'}</p>
                </div>
                <div>
                    <button onClick={()=> handleBookmarkItem(e)}>Bookmark</button>
                    <button onClick={()=>handleRemoveItem(e._id)}>Delete</button>
                </div>
            </div>

        })}
    </div>
    {hide ? <From /> : ''}
    </>
}