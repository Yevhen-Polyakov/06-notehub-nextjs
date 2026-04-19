"use client"
import React, { useEffect } from 'react'
import css from './Modal.module.css'
import { createPortal } from 'react-dom'

interface ModalProps{
    onClose: () => void,
    children: React.ReactNode
}

const Modal = ({onClose, children}:ModalProps) => {
    
    useEffect(()=> {
        function handleKeydown(e: KeyboardEvent) {
            if(e.key === "Escape")
                onClose()
        }

        document.addEventListener('keydown', handleKeydown)
        document.body.style.overflow = "hidden"

        return() => {
            document.removeEventListener("keydown", handleKeydown)
            document.body.style.overflow = ""
        }
        
    }, [onClose])

    if (typeof document === 'undefined') {
        return null
    }

    return createPortal(
       <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={onClose}>

            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>, 
        document.body
    )
}

export default Modal