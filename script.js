(function() {
    var nextUrl;
    var resultsContainer = $("#results-container");

    $("#submit-button").on("click", function() {
        var userInput = $("input[name='user-input']").val();
        var albumOrArtist = $("select").val();

        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            method: "GET",
            data: {
                query: userInput,
                type: albumOrArtist
            },
            success: function(response) {
                // console.log("response from spotify: ", response);
                response = response.artists || response.albums;
                var results = "";
                for (var i = 0; i < response.items.length; i++) {
                    var link = response.items[i].external_urls.spotify;

                    // HANDLES IMAGES:
                    var imageUrl = "default.png";
                    if (response.items[i].images[0]) {
                        imageUrl = response.items[i].images[0].url;
                    }
                    results +=
                        "<div class='outer-div'><a href=" +
                        link +
                        "><img src=" +
                        imageUrl +
                        "></a><a class='results-name' href=" +
                        link +
                        ">" +
                        response.items[i].name +
                        "</a></div>";
                }
                resultsContainer.html(results);
                nextUrl =
                    response.next &&
                    response.next.replace(
                        "api.spotify.com/v1/search",
                        "elegant-croissant.glitch.me/spotify"
                    );

                function addMoreButton() {
                    $("#more-button").addClass("on");
                }
                if (response.next) {
                    if (location.search.indexOf("scroll=infinite") > -1) {
                        infiniteCheck();
                    } else if (response.items.length === 20) {
                        addMoreButton();
                    }
                }
            }
        });
    });

    $("#more-button").on("click", function() {
        $.ajax({
            url: nextUrl,
            method: "GET",
            success: function(response) {
                // console.log("response from spotify: ", response);
                response = response.artists || response.albums;
                var results = "";
                for (var i = 0; i < response.items.length; i++) {
                    var link = response.items[i].external_urls.spotify;

                    // HANDLES IMAGES:
                    var imageUrl = "default.png";
                    if (response.items[i].images[0]) {
                        imageUrl = response.items[i].images[0].url;
                    }
                    results +=
                        "<div class='outer-div'><a href=" +
                        link +
                        "><img src=" +
                        imageUrl +
                        "></a><a class='results-name' href=" +
                        link +
                        ">" +
                        response.items[i].name +
                        "</a></div>";
                }
                resultsContainer.append(results);
                // results;
                nextUrl =
                    response.next &&
                    response.next.replace(
                        "api.spotify.com/v1/search",
                        "elegant-croissant.glitch.me/spotify"
                    );
                function addMoreButton() {
                    if (response.next) {
                        $("#more-button").addClass("on");
                    }
                    if (response.total - response.offset < 20) {
                        $("#more-button").removeClass("on");
                    }
                }
                addMoreButton();
            }
        });
    });

    function infiniteCheck() {
        var hasReachedBottom =
            $(window).height() + $(document).scrollTop() >=
            $(document).height() - 400;
        if (hasReachedBottom) {
            $.ajax({
                url: nextUrl,
                method: "GET",
                success: function(response) {
                    // console.log("response from spotify: ", response);
                    response = response.artists || response.albums;
                    var results = "";
                    for (var i = 0; i < response.items.length; i++) {
                        var link = response.items[i].external_urls.spotify;

                        // HANDLES IMAGES:
                        var imageUrl = "default.png";
                        if (response.items[i].images[0]) {
                            imageUrl = response.items[i].images[0].url;
                        }
                        results +=
                            "<div class='outer-div'><a href=" +
                            link +
                            "><img src=" +
                            imageUrl +
                            "></a><a class='results-name' href=" +
                            link +
                            ">" +
                            response.items[i].name +
                            "</a></div>";
                    }
                    resultsContainer.append(results);
                    // results;
                    nextUrl =
                        response.next &&
                        response.next.replace(
                            "api.spotify.com/v1/search",
                            "elegant-croissant.glitch.me/spotify"
                        );
                    if (response.next) {
                        infiniteCheck();
                    }
                }
            });
        } else {
            setTimeout(infiniteCheck, 500);
        }
    }
})();

// $(window).height(); => window.innerHeight() in vanilla JS
// $(document).scrollTop(); => window.pageYOffset() in vanilla
// $(document).height() => document.body.clientHeight in vanilla
