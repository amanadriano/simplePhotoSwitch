//simplePhotoSwitch project....
//fades from photo to the next,
//features :
// - wait for next photo to load before removing current pic.
// - jump to first photo after showing the last photo on the list

var SimplePhotoSwitch = function() {
	//init vars
	this.first = true;
	this.index = 0;
	
	//init func
	this.init = function(options) {
		this.container = $(options.container);
		this.width = options.width;
		this.height = options.height;
		this.dir = options.dir;
		this.photos = options.photos;
		this.speedSwitch = options.speedSwitch;
		this.speedFade = options.speedFade;
		
		this.IMGF = new Image();
		this.IMG = new Image();
		var self = this;
		$(this.IMGF).hide().load(function() {
			$(this).fadeIn(self.speedFade, function() {
					var src = $(this).attr('src');
					$(self.IMG).attr('src', src);
					$(this).hide();					
					setTimeout(function() { self.nextPhoto(); }, self.speedSwitch);
				});
		});
		$(this.IMGF).appendTo(this.container);
		$(this.IMG).appendTo(this.container);
		
		//set style/appearance of elements
		this.setStyles();
		//start animation
		this.nextPhoto();
	}
	
	this.setStyles = function() {
		var self = this;
		var offX = (self.width / 2) * -1;
		var offY = (self.height /2 ) * -1;
		$(this.container).css({
			width : self.width + 'px',
			height : self.height + 'px',
			left : '50%', top : '50%',
			marginTop : offX + 'px', marginLeft : offY + 'px',
			border : '1px solid #cccccc',
			padding : '5px',
			position : 'absolute'
		});
		
		$(this.IMG).css({
			position : 'absolute',
			'z-index' : '5'
		});
		
		$(this.IMGF).css({
			position: 'absolute',
			'z-index' : '6'
		});
	}
	
	this.nextPhoto = function() {
		if (this.first) { //if this is the first time function is called
			this.first = false;
		}
		//check if current index is over the max photos we have
		if (this.index > this.photos.length - 1) this.index = 0;
		$(this.IMGF).attr("src", this.dir + this.photos[this.index]);
		this.index ++;
	}
	
};
