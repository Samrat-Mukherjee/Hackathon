import "./ChartBox.css";
import React, { useEffect, useState } from "react";
import { LineChart, Line, Tooltip } from "recharts";
import TooltipContaint from "../tooltip-containt/TooltipContaint";
import tokenABI from "../internal-api/TokenJSON";
import axios from 'axios';
function ChartBox(val) {
  let graphData = [];
  const [graphTokenId, setGraphTokenId] = useState(0);
  const [dataGraph, setDataGraph] = useState([]);
  const [tokenPrice, setTokenPrice] = useState(null);
  useEffect(() => {
    getData();
    getTokenPrice();
   
  }, [graphTokenId]);

  useEffect(() => {
    setGraphTokenId(val.val);
  }, [val.val]);

  setInterval(() => {
    getTokenPrice();
  }, 300000);

  async function getData() {
    
    let token_address =
      tokenABI[graphTokenId].address ==
      0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ? "0x0000000000000000000000000000000000001010"
        : tokenABI[graphTokenId].address;
    let response = await fetch(
      `https://api.coingecko.com/api/v3/coins/polygon-pos/contract/${token_address}/market_chart/?vs_currency=inr&days=360`
    );
    let data = await response.json();

    graphData = data.prices.map((price) => {
      const [timeStamp, p] = price;
      let date = new Date(timeStamp).toLocaleDateString("en-us");
      return {
        Date: date,
        price: p,
      };
    });

    setDataGraph(graphData);
  }

  const getTokenPrice = async () => {
    let token_address =
    tokenABI[graphTokenId].address ==
    0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
      ? "0x0000000000000000000000000000000000001010"
      : tokenABI[graphTokenId].address;
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/simple/token_price/polygon-pos",
      params: {
        vs_currencies: "inr",
        contract_addresses: token_address,
        include_24hr_vol: "false",
        include_market_cap: "false",
        include_last_updated_at: "false",
        include_24hr_change: "false",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let responseData = Object.values(response.data);
       
        setTokenPrice(responseData[0].inr);
        
      })
      .catch(function (error) {
        console.error("There is some internal error from our side ");
      });
  };

  function getWindowSize() {
    let windowWidth = window.innerWidth;
    if(windowWidth <= 700) {
      return windowWidth;
    } else {
      return windowWidth/2.2;
    }
  }

  return (
    <div className="chart-view">
  

       <h1> {tokenABI[graphTokenId].name}<span>{" ("}{tokenABI[graphTokenId].symbol}{")"}</span></h1>
       <h2>₹{tokenPrice} </h2> 
       


      {dataGraph == [] ? (
        <>No Data</>
      ) : (
        <div
          style={{
            height: "280px",
            minHeight: "280px",
            width: "100%",
            margin: "4px"

          }}
        >
          <LineChart width={getWindowSize()} height={280} data={dataGraph}>
            <Tooltip content={(props) => <TooltipContaint props={props} />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default ChartBox;
