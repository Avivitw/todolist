const request = require('request');

const generalSearch = function (query){
  // Unique appId from Wolfram
  const appId = 'HJH49X-4TV9W3LX7Q';
  // Encode query for URL insertion
  const encQuery = encodeURIComponent(query);
  // Wolfram Api URL
  const url = `http://api.wolframalpha.com/v2/query?appid=${appId}&input=${encQuery}&output=json`;
  // Avg query time for 'full-data' Wolfram endpoint is about 7.5 seconds
  request(url, function(error, response, body){
  // Data 'pods' retrieved from the server
  const data = JSON.parse(body);
  const assumedTypes = data.queryresult.datatypes;
  // true or false if search in their db was successful
  console.log('assumed type:', assumedTypes);
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', data);
});
};

const searchMovie = function(query) {
  // Example request https://api.themoviedb.org/3/movie/550?api_key=8eb5f5dee8a6b4179174ab1bb9af5f57
  // API Key
  const appKey = '8eb5f5dee8a6b4179174ab1bb9af5f57';
  // Encode query for URL insertion
  const encQuery = encodeURIComponent(query);
  // Movie search URL
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${appKey}&query=${encQuery}`;
  request(url, function(error, response, body){
    const data = JSON.parse(body);
    const firstEntry = data.results[0];
    const popularity = firstEntry.popularity;
    const receivedTitle = firstEntry.title;
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', firstEntry);
    console.log('popularity:', popularity);
  });
};

const bookSearch = function(query){
  // example search GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
  const appKey = 'AIzaSyCxnMrh0sv8614YdHV5lGD-p-9-Mt3bvD8';
    // Encode query for URL insertion
  const encQuery = encodeURIComponent(query);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encQuery}&key=${appKey}`;
  request(url, function(error, response, body){
    const data = JSON.parse(body);
    const firstEntry = data.results[0];
    const popularity = firstEntry.popularity;
    const receivedTitle = firstEntry.title;
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', firstEntry);
    console.log('popularity:', popularity);
  });
};

