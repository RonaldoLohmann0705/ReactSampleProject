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

class newCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: {
        title: "",
        status: "",
        desc: "",
        one_signal: "",
        shared_emails: ""
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
      .createCard(this.state.cardData, this.props.id)
      .then(response => {
        alert("Novo card criado!");
        this.props.loadCards();
      })
      .catch(error => {
        alert("Erro ao criar o card!");
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={StyleSheet.header}>
          <Text style={StyleSheet.headerText}>Novo card</Text>
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
          <View style={styles.inputField}>
            <TextInput
              autoCapitalize="title"
              placeholder="Compartilhar"
              value={this.state.cardData.shared_emails}
              onChangeText={text => this.handleInputChange("shared_emails", text)}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableHighlight style={styles.button} onPress={this.saveCard}>
            <Text>Salvar</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={this.props.cancelNewCard}
          >
            <Text>Cancelar</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default newCard;

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
