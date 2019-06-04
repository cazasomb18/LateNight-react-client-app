import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../Modal';
import LateRestaurantsList from '../LateRestaurantsList';
////// here we want the functionality to edit, or delete comments 
////// that have been posted by the user....

class Dashboard extends Component {
  constructor(){
  console.log('constructor');
  super();
  
  this.state = {
    comments: [],
    restaurants: [],
    show: false
    }
  }

  componentDidMount(){
    console.log(this.state);

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
  };
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
  };
  handleEdit = async (e)  => {
    e.preventDefault()
    try{
      await this.editRestaurantComment();

    }catch(err){
      console.error(err)
    }   
  };
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
  handleDelete = async (e) => {
    try{
      await this.deleteRestaurantComment();

    }catch(err){
      console.error(err)
    }
  }
  render(){
    return(
      <div>
        <h1>This is the user dashboard</h1>
          { 
            this.state.show === true ? 
            <div>
                <p>THIS IS WHERE USERS CAN EDIT/DELETE THEIR COMMENTS</p>
                <form>
                  Leave a Comment: 
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

          
      </div>
      )
  }

  };


    // this.state = ({
    //   loggedIn: false,
    //   isRegistered: false,
    //   userName: '',
    //   restaurants: [],
    //   comments: [],
    // })
    // console.log(this.state.restaurants.restaurants.allRestaurants.results);
    ////this is^^^ where the data from the api call is ^^^stored in state////
  // }
    ///trying to handle all of these routes here: PUT/comment, POST,restaurants, and DELETE/comment

    // showRestaurant = async (e) => {
    //   e.preventDefault();
    //   try{
    //     const showRestaurantResponse = await fetch(process.env.REACT_APP_BACK_END + "restaurants/:place_id/comment", {
    //       method: 'POST',
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     })
   //     console.log(showRestaurantResponse);
      // parsedResponse = await showRestaurantResponse.json();
   //     console.log(parsedResponse);
   //     this.setState

//       }catch(err){
//         console.log(err);
//         console.error(err);
//       }
//     }
//   render(){
//     return (

//       )
//   }
// }

          // <// LateRestaurantsList

export default Dashboard