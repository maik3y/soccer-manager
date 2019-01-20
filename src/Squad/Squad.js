import React, { Component } from 'react';
import Modal from "../Modal/Modal.js";

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

class Squad extends Component {

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

export default Squad;