import React, { useEffect } from 'react'
import cross from '../../assets/error.png'
import './modal.css'

const Modal = ({ status, closeMethod, children }) => {

    useEffect(()=>{
        const handleEsc = (e) =>{
            if (e.key==='Escape') {
                closeMethod();               
            }

        }
        if (status) {
            document.addEventListener('keydown',handleEsc)
        }

        return ()=>{document.removeEventListener('keydown',handleEsc)}
    },[status])

    const handleOutsideClick = (e) =>{
        e.stopPropagation();
        return
    }

    return (
        status ? <div className='modal-holder' onClick={closeMethod}>
            <div className="modal-bg" onClick={(e) => handleOutsideClick(e)}>
                <img className='close-svg' onClick={closeMethod} src={cross} alt="" />
                {children}
            </div>
        </div> : null
    )
}

export default Modal