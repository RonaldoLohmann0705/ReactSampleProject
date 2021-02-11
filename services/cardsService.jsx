import { AsyncStorage } from "react-native";
import axios from "axios";

class CardsService {
  getCards(id) {
    // const authHeader = `Bearer ${user.jwt}`;
    // const filter = `?unique_customer_id=${contactId}&per=${per}&page=${page}`;
    console.log("ID no SERVICE", id)
    return axios
      .get(`http://4aed22d3a6fc.ngrok.io/cards?id=${id}`)
      .then(result => {
        return result;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  updateCard(card, status) {
    // const authHeader = `Bearer ${user.jwt}`;
    // const filter = `?unique_customer_id=${contactId}&per=${per}&page=${page}`;
    card.status = status;
    return axios
      .put(`http://4aed22d3a6fc.ngrok.io/cards/${card.id}`, card)
      .then(result => {
        return result;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  createCard(card, id) {
    // const authHeader = `Bearer ${user.jwt}`;
    // const filter = `?unique_customer_id=${contactId}&per=${per}&page=${page}`;
    card.status = "todo";
    return axios
      .post(`http://4aed22d3a6fc.ngrok.io/cards?id=${id}`, card)
      .then(result => {
        return result;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  deleteCard(card) {
    // const authHeader = `Bearer ${user.jwt}`;
    // const filter = `?unique_customer_id=${contactId}&per=${per}&page=${page}`;
    return axios
      .delete(`http://4aed22d3a6fc.ngrok.io/cards/${card.id}`)
      .then(result => {
        return result;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}

export default CardsService;
