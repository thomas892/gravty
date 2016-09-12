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
var bodyRadius = 2;
var gravityWell = false;

	function actionSelector(actionB) {
			switch(actionB) {
				case 'gravityWell':
				gravityWell = true;
				break;
				case 'small':
				bodyRadius = 2;
				gravityWell = false;
				break;
				case 'medium':
				bodyRadius = 4;
				gravityWell = false;
				break;
				case 'large':
				bodyRadius = 6;
				gravityWell = false;
				break;
				case 'huge':
				bodyRadius = 8;
				gravityWell = false;
				break;

			};
		};


requirejs(['physicsjs', 'jquery'], function(Physics) {

	Physics({sleepDisabled: true}, function(world) {
		var viewportWidth = document.getElementById('viewport').scrollWidth;
		var viewportHeight = document.getElementById('viewport').scrollHeight;
		var bounds = Physics.aabb(0, 0, viewportWidth, viewportHeight);
		var edgeBounce = Physics.behavior('edge-collision-detection', {aabb: bounds, restitution: 1, channel:'collisions-edge:detected'});

		//document.getElementById('viewport').addEventListener('click', addCircle);
		document.getElementById('pauseButton').addEventListener('click', pauseGame);
		document.getElementById('resetButton').addEventListener('click', resetWorld);





		var renderer = Physics.renderer('canvas', {
			el: 'viewport',
			width: viewportWidth,
			height: viewportHeight
		});


		window.addEventListener('resize', function() {
			viewportWidth = document.getElementById('viewport').scrollWidth;
			viewportHeight = document.getElementById('viewport').scrollHeight;
			renderer.el.width = viewportWidth;
			renderer.el.height = viewportHeight;

			bounds = Physics.aabb(0, 0, viewportWidth, viewportHeight);
			edgeBounce.setAABB(bounds);
		});

		world.add(renderer);

		world.add([
			Physics.behavior('newtonian'),
			edgeBounce,
			Physics.behavior('body-impulse-response', {
				check: 'collisions-edge:detected'
			}),
			Physics.behavior('body-collision-detection', {
				channel: 'collisions-body:detected'
			}),
			Physics.behavior('sweep-prune'),
			Physics.behavior('interactive', {el: renderer.container})
		]);

		var attractor = Physics.behavior('attractor', {
        order: 0,
        strength: 0.001
		});
		world.on({
			'interact:poke': function( pos ){
				if(!gravityWell) {
					var circle = addCircle(pos, bodyRadius);
					console.log("mass:"+circle.mass );
					world.add(circle);
				} else {
					world.wakeUpAll();
					attractor.position( pos );
					world.add( attractor );
				};
			}
			,'interact:move': function( pos ){
				attractor.position( pos );
			}
			,'interact:release': function(){
				world.wakeUpAll();
				world.remove( attractor );
			}
		});

		world.on('collisions-body:detected', function(data) {		//collision detection for merging bodies


			function calcImpulse(biggerBody, smallerBody) {
				console.log("Initial velocities: Big:"+biggerBody.state.old.vel+" Small:"+smallerBody.state.old.vel + "/n");
				console.log("In calcImpulse : Initial masses: Big: " + biggerBody.mass + " small: "+ smallerBody.mass+" /n");
				var i1 = biggerBody.state.vel.mult(biggerBody.mass);
				var i2 = smallerBody.state.vel.mult(smallerBody.mass);
				var addedMasses = biggerBody.mass + smallerBody.mass;
				console.log("impulse1: "+ i1 + "impulse2:" + i2 + "Added masses: "+ addedMasses);
				i1.vadd(i2);
				i1.x = i1.x / addedMasses;
				i1.y = i1.y / addedMasses;
				console.log("Final impulse: " + i1);

				return i1;
			}


			function calcNewBody(biggerBody, smallerBody) {
				biggerBody.state.vel = calcImpulse(biggerBody, smallerBody);
				console.log("in calcNewBody 1 :" + biggerBody.mass);
				biggerBody.mass += smallerBody.mass;
				console.log("in calcNewBody 2 :" + biggerBody.mass);
				biggerBody.radius = Math.cbrt((biggerBody.mass*12000)/(4*Math.PI));
				biggerBody.geometry.radius = Math.cbrt((biggerBody.mass*12000)/(4*Math.PI));
				biggerBody.view = null;
				biggerBody.recalc();
				world.remove(smallerBody);
			};


			for(var i = 0; i < data.collisions.length; i++) {
				c = data.collisions[i];

				console.log("overlap: "+c.overlap);
				if ((c.overlap > c.bodyA.radius/4) || (c.overlap > c.bodyB.radius/4)){
					if(c.bodyA.mass >= c.bodyB.mass) {
						console.log("In MassCheck A mass: " + c.bodyA.mass+ "B mass: "+ c.bodyB.mass);
						console.log(data.collisions[i]);

						calcNewBody(c.bodyA, c.bodyB);
					} else {
						calcNewBody(c.bodyB, c.bodyA);
					};
				}


			}
		});


		function addCircle(pos,
		bRadius,
		bMass = ((4/3)*Math.PI*Math.pow(bodyRadius, 3))/4000,
		bVelocity = new Physics.vector({x: 0.00, y: 0.00}))
		{
			var xPos = pos.x;
			var yPos = pos.y;
			var circle = Physics.body('circle', {
			x: xPos,
			y: yPos,
			radius: bRadius,
			mass: bMass,
			vx: bVelocity.x,
			vy: bVelocity.y,
			styles: {
				fillStyle: '#FFF880',
				angleIndicator: '#FFF880'
			}
			});
			//console.log("vel:"+ circle.state.vel);
			return circle;

		}

		function resetWorld() {
			var circles = [];
			circles = world.getBodies();
			world.remove(circles);
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
