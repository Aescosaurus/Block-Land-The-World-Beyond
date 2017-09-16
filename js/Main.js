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
	
	map.GenerateBlocks();
	ReadBlocks();
	
	console.log( "JSJ Framework version " + version + " has loaded successfully!" );
}

function Update()
{
	// Update things here.
	pl.Update();
	
	for( var i in blocks )
	{
		var b = blocks[i]
		
		if( b.Pos().y > gfx.SCREEN_HEIGHT || b.Pos().x < 0 )
			blocks.splice( i,1 );
		
		if( b.Pos().x > 0 && b.Pos().x < gfx.SCREEN_WIDTH )
		{
			b.Update();
			/*
			while( pl.HitTestRight( b.Pos().x,b.Pos().y,
			                       b.Pos().w,b.Pos().h ) )
				pl.MovePos( -0.3,0 );
			
			while( pl.HitTestLeft( b.Pos().x,b.Pos().y,
			                       b.Pos().w,b.Pos().h ) )
				pl.MovePos( 0.3,0 );
			*/
			while( pl.HitTestBot( b.Pos().x,b.Pos().y,
			                      b.Pos().w,b.Pos().h ) )
			{
				pl.MovePos( 0,-0.3 );
				pl.Land();
				pl.CanJump( true );
				
				b.Break();
			}
			
			while( pl.HitTestTop( b.Pos().x,b.Pos().y,
			                      b.Pos().w,b.Pos().h ) )
			{
				pl.Land();
				pl.MovePos( 0,0.3 );
			}
		}
	}
	
	while( pl.Pos().x > gfx.SCREEN_WIDTH / 2 )
	{
		const move = 0.3;
		pl.MovePos( -move,0 );
		
		for( var i in blocks )
			blocks[i].MovePos( -move,0 );
	}
	
	if( blocks[blocks.length - 1].Pos().x < gfx.SCREEN_WIDTH )
	{
		map.GenerateBlocks();
		ReadBlocks( gfx.SCREEN_WIDTH );
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

var ReadBlocks = function( offsetX = 0 )
{
	// blocks = [];
	
	var c = blocks.length; // 0;
	
	for( var i = 0; i < map.Dim().h; ++i )
	{
		for( var j = 0; j < map.Dim().w; ++j )
		{
			if( map.PosXY( j,i ) === 1 )
				blocks[c++] = new Block( j * 30 + offsetX,i * 30 );
		}
	}
	
	console.log( "Blocks were generated!" );
}
