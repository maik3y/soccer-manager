import React from 'react';
import PlayerPicker from '../PlayerPicker/PlayerPicker.js';

const Modal = (props) => {
    return (
        <div className="modal"
             style={{ display: props.show ? 'block' : 'none' }} >
            <div className="modal__bg" />
            <div className="modal__dialog">
                <div className="modal__content">
                    <div className="modal__header">
                        <i onClick={props.close} className="modal__close-btn fa fa-times" />
                        <p className="modal__title">Pick a player</p>
                    </div>
                    <div className="modal__body">
                        <PlayerPicker addPlayer={(result) => props.addPlayer(result)} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Modal;