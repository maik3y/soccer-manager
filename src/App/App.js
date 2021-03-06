import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar.js';
import Squad from '../Squad/Squad.js';
import positions from "../App/positions.js";
import formation from "../App/formation.js";
import settings from "../App/settings.js";
import './App.css';

class App extends Component {

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
        return Math.floor(totalRating / settings.amountOfPositions);
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
                return settings.highPenalty;
            } else if (isMediumPenalty()) {
                return settings.mediumPenalty;
            } else if (isLowPenalty()) {
                return settings.lowPenalty;
            }
        }
        return settings.noPenalty;
    };

    initPositions() {
        return new Array(settings.amountOfPositions).fill(0);
    };

    clearAllPositions = () => {
        this.setState({selectedPositions: this.initPositions()});
    };

    render() {
        return (
            <div className="app">
                <Squad selectedPositions={this.state.selectedPositions}
                       update={this.update}
                       getPositionPenalty={(currentPos, playerPos) => this.getPositionPenalty(currentPos, playerPos)} />
                <Sidebar rating={this.calculateRating()}
                         clear={() => this.clearAllPositions}/>
            </div>
        );
    }
}

export default App;