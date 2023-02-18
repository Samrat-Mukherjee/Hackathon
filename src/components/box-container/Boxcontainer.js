import "./Boxcontainer.css";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import qs from "qs";
import tokenABI from "../internal-api/TokenJSON.js";
import ChartBox from "../chart/ChartBox.js";
import successLogo from "../../assets/check.png";
import { useAccount, useConnect, useSigner, erc20ABI } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflowY: "scroll",
    height: "500px",
  },
};

Modal.setAppElement("#root");

function Boxcontainer() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [toggleBuyToken, setToggleBuyToken] = useState();
  const [spentToken, setSpentToken] = useState(4);
  const [buyToken, setBuyToken] = useState(0);
  const [spentAmount, setSpentAmount] = useState();
  const [buyAmount, setBuyAmount] = useState();
  const [estimatedGas, setEstimatedGas] = useState(null);
  const [tradeSuccess, setTradeSuccess] = useState(false);
  const [recept, setRecept] = useState(null);

  const { connector: activeConnector, isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { data: signer, isError, isLoading } = useSigner();

  useEffect(() => {
    if (spentAmount > 0) {
      getPrice();
    } else if (spentAmount == 0) {
      setBuyAmount(0);
    }
  }, [spentAmount || spentToken || buyToken]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function modelTokenList() {
    return (
      <div>
        {tokenABI.map((val, i) => {
          return (
            <div key={i} onClick={() => selectedToken(i)}>
              <div className="model-coin-list">
                {val.img == null ? <p>{val.symbol}</p> : <img src={val.img} />}
                <p>{val.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function selectedToken(index) {
    if (toggleBuyToken === true) {
      setBuyToken(index);
    } else if (toggleBuyToken === false) {
      setSpentToken(index);
    }

    closeModal();
  }

  async function getPrice() {
    let amount = Number(spentAmount * 10 ** tokenABI[spentToken].decimal);

    const params = {
      sellToken: tokenABI[spentToken].address,
      buyToken: tokenABI[buyToken].address,
      sellAmount: amount,
    };
    // Fetch the swap price.
    const response = await fetch(
      `https://polygon.api.0x.org/swap/v1/price?${qs.stringify(params)}`
    );

    let swapPriceJSON = await response.json();
    let a = Number(swapPriceJSON.buyAmount / 10 ** tokenABI[buyToken].decimal);
    let gas_estimate = Number(swapPriceJSON.estimatedGas);
    setEstimatedGas(gas_estimate);
    setBuyAmount(a);
  }

  async function getQuote() {
    let amount = Number(spentAmount * 10 ** tokenABI[spentToken].decimal);
    const params = {
      sellToken: tokenABI[spentToken].address, //Sell Token
      buyToken: tokenABI[buyToken].address, //Buy Token
      sellAmount: amount,
      skipValidation: true,
      takerAddress: address,
    };

    const response = await fetch(
      `https://polygon.api.0x.org/swap/v1/quote?${qs.stringify(params)}`
    );

    let swapQuoteJSON = await response.json();
    setBuyAmount(swapQuoteJSON.buyAmount / 10 ** tokenABI[buyToken].decimal);
    setEstimatedGas(swapQuoteJSON.estimatedGas);

    return swapQuoteJSON;
  }

  async function trySwap(e) {
    e.preventDefault();

    const swapQuoteJSON = await getQuote();
    const fromTokenAddress = tokenABI[spentToken].address;

    const txParams = {
      from: swapQuoteJSON.from,
      to: swapQuoteJSON.to,
      data: swapQuoteJSON.data,
      value: swapQuoteJSON.value,
      gasPrice: swapQuoteJSON.gasPrice,
    };

    if (
      tokenABI[spentToken].address ==
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    ) {
      let invoice = await signer.sendTransaction(txParams);

      invoice
        .wait()
        .then((result) => {
          setTradeSuccess(true);
          setRecept(result.transactionHash);
        })
        .catch((e) => {});
    } else {
      const ERC20TokenContract = new ethers.Contract(
        fromTokenAddress,
        erc20ABI,
        signer
      );

      let amount = Number(spentAmount * 10 ** tokenABI[spentToken].decimal);

      let approval = await ERC20TokenContract.approve(
        swapQuoteJSON.allowanceTarget,
        amount.toString()
      );

      await approval.wait();

      let invoice = await signer.sendTransaction(txParams);

      invoice
        .wait()
        .then((result) => {
          setTradeSuccess(true);
          setRecept(result.transactionHash);
        })
        .catch((e) => console.log("Error"));
    }
  }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  function refreshPage() {
    window.location.reload();
  }

  function success_message() {
    return (
      <div className="trade-box_success_message">
        <div>
          <img src={successLogo} alt="Success Logo" />
          <div className="modal-div">
            <h2>Voila!</h2>
            <div> Your Trade is Successful</div>

            <div className="modal-button-div">
              <button
                className="button-28"
                role="button"
                onClick={() =>
                  openInNewTab(`https://polygonscan.com/tx/${recept}`)
                }
              >
                Receipt
              </button>
              <button
                className="button-27"
                role="button"
                onClick={() => refreshPage()}
              >
                Trade More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trade_box">
      <ChartBox val={buyToken} />
      <section className="box-container">
        {tradeSuccess == true ? (
          success_message()
        ) : (
          <>
            <form className="trade-box">
              <h1>Swap</h1>
              <div className="space"></div>
              <hr className="trade-box-hr" />
              <div className="space"></div>
              <div className="containt-box">
                <p>You Pay</p>
                <div className="space"></div>
                <div className="flex-input">
                  <div
                    className="flex-input-button"
                    onClick={() => {
                      openModal();
                      setToggleBuyToken(false);
                    }}
                  >
                    <img src={tokenABI[spentToken].img} />
                    <p>{tokenABI[spentToken].symbol}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="button-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                  <input
                    name="send_amount"
                    type="number"
                    step="0.0"
                    placeholder="0.00"
                    onChange={(event) => setSpentAmount(event.target.value)}
                    value={spentAmount}
                  />
                </div>
              </div>
              <div className="space"></div>
              <div className="space"></div>
              <div className="space"></div>

              <hr className="trade-box-hr" />
              <div className="space"></div>
              <div className="containt-box">
                <p>You Receive</p>
                <div className="space"></div>
                <div className="flex-input">
                  <div
                    className="flex-input-button"
                    onClick={() => {
                      openModal();
                      setToggleBuyToken(true);
                    }}
                  >
                    <img src={tokenABI[buyToken].img} />
                    <p>{tokenABI[buyToken].symbol}</p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="button-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>

                  <input
                    name="token_amount"
                    type="text"
                    placeholder="0.00"
                    //onChange={(event) => setSendAmount(event.target.value)}
                    value={buyAmount}
                  />
                </div>
              </div>

              {isConnected == false ? (
                <>
                  {openConnectModal && (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="button-34"
                    >
                      Connect Wallet
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={(e) => trySwap(e)}
                  disabled={false}
                  className="button-34"
                  role="button"
                >
                  {isConnected == false ? "Connect Wallet" : "Swap"}
                </button>
              )}
              <div className="space"></div>

              <div className="gas-box">
                {estimatedGas == null ? (
                  <></>
                ) : (
                  <>
                    <p>Estimated Gas: </p>
                    <span id="gas_estimate">
                      {estimatedGas ? estimatedGas : <></>} Gwei
                    </span>
                  </>
                )}
              </div>
            </form>
          </>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="model-box">
            {tokenABI.length == 0 ? <p>No data</p> : modelTokenList()}
          </div>
        </Modal>
      </section>
    </div>
  );
}

export default Boxcontainer;
