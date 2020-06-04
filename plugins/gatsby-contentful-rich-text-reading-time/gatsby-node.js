const {
  documentToReactComponents,
} = require('@contentful/rich-text-react-renderer');
const ReactDOMServer = require('react-dom/server');
const htmlToText = require('html-to-text');
const wordRegex = require('word-regex');

// TODO: find a way to detect automatically rich text
// Maybe with the onCreateNode API?

const WORD_READ_PER_MINUTE = 250;

function getReadingTime(text) {
  const plainText = htmlToText.fromString(text);
  let wordsCount = 0;

  if (plainText.length > 0) {
    const match = plainText.match(wordRegex());
    wordsCount = match ? match.length : 0;
  }

  const timeInMinute = wordsCount / WORD_READ_PER_MINUTE;

  return timeInMinute;
}

function calculateRichTextReadingTime(json) {
  const element = documentToReactComponents(json);
  const html = ReactDOMServer.renderToString(element);
  return getReadingTime(html);
}

exports.createSchemaCustomization = ({ actions, schema }, { types }) => {
  const { createTypes } = actions;

  createTypes(
    types.map(({ name, field }) => {
      return schema.buildObjectType({
        name,
        interfaces: ['Node'],
        fields: {
          readingTime: {
            type: 'Float!',
            resolve: (source) => {
              const json = JSON.parse(source[field]);
              const readingTime = calculateRichTextReadingTime(json);
              return readingTime;
            },
          },
        },
      });
    })
  );
};
