import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import * as ApiService from '../services/api';

import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowNew: false,
      isLoading: false,
      multiple: false,
      options: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  makeAndHandleRequest(query) {
    return new Promise((resolve, reject) => {
      ApiService.getCities(query)
        .then((result) => {
          const cities = result.map((c) => ({
            name: c.name,
            location: c.coord,
            country: c.country,
          }));
          resolve(cities);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  handleSearch(query) {
    this.setState({ isLoading: true });
    this.makeAndHandleRequest(query).then((options) => {
      this.setState({
        isLoading: false,
        options,
      });
    });
  }

  handleSelection(query) {
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
          className={this.props.className}
          labelKey="name"
          minLength={2}
          maxResults={15}
          onSearch={this.handleSearch}
          onChange={this.handleSelection}
          delay={300}
          inputProps={{
            spellCheck: false,
          }}
          placeholder="Search for a city.."
          renderMenuItemChildren={(option) => (
            <span key={option.id}>{`${option.name} (${option.country})`}</span>
          )}
        />
      </Fragment>
    );
  }
}

AutoComplete.propTypes = {
  handleSelection: PropTypes.func,
  className: PropTypes.object,
};
