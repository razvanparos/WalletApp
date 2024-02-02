import { useState,useEffect } from 'react';
import './delete-modal.css';
import { IoMdClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";

function DeleteModal(props) {
    const [isOpen, setIsOpen] = useState(props.openDeleteModal)
    useEffect(() => {
        setIsOpen(props.openDeleteModal);
      }, [props.openDeleteModal]);
    
function closeDeleteModal(){
        props.closeDeleteModalFunction()
        const buttonsDiv = document.querySelector('.delete-buttons-div');
        const buttons = buttonsDiv.querySelectorAll('button');
        buttons.forEach(button => {
        button.style.transition = 'none'; 
        });
    }
function handleYesButton(){
    props.handleYes();
    closeDeleteModal();

    
}

  return (
    <div className={`delete-modal-div ${ isOpen ? '' : 'hidden'}`}>
       <div className={`delete-dialog ${ isOpen ? 'delete-dialog-down' : 'delete-dialog-up'}`}>
            <p className='delete-title'>Are you sure you want to delete Account <span className='delete-name'>{props.deleteName}?</span></p>
            <div className='delete-buttons-div'>
                <button onClick={closeDeleteModal}><IoMdClose className='inverted'/>No</button>
                <button onClick={handleYesButton}><IoIosCheckmark className='inverted check-logo'/>Yes</button>
            </div>
        </div>
    </div>
  );
}

export default DeleteModal;
