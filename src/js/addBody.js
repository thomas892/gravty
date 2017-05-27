import Physics from "physicsjs";

    export function calcImpulse(biggerBody, smallerBody) {
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


    export function calcNewBody(world, biggerBody, smallerBody) {
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

    export function addCircle(pos,
    bodyRadius,
    bMass = ((4/3)*Math.PI*Math.pow(bodyRadius, 3))/4000,
    bVelocity = new Physics.vector({x: 0.00, y: 0.00}))
    {
        var xPos = pos.x;
        var yPos = pos.y;
        var circle = Physics.body('circle', {
        x: xPos,
        y: yPos,
        radius: bodyRadius,
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
