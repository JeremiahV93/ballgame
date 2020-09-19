import React from 'react';

import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';
import teamColor from '../../../helpers/data/favTeamData';

class UserSettings extends React.Component {
  state = {
    user: {},
    teams: [],
    favTeamAcro: '',
  }

  componentDidMount() {
    userData.getUserData(authData.getUid())
      .then((res) => this.setState({ user: res[0] }))
      .catch((err) => console.error(err));
    this.setState({ teams: teamColor.teamColorData() });
  }

  favTeamChange = (e) => {
    e.preventDefault();
    this.setState({ favTeamAcro: e.target.value });
  }

  submitEvent = (e) => {
    e.preventDefault();
    const { user, favTeamAcro } = this.state;
    const teamDataObj = teamColor.getTeamColorsByAcro(favTeamAcro);
    user.favTeam = teamDataObj.acronym;
    user.primaryColor = teamDataObj.primaryColor;
    user.secondColor = teamDataObj.secondColor;
    userData.updateUser(user.id, user)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error(err));
  }

  render() {
    const { teams } = this.state;
    return (
      <div>
        <h1>User Settings!</h1>

        <form className='col-6 offset-3'>

        <label htmlFor="home-stadium">Favorite Team</label>
        <select onChange={this.favTeamChange} id='stadium' className="form-control">
          <option>Default select</option>
          {teams.map((team) => <option key={team.id} value={team.acronym}> {team.team}</option>)}
        </select>

        <button type="submit" className="btn btn-primary" onClick={this.submitEvent}>Submit</button>
      </form>
      </div>
    );
  }
}

export default UserSettings;
