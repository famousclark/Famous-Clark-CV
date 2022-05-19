# Famous-Clark-CV

## How to navigate REPO

To install the REPO and run it locally,

1. Clone REPO and cd into the root folder, ./
2. Type `npm install`
3. You will need to create a `.env.local` file
4. In the `.env.local` file you will need you own api keys for `MONGODB_URI=` and `OPENAI_API_KEY=`
5. After that you should be able to run this project locally

This REPO is made using NEXTjs scafolding, the bulk of the (AI) text generation code takes place in:

**/Pages/gestalt.jsx**
and
**/Pages/tarot.jsx**

These pages make calls to an API route in:

**/Pages/api/openai/index.js**

There a simple post method with in this route that handles the **_openai_** interactions:

```
case "POST":
      try {
        const noModel = "";
        const cheapModel = "text-ada-001";
        const middleModel = "text-curie-001";
        const bestModel = "text-davinci-002";
        //console.log(req.body);
        const completion = await openai.createCompletion(req.body.model, {
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
```

These are its helper functions:

```
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


  const deckInsightArray = deckInsightString[deckIndex].split(",");

  const tarotDivination =
    deckInsightArray[Math.floor(Math.random() * deckInsightArray.length)];


  return tarotDivination;
}

function unpackHand(hand) {
  let unpackedHand = [];
  hand.forEach((card) => {

    unpackedHand.push(
      `- ${Constants.ArcanaEnglishTags[card.index]} ${card.orientation}`
    );
  });
  const tarotHand = unpackedHand.join("\r\n");

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


      const tarotInfluence = `${Constants.ArcanaTags[deckIndex]} ${orientation}`;

      const storyPrompt = "";

      if (occultInfluence) {
        return `${prompt}.\n ${fragment}\n Continue story with tarot influence of ${tarotInfluence}:`;
      } else {
        return `${prompt}.\n ${fragment}\n Continue story:`;
      }


      return storyPrompt;

    case Constants.SENTIMENT:
      const sentimentPrompt = `${prompt}:\n ${fragment}\n Is sentiment negative or positive:\n`;
      return sentimentPrompt;

    case Constants.TAROT:

      const tarotPrompt = `${prompt}:\n Tarot Cards:\n ${unpackHand(
        fragment
      )}\n Give Taort reading:\n`;

      return tarotPrompt;

    default:
      return storyPrompt;
    break;
  }
}
```

Project file structure:

```
|-- components
│   |-- Artists
│   │   |-- FamousCard.jsx
│   |-- python
│   |   |-- AiTextGeneration.py
│   |-- ExhibitionFooter.jsx
|   |-- ExhibitionMainDesktop.jsx
|   |-- StyledBottomAppBar.jsx
|   |-- StyledDateChangedPaper.jsx
|   |-- StyledDialogPromptForm.jsx
|   |-- StyledJournal.jsx
|   |-- StyledResponseList.jsx
|   |-- StyledTarotDrawList.jsx
|-- constants
|   |--index.js
|   |--css
|   |   |-- form.css
|   |   |-- style.css
|-- lib
|   |--dbConnect.js
|--models
|   |-- Fragment.js
|   |-- Prompt.js
|   |-- Response.js
|   |-- User.js
|-- public
|-- pages
|   |-- api
|   |   |-- aitextgen
|   |   |   |-- index.js
|   |   |-- auth
|   |   |   |-- index.js
|   |   |-- openai
|   |   |   |-- index.js
|   |   |-- responses
|   |   |   |-- index.js
|   |-- _app.js
|   |-- _document.js
|   |-- gestalt.jsx
|   |-- index.jsx
|   |-- manifesto.jsx
|   |-- tarot.jsx
|-- public
|   |--Images
|-- src
|   |-- createEmotionCache.js
|   |-- theme.js
|__ package.json
|__ package-lock.json
|__ requirements.txt
|__ .gitattributes
|__ .gitignore
```
