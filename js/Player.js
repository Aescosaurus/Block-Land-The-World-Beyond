// User created file!

class Player
{
	constructor()
	{
		var pos = { x: 3,y: 4 };
		
		const SPD = 3;
		
		// 
		this.Update = function()
		{
			if( kbd.KeyDown( 65 ) )
			{
				pos.x -= SPD;
			}
			
			if( kbd.KeyDown( 68 ) )
			{
				// if( pos.x >= 3 )
				// 	area.MoveLeft();
				// else
					pos.x += SPD;
			}
			
			if( kbd.KeyDown( 87 ) )
			{
				pos.y -= SPD;
			}
			
			if( kbd.KeyDown( 83 ) )
			{
				pos.y += SPD;
			}
			
			if( area.VoidAt( pos.x,pos.y ) )
			{
				location.reload();
			}
		}
		
		this.Draw = function()
		{
			gfx.Rect( pos.x,pos.y,area.TileSize() - 10,area.TileSize() - 10,"#FA0" );
		}
		
		this.Pos = function()
		{
			return pos;
		}
	}
}