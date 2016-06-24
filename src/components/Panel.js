import React, { Component } from 'react';
import TweenMax, { Expo } from 'gsap';
import Hammer from 'hammerjs';
import c from 'classnames';
import _ from 'lodash';

export default class Panel extends Component {

  animations = [];

  state = {
    opened: false,
    above: false,
    wrapperInitialPosX: 0,
    wrapperPosX: 0,

    bgPosX: 0
  };

  items = [];

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentPanelIndex !== this.props.currentPanelIndex) {
      this.animate(nextProps);
      document.addEventListener('scroll', this.onScroll);
    } else {
      document.removeEventListener('scroll', this.onScroll);
    }
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
    });
  }

  onScroll = () => {
    const scrollPageTop = document.body.scrollTop % window.innerHeight;
    const isCurrent = this.props.index === this.props.currentPanelIndex;

    if(scrollPageTop === 0) {
      return;
    }

    if(scrollPageTop <= window.innerHeight / 2) {

      if (isCurrent) {
        this.panel.style.transform = 'scale(' + (1 - (scrollPageTop / window.innerHeight) * .1) + ')';
      }

      if (this.isNextPanel()) {
        this.setState({
          above: true
        });
        this.panel.style.transform = 'translateY(' + (window.innerHeight - scrollPageTop) + 'px)';
      }

    } else {

      if (isCurrent) {
        this.panel.style.transform = 'translateY(' + (window.innerHeight - scrollPageTop) + 'px)';
      }

      if (this.isPreviousPanel()) {
        this.panel.style.transform = 'scale(' + (1 - (scrollPageTop / window.innerHeight) * .1) + ')';
      }

    }
  }

  animate = (props) => {
    const { currentPanelIndex, index, direction } = props;

    this.killAnimations(this.animations);

    if (currentPanelIndex === index) {
      this.onEnter(direction);
    } else if(this.props.index === this.props.currentPanelIndex){
      this.onLeave(direction);
    }
  }

  isNextPanel = () => {
    return this.props.index === this.props.currentPanelIndex + 1;
  }

  isPreviousPanel = () => {
    return this.props.index === this.props.currentPanelIndex - 1;
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
      .fromTo(this.panel, 1, {
        y: window.innerHeight / 2,
        scale: 1,
        opacity: 1,
        z: 0.1,
        force3D: true,
        ease: Expo.easeOut
      }, {
        y: 0,
        scale: 1,
        opacity: 1,
        z: 0.1,
        force3D: true,
        ease: Expo.easeOut,
        onComplete: resolve.bind(this)
      }));
  });

  scaleOnOpen = () => new Promise(resolve => {
    this.setState({
      opened: true,
      above: false,
    });
    this.animations.push(TweenMax
      .fromTo(this.panel, .5, {
        y: 0,
        scale: .95,
        opacity: 1,
        z: 0.1,
        force3D: true,
        ease: Expo.easeIn
      }, {
        y: 0,
        scale: 1,
        opacity: 1,
        z: 0.1,
        force3D: true,
        ease: Expo.easeIn,
        onComplete: resolve.bind(this)
      }));
  });

  slideToClose = () => new Promise(resolve => {
    this.setState({
      above: true
    });
    this.animations.push(TweenMax
      .fromTo(this.panel, 1, {
        y: window.innerHeight / 2,
        scale: 1,
        opacity: 1,
        z: 0.1,
        force3D: true,
        ease: Expo.easeOut
      }, {
        y: window.innerHeight,
        scale: 1,
        opacity: 1,
        ease: Expo.easeOut,
        z: 0.1,
        force3D: true,
        onComplete: resolve.bind(this)
      }));
  });

  scaleDownToClose = () => new Promise(resolve => {
    this.setState({
      above: false
    });
    this.animations.push(TweenMax
      .fromTo(this.panel, 1, {
        y: 0,
        scale: 1,
        opacity: 1,
        z: 0.1,
        force3D: true,
        ease: Expo.easeOut
      }, {
        y: 0,
        scale: .95,
        opacity: 1,
        ease: Expo.easeOut,
        z: 0.1,
        force3D: true,
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
    const oddChildren = _.filter(visibleChildren, (child, i) => i % 2 === 0);
    const evenChildren = _.filter(visibleChildren, (child, i) => i % 2 === 1);
    const restChildren = _.takeRight(this.wrapper.children, 12);

    _.each(restChildren, child => child.style.opacity = 1);

    console.log('onOpenComplete');

    this.animations.push(TweenMax.fromTo(this.title, .7, {
      opacity: 0,
      ease: Expo.easeOut
    }, {
      opacity: 1,
      ease: Expo.easeOut
    }));

    this.animations.push(TweenMax.staggerFromTo([...oddChildren, ...evenChildren], .7, {
      opacity: 0,
      ease: Expo.easeIn
    }, {
      opacity: 1,
      ease: Expo.easeIn
    }, .1, () => {
      console.log('staggerFromTo');
      handleAnimatingEnd();
    }));
  }

  onLeave = (direction) => {
    if(direction === 'up') {
      this.scaleDownToClose().then(this.onLeaveComplete);
    } else {
      this.slideToClose().then(this.onLeaveComplete);
    }
  }

  onLeaveComplete = () => {
    this.panel.style = null;
    this.bg.style = null;
    this.content.style = null;
    this.title.style = null;

    _.each(this.wrapper.children, child => child.style = null);

    this.setState({
      opened: false,
      wrapperInitialPosX: 0,
      wrapperPosX: 0
    });
  }

  render() {
    const { title } = this.props;
    const { opened, above, wrapperPosX } = this.state;
    const className = c('panel', {
      'panel--opened': opened,
      'panel--above': above
    });
    
    return (
      <section className={className} ref={ref => this.panel = ref}>
        <div className="bg" ref={ref => this.bg = ref}></div>
        <h1 className="title" ref={ref => this.title = ref}>{title}</h1>
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
