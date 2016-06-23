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





requirejs(['physicsjs', 'jquery'], function(Physics) {
	
	Physics(function(world) {
		var viewportWidth = document.getElementById('viewport').scrollWidth;
		var viewportHeight = document.getElementById('viewport').scrollHeight;
		var bounds = Physics.aabb(0, 0, viewportWidth, viewportHeight);
		
		document.getElementById('viewport').addEventListener('click', addCircle);
		
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
		Physics.behavior('constant-acceleration'),
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
			radius: 10,
			vy: -0.01
			});
			world.add(circle);
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
	

