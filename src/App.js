import React, { Component, Fragment } from 'react';

import './App.css';
import SearchView from './SearchView';
import CityView from './CityView';
import LangView from './LangView';
import StarView from './StarView';
import CompanyView from './CompanyView';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'city',
      data: null,
      selectedUser: null
    };
  }

  componentDidMount() {
    fetch('/api/gh/summary')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetch summary');
        }
        return res.json();
      })
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleChangeCity = () => {
    this.setState({
      view: 'city'
    });
  };

  handleChangeLang = () => {
    this.setState({
      view: 'lang'
    });
  };

  handleChangeStar = () => {
    this.setState({
      view: 'star'
    });
  };

  handleChangeCompany = () => {
    this.setState({
      view: 'company'
    });
  };

  handleClick = u => {
    window.location.href = '#searchView';
    this.setState({
      selectedUser: u
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header" id="heading">
          <h1>GitCard</h1>
          <p className="App-p">
            Discover awesome Open-source dev from <strong>Indonesia</strong>
          </p>
        </header>
        <div className="Container">
          <div className="Tab-container flex mt2 mb2">
            <div
              className={'Tab ' + (this.state.view === 'city' ? 'active' : '')}
              onClick={this.handleChangeCity}
            >
              by City
            </div>
            <div
              className={'Tab ' + (this.state.view === 'lang' ? 'active' : '')}
              onClick={this.handleChangeLang}
            >
              by Language
            </div>
            <div
              className={'Tab ' + (this.state.view === 'star' ? 'active' : '')}
              onClick={this.handleChangeStar}
            >
              by Stars
            </div>
            <div
              className={
                'Tab ' + (this.state.view === 'company' ? 'active' : '')
              }
              onClick={this.handleChangeCompany}
            >
              by Company
            </div>
          </div>
          {this.state.data !== null ? (
            <Fragment>
              <LangView
                onClick={this.handleClick}
                data={this.state.data}
                display={this.state.view === 'lang'}
              />
              <CityView
                onClick={this.handleClick}
                data={this.state.data}
                display={this.state.view === 'city'}
              />
              <StarView
                onClick={this.handleClick}
                data={this.state.data}
                display={this.state.view === 'star'}
              />
              <CompanyView
                onClick={this.handleClick}
                data={this.state.data}
                display={this.state.view === 'company'}
              />
            </Fragment>
          ) : (
            <div>
              Data is being prepared, please revisit after some minutes.
            </div>
          )}
        </div>
        <div className="Search-container">
          <SearchView selectedUser={this.state.selectedUser} />
        </div>
        <footer className="App-footer">
          <div>
            *If you're an Indonesian but living abroad, you can add "Indonesia"
            next to your profile's "Location" so you can also be queried!
          </div>
          <div>
            *GitHub API has rate limit, so if you get empty result, please
            revisit after a minute.
          </div>
          <div>
            *You can contribute at{' '}
            <a
              rel="noopener noreferrer"
              href="https://github.com/antonybudianto/gitcard"
            >
              github.com/antonybudianto/gitcard
            </a>
          </div>
          <div>
            <br /> &copy; {new Date().getFullYear()}. Antony Budianto.
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
