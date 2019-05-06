import React from 'react';
import { Container, Row, Col, Tab, Table } from 'react-bootstrap';
var JudgeObj = require('../data/judge');
import fire from '../config/firebase';

class WinnerPage extends React.Component{
  constructor(props){
    super(props);
  }

  onLogout(e){
    fire.auth().signOut();
  }

  displaybyTeam(doc){
    var teamList = [];

    var temp = 
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Rank</th>
            <th>School</th>
            <th>Team</th>
            <th>App</th>
            <th>Total Score</th>
          </tr>
        </thead>
        {this.display_winner()}                
      </Table>

    teamList.push(temp);
    return teamList;
  }

  get_school(list){
    var count = 0;
    for (var i in list){
      if (count == 0){
        return list[i];
      }
    }
  }

  get_team(list){
    var count = 0;
    for (var i in list){
      if (count == 1){
        return list[i];
      }
      else{
        count = count + 1;
      }
    }
  }

  get_app(list){
    var count = 0;
    for (var i in list){
      if (count == 2){
        return list[i];
      }
      else{
        count = count + 1;
      }
    }
  }

  display_winner(){
    var winner_list = [];
    var winner_dict = {};
    let tt = [];
    for (var i in this.props.teamData2){
      winner_dict[this.props.teamData2[i].teamName]=[this.props.teamData2[i].school, this.props.teamData2[i].appName, this.props.teamData2[i].totalNorScore];
      tt.push(parseFloat(this.props.teamData2[i].totalNorScore));
    }

    tt.sort(function(a,b) { return b-a ; });

    var count = 1;
    for (var i in tt){
      for (var j in winner_dict){
        if (winner_dict[j][2] == tt[i] && count <= 5){
          count = count + 1;
          var temp = (
            <tbody>
              <tr>
                <td><img className="winner-img" src={require('../assets/' + String(count-1)+'.png')} style={{ flex:2 , width: "30%", height: "30%"}} ></img></td>
                <td>&nbsp;{winner_dict[j][0]}</td>
                <td>&nbsp;{j}</td>
                <td>&nbsp;{winner_dict[j][1]}</td>
                <td>&nbsp;{tt[i]}</td>
              </tr>
            </tbody> )
          winner_list.push(temp);
        }
      }
    }
    return winner_list;
  }

  render(){
    return(
      <Container className="panel-content-container"fluid={true}>
        <Row className="panel-row">
          <Col className="panel-col top">
            <h1 className="tab-content-header-h1">Winner !<img className="winner" src={require('../assets/winner.png')}></img></h1>
            <button className="logout-btn"><img className="logout-img"onClick={this.onLogout.bind(this)} src={require('../assets/sign-out.png')}></img></button>
          </Col>
        </Row>

        <div className="panel-main-wrapper">
          <Container className="panel-main-container" fluid={true}>
            <Row><Col>Winner</Col></Row>
            <Row>
              <Col>
                {this.displaybyTeam()}       
              </Col> 
            </Row>
          </Container>
        </div>
      </Container>
    );
  }
}

export default WinnerPage;