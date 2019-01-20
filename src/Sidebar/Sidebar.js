import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__header">
                    <h1 className="sidebar__title">Squad builder</h1>
                </div>
                <div className="sidebar__content">
                    <div className="rating">
                        <h2 className="rating__title">Overall rating</h2>
                        <span className="rating__total">{this.props.rating}</span>
                    </div>
                </div>
                <div className="sidebar__footer">
                    <div className="btn btn--red btn--big"
                         onClick={this.props.clear()}>Clear formation
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;