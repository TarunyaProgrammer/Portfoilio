import { motion } from "framer-motion";
import { useState } from "react";

const ConnectTerminal = () => {
  const [history, setHistory] = useState([
    { type: "output", content: "Tarunya Systems initialized." },
    { type: "output", content: "Type 'help' to explore my digital workspace." },
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
            "Available commands: email, github, linkedin, x, instagram, projects, clear";
          break;
        case "email":
          response = "Opening mail client... (tarunyak.10@gmail.com)";
          window.location.href = "mailto:tarunyak.10@gmail.com";
          break;
        case "github":
          response = "Opening GitHub...";
          window.open("https://github.com/TarunyaProgrammer/", "_blank");
          break;
        case "linkedin":
          response = "Opening LinkedIn...";
          window.open(
            "https://www.linkedin.com/in/tarunyakesharwani/",
            "_blank"
          );
          break;
        case "x":
          response = "Opening X (Twitter)...";
          window.open("https://x.com/TarunyaKesh", "_blank");
          break;
        case "instagram":
          response = "Opening Instagram...";
          window.open("https://www.instagram.com/heytarunya/", "_blank");
          break;
        case "projects":
          response = "Opening Projects...";
          window.open(
            "https://github.com/TarunyaProgrammer/Portfoilio",
            "_blank"
          );
          break;
        case "contact":
          response =
            "Email: tarunyak.10@gmail.com | X: @TarunyaKesh | IG: @heytarunya";
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
    <section className="section-spacing bg-grid/5 border-t border-white/5 font-mono text-sm leading-6">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-neon mb-4">INITIALIZE_CONNECTION</p>
        </div>
        <div className="bg-[#0b0d12]/90 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl relative">
          {/* Glossy reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

          <div className="bg-[#1f2330]/50 px-4 py-3 flex items-center gap-2 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="ml-4 text-xs text-gray-500 font-bold tracking-widest uppercase">
              guest@tarunya-systems:~
            </div>
          </div>
          <div className="p-8 h-[400px] overflow-y-auto flex flex-col font-mono relative z-10">
            {history.map((line, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  line.type === "input" ? "text-sysblue" : "text-gray-300"
                }`}
              >
                {line.type === "input" ? "> " : ""}
                {line.content}
              </div>
            ))}
            <div className="flex items-center text-sysblue group mt-2">
              <span className="mr-3">{">"}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-700 font-bold"
                placeholder="Enter command..."
                autoFocus
              />
              <div className="w-2 h-4 bg-neon animate-pulse ml-1 opacity-0 group-focus-within:opacity-100"></div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-600 text-xs">
          &copy; 2026 TARUNYA SYSTEMS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </section>
  );
};

export default ConnectTerminal;
