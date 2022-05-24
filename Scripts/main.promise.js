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

chrome.storage.sync.clear();

var hist1, hist2, hist3, hist4, h1n, h2n, h3n, h4n;
let currentcount = 0;

let storeme = [];
storeme.push(url, title, processed, currentcount);

let storeme1 = [];
let storeme2 = [];
let storeme3 = [];
let storeme4 = [];


storeme1.push(url, title, processed, 1);
storeme2.push(url, title, processed, 2);
storeme3.push(url, title, processed, 3);
storeme4.push(url, title, processed, 4);

chrome.storage.sync.set({hist1: storeme1});
chrome.storage.sync.set({hist2: storeme2});
chrome.storage.sync.set({hist3: storeme3});
chrome.storage.sync.set({hist4: storeme4});
chrome.storage.sync.set({count: 12});


function getCount(){
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get(['count'], function(result) {
      count = result.count;
      if (count == undefined) {
        reject('Undefined');
      } else {
        resolve(result);
        return count;
      }
    })
  })
}

function getHist1(){
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get(['hist1'], function(result) {
      hist1 = result.hist1;
      if (hist1 == undefined) {
        reject('Undefined');
      } else {
        resolve(hist1);
        return result.hist1;
        console.log(hist1);
      }
    })
  })
}

function getHist2(){
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get(['hist2'], function(result) {
      hist2 = result.hist2;
      if (hist2 == undefined) {
        reject('Undefined');
      } else {
        resolve(result);
      }
    })
  })
}

function getHist3(){
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get(['hist3'], function(result) {
      hist3 = result.hist3;
      if (hist3 == undefined) {
        reject('Undefined');
      } else {
        resolve(result);
      }
    })
  })
}

function getHist4(){
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get(['hist4'], function(result) {
      hist4 = result.hist4;
      if (hist4 == undefined) {
        reject('Undefined');
      } else {
        resolve(result);
      }
    })
  })
}


getHist1({}).then((hist1)=>{
  console.log(hist1);
  return hist1;
})

const printHist1 = async () => {
  const a = await hist1;
  console.log("this:" +a);
}

printHist1();
/*


getCount({})
 .then(function (result) {


  }).catch(function (error) {
    console.log(error)
  })

getHist1({})
  .then(function (hist1) {
     console.log(hist1)
     return hist1;

   }).catch(function (error) {
     console.log(error)
   })

getHist2({})
 .then(function (result) {
    console.log(result)
  }).catch(function (error) {
    console.log(error)
  })

getHist3({})
 .then(function (result) {
    console.log(result)
  }).catch(function (error) {
    console.log(error)
  })
getHist4({})
 .then(function (result) {
    console.log(result)
  }).catch(function (error) {
    console.log(error)
  })



console.log('current count is:' + foo);*/
