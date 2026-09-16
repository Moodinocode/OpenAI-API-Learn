# OpenAI API Learn

A small CLI experiment for learning how to integrate LLMs into an application, built around when GPT-4o was still a relatively new model.

## What this is

A terminal-based customer service chatbot for a fictional computer e-commerce store. It uses the OpenAI Chat Completions API (`gpt-4o`) with:

- A system prompt constraining the assistant to only recommend products from a provided (mocked) product list
- A rolling conversation history (last 10 messages) passed back to the model for context
- Simple `readline`-based CLI input/output

## Purpose

This was purely a learning exercise to understand:
- How the OpenAI API works (chat completions, message roles, tool/system messages)
- How to integrate an LLM into an app end-to-end (env vars, request/response handling, conversation state)

Not intended as a production project or the basis for a later one.

## Running it

```bash
npm install
# create a .env file with OPENAI_API_KEY=your_key_here
node main.js
```

Type `exit` to quit.
