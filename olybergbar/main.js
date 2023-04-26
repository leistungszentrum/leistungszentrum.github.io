$(function() {
  $( "#signup" ).submit(function( event ) {
    event.preventDefault();
    $.get("https://api.countapi.xyz/hit/leistungszentrum/olybar240523", function(data, status){
      $( ".button" ).prop("disabled", true).addClass('button-disabled').removeClass('w-button');
      $(" #signups" ).html(data['value'] + " Teilnehmer");
      alert( "Du bist dabei / You are in / Sinä olet siellä / 你在那里" );
    });
  });
  $.get("https://api.countapi.xyz/get/leistungszentrum/olybar240523", function(data, status){
    $(" #signups" ).html(data['value'] + " Teilnehmer");
  });
});
