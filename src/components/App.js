import React, { Component } from 'react';
import Panel from './Panel';
import Nav from './Nav';

export default class App extends Component {
  animating = false;

  state = {
    animating: false,
    direction: 'up',
    currentPanel: 0,
    deltaY: 0
  };

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
    this.fake.style.height = window.innerHeight * 5 + 'px';
  }

  onScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const scrollPageTop = document.body.scrollTop % window.innerHeight;
    const middlePage = window.innerHeight / 2;
    const currentPos = document.body.scrollTop / window.innerHeight;
    const currentPanel = scrollPageTop < middlePage ? Math.floor(currentPos) : Math.ceil(currentPos);

    if(currentPanel !== this.state.currentPanel) {
      this.setState({
        direction: currentPanel < this.state.currentPanel ? 'up' : 'down',
        currentPanel: currentPanel
      });
      document.body.scrollTop = currentPanel * window.innerHeight;
    }
  }

  onChangePanel = (panelIndex) => {
    this.setState({
      currentPanel: panelIndex,
      direction: 'up'
    });
    document.body.scrollTop = panelIndex * window.innerHeight;
  }

  onAnimatingEnd = () => {
    this.animating = false;
  }

  render() {
    const { currentPanel, direction, deltaY } = this.state;
    const currentPanelIndex = Math.abs(currentPanel);
    return (
      <div>
        <div ref={ref => this.fake = ref}></div>
        <div className="container">
          <Nav handleChangePanel={this.onChangePanel} currentPanelIndex={currentPanelIndex}/>
          <div className="panels">
            <Panel open={0 === currentPanelIndex} direction={direction} deltaY={deltaY} handleAnimatingEnd={this.onAnimatingEnd} title="Live"/>
            <Panel open={1 === currentPanelIndex} direction={direction} deltaY={deltaY} handleAnimatingEnd={this.onAnimatingEnd} title="A la Une"/>
            <Panel open={2 === currentPanelIndex} direction={direction} deltaY={deltaY} handleAnimatingEnd={this.onAnimatingEnd} title="Ma selection"/>
            <Panel open={3 === currentPanelIndex} direction={direction} deltaY={deltaY} handleAnimatingEnd={this.onAnimatingEnd} title="Category A"/>
            <Panel open={4 === currentPanelIndex} direction={direction} deltaY={deltaY} handleAnimatingEnd={this.onAnimatingEnd} title="Category B"/>
          </div>
        </div>
      </div>
    );
  }
}
