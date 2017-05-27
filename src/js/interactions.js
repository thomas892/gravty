import Physics from "physicsjs";
import Settings from "./settings";
import { addCircle } from "./addBody";

export default function Interactions(world) {

    let attraction = Physics.behavior('attractor', {
        order: 0,
        strength: 0.001
    });

    return {
        'interact:poke': function( pos ){
            if(!world.gravityWell) {
                console.log(world.gravityWell);
                var circle = addCircle(pos, world.bodyRadius);
                console.log("mass:"+circle.mass );
                world.add(circle);

            } else {
                world.wakeUpAll();
                console.log(world.gravityWell);
                attraction.position( pos );
                world.add(attraction);
            }
        },
        'interact:move': function( pos ){
            attraction.position( pos );
        },
        'interact:release': function(){
            world.wakeUpAll();
            world.remove( attraction );
        }
    }
}
