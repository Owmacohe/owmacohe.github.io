var captions = [
  [
    ['report_6/bart_1.jpg', 'Pretty god rays contrast the growing pollution above'],
    ['report_6/bart_2.jpg', 'The mist added by the Complementary Shaders between spires is really fantastic'],
    ['report_6/bridge.jpg', 'Creative of use alternating redstone lights on the bridge by WonderAnchor\'s base'],
    ['report_6/cacophany_1.jpg', 'Step one of the cacophony machine\'s construction'],
    ['report_6/cacophany_2.jpg', 'Step two...'],
    ['report_6/cacophany_3.jpg', 'And step three. It makes a delightful racket'],
    ['report_6/cave.jpg', 'Wide open vista of an expansive 1.18 cave'],
    ['report_6/circle.jpg', 'From high up above, everything looks so much more... expansive'],
    ['report_6/fortress.jpg', 'You can probably tell that I love taking fog screenshots. Also, green suits the Nether so well'],
    ['report_6/gallery_1.jpg', 'The unaltered terrain below the Flâneur art galley before the slice of terrain got pulled up'],
    ['report_6/gallery_2.jpg', 'The terrain extraction is progress as I flew through its beams of light'],
    ['report_6/gallery_3.jpg', 'The newly-pulled island, ready for construction'],
    ['report_6/gallery_4.jpg', 'The first iteration of the gallery, without proper lights or interior design'],
    ['report_6/gallery_5.jpg', 'A later iteration...'],
    ['report_6/gallery_interior_1.jpg', 'The image stacks, ready for adornment'],
    ['report_6/gallery_interior_2.jpg', 'The upper level (you have no how idea how much gold I wasted on this build)'],
    ['report_6/ice.jpg', 'The formations in the ice biome really are something else. This one reminds me of the CN tower'],
    ['report_6/immersive_bomb.jpg', 'A poor villager town being utterly obliterated by Botania bombs (taken during the Immersive Space experience)'],
    ['report_6/immersive_botania.jpg', 'The Botania island at work near spawn (taken during the Immersive Space experience)'],
    ['report_6/immersive_end_1.jpg', 'One of the more unique End mobs (taken during the Immersive Space experience)'],
    ['report_6/immersive_end_2.jpg', 'While purposeless, the End formations sure are breathtaking (taken during the Immersive Space experience)'],
    ['report_6/immersive_end_3.jpg', 'The Ender Dragon flies by during our fight with it (taken during the Immersive Space experience)'],
    ['report_6/immersive_ice.jpg', 'A swift sunrise over a frozen lake (taken during the Immersive Space experience)'],
    ['report_6/immersive_nether_1.jpg', 'Glowstone sure shines bright with Complementary Shaders... (taken during the Immersive Space experience)'],
    ['report_6/immersive_nether_2.jpg', 'The warped forests are my favourite Nether biome. A great mix of comfort and uneasiness (taken during the Immersive Space experience)'],
    ['report_6/immersive_pad.jpg', 'Light spilling down from the glass roof above my base (taken during the Immersive Space experience)'],
    ['report_6/immersive_planners_hub.jpg', 'A nice wide shot of the area surrounding Lunabunns\'s base (taken during the Immersive Space experience)'],
    ['report_6/immersive_radioactive_1.jpg', 'A high-quality shot of the \'radioactive\' monument we built to house the old image canvasses (taken during the Immersive Space experience)'],
    ['report_6/immersive_radioactive_2.jpg', 'The same monument, this time from deep below (taken during the Immersive Space experience)'],
    ['report_6/immersive_reef.jpg', 'One heck of a giant coral reef, with gorgeous reflections bouncing off the underneath of the waves (taken during the Immersive Space experience)'],
    ['report_6/immersive_teleplaza_1.jpg', 'The new teleportation hub (or Teleplaza) that Bl4ckbirds set up for us (taken during the Immersive Space experience)'],
    ['report_6/immersive_teleplaza_2.jpg', 'The hub, floating alone amid the stars in the Demon Realm (taken during the Immersive Space experience)'],
    ['report_6/immersive_wheat.jpg', 'With the extra-wide view, wheat fields seem to stretch on forever... (taken during the Immersive Space experience)'],
    ['report_6/jump.jpg', 'The Planner 2s demonstrating some very impressive bicycle tricks (right into my face)'],
    ['report_6/kelp.jpg', 'Kelp clusters as thick as the dark forests of the land'],
    ['report_6/lilypads.jpg', 'A really pretty sunset vista reflecting off water and lillypads'],
    ['report_6/seaside_village.jpg', 'A uniquely-generating structure: a seaside village'],
    ['report_6/underwater.jpg', 'Yet more underwater reflections that always seem to blow my mind'],
    ['report_6/waves.jpg', 'You\'d be forgiven for thinking that this isn\'t a Minecraft screenshot'],
    ['report_6/whale.jpg', 'Another majestic animal from the Alex\'s Mobs mod, which continues to impress']
  ]
];

window.onload = function() {
  for (var i = 0; i < 1; i++) {
    for (var j = 0; j < captions[i].length; j++) {
      var row = document.createElement('DIV');
      row.setAttribute('class', 'flex_row');
      document.getElementById('report_' + (i+6)).appendChild(row);

      var img = document.createElement('IMG');
      img.setAttribute('src', 'images/' + captions[i][j][0]);
      row.appendChild(img);

      var par = document.createElement('P');
      par.setAttribute('class', 'caption');
      par.innerHTML = captions[i][j][1];
      row.appendChild(par);
    }
  }
}
