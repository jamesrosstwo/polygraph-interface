var getSubtitles = require("youtube-captions-scraper").getSubtitles;
var saveNote = document.querySelector('#save-note');
var checkFacts = document.querySelector('#check-facts');
var deleteNotes = document.querySelector('#delete-notes');
var notesField = document.querySelector('#note-value');
var analyzeButton = document.querySelector("#analyze");



let url = ""
chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, tabs => {
   url = tabs[0].url;
   var tab = tabs[0];

   if (url.includes('youtube.com')&&url.includes('v=')){
    function redBtn (results){
      document.querySelector("#analyze").className = "btn btn-danger"
  }

  chrome.tabs.executeScript(tab.id, {
      code: 'document.querySelector("#analyze").classList'
    }, redBtn);
} else {
  function greyOutBtn (results){
      document.querySelector("#analyze").className = "btn btn-secondary"
  }
  chrome.tabs.executeScript(tab.id, {
      code: 'document.querySelector("#analyze").classList'
    }, greyOutBtn);
}
});

var Entry =function(time,statement,rating){
  this.time = time;
  this.statement = statement;
  this.rating = rating;
}

// var time_DOM = document.getElementsByClassName("res_list").appendChild()


var addEntries = function(results){
  for (var [key, value] of Object.entries(results)){
    // newEntry = new Entry(key, json_obj.key.statement, value.rating)
    // var li = document.getElementsByClassName("li");
    // li.appendChild(document.createTextNode(keyVal))
    var html = '<li class="result" onclick="location_href='+
    value["url"]+'"><p class="time_statement">At second '+
    key +': <span>'+value["original_claim"] + ' </span><br><p class="rating">Rating:<a href = "'+value["url"]+'"> <span>'+value["textual_rating"]+'</p></a></li>'


    document.querySelector('.res_list').insertAdjacentHTML('beforeend', html)

  } 
  alert(value["url"])

}
analyze.onclick = function add_flagged() {
  // alert("hi");
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      let url = tabs[0].url;
      var begin = tabs[0].url.indexOf("v=");
      var end = tabs[0].url.indexOf("&", begin);
      getSubtitles({
        videoID: url.substring(begin+2, end), // youtube video id
        lang: "en", // default: `en`
      }).then(function (captions) {

        const result = JSON.stringify(captions.reduce((map, next) => {
            map[next["start"]] = next["text"].replaceAll("\n", " ");
            return map;
          }, {}));
        // const req = new Request("https://httpbin.org/post", {method: 'POST', body: "hi"});
        fetch("http://127.0.0.1:5000/analyze", {
          method: "POST",
          body: result, 
          headers:{
            "content-type":"text/plain"
          }
        }).then(response =>{console.log(response); return response.json()})
          .then(res => {
            addEntries(res);
          });
      });
    }
  );
};
