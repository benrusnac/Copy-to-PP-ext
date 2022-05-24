//console.log("An extension by Ben Rusnac!")

//Get Info
$.get(chrome.runtime.getURL('/hist.html'), function(data) {
  $(data).appendTo('.tcext');
});

var url = window.location.href;
var title = $('.titleContent').text();

//Parse Title
title = title.replace(/(\r\n|\n|\r)/gm, "");
title = title.replace(/"/, "");
title = title+"\n\n";

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

let current = [];
let empty = [];

$('.resized-text').append(
  div
)



$("#copy-btn").click(function(){

      navigator.clipboard.writeText(processed)
          .then(() => {
            $( ".confirm" ).show().delay(400).fadeOut();
            $( "#cpytitle" ).html("<h1>"+title+"</h1>" );
      })
          .catch(err => {
          alert('Something went wrong', err);
      })


});





//chrome.storage.sync.clear();


const getsync = async () =>{
  try {
    //Set count to 1 if not set
    chrome.storage.sync.get(['count'],function(result) {
    let count = result.count;
    let update = count-4;
    current.push(url, title, processed, count);

    empty.push('', '', '', 1);

    if (count === undefined) {
      count = 5;
      chrome.storage.sync.set({count: count});
      chrome.storage.sync.set({hist1: empty});
      empty[3] = 2;
      chrome.storage.sync.set({hist2: empty});
      empty[3] = 3;
      chrome.storage.sync.set({hist3: empty});
      empty[3] = 4;
      chrome.storage.sync.set({hist4: empty});

    //If count exists increment
    } else {
      count++;
      chrome.storage.sync.set({count: count});



      // Show Coffee at set interval
      if (count % 6 === 0) {
        $( ".tcext" ).hide();
        $.get(chrome.runtime.getURL('/pop.html'), function(data) {
          $(data).appendTo('.resized-text');
          $("#close").click(function(){
              $( ".coffee" ).hide();
              $( ".tcext" ).show();
          });
        });
      }

      try {
        chrome.storage.sync.get(['hist1'],function(result) {
          let hist1 = result.hist1;

          if (hist1 === undefined || hist1[3] == update) {
              hist1 = current;
              let title = hist1[1];
              chrome.storage.sync.set({hist1: hist1});
          }

        })
        chrome.storage.sync.get(['hist2'],function(result) {
          let hist2 = result.hist2;

          if (hist2 === undefined || hist2[3] == update) {
              hist2 = current;
              var title2 = hist2[1];
              chrome.storage.sync.set({hist2: hist2});

          }

        })
        chrome.storage.sync.get(['hist3'],function(result) {
          let hist3 = result.hist3;

          if (hist3 === undefined || hist3[3] == update) {
              hist3 = current;
              var title3 = hist3[1];
              chrome.storage.sync.set({hist3: hist3});

          }

        })
        chrome.storage.sync.get(['hist4'],function(result) {
          let hist4 = result.hist4;

          if (hist4 === undefined || hist4[3] == update) {
              hist4 = current;
              var title4 = hist4[1];
              chrome.storage.sync.set({hist4: hist4});

          }




        })




      } catch (e) {

      } finally {

      }


    }
})


  } catch (e) {
    console.log('error');
  } finally {

  }

}


const history = async () =>{
  try {
      chrome.storage.sync.get(['hist1'],function(result) {
        var url = result.hist1[0];
        var title = result.hist1[1];
        var text = result.hist1[2];

        const processed = [title, text];
        processed.join('');
        $( ".hist1" ).append("<h1>"+title+"</h1>" );

        $(".hist1").click(function(){

              navigator.clipboard.writeText(text)
                  .then(() => {
                    $( ".confirm" ).show().delay(400).fadeOut();
                    $( "#cpytitle" ).html("<h1>"+title+"</h1>" );
              })
                  .catch(err => {
                  alert('Something went wrong', err);
              })
        });
      })

      chrome.storage.sync.get(['hist2'],function(result) {
        var url = result.hist2[0];
        var title = result.hist2[1];
        var text = result.hist2[2];

        const processed = [title, text];
        processed.join('');
        $( ".hist2" ).append("<h1>"+title+"</h1>" );

        $(".hist2").click(function(){

              navigator.clipboard.writeText(text)
                  .then(() => {
                    $( ".confirm" ).show().delay(400).fadeOut();
                    $( "#cpytitle" ).html("<h1>"+title+"</h1>" );
              })
                  .catch(err => {
                  alert('Something went wrong', err);
              })
        });
      })

      chrome.storage.sync.get(['hist3'],function(result) {
        var url = result.hist3[0];
        var title = result.hist3[1];
        var text = result.hist3[2];

        const processed = [title, text];
        processed.join('');
        $( ".hist3" ).append("<h1>"+title+"</h1>" );

        $(".hist3").click(function(){

              navigator.clipboard.writeText(text)
                  .then(() => {
                    $( ".confirm" ).show().delay(400).fadeOut();
                    $( "#cpytitle" ).html("<h1>"+title+"</h1>" );
              })
                  .catch(err => {
                  alert('Something went wrong', err);
              })
        });
      })

      chrome.storage.sync.get(['hist4'],function(result) {
        var url = result.hist4[0];
        var title = result.hist4[1];
        var text = result.hist4[2];

        const processed = [title, text];
        processed.join('');
        $( ".hist4" ).append("<h1>"+title+"</h1>" );

        $(".hist4").click(function(){

              navigator.clipboard.writeText(text)
                  .then(() => {
                    $( ".confirm" ).show().delay(400).fadeOut();
                    $( "#cpytitle" ).html("<h1>"+title+"</h1>" );
              })
                  .catch(err => {
                  alert('Something went wrong', err);
              })
        });
      })



  } catch (e) {

  } finally {

  }


}


getsync();
history();
