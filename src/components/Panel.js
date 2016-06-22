import React, { Component } from 'react';
import TweenMax from 'gsap';
import Hammer from 'hammerjs';
import c from 'classnames';
import _ from 'lodash';

export default class Panel extends Component {

  animations = [];

  state = {
    opened: false,
    above: false,
    wrapperInitialPosX: 0,
    wrapperPosX: 0
  };

  items = [];

  componentWillReceiveProps(nextProps) {
    this.animate(nextProps);
  }

  componentDidMount() {
    this.animate(this.props);

    this.mc = new Hammer(this.wrapper);
    this.mc.on('pan', ({deltaX}) => {
      this.setState({
        wrapperPosX: this.state.wrapperInitialPosX + deltaX
      })
    });
    this.mc.on('panend', () => {
      this.setState({
        wrapperInitialPosX: this.state.wrapperPosX
      });
    })
  }

  animate = (props) => {
    const { open, direction } = props;

    this.killAnimations(this.animations);

    if (open) {
      this.onEnter(direction);
    } else {
      this.onLeave(direction);
    }
  }

  killAnimations = (animations) => {
    animations.map(anim => {
      if(_.isArray(anim)) {
        this.killAnimations(anim);
      } else {
        anim.kill();
      }
    });
  }

  slideOnOpen = () => new Promise(resolve => {
    this.setState({
      opened: true,
      above: true,
    });
    this.animations.push(TweenMax
      .fromTo(this.bg, .5, {
        y: window.innerHeight,
        scale: 1,
        opacity: 1
      }, {
        y: 0,
        scale: 1,
        opacity: 1,
        onComplete: resolve.bind(this)
      }));
  });

  scaleOnOpen = () => new Promise(resolve => {
    this.setState({
      opened: true,
      above: false,
    });
    this.animations.push(TweenMax
      .fromTo(this.bg, .3, {
        y: 0,
        scale: .8,
        opacity: .5
      }, {
        y: 0,
        scale: 1,
        opacity: 1,
        onComplete: resolve.bind(this)
      }));
  });

  scaleDownToClose = () => new Promise(resolve => {
    this.setState({
      above: false
    });
    this.animations.push(TweenMax
      .fromTo([this.bg, this.content], .7, {
        y: 0,
        scale: 1,
        opacity: 1
      }, {
        y: 0,
        scale: .8,
        opacity: .5,
        onComplete: resolve.bind(this)
      }));
  });

  slideToClose = () => new Promise(resolve => {
    this.setState({
      above: true
    });
    this.animations.push(TweenMax
      .fromTo([this.bg, this.content], .7, {
        y: 0,
        scale: 1,
        opacity: 1
      }, {
        y: window.innerHeight,
        scale: 1,
        opacity: .8,
        onComplete: resolve.bind(this)
      }));
  });

  onEnter = (direction) => {
    if(direction === 'up') {
      this.slideOnOpen().then(this.onOpenComplete);
    } else {
      this.scaleOnOpen().then(this.onOpenComplete);
    }
  }

  onOpenComplete = () => {
    const { handleAnimatingEnd } = this.props;
    const visibleChildren = _.take(this.wrapper.children, 8);
    const restChildren = _.takeRight(this.wrapper.children, 12);

    _.each(restChildren, child => child.style.opacity = 1);

    this.animations.push(TweenMax.staggerFromTo(visibleChildren, .2, {
      y: 10,
      opacity: 0
    }, {
      y: 0,
      opacity: 1
    }, .1, () => handleAnimatingEnd()));
  }

  onLeave = (direction) => {
    if(direction === 'up') {
      this.scaleDownToClose().then(this.onLeaveComplete);
    } else {
      this.slideToClose().then(this.onLeaveComplete);
    }
  }

  onLeaveComplete = () => {
    this.bg.style = null;
    this.content.style = null;

    _.each(this.wrapper.children, child => child.style = null);

    this.setState({
      opened: false,
      wrapperInitialPosX: 0,
      wrapperPosX: 0
    });
  }

  render() {
    
    const { opened, above, wrapperPosX } = this.state;
    const className = c('panel', {
      'panel--opened': opened,
      'panel--above': above
    });
    
    return (
      <section className={className} ref={ref => this.panel = ref}>
        <div className="bg" ref={ref => this.bg = ref}></div>
        <div className="content" ref={ref => this.content = ref}>
          <div className="wrapper" ref={ref => this.wrapper = ref} style={{ transform: `translateX(${wrapperPosX}px)` }}>
            {_.range(20).map((i) => (
              <div className="item" key={i}>
                <div className="item__content">{i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  componentWillUnmount() {
    this.killAnimations(this.animations);
  }
}
