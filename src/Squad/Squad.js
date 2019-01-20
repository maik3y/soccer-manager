import React, { Component } from 'react';
import Modal from "../Modal/Modal.js";
import formation from "../App/formation.js";
import settings from "../App/settings.js";

class Squad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            selectedPosition: null
        };
    }

    selectPosition = (key) => {
        this.setState({
            isShowing: true,
            selectedPosition: key,
        });
    };

    closeModalHandler = () => {
        this.setState({
            isShowing: false,
            selectedPosition: null,
        });
    };

    getPosition = (key) => {
        return <Position id={key}
                         positionData={formation[key]}
                         selectPosition={() => this.selectPosition(key)}
                         playerData={this.props.selectedPositions[key]}
                         getPositionPenalty={(currentPos, playerPos) => this.props.getPositionPenalty(currentPos, playerPos)} />;
    };

    addPlayer = (playerData) => {
        this.props.selectedPositions[this.state.selectedPosition] = playerData;
        this.props.update(this.props.selectedPositions);
        this.closeModalHandler();
    };

    render() {
        return (
            <div className="field">
                <div className="field__line field__line--forward">
                    {this.getPosition(10)}
                    {this.getPosition(9)}
                    {this.getPosition(8)}
                </div>
                <div className="field__line field__line--midfield">
                    {this.getPosition(7)}
                    {this.getPosition(6)}
                    {this.getPosition(5)}
                </div>
                <div className="field__line field__line--defense">
                    {this.getPosition(4)}
                    {this.getPosition(3)}
                    {this.getPosition(2)}
                    {this.getPosition(1)}
                </div>
                <div className="field__line  field__line--goal">
                    {this.getPosition(0)}
                </div>
                <Modal show={this.state.isShowing}
                       close={this.closeModalHandler}
                       addPlayer={(result) => this.addPlayer(result)}>
                </Modal>
            </div>
        );
    }
}

class Position extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };
    }

    positionIsSelected = () => {
        return this.props.playerData !== undefined
            && this.props.playerData !== 0;
    };

    printPlayerCard = () => {
        return (
            <div className="player player--card"
                 onClick={() => this.props.selectPosition(this.props.id)} >
                <span className="player__position">({this.props.playerData.position})</span>
                <div className="player__media">
                    <img className="player__image" src={this.props.playerData.headshot.imgUrl} alt={this.props.playerData.name} />
                </div>
                <span className="player__rating">{this.props.playerData.rating}</span>
                <span className="player__name">{this.props.playerData.name}</span>
                <span className={this.getPlayerPositionClass()}>({this.props.positionData.position})</span>
            </div>
        )
    };

    printPlaceholderCard = () => {
        return (
            <div className="player player--placeholder player--card"
                 onClick={() => this.props.selectPosition(this.props.id)}>
                <span className="player__card-pos">{this.props.positionData.position}</span>
            </div>
        )
    };

    getPositionOrPlayerData = () => {
        if (this.positionIsSelected()) {
            return this.printPlayerCard();
        } else {
            return this.printPlaceholderCard();
        }
    };

    getPlayerPositionClass = () => {
        let playerPos = this.props.playerData.position;
        let currentPos = this.props.positionData.position;
        let penalty = this.props.getPositionPenalty(playerPos, currentPos);

        if (penalty === settings.highPenalty) {
            return "player__card-pos player__card-pos--red";
        } else if (penalty === settings.mediumPenalty) {
            return "player__card-pos player__card-pos--orange";
        } else {
            return "player__card-pos player__card-pos--green";
        }
    };

    render() {
        return (
            this.getPositionOrPlayerData()
        );
    }
}

export default Squad;