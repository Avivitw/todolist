require("dotenv").config();
const e = require("express");
const { response } = require("express");
const request = require("request");
const keywords = require('./keywords');
const args = process.argv[2];

// This function returns a guess 'e', 'w', 'r', 'b' to categorize item
const googleSearch = function (query) {
  const appKey = process.env.GOOGLE_SEARCH_API_KEY;
  const encodedQuery = query.replace(/\s/g, "+");
  const url = `https://kgsearch.googleapis.com/v1/entities:search?query=${encodedQuery}&key=${appKey}&limit=1&indent=True`;
  // Promise to retrieve category guess from google
  return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
        const data = JSON.parse(body);
        console.log("error:", error);
        // Get the types array returned from google via a workaround for the @ symbol
        const typeWorkaround = "@type";
        const types = data.itemListElement[0].result[typeWorkaround];
        // description of item from google, sometimes undefined
        const googleDescription = data.itemListElement[0].result.description;
        console.log("description:", googleDescription);
        console.log("type:", types);
        // Checks description first for keywords
        // Eat list keywords
        const googleTypes = types.join(" ").toLowerCase();
        const keywordCheck = function(keywordObj){
          const id = keywordObj.id;
          const list = keywordObj.arrayOfKeywords;
          for (const keyword of list) {
            // Check avoids error if description is undefined
            if (googleDescription) {
              if (googleDescription.toLowerCase().includes(keyword)) {
                console.log(`added to ${id} list`);
                resolve(id);
                return;
              };
            };
            if (googleTypes) {
              if (googleTypes.includes(keyword)) {
                console.log(`added to ${id} list`);
                resolve(id);
                return;
              };
            };
            };
        };
        // Checks description and type for eat keywords
        keywordCheck(keywords.eat);
        // Checks description and type for watch keywords
        keywordCheck(keywords.watch);
        // Checks description and type for read keywords
        keywordCheck(keywords.read);
        // Checks description and type for buy keywords
        keywordCheck(keywords.buy);
      })
  })
};

module.exports = {
  googleSearch
};
