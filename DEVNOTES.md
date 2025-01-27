# Development Notes

## Initial Idea

AI-Powered browser extension to automatically analyze and summarize
highlighted code snippets or single functions.

## High Level Overview

Browser extension tracks user highlighting text in browser, uses AI agent to
identify programming code in the highlighted text, if the code is present
uses AI agent to do a static analysis of highlighted code and gives user a
nice popover with analysis summary

## Features Ideas

1. Nice-to-Have

    - Automatic Unit test generation for given functions/classes
    - Automatic bug fixing

2. Core

    - Configuration of max highight size (performance, usability)
    - Static code analysis
    - Popover displaying:
        - General info:
            - Detected Programming Language
            - Detected entities (?)
                - Functions
                - Variables
                - Classes/objects
                - Common Data Structures
                - Common Algorithms
        - Found bugs count
        - Benchmarks:
            - Coding standards adherance rates
            - Cyclomatic complexity
            - Space complexity
            - Time complexity
            - Best Practices Followed Rate (?)


## Research

### AI Agents Development

- [ ] [Overview Blog Post about AI Agents](https://github.blog/ai-and-ml/generative-ai/what-are-ai-agents-and-why-do-they-matter/)
- [ ] [Same kinda stuff but from AWS](https://aws.amazon.com/what-is/ai-agents/)
- [ ] [Probaly also worth cheking out](https://www.scientificamerican.com/article/what-are-ai-agents-and-why-are-they-about-to-be-everywhere/)

- [Examples of AI Agents on GitHub](https://github.com/e2b-dev/awesome-ai-agents)
- [Clippy](https://github.com/ennucore/clippinator)

After some initial glance at what are AI Agents, I'm not still sure that it is
the right tool/approach for this project. A simple "proxy" server talking to 
some LLM API could be sufficient.

- [ ] Deno 2 General Research
- [ ] How to write REST APIs in Deno 2


## Stack

1. Extension

    - Plain js, no typescript
    - Manifest v3
    - Custom fetch wrappers, no extra libs for http requests

2. Backend (Server Part)

    - Try Deno 2 as runtime
    - Keep Auth mechanism as simple as possible
