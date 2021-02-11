import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import CardsService from "./services/cardsService";
let cardsService = new CardsService();

export default class Draggable extends Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  checkDropedArea(gesture) {
    if (
      gesture.moveY > this.props.todoLayout.py &&
      gesture.moveY < this.props.todoLayout.py + this.props.todoLayout.height
    ) {
      return "todo";
    } else if (
      gesture.moveY > this.props.doingLayout.py &&
      gesture.moveY < this.props.doingLayout.py + this.props.doingLayout.height
    ) {
      return "doing";
    } else if (
      gesture.moveY > this.props.doneLayout.py &&
      gesture.moveY < this.props.doneLayout.py + this.props.doneLayout.height
    ) {
      return "done";
    } else {
      return "none";
    }
  }

  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));
    // Initialize PanResponder with move handling
    var that = this;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset(this.state.pan.__getValue());
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      onPanResponderRelease: (e, gesture) => {
        var droppedArea = this.checkDropedArea(gesture);
        if (
          (droppedArea == "todo" ||
            droppedArea == "doing" ||
            droppedArea == "done") &&
          this.props.card.status !== droppedArea
        ) {
          cardsService
            .updateCard(this.props.card, droppedArea)
            .then(response => {
              this.props.loadCards();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
        }
      }
    });
  }

  alerta() {
    alert("foi");
  }

  openDetail() {
    this.props.openDetail(this.props.card);
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.card]}
      >
        <TouchableHighlight onPress={() => this.openDetail()}>
          <Text>{this.props.card.title}</Text>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },

  card: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 5,
    height: 35,
    margin: 5
  }
});
