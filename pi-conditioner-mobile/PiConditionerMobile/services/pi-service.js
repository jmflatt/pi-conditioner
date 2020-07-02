import React from 'react';
import { Text } from 'react-native';
const apiUrl = 'http://127.0.0.3/';

export default class PiService {
    
    async getCurrentStatus() {
        return {temperature: '30', status: 'off'};
        // return fetch(`${apiUrl}status`)
        //   .then((response) => response.json())
        //   .then((json) => {
        //     return json;
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }


      togglePower(onOrOff) {
          return {success: true};
        // const url = onOrOff == 'on' ? `${apiUrl}on` : `${apiUrl}off`
        // return fetch(url)
        //   .then((response) => response.json())
        //   .then((json) => {
        //     return json.success;
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }

}
