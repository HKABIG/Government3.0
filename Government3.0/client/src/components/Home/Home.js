import React from 'react'

import './Home.css'
import Navbar from '../Navbar/Navbar'
import { formToJSON } from 'axios'
const Home = ({account,contract,provider}) => {
    console.log(account)
  return (
    <>
    <div className='main'>
    <Navbar/>
      <div>
      <h1>Government Fund Disbursal</h1>
        <p>
          Account : {account ? account : "Not connected"}
        </p>
      </div>

      <div className="content-2">
      

      </div>
    </div>
    
    </>
  )
}

export default Home