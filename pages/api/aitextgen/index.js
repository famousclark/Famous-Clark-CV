import * as Constants from "../../../constants";

import { PythonShell } from "python-shell";

const { spawn } = require("child_process");

//import aitextgen from "./aitextgen.py";

//import aitextgen from "../../../components/python/aitextgen";
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
//https://github.com/famousclark/until-it-breaks/blob/e7a1684faef2062dfc8c7181606692a74debca48/components/python/AiTextGeneration.py
//C:\Users\clark\Desktop\Dev-Node\Until-it-breaks\components\python\AiTextGeneration.py
//components\python\AiTextGeneration.py
const pythonFetch = async (options) => {
  let dataToSend = "";
  const childProcess = spawn("python", [
    "./components/python/AiTextGeneration.py",
    options.args[0],
  ]);

  //return { data: childProcess.stdout };
  childProcess.stdout.on("data", (data) => {
    //console.log(`stdout: ${data}`);
    dataToSend = data;
    //return { data: data.toString() };
  });

  childProcess.stderr.on("data", (data) => {
    //dataToSend = data;
    //console.error(`stderr: ${data}`);
    //return { data: data.toString() };
    //dataToSend = data;
    // res.status(400);
  });

  childProcess.on("close", (code) => {
    console.log(`child process exited with code: ${code}`);

    //res.status(200);
  });

  await sleep(30000); //30 seconds
  if (dataToSend == "") {
    return { data: "error" };
  } else {
    return { data: dataToSend.toString() };
  }
};

export default async function handler(req, res) {
  const { method } = req;
  //console.log(req.body.userPrompt);
  switch (method) {
    case "POST":
      try {
        const options = {
          args: [req.body.userPrompt],
        };

        const { data } = await pythonFetch(options);
        let curatedData = data;
        if (data == "error") {
          curatedData = "API error - please try again";
        } else {
          console.log({ "original data": curatedData });
          curatedData = data.slice(2);
          curatedData = curatedData.slice(0, -2);
          curatedData = curatedData.replace(/\\n/g, "\n");
          curatedData = curatedData.replace(/\\'/g, "'");
          console.log({ "moded data": curatedData });
        }
        res.status(201).json({
          success: true,
          data: curatedData,
          prompt: req.body.userPrompt,
        });
      } catch (err) {
        console.error(err);
        res
          .status(400)
          .json({ success: false, data: "Error in API - please try again" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
