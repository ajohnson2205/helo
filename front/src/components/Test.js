import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

authUser = () => {
  axios
    .post('http://localhost:1337/login')
}

render() {
  return(
    <div>
      <Link to="/login">
        <button>Click!</button>
      </Link>
    </div>
  )
}
}

export default Test;
