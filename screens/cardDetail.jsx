import React, { Component, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  Textarea,
  View,
  StyleSheet,
  StatusBar,
  InteractionManager,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import CardsService from "../services/cardsService";
let cardsService = new CardsService();

class cardDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: {
        title: "",
        status: "",
        desc: "",
        one_signal: ""
      }
    };

    // this.getUser().then(user => {
    //   if (user != null) {
    //     this.props.navigation.navigate("Dashboard", {
    //       user: JSON.parse(user)
    //     });
    //   }
    // });
  }

  componentDidMount() {
    this.setState({
      cardData: this.props.card
    });
  }

  handleInputChange = (target, value) => {
    this.setState(prevState => ({
      cardData: {
        ...prevState.cardData,
        [target]: value
      }
    }));
  };

  saveCard = () => {
    cardsService
      .createCard(this.state.cardData)
      .then(response => {
        alert("Novo card criado!");
        this.props.loadCards();
      })
      .catch(error => {
        alert("Erro ao criar o card!");
        console.log(error);
      });
  };

  deleteCard = () => {
    cardsService
      .deleteCard(this.state.cardData)
      .then(response => {
        alert("Card deletado!");
        this.props.loadCards();
      })
      .catch(error => {
        alert("Erro ao deletar o card!");
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={StyleSheet.header}>
          <Text style={StyleSheet.headerText}>Detalhes do card</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.inputField}>
            <TextInput
              autoCapitalize="title"
              placeholder="Título"
              value={this.state.cardData.title}
              onChangeText={text => this.handleInputChange("title", text)}
            />
          </View>
          <View style={styles.inputArea}>
            <TextInput
              multiline={true}
              autoCapitalize="desc"
              placeholder="Descrição"
              value={this.state.cardData.desc}
              onChangeText={text => this.handleInputChange("desc", text)}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.props.cancelCardDetail}
          >
            <Text>Cancelar</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.deleteButton}
            onPress={this.deleteCard}
          >
            <Text>Deletar</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default cardDetail;

const styles = StyleSheet.create({
  main: {
    minHeight: "100%",
    minWidth: "100%",
    paddingTop: 40,
    alignItems: "stretch",
    flexDirection: "column"
  },

  body: {
    flex: 9,
    justifyContent: "space-around"
  },

  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30
  },

  button: {
    width: "40%",
    height: "60%",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center"
  },

  deleteButton: {
    width: "40%",
    height: "60%",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "red"
  },

  inputField: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    height: 40
  },

  inputArea: {
    height: 180,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10
  },

  headerText: {
    fontSize: 100,
    fontWeight: "bold"
  }
});
