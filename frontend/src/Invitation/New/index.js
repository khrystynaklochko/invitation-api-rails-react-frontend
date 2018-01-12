import React, { Component } from 'react';
import InvitationForm from '../Form';

class InvitationNew extends Component {
  render() {
    return (
      <div className="InvitationNew col-md-8 col-md-offset-2">
        <h2>Upload Customer Lists</h2>
        <InvitationForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default InvitationNew;
