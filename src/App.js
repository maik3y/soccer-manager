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

class Squad extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            isShowing: false
        }
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    };

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    };

    positionIsSelected = (key) => {
        return this.props.selectedPositions !== undefined
            && this.props.selectedPositions.indexOf(key) >= 0;
    };

    getPosition = (key) => {
        return <Position data={positions[key]}
                         selected={this.positionIsSelected(key)}
                         openModalHandler={() => this.openModalHandler()} />;
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
                       close={this.closeModalHandler}>
                </Modal>
            </div>
        );
    }
}

class Position extends React.Component {

    positionClassName() {
        let className = 'player player--card';
        if (this.props.selected) {
            return className + " player--selected"
        }
        return className;
    }

    render() {
        return (
            <div className={this.positionClassName()}
                 onClick={() => this.props.openModalHandler()}>
                <i className="player__add fa fa-plus"/>
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
        result: [],
    };

    liveSearch = (event) => {
        event.preventDefault();
        let url = 'http://localhost:8080/player/' + event.target.value;
        fetch(url, {"mode": "cors"})
            .then(response => response.json())
            .then(data => {
                this.setState({result: this.filterResult(data)})
            });
    };

    filterResult = (data) => {
        console.log(data);
        return data;
    };

    render() {
        return (
            <form className="form" >
                <input type="text"
                       className="form__input form__input--text"
                       value={this.state.name}
                       onChange={(event) => this.liveSearch(event)}
                       placeholder="Add player" required/>
                <SearchSuggestion data={this.state.result}/>
            </form>
        );
    }
}

const SearchSuggestion = (props) => {
    let show = false;
    return (
        <ul className="suggestion">
            <li className="player player--suggestion"
                style={{
                    display: show > 0 ? 'block' : 'none',
                }}>
                <div className="player__media player__media--small">
                    <img className="player__image" src="https://unsplash.it/40" alt="" />
                </div>
                <div className="player__name player__name--large">
                    Pogba
                </div>
            </li>
        </ul>
    );
};

const Modal = (props) => {
    return (
        <div className="modal"
             style={{
                 transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                 opacity: props.show ? '1' : '0',
                 display: props.show ? 'block' : 'none'
             }}>
            <div className="modal__bg" />
            <div className="modal__dialog">
                <div className="modal__content">
                    <div className="modal__header">
                        <i onClick={props.close} className="modal__close-btn fa fa-times" />
                        <p className="modal__title">Pick a player</p>
                    </div>
                    <div className="modal__body">
                        <PlayerPicker />
                        <SearchSuggestion />
                    </div>
                </div>
            </div>
        </div>
    )
};


class App extends Component {

    state = {
        selectedPositions: [],
        rating: 0,
    };

    render() {
        return (
            <div className="App">
                <Squad selectedPositions={this.state.selectedPositions} />
            </div>
        );
    }
}


export default App;
