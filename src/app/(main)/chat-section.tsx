"use client";

import { ChatAppContext } from "@/components/providers/chatapp.provider";
import { Input } from "@/components/ui/input";
import { message } from "@/utils/api";
import { RotateCcw, SendHorizonal, X } from "lucide-react";
import { FC, useContext, useEffect, useState } from "react";
import AddFilesForm from "./add-files-form";
import { cn } from "@/lib/utils";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import ChatImageSection from "./image-section";
import { dateFormater } from "@/utils/dateFormater";

const ChatSection: FC = () => {
  const { selectedFriend, readMessage, account, sendMessage, friendList } =
    useContext(ChatAppContext);
  const [messages, setMessages] = useState<message[]>([]);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);

  async function fetchMessages(friend_key: string) {
    const messagesFetch = await readMessage(friend_key);
    setMessages(messagesFetch);
  }
  useEffect(() => {
    if (!!selectedFriend) {
      fetchMessages(selectedFriend);
    }
  }, [selectedFriend]);

  async function onSendMessage() {
    if ((!message.trim() && !images.length) || !selectedFriend) return;
    setLoading(true);
    if (!!images.length) {
      const formData = new FormData();
      for (const image of imagesFiles) {
        formData.append("images", image);
      }

      return axios
        .post<{ images: string[] }>("/api/upload", formData)
        .then(async (res) => {
          const { images: responseImages } = res.data;
          setMessage("");
          setImages([]);
          setImagesFiles([]);
          await sendMessage(selectedFriend, responseImages, message);
          setLoading(false);
        });
    }

    setMessage("");
    setImages([]);
    setImagesFiles([]);
    await sendMessage(selectedFriend, [], message);
    setLoading(false);
  }

  const findFriend = friendList.find(
    (friend) => friend.pubkey === selectedFriend
  );

  return !!selectedFriend ? (
    <div className="h-full relative w-full justify-end grow flex flex-col">
      <div className="absolute top-0 left-0 w-full z-10 h-6 bg-gradient-to-b from-slate-950/70 to-transparent"></div>
      <div className="absolute bottom-14 left-0 w-full z-10 h-6 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
      {/* Messages */}
      <div className="flex flex-col py-6 max-h-[calc(100vh-9.5rem)] scrollbar-none overflow-y-auto text-gray-300 gap-2">
        {messages.map((message) =>
          message.sender.toLocaleLowerCase() === account ? (
            <div className="flex ml-auto max-w-md items-end w-full p-2 rounded-md bg-sky-950/75 flex-col gap-1">
              <span className="text-xs text-slate-300 font-medium pb-2">
                You
              </span>
              <ChatImageSection images={message.img} />
              <p>{message.msg}</p>
              <p className="text-xs text-gray-500">
                {dateFormater(
                  new Date(Number(message.timestamp) * 1000),
                  true,
                  true
                )}
              </p>
            </div>
          ) : (
            <div className="flex mr-auto max-w-md w-full p-2 rounded-md bg-slate-800/75 flex-col gap-1">
              <span className="text-xs text-slate-300 font-medium pb-2">
                {findFriend?.name}
              </span>
              <ChatImageSection images={message.img} />
              <p>{message.msg}</p>
              <p className="text-xs text-gray-500">
                {dateFormater(
                  new Date(Number(message.timestamp) * 1000),
                  true,
                  true
                )}
              </p>
            </div>
          )
        )}
      </div>

      {/* Chat bar */}
      <div className="w-full flex gap-4 items-center rounded-t-md bg-slate-900 border-x-[1px] border-t-[1px] border-slate-700 h-14 px-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="bg-transparent w-full text-gray-300 focus-within:text-white border-none outline-none h-10"
        />
        <button
          onClick={() => setMessage("")}
          disabled={!message.trim()}
          className={cn(
            "size-5 flex-shrink-0 flex justify-center items-center",
            !!message.trim()
              ? "text-gray-400 hover:text-white"
              : "text-gray-700"
          )}
        >
          <X className="size-5" />
        </button>
        <AddFilesForm
          images={images}
          setImages={setImages}
          imagesFiles={imagesFiles}
          setImagesFiles={setImagesFiles}
        />
        <button
          onClick={() => fetchMessages(selectedFriend)}
          className="size-5 flex-shrink-0 flex justify-center items-center text-gray-400 hover:text-white"
        >
          <RotateCcw className="size-5" />
        </button>
        {loading ? (
          <AiOutlineLoading className="size-6 animate-spin text-gray-400" />
        ) : (
          <button
            onClick={onSendMessage}
            className="size-5 flex-shrink-0 flex justify-center items-center text-gray-400 hover:text-white"
          >
            <SendHorizonal className="size-5" />
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default ChatSection;
