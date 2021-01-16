var getSubtitles = require("youtube-captions-scraper").getSubtitles;

var saveNote = document.querySelector("#save-note");
var checkFacts = document.querySelector("#check-facts");
var deleteNotes = document.querySelector("#delete-notes");
var notesField = document.querySelector("#note-value");

// Populate Notes From Page

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
      if (!url.includes("youtube.com")) return;
      var begin = tabs[0].url.indexOf("v=");
      if (begin == -1) return;
      var end = tabs[0].url.indexOf("&", begin);
      alert(url.substring(begin, end));
      getSubtitles({
        videoID: url.substring(begin+2, end), // youtube video id
        lang: "en", // default: `en`
      }).then(function (captions) {
        console.log(
          captions.reduce((map, next) => {
            map[next["start"]] = next["text"].replaceAll("\n", " ");
            return map;
          }, {})
        );
      });
    }
  );
  // var progress_bar = document.getElementsByClassName("ytp-progress-bar");

  for (var keyVal in json_obj) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(keyVal));
    var myFlag = document.createElement("div");
  }
};

///////////////////////////////////////////////////////////////////////////
//   // Grab the notes for the page
//   chrome.storage.local.get(url, notes => {
//     if (notes[url]) {
//       for (var i = 0; i < notes[url].length; i++) {
//         var li = document.createElement("li");
//         li.appendChild(document.createTextNode(notes[url][i]));
//         notesList.appendChild(li);

//       }
//     }
//   });
