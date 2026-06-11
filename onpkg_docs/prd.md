---
name: prd
description: "Product Requirements Document (PRD) for CT Confessions - detailing features, target audience, UX/UI theme, and requirements based on ria-confession-vault.lovable.app."
metadata:
  version: 1.1.0
---

# Product Requirements Document (PRD) 📖
## CT Confessions (ria_22)

---

## 1. Executive Summary & Product Vision

### 1.1 Introduction
**CT Confessions** is an anonymous, highly interactive web application designed for the Crypto Twitter (CT) community. It serves as a showcase/demo for **Dopamint**, an AI character memory and personality persistence infrastructure.

### 1.2 Value Proposition & Slogan
* **Slogan**: `anonymous crypto confessions. public embarrassment. potential rewards.`
* **Core Hook**: Users anonymously submit their crypto regrets, rugs, and on-chain embarrassments, receiving immediate, sassy feedback from **RIA**, the virtual "Regina George of Crypto Twitter."
* **Memory Infrastructure**: The project functions as the primary demo for Dopamint’s memory layer, showcasing how AI characters can persist, recall contexts, and identify user behavioral patterns.

---

## 2. Target Audience & Persona

* **Degen Traders**: Individuals who suffer from FOMO, buy tops, sell bottoms, and trade with extreme leverage.
* **Web3 Developers**: Coders who make accidental smart contract mistakes, lose deployer keys, or get caught in gas wars.
* **Web3 Founders & Marketers**: Team members navigating the ironies of DAO governance, token distributions, and backroom trading.

---

## 3. Product Features & User Experience

### 3.1 Landing Page (Home)
* **Interactive Decals**: Draggable scrapbooking stickers (Cat, Rugged, Diamond Hands, Moon, Approved) enabling a kinetic playground experience.
* **RIA speech bubble**: A dynamic quote bubble showing RIA's "Roast of the Minute" cycling every 5 seconds.
* **Quick Navigation Cards**:
  * *Live Feed Card*: "endless poor decisions, sorted by chaos. enter →"
  * *Leaderboard Card*: "most viral confessions. best CT responders. enter →"
  * *Reward Center Card*: "$5,000 in DOPE. confession of the week. enter →"
* **Things RIA Has Noticed Widget**: Aggregated metrics reflecting community actions (SOL sold early, tops bought, community-trading founders).

### 3.2 Live Feed
* **Search & Filters**: Users search confession texts and filter listings by category tags (*Trading*, *Memecoin*, *Founder*, *Dev*, *Gossip*, *Crush*, *Fail*).
* **Clean Card Layout**: Displays only core details (confession text, category tag, timestamp, and RIA's roast text) to maintain a minimalist, scrapbook clipping aesthetic. Visual social metrics like hearts, comment counts, and flame meters are hidden from the card.
* **Social Sharing**: "Share to X" (Twitter) intents and automated image exporting (Meme Card Modal).

### 3.3 The Submission Flow
* **Anonymous Form**: Simple markdown/notebook-styled sheet allowing users to input their confession text and specify a category.
* **Sequential Loading Sequence**: Bouncing icons showcasing RIA's "cognitive process" (e.g. *RIA is rolling her eyes...*, *Structuring maximum levels of sass...*).
* **Response Generation**: Sassy automated roasts based on text parsing rules.

### 3.4 RIA's Memory Wall
* **Polaroid Corkboard Layout**: Interactive frames containing legendary past crypto scandals pinned using virtual pins and washi tape.
* **Things RIA Has Noticed Metric List**:
  * 5 people sold SOL too early
  * 11 people bought tops because influencers tweeted
  * 7 founders secretly traded against their own communities
  * 14 wallets bridged to the wrong chain this week
  * 23 people called it 'just a dip' before it wasn't
  * 9 airdrop farmers earned less than a coffee
  * 31 traders said 'last trade' and then traded again
  * 47 people blamed the chart instead of themselves
* **The Memory Layer Slogan**: `every pattern, every repeat offender, every "this time is different." stored, recalled, and weaponized. this is where Dopamint's memory infrastructure becomes visible.`

### 3.5 Classified Decoder (Day 9 / Reveal)
* **Tap-to-Hatch Mechanic**: An interactive sleeping egg that cracks after 9 taps to reveal a hexadecimal hash.
* **Decryption Terminal**: A green terminal interface showing matrix-style decryption effects to output the secret string: `🎀 RIA CONFESSIONS ARE THE BEST! 🎀`.
* **Dopamint Infrastructure Explanations**:
  * *AI Memory Layer*: Durable memory RIA recalls, cross-references, and acts on.
  * *Personality Persistence*: Voice and judgment stay consistent across millions of interactions.
  * *Context Retention*: Holds threads of who said what and when.
  * *Long-Term Character Memory*: Memory spanning days, weeks, and seasons.
  * *Infrastructure Architecture*: Composable memory backbone any AI personality can plug into.

### 3.6 Reward Center
* **Airdrop Checkpoints**: Interactive list of tasks (e.g. submitting a confession, upvoting, or downloading meme cards) to earn `$DOPE` points.
* **Prize Pool Distribution**: $5,000 in DOPE divided among:
  * *Top 10* weekly virality champions.
  * *Daily Winners* of the most unhinged confession.
  * *RIA Picks* (rare picks).
* **Badges/Achievements**:
  * Confessed to selling too early.
  * Held through unspeakable pain.
  * You were the plan all along.
  * Confessed founder-tier chaos.
  * Submitted 10+ confessions.
  * A 7-figure confession.
  * Shared 25 confessions.

---

## 4. Visual Design & Interface Tokens

* **Style**: Retro Collage & Scrapbook theme.
* **Components**: Torn paper sheets, grid lines, washi tape, push pins, handwritten headers (`font-script`), custom cursor.
* **Colors**: Soft warm cream (#FAF6EE) dot-grid backdrop, white card overlays (#FFFFFF) with realistic SVG torn paper edges, pink primary indicators.
* **Performance**: Under 1-second load times. All client states persist in `localStorage` through Zustand.
