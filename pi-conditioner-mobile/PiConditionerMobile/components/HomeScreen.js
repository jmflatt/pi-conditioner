import React from 'react';
import { Text, View, Image, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import PiService from '../services/pi-service';
const service = new PiService();
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import sqsService from '../services/sqs-service';
const sqs = new sqsService();

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = { temperature: '', tempCelc: '', status: '', humidity: '', error: false };
    }

    async componentDidMount() {
        await this.getRoomInformation();
    }

    async getRoomInformation() {
        const result = await service.getCurrentStatus();
        if (result.error) {
            await this.setState({ temperature: result.temperature, status: result.status, humidity: result.humidity, error: true });
        } else {
            const formattedTemp = (result.temperature * 9/5) + 32;
            await this.setState({ tempCelc: result.temperature, temperature: formattedTemp, status: result.status, humidity: result.humidity, error: false });
        }
    }

    async toggleAcStatus() {
        let response;
        if (this.state.status == 'on') {
            response = await service.togglePower('off');
            await this.setState({ status: response.status });
        } else {
            response = await service.togglePower('on');
            await this.setState({ status: response.status });
        }

    }

    async sendSQSMessageToQueue() {
        await sqs.sendSQSMessage(); 
    }

    render() {
        return (
            <View>
                {!this.state.error ?
                    <View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Current Temperature</Text>
                            <Text style={styles.sectionDescription}>
                                {this.state.temperature + '\u00b0' + ' Fahrenheit'}
                            </Text>                      
                            <Text style={styles.sectionDescription}>
                                ({this.state.tempCelc + '\u00b0' + ' Celcius'})
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Current Humidity</Text>
                            <Text style={styles.sectionDescription}>
                                {this.state.humidity + '%'}
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Current Status</Text>
                            <Text style={styles.sectionDescription}>
                                {this.state.status}
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <TouchableOpacity
                                style={styles.toggleACButton}
                                onPress={() => this.toggleAcStatus()}
                            >
                                <Text style={styles.buttonText}>{this.state.status == 'on' ? 'Turn AC Off' : 'Turn AC On'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sectionContainer}>
                            <TouchableOpacity
                                style={styles.toggleACButton}
                                onPress={() => this.getRoomInformation()}
                            >
                                <Text style={styles.buttonText}>Refresh AC Status</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Currently Not On the AC Network</Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <TouchableOpacity
                                style={styles.toggleACButton}
                                onPress={() => this.sendSQSMessageToQueue()}
                            >
                                <Text style={styles.buttonText}> Request Remote Status</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        textAlign: "center"
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
        textAlign: "center"
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    toggleACButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 30,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#79bd9d',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center"

    },
});

export default HomeScreen;