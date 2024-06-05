import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { homeDir } from "@tauri-apps/api/path";
import { Config } from "./types";

export const saveConfig = async (config: Config) => {
  const homePath = await homeDir();
  const configFilePath = `${homePath}.config/config.json`;
  await writeTextFile(configFilePath, JSON.stringify(config, null, 2), {
    dir: BaseDirectory.Home,
  });
};
