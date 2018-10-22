// import React, { Component } from "react";
// import Spinner from "../common/Spinner";
// import { Link } from "react-router-dom";

// class PerformChecks extends Component {
//   render() {
//     const { profile, courses, loading } = this.props.data;

//     let coursesContent = false;

//     if (profile === null) {
//       coursesContent = (
//         <div className="col-md-12 m-auto">
//           <Spinner />
//         </div>
//       );
//     } else if (profile.noprofile) {
//       coursesContent = (
//         <div className="row text-center">
//           <div class="col-md-12">
//             <h3 className="mb-4">You need to have profile created first</h3>
//             <Link className="btn btn-large btn-info" to="/createProfile">
//               Create Profile
//             </Link>
//           </div>
//         </div>
//       );
//     }

//     console.log(coursesContent);

//     return <div>{coursesContent ? coursesContent : false}</div>;
//   }
// }

// export default PerformChecks;
