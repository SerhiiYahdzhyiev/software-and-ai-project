# Software and AI Module Final Project

This repository holds source files and supporting documentation for the final
project for GISMA University of Applied Sciences, module - *Software and AI
(B198c16)*.

## CodeGlass

### Overview

CodeGlass is an AI Powered code snippet analyzer browser extension. It tracks
user highlighting of text on web pages, and if the highlighted text is a
programming code of any sort displays a usefull summary in a
[popover element](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover).

The main purpose of CodeGlass is to contribute to a more informed decisions
during development and/or research.

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup and Installation](#setup-and-installation)
3. [Usage](#usage)
4. [Report](#report)

### Prerequisites

1. A Web Extensions API compatible browser:
   - [Chrome](https://www.google.com/intl/de/chrome/)
   - [Chromium](https://www.chromium.org/getting-involved/download-chromium/)

2. [Node.js](https://nodejs.org) 

### Setup and Installation

#### Install the Extension

All the sources for browser extension are inside `extension` sub-directory.

Depending on your browser the flow of installation may differ.

But for most Chromium based browsers [this guide](https://www.ssl2buy.com/wiki/how-to-manually-install-a-chrome-extension-in-2-ways)
covers the process fairly well.

In summary the steps are:

1. Navigate to `chrome://extensions` page.
2. Enable `Developer Mode`.
3. Drag and Drop the `extension` sub-directory onto the extensions page.

#### Set up and Run the Application Server

1. Navigate to `server` subdirectory.
2. Install dependencies with your node package manager.

   *Example for `npm`:*

   ```bash
   npm install
   ```
3. Prepare your `.env` file.

   *Example: Create from `example` file with default values*

   ```bash
   cp .env.example .env
   ```

4. Set up the Adapter

   You can choose an adapter. Currently available:
      - Gemini (Google) - `./server/adapter/clients/gemini.js`
      - ChatGPT (OpenAI) - `./server/adapter/clients/openai.js`
      - Mock (Returns harcoded values, primarily for testing) - `./server/adapter/clients/mock.js`

   To set an adapter client you need to change the following line in `./server/index.js`:

   *For example for Gemini:*
   ```javascript
      import {client} from "./adapter/clients/gemini.js"
   ```

5. Run the Server

   You can run the application server by running:

   ```bash
   npm run start
   ```

### Usage

*TODO: Write this subsection*

### Report

This repository also holds source of the project report written for the
university submission. If you want you can use it as a additional documentation.

#### Prerequisites

   - [LaTeX Distribution](https://tex.stackexchange.com/questions/239199/latex-distributions-what-are-their-main-differences)

   - [Make](https://www.gnu.org/software/make/)

#### Build

1. Navigate to the `report` subdirectory.
2. Run `make`.
3. Run `make bib`.
4. Run `make` again.
5. Inspect the `main.pdf`.
