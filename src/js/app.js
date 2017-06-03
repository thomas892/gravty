import Physics from "physicsjs";
import { calcImpulse, calcNewBody, addCircle } from "./addBody";
import bindMenuEvents from "./menu";
import Renderer from "./renderer";
import Interactions from "./interactions";
import Behaviors from "./behaviors";
import Collisions from "./collisions";
import Style from "../style/style.scss";


Physics({sleepDisabled: true}, function(world) {

    this.gravityWell = false;
    this.bodyRadius = 2;

	//init rendering
	let view = new Renderer();
    let renderer = view.getRenderer();
    world.add(renderer);

	//handling resize
    window.addEventListener('resize', view.resize(world));

    //initializing behaviors
	let behaviors = Behaviors(renderer);
    world.add(behaviors);

	//menu

	bindMenuEvents(world);


    //interaction with the world
    world.on(Interactions(world));

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
