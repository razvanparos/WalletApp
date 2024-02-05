import { useEffect, useState } from 'react';
import './record-component.css';
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";

function RecordComponent(props) {
  const [recordType,setRecordType]=useState(props.type)

  function handleRemoveRecord(){
    props.removeRecord(props.value,props.id);
  }

  return (
    <div className='record-component-div'>
      <div className='record-component-content'>
        <FaMoneyBillTrendUp className={`record-img ${recordType==='Income'?'':'hidden'}`}/>
        <FaMoneyBillTransfer className={`record-img2 ${recordType==='Expense'?'':'hidden'}`}/>
        <div className='record-title-div'>
          <p className='record-title'>{props.title}</p> 
          <p className={`record-date ${props.minutes<10 ? 'hidden' :''}`}>{`${props.day}, ${props.hours}:${props.minutes}`}</p> 
          <p className={`record-date ${props.minutes<10 ? '' :'hidden'}`}>{`${props.day}, ${props.hours}:0${props.minutes}`}</p> 
        </div>
        
      </div>
      <div className='right-record'>
        <p className={`record-val ${recordType==='Income'?'green':'hidden'}`}>{`+${props.recordSymbol}${props.value} `}</p> 
        <p className={`record-val ${recordType==='Income'?'hidden':'red'}`}>{`-${props.recordSymbol}${-props.value} `}</p> 
        <button className='record-remove-btn' onClick={handleRemoveRecord}>Remove</button>
      </div>
      
       
    </div>
  );
}

export default RecordComponent;
