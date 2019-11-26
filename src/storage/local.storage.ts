import { Platform } from 'react-native';

declare var window: any;

class LocalStorage {

    public readonly storage: any;

    constructor() {
        if (Platform.OS === 'web') {
            this.storage = window.localStorage;
        } else {
            this.storage = require('@react-native-community/async-storage');
        }
    }
}

export default new LocalStorage().storage;