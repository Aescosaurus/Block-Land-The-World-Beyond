class Enemy
{
constructor()
{
	var pos = { x: 50,y: 50 };
	const SIZE = 60;
	const SPD = 2;
	
	const HP_MAX = 10;
	var hp = HP_MAX;
	
	const HURT_TIME = 5;
	var hurtTimer = HURT_TIME;
	
	const RETARGET_TIME = calc.Random( 50,110 );
	var targetTimer = 0;
	var rot = 0;
	var startTimer = 100;
	
	const minDistFromPlayer = 200;
	
	const angryFace = gfx.LoadImage( "Images/Enemies/Enemy.png" );
	const hurtFace = gfx.LoadImage( "Images/Enemies/EnemyHurt.png" );
	// 
	this.Init = function()
	{
		do
		{
			pos.x = calc.Random( 0 + SIZE,gfx.SCREEN_WIDTH - SIZE );
			pos.y = calc.Random( 0 + SIZE,gfx.SCREEN_HEIGHT - SIZE );
		}
		while( calc.FindDist( pos.x,pos.y,pl.Pos().x,pl.Pos().y ) < minDistFromPlayer );
		console.log( calc.FindDist( pos.x,pos.y,pl.Pos().x,pl.Pos().y ) );
	}
	
	this.Update = function()
	{
		--startTimer;
		++targetTimer;
		if( targetTimer > RETARGET_TIME )
		{
			targetTimer = 0;
			rot = calc.FindAngle( pos.x,pos.y,pl.Pos().x,pl.Pos().y );
		}
		
		if( startTimer == 0 )
		{
			pos.x += SPD * Math.cos( rot * ( Math.PI / 180 ) );
			pos.y += SPD * Math.sin( rot * ( Math.PI / 180 ) );
			startTimer = 0 + 1;
		}
		
		if( hurtTimer <= HURT_TIME )
		{
			++hurtTimer;
		}
	}
	
	this.Draw = function()
	{
		if( hurtTimer < HURT_TIME )
		{
			const offset = 5;
			gfx.DrawImage( hurtFace,pos.x - offset / 2,pos.y - offset / 2,SIZE + offset,SIZE + offset );
		}
		else
		{
			gfx.DrawImage( angryFace,pos.x,pos.y,SIZE,SIZE );
		}
	}
	
	this.ReverseMomentum = function( x,y )
	{
		const xDiff = pos.x - x;
		const yDiff = pos.y - y;
		if( xDiff > 0 )
		{
			pos.x += SPD;
		}
		else if( xDiff < 0 )
		{
			pos.x -= SPD;
		}
		
		if( yDiff > 0 )
		{
			pos.y += SPD;
		}
		else if( yDiff < 0 )
		{
			pos.y -= SPD;
		}
	}
	
	this.Hurt = function( amount )
	{
		hp -= amount;
		hurtTimer = 0;
	}
	
	this.Alive = function()
	{
		return( hp > 0 );
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