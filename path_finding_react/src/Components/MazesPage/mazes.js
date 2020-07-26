import React from 'react';
import {getCookie} from '../projectUtilities';


class Mazes extends React.Component {

	testRequest = (postData) => {
        fetch('http://127.0.0.1:8000/mazes/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
          },
          body: JSON.stringify(postData)
        })
        .then(data => data.json())
        .then(data => { console.log(data) })
        .catch(error => console.error(error))
    }

	render() {
	  return (
	    <div>
	    	Mazes page.
	    	<button onClick={ () => this.testRequest("Hello world") }>Send a request</button>
	    </div>
	  );
	}
}


export default Mazes;

