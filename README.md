# Undocumented

**Delegate the task, not the judgment.**

A learning platform for developers who want to stay strong alongside AI.

AI can write the code. You should understand the system, verify the output, and take responsibility for what goes into production.

Undocumented contains **216 concepts across 25 chapters**. Each concept includes a concise summary, examples, a case study, and a quiz. Selected concepts also include runnable code snippets and real-world cases from companies.

The curriculum is organized into **four learning stages based on Bloom's Taxonomy**, with a self-check on the homepage to help you identify where you currently stand.

It's built around a **T-shaped learning model**:

* **25 chapters** provide broad coverage across software development.
* **30 core concepts** are explored in greater depth.

The goal isn't to replace AI or compete with it. It's to make sure you understand what AI produces, can verify whether it works, and can make sound engineering decisions.

## Quick Start

```bash
pnpm install
pnpm dev      # Start the local development server
pnpm check    # Run type checking
pnpm build    # Build for production
```

## Project Structure

* `client/src/lib/curriculum.ts` — All concept content
* `client/src/lib/syllabus.ts` — The four learning stages and their concepts
* `client/src/pages/Home.tsx` — Main homepage
* `source-curriculum.txt` — Source curriculum
* `scripts/` — Python scripts for generating and updating datasets
* `docs/` — Development notes and working documentation

## Learning Progress

Learning progress and discussion notes are stored in the browser using `localStorage`.
