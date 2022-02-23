import { globby } from "globby";
import { resolve } from "path";
import { homedir } from "os";

export default async (glob = "**/*") => {
  return await globby(resolve(homedir(), `projects/digital-garden/${glob}`));
};
