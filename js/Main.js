// Strings!
const version = "v2.1.1";

// Numbers!
var pizzaNum = 5;

// Booleans!
const isFunny = false;

// Arrays!
var sizes = [ 5,12,10 ];

// Objects!
var calc = new Calc();
var gfx  = new Graphics();
var kbd  = new Keyboard();
var ms   = new Mouse();
var ajax = new AJAX();

var pl = new Player();
var area = new Map();

window.onload = function()
{
	const FPS = 10;
	
	setInterval( function()
	{
		Update();
		Draw();
	},1000 / FPS );
	
	Init();
};

function Init()
{
	kbd.Init();
	ms.Init( gfx.canvas );
	
	gfx.SetSmoothing( true ); // Set false for pixel art.
	
	// \/ Initialize things! \/
	area.Init();
	// /\ Initialize!        /\
	
	console.log( "JSJ Framework " + version + " has loaded successfully!" );
}

function Update()
{
	// \/ Update things here. \/
	pl.Update();
	area.Update();
	// /\                     /\
}

function Draw()
{
	gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// \/ Draw things here. \/
	area.Draw();
	
	pl.Draw();
	// area.DrawGrid();
	// /\                   /\
}
