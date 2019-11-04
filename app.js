const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const events=[];

app.use(bodyParser.json());

app.use(
  '/graphql-api',
  graphqlHttp({
    schema: buildSchema(`
        type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            getEvents: [Event!]!
        }

        type RootMutation {
            createEvent(EventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      getEvents: () => {
        return events
      },
      createEvent: args => {
        const event = {
            _id: Math.random().toString(),
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: args.eventInput.date
        }
        console.log(args);
        events.push(event);
        return event
      }
    },
    graphiql: true
  })
);

app.listen(3000);