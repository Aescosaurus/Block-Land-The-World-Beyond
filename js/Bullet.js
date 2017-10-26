class Bullet
{
constructor( x,y,targetX,targetY )
{
	const SPD = 7;
	const SIZE = 5;
	var pos = { x: x,y: y };
	var rot = calc.FindAngle( x,y,targetX,targetY );
	
	var image = gfx.LoadImage( "Images/Projectiles/Bullet.png" );
	// 
	this.Update = function()
	{
		pos.x += SPD * Math.cos( rot * ( Math.PI / 180 ) );
		pos.y += SPD * Math.sin( rot * ( Math.PI / 180 ) );
	}
	
	this.Draw = function()
	{
		// gfx.DrawCircle( pos.x,pos.y,SIZE,"#F00" );
		gfx.DrawImage( image,pos.x,pos.y );
	}
	
	this.Pos = function()
	{
		return {
			x: pos.x,
			y: pos.y,
			w: SIZE,
			h: SIZE
		}
	}
}
}