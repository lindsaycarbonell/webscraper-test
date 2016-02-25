(function() {


var pageCount2015 = 3;
var all_entries = [];
var all_titles = [];
var counter=0;

for (var mainIndex = 1; mainIndex <= pageCount2015; mainIndex++){
  console.log("page: " + mainIndex);
  var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://whopays.scratchmag.net/2015/11/page/" + mainIndex;
    console.log(url);

  request(url, function (error, response, body) {

    //console.log(i);
    counter++;

  if (!error) {


      // load the body of the page into Cheerio so we can traverse the DOM
      var $ = cheerio.load(body);

      //global vars
      var titles = $("[rel='bookmark']");
      var entry_contents = $(".entry-content");

      createEntries();

  function createEntries(){
      titles.each(function (i, title) {
        all_titles.push($(title).html());
      }); //titles.each
//console.log(entry_contents.length);
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

if (counter==pageCount2015){
    var json2csv = require('json2csv');
    var fields = ['key', 'title', 'range', 'price'];

    json2csv({ data: all_entries, fields: fields }, function(err, csv) {
      if (err) console.log(err);
      console.log(csv);
    });


  // all_entries.forEach(function (entry, i){
  //   console.log("key: " + entry.key);
  //   console.log("title: " + entry.title);
  //   console.log("price: " + entry.price);
  //   console.log("range: " + entry.range);
  // });


      }

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




//console.log("all entries: " + all_entries);

})();
