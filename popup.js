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




// From https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


var addEntries = function(results){
  for (var [key, value] of Object.entries(results)){
    // newEntry = new Entry(key, json_obj.key.statement, value.rating)
    // var li = document.getElementsByClassName("li");
    // li.appendChild(document.createTextNode(keyVal))
        
    var html = `
    <li class="result polygraph-false-claim">
      <h4 class="polygraph-false-claim-header">${value["textual_rating"]} Statement</h4>
      <div class="polygraph-false-claim-inner">
        <p class="polygraph-time-statement">The claim at ${fancyTimeFormat(key)} has been shown to be ${value["textual_rating"].toLowerCase()}.</p>
        <br>
        <p class="polygraph-article-link"> To learn more, visit <a href="${value["url"]}">${value["title"]}</a></p>
      </div>
    </li>
    `

    document.querySelector('.res_list').insertAdjacentHTML('beforeend', html)

  } 
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