require.config({
	baseUrl: 'libs/',
	packages: [
		{
		name: 'physicsjs',
		location: 'PhysicsJS/dist',
		main: 'physicsjs-full.min.js'
		}
	]
});

var paused = false;
var bodyRadius = 1;







requirejs(['physicsjs', 'jquery'], function(Physics) {
	
	Physics(function(world) {
		var viewportWidth = document.getElementById('viewport').scrollWidth;
		var viewportHeight = document.getElementById('viewport').scrollHeight;
		var bounds = Physics.aabb(0, 0, viewportWidth, viewportHeight);
		
		document.getElementById('small').addEventListener('click', function() {bodyRadius = 10;});
		document.getElementById('medium').addEventListener('click', function() {bodyRadius = 15;});
		document.getElementById('large').addEventListener('click', function() {bodyRadius = 20;});
		document.getElementById('huge').addEventListener('click', function() {bodyRadius = 30;});
		document.getElementById('viewport').addEventListener('click', addCircle);
		document.getElementById('pauseButton').addEventListener('click', pauseGame);
		
		
		
		var renderer = Physics.renderer('canvas', {
			el: 'viewport', 
			width: viewportWidth, 
			height: viewportHeight
		});
		world.add(renderer);
		
		
		/*var circle = Physics.body('circle', {
			x: 250,
			y: 3,
			radius: 3,
			vy: -0.01
		});*/
		world.add([ 
		Physics.behavior('newtonian'),
		Physics.behavior('edge-collision-detection', {aabb: bounds, restitution: 1}), 
		Physics.behavior('body-impulse-response'),
		Physics.behavior('body-collision-detection'),
		Physics.behavior('sweep-prune')
		]);
		
		
		function addCircle(e) {
			var xPos = e.pageX - $('#viewport').offset().left;
			var yPos = e.pageY - $('#viewport').offset().top;
			var circle = Physics.body('circle', {
			x: xPos,
			y: yPos,
			radius: bodyRadius,
			vx: 0.01,
			styles: {
				fillStyle: '#FFF880',
				angleIndicator: '#FFF880'
			}
			});
			world.add(circle);
		}
		
		function pauseGame() {
			if(!paused) {
				world.pause();
				paused = true;
			}
			else {
				world.unpause();
				paused = false;
			}
		}
		
		
		world.render();
		Physics.util.ticker.on(function (time, dt) {
			world.step(time);
		});
		Physics.util.ticker.start();
		world.on('step', function() {
			world.render();
		});
	});

});
	

