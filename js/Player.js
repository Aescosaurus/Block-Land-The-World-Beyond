// User created file!

class Player
{
	constructor()
	{
		var pos = { x: 3,y: 4 };
		
		// 
		this.Update = function()
		{
			if( kbd.KeyDown( 65 ) && pos.x > 0 &&
			    !area.WallAt( pos.x - 1,pos.y ) )
				--pos.x;
			
			if( kbd.KeyDown( 68 ) && !area.WallAt( pos.x + 1,pos.y ) )
			{
				if( pos.x >= 3 )
					area.MoveLeft();
				else
					++pos.x;
			}
			
			if( kbd.KeyDown( 87 ) && pos.y > 0 &&
			    !area.WallAt( pos.x,pos.y - 1 ) )
				--pos.y;
			
			if( kbd.KeyDown( 83 ) && pos.y < area.Height() - 1 &&
			    !area.WallAt( pos.x,pos.y + 1 ) )
				++pos.y;
			
			if( area.VoidAt( pos.x,pos.y ) )
			{
				location.reload();
			}
		}
		
		this.Draw = function()
		{
			gfx.Rect( pos.x * area.TileSize() + 5,pos.y * area.TileSize() + 5,
			          area.TileSize() - 10,area.TileSize() - 10,"#FA0" );
		}
		
		this.Pos = function()
		{
			return pos;
		}
	}
}