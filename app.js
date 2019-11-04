const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql-api',
  graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            getEvents: [String!]!
        }
        type RootMutation {
            createEvent(name: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      getEvents: () => {
        return ['Fadhlaoui', 'Testing', 'All-Night Coding'];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.listen(3000);