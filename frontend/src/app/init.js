import axios from "axios"

const initializeApp = () => {
    
    // Setting base URL for all API request via axios
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL


    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //     // Development environment settings
    //     console.log("Development environment");
    //   } else {
    //     // Production environment settings
    //     console.log("Production environment");
    
    //     // Removing console.log from production
    //     console.log = () => {};


    //     // init analytics here
    // }

}

export default initializeApp