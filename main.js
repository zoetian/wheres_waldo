"use strict";
(function(){
	var global = {};
	class Level {
		constructor(url,waldoX,waldoY,waldoR,aura) {
			this.ready = false;
			this.image = new Image();
			var theThis = this;
			this.image.addEventListener("load",
			function() {
				theThis.ready = true;
				if(typeof(theThis.callback) === "function")
					theThis.callback();
			});
			this.image.src = url;
			this.width = this.image.width;
			this.height = this.image.height;
			this.x = 0;
			this.y = 0;
			this.aura = aura || 1;
			this.waldoRPx = waldoR;
			this.waldoXPx = waldoX;
			this.waldoYPx = waldoY;
		}
	}

	function scale() {
		if(global.level.image.width / self.innerWidth < global.level.image.height / self.innerHeight) {
			global.level.height = self.innerHeight;
			global.level.width = global.level.image.width / global.level.image.height * global.level.height;
			global.level.x = (self.innerWidth - global.level.width) / 2;
			global.level.y = 0;
		} else {
			global.level.width = self.innerWidth;
			global.level.height = global.level.image.height / global.level.image.width * global.level.width;
			global.level.x = 0;
			global.level.y = (self.innerHeight - global.level.height) / 2;
		}
		global.level.aura *= global.level.width * global.level.height / 20000;

		global.level.waldoX = global.level.x + global.level.waldoXPx / global.level.image.width * global.level.width;
		global.level.waldoY = global.level.y + global.level.waldoYPx / global.level.image.height * global.level.height;
		global.level.waldoR = global.level.waldoRPx / global.level.image.width * self.innerWidth;

		global.main.width = self.innerWidth;
		global.main.height = self.innerHeight;
		global.drawable.fillStyle = "#000";
		global.drawable.fillRect(0,0,self.innerWidth,self.innerHeight);

		global.rgradient.width = global.level.aura * 2 + 3;
		global.rgradient.height = global.rgradient.width;
		var c = global.rgradient.getContext("2d");
		c.fillStyle = c.createRadialGradient(global.level.aura,global.level.aura,global.level.aura,global.level.aura,global.level.aura,global.level.aura / 2);
		c.fillStyle.addColorStop(1,'rgba(0,0,0,0)');
		c.fillStyle.addColorStop(0,'rgba(0,0,0,1)');
		c.fillRect(0,0,global.rgradient.width,global.rgradient.height);

		global.lgradient.width = self.innerWidth;
		global.lgradient.height = self.innerHeight;

		var gwidth = global.level.image.width * 0.05;
		c = global.lgradient.getContext("2d");

		c.fillStyle = c.createLinearGradient(global.level.x,0,global.level.x+gwidth,0);
		c.fillStyle.addColorStop(0,"rgba(0,0,0,1)");
		c.fillStyle.addColorStop(1,"rgba(0,0,0,0)");
		c.fillRect(global.level.x-1,global.level.y,gwidth,global.level.height);

		c.fillStyle = c.createLinearGradient(global.level.x+global.level.width-gwidth,0,global.level.x+global.level.width,0);
		c.fillStyle.addColorStop(0,"rgba(0,0,0,0)");
		c.fillStyle.addColorStop(1,"rgba(0,0,0,1)");
		c.fillRect(global.level.x+global.level.width-gwidth+1,global.level.y,gwidth,global.level.height);

		c.fillStyle = c.createLinearGradient(0,global.level.y,0,global.level.y+gwidth);
		c.fillStyle.addColorStop(0,"rgba(0,0,0,1)");
		c.fillStyle.addColorStop(1,"rgba(0,0,0,0)");
		c.fillRect(global.level.x,global.level.y-1,global.level.width,global.level.y+gwidth);

		c.fillStyle = c.createLinearGradient(0,global.level.y+global.level.height-gwidth,0,global.level.y+global.level.height);
		c.fillStyle.addColorStop(1,"rgba(0,0,0,1)");
		c.fillStyle.addColorStop(0,"rgba(0,0,0,0)");
		c.fillRect(global.level.x,global.level.y+global.level.height-gwidth+1,global.level.width,gwidth);
	}

	function redraw(e) {
		global.drawable.fillStyle = "#000";
		global.drawable.fillRect(0,0,self.innerWidth,self.innerHeight);
		global.drawable.save();
		global.drawable.beginPath();
		global.drawable.moveTo(e.clientX-global.level.aura,e.clientY);
		global.drawable.lineWidth = 1;
		global.drawable.arcTo(e.clientX,e.clientY + Math.PI * 21 * global.level.aura,e.clientX+global.level.aura,e.clientY,global.level.aura);
		global.drawable.arcTo(e.clientX,e.clientY - Math.PI * 21 * global.level.aura,e.clientX-global.level.aura,e.clientY,global.level.aura);
		global.drawable.closePath();
		global.drawable.clip();
		global.drawable.drawImage(global.level.image,global.level.x,global.level.y,global.level.width,global.level.height);
		global.drawable.restore();
		global.drawable.drawImage(global.rgradient,e.clientX - global.level.aura - 1,e.clientY - global.level.aura);

		global.drawable.drawImage(global.lgradient,0,0,self.innerWidth,self.innerHeight);

		global.mouseX = e.clientX;
		global.mouseY = e.clientY;
	}

	function begin() {
		scale();
		window.addEventListener("resize",scale);
		window.addEventListener("mousemove",redraw);
		window.addEventListener("dblclick",clickHandler);
	}
	var pageLoadTime = Date.now();
	var instructionDelay = 2000;
	function beginAfterInstructionDelay() {
		var remaining = instructionDelay - (Date.now() - pageLoadTime);
		if(remaining > 0)
			setTimeout(begin,remaining);
		else
			begin();
	}
	(function() {
		var aura_modifier = 2;
		global.levels =
		[
			new Level("https://raw.githubusercontent.com/zoetian/wheres_waldo/gh-pages/media/level0.jpg",1738,431,28,aura_modifier),
			new Level("https://raw.githubusercontent.com/zoetian/wheres_waldo/gh-pages/media/level1.jpg",1148,1152,28,aura_modifier),
			new Level("https://raw.githubusercontent.com/zoetian/wheres_waldo/gh-pages/media/level2.jpg",1015,1153,29,aura_modifier),
			new Level("https://raw.githubusercontent.com/zoetian/wheres_waldo/gh-pages/media/level3.jpg",314,1707,25,aura_modifier)
		];
		global.levelI = 0;
		global.level = global.levels[global.levelI];
		global.rgradient = document.createElement("canvas");
		global.lgradient = document.createElement("canvas");
		global.main = document.createElement("canvas");
		global.main.height = self.innerHeight;
		global.main.width = self.innerWidth;
		global.main.style.top = 0;
		global.main.style.left = 0;
		global.main.style.position = "fixed";
		global.main.style.cursor = "crosshair";

		window.addEventListener("load",
		function() {
			document.body.appendChild(global.main);
			global.drawable = global.main.getContext("2d");

			global.level.callback = beginAfterInstructionDelay;
			if(global.level.ready)
				global.level.callback();
		}
		);

		global.screen_width = self.innerWidth;
		global.screen_height = self.innerHeight;
	})();
	window.addEventListener("contextmenu",function(e){e.preventDefault()});

	function clickHandler(e) {
		var diffX = e.clientX - global.level.waldoX;
		var diffY = e.clientY - global.level.waldoY;
		if(Math.sqrt(diffX * diffX + diffY * diffY) <= global.level.waldoR) {
			window.removeEventListener("resize",scale);
			window.removeEventListener("mousemove",redraw);
			window.removeEventListener("dblclick",clickHandler);

			global.drawable.fillStyle = "#FFEC8B";
			global.drawable.fillRect(0,0,self.innerWidth,self.innerHeight);
			alert("You find the Waldo! You can now continue the level " + ((global.levelI+=1)+1));

			global.level = global.levels[global.levelI];
			global.level.callback = begin;
			if(global.level.ready)
				global.level.callback();

			global.drawable.fillStyle = "#000";
			global.drawable.fillRect(0,0,self.innerWidth,self.innerHeight);
		} else {
			global.drawable.fillStyle = "#B0E2FF";
			global.drawable.fillRect(0,0,self.innerWidth,self.innerHeight);
			alert("Really?! That's your Waldo!");
			global.drawable.fillStyle = "#000";
			global.drawable.fillRect(0,0,self.innerWidth,self.innerHeight);
		}
	}
})();
