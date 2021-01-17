var getSubtitles = require("youtube-captions-scraper").getSubtitles;
var saveNote = document.querySelector('#save-note');
var checkFacts = document.querySelector('#check-facts');
var deleteNotes = document.querySelector('#delete-notes');
var notesField = document.querySelector('#note-value');
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

const json_obj = {
  1: {
    timestamp: 50,
    statement: "The sky is light",
  },
  2: {
    timestamp: 75,
    statement: "The Earth is flat",
  },
};

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
        fetch("https://httpbin.org/post", {
          method: "POST",
          body: result, 
          headers:{
            "content-type":"text/plain"
          }
        }).then(response =>{return response.json()})
          .then(res => {console.log(res)});
      });
    }
  );
};
