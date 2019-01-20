import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar.js';
import Squad from '../Squad/Squad.js';
import positions from "../App/positions.js";
import formation from "../App/formation.js";

import './App.css';

class App extends Component {

    amountOfPositions = 11;
    highPenalty = 0.1;
    mediumPenalty = 0.5;
    lowPenalty = 0.8;
    noPenalty = 1;
    state = {
        selectedPositions: this.initPositions(),
        rating: 0,
    };

    update = (data) => {
        this.setState({
            selectedPositions: data
        });
    };

    calculateRating = () => {
        let totalRating = 0;
        for (let key in this.state.selectedPositions) {
            if (this.state.selectedPositions.hasOwnProperty(key) && this.state.selectedPositions[key] !== undefined) {
                let rating = this.state.selectedPositions[key].rating;
                let currentPosition = formation[key].position;
                let playerPosition = this.state.selectedPositions[key].position;
                if (rating !== undefined) {
                    totalRating += (rating * this.getPositionPenalty(currentPosition, playerPosition));
                }
            }
        }
        return Math.floor(totalRating / this.amountOfPositions);
    };

    getPositionPenalty = (currentPosition, playerPosition) => {
        let curPos = currentPosition;
        let playerPos = playerPosition;

        function isHighPenalty() {
            return Object.values(positions[curPos].penalties.high).indexOf(playerPos) > -1;
        }

        function isMediumPenalty() {
            return Object.values(positions[curPos].penalties.medium).indexOf(playerPos) > -1;
        }

        function isLowPenalty() {
            return Object.values(positions[curPos].penalties.low).indexOf(playerPos) > -1;
        }

        if (positions.hasOwnProperty(currentPosition)) {
            if (isHighPenalty()) {
                return this.highPenalty;
            } else if (isMediumPenalty()) {
                return this.mediumPenalty;
            } else if (isLowPenalty()) {
                return this.lowPenalty;
            }
        }
        return this.noPenalty;
    };

    initPositions() {
        return new Array(this.amountOfPositions).fill(0);
    };

    clearAllPositions = () => {
        this.setState({selectedPositions: this.initPositions()});
    };

    render() {
        return (
            <div className="app">
                <Squad selectedPositions={this.state.selectedPositions}
                       update={this.update} />
                <Sidebar rating={this.calculateRating()}
                         clear={() => this.clearAllPositions}/>
            </div>
        );
    }
}

export default App;