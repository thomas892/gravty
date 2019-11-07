import { calcNewBody } from "./add_body";

export default function addCollisions(world) {
    world.on('collisions-body:detected', (data) => {
		for(let i = 0; i < data.collisions.length; i++) {
	        let c = data.collisions[i];
	        if ((c.overlap > c.bodyA.radius / 4) || (c.overlap > c.bodyB.radius / 4)){
	            if(c.bodyA.mass >= c.bodyB.mass) {
	                calcNewBody(c.bodyA, c.bodyB);
					world.remove(c.bodyB);
	            } else {
	                calcNewBody(c.bodyB, c.bodyA);
					world.remove(c.bodyA);
	            }
	        }
	    }
	});
}
