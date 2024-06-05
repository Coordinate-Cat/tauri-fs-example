import { useEffect, useState } from "react";
import "./App.css";
import { loadConfig } from "./loadConfig";
import { Config } from "./types";

export default function App() {
  const [config, setConfig] = useState<Config | null>(null);

  const jsonText = JSON.stringify(config, null, 2);

  const title = "tauri fs api";
  const path = "$HOME/.config/config.json";

  useEffect(() => {
    const fetchConfig = async () => {
      const configData = await loadConfig();
      setConfig(configData);
    };
    fetchConfig();
  }, []);

  if (!config) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>{title}</h1>

      <hr />

      <div>
        <h2 style={{ color: "gray" }}>{path}</h2>
        <pre>{jsonText}</pre>
      </div>

      <hr />

      <div>
        <h3>setting1</h3>
        <p>{config.setting1}</p>
        <h3>setting2</h3>
        <p>{config.setting2}</p>
        <h3>setting3</h3>
        <p>{config.setting3 ? "true" : "false"}</p>
        <h3>setting4</h3>
        <ul>
          {config.setting4.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h3>setting5</h3>
        <p>{config.setting5.subSetting1}</p>
        <p>{config.setting5.subSetting2}</p>
      </div>
    </div>
  );
}
