import { useEffect } from "react";
import "./Modal.css";
const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".form-control-2").value;
    await contract.givePermissions(address);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.getModifiersList();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="body">
            <input
              type="text"
              className="form-control-2"
              id='address'
              placeholder="Enter Address"
            />
          </div>
          <form id="myForm" >
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;