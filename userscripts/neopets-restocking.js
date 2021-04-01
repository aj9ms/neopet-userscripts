// ==UserScript==
// @name        Neopets Restocking
// @namespace   Violentmonkey Scripts
// @match       http://www.neopets.com/objects.phtml*
// @grant       none
// @version     1.0
// @author      aj9ms
// @description Script to run on all stores, with customization enabled.  Since the @match metadata (which is set by Chrome) doesn't allow matching by query strings (only path),
// the script runs every time after a neopets link is loaded.
// ==/UserScript==

// ------------------------------ All customizable data for restocking (items and name) ------------------------------ //
// MOVED - see github for details

// --------------------------------------------------- THE PROGRAM --------------------------------------------------- //

const _DATA = '';

// Run program
restock();

/*
 * Helper functions
 */

function npWarning(element) {
    const neopoints = parseInt(element[0].textContent.replace(/,/g, ''));
    if (neopoints < 200000) {
        const npStyle = document.createElement('style');
        npStyle.innerHTML = 
            '.insufficient-neopoints {' +
              'position: fixed; top: 0; left: 35%; border: 0; background-color: #ffffff; font-size: 36px; color: #ff99cc; z-index: 999999;' +
            '}';
        const insufficientNpDiv = document.createElement('div');
        insufficientNpDiv.className = "insufficient-neopoints";
        const content = document.createTextNode("INSUFFICIENT NEOPOINTS (" + neopoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ")!!!!");

        // add the text node to the newly created div
        insufficientNpDiv.appendChild(content);

        // add the newly created element and its content into the DOM
        document.body.appendChild(npStyle);
        document.body.appendChild(insufficientNpDiv);
      
        element[0].style.fontSize = "48px";
    }
}

function highlight(shopId, data, listings) {
    const shopData = data.shops[shopId];
    if (!listings || !shopData) {
        return;
    }
    const colors = Object.keys(shopData);
    listings.each((index, element) => {
        // Get item name in shop.
        const currentItem = element.children[1].textContent;
        // Look through JSON data for match.
        colors.forEach(color => {
            const values = shopData[color];
            values.forEach(item => {
                if (item.toLowerCase().trim() == currentItem.toLowerCase().trim()) {
                    // Automatically click if it's gradient
                    if (color == 'linear-gradient(#ff99cc, white)' || color == '#ff99cc') {
                        element.children[0].click();
                        $("#confirm-link.button-default__2020.button-green__2020").click();
                    }
                  
                    element.style.backgroundColor = color;
                    // For linear-gradient categories (most profitable items)
                    element.style.backgroundImage = color;
                }
            });
        });

        // If item price is EXACTLY 5k or 10k, add a yellow border.
        const currentPrice = element.children[3].textContent.split(" ")[1];
        let borderedPrices = ["5,000", "10,000"];
        // Account for half price day versions of 5k/10k items
        const currentDate = new Date();
        if (currentDate.getDate() == 3) {
          borderedPrices.push("2,501");
          borderedPrices.push("5,001");
        }
        if (borderedPrices.includes(currentPrice)) {
          const currentDay = new Date();
          element.style.border = "2px solid #e7e7a9";
        }
    });
}

/*
Acts as the main function
*/
function restock() {
    // Retrieve current shop from the URL.  Stops if current page is not a shop.
    const params = new URLSearchParams(window.location.search);
    const shopId = params.get('obj_type');
    if (!params.has('type') || !params.has('obj_type') || params.get('type').toLowerCase() != 'shop' || !shopId) {
        return;
    }
  
    fetch("https://aj9ms.github.io/neopet-userscripts/data/restocking_data.json")
    .then(res => res.json())
    .then((data) => {
        const npSpan = $("span[id='npanchor'][class='np-text__2020']");
        const npLink = $("a[id='npanchor'][href='/inventory.phtml']");
      
        // Neopets Beta site
        if (npSpan.length > 0) {
            // If below 200k, give warning!
            npWarning(npSpan);
          
            // Retrieve all listings.
            const listings = $(".shop-item");
            highlight(shopId, data, listings);
        }
        else { // Neopets Classic
            // If below 200k, give warning!
            npWarning(npLink);
          
            // Retrieve all listings.
            const listings = $("td[valign='top'][width='120'][align='center']");
            highlight(shopId, data, listings);
        }
    })
    .catch(err => {
      alert(err); 
    });
}