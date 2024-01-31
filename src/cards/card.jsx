import { useState } from 'react';
import './card.css';

function Card(props) {
  let cardSymbol;
  if(props.currency==='RON'){
    cardSymbol='RON'
  }
  if(props.currency==='EURO'){
    cardSymbol='€'
  }
  if(props.currency==='USD'){
    cardSymbol='$'
  }
  if(props.currency==='YEN'){
    cardSymbol='¥'
  }
 
  let formattedBalance = props.balance
    ? props.balance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "";
    function cardClick(){
      props.propchangeAccount(props.name,formattedBalance,props.cardKey)
    }

  return (
    <div className="card-div" onClick={cardClick}>
      <p className='card-name'>{props.name} {props.cardKey}</p>
      <div className='card-balance'>
        {`${cardSymbol}`}
        <p className='balance-p'>{formattedBalance}</p>
      </div>
      
    </div>
  );
}

export default Card;
