$(function() {
  var board_id = "lsbtdyyhxcpzp";
  var player_id = 7194647;
  $( "#signup" ).submit(function( event ) {
    event.preventDefault();
//     $.get("https://api.countapi.xyz/hit/leistungszentrum/olybar240523", function(data, status){
//       $( ".button" ).prop("disabled", true).addClass('button-disabled').removeClass('w-button');
//       $(" #signups" ).html(data['value'] + " Teilnehmer");
//       alert( "Du bist dabei / You are in / Sinä olet siellä / 你在那里" );
//     });
    $.post(`https://keepthescore.co/api/${board_id}/score/`, { "player_id": player_id, "score": 1})
    .done(function(data, status){
      $( ".button" ).prop("disabled", true).addClass('button-disabled').removeClass('w-button');
      $(" #signups" ).html(data['players'][0]["score"] + " Teilnehmer");
      alert( "Du bist dabei / You are in / Sinä olet siellä / 你在那里" );
    });
  });
  $.get(`https://keepthescore.co/api/${board_id}/board/`, function(data, status){
    $(" #signups" ).html(data['players'][0]["score"] + " Teilnehmer");
  });
});
