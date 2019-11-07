import Physics from "physicsjs";

    export function calcImpulse(biggerBody, smallerBody) {
        let i1 = biggerBody.state.vel.mult(biggerBody.mass);
        let i2 = smallerBody.state.vel.mult(smallerBody.mass);
        let addedMasses = biggerBody.mass + smallerBody.mass;
        i1.vadd(i2);
        i1.x = i1.x / addedMasses;
        i1.y = i1.y / addedMasses;
        return i1;
    }


    export function calcNewBody(biggerBody, smallerBody) {
        biggerBody.state.vel = calcImpulse(biggerBody, smallerBody);
        biggerBody.mass += smallerBody.mass;
        biggerBody.radius = Math.cbrt((biggerBody.mass*12000)/(4*Math.PI));
        biggerBody.geometry.radius = Math.cbrt((biggerBody.mass * 12000)/(4*Math.PI));
        biggerBody.view = null;
        biggerBody.recalc();
    }

    export function addCircle(
        pos,
        bodyRadius,
        bMass = ((4/3)*Math.PI*Math.pow(bodyRadius, 3))/4000,
        bVelocity = new Physics.vector({x: 0.00, y: 0.00})) {
        return Physics.body('circle', {
            x: pos.x,
            y: pos.y,
            radius: bodyRadius,
            mass: bMass,
            vx: bVelocity.x,
            vy: bVelocity.y,
            styles: {
                fillStyle: '#FFF880',
                angleIndicator: '#FFF880'
            }
        });
    }
