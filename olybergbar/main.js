$(function() {
  var board_id = "lsbtdyyhxcpzp";
  var player_id = 7194647;
  $( "#signup" ).submit(function( event ) {
    event.preventDefault();
    $.ajax({
    type: "POST",
    url: `https://thingproxy.freeboard.io/fetch/https://keepthescore.co/api/${board_id}/score/`,
    async: false,
    data: JSON.stringify({ "player_id": player_id, "score": 1}),
    contentType: "application/json",
    })
    .done(function(data, status){
      $( ".button" ).prop("disabled", true).addClass('button-disabled').removeClass('w-button');
      $(" #signups" ).html(data['value'] + " Teilnehmer");
      $(" #signups" ).html(data['players'][0]["score"] + " Teilnehmer");
      alert( "Du bist dabei / You are in / Sinä olet siellä / 你在那里" );
    });
  });
  $.get(`https://keepthescore.co/api/${board_id}/board/`, function(data, status){
    $(" #signups" ).html(data['players'][0]["score"] + " Teilnehmer");
  });
});
