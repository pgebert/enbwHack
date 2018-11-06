(function($) {
    $(function() {

        $('.sidenav').sidenav();

        $('.car2').hide();


        /** 
         * ----- Draw town plot -----
         */

        var trace0 = {
            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            y: [60, 70, 55, 74, 101, 150, 155, 180, 146, 130, 70, 50],
            type: 'scatter'
        };

        var data = [trace0]

        var layout = {
            yaxis: {
                title: '# People'
            },
            shapes: [{
                type: 'line',
                x0: 0,
                y0: 0,
                x1: 0,
                y1: Math.max(...trace0.y),
                line: {
                    color: 'grey',
                    width: 2,
                    dash: 'dot'
                }
            }]
        };

        Plotly.newPlot('town_plot', data, layout);

        $('#runTownPlotBtn').click(function startTownPlotAnimation() {
            (function animateTownPlot(frameID, max) {
                layout.shapes[0].x0 = frameID;
                layout.shapes[0].x1 = frameID;
                Plotly.relayout('town_plot', layout)

                // Trigger car animation
                if (frameID == 7) {
                    $('.car3').hide();
                    $('.car2').show();
                }

                if (frameID < max) {
                    setTimeout(function() { animateTownPlot(frameID + 1, max) }, 1000);
                }
            })(0, 11);
        });



        /**
         * Marketplace plot
         */

        var avatarIcons = [
            'if_female_628285.png',
            'if_girl_628295.png',
            'if_male_628288.png',
            'if_matureman1_628290.png',
            'if_matureman2_628294.png',
            'if_maturewoman_628292.png'
        ]


        var data = JSON.parse(person_data);

        // config video settings
        var frame_step = 4;
        nbrFrames = 1300;
        fps = 10;

        var videoFrame;


        (function imageSetup() {

            var img = document.createElement("IMG");
            img.style.width = '100%';
            img.src = "data/video/out1.png";
            document.getElementById('video').appendChild(img);
            videoFrame = img;
        })();

        function show(frameID) {
            videoFrame.src = "data/video/out" + frameID + ".png";
            updatePersons(frameID);
            if (frameID < nbrFrames) {
                setTimeout(function() { show(frameID + 1) }, 1000 / fps);
            }
        }

        function updatePersons(frameID) {

            function person_card(personID) {
                return [
                    '<div class="card-panel grey lighten-5 z-depth-1 marketplace-card">',
                    '<div class="row valign-wrapper">',
                    '<div class="col s4 m2"><img src="img/avatar/' + avatarIcons[personID % avatarIcons.length] + '" alt="" class="circle responsive-img valign"></div>',
                    '<div class="col s8 m10"><span class="black-text">',
                    'PersonID:' + personID,
                    '</span></div>',
                    '</div>',
                    '</div>'
                ].join('');
            }

            if (frameID % frame_step == 0) {
                $('#persons0').html('');
                $('#persons1').html('');
                idx = Math.floor(frameID / frame_step);
                if (idx < data.length) {
                    data[Math.floor(frameID / frame_step)]["persons"].forEach(function(element, index) {
                        // Show not more than 10 persons
                        if (index < 10) {
                            $('#persons' + Math.floor(index / 5)).append(person_card(element["track_id"]));
                        }
                    });
                    // $('#persons').append(html);
                    // $('#persons').html(html);
                }
            }



        }

        $('#runMarketplaceVideoBtn').click(function() {
            show(1);
        });




    }); // end of document ready
})(jQuery); // end of jQuery name space