import React, { Component } from 'react';
import RestaurantComment from '../RestaurantComment';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.getUserRestaurantInfo.bind(this);
    this.state = {
      restaurants: [],
      showList: false,
      showDash: true,
      show: false,
      userRestaurants: []
    }
  }
  componentDidMount(){
    // console.log("Dashboard PROPS CDM: ", this.props);
    // console.log("Dashboard STATE CDM: ", this.state);
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
        userRestaurants: parsedUserRestaurantsResponse,
        show: true
      })
      this.props.showDashAndHideList();

    }catch(err){
      console.log("there was an error calling getUserRestaurantInfo()");
    }
  }

  toggleModal = (e) => {
    if(!this.state.show) {
      this.setState({
        show: true
      })
      this.getUserRestaurantInfo();
    } else {
      this.setState({
        show: false
      })
      this.props.showListAndHideDash();
    }
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

      const editedCommentResponse = await editedComment.json();

      console.log('edited comment response: ', editedCommentResponse);

      this.getUserRestaurantInfo();

    }catch(err){
      console.error(err);
    }
  }

  toggleModal = (e) => {
    if (this.state.showList === true && this.state.showDash === false) {
      this.setState({
        showDash: true,
        showList: false
      })
      this.getUserRestaurantInfo();
    }
    if (this.state.showDash === true && this.state.showList === false) {
        this.setState({
          showList: true,
          showDash: false
        })
      this.props.showListAndHideDash();
    }
  }

  render(){
    return(
      <div className="dash"> 
          {
            this.state.show === true ? 
            <div id ="dashboardFieldContainer">
              <h1 className="dashTitle title">Welcome to your Dashboard, {this.props.userName}</h1>
              <button 
                className="lnbButton field"
                type="button" 
                onClick={()=>{
                  this.toggleModal();
                  this.props.showListAndHideDash();
              }}>
                Return to Main Menu
              </button>
              <h4 className="subTitle dashSubTitle">Here you can manage all of your data.</h4>
              <RestaurantComment 
                userData={this.state.userRestaurants.data}
                userComments={this.state.userRestaurants.foundComments}
                getUserRestaurantInfo={this.getUserRestaurantInfo}
                editRestaurantComment={this.editRestaurantComment}
                showDashAndHideList={this.props.showDashAndHideList}
                showListAndHideDash={this.props.showListAndHideDash}
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