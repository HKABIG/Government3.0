import React, { useState } from 'react';
import axios from "axios";
import "./Beneficiary.css"
import Navbar from '../Navbar/Navbar';
import config from '../../config';
import key from '../Encryption/Encryption';
import CryptoJS from 'crypto-js';


console.log(config.API_KEY,config.SECRET_KEY)
// console.log("key reading",key)

const Beneficiary = ({account,contract,provider}) => {
  const [file,setFile] = useState(null);
  const [fileName,setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Button Submitted');
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: config.API_KEY,
            pinata_secret_api_key: config.SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        const encryptImgHash = CryptoJS.AES.encrypt(ImgHash, key.toString()).toString(); // Encrypting the imgHash with key 
        console.log("Encrypted Image hash is :",encryptImgHash);
        contract.add(account,encryptImgHash);
        // console.log(contract);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };  
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    security_num: '',
    address: '',
    phone: '',
  });


  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const addData = async (event) => {
    event.preventDefault();
    const {
      name,
      dob,
      security_num,
      address,
      phone,
      age,
      tenth_marks,
    } = formData;
    const phoneValue = parseInt(phone);
    const ageValue = parseInt(age);
    const tenthValue = parseInt(tenth_marks);
    console.log(phone, security_num);
  
    try {
      // Call the store_details function in the smart contract with age and 10th-grade marks
      const transaction = await contract.store_details(
        name,
        dob,
        security_num,
        address,
        phoneValue,
        ageValue, // Add age
        tenthValue // Add 10th-grade marks
      );
      await transaction.wait();
  
      console.log('Transaction is done');
      alert('Client details stored successfully!');
    } catch (error) {
      // An error occurred, display the error message
      alert('Conditions not met!');
      console.error(error);
      // alert(error.message);
    }
  };  
  return (
    <div>
      <div className='main'>

      <Navbar/>
      <h3>Beneficiary</h3>
      <p2>
        Account : {account ? account : 'Not connected'}
      </p2>
      <p4>
      <div className='container-md' style={{ marginTop: '20px' }}>
      <form onSubmit={addData}>
        <div className='form-group'>
          <label htmlFor='name'></label>
          <input type='text' className='form-control' id='name' placeholder='Enter your name' onChange={handleChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='security_num'></label>
          <input type='text' className='form-control' id='security_num' placeholder={account} onChange={handleChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='address'></label>
          <input type='text' className='form-control' id='address' placeholder='Enter your Home Address' onChange={handleChange} />
        </div>

        <div className='form-row'>
          <div className='form-group half-width'>
            <label htmlFor='dob'></label>
            <input type='text' className='form-control' id='dob' placeholder='Enter your Date of Birth' onChange={handleChange} />
          </div>
          <div className='form-group half-width'>
            <label htmlFor='age'> </label>
            <input type='text' className='form-control' id='age' placeholder='Enter your Age' onChange={handleChange} />
          </div>
        </div>

        <div className='form-row'>
          <div className='form-group half-width'>
            <label htmlFor='phone'></label>
            <input type='text' className='form-control' id='phone' placeholder='Enter your Phone Number' onChange={handleChange} />
          </div>
          <div className='form-group half-width'>
            <label htmlFor='tenth_marks'></label>
            <input type='text' className='form-control' id='tenth_marks' placeholder='Enter your Tenth Marks' onChange={handleChange} />
          </div>
        </div>

        <button type='submit' className='btn btn-primary'>
          <strong>SUBMIT</strong>
        </button>
      </form>
    </div>
        </p4>
        <div className='container-md-2' >
        <div className="top">
          
  <form className="form-2" onSubmit={handleSubmit}>
    <label htmlFor="file-upload" className="choose">
      <strong>
      Choose Image
      </strong>
    </label>
    <input
      disabled={!account}
      type="file"
      id="file-upload"
      name="data"
      onChange={retrieveFile}
    />
    <span className="textArea">Image: {fileName}</span>
    <button type="submit" className="upload" disabled={!file}>
    <strong>
      Upload File
      </strong>
    </button>
  </form>
  
  </div>
</div>


    </div>
    
    </div>
  )
}

export default Beneficiary