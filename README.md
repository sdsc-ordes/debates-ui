# debates ui

## About

This is the user interface for a PoC to search in video transcripts and to play videos
with the transcript  on the side

## Technology 

- The frontend uses SvelteKit.  

## Dependencies

- The transcript is expected in SRT
- The frontend needs a Solr instance up and running
- Since Solr implements CORS, it needs also a proxy to connect to Solr

## Setup

Because of the complicated setup, it is recommended to use a docker compose that is provided in the main repository:
https://github.com/sdsc-ordes/political-debates-ui

Once the docker-compose is up and running, the frontend can also setup and developed on its own:

- clone the repo
- npm install
- pnpm dev
