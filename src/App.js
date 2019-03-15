import React, {
  Component
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  query
} from './query.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: {},
      hasError: false
    }


    this.nextTitle = this.nextTitle.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleError = this.handleError.bind(this)
  }
  componentDidMount() {
    console.log("called")
    this.nextTitle();
  }
  nextTitle() {
    var variables = {
      id: Math.floor(Math.random() * 9000) + 1
    };

    var url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      };
    fetch(url, options).then(this.handleResponse)
      .then(this.handleData)
      .catch(this.handleError);
  }

  handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });

  }

  handleData(data) {
    console.log(data)
    var title = data.data.Media.title.native;
    var img = data.data.Media.coverImage.large;
    if (title === null) {
      this.nextTitle()
    }
    // check and if not call again this.nextTitle
    const newStyle = {
      backgroundImage: `url(${img})`
    };
    this.setState({
      title: title,
      image: newStyle
    })
  }

  handleError(error) {
    // alert('Error, check console');
    console.log(error);
    if (error === 404) {
      this.nextTitle()
    }
  }


  render() {
    const {
      image,
      title
    } = this.state;
    console.log(title)
    const {
      editable
    } = this.props;
    return ( < section >
        <
        form >
        <
        input type = "radio"
        name = "Anime"
        value = "Anime" / > Anime <
        input type = "radio"
        name = "Manga"
        value = "Manga" / > Manga <
        /form>  <
        button onClick = {
          this.nextTitle
        } >> < /button> {
        title && ( < > < div class = "loader" > < div class = "gameImg"
          style = {
            image
          } > < /div></div >
          <
          input / >
          <
          div > {
            title
          } < /div></ > )
      } <
      /section>
  )
}
}

export default App;