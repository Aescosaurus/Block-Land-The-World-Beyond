// Strings!
const version = "v2.1.5";

// Numbers!
var pizzaNum = 3;

// Booleans!
const funny = false;

// Arrays!
var enemies = [];

// Objects!
var calc = new Calc();
var gfx  = new Graphics();
var kbd  = new Keyboard();
var ms   = new Mouse();
var ajax = new AJAX();

var pl = new Player();

window.onload = function()
{
	Init();
	
	const FPS = 60;
	setInterval( function()
	{
		Update();
		Draw();
	},1000 / FPS );
	console.log( "JSJ Framework " + version + " has loaded successfully!" );
};

function Init()
{
	gfx.Init();
	kbd.Init();
	ms.Init( gfx.canvas );
	
	gfx.SetSmoothing( false ); // Set false for pixel perfect.
	// \/ Initialize things! \/
	pl.Init();
	enemies[0] = new Enemy();
}

function Update()
{
	// \/ Update things here. \/
	pl.Update();
	
	for( var i in enemies )
	{
		const e = enemies[i];
		e.Update();
		if( !e.Alive() )
		{
			enemies.splice( i,1 );
		}
		else if( pl.BulletIsTouching( e.Pos().x,e.Pos().y,e.Pos().w,e.Pos().h ) )
		{
			e.Hurt( 1 );
		}
	}
}

function Draw()
{
	gfx.DrawRect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// \/ Draw things here. \/
	pl.Draw();
	
	for( var i in enemies )
	{
		enemies[i].Draw();
	}
}
