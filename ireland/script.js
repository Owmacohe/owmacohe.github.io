var captions = [
  [
    [['day_1/DSC_6264.jpg'], 'View from the top of Howth hill'],
    [['day_1/DSC_6272.jpg'], 'All the path signs down Howth hill were plastered with stickers like this. I put one of my own up too.'],
    [['day_1/DSC_6301.jpg', 'day_1/DSC_6334.jpg'], 'Finn ahead of me on the path'],
    [['day_1/DSC_6306.jpg'], 'The vast view on the eastern coast'],
    [['day_1/DSC_6325.jpg'], 'The winding road along Howth hill'],
    [['day_1/DSC_6337.jpg'], ''],
    [['day_1/DSC_6343.jpg'], 'There were lots of reflective surfaces inside Dublin Castle'],
    [['day_1/DSC_6348.jpg', 'day_1/DSC_6350.jpg', 'day_1/DSC_6351.jpg'], 'The gardens behind Dublin Castle had lots of great vine walls and stonework'],
    [['day_1/DSC_6353.jpg'], 'As spring comes in here, last fall\'s dead flowers start to reappear'],
    [['day_1/DSC_6355.jpg'], 'There were a couple of these strange glass circles set into the ground in the gardens'],
    [['day_1/DSC_6357.jpg'], ''],
    [['day_1/DSC_6359.jpg', 'day_1/DSC_6362.jpg'], 'More creeping plants in the stone walls']
  ],
  [
    [['day_2/DSC_6369.jpg'], 'A residence door at Trinity College'],
    [['day_2/DSC_6379.jpg', 'day_2/DSC_6383.jpg'], 'Inside the Long Room, near where the Book Of Kells is kept'],
    [['day_2/DSC_6392.jpg', 'day_2/DSC_6403.jpg', 'day_2/DSC_6407.jpg'], 'Shots around the belltower on the Trinity College campus'],
    [['day_2/DSC_6417.jpg', 'day_2/DSC_6421.jpg'], 'Some lovely Brutalist architecture I found while snooping'],
    [['day_2/DSC_6437.jpg'], 'Up on a high wall at St. Patrick\'s cathedral']
  ],
  [
    [['day_3/DSC_6454.jpg', 'day_3/DSC_6457.jpg', 'day_3/DSC_6461.jpg'], 'Moss and stone at Glendalough'],
    [['day_3/DSC_6471.jpg', 'day_3/DSC_6473.jpg', 'day_3/DSC_6476.jpg'], 'Near the inner monastic ruins'],
    [['day_3/DSC_6485.jpg'], ''],
    [['day_3/DSC_6492.jpg'], ''],
    [['day_3/DSC_6508.jpg'], 'There were so many headstones embedded face-up in the ground'],
    [['day_3/DSC_6515.jpg', 'day_3/DSC_6518.jpg'], 'So many lovely old headstones leaning everywhich way'],
    [['day_3/DSC_6539.jpg', 'day_3/DSC_6541.jpg'], 'The view from the top of the hill near Glendalough. This was gorgeous to drive back over'],
    [['day_3/DSC_6557.jpg'], ''],
    [['day_3/DSC_6561.jpg'], ''],
    [['day_3/DSC_6571.jpg', 'day_3/DSC_6573.jpg'], 'There were some absolutely spectacular conditions for mushrooms on the mountain'],
    [['day_3/DSC_6578.jpg'], ''],
    [['day_3/DSC_6588.jpg'], '']
  ],
  [
    [['day_4/DSC_6590.jpg', 'day_4/DSC_6602.jpg'], 'Upwards-facing shots at the Rock of Cashel'],
    [['day_4/DSC_6607.jpg', 'day_4/DSC_6612.jpg'], 'Detailed relief carvings of figures on the sides of tombs'],
    [['day_4/DSC_6616.jpg', 'day_4/DSC_6619.jpg'], ''],
    [['day_4/DSC_6627.jpg'], ''],
    [['day_4/DSC_6635.jpg'], ''],
    [['day_4/DSC_6644.jpg'], 'With so many white skies, shots like this were common'],
    [['day_4/DSC_6649.jpg'], '']
  ],
  [
    [['day_5/DSC_6668.jpg', 'day_5/DSC_6683.jpg'], 'Tall cliffs and vast oceans off the Cliffs of Moher'],
    [['day_5/DSC_6685.jpg'], ''],
    [['day_5/DSC_6701.jpg', 'day_5/DSC_6703.jpg'], 'Weathered guardposts kept hikers away from the dangerous cliffs'],
    [['day_5/DSC_6707.jpg'], ''],
    [['day_5/DSC_6715.jpg'], '']
  ],
  [
    [['day_6/DSC_6720.jpg'], 'Some brightly-coloured lichen on a headstone at Clonmacnoise'],
    [['day_6/DSC_6724.jpg'], ''],
    [['day_6/DSC_6738.jpg', 'day_6/DSC_6739.jpg'], 'Small engravings in nooks and on headstones'],
    [['day_6/DSC_6740.jpg'], 'Another white-sky shot'],
    [['day_6/DSC_6751.jpg', 'day_6/DSC_6753.jpg'], 'Really pretty entrance in one of the small ruins'],
    [['day_6/DSC_6755.jpg'], 'Okay maybe I really like this kind of photo'],
    [['day_6/DSC_6759.jpg', 'day_6/DSC_6780.jpg'], 'There were so many pretty decorated archways']
  ]
];

window.onload = function() {
  var start = 1;

  for (var i = 0; i < captions.length; i++) {
    for (var j = 0; j < captions[i].length; j++) {
      var row = document.createElement('DIV');
      row.setAttribute('class', 'flex_row');
      document.getElementById('day_' + (i + start)).appendChild(row);

      var groupCount = captions[i][j][0].length;

      for (var k = 0; k < groupCount; k++) {
        var widthOffset = (groupCount != 4) ? 12 : 7;

        var img = document.createElement('IMG');
        img.setAttribute('src', 'images/' + captions[i][j][0][k]);
        img.setAttribute('style', 'width: ' + (59 - (groupCount * widthOffset)) + 'vw;');
        row.appendChild(img);
      }

      var caption = captions[i][j][1];

      if (caption != '') {
        var par = document.createElement('P');
        par.setAttribute('class', 'caption');
        par.innerHTML = caption;
        row.appendChild(par);
      }
    }
  }
}
