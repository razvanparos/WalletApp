import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import Card from './cards/card';
import Plus from './plus-sign/plus';
import CARDS_DATA from  './cards/card-details';
import { FaTrash } from "react-icons/fa6";
import DeleteModal from './delete-modal/delete-modal';
import CreateModal from './create-modal/create-modal';
import NetWorth from './net-worth/net-worth';





function App() {
  let currency = "RON"
  const [accountName, setAccountName] = useState('Select account')
  const [accountBalance, setAccountBalance] = useState()
  const [totalBalance, setTotalBalance] = useState()
  const [totalBalanceRON, setTotalBalanceRON] = useState()
  const [totalBalanceEURO, setTotalBalanceEURO] = useState()
  const [totalBalanceUSD, setTotalBalanceUSD] = useState()
  const [totalBalanceYEN, setTotalBalanceYEN] = useState()
  const [selectedCardId, setSelectedCardId] = useState()
  const [showDelete, setShowDelete] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [createModalStatus, setCreateModalStatus] = useState(false)
  const [cardsData, setCardsData] = useState(() => {
    const storedData = localStorage.getItem('cardsData');
    return storedData ? JSON.parse(storedData) : CARDS_DATA;
  });
  const [accountsNumber, setAccountsNumber] = useState(() => {
    return cardsData.length
  });

  useEffect(() => {
    localStorage.setItem('cardsData', JSON.stringify(cardsData));
    let sum=0;
    let sumRON=0;
    let sumEURO=0;
    let sumUSD=0;
    let sumYEN=0;
    {cardsData.map((card) => {
      sum+=parseFloat(card.balance)
      if(card.currency==='RON'){
        sumRON+=parseFloat(card.balance)
      }
      if(card.currency==='EURO'){
        sumEURO+=parseFloat(card.balance)
      }
      if(card.currency==='USD'){
        sumUSD+=parseFloat(card.balance)
      }
      if(card.currency==='YEN'){
        sumYEN+=parseFloat(card.balance)
      }
    })}
  
 
    setTotalBalance(sum);
    setTotalBalanceRON(sumRON);
    setTotalBalanceEURO(sumEURO);
    setTotalBalanceUSD(sumUSD);
    setTotalBalanceYEN(sumYEN);
    setAccountsNumber(cardsData.length);
  }, [cardsData]);
  
  function closeDeleteModalFunction(){
    setOpenDeleteModal(false)
  }
  function closeCreateModalFunction(){
    setCreateModalStatus(false)
  }

  function changeAccount(acc,bal,id){
    setAccountName(acc)
    setAccountBalance(bal)
    setSelectedCardId(id)
  }
  function openDeleteModalAction(){
    document.body.scrollTop = 0;  // needs fix
    document.documentElement.scrollTop = 0;
    setOpenDeleteModal(true);
  }
  function openCreateModal(){
    window.scrollTo({top: 0, behavior: 'smooth'}) // needs fix
    setCreateModalStatus(true);
  }
  function showTotalWorth(){
    setAccountName('Select account')
  }
  function createNewCard(name,balance,curren){
    let newId;
    if(cardsData.length){
       newId = cardsData[cardsData.length-1].id + 1;
    } else newId=1;
    
    const newCard = {
      id: newId,
      title: name,
      balance: balance,
      currency: curren
    };
    setCardsData(prevCardsData => [...prevCardsData, newCard]);
  }
  function deleteFunction() {
    setCardsData(prevCardsData => {
      const indexToRemove = prevCardsData.findIndex(card => card.id === selectedCardId);
      
      if (indexToRemove !== -1) {
        const updatedCards = [...prevCardsData];
        updatedCards.splice(indexToRemove, 1);
        return updatedCards;
      }
      
      return prevCardsData;
    });
  
    setAccountName('Select account');
    setAccountBalance();
    closeDeleteModalFunction();
  }
  useEffect(() => {
    if (accountName === 'Select account') {
      setShowDelete(false);
    } else {
      setShowDelete(true);
    }
  }, [accountName]);

  return (
    <div className="app-div">
      <DeleteModal 
        openDeleteModal={openDeleteModal}
        deleteName={accountName} 
        closeDeleteModalFunction={closeDeleteModalFunction}
        handleYes={deleteFunction}
      />
      <CreateModal
        createModalStatus={createModalStatus}
        closeCreateModalFunction={closeCreateModalFunction}
        createNewCard={createNewCard}
      />
      <div className='accounts-div'>
        <h2>Accounts</h2>
        {/* <h3 className='total-balance-text'>Total Balance: {`${totalBalance} ${currency}`}</h3> */}
        <div className='accounts-list'> 
          {cardsData.map((card) => (
              <Card key={card.id} 
              cardKey={card.id}
              name={card.title} 
              balance={card.balance} 
              currency={card.currency} 
              propchangeAccount={changeAccount}/>
            ))}
        </div> 
        <Plus
          openCreateModal={openCreateModal}
          accountsNumber={accountsNumber}
        />
      </div>

      <div className='accounts-details'>
        <div className='accounts-details-top'>
          <h2>Account Details</h2>
          <p>{accountName}</p>
          <p className={`${accountName==='Select account' ? 'hidden': ''}`}>{`${currency} ${accountBalance}`}</p>
        </div>
        
        <div className='transactions-tab'>
          <div className={`total-worth-div ${accountName==='Select account' ? 'hidden': ''}`}>
            <p className='total-worth-button' onClick={showTotalWorth}>Show Total Worth</p>
          </div>
          {accountName === 'Select account' ? 
          (<NetWorth 
            totalBalance={totalBalance} 
            totalBalanceRON={totalBalanceRON}
            totalBalanceEURO={totalBalanceEURO}
            totalBalanceUSD={totalBalanceUSD}
            totalBalanceYEN={totalBalanceYEN}/>
          ) : ('Transactions Tab')}
        </div>

        <div className='account-details-buttons'>
          <button className={`add-record-btn ${showDelete ? '' : 'hidden'}`}>Add Record</button>
          <button className={`delete-btn ${showDelete ? '' : 'hidden'}`} onClick={openDeleteModalAction}> <FaTrash /><p className='delete-btn-text'>Delete Account</p></button>
        </div>
      </div>
    </div>
  );
}

export default App;
