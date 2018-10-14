require('dotenv/config');

const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

const languageTranslator = new LanguageTranslatorV3({
  iam_apikey: process.env.TRANSLATE_IAM_APIKEY,
  url: process.env.TRANSLATE_API_URL,
  version: '2018-08-07',
});

module.exports = {
  getLanguages: (req, res) => {
    languageTranslator.listIdentifiableLanguages({}, function(err, response) {
      if (err) console.log('error: ', err);
      else res.send(JSON.stringify(response, null, 2));
    });
  },
  translate: (req, res) => {
    console.log(req.body);
    const { text, source, target } = req.body;
    const translateParams = {
      text,
      model_id: `${source}-${target}`,
    };
    languageTranslator.translate(translateParams, function(err, translation) {
      if (err) {
        switch (err.code) {
          case 400:
            res.send(
              'Unable to translate, please fill in all required parameter.',
            );
            break;
          case 404:
            res.send(
              'Sorry, the specified source-target language pair is not supported at this time.',
            );
            break;
          default:
            res.send('Sorry, an error occured.');
            break;
        }
      } else res.send(translation['translations'][0].translation);
    });
  },
};
