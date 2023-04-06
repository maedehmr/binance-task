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
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-100 py-5">
        <div className="bg-slate-800 w-3/4 lg:w-1/4 md:w-2/4 h-fit rounded-md text-slate-50 py-3">
          {currencyData ? (
            <section className="flex justify-between px-5 py-3 items-center">
              <div className="font-bold">{currencyData.s}</div>
              <div className="flex flex-col">
                <strong>{currencyData.P}</strong>
                <small>{currencyData.c}</small>
              </div>
            </section>
          ) : (
            <div className="text-center py-5">
              <p> Loading currency data...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CryptoCurrency;
