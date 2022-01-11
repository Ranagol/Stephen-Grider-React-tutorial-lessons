import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  //CREATING PROPERTIES AND SETTERS IN THE STATE
  const [term, setTerm] = useState('programming');
  const [results, setResults] = useState([]);

  //WHEN TERM CHANGES DO THIS...(WITH useEffect)
  useEffect(() => {
    const search = async () => {//here we just define this search function, but it is not activated!!!!
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {//sending an api request with axios
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      });

      setResults(data.query.search);//data from api is being put into the state
    };

    /*
    Problem: right now, we are requesting data from api for every letter that was typed by the user. That is bad. Instead that, we want to wait for 500 ms without another input change (without anything typed), and only then to create an api request. So will wil set a timer to perform an api request in 500 ms on the first letter. For every other letter the first timer will be cancelled, and a new (second, third, fourth...etc ) timer will be started. A new timer for every letter.
    */

    if(term && !results.length) {//if there is no results, that means that this is the first time when we render this component... The first search after the rendering is by default for the word 'programming'.
      search();//and in this case we want to do search immediatelly, without delay (the first search will not have user typing, the first search is for the word programming by default)...
    } else {//... but in every other case, yes we want our search to be delayed
      const timeOutId = setTimeout(()=>{//wait for 500 ms... Note: every setTimeout() returns his id, and this id can be used to cancel this setTimeout. So we pit this id into our timeOutId variable.
        if(term){//if the user deletes the search term from the search window, and nothing is there, our app will perform a search for this nothing, which will cause crashing for our app. So, if there is not term, we don't want send a request to the api.
          search();//here we activate, call the previously defined search() function
        }
      }, 1000);

      return () => {
        clearTimeout(timeOutId);//clearTimeout is a JS built in function that can cancel the setTimeout() by it's id.
      };
    }
  }, [term]);

  //DISPLAYING THE SEARCH RESULTS
  const renderedResults = results.map((result) => {
    //console.log('This is one result from Search.js', result);
    return (
      <div key={result.pageid} className="item">
          <div className="right floated content">
            <a
              href={`https://en.wikipedia.org?curid=${result.pageid}`}
              className="ui button"
            >Go</a>
          </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
        </div>
      </div>
    );
  });
/*
XSS ATTACK
Sometimes servers send back not just objects, but html too. In our case the result.snippet contains html. They do this because this way something could be formatted as bold text with a span, for example. This below is an example how to handle a server response that contains html too:

<span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>

But, the probem is, that this way of accepting a html from a third party could be a security hole. And this security hole is called xss attack(cross site scripting attack). This is when we pick up and render some unknown html source. This can allow a hacker to execute some Javascript in our app. That is really bad.
*/

  return (
    <div>
      <div className="ui form">
        <div className="field">
          {/* HERE WE DISPLAY THE SEARCH FIELD */}
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      {/* HERE WE CALL THE renderedResults() */}
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
