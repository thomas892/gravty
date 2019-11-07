import Physics from "physicsjs";
import bindMenuEvents from "./menu";
import Renderer from "./renderer";
import addInteractions from "./interactions";
import addBehaviors from "./behaviors";
import Settings from "./settings";
import addCollisions from "./collisions";

Physics({sleepDisabled: true}, function(world) {

    world.settings = new Settings();

	let view = new Renderer();
    let renderer = view.getRenderer();
    world.add(renderer);

    addBehaviors(world, renderer);

	bindMenuEvents(world);

    addInteractions(world);

	addCollisions(world);

    world.render();

    Physics.util.ticker.on(function (time) {
        world.step(time);
    });

    Physics.util.ticker.start();
    world.on('step', function() {
        world.render();
    });
});
