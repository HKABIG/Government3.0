import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Government from "./components/Government/Government.js";
import Home from "./components/Home/Home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beneficiary from "./components/Beneficiary/Beneficiary.js";
import FundDisburse from "./components/FundDiburse/FundDisburse.js";
import History from "./components/History/History.js"
import config, { CONTRACT_ADDRESS } from './config.js'

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = config.CONTRACT_ADDRESS;

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  console.log(account);
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route paht="/" index element={<Home account={account} provider={provider} contract={contract}/>}/>
        <Route path="/government" element={<Government account={account} provider={provider} contract={contract}/>}/>
        <Route path="/beneficiary" element={<Beneficiary account={account} provider={provider} contract={contract}/>}/>
        <Route path="/fundDisburse" element={<FundDisburse account={account} provider={provider} contract={contract}/>}/>
        <Route path="/history" element={<History account={account} provider={provider} contract={contract}/>}/>
        <Route path="*" element={<notfound/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
