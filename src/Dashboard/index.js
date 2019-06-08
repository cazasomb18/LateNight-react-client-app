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

  render(){

    return(
      <div>
          {
            this.state.show === true ? 
            <div>
              <h1>Welcome to your Dashboard, {this.props.userName}</h1>
              <button type='button' onClick={this.hideModal}>
                Hide {this.props.userName}'s Dashboard
              </button>
                <button onClick={this.getUserComments}>Refresh {this.props.userName}'s Data</button>
                <h4>Hi {this.props.userName}, here you can manage all of your created data</h4>
                <RestaurantComment 
                  userData={this.state.userRestaurants.data}
                  userComments={this.state.userRestaurants.foundComments}
                  getUserRestaurantInfo={this.getUserRestaurantInfo}
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
                    onSubmit={this.editRestaurantComment}
                    value='EDIT'
                  />

                </form>
              

            </div>
            : 
            <div>

              <button type='button' onClick={this.toggleModal}>
                Show {this.props.userName}'s Dashboard
              </button>
            </div>

          }
      </div>
      )
  }
};

export default Dashboard;