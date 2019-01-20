import React, { Component } from 'react';

let timeout;
class PlayerPicker extends Component {

    state = {
        result: [],
    };

    liveSearch = (event) => {
        let timeToWait = 300;
        let playerName = event.target.value;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (playerName !== undefined && playerName.length > 0) {
                this.fetchPlayerFromAPI(playerName);
            } else {
                this.clearResult();
            }
        }, timeToWait);
    };

    fetchPlayerFromAPI = (playerName) => {
        let url = 'http://localhost:8080/player/' + playerName;
        fetch(url, {"mode": "cors"})
            .then(response => response.json())
            .then(data => {
                this.setState({ result: this.filterResult(data) })
            });
    };

    filterResult = (data) => {
        let result = [];
        if (data.items.length > 0) {
            let maxAmount = 10;
            for (let i = 0; i < maxAmount; i++) {
                result.push(data.items[i]);
            }
        }
        return result;
    };

    clearResult = () => {
        this.setState({ result: [] });
    };

    resetSearch = () => {
        this.clearResult();
        let liveSearch = document.getElementById("liveSearch");
        liveSearch.value = "";
    };

    render() {
        return (
            <form className="form" onSubmit={(event) => event.preventDefault()}>
                <input
                    id="liveSearch"
                    type="text"
                    className="form__input form__input--text"
                    value={this.state.name}
                    onKeyUp={(event) => this.liveSearch(event)}
                    placeholder="Enter a player name here"
                />
                <ul className={this.state.result === undefined ? "suggestion suggestion--visible" : "suggestion"}>
                    <SearchSuggestion
                        data={this.state.result}
                        addPlayer={(id) => this.props.addPlayer(this.state.result[id])}
                        reset = {() => this.resetSearch()}
                    />
                </ul>
            </form>
        );
    }
}

const SearchSuggestion = (props) => {
    let player = props.data;
    let result = [];
    if (player !== undefined) {
        for (let key in player) {
            if (player.hasOwnProperty(key) && player[key] !== undefined) {
                let name = player[key].name;
                let rating = player[key].rating;
                let position = player[key].position;
                let headshot = player[key].headshot.imgUrl;
                result.push(
                    <PlayerSuggestion
                        key={key}
                        id={key}
                        name={name}
                        rating={rating}
                        headshot={headshot}
                        position={position}
                        addPlayer={() => props.addPlayer(key)}
                        reset={() => props.reset()}
                    />
                );
            }
        }
    }
    return result;
};

const PlayerSuggestion = (props) => {

    const handleClick = () => {
        props.addPlayer();
        props.reset();
    };

    return (
        <li className="player player--suggestion"
            onClick={() => handleClick()} >
            <div className="player__media player__media--small">
                <img className="player__image" src={props.headshot} alt="" />
            </div>
            <div className="player__name player__name--large">
                ({props.rating}) {props.name} | {props.position}
            </div>
        </li>
    )
};

export default PlayerPicker;