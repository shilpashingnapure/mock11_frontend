import {Routes , Route} from 'react-router-dom'
import {Bookmark} from './Bookmark'
import { HomePage } from './Home'

export const Allroutes = ()=>{

    return <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/bookmark' element={<Bookmark/>}/>

    </Routes>
}