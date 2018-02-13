let GestioneBirre = (function () {

	/* DECLARING VARIABLES */
	let $wrapper, $birra, $input, actualPage, switchRisultati;

	const INIT_DOC_H = $(document).height();

	const URL = 'https://api.punkapi.com/v2/beers';

	let TEMPLATE_BASE_BIRRA = '<article class="birra"><img src="" /><h2></h2></article>';

	/* CACHING VARIABLES */
	function _setup() {
		$wrapper = $('#wrapper_birre');
		$birra = $('.birra');
		$input = $("#scelta");

		actualPage = 1;
		switchRisultati = 1;
	};

	/* PRIVATE BUSINESS FUNCTIONS */
	const _checkEnter = function(e, $this) {

    if (e.keyCode == 13) {
      // Reset variabili
			$wrapper.empty();
			actualPage = 1;

      if ($this.val() == "") {

        switchRisultati = 1;
  			_showBirreByElement();

      } else if ($('#scelta-1').prop('checked')) {

        switchRisultati = 2;
  			_showBirreByElement("beer_name=" + $this.val() + "&");

      } else if ($('#scelta-2').prop('checked')) {

        switchRisultati = 3;
  			_showBirreByElement("food=" + $this.val() + "&");
      }

			setTimeout(_controlloImmagini, 1000);
    }
	};

	const _printBirre = function(response) {
		response.forEach(function(element, index){
			let $birra_base = $(TEMPLATE_BASE_BIRRA);

			$birra_base.find('img').attr('data-src', element.image_url);
			$birra_base.find('img').attr('data-id', element.id);
			$birra_base.find('img').attr('src', 'images/loader.svg');
			$birra_base.find('h2').append(element.name);

			$wrapper.append($birra_base);
		});

		++actualPage;
	}

	const _showBirreByElement = function(element="") {
		_visualizzaBirre(URL + "?"+ element + "per_page=4&page=" + actualPage).then(
			function(response) {
				_printBirre(response);
			},
			function(error) {
				console.error("Failed!", error);
			}
		);
	};

	const _showBirra = function($element) {
		_visualizzaBirre(URL + "/" + $element.find('img').data('id')).then(
			function(response) {
				$element.append("<p>" + response[0].description + "</p>");
			},
			function(error) {
				console.error("Failed!", error);
			}
		);
	};

	const _swap = function(element) {
		let dataSrc = element.attr('data-src');
		element.attr('src', dataSrc);
	}

	const _visualizzaBirre = function(url) {
		// Return a new promise.
		return new Promise(function(resolve, reject) {
			// Do the usual XHR stuff
			var req = new XMLHttpRequest();
			req.open('GET', url);

			req.onload = function() {
				// This is called even on 404 etc
				// so check the status
				if (req.status == 200) {
					// Resolve the promise with the response text
					resolve(req.response);
				}
				else {
					// Otherwise reject with the status text
					// which will hopefully be a meaningful error
					reject(Error(req.statusText));
				}
			};

			// Handle network errors
			req.onerror = function() {
				reject(Error("Network Error"));
			};

			// Make the request
			req.responseType = 'json';
			req.send();
		});
	};

	const _controlloImmagini = function() {
		$('img').each(function() {
			let $this = $(this);
			if ($this.isOnScreen()) {
				_swap($this);
			}
		});
	}

	const switchResults = function () {
		switch (switchRisultati) {
			case 1:
			_showBirreByElement();
			break;
			case 2:
			_showBirreByElement("beer_name", $input.val());
			break;
			case 3:
			_showBirreByElement("food", $input.val());
			break;
		}
	}
	/* END PRIVATE BUSINESS FUNCTIONS */

	/* DECLARING EVENT HANDLER */
	function _setObserver() {
		$input.keypress(function(e) {
			let $this = $(this)
			_checkEnter(e, $this);
		});

		$(window).scroll(function() {
			if($(window).scrollTop() + INIT_DOC_H >= $(document).height()) {
				switchResults();
			}

			_controlloImmagini();
		});

		$wrapper.on('click', ".birra", function() {
			_showBirra($(this));
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
		start: _init
	};

})();
