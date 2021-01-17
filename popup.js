var saveNote = document.querySelector('#save-note');
var checkFacts = document.querySelector('#check-facts');
var deleteNotes = document.querySelector('#delete-notes');
var notesField = document.querySelector('#note-value');
let url = ""
// Populate Notes From Page
chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, tabs => {
   url = tabs[0].url;
   var tab = tabs[0];

   /////////////////////////////////////////
   if (url.includes('youtube')===false){
    function greyOutBtn (results){
        document.querySelector("#analyze").className = "btn btn-secondary"
    }
    chrome.tabs.executeScript(tab.id, {
        code: 'document.querySelector("#analyze").classList'
      }, greyOutBtn);
} else {
      function redBtn (results){
        document.querySelector("#analyze").className = "btn btn-danger"
    }

    chrome.tabs.executeScript(tab.id, {
        code: 'document.querySelector("#analyze").classList'
      }, redBtn);

}
  ///////////////////////////////////////////




// chrome.tabs.executeScript({
//   code: 'document.getElementById("btn").innerHTML'
// }, function(results) {
//     alert(results[0])
//   // alert(document.getElementsByClassName('btn').classList = results[0])
  
// });
// })



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
  
  
  var progress_bar = document.getElementsByClassName("ytp-progress-bar")
  
  }

  for (var keyVal in json_obj){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(keyVal))
    var myFlag = document.createElement("div");

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
