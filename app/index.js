var React = require('react');
var ReactDOM = require('react-dom');

var data0 = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var SearchBox = React.createClass({
  callCallback: function() {
    /* ref help in accessing the virtualDOM: http://jamesknelson.com/react-js-by-example-interacting-with-the-dom/ */
    this.props.callback( this.refs.one.value, this.refs.two.checked );
  },
  render: function() {
    return (
      <div className="searchBox">
      <input type="text" value={this.props.term} placeholder="search0 ..." ref="one" onChange={this.callCallback} /><br />
      <input type="checkbox" checked={this.props.stockOnly} ref="two" onChange={this.callCallback} /> {"only show in stock"}
      <hr />
      </div>
    );
  }
});

var Category = React.createClass({
  render: function() {
    return (
      <tr><th colSpan="4">{this.props.name}</th></tr>
    );
  }
});

var Item = React.createClass({
  render: function() {
    var name = this.props.prod.stocked ? this.props.prod.name : <span style={{color: 'red'}}>{this.props.prod.name}</span>;
    return (
      <tr>
  	<td>{name}</td>
        <td>{this.props.prod.price}</td>
      </tr>
    );
  }
});
      
var Table = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    var term = this.props.term.toLowerCase();/* case insensitive search implementation */
    this.props.data2.forEach(function(product) {
      if ((product.name.toLowerCase().indexOf(term) === -1) ||
	  (product.stocked === false && this.props.stockOnly === true)) {
	return;
      }
      
      if (lastCategory != product.category) {
	rows.push(<Category name={product.category} key={product.category}/>);
      }
      lastCategory = product.category;
      rows.push(<Item prod={product} key={product.name}/>);
    }.bind(this));
    
    return (
      <div className="table">
	<table>
	  <thead>
	    <tr>
	      <th>Name</th>
	      <th>Price</th>
	    </tr>
	  </thead>
	  <tbody>
	    {rows}
	  </tbody>
	  
	</table>
      </div>
    );
  }
});

/* state & state-change resides only in below class */
var EntireWindow = React.createClass({
  getInitialState: function() {
    return {
      term: '',
      stockOnly: false
    };
  },
  callback2search: function(term0, stockOnly0) {
    this.setState({
      term: term0,
      stockOnly: stockOnly0
    });
  },
  render: function() {
    return (
      <div className="entireWindow">
	<SearchBox
	   term={this.state.term}
	   stockOnly={this.state.stockOnly}
	   callback={this.callback2search}
	   />
	<Table
	   data2={this.props.data}
	   term={this.state.term}
	   stockOnly={this.state.stockOnly}
	   />
      </div>
    );
  }
});


ReactDOM.render(
  <EntireWindow data={data0}/>,
  document.getElementById('app')
);

