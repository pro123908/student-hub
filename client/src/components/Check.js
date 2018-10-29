import React, { Component } from 'react'
import Spinner from './common/Spinner'
import {Link} from 'react-router-dom';
  
class Check extends Component {
  render() {

    const {flag} = this.props;
    let content;

    if(flag === 1){
      content = (
        <div className="row">
          <div className="col-md-12 m-auto">
            <Spinner />
          </div>
        </div>
      );
    }else if(flag===2){
      content= (
        <div className="row text-center">
          <div class="col-md-12">
          <h3 className="mb-4">You need to have profile created first</h3>
            <Link className="btn btn-large btn-info" to="/createProfile">
              Create Profile
            </Link>
          </div>
        </div>
      );
    }

    return (
      
      <div>
        {content}
      </div>
    )
  }
}

export default  Check;    