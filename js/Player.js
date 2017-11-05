// User created file!

class Player
{
constructor()
{
	var ApplyMovement = function()
	{
		if( kbd.CharDown( 'W' ) )
		{
			vel.y -= SPD;
		}
		if( kbd.CharDown( 'S' ) )
		{
			vel.y += SPD;
		}
		if( kbd.CharDown( 'A' ) )
		{
			vel.x -= SPD;
		}
		if( kbd.CharDown( 'D' ) )
		{
			vel.x += SPD;
		}
		
		pos.x += ( vel.x *= 0.85 );
		pos.y += ( vel.y *= 0.85 );
	}
	// 
	const width = 70;
	const height = 70;
	var pos =
	{
		x: 9999,
		y: 9999
	};
	
	const SPD = 0.8;
	var vel = { x: 0,y: 0 };
	
	var bullets = [];
	var curBullet = 0;
	
	const REFIRE_TIME = 12;
	var shotTimer = REFIRE_TIME;
	
	const lImage = gfx.LoadImage( "Images/Player/playerL.png" );
	const rImage = gfx.LoadImage( "Images/Player/playerR.png" );
	// 
	this.Init = function()
	{
		pos.x = gfx.SCREEN_WIDTH / 2;
		pos.y = gfx.SCREEN_HEIGHT / 2;
	}
	
	this.Update = function()
	{
		ApplyMovement();
		
		++shotTimer;
		if( ms.IsDown() && shotTimer > REFIRE_TIME )
		{
			shotTimer = 0;
			bullets[curBullet++] = new Bullet( pos.x,pos.y,ms.Pos().x,ms.Pos().y );
		}
		
		for( var i in bullets )
		{
			bullets[i].Update();
		}
		
		var doorHit = area.TouchingDoor( pos.x - width / 2,pos.y - width / 2,width,height );
		if( doorHit !== 50 )
		{
			area.NextArea( doorHit );
			if( doorHit == 0 )
			{
				pos.y = gfx.SCREEN_HEIGHT - height * 1.5;
			}
			else if( doorHit == 1 )
			{
				pos.y = 0 + height * 1.5;
			}
			else if( doorHit == 2 )
			{
				pos.x = gfx.SCREEN_WIDTH - width * 1.5;
			}
			else if( doorHit == 3 )
			{
				pos.x = width * 1.5;
			}
		}
	}
	
	this.Draw = function()
	{
		{
			// gfx.DrawRect( pos.x,pos.y,width,height,"#FA0" );
			var toDraw = rImage;
			if( ms.Pos().x < pos.x )
			{
				toDraw = lImage;
			}
			
			gfx.DrawImage( toDraw,pos.x - width / 2,pos.y - height / 2,width,height );
		}
		
		for( var i in bullets )
		{
			bullets[i].Draw();
		}
	}
	
	this.BulletIsTouching = function( x,y,w,h )
	{
		for( var i in bullets )
		{
			const b = bullets[i];
			if( calc.HitTest( b.Pos().x,b.Pos().y,b.Pos().w,b.Pos().h,x,y,w,h ) )
			{
				bullets.splice( i,1 );
				--curBullet;
				return true;
			}
		}
		
		return false;
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