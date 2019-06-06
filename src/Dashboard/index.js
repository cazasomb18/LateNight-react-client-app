import React, { Component } from 'react';
import RenderListComponent from '../RenderList';
import RestaurantComment from '../RestaurantComment';
////// here we want the functionality to edit, or delete comments/////

class Dashboard extends Component {
  constructor(){
  console.log('constructor');
  super();
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
          userRestaurants: [...restaurant.data]
        })
      } else if(restaurant === null) {
        this.setState({
          userRestaurants: []
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
      const editedComment = await fetch(process.env.REACT_APP_BACK_END_URL + 'comment/restaurants/:place_id/edit/:comment_id', {

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
  // handleEdit = async (e)  => {
  //   e.preventDefault()
  //   try{
  //     await this.editRestaurantComment();

  //   }catch(err){
  //     console.error(err)
  //   }   
  // }
  deleteRestaurantComment = async (e) => {
    try{
      const deletedComment = await fetch(process.env.REACT_APP_BACK_END_URL + 'comment/restaurants/:place_id/:comment_id', {
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
  // handleDelete = async (e) => {
  //   try{
  //     await this.deleteRestaurantComment();

  //   }catch(err){
  //     console.error(err)
  //   }
  // }
  render(){
    console.log(this.state.userRestaurants);
    return(
      <div>
        <h1>This is the user dashboard</h1>
          {
            this.state.show === true ? 
            <div>
                <p>THIS IS WHERE USERS CAN EDIT/DELETE THEIR COMMENTS</p>
                <RestaurantComment 
                  userData={this.state.userRestaurants.data}
                  userComments={this.state.userRestaurants.foundComments}
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
                  <input 
                    type='submit'
                    onSubmit={this.handleDelete}
                    value='DELETE'
                  />
                </form>
              

              <button type='button' onClick={this.hideModal}>
                Hide Dashboard
              </button>
            </div>
            : 
            <div>

              <button type='button' onClick={this.showModal}>
                Show Dashboard
              </button>
            </div>

          }
      <RenderListComponent restaurants={this.state.restaurants}/>
      <button onClick={this.getUserComments}>Show User Data</button>
      </div>
      )
  }

};

export default Dashboard


// delete={this.state.deleteComment}
// <RestaurantComment userComments={this.props.userComments}/>