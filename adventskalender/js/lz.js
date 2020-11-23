console.log('Loading LZ...');

$(function() {
    var now = new Date();

    const zoomMeeting = $('#zmmtg-root');

    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    const meetConfig = {
      apiKey: 'o9hRXrPHRQ-tu89Y4-xqrQ',
      meetingNumber: 87811285418,
      leaveUrl: 'https://yoursite.com/meetingEnd',
      userName: 'Firstname Lastname',
      userEmail: 'firstname.lastname@yoursite.com',
      passWord: '1234', // if required
      role: 0 // 1 for host; 0 for attendee
    };

    function getSignature(meetConfig) {
      const data = { meetingNumber: meetConfig.meetingNumber, role: meetConfig.role };
      fetch('https://lz-adventskalender.herokuapp.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        .then(result => result.json())
        .then(response => {
          ZoomMtg.init({
            leaveUrl: meetConfig.leaveUrl,
            isSupportAV: true,
            isSupportChat: false,
            disableJoinAudio: true,
            screenShare: false,
            success: function() {
              ZoomMtg.join({
                meetingNumber: meetConfig.meetingNumber,
                userName: meetConfig.userName,
                userEmail: meetConfig.userEmail,
                signature: response.signature,
                apiKey: meetConfig.apiKey,
                passWord: meetConfig.passWord,
                success: (success) => {
                  console.log(success)
                },
                error: (error) => {
                  console.log(error)
                }
              })		
            }
          })
      })
    }
    window.startMeeting = function(username) {
      console.log('starting meeting...');
      meetConfig.userName = username;
      meetConfig.userEmail = username + '@leistungs-zentrum.de';
      getSignature(meetConfig);
      console.log('meeting is on!');
    }

    const dayOfYear = date =>
      Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

    function openDoor() {
        console.log('Opening door!')
        $('.next').toggleClass('glow');
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
      if (opendiff < 0) {
        if (istoday) {
          $(this).find('.doorthumb').removeClass('inactive');
        } else {
          $(this).find('.crossed').removeClass('hidden');
          $(this).find('.doorthumb').removeClass('inactive');
        }
      } else if (isNaN(opendiff) || opendiff > 0) {
        $(this).addClass('inactivelink');
        if (nextdoor < 0 && !isNaN(opendiff)) {
          nextdoor = index;
          $(this).find('.doorthumb').addClass('next');
          $(this).find('.timer').html('<div id="timer">' +
          '<!-- <div id="days"></div><div class="timersep">:</div> -->' +
          '<div id="hours">00</div><div class="timersep">:</div>' +
          '<div id="minutes">00</div><div class="timersep">:</div>' +
          '<div id="seconds">00</div>' +
          '</div>');
        }
      }
    });

    var open = new Date($('.next').parent().data('time'));
    var millisTillOpen = open - now;
    if (millisTillOpen < 0) {
        millisTillOpen += 86400000; // it's after 10am, try 10am tomorrow.
    }
    
    if (nextdoor >= 0) {
      setTimeout(function() {
          openDoor();
      }, millisTillOpen);
    }

    function makeTimer() {
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

        $("#days").html(days + "<span></span>");
        $("#hours").html(hours + "<span></span>");
        $("#minutes").html(minutes + "<span></span>");
        $("#seconds").html(seconds + "<span></span>");		
    }
    setInterval(function() { makeTimer(); }, 1000);

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
              "src": "http://www.dynamicdigital.us/wp-content/uploads/2013/02/starburst_white_300_drop_2.png",
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










