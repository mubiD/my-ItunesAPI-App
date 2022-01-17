// imported libraries, features etc
import React from 'react';
import {Link} from 'react-scroll'
import fetch from 'isomorphic-fetch';

// imported styles 
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import './app.css';

// imported components
import Welcome from './Welcome';
import ShowFavs from './showFavs';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        isLoaded: false,
        term: '',
        media: 'Movie',
        country: 'ZA',
        musicVideo: 'musicVideo',
        tvShow: 'tvShow',
        shortFilm: 'shortFilm',
        results: [],
        favorites: []
      }

    // bindings goes here event handler fxns
    this.handleFrontFetch = this.handleFrontFetch.bind(this);
    this.addToFavs = this.addToFavs.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    // setting to state fxns
    this.watchTerm = this.watchTerm.bind(this);
    this.watchMedia = this.watchMedia.bind(this);
  }

    handleDelete(e){

      let deleteThis = e.target.id;

      let newDeleteArray = this.state.favorites;

      newDeleteArray.splice(deleteThis, 1);

      this.setState({
        favorites: newDeleteArray,
      })
    }

    // setters to state
    watchTerm(e) {

      let userTerm = e.target.value

      this.setState({term: userTerm})

    }

    watchMedia(e) {

      let userMediaType = e.target.id

      this.setState({media: userMediaType})
    }

    handleFrontFetch(){
     
      fetch('/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'paramOne': this.state.term, 
          'paramTwo': this.state.media, 
          'paramThree': this.state.country
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
        console.log('hey')
        this.setState({
          results: data.results,
          isLoaded: true})
      });
    }

    addToFavs(e){

      let newFav = e.target.id;

      let newFavArray = this.state.favorites;

      newFavArray.push(newFav);

      this.setState({
        favorites: newFavArray,
      })

    }

    render() {
      return (
            <div className="App text-center m-auto">
              <div>
            <Nav
                className="MainNav justify-content-center fixed-top"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                <Nav.Item className="NavItem">
                    <Nav.Link className="NavLink" >
                      <Link to="home" >Home</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="NavItem">
                    <Nav.Link className="NavLink" >
                      <Link to="Search" >Search</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="NavItem">
                    <Nav.Link className="NavLink" >
                      <Link to="results">Results</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="NavItem">
                    <Nav.Link className="NavLink" >
                      <Link to="favorites">Favorites</Link>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
              <Welcome />
                <div id="Search" className=" MainSearch  m-5">
                  <div className="p-3">
                    <h1>Lets search the iTunes library</h1>
                    <div className="m-3 d-flex flex-column">
                        <input
                            type="text"
                            className="m-2"
                            placeholder="Search Term"
                            onChange={this.watchTerm}></input>
                        <select
                            type="dropdown"
                            className="m-2"
                            placeholder="Search Media Type"
                            onChange={this.watchMedia}>
                              <option id="movie">Movie</option>
                              <option id="podcast">Podcast</option>
                              <option id="music">Music</option>
                              <option id="musicVideo">Music Video</option>
                              <option id="audiobook">Audiobook</option>
                              <option id="shortFilm">Short Film</option>
                              <option id="tvShow">TV Show</option>
                              <option id="software">Software</option>
                              <option id="ebook">eBook</option>
                              <option id="all">All</option>
                        </select>
                        <input
                        type="text"
                        className="m-2"
                        readOnly
                        value="ZA"
                        ></input>
                        <input
                            type="submit"
                            className=" btn btn-primary m-2 rounded"
                            onClick={this.handleFrontFetch}></input>
                    </div>
                  </div>
                </div>
                  <div className="m-5">
                  <div id="results" className=" ReturnedMedia card bg-light m-3 p-3">
                    <h1 className="text-center m-3">List of returned media</h1>
                    {this.state.isLoaded === true? 
                      this.state.results.map((result, index) => (
                        <div>
                          <div className=" card bg-light m-3 p-3" key={index.toString()}>
                            <h3 key="name">Name: {result.trackName}</h3>
                            <h5 key="id"> Artist Name: {result.artistName}</h5>
                            <span key="description">Description: {result.longDescription}</span>
                            <button key="favBtn" id={result.trackName} className="btn btn-primary rounded m-2" onClick={this.addToFavs}>Favorite</button>
                          </div>
                        </div>)) : <div>Awaiting your input...</div>}
                  </div>

                  <div id="favorites" className=" Favorites card bg-light m-3 p-3">
                    <h2>List of favorites</h2> 
                      {this.state.favorites.map((favorite) => (
                        <div>
                          <ShowFavs 
                          name={favorite}/> 
                          <button className=" px-2 btn-danger m-2 rounded" id={favorite} onClick={this.handleDelete}>Delete</button> 
                        </div>
                      ))}
                      
                  </div>
                  
                </div> 
            </div>
        );
    }
}
export default App;