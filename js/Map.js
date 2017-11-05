class Map
{
constructor()
{
	var doors =
	[
		new Door( 0 ),
		new Door( 1 ),
		new Door( 2 ),
		new Door( 3 )
	];
	
	const width = 5;
	const height = 5;
	var level = [];
	var playerPos = { x: 0,y: 0 };
	
	var maps =
	[
		gfx.LoadImage( "Images/Maps/map0.png" )
	];
	// 
	this.Init = function()
	{
		for( var i = 0; i < width * height; ++i )
		{
			level[i] = calc.Random( 0,maps.length - 1 );
			level[i] = 0;
		}
		level[calc.Random( 0,level.length - 1 )] = 10; // Winning place.
		playerPos.x = calc.Random( 0,width - 1 );
		playerPos.y = calc.Random( 0,height - 1 );
		console.log( playerPos.x + " " + playerPos.y );
		
		for( var i in doors )
		{
			doors[i].Init();
		}
	}
	
	this.Draw = function()
	{
		gfx.DrawImage( maps[this.LevelPos( playerPos.x,playerPos.y )],0,0 );
		for( var i in doors )
		{
			if( playerPos.x <= 0 && i == 2 )
			{
				continue;
			}
			else if( playerPos.x >= width - 1 && i == 3 )
			{
				continue;
			}
			else if( playerPos.y <= 0 && i == 0 )
			{
				continue;
			}
			else if( playerPos.y >= height - 1 && i == 1 )
			{
				continue;
			}
			doors[i].Draw();
		}
	}
	
	this.NextArea = function( dir )
	{
		// TODO: Implement something here.
		// dir indicates which door was hit.
		if( dir === 0 )
		{
			--playerPos.y;
		}
		else if( dir === 1 )
		{
			++playerPos.y;
		}
		else if( dir === 2 )
		{
			--playerPos.x;
		}
		else if( dir === 3 )
		{
			++playerPos.x;
		}
	}
	
	this.TouchingDoor = function( x,y,width,height )
	{
		for( var i in doors )
		{
			const d = doors[i];
			if( calc.HitTest( x,y,width,height,d.Pos().x,d.Pos().y,d.Pos().w,d.Pos().h ) )
			{
				return i;
			}
		}
		return 50;
	}
	
	this.LevelPos = function( x,y )
	{
		return level[y * width + x];
	}
}
}