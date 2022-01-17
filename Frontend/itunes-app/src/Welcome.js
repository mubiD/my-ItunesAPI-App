import React from 'react';

// imported styles 
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function Welcome(){
    return(
        <div id="home" className="MainWelcome m-5">
            <h1 className="WelcomeH1">Let's interact with the iTunes API!</h1>
            <div className="WelcomeInfo">
                <h3>How does it work?</h3> 
                <p> To begin, the user inserts a keyword into the search bar. You then narrow the 
                    search down by selecting the type of media you're searching for using 
                    the dropdown. Once you are done, you can hit the submit button. This will then
                    trigger the 'GET' request in the backend which handles the interaction with the iTunes API.
                    Once the data is received on the backend from the iTunes API, the search results are then served from the backend. 
                    You will then be able to see the returned data in the results section of this page. You will also then be able to favorite specific
                    titles, as well as delete specific titles from the favorites list.
                </p>
                <h3>Tech stack used?</h3>
                <p>
                    JavaScript, React, Node, NPM, ReactBootstrap and CSS
                    <br></br>
                    Express, Helmet, Mocha and Chai</p>
            </div>
        </div>
    )
};

export default Welcome;
