import React, { Component } from 'react';
import RenderListComponent from '../RenderList';
import RestaurantComment from '../RestaurantComment';
////// here we want the functionality to edit, or delete comments/////

class Dashboard extends Component {
  constructor(props){
    console.log('constructor');
    super(props);
    this.state = {
      restaurants: [],
      show: false,
      userComments: [],
      userRestaurants: [],
      lat: '',
      lng: '',
      userName: '',
      deleteComment: this.deleteRestaurantComment
    }
  }
  componentDidMount(){
    console.log(this.state);
    this.getUserComments().then(restaurant => {
      console.log(restaurant);
      if(restaurant != null) {
        this.setState({
          userRestaurants: [...restaurant.data],
          lat: this.props.latitude,
          lng: this.props.longitude,
          userName: this.props.userName
        })
      } else if(restaurant === null) {
        this.setState({
          userRestaurants: []
        })
      }
    })
  }
  // process.env.REACT_APP_BACK_END_URL
  // process.env.REACT_APP_GEO_LOC_URL + this.state.lat + '/' + this.state.lng + '&radius=2000&type=restaurant&keyword=open&keyword=late&key=' + process.env.REACT_APP_API_KEY, 
  // sendUserLocation = async (e) => {
  //   try{
  //     const coordinates = {this.state.lat, this.state.lng};
  //     const postLocation = await fetch( process.env.REACT_APP_BACK_END_URL + 'auth/location/', {
  //       method: 'POST',
  //       credentials: 'include',
  //       body: JSON.stringify(coordinates),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     const parsedLocation = await postLocation.json();
  //     console.log(parsedLocation);
  //   }catch(err){
  //     console.error(err);
  //   }
  // }
  getUserComments = async (e) => {
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
  //// THIS MOTHER FUCKING THING ^^^ ISN'T RETURNING DATA SPECIFIC TO A USER... WHY?!?! ////
  /// SEEMS TO BE WORKING NOW --- NOT SURE WHY AT ALL... BUT I POM'd IT ////
  showModal = () => {
    this.setState({
      show: true
    });
  }
  hideModal = () => {
    this.setState({
      show: false
    });
  }
  postRestaurantComments = async (e)  => {
    e.preventDefault();
    try{
        const postComments = await fetch(process.env.REACT_APP_BACK_END_URL + 'restaurants/:place_id/comment', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(postComments),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const commentResponse = await postComments.json();
        console.log(commentResponse);
        this.setState({
          comments: JSON.stringify(commentResponse)
        })
        console.log('these are the comments: ', commentResponse);
        console.log("this is the comment response: ", commentResponse);
    }catch(err){
        console.error(err)
      }
  }
  editRestaurantComment = async (e) => {
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
      console.error(err);
    }
  }
  deleteRestaurantComment = async (e) => {
    try{
      /// i tried mapping the two data objects and inserting the iterable index before the array in each piece of data.. react didn't like it///
      const deletedComment = await fetch(process.env.REACT_APP_BACK_END_URL + 'comment/restaurants/' + this.state.userRestaurants.data.place_id + '/'+ this.state.userRestaurants.foundComments._id + '/', {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const deletedCommentResponse = await deletedComment.json();
      console.log('deleted comment response: ', deletedCommentResponse);
    }catch(err){
      console.error(err)
    }
  }
  render(){
    console.log(this.state);
    console.log(this.props);
    console.log(this.state.userRestaurants);
    return(
      <div>
          {
            this.state.show === true ? 
            <div>
              <h1>Welcome to your dashboard</h1>
              <button type='button' onClick={this.hideModal}>
                Hide Dashboard
              </button>
                <button onClick={this.getUserComments}>Show User Data</button>
                <h4>Here you can manage all of your created data</h4>
                <RestaurantComment 
                  userData={this.state.userRestaurants.data}
                  userComments={this.state.userRestaurants.foundComments}
                  deleteComment={this.state.deleteComment}
                />
                <form>
                  Edit Comment: 
                  <input
                    type='text' 
                    name='comment' 
                    onChange={this.handleChange} 
                    value={this.state.comment}
                  />
                  
                  <input 
                    type='submit' 
                    onSubmit={this.handleEdit} 
                    value='EDIT'
                  />

                </form>
              

            </div>
            : 
            <div>

              <button type='button' onClick={this.showModal}>
                Show Dashboard
              </button>
            </div>

          }
      <RenderListComponent restaurants={this.state.restaurants}/>
      </div>
      )
  }

};

export default Dashboard;

// .forEach((i) => [i])

// .forEach((i) => [i])