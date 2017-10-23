class Graphics
{
	constructor()
	{
		this.canvas = document.getElementById( "gc" );
		this.context = this.canvas.getContext( "2d" );
		
		var images = [];
		var curImage = 0;
		//
		this.Init = function( width,height )
		{
			this.SCREEN_WIDTH  = this.canvas.width;
			this.SCREEN_HEIGHT = this.canvas.height;
		}
		
		this.LoadImage = function( source )
		{
			const nowImage = curImage;
			++curImage;
			
			images[nowImage] = new Image();
			images[nowImage].src = source;
			
			return nowImage;
		}
		
		this.DrawImage = function( id,x = 0,y = 0,width = 9999.8756481,height = 9999.8756481 )
		{
			var drawWidth = images[id].width;
			var drawHeight = images[id].height;
			
			if( width != 9999.8756481 )
			{
				drawWidth = width;
			}
			if( height != 9999.8756481 )
			{
				drawHeight = height;
			}
			
			this.context.drawImage( images[id],x,y,drawWidth,drawHeight );
		}
		
		this.DrawLine = function( x0,y0,x1,y1,size,color )
		{
			this.context.strokeStyle = color;
			
			this.context.beginPath();
			
			this.context.moveTo( x0,y0 );
			this.context.lineTo( x1,y1 );
			
			this.context.lineWidth = size;
			this.context.stroke();
		}
		
		this.DrawCircle = function( x,y,size,color )
		{
			this.context.fillStyle = color;
			
			this.context.beginPath();
			this.context.arc( x,y,size,0,2 * Math.PI );
			this.context.fill();
		}
		
		this.DrawRect = function( x,y,width,height,color )
		{
			this.context.fillStyle = color;
			this.context.fillRect( x,y,width,height );
		}
		
		this.DrawText = function( x,y,message,color )
		{
			this.context.fillStyle = color;
			this.context.fillText( message,x,y );
		}
		
		this.Alpha = function( alpha )
		{
			this.context.globalAlpha = alpha;
		}
		
		this.SetSmoothing = function( willSmooth )
		{
			this.context.imageSmoothingEnabled       = willSmooth;
			this.context.webkitImageSmoothingEnabled = willSmooth;
			this.context.mozImageSmoothingEnabled    = willSmooth;
		}
	}
}