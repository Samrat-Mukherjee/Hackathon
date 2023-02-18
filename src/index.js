import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import defipeIcon from "./assets/defipeIcon.webp";
// require("dotenv").config();

import "@rainbow-me/rainbowkit/styles.css";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "@wagmi/core/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";



export const ArcanaRainbowConnector = ({ chains }) => {
  return {
    id: "arcana-auth",
    name: "DefiPe Wallet",
    iconUrl: { defipeIcon },
    iconBackground: '#0c2f78',
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
          // appId parameter refers to App Address value in the Dashboard
          appId: process.env.REACT_APP_Arcana_KEY,
        },
      });
      return {
        connector,
      };
    },
  };
};

const connectors = (chains) =>
  connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [ArcanaRainbowConnector({ chains }), metaMaskWallet({ chains })],
    },
  ]);

const { chains, provider } = configureChains(
  [polygon],
  [alchemyProvider({ apiKey: process.env.REACT_APP_Alchemy_KEY }), publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: false,
  connectors: connectors(chains),
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        initialChain={polygon}
        theme={{
          lightMode: lightTheme(),
          // darkMode: darkTheme(),
        }}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </BrowserRouter>
);
reportWebVitals();
