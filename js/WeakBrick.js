class WeakBrick
{
	constructor( x_in,y_in,c_in )
	{
		var x = x_in;
		var y = y_in;
		var c = c_in;
		
		const TIME_TO_FALL = calc.Random( 5,20 );
		var fallTimer = 0;
		
		var falling = false;
		
		var offset = 0;
		
		var X_ORIG = x;
		var Y_ORIG = y;
		
		var willDraw = true;
		
		var image = new Image();
		image.src = "Images/Block" + calc.Random( 4,6 ) + ".png";
		// 
		this.Update = function()
		{
			++fallTimer;
			
			if( fallTimer > TIME_TO_FALL )
				falling = true;
			
			if( !falling )
			{
				// TODO: Shake or something.
				
			}
			else
			{
				// Draw differently.
				// ++offset;
				
				if( offset * 2 > area.TileSize() )
				{
					willDraw = false;
				}
				else
				{
					++offset;
				}
			}
			return true;
		}
		
		this.Draw = function()
		{
			gfx.Rect( x * area.TileSize(),y * area.TileSize(),area.TileSize(),area.TileSize(),"#000" );
			if( !falling )
			{
				// gfx.Rect( x * area.TileSize(),y * area.TileSize(),area.TileSize(),area.TileSize(),c );
				gfx.context.drawImage( image,x * area.TileSize(),y * area.TileSize(),area.TileSize(),area.TileSize() );
			}
			else
			{
				if( willDraw )
				{
					// gfx.Rect( x * area.TileSize() + offset,y * area.TileSize() + offset,
					// 		  area.TileSize() - offset * 2,area.TileSize() - offset * 2,c );
					gfx.context.drawImage( image,x * area.TileSize() + offset,y * area.TileSize() + offset,
					                       area.TileSize() - offset * 2,area.TileSize() - offset * 2 );
				}
			}
		}
		
		this.MoveLeft = function()
		{
			--x;
		}
		
		this.Dest = function()
		{
			
		}
		
		this.Pos = function()
		{
			return {
				x,
				y
			}
		}
		
		this.IsVoid = function()
		{
			return falling;
		}
	}
}