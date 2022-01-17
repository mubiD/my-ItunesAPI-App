import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function ShowFavs(props){

    return(
        <div className="card bg-light m-3 p-3">
            <h2>{props.name}</h2>
        </div>
    )
}

export default ShowFavs;