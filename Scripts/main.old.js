console.log("An extension by Ben Rusnac!")






var url = window.location.href;
var title = $('.titleContent').text();
title = title.replace(/(\r\n|\n|\r)/gm, "");
title = title+"\n\n";

chrome.storage.sync.set({'history': title });


var text = $('.resized-text').html();

var lines = text.split("\n");
var numLines = lines.length;
var i;

for(i = 0; i < numLines; i++){
  line = lines[i];
  line = line.replace(/<br>/g,"\n");
  line = line.replace('O: ','Order:\n');
  line = line.replace('R1: ','Chorus 1:\n');
  line = line.replace('R2: ','Chorus 2:\n');
  line = line.replace('R: ','Chorus:\n');
  line = line.replace('R. ','Chorus:\n');
  line = line.replace('B. ','Bridge:\n');
  line = line.replace('B: ','Bridge:\n');
  line = line.replace('C: ','Bridge:\n');
  line = line.replace('R. ','Chorus 2:\n');
  line = line.replace('1. ','Verse 1:\n');
  line = line.replace('1: ','Verse 1:\n');
  line = line.replace('2. ','Verse 2:\n');
  line = line.replace('2: ','Verse 2:\n');
  line = line.replace('3. ','Verse 3:\n');
  line = line.replace('3: ','Verse 3:\n');
  line = line.replace('4. ','Verse 4:\n');
  line = line.replace('4: ','Verse 4:\n');
  line = line.replace('5. ','Verse 5:\n');
  line = line.replace('5: ','Verse 5:\n');
  line = line.replace('6. ','Verse 6:\n');
  line = line.replace('6: ','Verse 6:\n');
  line = line.replace(/,/,'');


  lines[i] = line;

}


var processed = title+lines.join('');


/*


var storeme = [];
storeme.push(url, title, processed, modified);
//console.log(storeme);

var lookup = storeme[0];

chrome.storage.sync.get(['lookup'], function(result) {
  if (result.lookup == undefined) {
    console.log('its undefined');
    chrome.storage.sync.set({lookup:storeme});
    console.log('this is stored: ' + result.lookup);

  }
});*/


var div = '<div class="tcext"><button type="button" class="btn" id="copy-btn">Copy for ProPresenter</button><a target="_blank" href="https://www.rusn.ac"> A project by Ben Rusnac</a></div>';


$('.resized-text').append(
  div
)



$("#copy-btn").click(function(){

      navigator.clipboard.writeText(processed)
          .then(() => {
          alert(numLines +" lines copied to clipboard!");
      })
          .catch(err => {
          alert('Something went wrong', err);
      })


});



// define history and history numbers
var hist1, hist2, hist3, hist4, h1n, h2n, h3n, h4n;
/*
let hist1, hist2, hist3, hist4 = undefined;
let h1n = 1;
let h2n = 2;
let h3n = 3;
let h4n = 4;*/

var count = 0;

let storeme = [];
storeme.push(url, title, processed, count);

let storeme1 = [];
let storeme2 = [];
let storeme3 = [];
let storeme4 = [];

storeme1.push(url, title, processed, 900);
storeme2.push(url, title, processed, 800);
storeme3.push(url, title, processed, 700);
storeme4.push(url, title, processed, 400);

chrome.storage.sync.set({hist1: storeme1});
chrome.storage.sync.set({hist2: storeme2});
chrome.storage.sync.set({hist3: storeme3});
chrome.storage.sync.set({hist4: storeme4});


/*
//try to get count if existing.
chrome.storage.sync.get(['count'],function(result){
  // if there is no count set count to 0
  if (result.count == null) {
    chrome.storage.sync.set({'count':count});
    //console.log(count);
  }else {
    //if there is count set count = to stored
    count = result.count;
    console.log(count);
  }

});*/


//get History if defined
chrome.storage.sync.get(['hist1'], function(result) {
  if (result.hist1 !== undefined) {
    hist1 = result.hist1.toString().split(",");
    //get count from array pos 3
    h1n = hist1[3];
  }

});

chrome.storage.sync.get(['hist2'], function(result) {
  if (result.hist2 !== undefined) {
    hist2 = result.hist2.toString().split(",");
    h2n = hist2[3];
  }

});

chrome.storage.sync.get(['hist3'], function(result) {
  if (result.hist3 !== undefined) {
    hist3 = result.hist3.toString().split(",");
    h3n = hist3[3];
  }

});

chrome.storage.sync.get(['hist4'], function(result) {
  if (result.hist4 !== undefined) {
    hist4 = result.hist4.toString().split(",");
    h4n = hist4[3];
  }

});


//determin which hist has the lowest count
function lowHist(){
  var lowestHist = 1;
  var lowestScore = h1n;
  var tempScore;

  for (var i = 1; i <= 4; i++) {
    tempScore = window["h" + i +"n"];
    if(tempScore < lowestScore){
      lowestScore = tempScore;
      lowestHist = i;
    }
    return  lowestScore;
  }
}

lowestHist = lowHist();
console.log("foo:" +lowestHist);
/*
//write to lowest hist
if (lowestHist == 1) {
  count++;
  console.log('plus'+count);
  chrome.storage.sync.set({hist1: storeme});
} else if (lowestHist == 2) {
  count++;
  chrome.storage.sync.set({hist2: storeme});
} else if (lowestHist == 3) {
  count++;
  chrome.storage.sync.set({hist3: storeme});
} else if (lowestHist == 4) {
  count++;
  chrome.storage.sync.set({hist4: storeme});
}
*/




chrome.storage.sync.get(['hist1'], function(result) {
  console.log(result.hist1);
});
chrome.storage.sync.get(['hist2'], function(result) {
  console.log(result.hist2);
});
chrome.storage.sync.get(['hist3'], function(result) {
  console.log(result.hist3);
});
chrome.storage.sync.get(['hist4'], function(result) {
  console.log(result.hist4);
});
