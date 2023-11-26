import React, { useEffect, useState } from 'react';
import './Government.css'
import Navbar from '../Navbar/Navbar';
import CryptoJS from 'crypto-js';
import key from '../Encryption/Encryption';
import NotFound from '../Home/NotFound'
import Modal from '../Modal/Modal';

const Government = ({ contract, account, provider }) => {
  const [clientAddresses, setClientAddresses] = useState([]);
  const [clients, setClients] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadClientList = async () => {
      try {
        // Fetch the list of all client addresses from the smart contract
        const addresses = await contract.getAllClient();
        
        // Update the state with the fetched addresses
        console.log(addresses);
        setClientAddresses(addresses);

        // testing for authorization visibility
        const authorizedAccounts = await contract.getModifiersList();
                // Check if the connected account is authorized
        if (authorizedAccounts.includes(account)) {
          // If not authorized, return early and display the NotFound component
          setIsAuthorized(true);
        }

        // Fetch client details for each address and update the state
        const clientDetails = await Promise.all(
          addresses.map(async (address) => {
            const details = await contract.retrieve_details (address);
            const additionalData = await contract.display(address);
            const isApproved = await contract.isUserApproved(address);
            const decryptedBytes = CryptoJS.AES.decrypt(additionalData[0], key.toString());
            const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
            return {
              address,
              name: details[0],
              dob: details[1],
              home_address: details[2],
              phone: details[3],
              additionalData: decryptedText,
              isApproved: isApproved
            };
          })
        );

        setClients(clientDetails);
        console.log(clientDetails);
        console.log(clientDetails[0].phone);
      } catch (error) {
        console.log('Error fetching client list:', error);
      }
    };

    loadClientList();
  }, [contract]);

  const approve = async (user) => {
    try {
      // Call the approve function in the smart contract
      // console.log('Fuck You');
      await contract.approve(user);
    } catch (error) {
      alert("You are not Authorized Official");
      console.error('Error approving user:', error);
    }
  };

  // const clients = [
  //   {
  //     address: 1,
  //     name: 'Ajay',
  //     dob: '17-07-2003',
  //     home_address: 'RangeHills',
  //     additionalData: 'https://turquoise-current-tarantula-171.mypinata.cloud/ipfs/QmeQxZ6p1RQNy3YATWQeuSGS3Hg64GGAzyAprSjf2r1WXv?_gl=1*1k7hz5z*_ga*MTM1NDA1NjE3OS4xNjkyNzg5ODM3*_ga_5RMPXG14TE*MTY5NjE1NzgxNy4xMi4xLjE2OTYxNTc4MzAuNDcuMC4w',
  //     isApproved: false
  //   },
  //   {
  //     address: 2,
  //     name: 'Kirti',
  //     dob: '22-10-2003',
  //     home_address: 'Bombay',
  //     additionalData: 'https://turquoise-current-tarantula-171.mypinata.cloud/ipfs/QmPhYpFk1bd1SuUutSA8Zr9XwphKtYeV7uz1e2T9qtrCux?_gl=1*1fqe6oi*_ga*MTM1NDA1NjE3OS4xNjkyNzg5ODM3*_ga_5RMPXG14TE*MTY5NjE1NzgxNy4xMi4xLjE2OTYxNTc4MzAuNDcuMC4w',
  //     isApproved: false
  //   }
  // ]

    if(!isAuthorized){
    return <NotFound/>
    }  

    return (
    <div className='main'>
        
        <Navbar/>
        
        <h3>Government</h3>
        <p6>
        Account : {account ? account : 'Not connected'}
        </p6>
        

      {/* Render client data here */}
        
        
        <div className='container-4'>
        
        <div className="client-list">
        
        <div className='card-container'>
        <div className='container grid grid-three-column'>

            
        {
            clients.map((curElem)=>{
                const {address,name,dob,security_num,home_address,phone,additionalData,isApproved} = curElem;
                return(
                
        <div className='container-md-3' style={{ marginTop: '20px' }}>
                <div key={address} className='card-2'>
                    <div className='card-data'>
                        
                    
                    <p>Client Account Address : <strong>{address}</strong></p>
                    <p>Client Name : <strong>{name}</strong></p>
                    <p>Client D.O.B : <strong>{dob}</strong></p>
                    <p>Client Home Address : <strong>{home_address}</strong></p>
                    <p>Uploaded Image : </p>
                    
                    <div>
                    <img src={additionalData}></img>
                    
                    </div>
                    <a href={additionalData} target='_blank'>Link to Documents</a>
                    {isApproved ? (
                        <p>Status: <strong>Approved</strong></p>
                    ) : (
                        <button
                        className="btn"
                        onClick={() => approve(address)}
                        >
                        Approve
                        </button>
                        
                    )}
                    
                    </div>
                    <div className='new_div'>
        {!modalOpen && (
        
        
        <button className="Btn-share"  onClick={() => setModalOpen(true)}>
        <strong>
        SHARE
        </strong>
        
        </button>
        
        )}
        {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )}
        </div>

                </div>
                </div>

                
                
                )
            })
            }
        </div>
        
        </div>
        
        </div>
        </div>
        
        </div>
        
    );
};

export default Government;
