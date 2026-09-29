# Undocumented

**Delegate the task, not the judgment.**

AI makes writing code easier. Understanding software is still your job.

Learn how systems work, validate AI-generated code, and build software you can stand behind.

## What You'll Learn

Undocumented is a developer learning platform built for the age of AI.

The curriculum covers **215 concepts across 25 chapters**, designed to build breadth without sacrificing depth.

Each concept includes:

* A concise explanation
* Practical examples
* Real-world case studies
* Interactive quizzes
* Runnable code snippets for selected topics
* Real cases from companies and engineering teams

The curriculum follows a **T-shaped learning model**:

* **25 chapters** give you broad coverage across software engineering.
* **30 core concepts** go deeper, focusing on the ideas that matter most for understanding and making engineering decisions.

The goal isn't to compete with AI at writing code.

It's to make sure you understand the code AI writes, can recognize when it's wrong, and can make the engineering decisions that AI can't make for you.

## Quick Start

```bash
pnpm install
pnpm dev      # Start the local development server
pnpm check    # Run type checking
pnpm build    # Build for production
```

## Project Structure

* `client/src/lib/curriculum.ts` — The complete concept curriculum
* `client/src/lib/syllabus.ts` — Learning stages and their associated concepts
* `client/src/pages/Home.tsx` — Main application page
* `source-curriculum.txt` — Source curriculum data
* `scripts/` — Python scripts for generating and updating curriculum datasets
* `docs/` — Development notes and working documentation

## Learning Progress

Learning progress and discussion notes are stored locally in the browser using `localStorage`.

No account or backend is required.
