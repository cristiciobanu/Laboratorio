// ROOT ELEMENT
var $root = $('body');

// CHILDS
var $interruttore1	= $('#interruttore1');
var $interruttore2	= $('#interruttore2');
var $interruttoreGenerale	= $('#interruttoreG');

// COMMANDS
var STATO_LAMPADINA_1	= 'lampadina1accesa';
var STATO_LAMPADINA_2	= 'lampadina2accesa';

// EVENTS
//Change lamp 1 status
$interruttore1.on('click', function()
{
  _manageClass(STATO_LAMPADINA_1);
});

//Change lamp2 status
$interruttore2.on('click', function()
{
  _manageClass(STATO_LAMPADINA_2);
});

//Change all lamp status
$interruttoreGenerale.on('click', function()
{
	_manageClass(STATO_LAMPADINA_1);
  _manageClass(STATO_LAMPADINA_2);
	$interruttore1.prop('checked', !$interruttore1.prop('checked'));
	$interruttore2.prop('checked', !$interruttore2.prop('checked'));
});
