'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Cync from 'cync';
import Immutable from 'immutable';

class MyStore extends Cync.Store {
  constructor(state) {
    super(state);
  }

  confirmGuest = () => {
    let newState = this.state.updateIn(['guests','confirmed'], val => val + 1);
    this.setState(newState);
  }

  cancelGuest = () => {
    let newState = this.state.updateIn(['guests','canceled'], val => val + 1);
    this.setState(newState);
  }
}

let store = new MyStore({
  guests: Immutable.Map({message:'React Cync Component', invited: 25, confirmed: 1, canceled: 0}),
});

class InvitedCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: store.state.getIn(['guests', 'invited']),
    };
  }

  componentDidMount() {
    store.onStateDidUpdate('guests.invited', (data) => {
      this.setState({value: data});
    });
  }

  render() {
    return (
      <p>Invited: {this.state.value}</p>
    );
  }
}

class MyComponent extends Cync.Component {

  static defaultProps = { store };

  constructor(props) {
    super(props);
  }

  _handleAddClick = () => {
    let newState = {
      guests: this.state.guests.update('invited', invited => invited + 1),
    };

    this.setState(newState);
  }

  render() {
    const style = {
      full: {width:'100%', textAlign:'center'},
      half: {float:'left', width:'50%', textAlign:'center'},
      button: {marginTop:20, width:'100%',height:50, textAlign:'center'},
    };

    return (
      <div>
        <h1 style={style.full}>{this.state.message}</h1>
        <div style={style.half}>
          <h2>Component State</h2>
          <p>Invited: {this.state.guests.get('invited')}</p>
          <p>Confirmed: {this.state.guests.get('confirmed')}</p>
          <p>Canceled: {this.state.guests.get('canceled')}</p>
        </div>
        <div style={style.half}>
          <h2>Store State</h2>
          <InvitedCount/>
          <p>Confirmed: {this.store.state.getIn(['guests','confirmed'])}</p>
          <p>Canceled: {this.store.state.getIn(['guests','canceled'])}</p>
        </div>
        <button style={style.button} onClick={this._handleAddClick}>Add Guest</button>
        <button style={style.button} onClick={this.store.confirmGuest}>Confirm Guest</button>
        <button style={style.button} onClick={this.store.cancelGuest}>Cancel Guest</button>
      </div>
    );
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('main'));
