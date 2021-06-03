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
        console.log("data:", data);
        // Get the types array returned from google via a workaround for the @ symbol
        if (!data.itemListElement[0]) {
          console.log('if statement 1');
          resolve('u');
          return;
        }
        if (data.itemListElement[0].resultScore) {
          console.log('Result score:', data.itemListElement[0].resultScore)
          if (data.itemListElement[0].resultScore < 1) {
            console.log('low result score');
            resolve('u');
            return;
          }
        }
        const typeWorkaround = "@type";
        const types = data.itemListElement[0].result[typeWorkaround];
        // description of item from google, sometimes undefined
        const googleDescription = data.itemListElement[0].result.description;
        let detailedDescription;
        if (!data.itemListElement[0].result.description && !data.itemListElement[0].result.detailedDescription) {
          resolve('u');
          console.log('if statement 2');
          return;
        }
        if (data.itemListElement[0].result.detailedDescription) {
          detailedDescription = data.itemListElement[0].result.detailedDescription.articleBody;
        }
        // const wikiArticle = data.itemListElement[0].result.detailedDescription.articleBody;
        console.log("result:", data.itemListElement[0].result);
        // console.log("wiki article:", wikiArticle);
        if (googleDescription) {
          console.log("description", googleDescription);
        };
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
                resolve(id);
                console.log('if statement 3 - description');
                return;
              };
            };
            if (googleTypes) {
              if (googleTypes.includes(keyword)) {
                resolve(id);
                console.log('if statement 5 - google types');
                return;
              };
            };
            if (detailedDescription) {
              if (detailedDescription.toLowerCase().includes(keyword)) {
                resolve(id);
                console.log('if statement 4 - detailed description');
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
        // Check for uncategorized keywords
        keywordCheck(keywords.uncategorized);
      })
  })
};

module.exports = {
  googleSearch
};
