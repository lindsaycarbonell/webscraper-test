(function() {


var pageCount2015 = 3;
var all_entries = [];
var all_titles = [];


for (var i = 1; i < pageCount2015; i++){
  console.log("page: " + i);
  var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://whopays.scratchmag.net/2015/11/page/" + i;
    console.log(url);

  request(url, function (error, response, body) {

    console.log(i);

  if (!error) {


      // load the body of the page into Cheerio so we can traverse the DOM
      var $ = cheerio.load(body);

      //global vars
      var titles = $("[rel='bookmark']");
      var entry_contents = $(".entry-content");

      //createEntries();

  function createEntries(){
      titles.each(function (i, title) {
        all_titles.push($(title).html());
      }); //titles.each

      entry_contents.each(function (i, entry) {
        //all_entries.push($(entry).html());

        all_entries.push({
          key: i,
          title: all_titles[i],
          range: getTheRange(entry),
          price: getThePrice(entry)
        });

      });

        //console.log("title: " + $(title).html() + ", i: " + i);



      console.log(all_entries);

    }

      function getTheRange(entry){
        entry = $(entry).html();

        var thisRange = entry.match(/\d,?\d*- to \d,?\d*/);

        if(thisRange !== null){
          return thisRange[0];
        } else {
          //console.log("manually enter the range");
          return "0 to 0-";
        }

      }

      function getThePrice(entry){
        entry = $(entry).html();
        var thisPrice = entry.match(/\$\d,?\d*( per word)?/);

        if(thisPrice !== null){
          return thisPrice[0];
        } else {
          //console.log("manually enter the price");
          return "$0";
        }

      }











  } else {
    console.log("We’ve encountered an error: " + error);
    console.log(i);
  }
});



}




console.log("all entries: " + all_entries);

})();
