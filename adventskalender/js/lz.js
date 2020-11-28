console.log('Loading LZ...');

$(function() {
    var now = new Date();

    window.makeTimer = function(target, open) {
      var endTime = open;			
      endTime = (Date.parse(endTime) / 1000);

      var now = new Date();
      now = (Date.parse(now) / 1000);

      var timeLeft = endTime - now;

      var days = Math.floor(timeLeft / 86400); 
      var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
      var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
      var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

      if (hours < "10") { hours = "0" + hours; }
      if (minutes < "10") { minutes = "0" + minutes; }
      if (seconds < "10") { seconds = "0" + seconds; }

      $(target + " #days").html(days + "<span></span>");
      $(target + " #hours").html(hours + "<span></span>");
      $(target + " #minutes").html(minutes + "<span></span>");
      $(target + " #seconds").html(seconds + "<span></span>");		
    }

    window.startMeeting = function(target, room) {
      console.log('starting meeting...');
      const jitsi_options = {
        roomName: 'LZ Adventskalender ' + room,
        parentNode: document.querySelector(target),
        width: '100%',
        height: '100%',
        configOverwrite: {
          prejoinPageEnabled: false,
          disableDeepLinking: true,
        },
        interfaceConfigOverwrite: {
          DEFAULT_BACKGROUND: 'transparent',
          DEFAULT_LOCAL_DISPLAY_NAME: 'Leistungsträger',
          TOOLBAR_BUTTONS: [ 'microphone', 'camera' ],
          DISABLE_VIDEO_BACKGROUND: true,
          MOBILE_APP_PROMO: false,
          SHOW_BRAND_WATERMARK: false,
          SHOW_JITSI_WATERMARK: false,
          // JITSI_WATERMARK_LINK: '',
          // BRAND_WATERMARK_LINK: '',
          // DEFAULT_LOGO_URL: '',
        },
        onload: function() {
          $('.jitsi').find('.og-loading').remove();
        }
      }
      if(typeof window.japi !== "undefined") {
        window.japi.dispose();
      }
      window.japi = new JitsiMeetExternalAPI('meet.jit.si', jitsi_options)
      console.log('meeting is on!');
    }

    window.videoStarts = function () {
      if(typeof window.japi !== "undefined") {
        window.japi.executeCommand('muteEveryone');
      }
      $jitsi_info = $('<div class="jitsi-info">Ruhe zefix!<br/>Leertaschte zum labern!</br>(spacebar to talk)</div>');
      $jitsi_info.hide().appendTo('.jitsi').ready(function () {
        $jitsi_info.delay( 500 ).fadeIn( 500 ).delay( 3000 ).fadeOut( 500 );
      });
    }

    const dayOfYear = date =>
      Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

    function openDoor() {
        console.log('Opening door!')
        $('.next').toggleClass('glow').removeClass('today');
        var glowing = window.setInterval(function() {  
            $('.next').toggleClass('glow');
        }, 2000);
        $('#timer').fadeOut('slow');
        $('.next').fadeTo( 'slow' , 1, function() {
            $('.next').toggleClass('inactive');
            $('.next').parent().toggleClass('inactivelink');
        });
        $('.next').click(function() {
            clearInterval(glowing);
            $(this).addClass('glow');
        });
    }

    var nextdoor = -1;
    $('.door').each(function(index) {
      var opentime = new Date($(this).data('time'));
      var opendiff = opentime - now;
      var istoday = dayOfYear(opentime) == dayOfYear(now)
      // console.log(index, $(this).data('time'), now, opentime, opendiff, istoday);
      if (opendiff < 0) {
        if (istoday) {
          $(this).find('.doorthumb').removeClass('inactive').addClass('glow');
        } else {
          $(this).find('.crossed').removeClass('hidden');
          $(this).find('.doorthumb').removeClass('inactive');
        }
      } else if (isNaN(opendiff) || opendiff > 0) {
        $(this).addClass('inactivelink');
        if (istoday) {
          $(this).find('.doorthumb').addClass('today');
        }
        if (nextdoor < 0 && !isNaN(opendiff)) {
          nextdoor = index;
          $(this).find('.doorthumb').addClass('next');
          $timer = $('<div id="timer">' +
          '<!-- <div id="days"></div><div class="timersep">:</div> -->' +
          '<div id="hours">00</div><div class="timersep">:</div>' +
          '<div id="minutes">00</div><div class="timersep">:</div>' +
          '<div id="seconds">00</div>' +
          '</div>');
          $timer.hide().appendTo($(this).find('.timer'));
          $timer.delay(500).fadeIn( 850 );
        }
      }
    });

    if (nextdoor >= 0) {
      var open = new Date($('.next').parent().data('time'));
      var millisTillOpen = open - now;
      if (millisTillOpen < 0) {
          millisTillOpen += 86400000; // it's after 10am, try 10am tomorrow.
      }
      setTimeout(function() {
          openDoor();
      }, millisTillOpen);
      setInterval(function() { makeTimer('#timer', open); }, 1000);
    }

    particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 400,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "image",
            "stroke": {
              "width": 3,
              "color": "#fff"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "images/lz/starburst_white_300_drop_2.png",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.7,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 20,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 50,
            "color": "#ffffff",
            "opacity": 0.6,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 5,
            "direction": "bottom",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": true,
              "rotateX": 300,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode":  "bubble"
            },
            "onclick": {
              "enable": true,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 150,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 200,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.2
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    console.log('LZ ready!')
});










