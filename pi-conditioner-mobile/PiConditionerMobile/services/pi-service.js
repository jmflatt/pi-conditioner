import React from 'react';
import { Text } from 'react-native';
const apiUrl = 'http://192.168.1.94:3000/';

export default class PiService {
    
    async getCurrentStatus() {
        return fetch(`${apiUrl}status`)
          .then((response) => response.json())
          .then((json) => {
            return json;
          })
          .catch((error) => {
            console.error(error);
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
