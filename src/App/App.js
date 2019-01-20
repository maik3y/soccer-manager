import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar.js';
import Squad from '../Squad/Squad.js';

import './App.css';


class App extends Component {

    amountOfPositions = 11;
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
                if (rating !== undefined) {
                    totalRating += rating;
                }
            }
        }
        return Math.floor(totalRating / this.amountOfPositions);
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
