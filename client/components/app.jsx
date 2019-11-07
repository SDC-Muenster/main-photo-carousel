import React from 'react';
import MainPhotos from './MainPhotos.jsx'
import Modal from './Modal.jsx';
import styled from 'styled-components';
import SavePhotos from './SaveButton.jsx';
import SaveModal from './SaveModal.jsx';
import faker from 'faker';






class App extends React.Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      photoList: [],
      homepagePhotos: [],
      currentPhotoIndex: 1,
      showPhotoModal: false,
      showSaveModal: false
    }

    //function bindings
    this.showPhotoModal = this.showPhotoModal.bind(this);
    this.showSaveModal = this.showSaveModal.bind(this);
  }

// Main Photo Modal!

  showPhotoModal(index) {
    this.setState({
      currentPhotoIndex: index,
      showPhotoModal: !this.state.showPhotoModal
    });
  };

//modal for users to save photos

  showSaveModal(e) {
    this.setState({
      showSaveModal: !this.state.showSaveModal
    });
  };



//request for pics from server/db/s3 bucket
 componentDidMount() {
    const url = new URL(window.location.href);
    const houseId = url.searchParams.get('house_id');
    console.log('HOUSE ID ', houseId)
    // const house = request.data[0];

    fetch(`/api/photos/${houseId}`)
      .then((result) => {
        return result.json()
      })
      .then((response) => {
        console.log(response)
        this.setState({
          photoList: response[0].photoUrl,
          homepagePhotos: response[0].photoUrl.slice(0, 5)
        })
        //access the id of url, and display that specific object
        //[url, url, url]
        console.log('HOMEPAGEPHOTOS ', this.state.homepagePhotos, 'PHOTOLIST ', this.state.photoList)
      })
      .catch((err)=> {
        console.error(err)
      })
  }

  render() {
    if(this.state.showPhotoModal) {
      return (

      <div style= {{
        height: '500px'
      }}>

        <MainPhotos onPhotoClick={this.onPhotoClick} onPhotoHover={this.onPhotoHover} photoList={this.state.photoList} homepagePhotos={this.state.homepagePhotos} showPhotoModal={this.showPhotoModal} showSaveModal={this.showSaveModal} currentPhoto={this.state.currentPhoto} />

        <Modal showPhotoModal={this.state.showPhotoModal} onClose={this.showPhotoModal} list={this.state.photoList} currentPhotoIndex={this.state.currentPhotoIndex} homepagePhotos={this.state.homepagePhotos}/>
      </div>
      )
    } else if (this.state.showSaveModal) {
      return (
        <div style= {{
          height: '500px'
        }}>

          <MainPhotos onPhotoClick={this.onPhotoClick} onPhotoHover={this.onPhotoHover} photoList={this.state.photoList} homepagePhotos={this.state.homepagePhotos} showPhotoModal={this.showPhotoModal} showSaveModal={this.showSaveModal} currentPhoto={this.state.currentPhoto} />

        <SaveModal showSaveModal={this.state.showSaveModal} onQuit={this.showSaveModal} />
        </div>
      )
    } else {

    return (
      <div style= {{
        height: '500px'
      }}>
      <MainPhotos onPhotoHover={this.onPhotoHover} photoList={this.state.photoList} homepagePhotos={this.state.homepagePhotos} showPhotoModal={this.showPhotoModal} showSaveModal={this.showSaveModal} currentPhoto={this.state.currentPhoto} />

      </div>
      )

    }
  }
}



export default App;