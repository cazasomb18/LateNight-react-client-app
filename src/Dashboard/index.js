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
        })
      } else if(restaurant === null) {
        this.setState({
          userRestaurants: [],
        })
      }
    })
  }
  getUserComments = async (e) => {
    try{
      const userRestaurantsResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'auth/usercomments', {
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
  handlePost = async (e) =>{
    e.preventDefault();
    try{
      await this.postRestaurantComments();

    }catch(err){
      console.error(err);
    }
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
        <h1>Welcome to your dashboard</h1>
          {
            this.state.show === true ? 
            <div>
              <button type='button' onClick={this.hideModal}>
                Hide Dashboard
              </button>
              <button onClick={this.getUserComments}>
                Show User Data
              </button>
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