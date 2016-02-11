var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://whopays.scratchmag.net/page/" + 1;

request(url, function (error, response, body) {
  if (!error) {
      // load the body of the page into Cheerio so we can traverse the DOM
      var $ = cheerio.load(body);
      var titles = $("[rel='bookmark']");
      var all_titles = [];
      titles.each(function (i, title) {
      //  console.log(title);
        //title.html();
        all_titles.push($(title).html());
      });

      console.log(all_titles);
        //titles = $("[rel='bookmark']").html();






  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
