import React, { useEffect, useState } from "react";

const CryptoCurrency = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const socket = new WebSocket("wss://fstream.binance.com");

  useEffect(() => {
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);

      socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: ["!ticker@arr"],
          id: 1,
        })
      );
    });

    socket.addEventListener("message", (event) => {
      console.log("WebSocket message received:", event);

      const currencyData = JSON.parse(event.data);
      setCurrencyData(currencyData);
    });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });

    socket.addEventListener("error", (event) => {
      console.log("WebSocket error:", event);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {currencyData ? (
        <div>
          <p>Symbol: {currencyData.s}</p>
          <p>Price Change Percent: {currencyData.P}</p>
          <p>Last Price: {currencyData.c}</p>
        </div>
      ) : (
        <p>Loading currency data...</p>
      )}
    </div>
  );
};

export default CryptoCurrency;
