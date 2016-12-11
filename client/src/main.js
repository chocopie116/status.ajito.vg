var React = require('react');
var ReactDom = require('react-dom');
require('whatwg-fetch');

var COLOR_ASK = 'yellow';

var getMessages = function() {
    return fetch('https://11jf5hsmvi.execute-api.ap-northeast-1.amazonaws.com/production/messages')
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            return json;
        });
};

var postMessage = function (user, message) {
    return fetch('https://11jf5hsmvi.execute-api.ap-northeast-1.amazonaws.com/production/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({color:COLOR_ASK, user: user, message: message})
    });
};

var Application = React.createClass({
    getInitialState: function() {
        return {
            messages: [],
            status: 'yellow',
            whoami: '',
            message: '今どなたかいますか?'
        };
    },
    setWhoamiState: function(e) {
        this.setState({whoami: e.target.value});
    },
    setMessageState: function(e) {
        this.setState({message: e.target.value});
    },
    postPing: function () {
        var _self = this;
        postMessage(this.state.whoami, this.state.message).then(function(response) {
            _self.updateMessagesState();
        }) ;
    },
    updateImageState: function(statusColor) {
        this.setState({status: statusColor});
    },
    updateMessagesState: function() {
        var _self = this;
        getMessages().then(function(messages) {
            _self.setState({messages: messages});

            var latestMessageStatus = messages[0].status;
            _self.updateImageState(latestMessageStatus);
        });
    },
    componentDidMount: function() {
        this.updateMessagesState();
    },
    render: function() {
        return (
            <div>
                <img id="js-image" className={this.state.status + " img-responsive"} src="img/ajito.jpg"></img>

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
                            <tr key={index}>
                                <th><img src={'img/signal/' + message.status + '.png'}></img></th>
                                <td>{message.created_at}</td>
                                <td>{message.user}</td>
                                <td>{message.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="form-inline">
                  <div className="form-group">
                    <label>username　</label>
                    <input type="text" className="form-control" placeholder="whoami" value={ this.state.whoami } onChange={ this.setWhoamiState }></input>
                    </div>
                    <label>　message　</label>
                    <input type="text" className="form-control" placeholder="hello" value={ this.state.message } onChange={ this.setMessageState }></input>　
                    <button className="btn btn-default" onClick={ this.postPing }>PING</button>
                </div>

            </div>
        )
    }
});

ReactDom.render(
    <Application />,
    document.querySelector('#js-app')
);
