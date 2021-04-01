// ==UserScript==
// @name        Neopets Haggling
// @namespace   Violentmonkey Scripts
// @match       http://www.neopets.com/haggle.phtml
// @grant       none
// @version     1.0
// @author      aj9ms
// @description 2/3/2021, 2:48:06 PM
// ==/UserScript==


// Run program
shopHaggle();

function shopHaggle() {
    const haggleInput = $("input[type='text'][name='current_offer']");
    const shopkeeperSays = $("#shopkeeper_makes_deal b");
    if (haggleInput && haggleInput.length > 0 && shopkeeperSays && shopkeeperSays.length > 0) {
      const text = shopkeeperSays[0].textContent.split(' ');
      const price = text[text.indexOf('Neopoints') - 1].replace(/,/g, '');
      const hagglePrice = parseInt(parseInt(price) * 0.98);
      haggleInput.val(hagglePrice);
    }
}