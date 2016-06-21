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

requirejs(['jquery'], function($) {
	$(document).ready(function() {
		$('#main').hover(
			function() {
				$('#main').html('JQUERY MUXXXIK');
			},
			function() {
				$('#main').html('');
			});
			
		});
	});
