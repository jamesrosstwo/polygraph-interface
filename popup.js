var saveNote = document.querySelector('#save-note');
var checkFacts = document.querySelector('#check-facts');
var deleteNotes = document.querySelector('#delete-notes');
var notesField = document.querySelector('#note-value');
var analyzeButton = document.querySelector("#analyze");

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
        
        analyzeButton.className = "button button-grey"
    }
    chrome.tabs.executeScript(tab.id, {
        code: 'document.querySelector("#analyze").classList'
      }, greyOutBtn);
} else {
      function redBtn (results){
        analyzeButton.className = "button button-red"
    }

    chrome.tabs.executeScript(tab.id, {
        code: 'document.querySelector("#analyze").classList'
      }, redBtn);

}
  ///////////////////////////////////////////

})

var json_obj = {
    13 : {
      statement: "When I was vice president, violent crime fell 15% in this country. The murder rate now is up 26% across the nation this year under Donald Trump.",
      rating:"half-true",
      fact_url:"https://www.politifact.com/factchecks/2020/sep/03/joe-biden/fact-checking-joe-bidens-comparison-violent-crime-/"
      
    },
    20:{
      statement: "The Earth is flat",
      rating: "false",
      fact_url:"https://www.politifact.com/factchecks/2020/sep/03/joe-biden/fact-checking-joe-bidens-comparison-violent-crime-/"
    },
}



var Entry =function(time,statement,rating){
  this.time = time;
  this.statement = statement;
  this.rating = rating;
}

// var open_link= function(){ 
//   alert(this.id)
//   document.querySelector('.result').click(function(){
//   window.location = this.id } )}

// // var time_DOM = document.getElementsByClassName("res_list").appendChild()

//   chrome.tabs.query({
//     active: true,
//     lastFocusedWindow: true
//     }, tabs => {
//       var tab = tabs[0];
//       chrome.tabs.executeScript(tab.id, {
//         code: 'document.querySelector(".result")'
//       }, open_link);
// });
// $("p").click(function(){
//   alert("The paragraph was clicked.");
// });



var addEntries = function(results){
  
  document.querySelector('.res_list').innerHTML = "";
  for (var [key, value] of Object.entries(json_obj)){

    var html = '<li> <a class="result" id="'+value.fact_url+'" href='+value.fact_url+'"><p class="time_statement">At second '+key +': <span>'+value.statement + ' </span><br><p class="rating">Rating: <span>'+value.rating+'</p></a></li>'

    
    document.querySelector('.res_list').insertAdjacentHTML('beforeend', html)
    // alert (value.statement+"--------------------"+html)
    // document.querySelector('.res_list').appendChild('beforeend', newHtml);
  } 
}
  
  // alert(document.querySelector('.res_list').html(newHtml))



analyze.onclick = function add_flagged(){
  
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
    }, tabs => {
      var tab = tabs[0];
      chrome.tabs.executeScript(tab.id, {
        code: 'document.querySelector(".results")'
      }, addEntries);


      // addEntries
    }
  )   
}