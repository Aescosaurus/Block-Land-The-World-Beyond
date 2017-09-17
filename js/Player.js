class Player
{
	constructor()
	{
		var x = 100;
		var y = 100;
		var vx = 0;
		const WIDTH = 30;
		const HEIGHT = 30;
		
		const SPEED = 2;
		const MAX_SPEED = 7;
		
		var grav = 0;
		const GRAV_ACC = 0.7;
		var jumping = false;
		var canJump = false;
		const JUMP_POW = 15;
		// 
		this.Update = function()
		{
			if( kbd.KeyDown( 32 ) && ( ( jumping ) || ( !jumping && canJump ) ) )
			{
				jumping = true;
				canJump = false;
			}
			else if( jumping )
				this.Land( -7 );
			
			if( kbd.KeyDown( 65 ) && vx > -MAX_SPEED )
				vx -= SPEED;
			
			if( kbd.KeyDown( 68 ) && vx < MAX_SPEED )
				vx += SPEED;
			
			x += vx;
			vx *= 0.98;
			
			y += grav;
			grav += GRAV_ACC;
			
			if( jumping )
			{
				y -= JUMP_POW;
				
				if( grav > JUMP_POW )
					this.Land();
			}
			
			while( y < 0 )
				++y;
			
			// if( y > gfx.SCREEN_WIDTH )
			// 	location.reload();
		}
		
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#FA0" );
		}
		
		this.Land = function( newGrav = 0 )
		{
			jumping = false;
			grav = newGrav;
		}
		
		this.CanJump = function( cJump )
		{
			canJump = cJump;
		}
		
		this.MovePos = function( xMove,yMove )
		{
			x += xMove;
			y += yMove;
		}
		
		this.Pos = function()
		{
			return {
				x: x,
				y: y,
				w: WIDTH,
				h: HEIGHT
			}
		}
		
		this.HitTest = function( hitDir,objX,objY,objWidth,objHeight )
		{
			const OFFSET = WIDTH / 4;
			
			if( hitDir === "Top" )
			{
				if( x + OFFSET < objX + objWidth && x + WIDTH - OFFSET > objX &&
					y < objY + objHeight && y + OFFSET > objY )
					return true;
				else
					return false;
			}
			else if( hitDir === "Bot" )
			{
				if( x + OFFSET < objX + objWidth && x + WIDTH - OFFSET > objX &&
					y + HEIGHT - OFFSET < objY + objHeight && y + HEIGHT > objY )
					return true;
				else
					return false;
			}
			else if( hitDir === "Left" )
			{
				if( x < objX + objWidth && x + OFFSET > objX &&
					y + OFFSET < objY + objHeight && y + HEIGHT - OFFSET > objY )
					return true;
				else
					return false;
			}
			else if( hitDir === "Right" )
			{
				if( x + WIDTH - OFFSET < objX + objWidth && x + WIDTH > objX &&
					y + OFFSET < objY + objHeight && y + HEIGHT - OFFSET > objY )
					return true;
				else
					return false;
			}
		}
	}
}