# Neopet Userscripts

This repo will host userscripts and/or data files related to userscripts to make improve some aspect of Neopet's quality of life.

## Restocking Highlighter

**Note:** This script is undeniably against ToS, but it's almost impossible to track unless you're getting ALL the high profit items (which I'm too slow for because I don't use an auto-haggler script - maybe I should?).  It's part of the reason why I haven't committed the actual userscript.

This is the JSON file I use for highlighting restockable items in Neopets.  I have a separate Violentmonkey userscript that runs on every Neopets shop (https://www.neopets.com/objects.phtml + query strings that are searched in the script), but will not be committing that here for personal greed.

Currently, this JSON file is manually updated and maintained, hence the number of commits in the history.  The eventual goal is to create a UI and maintain a local DB (while uploading schema/data on every applicable commit) that allows better color customization and automates adding and removing items based on restocking guides.

The file can be publicly fetched from [here](https://aj9ms.github.io/neopet-userscripts/data/restocking_data.json).

**Current color key:**

Note that colors can change without notice/updates in README but the corresponding meaning shouldn't change.  I haven't updated some shops to separate out profitable vs highly profitable.

|Color|What it means|Profits|Comments|
------|-------------|-------|--------|
| Linear gradients | Most profitable | Many millions (3m+?) | Used to distinguish between really good and REALLY good.|
|<span style="color: #ff99cc">#FF99CC</span> | Highly profitable|~100k+/~1m+ | Probably also the rarest too.  Usually ~100k+/~1m+ profits.|
|#99FFCC | Profitable |<~100k/<~1m | Much more common OR the shop has many more profitable items, so the tiers are a little different.|
|#E6E6E6 | Little Profit/HPD | <~3k | Common (would say r < 89), but not really profitable.  Mainly used when can't find anything else or for HPD.|

There are other shades of gray - the darker, the less profitable.

### Credits
#### Restocking Guides
* http://www.neopets.com/~Sanskrits
* http://www.neopets.com/~gwenvire

## Dice-a-roo Improvements

This is a simple Violentmonkey userscript that runs on dice-a-roo games.  It does two things:
1. It expands the width and height of the dice result explanation box.  This is so that the "roll again" button doesn't move around depending on what the result is.  The only exceptions are: when the Pant Devil steals an item, when you receive a lottery ticket, and when you receive an item.
2. Removes the "Stop playing and collect __ NP" button so you don't accidentally click it.

## Beta Shop Wizard Search

This improves the current shop wizard search, ALTHOUGH this may also *break Neopets TOS*.  Use at your own risk, as there is very little chance these scripts are trackable anyway.

If you want to make the script TOS SAFER, remove the last line in the `handlePaste` function: `$('.button-search-white').click();`

If you want to make the script *completely TOS safe*, remove ALL of the `handlePaste` function AND this line: `document.addEventListener('paste', handlePaste);`.  Note that the only thing the script will now do is #1 below.

This script does the following:
1. It changes the search dropdown from "Containing my phrase" to "Identical to."
2. **IF you use the paste key (CTRL+V)** - meaning you have an item to search for in your clipboard - the script will:
    - Paste the item name into the search box (you DO NOT have to select the search box manually)
    - Hit the search button for you
