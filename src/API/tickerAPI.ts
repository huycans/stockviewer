export const BASE_URL = "http://127.0.0.1:5000/";
export const GET_INFO = "get_info";

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