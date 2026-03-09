# Final Project

https://observablehq.com/d/643439669f129be4@695

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/d/643439669f129be4@695.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "643439669f129be4";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~

# Is Clash Royale Balanced? A Data-Driven Analysis

## Overview
Competitive players frequently debate whether Clash Royale is balanced, but discussions are often based on anecdotal experiences rather than data. This project uses web scraping and statistical analysis to evaluate card balance and meta dominance in high-level competitive play.

The goal is to determine whether certain cards dominate the competitive meta using real gameplay data.

---

## Problem
Game balance is critical in competitive multiplayer games. However, balance discussions often rely on subjective opinions rather than objective metrics.

This project investigates:

- Which cards appear most frequently in top-ranked decks
- Whether certain cards have significantly higher win rates
- How the competitive meta shifts across matches

---

## Dataset
Data was collected using a custom Python web scraper that gathered deck usage and win-rate statistics from high-ranking players.

Collected information includes:

- Card usage frequency
- Deck compositions
- Win rates
- Competitive ranking data

---

## Tools & Technologies
- **Python**
- **Web Scraping**
- **Pandas**
- **Data Visualization Libraries**
- **Statistical Analysis**

---

## Methodology
1. Built a web scraper to collect deck and match data from competitive players.
2. Structured and cleaned the dataset using Pandas.
3. Calculated card usage frequencies and win rates.
4. Visualized card dominance within the competitive meta.
5. Evaluated whether certain cards significantly outperform others.

---

## Key Insights
The analysis revealed:

- Cards with extremely high usage rates in competitive play
- Cards with unusually high win rates
- Potential meta-dominant strategies

These findings help identify whether certain cards may be overpowered or disproportionately influential in competitive gameplay.

---

## Example Analyses
- Top cards by usage rate
- Win rate comparisons across cards
- Meta composition of top-ranked decks
- Correlation between deck composition and match success

---

## Future Improvements
- Expand dataset to include more player ranks
- Track balance changes across game patches
- Implement predictive modeling for deck performance

---

## Repository Structure
