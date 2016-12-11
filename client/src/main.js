var React = require('react');
var ReactDom = require('react-dom');
require('whatwg-fetch');

var getMessages = function() {
    return fetch('https://11jf5hsmvi.execute-api.ap-northeast-1.amazonaws.com/production/messages')
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            return json;
        });
};

var postMessage = function () {
    return fetch('https://11jf5hsmvi.execute-api.ap-northeast-1.amazonaws.com/production/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({color:'yellow', message: 'いる?'})
    });
};

var MessageBox = React.createClass({
    getInitialState: function() {
        return {
            messages: [],
        };
    },
    postPing() {
        var _self = this;
        postMessage().then(function(response) {
            _self.getMessages();
        }) ;
    },
    getMessages() {
        var _self = this;
        getMessages().then(function(messages) {
            _self.setState({messages: messages});
        });
    },
    componentDidMount: function() {
        this.getMessages();
    },
    render: function() {
        return (
            <div>
                <img id="js-image" class="darkness img-responsive" src="img/ajito.jpg"></img>

                <table className='table'>
                    <thead>
                      <tr>
                        <th>status</th>
                        <th>date</th>
                        <th>username</th>
                        <th>message</th>
                      </tr>
                    </thead>

                    <tbody>
                        { this.state.messages.map((message, index) => (
                            <tr>
                                <th><img src={'img/signal/' + message.status + '.png'}></img></th>
                                <td>{message.created_at}</td>
                                <td>{message.user}</td>
                                <td>{message.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p onClick={ this.postPing }>PING</p>
            </div>
        )
    }
});

ReactDom.render(
    <MessageBox/>,
    document.querySelector('#js-content')
);
