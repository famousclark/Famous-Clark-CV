import { Configuration, OpenAIApi } from "openai";

import * as Constants from "../../../constants";

import dbConnect from "../../../lib/dbConnect";

import Prompt from "../../../models/Prompt";
import Response from "../../../models/Response";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generateTarotInsight(deckIndex, orientation) {
  let deckInsightString = [];
  if (orientation == Constants.UPRIGHT) {
    deckInsightString = Constants.ArcanaUpright;
  } else {
    deckInsightString = Constants.ArcanaReversed;
  }

  //console.log(deckInsightString[deckIndex]);

  const deckInsightArray = deckInsightString[deckIndex].split(",");

  //console.log("Deck array: ", deckInsightArray);
  const tarotDivination =
    deckInsightArray[Math.floor(Math.random() * deckInsightArray.length)];

  // console.log(
  //   `The Tarot Card is: ${Constants.ArcanaTags[deckIndex]}, ${orientation} | Ada's divination is: ${tarotDivination}`
  // );
  return tarotDivination;
}

function unpackHand(hand) {
  let unpackedHand = [];
  hand.forEach((card) => {
    // let tones = [];
    // if (card.orientation == Constants.REVERSED) {
    //   tones = [...Constants.ArcanaReversed[card.index]];
    // } else {
    //   tones = [...Constants.ArcanaUpright[card.index]];
    // }
    // console.log(tones);
    unpackedHand.push(
      `- ${Constants.ArcanaEnglishTags[card.index]} ${card.orientation}`
    );
  });
  const tarotHand = unpackedHand.join("\r\n");
  // console.log(tarotHand);

  return tarotHand;
}

function generatePrompt(
  deckIndex = 0,
  prompt = "",
  fragment = "",
  story = Constants.STORY,
  orientation = Constants.UPRIGHT,
  occultInfluence = true
) {
  switch (story) {
    case Constants.STORY:
      //console.log({ occultInfluence });
      // const storyPrompt = `${prompt}.\n ${fragment}\n Continue story with the tone of ${generateTarotInsight(
      //   deckIndex,
      //   orientation
      // )}:\n`;

      const tarotInfluence = `${Constants.ArcanaTags[deckIndex]} ${orientation}`;

      const storyPrompt = "";

      if (occultInfluence) {
        return `${prompt}.\n ${fragment}\n Continue story with tarot influence of ${tarotInfluence}:`;
      } else {
        return `${prompt}.\n ${fragment}\n Continue story:`;
      }

      //console.log({ storyPrompt });
      return storyPrompt;

    case Constants.SENTIMENT:
      const sentimentPrompt = `${prompt}:\n ${fragment}\n Is sentiment negative or positive:\n`;
      return sentimentPrompt;

    case Constants.TAROT:
      //unpackHand(fragment);
      const tarotPrompt = `${prompt}:\n Tarot Cards:\n ${unpackHand(
        fragment
      )}\n Give Taort reading:\n`;
      // const tarotPrompt = `${prompt}:\n Tarot Cards:\n ${unpackHand(
      //   fragment
      // )}\n Give Taort reading based Tarot Cards:\n`;
      //console.log(tarotPrompt);
      return tarotPrompt;

    default:
      return storyPrompt;
    //break;
  }
}

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
      try {
        const noModel = "";
        const cheapModel = "text-ada-001";
        const middleModel = "text-curie-001";
        const bestModel = "text-davinci-002";
        //console.log(req.body);
        const completion = await openai.createCompletion(noModel, {
          prompt: generatePrompt(
            req.body.deckIndex,
            req.body.userPrompt,
            req.body.userFragment,
            req.body.story,
            req.body.orientation,
            req.body.occultInfluence
          ),
          max_tokens: 256,
          temperature: 0.5,
        });

        res.status(201).json({
          success: true,
          prompt: req.body.userPrompt,
          fragment: req.body.userFragment,
          data: completion.data.choices[0].text,
          deckIndex: req.body.deckIndex,
          orientation: req.body.orientation,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
