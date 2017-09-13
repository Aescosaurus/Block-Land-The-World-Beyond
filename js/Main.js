// Strings
const version = "v2.0.3";

// Numbers
var pizzaNum = 5;

// Booleans
const isFunny = false;

// Arrays
var blocks = [];

// Objects
var calc = new Calc();
var gfx = new Graphics();
var kbd = new Keyboard();
var ms = new Mouse();

var pl = new Player();
var map = new Map();

window.onload = function()
{
	const fps = 30;
	setInterval( function()
	{
		Update();
		Draw();
	},1000 / fps );
	Init();
};

function Init()
{
	// Initialize things here.
	kbd.Init();
	ms.Init( gfx.canvas );
	
	gfx.SetSmoothing( true ); // Set false for pixel art.
	
	var c = 0;
	
	for( var i = 0; i < map.Dim().h; ++i )
	{
		for( var j = 0; j < map.Dim().w; ++j )
		{
			if( map.PosXY( j,i ) === 1 )
				blocks[c++] = new Block( j * 30,i * 30 );
		}
	}
	
	console.log( "JSJ Framework version " + version + " has loaded successfully!" );
}

function Update()
{
	// Update things here.
	pl.Update();
	
	for( var i in blocks )
	{
		var b = blocks[i]
		b.Update();
		
		while( calc.HitTest( pl.Pos().x,pl.Pos().y,
			              pl.Pos().w,pl.Pos().h,
			              b.Pos().x,b.Pos().y,
			              b.Pos().w,b.Pos().h ) )
		{
			pl.MovePos( 0,-0.3 );
			pl.Land();
			pl.CanJump( true );
			
			b.Break();
		}
	}
}

function Draw()
{
	gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// Draw things here.
	for( var i in blocks )
		blocks[i].Draw();
	
	pl.Draw();
}
