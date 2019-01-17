import React, { Component } from 'react';
import './App.css';

const positions = [
    {
        key: 0,
        position: "GK",
        name: "Goalkeeper",
    },
    {
        key: 1,
        position: "LB",
        name: "Left Back",
    },
    {
        key: 2,
        position: "CB",
        name: "Centre Back",
    },
    {
        key: 3,
        position: "CB",
        name: "Centre Back",
    },
    {
        key: 4,
        position: "RB",
        name: "Right Back",
    },
    {
        key: 5,
        position: "LM",
        name: "Left midfielder",
    },
    {
        key: 6,
        position: "CM",
        name: "Central midfielder",
    },
    {
        key: 7,
        position: "RM",
        name: "Right midfielder",
    },
    {
        key: 8,
        position: "LF",
        name: "Left forward",
    },
    {
        key: 9,
        position: "ST",
        name: "Striker",
    },
    {
        key: 10,
        position: "RF",
        name: "Right forward",
    }
];

class Team extends React.Component {

    state = {
      selectedPositions: [],
    };

    render() {
        return (
            <div className="field">
                <div className="field__line">
                    <Position data={positions[10]}
                              selectedPositions={this.state.selectedPositions} />
                    <Position data={positions[9]}
                              selectedPositions={this.state.selectedPositions} />
                    <Position data={positions[8]}
                              selectedPositions={this.state.selectedPositions} />
                </div>
                <div className="field__line">
                    <Position data={positions[7]}
                              selectedPositions={this.state.selectedPositions} />
                    <Position data={positions[6]}
                              selectedPositions={this.state.selectedPositions} />
                    <Position data={positions[5]}
                              selectedPositions={this.state.selectedPositions} />
                </div>
                <div className="field__line">
                    <Position data={positions[4]}
                              selectedPositions={this.state.selectedPositions} />
                    <Position data={positions[3]}
                              selectedPositions={this.state.selectedPositions} />
                    <Position data={positions[2]}
                              selectedPositions={this.state.selectedPositions} />
                    <Position data={positions[1]}
                              selectedPositions={this.state.selectedPositions} />
                </div>
                <div className="field__line">
                    <Position data={positions[0]}
                              selectedPositions={this.state.selectedPositions}
                    />
                </div>
            </div>
        );
    }
}

class Position extends React.Component {

    state = { show: false }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    positionClassName(key) {
        let className = 'player';
        if (this.positionIsSelected(key)) {
            return className + " player--selected"
        }
        return className;
    }

    positionIsSelected(key) {
        return this.props.selectedPositions !== undefined
            && this.props.selectedPositions.indexOf(key) >= 0;
    }

    handleClick() {
        this.showModal();
    }

    render() {
        return (
            <div className={this.positionClassName(this.props.data.key)}
                 onClick={() => this.handleClick()} >
                <i className="player__add fa fa-plus" />
                <span className="player__position">({this.props.data.position})</span>
                <span className="player__name">
                    {this.props.data.name}
                </span>
            </div>
        );
    }
}

class PlayerPicker extends React.Component {

    state = {
        playerName: '',
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let url = 'http://localhost:8080/player/' + this.state.playerName;
        fetch(url, {"mode":"cors"})
            .then(response => response.json())
            .then(data => this.showResult(data));
    };

    showResult = (data) => {
        console.log(data);
    };

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <input type="text"
                       value={this.state.playerName}
                       onChange={(event) => this.setState({ playerName: event.target.value })}
                       placeholder="Add player" required />
                <button type="submit">Add player</button>
            </form>
        );
    }
}


const Modal = ({ handleClose, show, children }) => {

    const showHideClassName = show ? 'modal modal--visible' : 'modal modal--hidden';

    return (
        <div className={showHideClassName}>
            <div className="modal__dialog">
                <div className="modal__content">
                    <div className="modal__header">
                        <i onClick={handleClose} className="modal__close-btn fa fa-times" />
                        <p className="modal__title">Pick a player</p>
                    </div>
                    <div className="modal__body">
                        <PlayerPicker />
                    </div>
                    <div className="modal__footer">
                        <p className="modal_close-link"
                           onClick={handleClose}>Sluiten
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal__bg" />
        </div>
    );
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <Team />
                <Modal />
            </div>
        );
    }
}


export default App;
