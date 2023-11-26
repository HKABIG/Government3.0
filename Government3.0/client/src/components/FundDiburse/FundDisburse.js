import React from 'react'
import Navbar from '../Navbar/Navbar'
import './FundDisburse.css'
import { ethers } from "ethers";

const FundDisburse = ({ account, provider, contract }) => {
  const pay = async (event) => {
    event.preventDefault();
    console.log("Fund Disbrusal in Progress");
    const address = document.querySelector("#address").value;
    const message = document.querySelector("#message").value;
    const fund = document.querySelector("#amount").value;
    const amount = { value: ethers.utils.parseEther(fund) };
    console.log(address, message,amount);
    const transaction = await contract.transfer(address, message, amount); 
    await transaction.wait();
    console.log("Transaction is done");
  }
  return (
    <div>
      <div className='main'>

      <Navbar/>
      <h3>Fund Disburse</h3>
        <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
          <div className='form_div'>
          <form onSubmit={pay}>
            <div className='mb'>
              <label className='form-label'></label>
              <input 
                type='text'
                className='form-control'
                id='address'
                placeholder='Enter the address'
              />
              <label className='form-label'></label>
              <input 
                type='text'
                className='form-control'
                id='message'
                placeholder='Enter the message'
              />
              <label className='form-label'></label>
              <input 
                type='text'
                className='form-control'
                id='amount'
                placeholder='Enter the amount'
              />
            </div>
            <button 
              type='submit'
              className='btn3'
              ><strong>
                TRANSFER
                </strong>
              </button>
          </form>
          </div>
        </div>

    </div>

    </div>
  )
}

export default FundDisburse