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

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = { temperature: '', status: '' };
    }

    async componentDidMount() {
        await this.getRoomInformation();
    }

    async getRoomInformation() {
        const result = await service.getCurrentStatus();
        console.log("here");
        await this.setState({ temperature: result.temperature, status: result.status });
        console.log(JSON.stringify(this.state))
    }

    async toggleAcStatus() {
        let response;
        if (this.status == 'on') {
            response = await service.togglePower('off');
            await this.setState({ status: response.status });
        } else {
            response = await service.togglePower('on');
            await this.setState({ status: response.status });
        }
    }

    render() {
        return (
            <View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Current Temperature</Text>
                    <Text style={styles.sectionDescription}>
                        {this.state.temperature}
                    </Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Current State</Text>
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
        marginRight: 60,
        marginLeft: 40,
        marginTop: 30,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#FFB612',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFB612'
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center"

    },
});

export default HomeScreen;