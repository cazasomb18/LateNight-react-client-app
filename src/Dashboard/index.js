import React, { Component } from 'react';
import RenderList from '../RenderList';
import RestaurantComment from '../RestaurantComment';

class Dashboard extends Component {
  constructor(props){
    console.log('constructor');
    super(props);
    this.state = {
      restaurants: [],
      show: false,
      userRestaurants: []
    }
  }
  componentDidMount(){
    console.log('STATE IN CDM: IN DASHBOARD', this.state);
    console.log('PROPS IN CDM: IN DASHBOARD', this.props);
    this.getUserRestaurantInfo()
  }

  getUserRestaurantInfo = async (e) => {

    console.log("get user restaurant info being called")

    try{
      const userRestaurantsResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'auth/usercomments/', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedUserRestaurantsResponse = await userRestaurantsResponse.json();

      this.setState({
        userRestaurants: parsedUserRestaurantsResponse
      })

    }catch(err){
      console.error(err)
    }
  }

  toggleModal = () => {
    if(!this.show) {
      this.setState({
        show: true
      })
    } else {
      this.setState({
        show: false
      });
    }
  }

  hideModal = () => {
    this.setState({
      show: false
    });
  }

  editRestaurantComment = async (e) => {

    e.preventDefault()

    try{
      const editedComment = await fetch(process.env.REACT_APP_BACK_END_URL + 'comment/restaurants/' + this.state.userRestaurants.data.place_id + '/edit/' + this.state.userRestaurants.foundComments._id +'/', {

        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const editCommentResponse = await editedComment.json();
      console.log('edited comment response: ', editCommentResponse);

    }catch(err){
      console.log(err);
      console.error(err);
    }
  }

  render(){
    console.log('STATE IN CDM: IN DASHBOARD RENDER', this.state);
    console.log('PROPS IN CDM: IN DASHBOARD RENDER', this.props);


    return(
      <div className="form">
          {
            this.state.show === true ? 
            <div>
              <h1 className="title">Welcome to your Dashboard, {this.props.userName}</h1>
              <button className="field" type='button' onClick={this.hideModal}>
                Hide {this.props.userName}'s Dashboard
              </button>
                <button className="field" onClick={this.getUserRestaurantInfo}>Refresh {this.props.userName}'s Dashboard</button>
                <h4 className="subTitle">Hi {this.props.userName}, here you can manage all of your created data</h4>
                <RestaurantComment 
                  userData={this.state.userRestaurants.data}
                  userComments={this.state.userRestaurants.foundComments}
                  getUserRestaurantInfo={this.getUserRestaurantInfo}
                  editRestaurantComment={this.editRestaurantComment}
                />              

            </div>
            : 
            <div>

              <button className="field" type='button' onClick={this.toggleModal}>
                Show {this.props.userName}'s Dashboard
              </button>
            </div>

          }
      </div>
      )
  }
};

export default Dashboard;