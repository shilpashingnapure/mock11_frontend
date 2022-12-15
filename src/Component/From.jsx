import { useState } from "react"

export const From = ()=>{
    const [title , setTitle] = useState('')
    const [qty , setqty] = useState(1)
    const [Priority , setPriority] = useState()
    const [des , setdes] = useState('')


    function handleData(e){

        e.preventDefault()
        let data = {
            title ,
            Quantity : +qty,
        Priority : +Priority ,
        Description : des
        }

        fetch('https://mock11-backend.onrender.com/add' , {
            method:'POST' ,
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            console.log(res)
            alert('suceffully added')
            window.location.reload();
        }).catch((err)=>{
            console.log(err)
        })
    }
    return <div className="form">

        <form onSubmit={handleData}>
            <h1>Add Item in Your Shopping List</h1>
            <label>Title</label>
            <input onChange={(e)=> setTitle(e.target.value)} type='text' />
            <label>Quantity</label>
            <input onChange={(e)=> setqty(e.target.value)} type='text'/>
            <label>Priority</label>
            <input onChange={(e)=> setPriority(e.target.value)} type='text'/>
            <label>Description</label>
            <textarea rows='5' onChange={(e)=> setdes(e.target.value)} />
            <input type='submit' value='add'  className="submit"/>

        </form>
    </div>
}