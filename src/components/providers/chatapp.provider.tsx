"use client";

import { FC, ReactNode, createContext, useEffect, useState } from "react";
import {
  ChatApp,
  checkIfWalletIsConnected,
  connectWallet,
  getContract,
  getAccount,
  user,
  message,
  friend,
} from "../../utils/api";
import { Contract } from "ethers";

interface ChatAppContext extends ChatApp {
  checkIfWalletIsConnected: () => Promise<boolean>;
  getAccount: () => Promise<string>;
  connectWallet: () => Promise<string>;
  fetchData: () => Promise<void>;

  account: string;
  userName: string;
  friendList: friend[];
  registered: boolean;

  selectedFriend: string | null;
  selectFriend: (friend_key: string) => Promise<void>;
}
export const ChatAppContext = createContext<ChatAppContext>({
  checkIfWalletIsConnected: async () => false,
  getAccount: async () => "",
  connectWallet: async () => "NA",
  fetchData: async () => {},

  account: "",
  userName: "",
  friendList: [],
  registered: false,

  selectedFriend: null,
  selectFriend: async () => {},

  checkUserExists: async () => false,
  createAccount: async () => {},

  getUsername: async () => "",
  addFriend: async () => {},
  getMyFriendList: async () => [],
  sendMessage: async () => {},
  readMessage: async () => [],
});

const ChatAppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [contract, setContract] = useState<(Contract & ChatApp) | null>(null);

  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [friendList, setFriendList] = useState<friend[]>([]);

  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  async function fetchData() {
    try {
      const contract = await getContract();
      if (contract) {
        setContract(contract);
      }

      const account = await getAccount();
      if (account) {
        setAccount(account);

        const registered = await contract.checkUserExists(account);
        setRegistered(registered);
        if (!registered) return;

        const username = await contract.getUsername(account);
        setUserName(username);

        const friendList = await contract.getMyFriendList();
        setFriendList(friendList);
      }
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    if (window && window.ethereum) {
      fetchData();

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, []);

  async function selectFriend(friend_key: string) {
    const findFriend = friendList.find(
      (friend) => friend.pubkey === friend_key
    );
    if (!findFriend) return;

    setSelectedFriend(findFriend.pubkey);
  }

  const contractExist = contract !== null;
  return (
    <ChatAppContext.Provider
      value={{
        checkIfWalletIsConnected,
        getAccount,
        connectWallet,
        fetchData,

        account,
        userName,
        registered,
        friendList,

        selectedFriend,
        selectFriend,

        checkUserExists: contractExist
          ? contract.checkUserExists
          : async () => false,
        createAccount: contractExist ? contract.createAccount : async () => {},
        getUsername: contractExist ? contract.getUsername : async () => "",
        addFriend: contractExist ? contract.addFriend : async () => {},
        getMyFriendList: contractExist
          ? contract.getMyFriendList
          : async () => [],
        sendMessage: contractExist ? contract.sendMessage : async () => {},
        readMessage: contractExist ? contract.readMessage : async () => [],
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};

export default ChatAppProvider;
