# Generics and causality experiment

Thesis project by Koen Gommers for the Bachelor's degree Kunstmatige Intelligentie (Artificial Intelligence) at the University of Amsterdam.

People often use sentences such as “Birds fly” to describe things they have learned about the world. We are investigating the conditions that make these statements true and the way people come to believe them. In particular, we are studying two hypotheses. First, that we learn those statements by comparing the group we want to describe with a relevant contrasting group: “Birds fly” is true because more species of birds fly compared to other animals. Second, that these statements make more sense when they are used to describe aspects of a group that are essential (or causal) to that group rather than being accidental.

For more information, see:
- van Rooij, RAM, & Schulz, K. (2019). A causal power theory of generics. _Topoi_.
- Kochari, A., Rooij, R., & Schulz, K. (2020). Generics and Alternatives. _Frontiers in Psychology_.

## Documentation

This project consists of 2 packages, one of them is the server-side code and the other is the client-side code. The client package includes all code for the game. The HTML of the survey parts is served by the server.

### Server

The server runs on Express using Node.js. Its purpose is serving the survey and storing and retrieving submissions in its attached database. SQLite is used in development and PostgreSQL is used in production. In production it is also responsible for serving the client files.

In `src/utils/generateLevels.js` values can be adjusted for changing the prevalence of objects in towns.

Starting development server:

    npm run start

### Client

The client (game) is built using Phaser and compiled with webpack. In development, webpack can be used for hot reloading.

Starting webpack server (for development):

    npm run start

### Running production

The master branch is automatically deployed on Heroku (study-71d2a9.herokuapp.com/). It builds both packages and then runs the `serve` command on the server package.
