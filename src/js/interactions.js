import Physics from "physicsjs";
import { addCircle } from "./add_body";

export default function addInteractions(world) {

    let attraction = Physics.behavior('attractor', {
        order: 0,
        strength: 0.0001
    });

    world.on({
        'interact:poke': function( pos ){
            if(!world.settings.gravityWell) {
                    const circle = addCircle(pos, world.settings.radius);
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
