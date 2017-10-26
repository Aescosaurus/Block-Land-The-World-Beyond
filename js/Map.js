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
	]
	var curRoom = 0;
	var maps =
	[
		gfx.LoadImage( "Images/Maps/map0.png" )
	];
	// 
	this.Init = function()
	{
		for( var i in doors )
		{
			doors[i].Init();
		}
	}
	
	this.Draw = function()
	{
		gfx.DrawImage( maps[curRoom],0,0 );
		for( var i in doors )
		{
			doors[i].Draw();
		}
	}
	
	this.NextArea = function( dir )
	{
		// TODO: Implement something here.
		// dir indicates which door was hit.
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
}
}