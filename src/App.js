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
      selectedPositions: [9, 3],
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
                              selectedPositions={this.state.selectedPositions} />
                </div>
            </div>
        );
    }
}

class Position extends React.Component {

    positionClassName(key) {
        let className = 'field__player';
        if (this.positionIsSelected(key)) {
            return className + " field__player--selected"
        }
        return className;
    }

    positionIsSelected(key) {
        return this.props.selectedPositions !== undefined
            && this.props.selectedPositions.indexOf(key) >= 0;
    }

    render() {
        return (
            <div className={this.positionClassName(this.props.data.key)}>
                {this.props.data.name}
            </div>
        );
    }
};

class PlayerPicker extends React.Component {

    state = {
        player: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.player);
    };

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <input type="text"
                       value={this.state.player}
                       onChange={(event) => this.setState({ player: event.target.value })}
                       placeholder="Add player" required />
                <button type="submit">Add player</button>
            </form>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="left">
                    <Team />
                </div>
                <div className="right">
                    <PlayerPicker />
                </div>
            </div>
        );
    }
}

export default App;
