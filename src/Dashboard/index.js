import React, { Component } from 'react';
import RestaurantComment from '../RestaurantComment';

class Dashboard extends Component {
  constructor(props){
    super();
    this.getUserRestaurantInfo.bind(this);
    this.state = {
      restaurants: [],
      show: false,
      userRestaurants: []
    }
  }
  componentDidMount(){
    // console.log('STATE IN CDM: IN DASHBOARD', this.state);
    // console.log('PROPS IN CDM: IN DASHBOARD', this.props);
    this.getUserRestaurantInfo();
  }

  /// THIS FETCH CALL RETURNS ALL THE DATA ASSOCIATED WITH THE LOGGED IN USER////
  getUserRestaurantInfo = async (e) => {
    try{
      const userRestaurantsResponse = await fetch(process.env.REACT_APP_BACK_END_URL + '/auth/usercomments/', {
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
    if(!this.state.show) {
      this.setState({
        show: true
      })
    } else {
      this.setState({
        show: false
      })
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
      const editedComment = await fetch(process.env.REACT_APP_BACK_END_URL + '/comment/restaurants/' + this.state.userRestaurants.data.place_id + '/edit/' + this.state.userRestaurants.foundComments._id + '/', {

        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const editCommentResponse = await editedComment.json();
      console.log('edited comment response: ', editCommentResponse);
      this.props.clearComment();
      this.props.showDashAndHideList();

    }catch(err){
      console.error(err);
    }
  }

  render(){
    // console.log('STATE IN DASHBOARD RENDER', this.state);
    // console.log('PROPS IN DASHBOARD RENDER', this.props);
    // console.log("this.state.userRestaurants render in Dash: ", this.state.userRestaurants);

    return(
      <div>
          {
            this.state.show === true ? 
            <div className="dashboardFieldContainer">
              <h1 className="title">Welcome to your Dashboard, {this.props.userName}</h1>
              <button className="dashboardField" type='button' onClick={this.hideModal}>
                Hide Dashboard
              </button>
              <button className="dashboardField" onClick={this.getUserRestaurantInfo}>Refresh Dashboard</button>

              <h4 className="subTitle">Hi {this.props.userName}, here you can manage all of your data!</h4>
              <RestaurantComment 
                userData={this.state.userRestaurants}
                userComments={this.state.userRestaurants.foundComments}
                getUserRestaurantInfo={this.getUserRestaurantInfo}
                editRestaurantComment={this.editRestaurantComment}
              />

            </div>
            : 
            <div className="dashboardFieldContainer">
              <button className="dashboardField" type='button' onClick={this.toggleModal}>
                Show Dashboard
              </button>
            </div>

          }
      </div>
      )
  }
};

export default Dashboard;