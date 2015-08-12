

$('.btn_search').on('click', function() {
    var artistName = $('input[name="name"]').val();
    var nameObj = {name: artistName}
    $.get('albums/search', nameObj, function(artists) {
      appendArtists(artists)
    })
    event.preventDefault();
})

function appendArtists(artists) {
  var selectedArtist = $(".selected-artist");
  console.log(artists)
  selectedArtist.empty() //empty for each search
  selectedArtist.attr('size', artists.length) //defining the size for dropdown menu

  //html for each artist
  artists.forEach(function(artist) {
    var html = '<option value=' + artist._id + ' >' + artist.name + '</option>';
    $('.selected-artist').append(html)
  })

};
