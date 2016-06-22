import React, { Component } from 'react';
import c from 'classnames';
import _ from 'lodash';

export default class Nav extends Component {

  nav = [
    'Live',
    'A la une',
    'Ma selection',
    'Category A',
    'Category B',
  ];

  render() {

    const { handleChangePanel, currentPanelIndex } = this.props;
    const navItems = this.nav.map((item, i) => (
      <li className={c('nav__item', { 'nav__item--active': i === currentPanelIndex })}
          onClick={() => handleChangePanel(i)}
          key={i}>
        <span>{item}</span>
      </li>
    ));

    return (
      <nav className="nav">
        <ul>
          {navItems}
        </ul>
      </nav>
    );
  }
}
