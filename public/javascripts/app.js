var state_mapping = {"AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","DC":"District Of Columbia","FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming"};

$(function() {
  var po = org.polymaps;
  
  var map = po.map()
            .container($('#map').append(po.svg('svg')).find('svg').get(0))
            .center({lat: 40, lon: -95})
            .zoomRange([3, 7])
            .zoom(4);
  map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
    + "/4ee73d68dfbe4822b1194ca9aa162314"
    + "/20760/256/{Z}/{X}/{Y}.png")
    .hosts(['a.', 'b.', 'c.', ''])));
  map.add(po.interact());
  map.add(po.compass()
    .pan("none"));
  map.add(po.geoJson()
    .url("http://polymaps.appspot.com/state/{Z}/{X}/{Y}.json")
    .on('load', load));

  function load(e) {
    var valid_member_states = _(active_state_abbrevs).map(function(abb) { return state_mapping[abb]; });
    for (var i = 0; i < e.features.length; i++) {
      var feature = e.features[i];
      if(_(valid_member_states).detect(function(st) { 
        return st == feature.data.properties.name; 
      })) {
        feature.element.setAttribute("class", 'state valid-member-state');
      } else {
        feature.element.setAttribute("class", 'state');
      }
    }
  }

});

