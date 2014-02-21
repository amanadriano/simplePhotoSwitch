//simplePhotoSwitch project....
//fades from photo to the next,
//features :
// - wait for next photo to load before removing current pic.
// - jump to first photo after showing the last photo on the list

var SimplePhotoSwitch = function() {
	//init vars
	this.first = true;
	this.labeled = false;
	this.index = 0;
	
	//init func
	this.init = function(options) {
		this.container = $(options.container);
		this.width = options.width;
		this.height = options.height;
		this.dir = options.dir;
		this.photos = options.photos;
		this.labels = options.labels;	//new feature.. set labels for each photo
		this.labelCSS = options.labelCSS;
		this.speedSwitch = options.speedSwitch;
		this.speedFade = options.speedFade;		
		
		this.IMGF = new Image();
		this.IMG = new Image();
		var self = this;
		$(this.IMGF).hide().load(function() {
			$(this).fadeIn(self.speedFade, function() {
					var src = $(this).attr('src');
					$(self.IMG).attr('src', src);
					if (self.labeled) $('div#simpleLabel').fadeIn();
					$(this).hide();					
					setTimeout(function() { self.nextPhoto(); }, self.speedSwitch);
				});
		});
		$(this.IMGF).appendTo(this.container);
		$(this.IMG).appendTo(this.container);
		if (options.labels) {
			this.labeled = true;
			var html = "<div id='simpleLabel' style='" + this.labelCSS + "'></div>";
			$(html).appendTo(this.container);
		}
		
		//set style/appearance of elements
		this.setStyles();
		//start animation
		this.nextPhoto();
	}
	
	this.setStyles = function() {
		var self = this;
		$(this.container).css({
			width : self.width + 'px',
			height : self.height + 'px'			
		});
		
		$(this.IMG).css({
			position : 'absolute',
			'z-index' : '5'
		});
		
		$(this.IMGF).css({
			position: 'absolute',
			'z-index' : '6'
		});

		$('div#simpleLabel').css({'z-index': '7'});
	}
	
	this.nextPhoto = function() {
		if (this.first) { //if this is the first time function is called
			this.first = false;
		}
		//check if current index is over the max photos we have
		if (this.index > this.photos.length - 1) this.index = 0;
		$(this.IMGF).attr("src", this.dir + this.photos[this.index]);
		if (this.labeled) $('div#simpleLabel').html(this.labels[this.index]);
		this.index ++;
	}
	
};
