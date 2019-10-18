# Spotify Search

This is a simple webpage that searches Spotify's gigantic database for albums and artists by making API requests through a proxy. I built it in one day while a student at [SPICED Academy](https://spiced.academy/program/full-stack-web-development/).

## Demo (click to try for yourself)

-   With `more` button:

[![Spotify Search](spotify-search-more-button.gif)](https://thenightshadefamily.github.io/spotify-search/)

-   With infinite scroll:

[![Spotify Search](spotify-search-infinite-scroll.gif)](https://thenightshadefamily.github.io/spotify-search/)

## Built with

HTML, CSS, JavaScript (jQuery), Spotify API, AJAX

## Features

-   Users type in a search query, choose whether to search for artists or albums, and click `GO`, whereupon up to 20 results are returned
-   Each result consists of an image and title, both of which are links to the corresponding artist or album page on Spotify
-   If there are additional results beyond the initially rendered 20, then a `more` button is conditionally rendered
-   Clicking the `more` button returns the next batch of up to 20 results
-   The `more` button only appears if not all results have been rendered
-   Infinite scroll is also an option in place of the `more` button; the URL simply needs `?scroll=infinite` affixed to it for this to take effect

## Goals of Project

-   Practicing making API requests and handling the returned data
-   Conditionally rendering a `more` button
-   Implementing infinite scroll
