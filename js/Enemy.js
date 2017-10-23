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
	
	const RETARGET_TIME = 100;
	var targetTimer = RETARGET_TIME;
	var rot = 0;
	
	const angryFace = gfx.LoadImage( "Images/Enemies/Enemy.png" );
	const hurtFace = gfx.LoadImage( "Images/Enemies/EnemyHurt.png" );
	// 
	this.Update = function()
	{
		++targetTimer;
		if( targetTimer > RETARGET_TIME )
		{
			targetTimer = 0;
			rot = calc.FindAngle( pos.x,pos.y,pl.Pos().x,pl.Pos().y );
		}
		pos.x += SPD * Math.cos( rot * ( Math.PI / 180 ) );
		pos.y += SPD * Math.sin( rot * ( Math.PI / 180 ) );
		
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