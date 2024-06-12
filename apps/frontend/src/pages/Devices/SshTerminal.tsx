import { FitAddon } from "@xterm/addon-fit";
import { SearchAddon } from "@xterm/addon-search";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { FC, useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";
import { DeviceEntity } from "../../api/data-contracts.ts";

interface Props {
  device: DeviceEntity | null;
}

const terminal = new Terminal({});
const fitAddon = new FitAddon();
const searchAddon = new SearchAddon();
terminal.loadAddon(searchAddon);
terminal.loadAddon(fitAddon);
const SshTerminal: FC<Props> = ({ device }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL.replace("/api", "/ssh"), {
      autoConnect: false,
      transports: ["websocket"],
    });

    socket.connect();

    setSocket(socket as unknown as Socket);

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [device]);

  useEffect(() => {
    if (socket) {
      const creds = device!.sshParameters.split(":");
      socket.emit("init", {
        host: device!.ip,
        port: 22,
        user: creds[0],
        password: creds[1],
      });
      const terminalDom = document.getElementById("terminal-container");
      terminal.open(terminalDom as HTMLElement);
      fitAddon.fit();

      terminal.onData((data) => {
        socket.emit("data", new TextEncoder().encode("\x00" + data));
      });

      socket.on("data", (data) => {
        terminal.write(data);
      });
    }
  }, [socket]);

  return (
    <div id="terminal-container" style={{ width: "100% ", height: "100" }} />
  );
};

export default SshTerminal;
