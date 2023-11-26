import React from 'react'

import videoBg from '../assets/bg_video.mp4'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import { formToJSON } from 'axios'
const Home = ({account,contract,provider}) => {
    console.log(account)
  return (
    <>
    <div className='main'>
      <div className='overlay'>
      <div>
      <h1>Government Fund Disbursal</h1>
        <p>
          Account : {account ? account : "Not connected"}
        </p>
      </div>

      <div className="content-2">
      <button className="Btn"><a href="/government" >
        <strong>
        Government
        </strong>
      </a>
      </button>
      <button className="Btn"><a href="/beneficiary">
        <strong>
        Beneficiary
        </strong>
      </a>
      </button>
      <button className="Btn"><a href="/FundDisburse" >
        <strong>
        Fund Disburse
        </strong>
      </a>
      </button>
      <button className="Btn"><a href="/History">
        <strong>
        History
        </strong>
      </a>
      </button>

      </div>
      </div>
      <video src={videoBg} autoPlay loop muted />
    </div>    
    
    </>
  )
}

export default Home