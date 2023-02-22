import * as React from "react";
import Events from "../components/events";
import Navbar from "../components/navbar";

class IndexPage extends React.Component {
  render(){
    return (
      <div>
          <Navbar/>
          <Events/>
      </div>
    );
  }
}

export default IndexPage;
