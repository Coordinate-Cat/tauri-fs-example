import { useEffect, useState } from "react";
import "./App.css";
import { loadConfig } from "./loadConfig";
import { saveConfig } from "./saveConfig";
import { Config } from "./types";
import { PATH, TITLE } from "./const";

export default function App() {
  const [config, setConfig] = useState<Config | null>(null);
  const [newSetting4Item, setNewSetting4Item] = useState("");

  useEffect(() => {
    const fetchConfig = async () => {
      const configData = await loadConfig();
      setConfig(configData);
    };
    fetchConfig();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!config) return;

    const { name, value } = e.target;
    const updatedConfig = { ...config, [name]: value };
    setConfig(updatedConfig);
  };

  const handleSave = async () => {
    if (config) {
      await saveConfig(config);
    }
  };

  if (!config) {
    return <div>Loading...</div>;
  }

  const handleAddSetting4Item = () => {
    if (config && newSetting4Item.trim()) {
      const updatedSetting4 = [...config.setting4, newSetting4Item.trim()];
      setConfig({ ...config, setting4: updatedSetting4 });
      setNewSetting4Item("");
    }
  };

  const handleSetting4ItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (config) {
      const updatedSetting4 = [...config.setting4];
      updatedSetting4[index] = e.target.value;
      setConfig({ ...config, setting4: updatedSetting4 });
    }
  };

  const handleSetting3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (config) {
      setConfig({ ...config, setting3: e.target.checked });
    }
  };

  const moveSetting4ItemUp = (index: number) => {
    if (config && index > 0) {
      const updatedSetting4 = [...config.setting4];
      [updatedSetting4[index - 1], updatedSetting4[index]] = [
        updatedSetting4[index],
        updatedSetting4[index - 1],
      ];
      setConfig({ ...config, setting4: updatedSetting4 });
    }
  };

  const moveSetting4ItemDown = (index: number) => {
    if (config && index < config.setting4.length - 1) {
      const updatedSetting4 = [...config.setting4];
      [updatedSetting4[index], updatedSetting4[index + 1]] = [
        updatedSetting4[index + 1],
        updatedSetting4[index],
      ];
      setConfig({ ...config, setting4: updatedSetting4 });
    }
  };

  return (
    <div className="App">
      <h1>{TITLE}</h1>

      <hr />

      <div>
        <h2 style={{ color: "gray" }}>{PATH}</h2>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>

      <hr />

      <div>
        <h3>setting1</h3>
        <input
          type="text"
          name="setting1"
          value={config.setting1}
          onChange={handleChange}
        />
        <h3>setting2</h3>
        <input
          type="number"
          name="setting2"
          value={config.setting2}
          onChange={handleChange}
        />
        <h3>setting3</h3>
        <input
          type="checkbox"
          name="setting3"
          checked={config.setting3}
          onChange={handleSetting3Change}
        />
        <h3>setting4</h3>
        <ul>
          {config.setting4.map((item, index) => (
            <li key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) => handleSetting4ItemChange(e, index)}
              />
              {index !== 0 && (
                <button
                  style={
                    index === config.setting4.length - 1
                      ? { width: "100px" }
                      : { width: "48px" }
                  }
                  onClick={() => moveSetting4ItemUp(index)}
                >
                  ↑
                </button>
              )}
              {index !== config.setting4.length - 1 && (
                <button
                  style={
                    index === 0
                      ? { width: "100px" }
                      : { width: "48px", marginLeft: "4px" }
                  }
                  onClick={() => moveSetting4ItemDown(index)}
                >
                  ↓
                </button>
              )}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newSetting4Item}
          onChange={(e) => setNewSetting4Item(e.target.value)}
        />
        <button onClick={handleAddSetting4Item}>Add Item</button>
        <h3>setting5</h3>
        <input
          type="number"
          name="subSetting1"
          value={config.setting5.subSetting1}
          onChange={(e) =>
            setConfig({
              ...config,
              setting5: {
                ...config.setting5,
                subSetting1: parseInt(e.target.value, 10),
              },
            })
          }
        />
        <input
          type="text"
          name="subSetting2"
          value={config.setting5.subSetting2}
          onChange={(e) =>
            setConfig({
              ...config,
              setting5: { ...config.setting5, subSetting2: e.target.value },
            })
          }
        />
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
}
