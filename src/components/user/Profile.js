import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';

import PiecesShow from '../pieces/Show';

import LineGraph from '../graphs/Line';
import PieChart from '../graphs/Pie';

class Profile extends React.Component {
  state = {
    createdMode: false,
    newPiece: {
      startedAt: moment().format('YYYY-MM-DD')
    },
    pieceShow: null,
    user: null
  }

  componentDidMount() {
    axios
      .get(`/api/users/${Auth.getPayload().sub}`, { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(res => {
        this.setState({ user: res.data });
      });
  }

  handlePieceShow = ({ target: { value } }) => {
    this.setState({ createMode: false, pieceShow: value });
  }

  handlePieceShowClose = () => {
    axios
      .get(`/api/users/${Auth.getPayload().sub}/pieces`, { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(res => {
        this.componentDidMount();
        this.setState({ pieces: res.data, pieceShow: null });
      });
  }

  toggleCreateMode = () => {
    this.setState({ createMode: !this.state.createMode, pieceShow: null });
  }

  handleCreateChange = ({ target: { name, value }}) => {
    this.setState({ newPiece: { ...this.state.newPiece, [name]: value }});
  }

  handleCreateSubmit = () => {
    axios
      .post(`/api/users/${Auth.getPayload().sub}/pieces`, this.state.newPiece, { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(res => {
        this.setState({ createMode: false, pieces: res.data.pieces });
        this.componentDidMount();
      });
  }

  reformatTotalPracticed = (timeInMinutes) => {
    return timeInMinutes % 60 ? `${Math.floor(timeInMinutes/60)} hours, ${timeInMinutes % 60} mins` : `${timeInMinutes} mins`;
  }

  render() {
    return (
      <div>
        { this.state.user &&
          <div>
            <header>
              <div className="page-title">
                <h1>poco a poco</h1>
              </div>
              <div className="stave"/>
              <div className="stave"/>
              <div className="stave"/>
              <div className="stave"/>
              <div className="stave"/>
            </header>
            <div className="stats">
              <div className="columns first-row">
                <div className="column is-6 total-panel">
                  <h2 className="title">Stats for {this.state.user.username}</h2>
                  <div className="total">
                    <h3>A total of</h3>
                    <h2>{this.reformatTotalPracticed(this.state.user.totalPracticed)}</h2>
                    <h3>practiced since {this.state.user.accountCreated}</h3>
                  </div>
                </div>
                <div className="column is-6 pie">
                  <h2>Your Instruments</h2>
                  <PieChart user={this.state.user} />
                </div>
              </div>
              <div className="second-row">
                <h2>Your Practice History</h2>
                <LineGraph user={this.state.user} />
              </div>
            </div>
            <h2>My instruments:</h2>
            { this.state.user.instruments.map((instrument, i) => {
              return <div key={i}>
                { instrument.playingTime > 0 &&
                  <p>{instrument.name}: played for {instrument.playingTime} mins in total</p>
                }
              </div>;
            })}
            <h2>My practice log:</h2>
            <ul>
              { this.state.user.practiceLog && Object.keys(this.state.user.practiceLog).map((logKey, i) => {
                return <li key={i}>{logKey}: {this.state.user.practiceLog[logKey]} mins</li>;
              }) }
            </ul>
            <h2>My composers:</h2>
            <ul>
              { this.state.user.composersLog && Object.keys(this.state.user.composersLog).map((logKey, i) => {
                return <li key={i}>{logKey}: {this.state.user.composersLog[logKey]} mins</li>;
              }) }
            </ul>
          </div>
        }
        { !this.state.createMode &&
          <button onClick={this.toggleCreateMode}>Create a new piece</button>
        }
        { this.state.createMode &&
          <div>
            <label htmlFor="title">Title:</label>
            <input name="title" onChange={this.handleCreateChange} />
            <label htmlFor="composer">Composer:</label>
            <input name="composer" onChange={this.handleCreateChange} />
            <label htmlFor="description">Description:</label>
            <textarea name="description" onChange={this.handleCreateChange}></textarea>
            <label htmlFor="instrument">Instrument:</label>
            <select name="instrument" onChange={this.handleCreateChange}>
              { this.state.user.instruments.map((instrument, i) => {
                return <option key={i} value={instrument.name}>{instrument.name}</option>;
              })}
            </select>
            <button onClick={this.handleCreateSubmit}>Submit new piece</button>
            <button onClick={this.toggleCreateMode}>Close without saving</button>
          </div>
        }
        { this.state.pieceShow &&
          <div>
            <h2>Currently shown piece:</h2>
            <button onClick={this.handlePieceShowClose}>Close shown piece</button>
            <PiecesShow
              user={this.state.user}
              handlePieceShowClose={this.handlePieceShowClose}
              piece={this.state.pieceShow}
            />
          </div>
        }
        { this.state.user && this.state.user.pieces.map(piece =>
          <div key={piece._id}>
            <h2>{piece.title}</h2>
            <h2>{piece.composer}</h2>
            <button value={piece._id} onClick={this.handlePieceShow}>Show this piece</button>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
