import React, { Component } from 'react';
import "./Home.css"

class Home extends Component {
  render() {
    return (
      <div className="home-root">
        <h1 className="home-title">
          Sustainable development Goal 13: Climate action
        </h1>
        <div className="home-content">
          You can select a graph you want to see on the right under the tab "sidebar".<br />
          Every graph has a set of filters you can use under the "filters" tab. <br />
          Some graph also have some insights explained on the "insights" tab which point out some interesting things and try to explain them. click on them to automatically select the appropriate filters
        </div>
        <div className="footer">
          <ul>
            <li>
              <b>Name:</b> Rik Hendrikx
            </li>
            <li>
              <b>Course:</b> Applied Data Science B
            </li>
            <di>
              <b>Source:</b> <a href="https://github.com/MrRikkert/ds-climate">Github</a>
            </di>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
