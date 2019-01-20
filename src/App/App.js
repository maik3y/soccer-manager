import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar.js';

import './App.css';

const positions = {
    forwards: [
        {
            pos: "ST",
            name: "Striker",
        },
        {
            pos: "CF",
            name: "Centre forward",
        },
        {
            pos: "LF",
            name: "Left forward",
        },
        {
            pos: "RF",
            name: "Right forward",
        }
    ],
    midfielders: [
        {
            pos: "LW",
            name: "Left wing",
        },
        {
            pos: "LM",
            name: "Left midfielder",
        },
        {
            pos: "CAM",
            name: "Centre attacking midfielder",
        },
        {
            pos: "CDM",
            name: "Centre defensive midfielder",
        },
        {
            pos: "CM",
            name: "Centre midfielder",
        },
        {
            pos: "RM",
            name: "Right midfielder",
        },
        {
            pos: "RW",
            name: "Right wing",
        }
    ],
    defenders: [
        {
            pos: "LWB",
            name: "Left wing back",
        },
        {
            pos: "LB",
            name: "Left back",
        },
        {
            pos: "CB",
            name: "Centre back",
        },
        {
            pos: "RB",
            name: "Right back",
        },
        {
            pos: "RWB",
            name: "Right wing back",
        }
    ],
    goalkeepers: [
        {
            pos: "GK",
            name: "Goalkeeper",
        }
    ]
};
const formation = [
    {
        key: 0,
        position: positions.goalkeepers[0].pos,
        name: positions.goalkeepers[0].name,
    },
    {
        key: 1,
        position: positions.defenders[1].pos,
        name: positions.defenders[1].name,
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

class Squad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            selectedPosition: null
        }
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
                         playerData={this.props.selectedPositions[key]} />;
    };

    addPlayer = (playerData) => {
        this.props.selectedPositions[this.state.selectedPosition] = playerData;
        this.props.update(this.props.selectedPositions);
        this.closeModalHandler();
    };

    render() {
        return (
            <div className="field">
                <div className="field__line">
                    {this.getPosition(10)}
                    {this.getPosition(9)}
                    {this.getPosition(8)}
                </div>
                <div className="field__line">
                    {this.getPosition(7)}
                    {this.getPosition(6)}
                    {this.getPosition(5)}
                </div>
                <div className="field__line">
                    {this.getPosition(4)}
                    {this.getPosition(3)}
                    {this.getPosition(2)}
                    {this.getPosition(1)}
                </div>
                <div className="field__line">
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
                <span className="player__card-pos">({this.props.positionData.position})</span>
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

    render() {
        return (
            this.getPositionOrPlayerData()
        );
    }
}

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

let timeout;
class PlayerPicker extends React.Component {

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

    render() {
        return (
            <form className="form">
                <input
                    type="text"
                    className="form__input form__input--text"
                    value={this.state.name}
                    onKeyUp={(event) => this.liveSearch(event)}
                    placeholder="Enter a player name here" required
                />
               <ul className={this.state.result === undefined ? "suggestion suggestion--visible" : "suggestion"}>
                    <SearchSuggestion
                        data={this.state.result}
                        addPlayer={(id) => this.props.addPlayer(this.state.result[id])}
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
                    />
                );
            }
        }
    }
    return result;
};

const PlayerSuggestion = (props) => {
    return (
        <li className="player player--suggestion"
            onClick={() => props.addPlayer()} >
            <div className="player__media player__media--small">
                <img className="player__image" src={props.headshot} alt="" />
            </div>
            <div className="player__name player__name--large">
                ({props.rating}) {props.name} | {props.position}
            </div>
        </li>
    )
};

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
