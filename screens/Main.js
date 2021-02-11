import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { getToken, setToken } from '../src/api/token';
import Modal from "react-native-modal";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  PanResponder,
  Animated,
  UIManager,
  findNodeHandle
} from "react-native";
import Draggable from "../Draggable";
import CardsService from "../services/cardsService";
import NewCard from "./newCard";
import CardDetail from "./cardDetail";

let cardsService = new CardsService();
export default class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.navigation.getParam('user'),
      pan: new Animated.ValueXY(),
      todoLayout: {},
      doingLayout: {},
      doneLayout: {},
      modalVisible: false,
      detailModalVisible: false,
      selectedCard: {}
    };

    this.loadCards();
  }

  logout() {
    setToken(null);
    navigation.navigate('Login');
  }

  setLayouts() {
    this.todoDrop.measure((fx, fy, width, height, px, py) => {
      this.setState({ todoLayout: { fx, fy, width, height, px, py } });
    });
    this.doingDrop.measure((fx, fy, width, height, px, py) => {
      this.setState({ doingLayout: { fx, fy, width, height, px, py } });
    });
    this.doneDrop.measure((fx, fy, width, height, px, py) => {
      this.setState({ doneLayout: { fx, fy, width, height, px, py } });
    });
  }

  cancelNewCard() {
    this.setState({ modalVisible: false });
  }

  cancelCardDetail() {
    this.setState({ detailModalVisible: false });
  }

  openNewCard() {
    this.setState({ modalVisible: true });
  }

  openDetail(card) {
    this.setState({ selectedCard: card });
    this.setState({ detailModalVisible: true });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setLayouts();
    }, 900);
  }

  loadCards() {
    this.setState({ modalVisible: false });
    this.setState({ detailModalVisible: false });
    cardsService
      .getCards(this.state.user.id)
      .then(response => {
        console.log("CARDS", response.data.cards);
        this.setState({ cards: response.data.cards });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const _ = require("lodash");
    const cards = this.state.cards;

    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Text style={styles.boardTitle}>{"Bem vindo " + this.state.user.login}</Text>
          <Button
            style={styles.newButton}
            title="Novo Card"
            onPress={() => this.openNewCard()}
          />
          <Button
            title="Sair"
            onPress={() => this.openNewCard()}
          />
        </View>

        <View style={styles.main}>
          <View style={styles.board} ref={ref => (this.todoDrop = ref)}>
            <Text style={styles.boardTitle}>Não Iniciado</Text>
            <View style={styles.cardsContainer}>
              {_.filter(cards, { status: "todo" }).map(i => {
                return (
                  <Draggable
                    card={i}
                    todoLayout={this.state.todoLayout}
                    doingLayout={this.state.doingLayout}
                    doneLayout={this.state.doneLayout}
                    loadCards={this.loadCards.bind(this)}
                    openDetail={this.openDetail.bind(this)}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.board} ref={ref => (this.doingDrop = ref)}>
            <Text style={styles.boardTitle}>Em Progresso</Text>
            <View style={styles.cardsContainer}>
              {_.filter(cards, { status: "doing" }).map(i => {
                return (
                  <Draggable
                    card={i}
                    todoLayout={this.state.todoLayout}
                    doingLayout={this.state.doingLayout}
                    doneLayout={this.state.doneLayout}
                    loadCards={this.loadCards.bind(this)}
                    openDetail={this.openDetail.bind(this)}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.board} ref={ref => (this.doneDrop = ref)}>
            <Text style={styles.boardTitle}>Encerrado</Text>
            <View style={styles.cardsContainer}>
              {_.filter(cards, { status: "done" }).map(i => {
                return (
                  <Draggable
                    card={i}
                    todoLayout={this.state.todoLayout}
                    doingLayout={this.state.doingLayout}
                    doneLayout={this.state.doneLayout}
                    loadCards={this.loadCards.bind(this)}
                    openDetail={this.openDetail.bind(this)}
                  />
                );
              })}
            </View>
          </View>
        </View>

        <Modal style={styles.modalView} visible={this.state.modalVisible}>
          <NewCard
            cancelNewCard={this.cancelNewCard.bind(this)}
            loadCards={this.loadCards.bind(this)}
            id={this.state.user.id}
          ></NewCard>
        </Modal>

        <Modal style={styles.modalView} visible={this.state.detailModalVisible}>
          <CardDetail
            card={this.state.selectedCard}
            cancelCardDetail={this.cancelCardDetail.bind(this)}
            loadCards={this.loadCards.bind(this)}
          ></CardDetail>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "column"
  },

  nav: {
    flexDirection: "row",
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 40,
    height: 80
  },

  main: {
    flex: 7,
    flexDirection: "column",
    alignItems: "center"
  },

  board: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    marginBottom: 8,
    marginTop: 8
  },

  boardTitle: {
    fontWeight: "bold",
    margin: 3,
    alignSelf: "center"
  },

  cardsContainer: {
    flex: 1,
    flexDirection: "row"
  },

  card: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 5,
    height: 35,
    margin: 5,
    flex: 0.1
  }
});
