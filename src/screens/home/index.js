import { Component } from "react";
import color from "color";
import FastAverageColor from "fast-average-color";
import anime from "animejs";
import { Transition } from "react-transition-group";

const fac = new FastAverageColor();

const duration = 400;

const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const wrapper = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  display: "flex",
};

const record = background => ({
  position: "absolute",
  borderRadius: "100%",
  background: `radial-gradient(circle, ${color(background)
    .lighten(4)
    .hex()},  ${background})`,
  width: "200vw",
  height: "200vw",
  transform: "translateX(50vw)",
  alignSelf: "center",
  transition: "all ${duration}ms ease",
  boxShadow: "0 0 4vw 0 rgba(0,0,0,.2)",
});

const image = {
  left: "10vw",
  width: "30vw",
  height: "30vw",
  background: "#888",
  boxShadow: "0 0 1vw 0 rgba(0,0,0,.4)",
  objectFit: "cover",
  position: "absolute",
};

const transitions = {
  entering: 90,
  entered: 0,
  exiting: -90,
  exited: -90,
};

const rotatingWrapper = transitionState => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  transform: `rotate(${transitions[transitionState]}deg)`,
  transition: `all ${
    transitionState === "exited" || transitionState === "entering" ? 0 : 400
  }ms ease`,
  display: "flex",
  alignItems: "center",
});

export class Home extends Component {
  state = {
    url: null,
    loaded: false,
    background: "rgba(100,100,100,1)",
  };

  handleOnLoad = () => {
    this.setState(
      {
        loaded: true,
      },
      () => {
        const background = {
          value: this.state.background,
        };

        anime({
          targets: background,
          value: fac.getColor(this.imgElem).rgba,
          round: 1,
          easing: "easeInOutQuad",
          duration: duration,
          update: function() {
            this.setState({
              background: background.value,
            });
          }.bind(this),
        });
      },
    );
  };

  handleOnClick = () =>
    this.setState(
      {
        loaded: false,
      },
      () =>
        setTimeout(() => {
          this.setState({
            url: `http://unsplash.it/${getRandomInt(100, 900)}/${getRandomInt(
              100,
              900,
            )}`,
          });
        }, duration),
    );

  render() {
    return (
      <div css={wrapper}>
        <div css={record(this.state.background)}>
          <Transition
            in={this.state.url && this.state.loaded}
            timeout={{ enter: 0, exit: duration }}
          >
            {transitionState => {
              return (
                <div css={rotatingWrapper(transitionState)}>
                    <img
                      ref={imgElem => {
                        this.imgElem = imgElem;
                      }}
                      css={image}
                      src={this.state.url}
                      crossOrigin="Anonymous"
                      onLoad={this.handleOnLoad}
                    />
                </div>
              );
            }}
          </Transition>
        </div>
        <div
          css={{
            flex: "0 0 50%",
          }}
        ></div>
        <div
          css={{
            flex: "0 0 50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <h1
            css={{
              fontFamily: "Arvo, serif",
              fontSize: "10rem",
              position: "absolute",
              bottom: "-2rem",
              right: 0,
              mixBlendMode: "screen",
              color: "lightgrey",
            }}
            onClick={this.handleOnClick}
          >
            1968
          </h1>
        </div>
      </div>
    );
  }
}
