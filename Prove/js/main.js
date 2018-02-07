// ROOT ELEMENT
var $root = $('body');

// CHILDS
var $interruttore1	= $('#interruttore1');
var $interruttore2	= $('#interruttore2');
var $interruttoreG	= $('#interruttoreG');

// COMMANDS
var STATO_LAMPADINA_1	= 'lampadina1accesa';
var STATO_LAMPADINA_2	= 'lampadina2accesa';
var MOSTRALL = "mostraAll";
var MOSTRHOME = "mostraHome";
var MOSTRFARM = "mostraFarm";

// EVENTS
//Change lamp 1 status
$interruttore1.on('click', function()
{
  _manageClass(STATO_LAMPADINA_1);

  $("#images").toggleClass(MOSTRHOME);
});

//Change lamp2 status
$interruttore2.on('click', function()
{
  _manageClass(STATO_LAMPADINA_2);
  $("#images").toggleClass(MOSTRFARM);
});

//Change all lamp status
$interruttoreG.on('click', function()
{
	_manageClass(STATO_LAMPADINA_1);
  _manageClass(STATO_LAMPADINA_2);
  $("#images").toggleClass(MOSTRALL);
   // if($interruttoreG){}
  _invertCheck($interruttore1);
  _invertCheck($interruttore2);
	// $interruttore1.prop('checked', !$interruttore1.prop('checked'));
	// $interruttore2.prop('checked', !$interruttore2.prop('checked'));
});
