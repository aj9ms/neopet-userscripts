// ==UserScript==
// @name        Neopets Shop Till
// @namespace   Violentmonkey Scripts
// @match       http://www.neopets.com/market.phtml
// @grant       none
// @version     1.0
// @author      aj9ms
// @description 2/1/2021, 9:47:48 PM
// ==/UserScript==


withdrawMoney()

/*
 * Helper functions
 */

function withdrawMoney() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('type') || params.get('type').toLowerCase() != 'till') {
      return;
    }
    const sentence = $('p')[0].textContent.split(' ');
    const neopoints = sentence[sentence.indexOf("NP") - 1].replace(/,/g, '');
    
    if (neopoints.trim() == "0") {
      return;
    }
    $("input[type='text'][name='amount']").val(neopoints);
}