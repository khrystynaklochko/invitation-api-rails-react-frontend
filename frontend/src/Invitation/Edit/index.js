import React, { Component } from 'react';
import InvitationForm from '../Form';

class InvitationEdit extends Component {
  render() {
    return (
      <div className="InvitationEdit col-md-8 col-md-offset-2">
        <h2>Edit invitation</h2>
        <InvitationForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default InvitationEdit;
