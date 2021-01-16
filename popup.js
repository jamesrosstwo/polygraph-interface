var saveNote = document.querySelector('#save-note');
var checkFacts = document.querySelector('#check-facts');
var deleteNotes = document.querySelector('#delete-notes');
var notesField = document.querySelector('#note-value');


// Populate Notes From Page
chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, tabs => {
  let url = tabs[0].url;

})

const json_obj = {
    1 : {
      timestamp: 50,
      statement: "The sky is light"
    },
    2:{
      timestamp: 75,
      statement: "The Earth is flat"
    },
}

analyze.onclick = function add_flagged(){
  alert(window.location.url)

  var progress_bar = document.getElementsByClassName("ytp-progress-bar")


  for (var keyVal in json_obj){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(keyVal))
    var myFlag = document.createElement("div");

  } 
}

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
