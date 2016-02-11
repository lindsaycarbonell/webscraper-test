var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://whopays.scratchmag.net/page/" + 1;

request(url, function (error, response, body) {
  if (!error) {
      // load the body of the page into Cheerio so we can traverse the DOM
      var $ = cheerio.load(body);
      var titles = $("[rel='bookmark']");
      var all_titles = [];
      //get all the titles of news orgs
      titles.each(function (i, title) {
        all_titles.push($(title).html());
      });

      var entry_contents = $(".entry-content");
      var all_entries = [];
      var all_prices = [];
      var all_ranges = [];

      entry_contents.each(function (i, entry) {
        all_entries.push($(entry).html());
      });

      all_entries.forEach(function (entry, i){
        var this_entry = $(entry).html();
        //console.log(this_entry);
        var thisPrice = this_entry.match(/\$\d,?\d*( per word)?/);
        //
        var thisRange = this_entry.match(/\d,?\d*- to \d,?\d*/);

        all_prices.push(thisPrice[0]);
        all_ranges.push(thisRange[0]);
        //console.log(thisRange[0]);
        //console.log(thisPrice[0]);




      });

      console.log(all_ranges);
      console.log(all_prices);
      console.log(all_titles);







  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
