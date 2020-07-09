import React from 'react';
import { Text } from 'react-native';
const configJson = require('../appsettings.json');
const apiUrl = configJson.APIUrl;

export default class PiService {

  async getCurrentStatus() {
    return fetch(`${apiUrl}status`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        return { temperature: 0.0, status: 'n/a', humidity: 0.0, error: true }
      });
  }


  togglePower(onOrOff) {
    const url = onOrOff == 'on' ? `${apiUrl}on` : `${apiUrl}off`
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  }

}
