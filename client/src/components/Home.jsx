import React from 'react'
import './Restarauns.css'
import { Link, useParams } from 'react-router-dom'
import { Restarauns } from './Restarauns';
export const Home = () => {
   const data = useParams()
   console.log(data);
  return (

  <>   
   <div className='home_wrape'>
      
      <Link to={'/login'} className='logogut_btn'>Logout</Link>
      <Link to={`/create/${data.id}`} className='logogut_btn create__btn'>Create</Link>
      <Restarauns/>
    </div>
  </>

  )
}
