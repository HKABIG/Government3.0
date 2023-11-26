// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
  
  struct Access{
     address user; 
     bool access; //true or false
  }
  struct Approve{
      address user;
      bool approve;
  }
  struct Memo {
       address user;
       string message;
       uint256 timestamp;
       address from;
  }
  struct Client{
      string name;
      string dob;
      address security_num;
      string home_address;
      uint256 phone;
      uint256 age;
      uint256 tenth_marks;
  }
  Client ch;
  Memo[] memos;
  address payable owner ;
  address[] public allClientAddresses;
  mapping(address=>Client) ClientList;
  mapping(address=>string[]) value;
  mapping(address=>mapping(address=>bool)) ownership;
  mapping(address=>Access[]) accessList;
  mapping(address=>mapping(address=>bool)) previousData;
  mapping(address=>bool) appList;
  mapping(address => Client) public clientData;
  mapping(address=>bool) modifiers;
  address[] public modifiersList;
  constructor(){
    owner = payable (msg.sender); // Update address every time
    modifiers[msg.sender] = true;
    modifiersList.push(msg.sender);
  }
  function givePermissions(address _user) public {
    require(msg.sender==owner,"You are not allowed");
    modifiers[_user] = true;
    modifiersList.push(_user);
  }
  function getModifiersList() public view returns (address[] memory){
    return modifiersList;
  }
  function store_details(string memory _name,string memory _dob,address _security_num,string memory _home_address,uint256 _phone,uint256 _age,uint256 _tenth_marks) public {
      require(_age >= 18, "Age must be 18 or higher");
      require(_tenth_marks >= 85, "10th-grade marks must be 85 or higher");
      ch.name = _name;
      ch.dob = _dob;
      ch.security_num = _security_num;
      ch.home_address = _home_address;
      ch.phone = _phone;
      ClientList[_security_num] = ch;
      allClientAddresses.push(_security_num);
  }

  function getClientCount() public view returns (uint256) {
    return allClientAddresses.length;
  }
  function getAllClient() public view returns (address[] memory){
    return allClientAddresses;
  }

  function retrieve_details (address _security_num) public view returns (string memory,string memory,string memory,uint256){
      Client memory ch = ClientList[_security_num];
      return (ch.name,ch.dob,ch.home_address,ch.phone);
  }
  function add(address _user,string memory url) external {
      value[_user].push(url);
  }
  function allow(address user) external {//def
      ownership[msg.sender][user]=true; 
      if(previousData[msg.sender][user]){
         for(uint i=0;i<accessList[msg.sender].length;i++){
             if(accessList[msg.sender][i].user==user){
                  accessList[msg.sender][i].access=true; 
             }
         }
      }else{
          accessList[msg.sender].push(Access(user,true));  
          previousData[msg.sender][user]=true;  
      }
  }

  function approve(address user) external {
      require(modifiers[msg.sender],"Not Authorized");
      appList[user]=true;
  }
  function isUserApproved(address user) public view returns (bool) {
    return appList[user];
  }

  function disallow(address user) public{
      ownership[msg.sender][user]=false;
      for(uint i=0;i<accessList[msg.sender].length;i++){
          if(accessList[msg.sender][i].user==user){ 
              accessList[msg.sender][i].access=false;  
          }
      }
  }

  function display(address _user) external view returns(string[] memory){
    //   require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
      return value[_user];
  }

  function shareAccess() public view returns(Access[] memory){
      return accessList[msg.sender];
  }
  function transfer(address _user,string memory message) public payable {
    require(msg.value>0,"Invalid amount");
    require(appList[_user],"User Not Approved");
    payable(_user).transfer(msg.value);
    memos.push(Memo(_user,message,block.timestamp,msg.sender));
  }
  function getMemos() public view returns (Memo[] memory){
    return memos;
  }
}