# Neopet Userscripts

This repo will host userscripts and/or data files related to userscripts to make improve some aspect of Neopet's quality of life.

## Restocking Highlighter

This is the JSON file I use for highlighting restockable items in Neopets.  I have a separate Violentmonkey userscript that runs on every Neopets shop (https://www.neopets.com/objects.phtml + query strings that are searched in the script), but will not be committing that here for personal greed.

Currently, this JSON file is manually updated and maintained, hence the number of commits in the history.  The eventual goal is to create a UI and maintain a local DB (while uploading schema/data on every applicable commit) that allows better color customization and automates adding and removing items based on restocking guides.

The file can be publicly fetched from [here](https://aj9ms.github.io/restocking-highlighter/restocking_data.json).

**Current color key:**

Note that colors can change without notice/updates in README but the corresponding meaning shouldn't change.  I haven't updated some shops to separate out profitable vs highly profitable.

|Color|What it means|Profits|Comments|
------|-------------|-------|--------|
|![#ff99cc](https://placehold.it/10x10/ff99cc/ff99cc) #FF99CC | Highly profitable|~100k+ | Probably also the rarest too.  Usually ~100k+ profits.|
|![#99ffcc](https://placehold.it/10x10/99ffcc/99ffcc) #99FFCC | Profitable |<~100k | Much more common.|
|![#e6e6e6](https://placehold.it/10x10/e6e6e6/e6e6e6) #E6E6E6 | Little Profit/HPD | <~3k | Common (would say r < 89), but not really profitable.  Mainly used when can't find anything else or for HPD.|

### Credits
#### Restocking Guides
* http://www.neopets.com/~Sanskrits
* http://www.neopets.com/~gwenvire
