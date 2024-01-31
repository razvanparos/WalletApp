import { useState,useEffect } from 'react';
import './create-modal.css';

function CreateModal(props) {
    const [isOpen, setIsOpen] = useState(props.createModalStatus)
    const [newCardName, setNewCardName] = useState("")
    const [newCardBalance, setNewCardBalance] = useState("")
    const [newCardCurrency, setNewCardCurrency] = useState("RON")
    useEffect(() => {
        setIsOpen(props.createModalStatus);
      }, [props.createModalStatus]);

      function closeCreateModal(){
        setNewCardName("");
        setNewCardBalance("");
        props.closeCreateModalFunction()
        const buttonsDiv = document.querySelector('.create-buttons-div');
        const buttons = buttonsDiv.querySelectorAll('button');
        buttons.forEach(button => {
        button.style.transition = 'none'; 
        });
        
    }
    function createNewCard(){
        if(newCardName && newCardBalance && newCardCurrency){
            props.createNewCard(newCardName,newCardBalance,newCardCurrency)
            closeCreateModal();
        }else {
            alert('card details error')
            
        }
        
    }
    function handleChangeCardName(e){
        setNewCardName(e.target.value)
    }
    function handleChangeCardBalance(e){
        setNewCardBalance(e.target.value)
    }
    function handleChangeCurrency(e){
        setNewCardCurrency(e.target.value)
    }

  return (
    <div className={`create-modal-div ${ isOpen ? '' : 'hidden'}`}>

        <div className={`create-dialog ${ isOpen ? 'create-dialog-down' : 'create-dialog-up'}`}>
            <p className='create-title'>Create new Account</p>
            <div className='create-inputs-div'>
                <label htmlFor="">Account name</label>
                <input type="text" onChange={handleChangeCardName} value={newCardName}/>
                <label htmlFor="">Balance</label>
                <input type="number" onChange={handleChangeCardBalance} value={newCardBalance}/>
                <label htmlFor="currencies">Currency</label>
                <select name="currencies" id="" onChange={handleChangeCurrency}>
                    <option value="RON">RON</option>
                    <option value="EURO">EURO</option>
                    <option value="USD">USD</option>
                    <option value="YEN">YEN</option>
                </select>
            </div>
            <div className='create-buttons-div'>
                <button onClick={closeCreateModal}>Cancel</button>
                <button onClick={createNewCard}>Create</button>
            </div>
        </div>
    </div>
  );
}

export default CreateModal;
