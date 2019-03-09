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
      options: []
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  makeAndHandleRequest(query) {
    return new Promise((resolve, reject) => {
      fetch(`https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1/cities?name=${query}`)
        .then(r => r.json())
        .then(result => {
          const cities = result.map(c => ({ name: c.name, location: c.coord }));
          resolve(cities);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  handleSearch(query) {
    this.setState({ isLoading: true });
    this.makeAndHandleRequest(query).then(options => {
      this.setState({
        isLoading: false,
        options
      });
    });
  }

  handleSelection (query) {
    if (query.length === 0) return;

    const selection = query[0];
    this.props.handleSelection(selection);
  }

  render() {
    return (
      <Fragment>
        <AsyncTypeahead
          {...this.state}
          useCache
          id="async-typeahead"
          labelKey="name"
          minLength={2}
          maxResults={30}
          onSearch={this.handleSearch}
          onChange={this.handleSelection}
          delay={300}
          inputProps={{
            spellCheck: false
          }}
          placeholder="Search for a Github user..."
          // renderMenuItemChildren={(option, props) => (
          //   <span key={option.id}>{option}</span>
          // )}
        />
      </Fragment>
    );
  }
}
