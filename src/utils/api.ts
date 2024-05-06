import ChatAppJSON from "../abis/ChatApp.json";
import config from "./config.json";
import { Contract, ethers } from "ethers";

export interface user {
  name: string;
  friendList: friend[];
}

export interface friend {
  pubkey: string;
  name: string;
}

export interface message {
  sender: string;
  img: string[];
  msg: string;
  timestamp: string;
}

export interface ChatApp {
  checkUserExists(pubkey: string): Promise<boolean>;
  createAccount(name: string): Promise<void>;
  getUsername(pubkey: string): Promise<string>;
  addFriend(friend_key: string, name: string): Promise<void>;
  getMyFriendList(): Promise<friend[]>;
  sendMessage(friend_key: string, img: string[], msg: string): Promise<void>;
  readMessage(friend_key: string): Promise<message[]>;
}

async function getAccounts(): Promise<string[]> {
  try {
    if (!window.ethereum) {
      console.log("Intall MetaMask!");
      return [];
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    return accounts;
  } catch (error) {
    console.log("Install MetaMask!");
    return [];
  }
}

export async function getAccount(): Promise<string> {
  try {
    if (!window.ethereum) {
      console.log("Intall MetaMask!");
      return "NA";
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    return accounts[0];
  } catch (error) {
    console.log("Install MetaMask!");
    return "NA";
  }
}

export async function checkIfWalletIsConnected() {
  return !!(await getAccounts()).length;
}

export async function connectWallet() {
  try {
    if (!window.ethereum) return console.log("Intall MetaMask!");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("Install MetaMask!");
  }
}

export async function getContract() {
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    const provider = ethers.getDefaultProvider();

    const chatApp = new ethers.Contract(
      config["31337"].ChatApp.address,
      ChatAppJSON.abi,
      provider
    ) as Contract & ChatApp;
    return chatApp;
  } else {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = !!(await getAccounts()).length;
    if (accounts) {
      const signer = await provider.getSigner();
      const chatApp = new ethers.Contract(
        config["31337"].ChatApp.address,
        ChatAppJSON.abi,
        signer
      ) as Contract & ChatApp;
      return chatApp;
    } else {
      const chatApp = new ethers.Contract(
        config["31337"].ChatApp.address,
        ChatAppJSON.abi,
        provider
      ) as Contract & ChatApp;
      return chatApp;
    }
  }
}
