export const BASE_URL = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:5000/" : (process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "https://stockviewer-react.herokuapp.com/");
console.log(process.env.REACT_APP_BASE_URL)
export const GET_INFO = "get_info";
export const GET_LIST = "get_list";

export const fetchTickerInfo = (tickerName: string) => fetch(BASE_URL + GET_INFO, {
  method: "POST",
  body: JSON.stringify({
    "ticker_symbol": tickerName
  }),
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json"
  },
})
.then(response => response.json())

export const fetchListOfTickers = (tickerList: string[]) => fetch(BASE_URL + GET_LIST, {
  method: "POST",
  body: JSON.stringify({
    "ticker_list": tickerList
  }),
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json"
  },
})
.then(response => response.json())