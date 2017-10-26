class Door
{
constructor( dir )
{
	var images =
	[
		gfx.LoadImage( "Images/Doors/DoorU.png" ),
		gfx.LoadImage( "Images/Doors/DoorD.png" ),
		gfx.LoadImage( "Images/Doors/DoorL.png" ),
		gfx.LoadImage( "Images/Doors/DoorR.png" )
	];
	var width = 0;
	var height = 0;
	var pos = { x: 0,y: 0 };
	// 
	this.Init = function()
	{
		if( dir === 0 )
		{
			width = 100;
			height = 40;
			pos.x = gfx.SCREEN_WIDTH / 2 - width / 2;
			pos.y = 0;
		}
		else if( dir === 1 )
		{
			width = 100;
			height = 40;
			pos.x = gfx.SCREEN_WIDTH / 2 - width / 2;
			pos.y = gfx.SCREEN_HEIGHT - height;
		}
		else if( dir === 2 )
		{
			width = 40;
			height = 100;
			pos.x = 0;
			pos.y = gfx.SCREEN_HEIGHT / 2 - height / 2;
		}
		else if( dir === 3 )
		{
			width = 40;
			height = 100;
			pos.x = gfx.SCREEN_WIDTH - width;
			pos.y = gfx.SCREEN_HEIGHT / 2 - height / 2;
		}
	}
	
	this.Draw = function()
	{
		gfx.DrawImage( images[dir],pos.x,pos.y );
	}
	
	this.Pos = function()
	{
		return {
			x: pos.x,
			y: pos.y,
			w: width,
			h: height
		}
	}
}
}