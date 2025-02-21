require("dotenv").config();
const e = require("express");
const { response } = require("express");
const request = require("request");
const keywords = require('./keywords');


// This function returns a guess 'e', 'w', 'r', 'b', 'u' to categorize item for saving to db
const googleSearch = function (query) {
  const appKey = process.env.GOOGLE_SEARCH_API_KEY;
  const encodedQuery = query.replace(/\s/g, "+");
  const url = `https://kgsearch.googleapis.com/v1/entities:search?query=${encodedQuery}&key=${appKey}&limit=1&indent=True`;
  // Create promise to send back to /api endpoint
  return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
      // Parse JSON response from google
      // The main problem is the JSON response from google is dynamic
      // Sometimes the object has a detailedDescription, sometimes it doesn't etc.
      // This is the reason for the early if/return statements
        const data = JSON.parse(body);
        // If no result object is returned, return uncategorized
        if (!data.itemListElement[0]) {
          resolve('u');
          return;
        };
        // Check if a resultScore exists
        if (data.itemListElement[0].resultScore) {
          // If it exists, but is lower than 1, return uncategorized
          // most clear match searches are 5000+ score from google
          // unclear searches will be 0.9999 and below from google
          if (data.itemListElement[0].resultScore < 1) {
            resolve('u');
            return;
          }
        };
        // The object google returns has an @type key which needs to be entered like this
        const typeWorkaround = "@type";
        const types = data.itemListElement[0].result[typeWorkaround];
        // Description of item from google
        const googleDescription = data.itemListElement[0].result.description;
        let detailedDescription;
        // If no description returned and no detailedDescription returned, return uncategorized
        if (!data.itemListElement[0].result.description && !data.itemListElement[0].result.detailedDescription) {
          resolve('u');
          return;
        };
        // If it does have a detailed description
        if (data.itemListElement[0].result.detailedDescription) {
          // set the variable detailedDescription to the detailedDescription body text
          detailedDescription = data.itemListElement[0].result.detailedDescription.articleBody;
        }
        // Create string from types array returned by google
        const googleTypes = types.join(" ").toLowerCase();
        // Create a function to check returned description, types, and detailedDescription if available
        const keywordCheck = function(keywordObj){
          // Use the imported keyywords.js object
          const id = keywordObj.id;
          const list = keywordObj.arrayOfKeywords;
          // Iterate through list of keywords
          for (const keyword of list) {
            // Check if description exists and matches any keywords
            if (googleDescription) {
              if (googleDescription.toLowerCase().includes(keyword)) {
                resolve(id);
                return;
              };
            };
            // Check if types exists and matches any keywords
            if (googleTypes) {
              if (googleTypes.includes(keyword)) {
                resolve(id);
                return;
              };
            };
            // Check if detailedDescription exists and check it for keywords
            if (detailedDescription) {
              if (detailedDescription.toLowerCase().includes(keyword)) {
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
        // Check for uncategorized keywords
        keywordCheck(keywords.uncategorized);
      })
  })
};

module.exports = {
  googleSearch
};
