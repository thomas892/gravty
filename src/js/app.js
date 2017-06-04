import Physics from "physicsjs";
import { calcImpulse, calcNewBody, addCircle } from "./addBody";
import bindMenuEvents from "./menu";
import Renderer from "./renderer";
import Interactions from "./interactions";
import Behaviors from "./behaviors";
import Collisions from "./collisions";
import Settings from "./settings";
import Style from "../style/style.scss";



Physics({sleepDisabled: true}, function(world) {

    world.settings = new Settings();
    console.log(world.settings);

	//init rendering
	let view = new Renderer();
    let renderer = view.getRenderer();
    world.add(renderer);

    //initializing behaviors
	Behaviors(world, renderer);

	//menu
	bindMenuEvents(world);

    //interaction with the world
    Interactions(world);

    //collision detection for merging bodies
	Collisions(world);

    world.render();
    Physics.util.ticker.on(function (time, dt) {
        world.step(time);
    });
    Physics.util.ticker.start();
    world.on('step', function() {
        world.render();
    });
});
