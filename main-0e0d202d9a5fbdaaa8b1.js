webpackJsonp([1],{146:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}var o=t(50),l=a(o),i=t(215),r=t(147),u=a(r);t(198),(0,i.render)(l.default.createElement(u.default,null),document.getElementById("app"))},147:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t(51),l=a(o),i=t(52),r=a(i),u=t(53),s=a(u),c=t(55),d=a(c),f=t(54),p=a(f),m=t(50),h=a(m),v=t(149),g=a(v),y=t(148),w=a(y),E=function(e){function n(){var e,t,a,o;(0,r.default)(this,n);for(var i=arguments.length,u=Array(i),s=0;s<i;s++)u[s]=arguments[s];return t=a=(0,d.default)(this,(e=(0,l.default)(n)).call.apply(e,[this].concat(u))),a.animating=!1,a.state={animating:!1,direction:"up",currentPanel:0,scrollPageTop:0},a.onScroll=function(e){var n=document.body.scrollTop%window.innerHeight,t=window.innerHeight/2,o=document.body.scrollTop/window.innerHeight,l=n<t?Math.floor(o):Math.ceil(o);l!==a.state.currentPanel&&(a.setState({direction:l>a.state.currentPanel?"up":"down",currentPanel:l}),document.body.scrollTop=l*window.innerHeight)},a.onChangePanel=function(e){a.setState({currentPanel:e,direction:"up"}),document.body.scrollTop=e*window.innerHeight},a.onAnimatingEnd=function(){a.animating=!1},o=t,(0,d.default)(a,o)}return(0,p.default)(n,e),(0,s.default)(n,[{key:"componentDidMount",value:function(){document.addEventListener("scroll",this.onScroll),this.fake.style.height=5*window.innerHeight+"px"}},{key:"render",value:function(){var e=this,n=this.state,t=n.currentPanel,a=n.direction,o=n.scrollPageTop,l=Math.abs(t);return h.default.createElement("div",null,h.default.createElement("div",{ref:function(n){return e.fake=n}}),h.default.createElement("div",{className:"container"},h.default.createElement(w.default,{handleChangePanel:this.onChangePanel,currentPanelIndex:l}),h.default.createElement("div",{className:"panels"},h.default.createElement(g.default,{index:0,currentPanelIndex:l,direction:a,scrollPageTop:o,handleAnimatingEnd:this.onAnimatingEnd,title:"Live"}),h.default.createElement(g.default,{index:1,currentPanelIndex:l,direction:a,scrollPageTop:o,handleAnimatingEnd:this.onAnimatingEnd,title:"A la Une"}),h.default.createElement(g.default,{index:2,currentPanelIndex:l,direction:a,scrollPageTop:o,handleAnimatingEnd:this.onAnimatingEnd,title:"Ma selection"}),h.default.createElement(g.default,{index:3,currentPanelIndex:l,direction:a,scrollPageTop:o,handleAnimatingEnd:this.onAnimatingEnd,title:"Category A"}),h.default.createElement(g.default,{index:4,currentPanelIndex:l,direction:a,scrollPageTop:o,handleAnimatingEnd:this.onAnimatingEnd,title:"Category B"}))))}}]),n}(m.Component);n.default=E},148:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t(51),l=a(o),i=t(52),r=a(i),u=t(53),s=a(u),c=t(55),d=a(c),f=t(54),p=a(f),m=t(50),h=a(m),v=t(109),g=a(v),y=t(115),w=(a(y),function(e){function n(){var e,t,a,o;(0,r.default)(this,n);for(var i=arguments.length,u=Array(i),s=0;s<i;s++)u[s]=arguments[s];return t=a=(0,d.default)(this,(e=(0,l.default)(n)).call.apply(e,[this].concat(u))),a.nav=["Live","A la une","Ma selection","Category A","Category B"],o=t,(0,d.default)(a,o)}return(0,p.default)(n,e),(0,s.default)(n,[{key:"render",value:function(){var e=this.props,n=e.handleChangePanel,t=e.currentPanelIndex,a=this.nav.map(function(e,a){return h.default.createElement("li",{className:(0,g.default)("nav__item",{"nav__item--active":a===t}),onClick:function(){return n(a)},key:a},h.default.createElement("span",null,e))});return h.default.createElement("nav",{className:"nav"},h.default.createElement("ul",null,a))}}]),n}(m.Component));n.default=w},149:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t(157),l=a(o),i=t(154),r=a(i),u=t(51),s=a(u),c=t(52),d=a(c),f=t(53),p=a(f),m=t(55),h=a(m),v=t(54),g=a(v),y=t(50),w=a(y),E=t(213),P=a(E),x=t(214),C=a(x),b=t(109),A=a(b),I=t(115),O=a(I),T=function(e){function n(){var e,t,a,o;(0,d.default)(this,n);for(var i=arguments.length,u=Array(i),c=0;c<i;c++)u[c]=arguments[c];return t=a=(0,h.default)(this,(e=(0,s.default)(n)).call.apply(e,[this].concat(u))),a.animations=[],a.state={opened:!1,above:!1,wrapperInitialPosX:0,wrapperPosX:0,bgPosX:0},a.items=[],a.onScroll=function(){var e=document.body.scrollTop%window.innerHeight,n=a.props.index===a.props.currentPanelIndex;0!==e&&(e<=window.innerHeight/2?(n&&(a.panel.style.transform="scale("+(1-e/window.innerHeight*.1)+")"),a.isNextPanel()&&(a.setState({above:!0}),a.panel.style.transform="translateY("+(window.innerHeight-e)+"px)")):(n&&(a.panel.style.transform="translateY("+(window.innerHeight-e)+"px)"),a.isPreviousPanel()&&(a.panel.style.transform="scale("+(1-e/window.innerHeight*.1)+")")))},a.animate=function(e){var n=e.currentPanelIndex,t=e.index,o=e.direction;a.killAnimations(a.animations),n===t?a.onEnter(o):a.props.index===a.props.currentPanelIndex&&a.onLeave(o)},a.isNextPanel=function(){return a.props.index===a.props.currentPanelIndex+1},a.isPreviousPanel=function(){return a.props.index===a.props.currentPanelIndex-1},a.killAnimations=function(e){e.map(function(e){O.default.isArray(e)?a.killAnimations(e):e.kill()})},a.slideOnOpen=function(){return new r.default(function(e){a.setState({opened:!0,above:!0}),a.animations.push(P.default.fromTo(a.panel,1,{y:window.innerHeight/2,scale:1,opacity:1,z:.1,force3D:!0,ease:E.Expo.easeOut},{y:0,scale:1,opacity:1,z:.1,force3D:!0,ease:E.Expo.easeOut,onComplete:e.bind(a)}))})},a.scaleOnOpen=function(){return new r.default(function(e){a.setState({opened:!0,above:!1}),a.animations.push(P.default.fromTo(a.panel,.5,{y:0,scale:.95,opacity:1,z:.1,force3D:!0,ease:E.Expo.easeIn},{y:0,scale:1,opacity:1,z:.1,force3D:!0,ease:E.Expo.easeIn,onComplete:e.bind(a)}))})},a.slideToClose=function(){return new r.default(function(e){a.setState({above:!0}),a.animations.push(P.default.fromTo(a.panel,1,{y:window.innerHeight/2,scale:1,opacity:1,z:.1,force3D:!0,ease:E.Expo.easeOut},{y:window.innerHeight,scale:1,opacity:1,ease:E.Expo.easeOut,z:.1,force3D:!0,onComplete:e.bind(a)}))})},a.scaleDownToClose=function(){return new r.default(function(e){a.setState({above:!1}),a.animations.push(P.default.fromTo(a.panel,1,{y:0,scale:1,opacity:1,z:.1,force3D:!0,ease:E.Expo.easeOut},{y:0,scale:.95,opacity:1,ease:E.Expo.easeOut,z:.1,force3D:!0,onComplete:e.bind(a)}))})},a.onEnter=function(e){"up"===e?a.slideOnOpen().then(a.onOpenComplete):a.scaleOnOpen().then(a.onOpenComplete)},a.onOpenComplete=function(){var e=a.props.handleAnimatingEnd,n=O.default.take(a.wrapper.children,8),t=O.default.filter(n,function(e,n){return n%2===0}),o=O.default.filter(n,function(e,n){return n%2===1}),i=O.default.takeRight(a.wrapper.children,12);O.default.each(i,function(e){return e.style.opacity=1}),console.log("onOpenComplete"),a.animations.push(P.default.fromTo(a.title,.7,{opacity:0,ease:E.Expo.easeOut},{opacity:1,ease:E.Expo.easeOut})),a.animations.push(P.default.staggerFromTo([].concat((0,l.default)(t),(0,l.default)(o)),.7,{opacity:0,ease:E.Expo.easeIn},{opacity:1,ease:E.Expo.easeIn},.1,function(){console.log("staggerFromTo"),e()}))},a.onLeave=function(e){"up"===e?a.scaleDownToClose().then(a.onLeaveComplete):a.slideToClose().then(a.onLeaveComplete)},a.onLeaveComplete=function(){a.panel.style=null,a.bg.style=null,a.content.style=null,a.title.style=null,O.default.each(a.wrapper.children,function(e){return e.style=null}),a.setState({opened:!1,wrapperInitialPosX:0,wrapperPosX:0})},o=t,(0,h.default)(a,o)}return(0,g.default)(n,e),(0,p.default)(n,[{key:"componentWillReceiveProps",value:function(e){e.currentPanelIndex!==this.props.currentPanelIndex?(this.animate(e),document.addEventListener("scroll",this.onScroll)):document.removeEventListener("scroll",this.onScroll)}},{key:"componentDidMount",value:function(){var e=this;this.animate(this.props),this.mc=new C.default(this.wrapper),this.mc.on("pan",function(n){var t=n.deltaX;e.setState({wrapperPosX:e.state.wrapperInitialPosX+t})}),this.mc.on("panend",function(){e.setState({wrapperInitialPosX:e.state.wrapperPosX})})}},{key:"render",value:function(){var e=this,n=this.props.title,t=this.state,a=t.opened,o=t.above,l=t.wrapperPosX,i=(0,A.default)("panel",{"panel--opened":a,"panel--above":o});return w.default.createElement("section",{className:i,ref:function(n){return e.panel=n}},w.default.createElement("div",{className:"bg",ref:function(n){return e.bg=n}}),w.default.createElement("h1",{className:"title",ref:function(n){return e.title=n}},n),w.default.createElement("div",{className:"content",ref:function(n){return e.content=n}},w.default.createElement("div",{className:"wrapper",ref:function(n){return e.wrapper=n},style:{transform:"translateX("+l+"px)"}},O.default.range(20).map(function(e){return w.default.createElement("div",{className:"item",key:e},w.default.createElement("div",{className:"item__content"},e))}))))}},{key:"componentWillUnmount",value:function(){this.killAnimations(this.animations)}}]),n}(y.Component);n.default=T},198:function(e,n){},282:function(e,n,t){e.exports=t(146)}},[282]);