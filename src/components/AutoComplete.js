import React, { Fragment } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class AsyncExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowNew: false,
      isLoading: false,
      multiple: false,
      options: [{name:'London'}],
    };

    this._handleSearch = this._handleSearch.bind(this);

  }

  makeAndHandleRequest () {
    debugger
    return new Promise((resolve, reject) => {
      resolve([{name: 'london'}])
    })
  }

  _handleSearch (query) {
    this.setState({isLoading: true});
    console.log('que')
    this.makeAndHandleRequest(query)
      .then((options) => {
        debugger
        this.setState({
          isLoading: false,
          options,
        });
      });
  }

  render() {
    return (
      <Fragment>
        <AsyncTypeahead
          // {...this.state}
          id="async-typeahead"
          // minLength={3}
          options={['one', 'two']}
          // onSearch={this._handleSearch}
          placeholder="Search for a Github user..."
          // renderMenuItemChildren={(option, props) => (
          //   <span key={option.id}>{option}</span>
          // )}
        />
      </Fragment>
    );
  }

 
}