var React = require('react');
var ReactDom = require('react-dom');


var MessageBox = React.createClass({
    render: function() {
        return (
            <div>
                <h1>test</h1>
            </div>
        )
    }
});

ReactDom.render(
    <MessageBox />,
    document.querySelector('#js-content')
);
