import AsyncStorage from '@react-native-community/async-storage';

const API_KEY = 'api_key';
const USER_DETAILS = 'user_details';
const CART = 'cart';
const PRODUCTITEM = 'product_item';
const WISHLIST = 'wishlist';

export const getApiKey = async () => {
    try {
        let apiKey = await AsyncStorage.getItem(API_KEY);
        return apiKey;
    } catch (error) {
        console.log('Error fetching', error);
        return null;
    }
};

export const setApiKey = api => {
    AsyncStorage.setItem(API_KEY, api);
};

export const getToken = async () => {
    try {
        let userDetails = await AsyncStorage.getItem(USER_DETAILS);
        userDetails = JSON.parse(userDetails);
        return userDetails.token;
    } catch (error) {
        console.log('Error fetching', error);
        return null;
    }
};

export const getUserDetails = async () => {
    try {
        let userDetails = await AsyncStorage.getItem(USER_DETAILS);
        userDetails = JSON.parse(userDetails);
        return userDetails;
    } catch (error) {
        console.log('Error fetching', error);
        return null;
    }
};

export const setUserDetails = user => {
    AsyncStorage.setItem(USER_DETAILS, JSON.stringify(user));
};

export const logout = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        // clear error
    }

    console.log('Done.');
};
