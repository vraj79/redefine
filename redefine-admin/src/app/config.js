import axios from "axios"

export const axiosInstance = axios.create({
    // baseURL : "http://localhost:7000/api/"
    baseURL : "https://api.redefineopmt.in/api/"
    // baseURL : "http://51.79.205.255:7000/api/"
})

// export const setToken = (token) => {
//     const auth = `Bearer ${token}`;
//     axiosInstance.defaults.headers.common['Authorization'] = auth;
// };
// })

export const setToken = (token) => {
    const auth = `Bearer ${token}`;
    axiosInstance.defaults.headers.common['Authorization'] = auth;
};
