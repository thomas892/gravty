import Physics from "physicsjs";
import Settings from "./settings";
import { addCircle } from "./addBody";

export default function Interactions(world) {

    let attraction = Physics.behavior('attractor', {
        order: 0,
        strength: 0.001
    });

    let interaction =
    world.add(interaction);

    world.on({
        'interact:poke': function( pos ){
            if(!world.settings.gravityWell) {
                    var circle = addCircle(pos, world.settings.radius);
                    world.add(circle);
            } else {
                attraction.position( pos );
                world.add(attraction);
            }
        },
        'interact:move': function( pos ){
            attraction.position( pos );
        },
        'interact:release': function(){
            world.remove( attraction );
        }
    })
}
