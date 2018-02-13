let GestioneBirre = (function () {

	/* DECLARING VARIABLES */
	let $wrapper, $birra, $input, actualPage;

	const INIT_DOC_H = $(document).height();

	const API_ROOT = 'https://api.punkapi.com/v2',
	API_BEERS = '/beers?per_page=5&page=';

	let TEMPLATE_BASE_BIRRA =
	'<article class="birra">'
	+'<img src="" />'
	+'<h2></h2>'
	+'</article>';

	let TEMPLATE_DETTAGLI_BIRRA =
	'<section>'
	+'<h4></h4>'
	+'<h4></h4>'
	+'</section>';

	/* CACHING VARIABLES */
	function _setup() {
		$wrapper = $('#wrapper_birre');
		$birra = $('.birra');
		$input = $("#scelta");

		actualPage = 1;
	};

	/* PRIVATE BUSINESS FUNCTIONS */
	const _checkEnter = function(e, $this) {
		if ($this.val() == "" && e.keyCode == 13) {
			_updateLista();
		}

	}

	const _updateLista = function() {
		_visualizzaBirre(API_ROOT + API_BEERS + actualPage).then(
			function(response) {
				response.forEach(function(element, index){
					let $birra_base = $(TEMPLATE_BASE_BIRRA);

					$birra_base.find('img').attr('data-src', element.image_url);
					$birra_base.find('img').attr('src', 'images/white.png');
					$birra_base.find('h2').append(element.name);

					$wrapper.append($birra_base);

					++actualPage;
				});
			},
			function(error) {
				console.error("Failed!", error);
			}
		);
	};

	const _swap = function(element) {

		let src = element.attr('src');
		let dataSrc = element.attr('data-src');
		element.attr('src', dataSrc);
		element.attr('dataSrc', src);
	}

	const _visualizzaBirra = function() {
		// aggiunge dettagli alla singola birra
	};

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
	/* END PRIVATE BUSINESS FUNCTIONS */

	/* DECLARING EVENT HANDLER */
	function _setObserver() {
		$input.keypress(function(e) {
			let $this = $(this)
			_checkEnter(e, $this);
		});

		$(window).scroll(function() {
			if($(window).scrollTop() + INIT_DOC_H >= $(document).height()) _updateLista();

			$('img').each(function() {
				let $this = $(this);

				if ($this.isOnScreen()) {
					_swap($this);
				}

			});

		})

		$wrapper.on('hover', $birra, _visualizzaBirra); // dettagli birra
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
