import config from "config";
import { init } from "./db";
import { drawLine } from "./utils/logger.utils";
import { app } from "./app";

const PORT = config.get<number>("port") || 8000;

app.listen(PORT, () => {
  init();
  drawLine();
  console.log(`LISTENING @ http:/127.0.0.1:${PORT}`);
  drawLine();
});
