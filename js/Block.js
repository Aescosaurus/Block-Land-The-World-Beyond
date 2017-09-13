class Block
{
	constructor( x_in,y_in )
	{
		var HexCount = function( hexValue )
		{
			hexValue = hexValue.substr( 1 );
			
			var maxNum = 0;
			
			for( var i = 0; i < hexValue.length; ++i )
			{
				if( hexValue.substr( i,1 ) >= 0 )
					maxNum += parseInt( hexValue.substr( i,1 ) );
				else
				{
					if( hexValue.substr( i,1 ) == 'A' )
						maxNum += 10;
					else if( hexValue.substr( i,1 ) == 'B' )
						maxNum += 11;
					else if( hexValue.substr( i,1 ) == 'C' )
						maxNum += 12;
					else if( hexValue.substr( i,1 ) == 'D' )
						maxNum += 13;
					else if( hexValue.substr( i,1 ) == 'E' )
						maxNum += 14;
					else if( hexValue.substr( i,1 ) == 'F' )
						maxNum += 15;
				}
			}
			
			// console.log( maxNum + " " + hexValue );
			
			return maxNum;
		}
		var RandColor = function()
		{
			const hexChars =
			[
				'0','1','2','3','4','5','6','7','8','9',
				'A','B','C','D','E','F'
			];
			
			var finalColor = '#';
			
			do
			{
				finalColor = '#';
				
				for( var i = 0; i < 6; ++i )
					finalColor += hexChars[calc.Random( 0,hexChars.length - 1 )];
			}
			while( HexCount( finalColor ) < 35 );
			
			console.log( HexCount( finalColor ) >= 35 );
			
			return finalColor;
		}
		//
		var x = x_in;
		var y = y_in;
		const WIDTH = 30;
		const HEIGHT = 30;
		const c = RandColor();
		// 
		this.Update = function()
		{
			
		}
		
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,c );
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
	}
}