// This file containts all the code I need to work on to complete some operation, but at the moment is not working

var queryOVA = `
query ($id: Int) {
  Media (id: $id, type: ANIME, format: OVA) {
    id
    title {
      romaji
      native
    }
    coverImage {
      extraLarge
    }
    isAdult
  }
}
`;
var queryManga = `
query ($id: Int) {
  Media (id: $id, type: Manga) {
    id
    title {
      romaji
      native
    }
    coverImage {
      extraLarge
    }
    isAdult
  }
}
`;


export {queryOVA};
export {queryManga};

selectType(event) {
    const target = event.target;
    console.log(target)
    const checkbox = target.type === 'checkbox';
    const value = target.value;
    if(target.value === 'Anime') {
        var variables = {
          id: Math.floor(Math.random() * 10000) + 1
        };
        this.setState({
          open: false,
          color: 'tomato'
        });
          var url = 'https://graphql.anilist.co',
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              query: queryAnime,
              variables: variables
            })
          };
        
        fetch(url, options).then(this.handleResponse)
          .then(this.handleData)
          .catch(this.handleError);
    }
    console.log(value)
    const name = target.name;
    console.log(name)

    this.setState({
      [name]: value
    });
  }

  <div className="flex flex-row wrap justify-center max960">
          <form>
            <label>
              <input type = "checkbox" name = "Anime" value = "Anime" checked={this.state.isGoing} onChange={this.selectType}/>
              Anime series
            </label>
            <label>
              <input type = "checkbox" name = "OVA" value = "OVA" checked={this.state.isGoing} onChange={this.selectType}/>
              OVA
            </label>
            <label>
              <input type = "checkbox" name = "Manga" value = "Manga" checked={this.state.isGoing} onChange={this.selectType}/>
              Manga
            </label>
          </form>
        </div>

this.selectType = this.selectType.bind(this);