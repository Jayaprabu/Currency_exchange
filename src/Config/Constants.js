export const CONSTANTS = {
    URL: {
      GET_CURRENCY_LIST: "https://api.exchangerate.host/latest",
      GET_CONVERT_URL : "https://api.exchangerate.host/convert",
      GET_CONVERT_HISTORY_URL: "https://api.exchangerate.host/timeseries"
    },
    DISPATCH: {
      UPDATE_TEXT : "UpdateText",
      ALL_CURRENCY: "allCurrencyUpdate",
      CONVERT_AMOUNT: "convertAmount",
      UPDATE_CURRENCY_HISTORY: "updateCurrencyHistory",
      SWITCH_CURRENCY: "switchCurrency",
      VIEW_HISTORY_DETAILS: "viewHistoryDetails"
    },
    LABEL: {
      CONVERT_TITLE  : "I want to convert",
      AMOUNT_LABEL : "Amount",
      FROM_LABEL : "From",
      TO_LABEL : "To",
      CONVERT_BUTTON: "Convert",
      EXCHANGE_HISTORY: "Exchange History",
      DURATION : "Duration",
      TABLE: "Table",
      CHART: "Chart",
      DATE: "Date",
      EXCHANGE_RATE : "Exchange rate",
      STATISTICS: "Statistics",
      LOWEST_RATE: "Lowest",
      HIGHEST_RATE: "Highest",
      AVERAGE_RATE: "Average",
      WARNING_MSG: "Please entry the correct FROM curreny ",
      WARNING_TO_MSG: "Please entry the correct TO curreny ",
      VIEW_TITLE: "Conversion history",
      EVENT: "Event",
      ACTION: 'Action',
      VIEW: "View",
      DELETE_HISTORY: "Delete from history",
      NO_DATA_AVAILABLE: "No data Available"
    },
    REGEX_VALIDATOR: {
      NUMBER: /^[0-9]*$/,
      ALPHABET: /^[A-Za-z]*$/
    },
    FILED_TYPE: {
      ALPHABET_TYPE : "ALPHABET"
    }
}