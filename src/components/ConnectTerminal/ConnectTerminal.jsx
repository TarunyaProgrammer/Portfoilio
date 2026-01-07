import { motion } from "framer-motion";
import { useState } from "react";

const ConnectTerminal = () => {
  const [history, setHistory] = useState([
    { type: "output", content: "Tarunya Systems v2.1.0 initialized..." },
    { type: "output", content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState("");

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      const newHistory = [...history, { type: "input", content: cmd }];

      let response = "";
      switch (cmd.toLowerCase()) {
        case "help":
          response =
            "Available commands: email, github, linkedin, clear, contact";
          break;
        case "email":
          response = "Opening mail client... (tarunya@example.com)";
          window.location.href = "mailto:tarunya@example.com";
          break;
        case "github":
          response = "Opening GitHub...";
          window.open("https://github.com/TarunyaProgrammer", "_blank");
          break;
        case "linkedin":
          response = "Opening LinkedIn...";
          window.open("https://linkedin.com/in/tarunya", "_blank");
          break;
        case "contact":
          response = "Email: tarunya@example.com | Twitter: @tarunya";
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        default:
          response = `Command not found: ${cmd}. Type "help" for a list of commands.`;
      }

      if (cmd) {
        newHistory.push({ type: "output", content: response });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <section className="py-24 bg-grid/10 border-t border-white/5 font-mono text-sm leading-6">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-[#0b0d12] border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-[#1f2330] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs text-gray-400">
              guest@tarunya-systems:~
            </div>
          </div>
          <div className="p-6 h-[400px] overflow-y-auto flex flex-col font-mono">
            {history.map((line, i) => (
              <div
                key={i}
                className={`mb-1 ${
                  line.type === "input" ? "text-sysblue" : "text-gray-300"
                }`}
              >
                {line.type === "input" ? "> " : ""}
                {line.content}
              </div>
            ))}
            <div className="flex items-center text-sysblue group">
              <span className="mr-2">{">"}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent border-none outline-none flex-1 text-text placeholder-gray-700"
                placeholder="Enter command..."
                autoFocus
              />
              <div className="w-2 h-4 bg-neon animate-pulse ml-1 opacity-0 group-focus-within:opacity-100"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectTerminal;
