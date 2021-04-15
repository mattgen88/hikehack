<template>
  <div class="about">
    <h1>About HikeHack</h1>
    <p>An ACV Auctions hackathon project. This app aims to aid in hiking around WNY and elsewhere.</p>

    <h2>Work before hand?</h2>
    <p>None. Not even planning. Didn't have an idea before hackathon started. However I did use some vue components and golang libraries.</p>
    <p>Additionally I did some hikes before hand and got some GPX files from DRabb to demo.</p>

    <h2>What I did:</h2>
    <p>Created a golang service to serve up and list out gpx files for the frontend to consume.</p>
    <p>Go service uses gorilla mux, handlers, a hal+json library I built ages ago, postgres, viper libraries.</p>
    <p>Go service allows upload and storage of GPX files by a user.</p>
    <p>GPX Files are stored gzipped in postgres.</p>
    <p>Learned basics of VueJS.</p>
    <p>Pulled together different frontend components (vue, leaflet, leaflet-gpx, vue-router, vue-sidebar-menu, vue2-leaflet).</p>
    <p>Used icons from icomoon.</p>
    <p>Designed a logo.</p>
  </div>
</template>
