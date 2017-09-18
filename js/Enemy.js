class Enemy
{
	constructor()
	{
		var x = 9999;
		var y = 9999;
		const WIDTH  = 30;
		const HEIGHT = 30;
		
		var vx = 0;
		var vy = 0;
		const SPEED = 0.7;
		const MAX_SPEED = 8;
		
		const MOVE_UPDATE_MAX = 20;
		var moveUpdateTimer = 0;
		
		var targetX = pl.Pos().x;
		var targetY = pl.Pos().y;
		//
		this.Update = function()
		{
			x += vx;
			y += vy;
			
			if( moveUpdateTimer > MOVE_UPDATE_MAX )
			{
				moveUpdateTimer = 0;
				
				targetX = pl.Pos().x;
				targetY = pl.Pos().y;
			}
			else
				++moveUpdateTimer;
			
			if( targetX > x )
				vx += SPEED;
			else
				vx -= SPEED;
			
			if( targetY > y )
				vy += SPEED;
			else
				vy -= SPEED;
			
			// Keep this guy at a reasonable speed.
			if( vx > MAX_SPEED )
				vx = MAX_SPEED;
			
			if( vx < -MAX_SPEED )
				vx = -MAX_SPEED;
			
			if( vy > MAX_SPEED )
				vy = MAX_SPEED;
			
			if( vy < -MAX_SPEED )
				vy = -MAX_SPEED;
		}
		
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#F00" );
		}
		
		this.MovePos = function( xMove,yMove )
		{
			x += xMove;
			y += yMove;
		}
		
		this.SetRandPos = function()
		{
			const xMin = -200;
			const yMin = 0;
			
			const xMax = 0 - WIDTH;
			const yMax = gfx.SCREEN_HEIGHT - HEIGHT;
			
			x = calc.Random( xMin,xMax );
			y = calc.Random( yMin,yMax );
		}
	}
}