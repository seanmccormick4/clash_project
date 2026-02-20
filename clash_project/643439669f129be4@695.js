function _1(md){return(
md`# Final Project`
)}

async function _2(FileAttachment,md){return(
md`INTRODUCTION: Clash Royale is a fast paced mobile strategy game where two players face off against each other on a small battlefield. Each player is defending their own three towers while attempting to take down their opponents. Players will deploy troops, buildings, and spells by playing cards from their own chosen 8-card deck. Each one of these units will come with a cost coming from a source of 10 regenerating elixir. Once placed, these units will act autonomously marching towards the enemies' towers and engaging in combat. Each match lasts about three minutes and revolve around timing, countering the opponent's placed cards, and managing their own elixir resources.

![image@1.png](${await FileAttachment("image@1.png").url()})

The game was released on March 2, 2016, by its developer, Supercell, with an initial set of 23 cards. Over time, Supercell has regularly updated the game, expanding the total number of cards to a staggering 121 in order to keep gameplay fresh and to introduce new strategic possibilities. As in many competitive games, Clash Royale has what is known as a “meta,” short for "Most Effective Tactic Available", which refers to the set of strategies, cards, or play-styles that are most effective at a given time. Because new cards are added and existing cards are adjusted, the meta continually shifts.

Throughout the game's lifespan, certain cards have stood out as unbalanced. Unbalanced should be seen as being either significantly stronger or weaker than the majority of other cards. When a card becomes too strong, it can dominate the meta, leading to players feeling obligated to use it in order to remain competitive among others. Additionally, cards that are too weak, are rarely seen in game. To address these issues, the developers adjust a cards attributes ("stats"), strengthening or weakening them in order to promote fairer gameplay and maintain a healthy mix of strategy/metas. However, despite these efforts, we believe Clash Royale remains unbalanced, as certain cards continue to disrupt the game's fairness and force players into limited strategic choices. Our goal in this project is to examine and demonstrate the extent of this imbalance.

To evaluate card balance within the current state of the game, we collected data using a custom-built web scraper that accessed a publicly available Clash Royale API. This API provided us with detailed statistics of the top 200 players globally, offering us insight from high-level competitive play. Similarly we used the Clash Royale wiki to track the rarity of each card. From this dataset, we compiled tables summarizing each player's decks concerning usage rate, win rate, elixir cost, and rating of each card (rating explained down below). By analyzing the frequency with which top players choose specific cards, as well as how often the cards contribute to winning matches we are able to identify whether particular cards may be unbalanced.`
)}

function _db(DuckDBClient,clash_royale_cards,all_cards,leaderboard_data){return(
DuckDBClient.of({
  card_stats: clash_royale_cards,
  all_cards: all_cards,
  leaderboard_decks: leaderboard_data
})
)}

function _all_cards(__query,FileAttachment,invalidation){return(
__query(FileAttachment("all_clash_cards_with_evos@6.csv"),{from:{table:"all_clash_cards_with_evos"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _leaderboard_data(__query,FileAttachment,invalidation){return(
__query(FileAttachment("leaderboard_data@3.csv"),{from:{table:"leaderboard_data"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _clash_royale_cards(__query,FileAttachment,invalidation){return(
__query(FileAttachment("clash_royale_cards@6.csv"),{from:{table:"clash_royale_cards"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _7(md){return(
md`**CARD POPULARITY**

`
)}

function _card_frequencies(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`SELECT card, COUNT(*) as frequency
FROM (
  SELECT UNNEST(string_split(deck, ', ')) as card
  FROM leaderboard_decks
)
GROUP BY card
ORDER BY frequency DESC
LIMIT 20`
)}

function _9(Plot,card_frequencies){return(
Plot.plot({
  marks: [
    Plot.barY(card_frequencies, {
      x: "card",
      y: "frequency",
      sort: { x: "y", reverse: true }
    }),
    Plot.ruleY([0])
  ],
  x: {
    label: "Card",
    tickRotate: -45
  },
  y: {
    label: "Frequency",
    grid: true
  },
  marginBottom: 80,
  title: "Top 20 Most Popular Cards in Leaderboard Decks"
})
)}

function _10(md){return(
md`***GRAPH ABOVE:**

We decided to illustrate and visualize the top 20 most popular cards used within the decks of the top 200 players. The graph shows that certain cards such as Barbarian Barrel, Skeletons, and fireball, are significantly more prevalent than others. These appear much more than any other cards within the game. This uneven distribution highlights the existence of a dominant meta. Cards lower or not even on the chart suggest that they perform less reliably and are less favored in high-level gameplay. The contrast between the most and least used cards visually supports the argument that the game's competitive environment is influenced by a small pool of "unbalanced" options rather than an even balance across all cards.`
)}

function _11(md){return(
md`**ZERO USAGE**`
)}

function _12(md){return(
md`We collected the decks from the top 200 players at the time of data collection. With that data we are able to see cards that are underused through the usage_rate column.`
)}

function _unused_cards(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`SELECT card_name FROM all_cards
LEFT JOIN card_stats USING (card_name)
WHERE card_stats.usage_rate IS NULL`
)}

function _14(md){return(
md`The cards that result from the above query are cards that were not in any of the top 200 decks at the time of scraping. This should be apparent to the balancing team that changes need to be made for these cards to prosper in competitive play. `
)}

function _15(md){return(
md`**DECK COST**

Another aspect of game balancing that we are going to explore is the spread of deck costs at the competitive level. The elixir cost of a deck is found by totaling the elixir costs of all of the cards in your deck and dividing by the number of cards that are in your deck. In this case, you will always be dividing by eight, though there are some exceptions depending on the game mode. To explore how the average elixir cost of the deck influences balancing, we are going to count the number of decks at each elixir cost and present them with a bar graph. `
)}

function _deck_costs(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`SELECT * FROM leaderboard_decks`
)}

function _17(Plot,deck_costs){return(
Plot.plot({
  marks: [
    Plot.rectY(deck_costs, Plot.binX({ y: "count" }, { x: "deck_cost" })),
    Plot.ruleY([0])
  ],
  x: {
    label: "Average Deck Cost (Elixir) →"
  },
  y: {
    label: "↑ Number of Decks",
    grid: true
  }
})
)}

function _18(md){return(
md`Using the graph above, we see that competitive players are deciding to choose lower elixir decks as opposed to higher elixir decks. We do notice a influx of decks around four elixir on average, but anything past that is generally underrepresented. This shows that some of the higher elixir strategies such as beatdown or bridge spam could use some help from the developer team. `
)}

function _19(md){return(
md`**Evolutions**
`
)}

function _evo_exploration(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`SELECT * FROM all_cards
LEFT JOIN card_stats USING (card_name)
WHERE is_evo = TRUE

UNION

SELECT * FROM all_cards
LEFT JOIN card_stats USING (card_name)
WHERE has_evo = TRUE
order by card_name`
)}

function _non_evo(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`SELECT * FROM all_cards
LEFT JOIN card_stats USING (card_name)
WHERE has_evo = TRUE`
)}

function _selectedCard(Inputs,non_evo){return(
Inputs.select(
  non_evo.map((c) => c.card_name),
  {
    label: "Select a card:",
    value: non_evo[0]?.card_name
  }
)
)}

function _23(Plot,evo_exploration,selectedCard){return(
Plot.plot({
  marks: [
    Plot.barY(
      evo_exploration.filter(
        (d) =>
          d.card_name === selectedCard ||
          d.card_name === `${selectedCard} Evolution`
      ),
      {
        x: "card_name",
        y: "usage_rate",
        fill: (d) => (d.is_evo ? "#e74c3c" : "#3498db"),
        tip: true
      }
    )
  ],
  x: {
    label: "Card"
  },
  y: {
    label: "Usage Rate (%)",
    grid: true,
    domain: [0, 40]
  },
  marginBottom: 80,
  title: `Usage: ${selectedCard} vs ${selectedCard} Evolution`
})
)}

function _24(md){return(
md`
Evolutions are upgraded versions for some of the base cards. Every deck is limited to 2 evolutions so in many situations a player may     decide to use the base version as opposed to the Evo. There are many factors to be considered when evolving a card such as card cost,    deck synergy, but most importantly the difference in utility between the base version and the evolution. If the base card is used           significantly more than the evo it may mean that the evolution should be improved and if only the evolution is used perhaps the card's     two forms should be adjusted to be closer in power.`
)}

function _25(md){return(
md`**Tower Troops**`
)}

function _tower_troop(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`SELECT * FROM all_cards
LEFT JOIN card_stats USING (card_name)
where is_tower_troop = true`
)}

function _27(Plot,tower_troop){return(
Plot.plot({
  marks: [
    Plot.barY(tower_troop, {
      x: "card_name",
      y: "usage_rate",
      sort: { x: "y", reverse: true }
    }),
    Plot.ruleY([0])
  ],
  title: "Tower Troop Usage Spread"
})
)}

function _28(md){return(
md`**Tower Troops:**

Along with your eight card deck, players also choose from one of four tower troops. These troops serve as a constant defense to defend your king tower. The troops have no cost but vary in damage, health, rate of fire, and some have unique effects. Although there are multiple options the players overwhelming use just a single tower, that being the princess. This massive differnce in ussage shows a desperate need for further balancing efforts. `
)}

function _29(md){return(
md`**CONCLUSION**

The data in these graphs makes one point clear: Clash Royale is not operating as a balanced competitive environment. The disproportionate usage rates and the overperformance of certain cards and archetypes show that players are not choosing strategies freely—they’re being funneled into a narrow meta dominated by a few overtuned options. When a handful of cards consistently outperform the rest, it limits creativity, raises the skill floor artificially, and undermines the fairness that a competitive game should provide. Ultimately, these patterns highlight a need for more consistent and responsive balance updates to ensure that every player, regardless of deck choice, has an equal chance to compete.`
)}

function _30(md){return(
md`*References*

https://clashroyale.fandom.com/wiki/Clash_Royale_Wiki

https://royaleapi.com/?lang=en`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["clash_royale_cards@6.csv", {url: new URL("./files/71bc9cec0432acb4609b3a9c920ffa4a34b43c91225313e9009d4c06529fab29d82a323e22e1d75a2b1a6818d61f542ba78cda44f7b954784500ea498174be6c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["leaderboard_data@3.csv", {url: new URL("./files/92fdee12a937c21f5ed4426e1dd7a6ecb9e01c13b0f384fba1e03cdcb853ad9afece8eedfbd3791441d450f99e045a0246edc7c2118a52fe9561284e1e147f35.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["all_clash_cards_with_evos@6.csv", {url: new URL("./files/970680406deeaa31546549cabc7d3cf2be4d25fc7f818c7a830f9f5e1c77b9efbafc71272aaf5139eb47aabe4239008774a2d8061139f2fad96e7d04f546c1f8.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["image@1.png", {url: new URL("./files/6435a2b70a513acaf0169f1ab2b7b03860ea0a53bfe04c8e32d34b748ff3abc2a1be67e598fa8f2caabbfaabe31acfda36520a023bd28967eff0b2f5c79bd3b7.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment","md"], _2);
  main.variable(observer("db")).define("db", ["DuckDBClient","clash_royale_cards","all_cards","leaderboard_data"], _db);
  main.variable(observer("all_cards")).define("all_cards", ["__query","FileAttachment","invalidation"], _all_cards);
  main.variable(observer("leaderboard_data")).define("leaderboard_data", ["__query","FileAttachment","invalidation"], _leaderboard_data);
  main.variable(observer("clash_royale_cards")).define("clash_royale_cards", ["__query","FileAttachment","invalidation"], _clash_royale_cards);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("card_frequencies")).define("card_frequencies", ["__query","db","invalidation"], _card_frequencies);
  main.variable(observer()).define(["Plot","card_frequencies"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("unused_cards")).define("unused_cards", ["__query","db","invalidation"], _unused_cards);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("deck_costs")).define("deck_costs", ["__query","db","invalidation"], _deck_costs);
  main.variable(observer()).define(["Plot","deck_costs"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("evo_exploration")).define("evo_exploration", ["__query","db","invalidation"], _evo_exploration);
  main.variable(observer("non_evo")).define("non_evo", ["__query","db","invalidation"], _non_evo);
  main.variable(observer("viewof selectedCard")).define("viewof selectedCard", ["Inputs","non_evo"], _selectedCard);
  main.variable(observer("selectedCard")).define("selectedCard", ["Generators", "viewof selectedCard"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","evo_exploration","selectedCard"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("tower_troop")).define("tower_troop", ["__query","db","invalidation"], _tower_troop);
  main.variable(observer()).define(["Plot","tower_troop"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  return main;
}
