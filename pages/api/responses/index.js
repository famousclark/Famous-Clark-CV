import dbConnect from "../../../lib/dbConnect";

import Prompt from "../../../models/Prompt";
import Response from "../../../models/Response";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const responses = await Response.find({
          username: "Gwyn",
        })
          .sort({ time_stamped: -1 })
          .limit(22); /* find all the data in our database */
        res.status(200).json({ success: true, data: responses });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      //console.log(req.body);
      try {
        // const prompt = await new Prompt({
        //   username: req.body.username,
        //   params: { prompt: req.body.prompt },
        // });

        const response = await new Response({
          username: req.body.username,
          prompt: req.body.prompt,
          fragment: req.body.fragment,
          text: req.body.text,
          deckIndex: req.body.deckIndex,
          orientation: req.body.orientation,
        });

        // await prompt.reponse_id.push(response._id);

        // await response.prompt_id.push(prompt._id);

        // await prompt.save();

        await response.save();

        res.status(201).json({
          success: true,
          message: "response was saved",
          //prompt: req.body.userPrompt,
          //data: completion.data.choices[0].text,
        });
      } catch (error) {
        res.status(400).json({ success: false, message: "response NOT saved" });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "response NOT saved" });
      break;
  }
}
