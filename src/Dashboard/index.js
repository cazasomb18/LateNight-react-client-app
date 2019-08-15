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
      this.props.showDashAndHideList();

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
    this.getUserRestaurantInfo();
  }

  hideModal = () => {
    this.setState({
      show: false
    });
    this.props.showListAndHideDash();
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
      // console.log('edited comment response: ', editCommentResponse);
      this.props.clearComment();
      // this.props.showDashAndHideList();

    }catch(err){
      console.error(err);
    }
  }

  render(){
    // console.log("THIS.STATE IN DASH render(): ", this.state.userRestaurants);
    return(
      <div className="dashboardFieldContainer fluid">
          {
            this.state.show === true ? 
            <div>
              <h1 className="dashTitle title">Welcome to your Dashboard, {this.props.userName}</h1>
              <div>
                <button className="dashboardField" type='button' onClick={this.hideModal}>
                  Hide Dashboard
                </button>
              </div>

              <h4 className="subTitle dashSubTitle">Here you can manage all of your data.</h4>
              <RestaurantComment 
                userData={this.state.userRestaurants.data}
                userComments={this.state.userRestaurants.foundComments}
                getUserRestaurantInfo={this.getUserRestaurantInfo}
                editRestaurantComment={this.editRestaurantComment}
              />

            </div>
            : 
            <div>
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