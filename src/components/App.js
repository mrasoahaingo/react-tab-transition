import React, { Component } from 'react';
import Panel from './Panel';
import Nav from './Nav';

export default class App extends Component {
  animating = false;

  state = {
    animating: false,
    direction: 'up',
    currentPanel: 0
  };

  componentDidMount() {
    document.addEventListener('wheel', this.animate);
  }

  animate = (e) => {
    e.preventDefault();

    if(this.animating) {
      return;
    }

    this.animating = true;
    
    const { deltaY } = e;
    const currentPanel = deltaY > 0 ? this.state.currentPanel + 1 : this.state.currentPanel - 1;

    if(deltaY !== 0 ) {
      this.setState({
        direction: deltaY > 0 ? 'up' : 'down',
        currentPanel: currentPanel < 0 ? 4 : (currentPanel > 4 ? 0 : currentPanel)
      });
    }
  }

  onChangePanel = (panelIndex) => {
    this.setState({
      currentPanel: panelIndex,
      direction: 'up'
    });
  }

  onAnimatingEnd = () => {
    console.log('END', this.animating);
    this.animating = false;
  }

  render() {
    const { currentPanel, direction } = this.state;
    const currentPanelIndex = Math.abs(currentPanel);
    return (
      <div className="container">
        <Nav handleChangePanel={this.onChangePanel} currentPanelIndex={currentPanelIndex}/>
        <div className="panels">
          <Panel open={0 === currentPanelIndex} direction={direction} handleAnimatingEnd={this.onAnimatingEnd} title="Live"/>
          <Panel open={1 === currentPanelIndex} direction={direction} handleAnimatingEnd={this.onAnimatingEnd} title="A la Une"/>
          <Panel open={2 === currentPanelIndex} direction={direction} handleAnimatingEnd={this.onAnimatingEnd} title="Ma selection"/>
          <Panel open={3 === currentPanelIndex} direction={direction} handleAnimatingEnd={this.onAnimatingEnd} title="Category A"/>
          <Panel open={4 === currentPanelIndex} direction={direction} handleAnimatingEnd={this.onAnimatingEnd} title="Category B"/>
        </div>
      </div>
    );
  }
}
