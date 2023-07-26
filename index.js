const { Configuration, OpenAIApi } = require("openai");
const readline = require( "readline");

const configuration = new Configuration({
  organization: "<YOUR-ORGANIZATION>",
  apiKey: "<YOUR-OPENAI-API-KEY",
});
const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    .then((res) => {
      console.log(res.data.choices[0].message.content);
      userInterface.prompt();
    })
    .catch((e) => {
      console.log(e);
    });
});