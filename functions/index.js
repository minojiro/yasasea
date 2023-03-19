const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "xxx",
});
const openai = new OpenAIApi(configuration);

admin.initializeApp(functions.config().firebase);

const askToChat = async (prompt) => {
  const { data } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(data.choices[0].text);
  return data.choices[0].text;
};

exports.generateSafePost = functions.firestore
  .document("unsafePosts/{docId}")
  .onCreate(async (change, context) => {
    const data = change.data();
    const db = admin.firestore();
    functions.logger.info(`start: ${data.text}`);
    const text = await askToChat(
      `以下の内容を優しい言い方に言い換えてください。\n${data.text}`
    );
    functions.logger.info(`generated: ${text}`);
    await db.collection("posts").add({ ...data, text });
    await db.doc(`unsafePosts/${context.params.docId}`).delete();
    functions.logger.info(`done`);
  });
