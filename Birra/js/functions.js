var retriveAjax = (function () {

  /* DECLARING VARIABLES */
  var $wrapper, $more, $less , $buttonID;

  var totElements, dimPagina;

  var RESTURL = "https://jsonplaceholder.typicode.com/photos";

  /* CACHING VARIABLES */
  function _setup() {
    $wrapper = $('.container');
    $more = $('.get-more');
    $less = $('.get-less');
    // $buttonID = $("button[data-id]");
    $buttonID = $("*[data-id]");
    dimPagina = 25;
    totElements = 0;
  };

  /* PRIVATE BUSINESS FUNCTIONS */
  var _aggiungere = function(data) {
    $wrapper.append('<li>' + data.title + '<button type="button" name="button" data-id="' + data.id + '">More Info</button>' + '</li>');
  };

 var _filteringData = function(data, condition) {
    totElements += dimPagina;
    for (var i = totElements-dimPagina; i < totElements; i++) {
      _aggiungere(data[i]);
    }
 }

  var _getPhotos = function() {
    // var url = RESTURL;
    // url = url.replace("{name}",param);
    $.ajax({
      url: RESTURL,
      type: "GET",
      dataType: 'json',
      cache: false,
      success: function(data) {
        _filteringData(data);
      }
    });
  }

  var _getOne = function($id, $appendTO) {
    $.ajax({
      url: RESTURL + "/" + $id,
      type: "GET",
      dataType: 'json',
      cache: false,
      success: function(data) {
        $appendTO.append('<img src="' + data.thumbnailUrl + '" alt="">' );
      }
    });
  }

   /* DECLARING EVENT HANDLER */
  function _setObserver() {
    $(document).ready(_getPhotos(true));

    $more.on("click", function() {
      _getPhotos();
    });

    $less.on("click", function() {
      _getPhotos();
    });

    $("ul").on("click", "button" , function() {
      var $appendTO = $(this).closest("li");
      var $id = $(this).data("id");
      _getOne($id, $appendTO);
    });
  };

  function _init() {
    try {
      _setup();
      _setObserver();
    }

    catch(e) {
        console.log('%c ' + e.message, 'color:red');
        console.log('%c ' + e.stack, 'background: #222; color: #bada55');
    }
  }

  return {
    start: _init,
  };

})();
