//API tool to perform calls 
import axios from 'axios';
//library for parsing UnitTime 
import moment from 'moment';

export default {
  name: 'IndexFile',
  data: function (){
    return {
      err: '',
      stories: [],
      authors: []
    }
  },
  methods: {
    //mapping stories authors to authors id
    storiesForAuthor(id) {
      return this.stories.filter(s => s.data.by == id);
    },
    authorForStories(id) {
      return this.authors.filter(s => s.data.id == id);
    },

    //function for sorting by score
    sorted_stories: function() {
      function compare(a, b) {
        if (a.data.score < b.data.score)
          return -1;
        if (a.data.score > b.data.score)
          return 1;
        return 0;
      }
      return [...this.stories].sort(compare);
    }
  },


  created: function (){
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then((response) => {
      //Random 10 stories from array
      let results = response.data.splice(Math.floor(Math.random()*response.data.length),10);
      results.forEach(id => {
        //For each story, fetch story object
        axios.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
        .then((response) => {
          // format time using moment 
          let t = response.data.time;
          response.data.time = moment.unix(t).format('MMMM Do YYYY, h:mm:ss');
          this.stories.push(response);
          //fetch author from user endpoint
              let myAuthor = response.data.by;
              axios.get('https://hacker-news.firebaseio.com/v0/user/' + myAuthor + '.json')
              .then((myAuthors) => {
                //add to authors array
              this.authors.push(myAuthors);
              })
            .catch((err) => {
              this.err = err;
              alert("Error fetching authors " + err);
            })
              
        })
        .catch((err) => {
          this.err = err;
          alert("Error fetching items " + err);
        })
      })
    })
    .catch((err) => {
      this.err = err;
      alert("Error fetching topstories " + err);
    }); 

  }
  
}