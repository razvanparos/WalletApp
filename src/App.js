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
import RecordModal from './record-modal/record-modal';
import RecordComponent from './record-modal/record-component';

function App() {
  let currency = "RON"
  const [accountName, setAccountName] = useState('Select account')
  const [accountBalance, setAccountBalance] = useState()
  const [totalBalance, setTotalBalance] = useState()
  const [totalBalanceRON, setTotalBalanceRON] = useState()
  const [totalBalanceEURO, setTotalBalanceEURO] = useState()
  const [totalBalanceUSD, setTotalBalanceUSD] = useState()
  const [totalBalanceYEN, setTotalBalanceYEN] = useState()
  const [selectedCardId, setSelectedCardId] = useState(1)
  const [showDelete, setShowDelete] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [createModalStatus, setCreateModalStatus] = useState(false)
  const [recordModalStatus, setRecordModalStatus] = useState(false)
  const [recordSymbol, setRecordSymbol] = useState()
  const [recordData, setRecordData] = useState('');
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
  function closeRecordModalFunction(){
    setRecordModalStatus(false)
  }

  function changeAccount(acc,bal,id,s){
    setAccountName(acc)
    setAccountBalance(bal)
    setSelectedCardId(id)
    setRecordSymbol(s)
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
  function openRecordModal(){
    window.scrollTo({top: 0, behavior: 'smooth'}) // needs fix
    setRecordModalStatus(true);
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
      balance: parseInt(balance),
      currency: curren,
      records:[]
    };
    setCardsData(prevCardsData => [...prevCardsData, newCard]);
  }
  function deleteFunction() {
    setCardsData(prevCardsData => {
      const indexToRemove = prevCardsData.findIndex(card => card.id === selectedCardId);
      
      if (indexToRemove !== -1) {
        const updatedCards = [...prevCardsData];
        updatedCards.splice(indexToRemove, 1);
        updatedCards.forEach((item, index) => {
          item.id = index + 1;
        });
        return updatedCards;
      }
      
      return prevCardsData;
    });
  
    setAccountName('Select account');
    setAccountBalance();
    closeDeleteModalFunction();
  }

  function addRecord(title, value, type) {
    setCardsData(prevCardsData => {
      const updatedCardsData = [...prevCardsData];
      const selectedCard = updatedCardsData[selectedCardId - 1];
      const updatedCardBalance = updatedCardsData[selectedCardId - 1].balance+value;
      updatedCardsData[selectedCardId - 1].balance=updatedCardBalance;
      setAccountBalance(updatedCardBalance);
      if (selectedCard) {
        const newId = selectedCard.records.length ? selectedCard.records[selectedCard.records.length - 1].id + 1 : 1;
        let date = new Date();
        const options = { day: '2-digit', month: 'short' };
        const addedRecord = {
          id: newId,
          title: title,
          value: value,
          type: type,
          dateDay: date.toLocaleDateString('eu-Eu',options),
          dateHours: date.getHours(),
          dateMinutes: date.getMinutes()
        };
        selectedCard.records.push(addedRecord);
      }
      return updatedCardsData;
    });
    
  }

  useEffect(() => {
    if (accountName === 'Select account') {
      setShowDelete(false);
    } else {
      setShowDelete(true);
    }
  }, [accountName]);
  useEffect(() => {
    setRecordData(prevRecordData => {
      const newRecordData = cardsData[selectedCardId - 1]?.records || [];
      return newRecordData;
    });
  }, [selectedCardId, cardsData]);

  function removeRecord(val, id) {
    setCardsData(prevCardsData => {
      const updatedCardsData = [...prevCardsData];
      const selectedCard = updatedCardsData[selectedCardId - 1];
  
      if (selectedCard) {
       
        const updatedCardBalance = selectedCard.balance - val;
        selectedCard.balance = updatedCardBalance;
        setAccountBalance(updatedCardBalance);
  
        selectedCard.records = selectedCard.records.filter(record => record.id !== id);
        setRecordData([...selectedCard.records]); 
  
        return updatedCardsData;
      }
  
      return updatedCardsData;
    });
  }



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
      <RecordModal
        recordModalStatus={recordModalStatus}
        closeRecordModalFunction={closeRecordModalFunction}
        accountName={accountName}
        addRecord={addRecord}
        recordSymbol={recordSymbol}
  
      />
      <div className='accounts-div'>
        <h2>Accounts</h2>
        <div className='accounts-list'>
          <p className={`total-balance-text ${cardsData.length===0?'':'hidden'}`}>Please create new account</p>
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
          <p className={`${accountName==='Select account' ? 'hidden': ''}`}>{`${recordSymbol} ${accountBalance}`}</p>
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
          ) : (
            <div className='records-tab'>
              {cardsData[selectedCardId-1].records.length===0 ? 
              (
                <p className='no-records'>{`No records in ${cardsData[selectedCardId-1].title}`}</p>
              ) : (
                <div className='records-list'>
                  {[...recordData].reverse().map((record) => (
                    <RecordComponent 
                    key={record.id} 
                    id={record.id} 
                    title={record.title}
                    value={record.value} 
                    type={record.type} 
                    day={record.dateDay}
                    hours={record.dateHours}
                    minutes={record.dateMinutes}
                    recordSymbol={recordSymbol}
                    removeRecord={removeRecord}
                    />
                  ))}
                 
                </div>
                
              )}
              
            </div>)}
        </div>

        <div className='account-details-buttons'>
          <button className={`add-record-btn ${showDelete ? '' : 'hidden'}`} onClick={openRecordModal}>Add Record</button>
          <button className={`delete-btn ${showDelete ? '' : 'hidden'}`} onClick={openDeleteModalAction}> <FaTrash /><p className='delete-btn-text'>Delete Account</p></button>
        </div>
      </div>
    </div>
  );
}

export default App;
