import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({ account, contract, provider }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loadModifierList = async () => {
      try {
        const authorizedAccounts = await contract.getAllClient();
        if (authorizedAccounts.includes(account)) {
          // If authorized, set isAuthorized to true
          setIsAuthorized(true);
          console.log("isAuthorized");
        } else {
          // If not authorized, set isAuthorized to false
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Error loading modifier list:', error);
      }
    };

    loadModifierList();
  }, [account, contract]);

  return (
    <div>
      <nav>
        <ul className="navbar-list">
          <label className="logo">Funds Transfer</label>
          <li>
            <NavLink className="navbar-link" to="/">
              Home
            </NavLink>
          </li>
          {/* {isAuthorized && (
            <li>
              <NavLink className="navbar-link" to="/government">
                Government
              </NavLink>
            </li>
          )} */}
            <li>
              <NavLink className="navbar-link" to="/government">
                Government
              </NavLink>
            </li>
          <li>
            <NavLink className="navbar-link" to="/fundDisburse">
              FundDisburse
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/beneficiary">
              Beneficiary
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/history">
              History
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
