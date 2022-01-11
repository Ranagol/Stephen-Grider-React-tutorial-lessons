import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
/*
We have an issue with
<Route path="/streams/new" exact component={StreamCreate} />
<Route path="/streams/:id" exact component={StreamShow} />
Whenever we go to /streams/new, the StreamCreate component will load (this is good and expected) and the StreamShow
component will ALSO load (totally unexpected and bad!)
The :id is a variable. It could be a number, string, anything... And /new is a string. So at this point, to React
the "/streams/new" and the "/streams/:id" are same. So, both are loaded. To solve this, we must use Switch from
"react-router-dom". Switch will make Router to show only one component for a given route - and nothing else.

 */

export default App;
