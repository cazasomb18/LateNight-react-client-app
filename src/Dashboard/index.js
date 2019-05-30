import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Dashboard extends Component {
  constructor(){
  console.log('constructor',);
  super();
  state = {show: false};
  }
  showModal = () => {
    this.setState({show: true});
  };
  hideModal = () => {
    this.setState({show: false});
  };
  render(){
    return{
      <main>
       <div>
          <h1>UNDER CONSTRUCTION, GOALS OF THIS PAGE:</h1>
          <h4>Want to the list of data, w/ name, vicinity, and place_id in each li</h4>
          <h4>Each li will be a clickable link</h4>
          <h4>Each link will onClick: hit POST restaurant/place_id/comment route on backend</h4>
          <h4>Will redirect to space where users can edit/delete || their comments on that entry</h4>
          <h1>MODAL</h1>
          <button type='button' onClick={this.showModal}>
            comment
          </button>
        </div>
      </main>
    }
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


export default Dashboard;








 //    if (this.state.loggedIn === true){
  // const mapRestaurantData = this.state.restaurants.parsedResponse.map((restaurant, i) => {
 //       <div>
 //             <li key={restaurant.id}>
 //               <p className="faux" data={i} onClick={this.mapRestaurantData}> Name: {restaurant.name}</p>
 //               Address: {restaurant.vicinity}
 //               ID: {restaurant.place_id}
 //             </li>
 //       </div>
  //    )

  //  })
 //    }

