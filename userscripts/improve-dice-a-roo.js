// ==UserScript==
// @name        Dice-a-roo QoL Improvements
// @namespace   Violentmonkey Scripts
// @match       http://www.neopets.com/games/play_dicearoo.phtml
// @grant       none
// @version     1.0
// @author      aj9ms
// @description Script runs when playing dice-a-roo.  Removes the "Stop playing and collect __ NP" button, and also widens the box above to fit more text on one line.
// ==/UserScript==

// Run program
improveDiceARoo();

function improveDiceARoo() {
    const diceResult = $("table[align='center'][width='400']");
    if (diceResult && diceResult[0]) {
        diceResult[0]['width'] = 550;
        diceResult[0].style.height = "80px";
    }

    const diceForms = $("form[action='play_dicearoo.phtml']");
    if (diceForms && diceForms.length > 1 && diceForms[1]) {
        diceForms[1].style.display = 'none';
    }
}