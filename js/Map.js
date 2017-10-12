class Map
{
	constructor()
	{
		var NewPos = function()
		{
			if( !calc.Random( 0,10 ) )
				return calc.Random( -3,-1 );
			
			return calc.Random( 1,3 );
		}
		// 
		var positions = [];
		var weakBricks = [];
		
		const TILE_SIZE = 50;
		const WIDTH = gfx.SCREEN_WIDTH / TILE_SIZE;
		const HEIGHT = gfx.SCREEN_HEIGHT / TILE_SIZE;
		// 
		this.Init = function()
		{
			for( var y = 0; y < HEIGHT; ++y )
			{
				for( var x = 0; x < WIDTH; ++x )
				{
					const tile = NewPos();
					positions[y * WIDTH + x] = tile;
					
					if( !calc.Random( 0,10 ) && tile > 0 )
					{
						weakBricks[weakBricks.length] = new WeakBrick( x,y,"#FFF" );
					}
				}
			}
			
			positions[pl.Pos().y * WIDTH + pl.Pos().x] = 2;
		}
		
		this.Update = function()
		{
			for( var i in weakBricks )
			{
				if( !weakBricks[i].Update() )
				{
					weakBricks.splice( i,1 );
				}
			}
		}
		
		this.Draw = function()
		{
			for( var y = 0; y < HEIGHT; ++y )
			{
				for( var x = 0; x < WIDTH; ++x )
				{
					const p = positions[y * WIDTH + x];
					
					var c = "#000";
					
					// Void tiles.
					if( p === -3 )
						c = "#F00";
					else if( p === -2 )
						c = "#E11";
					else if( p === -1 )
						c = "#D22";
					
					// Ground tiles.
					if( p === 1 )
						c = "#777";
					else if( p === 2 )
						c = "#888";
					else if( p === 3 )
						c = "#999";
					
					gfx.Rect( x * TILE_SIZE,y * TILE_SIZE,TILE_SIZE,TILE_SIZE,c );
				}
			}
			
			for( var i in weakBricks )
			{
				weakBricks[i].Draw();
			}
		}
		
		this.DrawGrid = function()
		{
			for( var y = 0; y < HEIGHT; ++y )
				gfx.Rect( 0,y * TILE_SIZE,gfx.SCREEN_WIDTH,1,"#FFF" );
			for( var x = 0; x < WIDTH; ++x )
				gfx.Rect( x * TILE_SIZE,0,1,gfx.SCREEN_WIDTH,"#FFF" );
		}
		
		this.MoveLeft = function()
		{
			positions.splice( 0,1 );
			
			// TODO: Fix this!
			// for( var i in positions )
			// {
			// 	REMEMBER: % operator does not follow the same order of operations as / does!
			// 	if( i % WIDTH === 0 )
			// 		positions[i] = NewPos();
			// }
			
			positions[positions.length] = NewPos();
			
			for( var i = 0; i < HEIGHT; ++i )
			{
				const tile = NewPos();
				positions[WIDTH * i - 1] = tile;
				
				if( !calc.Random( 0,10 ) && tile > 0 )
				{
					weakBricks[weakBricks.length] = new WeakBrick( WIDTH,i,"#FFF" );
				}
			}
			
			for( var i in weakBricks )
			{
				weakBricks[i].MoveLeft();
			}
		}
		
		this.Tile = function( i,val )
		{
			positions[i] = val;
		}
		
		this.TileXY = function( x,y,val )
		{
			positions[y * WIDTH + x] = val;
		}
		
		this.TileAt = function( x,y )
		{
			return positions[y * WIDTH + x];
		}
		
		this.WallAt = function( x,y )
		{
			const p = positions[y * WIDTH + x];
			
			return ( p === -1 || p === -2 || p === -3 );
		}
		
		this.VoidAt = function( x,y )
		{
			for( var i in weakBricks )
			{
				if( weakBricks[i].Pos().x === x &&
				    weakBricks[i].Pos().y === y &&
					weakBricks[i].IsVoid() )
				{
					return true;
				}
			}
			return false;
		}
		
		this.TileSize = function()
		{
			return TILE_SIZE;
		}
		
		this.Width = function()
		{
			return WIDTH;
		}
		
		this.Height = function()
		{
			return HEIGHT;
		}
	}
}