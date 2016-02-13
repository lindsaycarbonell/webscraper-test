(function() {


var pageCount2015 = 4;

var entry = {
  title: "",
  payment: 0,
  word_range: ""
}

var all_entries = [];

var all_titles = [];
var all_prices = [];
var all_ranges = [];


for (var i = 1; i < pageCount2015; i++){
console.log("page: " + i);
var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://whopays.scratchmag.net/2015/11/page/" + i;

request(url, function (error, response, body) {

  if (!error) {


      // load the body of the page into Cheerio so we can traverse the DOM
      var $ = cheerio.load(body);

      //TITLES of news orgs
      var titles = $("[rel='bookmark']");


      titles.each(function (i, title) {
        all_titles.push($(title).html());
        console.log("title: " + $(title).html() + ", i: " + i);

      });

      //ENTRY CONTENT for posts
      var all_entries = [];


      var entry_contents = $(".entry-content");

      entry_contents.each(function (i, entry) {
        all_entries.push($(entry).html());
      });

      //PRICES AND RANGES within posts
      all_entries.forEach(function (entry, i){
        var this_entry = $(entry).html();
        //console.log(this_entry);
        var thisPrice = this_entry.match(/\$\d,?\d*( per word)?/);
        var thisRange = this_entry.match(/\d,?\d*- to \d,?\d*/);

        //only add to the array if none of the values are null.
        if(thisPrice !== null && thisRange !== null){
          console.log("price, range not null");
          all_prices.push(thisPrice[0]);
          all_ranges.push(thisRange[0]);

        } else {
          console.log("price, range NULL");
          all_prices.push("$0");
          all_ranges.push("0- to 0");
          console.log("must manually add price and range on page #" + pageCount2015 + " for: " + all_titles[i]);
        }

        //console.log("all_ranges: " + all_ranges);
        //console.log("thisRange: " + thisRange);

        //console.log(thisRange[0]);
        //console.log(thisPrice[0]);

      });









  } else {
    console.log("We’ve encountered an error: " + error);
  }
});



}

printAll();

function printAll() {
  console.log("final: " + all_ranges);
  console.log("final: " + all_prices);
  console.log("final: " + all_titles);
}


})();
