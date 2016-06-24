import React, { Component } from 'react';
import Panel from './Panel';
import Nav from './Nav';

export default class App extends Component {
  animating = false;

  state = {
    animating: false,
    direction: 'up',
    currentPanel: 0,
    scrollPageTop: 0
  };

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
    this.fake.style.height = window.innerHeight * 5 + 'px';
  }

  onScroll = (e) => {
    const scrollPageTop = document.body.scrollTop % window.innerHeight;
    const middlePage = window.innerHeight / 2;
    const currentPos = document.body.scrollTop / window.innerHeight;
    const currentPanel = scrollPageTop < middlePage ? Math.floor(currentPos) : Math.ceil(currentPos);

    if(currentPanel !== this.state.currentPanel) {
      this.setState({
        direction: currentPanel > this.state.currentPanel ? 'up' : 'down',
        currentPanel
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
    const { currentPanel, direction, scrollPageTop } = this.state;
    const currentPanelIndex = Math.abs(currentPanel);
    return (
      <div>
        <div ref={ref => this.fake = ref}></div>
        <div className="container">
          <Nav handleChangePanel={this.onChangePanel} currentPanelIndex={currentPanelIndex}/>
          <div className="panels">
            <Panel index={0} currentPanelIndex={currentPanelIndex} direction={direction} scrollPageTop={scrollPageTop} handleAnimatingEnd={this.onAnimatingEnd} title="Live"/>
            <Panel index={1} currentPanelIndex={currentPanelIndex} direction={direction} scrollPageTop={scrollPageTop} handleAnimatingEnd={this.onAnimatingEnd} title="A la Une"/>
            <Panel index={2} currentPanelIndex={currentPanelIndex} direction={direction} scrollPageTop={scrollPageTop} handleAnimatingEnd={this.onAnimatingEnd} title="Ma selection"/>
            <Panel index={3} currentPanelIndex={currentPanelIndex} direction={direction} scrollPageTop={scrollPageTop} handleAnimatingEnd={this.onAnimatingEnd} title="Category A"/>
            <Panel index={4} currentPanelIndex={currentPanelIndex} direction={direction} scrollPageTop={scrollPageTop} handleAnimatingEnd={this.onAnimatingEnd} title="Category B"/>
          </div>
        </div>
      </div>
    );
  }
}
