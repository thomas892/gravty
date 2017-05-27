import Physics from "physicsjs";
import { addCircle, calcImpulse, calcNewBody } from "./addBody";

export default function Collisions(world) {
    world.on('collisions-body:detected', (data) => {
		for(var i = 0; i < data.collisions.length; i++) {
	        let c = data.collisions[i];

	        console.log("overlap: "+c.overlap);
	        if ((c.overlap > c.bodyA.radius/4) || (c.overlap > c.bodyB.radius/4)){
	            if(c.bodyA.mass >= c.bodyB.mass) {
	                console.log("In MassCheck A mass: " + c.bodyA.mass+ "B mass: "+ c.bodyB.mass);
	                console.log(data.collisions[i]);

	                calcNewBody(world, c.bodyA, c.bodyB);
	            } else {
	                calcNewBody(world, c.bodyB, c.bodyA);
	            };
	        }
	    }
	});
}
