/******/ (function(modules) { // webpackBootstrap
/******/     // The module cache
/******/     var installedModules = {};
/******/
/******/     // The require function
/******/     function __webpack_require__(moduleId) {
/******/
/******/         // Check if module is in cache
/******/         if(installedModules[moduleId]) {
/******/             return installedModules[moduleId].exports;
/******/         }
/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             i: moduleId,
/******/             l: false,
/******/             exports: {}
/******/         };
/******/
/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/         // Flag the module as loaded
/******/         module.l = true;
/******/
/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }
/******/
/******/
/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;
/******/
/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;
/******/
/******/     // identity function for calling harmony imports with the correct context
/******/     __webpack_require__.i = function(value) { return value; };
/******/
/******/     // define getter function for harmony exports
/******/     __webpack_require__.d = function(exports, name, getter) {
/******/         if(!__webpack_require__.o(exports, name)) {
/******/             Object.defineProperty(exports, name, {
/******/                 configurable: false,
/******/                 enumerable: true,
/******/                 get: getter
/******/             });
/******/         }
/******/     };
/******/
/******/     // getDefaultExport function for compatibility with non-harmony modules
/******/     __webpack_require__.n = function(module) {
/******/         var getter = module && module.__esModule ?
/******/             function getDefault() { return module['default']; } :
/******/             function getModuleExports() { return module; };
/******/         __webpack_require__.d(getter, 'a', getter);
/******/         return getter;
/******/     };
/******/
/******/     // Object.prototype.hasOwnProperty.call
/******/     __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/     // __webpack_public_path__
/******/     __webpack_require__.p = "";
/******/
/******/     // Load entry module and return exports
/******/     return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * PhysicsJS v0.7.0 - 2014-12-08
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2014 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */

// ---
// inside: src/intro.js

(function (root, factory) {
    if (true) {
        // Node.
        module.exports = factory.call(root);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function(){ return factory.call(root) });
    } else {
        // Browser globals (root is window)
        root.Physics = factory.call(root);
    }
}(typeof window !== 'undefined' ? window : this, function () {

'use strict';

var window = this;
var document = window.document;

/** related to: Physics.world
 * Physics
 *
 * The top-level namespace. All of PhysicsJS is contained in
 * the `Physics` namespace.
 *
 * It may (and should) be invoked as a function to create a world instance. For all intensive purposes, [[Physics]] and [[Physics.world]] are the same thing.
 *
 * See [[new Physics.world]] for config options and function signature.
 *
 * Example:
 *
 * ```javascript
 * Physics( cfg, function( world ) {
 *     // use world
 * }); // -> world
 * ```
 **/
var Physics = function Physics(){

    return Physics.world.apply(Physics, arguments);
};

/**
 * Physics.util
 *
 * Namespace for utility functions.
 **/
Physics.util = {};

/**
 * == Special ==
 *
 * This section contains miscellaneous functionality.
 **/


// ---
// inside: src/math/aabb.js

(function(){

    /**
     * Physics.aabb( minX, minY, maxX, maxY ) -> Object
     * Physics.aabb( pt1, pt2 ) -> Object
     * Physics.aabb( width, height[, pt] ) -> Object
     * - minX (Number): The x coord of the "top left" point
     * - minY (Number): The y coord of the "top left" point
     * - maxX (Number): The x coord of the "bottom right" point
     * - maxY (Number): The y coord of the "bottom right" point
     * - pt1 (Vectorish): The first corner
     * - pt2 (Vectorish): The opposite corner
     * - width (Number): The width of the bounding box
     * - height (Number): The height of the bounding box
     * - pt (Vectorish): The center point of the bounding box
     *
     * Create an Axis Aligned Bounding Box.
     *
     * Signature:
     *
     * ```javascript
     * {
     *     x: Number, // the x coord of the center point
     *     y: Number, // the y coord of the center point
     *     hw: Number, // the half-width
     *     hh: Number, // the half-height
     * }
     * ```
     **/
    Physics.aabb = function( minX, minY, maxX, maxY ){

        var aabb = { x: 0, y: 0, hw: 0, hh: 0 };

        if ( minX === undefined ){
            return aabb;
        }

        if ( minX && minX.x !== undefined ){
            // we have a point specified as first arg
            maxX = minY.x;
            maxY = minY.y;
            minY = minX.y;
            minX = minX.x;
        }

        if ( maxY === undefined && minX !== undefined && minY !== undefined ){

            aabb.hw = minX * 0.5;
            aabb.hh = minY * 0.5;

            if ( maxX && maxX.x !== undefined ){
                // we have a point specified as the third arg
                // so we assume it's the center point
                aabb.x = maxX.x;
                aabb.y = maxX.y;
            }

            return aabb;
        }

        // here, we should have all the arguments as numbers
        aabb.hw = Math.abs(maxX - minX) * 0.5;
        aabb.hh = Math.abs(maxY - minY) * 0.5;
        aabb.x = (maxX + minX) * 0.5;
        aabb.y = (maxY + minY) * 0.5;

        return aabb;
    };

    /**
     * Physics.aabb.contains( aabb, pt ) -> Boolean
     * - aabb (Object): The aabb
     * - pt (Vectorish): The point
     * + (Boolean): `true` if `pt` is inside `aabb`, `false` otherwise
     *
     * Check if a point is inside an aabb.
     **/
    Physics.aabb.contains = function contains( aabb, pt ){

        return  (pt.x > (aabb.x - aabb.hw)) &&
                (pt.x < (aabb.x + aabb.hw)) &&
                (pt.y > (aabb.y - aabb.hh)) &&
                (pt.y < (aabb.y + aabb.hh));
    };

    /**
     * Physics.aabb.clone( aabb ) -> Object
     * - aabb (Object): The aabb to clone
     * + (Object): The clone
     *
     * Clone an aabb.
     **/
    Physics.aabb.clone = function( aabb ){
        return {
            x: aabb.x,
            y: aabb.y,
            hw: aabb.hw,
            hh: aabb.hh
        };
    };

    /**
     * Physics.aabb.union( aabb1, aabb2[, modify] ) -> Object
     * - aabb1 (Object): The first aabb (returned if modify is `true`)
     * - aabb2 (Object): The second aabb
     * + (Object): The union of two aabbs. If modify is `true`, then the first aabb will be modified and returned.
     *
     * Get the union of two aabbs.
     **/
    Physics.aabb.union = function( aabb1, aabb2, modify ){

        var ret = modify === true ? aabb1 : {}
            ,maxX = Math.max( aabb1.x + aabb1.hw, aabb2.x + aabb2.hw )
            ,maxY = Math.max( aabb1.y + aabb1.hh, aabb2.y + aabb2.hh )
            ,minX = Math.min( aabb1.x - aabb1.hw, aabb2.x - aabb2.hw )
            ,minY = Math.min( aabb1.y - aabb1.hh, aabb2.y - aabb2.hh )
            ;

        ret.hw = Math.abs(maxX - minX) * 0.5;
        ret.hh = Math.abs(maxY - minY) * 0.5;
        ret.x = (maxX + minX) * 0.5;
        ret.y = (maxY + minY) * 0.5;

        return ret;
    };


    /**
     * Physics.aabb.overlap( aabb1, aabb2 ) -> Boolean
     * - aabb1 (Object): The first aabb
     * - aabb2 (Object): The second aabb
     * + (Boolean): `true` if they overlap, `false` otherwise
     *
     * Check if two AABBs overlap.
     **/
    Physics.aabb.overlap = function( aabb1, aabb2 ){

        var min1 = aabb1.x - aabb1.hw
            ,min2 = aabb2.x - aabb2.hw
            ,max1 = aabb1.x + aabb1.hw
            ,max2 = aabb2.x + aabb2.hw
            ;

        // first check x-axis

        if ( (min2 <= max1 && max1 <= max2) || (min1 <= max2 && max2 <= max1) ){
            // overlap in x-axis
            // check y...
            min1 = aabb1.y - aabb1.hh;
            min2 = aabb2.y - aabb2.hh;
            max1 = aabb1.y + aabb1.hh;
            max2 = aabb2.y + aabb2.hh;

            return (min2 <= max1 && max1 <= max2) || (min1 <= max2 && max2 <= max1);
        }

        // they don't overlap
        return false;
    };

}());


// ---
// inside: src/math/gjk.js

(function(){

    // the algorithm doesn't always converge for curved shapes.
    // need these constants to dictate how accurate we want to be.
    var gjkAccuracy = 0.0001;
    var gjkMaxIterations = 100;

    // get the next search direction from two simplex points
    var getNextSearchDir = function getNextSearchDir( ptA, ptB, dir ){

        var ABdotB = ptB.normSq() - ptB.dot( ptA )
            ,ABdotA = ptB.dot( ptA ) - ptA.normSq()
            ;

        // if the origin is farther than either of these points
        // get the direction from one of those points to the origin
        if ( ABdotB < 0 ){

            return dir.clone( ptB ).negate();

        } else if ( ABdotA > 0 ){

            return dir.clone( ptA ).negate();

        // otherwise, use the perpendicular direction from the simplex
        } else {

            // dir = AB = B - A
            dir.clone( ptB ).vsub( ptA );
            // if (left handed coordinate system)
            // A cross AB < 0 then get perpendicular counterclockwise
            return dir.perp( (ptA.cross( dir ) > 0) );
        }
    };

    /** hide
     * getClosestPoints( simplex ) -> Object
     * - simplex (Array): The simplex
     *
     * Figure out the closest points on the original objects
     * from the last two entries of the simplex
     **/
    var getClosestPoints = function getClosestPoints( simplex ){

        // see http://www.codezealot.org/archives/153
        // for algorithm details

        // we know that the position of the last point
        // is very close to the previous. (by nature of the distance test)
        // this won't give great results for the closest
        // points algorithm, so let's use the previous two
        var len = simplex.length
            ,last = simplex[ len - 2 ]
            ,prev = simplex[ len - 3 ]
            ,scratch = Physics.scratchpad()
            ,A = scratch.vector().clone( last.pt )
            // L = B - A
            ,L = scratch.vector().clone( prev.pt ).vsub( A )
            ,lambdaB
            ,lambdaA
            ;

        if ( L.equals(Physics.vector.zero) ){

            // oh.. it's a zero vector. So A and B are both the closest.
            // just use one of them
            return scratch.done({

                a: last.a,
                b: last.b
            });
        }

        lambdaB = - L.dot( A ) / L.normSq();
        lambdaA = 1 - lambdaB;

        if ( lambdaA <= 0 ){
            // woops.. that means the closest simplex point
            // isn't on the line it's point B itself
            return scratch.done({
                a: prev.a,
                b: prev.b
            });
        } else if ( lambdaB <= 0 ){
            // vice versa
            return scratch.done({
                a: last.a,
                b: last.b
            });
        }

        // guess we'd better do the math now...
        return scratch.done({
            // a closest = lambdaA * Aa + lambdaB * Ba
            a: A.clone( last.a ).mult( lambdaA ).vadd( L.clone( prev.a ).mult( lambdaB ) ).values(),
            // b closest = lambdaA * Ab + lambdaB * Bb
            b: A.clone( last.b ).mult( lambdaA ).vadd( L.clone( prev.b ).mult( lambdaB ) ).values()
        });
    };

    /**
     * Physics.gjk( support(axis)[, seed, checkOverlapOnly, debugFn] ) -> Object
     * - support (Function): The support function. Must return an object containing
       the witness points (`.a`, `.b`) and the support point (`.pt`).
       Recommended to use simple objects.
       Eg:
       ```javascript
       return {
            a: { x: 1, y:2 },
            b: { x: 3, y: 4 },
            pt: { x: 2, y: 2 }
       };
       ```
     * - axis (Physics.vector): The axis to search
     * - seed (Physics.vector): The starting direction for the simplex (defaults to x-axis)
     * - checkOverlapOnly (Boolean): only check whether there is an overlap, don't calculate the depth
     * - debugFn (Function): For debugging. Called at every iteration with the current simplex.
     *
     * Implementation agnostic GJK function.
     *
     * Gilbert–Johnson–Keerthi object collison algorithm
     * For general information about GJK see:
     * - [www.codezealot.org/archives/88](http://www.codezealot.org/archives/88)
     * - [mollyrocket.com/849](http://mollyrocket.com/849)
     *
     * The algorithm information returned:
     * ```javascript
     * {
     *     overlap: Boolean,
     *     simplex: [] // array containing simplex points as simple x/y objects
     * }
     * ```
     **/
    var gjk = function gjk( support, seed, checkOverlapOnly, debugFn ){

        var overlap = false
            ,noOverlap = false // if we're sure we're not overlapping
            ,distance = false
            ,simplex = []
            ,simplexLen = 1
            // setup a scratchpad of temporary cheap objects
            ,scratch = Physics.scratchpad()
            // use seed as starting direction or use x axis
            ,dir = scratch.vector().clone(seed || Physics.vector.axis[ 0 ])
            ,last = scratch.vector()
            ,lastlast = scratch.vector()
            // some temp vectors
            ,v1 = scratch.vector()
            ,v2 = scratch.vector()
            ,ab
            ,ac
            ,sign
            ,tmp
            ,iterations = 0
            ;

        // get the first Minkowski Difference point
        tmp = support( dir );
        simplexLen = simplex.push( tmp );
        last.clone( tmp.pt );
        // negate d for the next point
        dir.negate();

        // start looping
        while ( ++iterations ) {

            // swap last and lastlast, to save on memory/speed
            last.swap(lastlast);
            // push a new point to the simplex because we haven't terminated yet
            tmp = support( dir );
            simplexLen = simplex.push( tmp );
            last.clone( tmp.pt );

            if ( debugFn ){
                debugFn( simplex );
            }

            if ( last.equals(Physics.vector.zero) ){
                // we happened to pick the origin as a support point... lucky.
                overlap = true;
                break;
            }

            // check if the last point we added actually passed the origin
            if ( !noOverlap && last.dot( dir ) <= 0.0 ) {
                // if the point added last was not past the origin in the direction of d
                // then the Minkowski difference cannot possibly contain the origin since
                // the last point added is on the edge of the Minkowski Difference

                // if we just need the overlap...
                if ( checkOverlapOnly ){
                    break;
                }

                noOverlap = true;
            }

            // if it's a line...
            if ( simplexLen === 2 ){

                // otherwise we need to determine if the origin is in
                // the current simplex and act accordingly

                dir = getNextSearchDir( last, lastlast, dir );
                // continue...

            // if it's a triangle... and we're looking for the distance
            } else if ( noOverlap ){

                // if we know there isn't any overlap and
                // we're just trying to find the distance...
                // make sure we're getting closer to the origin
                dir.normalize();
                tmp = lastlast.dot( dir );
                if ( Math.abs(tmp - last.dot( dir )) < gjkAccuracy ){

                    distance = -tmp;
                    break;
                }

                // if we are still getting closer then only keep
                // the points in the simplex that are closest to
                // the origin (we already know that last is closer
                // than the previous two)
                // the norm is the same as distance(origin, a)
                // use norm squared to avoid the sqrt operations
                if (lastlast.normSq() < v1.clone(simplex[ 0 ].pt).normSq()) {

                    simplex.shift();

                } else {

                    simplex.splice(1, 1);
                }

                dir = getNextSearchDir( v1.clone(simplex[ 1 ].pt), v2.clone(simplex[ 0 ].pt), dir );
                // continue...

            // if it's a triangle
            } else {

                // we need to trim the useless point...

                ab = ab || scratch.vector();
                ac = ac || scratch.vector();

                // get the edges AB and AC
                ab.clone( lastlast ).vsub( last );
                ac.clone( simplex[ 0 ].pt ).vsub( last );

                // here normally people think about this as getting outward facing
                // normals and checking dot products. Since we're in 2D
                // we can be clever...
                sign = ab.cross( ac ) > 0;

                if ( sign ^ (last.cross( ab ) > 0) ){

                    // ok... so there's an XOR here... don't freak out
                    // remember last = A = -AO
                    // if AB cross AC and AO cross AB have the same sign
                    // then the origin is along the outward facing normal of AB
                    // so if AB cross AC and A cross AB have _different_ (XOR) signs
                    // then this is also the case... so we proceed...

                    // point C is dead to us now...
                    simplex.shift();

                    // if we haven't deduced that we've enclosed the origin
                    // then we know which way to look...
                    // morph the ab vector into its outward facing normal
                    ab.perp( !sign );

                    // swap
                    dir.swap( ab );

                    // continue...

                    // if we get to this if, then it means we can continue to look along
                    // the other outward normal direction (ACperp)
                    // if we don't see the origin... then we must have it enclosed
                } else if ( sign ^ (ac.cross( last ) > 0) ){
                    // then the origin is along the outward facing normal
                    // of AC; (ACperp)

                    // point B is dead to us now...
                    simplex.splice(1, 1);

                    ac.perp( sign );

                    // swap
                    dir.swap( ab );

                    // continue...

                } else {

                    // we have enclosed the origin!
                    overlap = true;
                    // fewf... take a break
                    break;
                }
            }

            // woah nelly... that's a lot of iterations.
            // Stop it!
            if (iterations > gjkMaxIterations){
                scratch.done();
                return {
                    simplex: simplex,
                    iterations: iterations,
                    distance: 0,
                    maxIterationsReached: true
                };
            }
        }

        // free workspace
        scratch.done();

        tmp = {
            overlap: overlap,
            simplex: simplex,
            iterations: iterations
        };

        if ( distance !== false ){

            tmp.distance = distance;
            tmp.closest = getClosestPoints( simplex );
        }

        return tmp;
    };

    Physics.gjk = gjk;

})();


// ---
// inside: src/math/statistics.js

(function(){

    Physics.statistics = {
        /**
         * Physics.statistics.pushRunningAvg( v, k, m, s ) -> Array
         * - v (Number): is value to push
         * - k (Number): is num elements
         * - m (Number): is current mean
         * - s (Number): is current s value
         * + (Array): Returns a 2 element array containing the next mean, and s value
         *
         * Push a value to a running average calculation.
         * see [http://www.johndcook.com/blog/standard_deviation]
         *
         * Note: variance can be calculated from the "s" value by multiplying it by `1/(k-1)`
         **/
        pushRunningAvg: function( v, k, m, s ){

            var x = v - m;

            // Mk = Mk-1+ (xk – Mk-1)/k
            // Sk = Sk-1 + (xk – Mk-1)*(xk – Mk).
            m += x / k;
            s += x * (v - m);
            return [m, s];
        },

        /**
        * Physics.statistics.pushRunningVectorAvg( v, k, m[, s] )
        * - v (Physics.vector): is vector to push
        * - k (Number): is num elements
        * - m (Physics.vector): is current mean
        * - s (Physics.vector): is current s value
        *
        * Push a vector to a running vector average calculation.
        * see [http://www.johndcook.com/blog/standard_deviation]
        *
        * Calculations are done in place. The `m` and `s` parameters are altered.
        *
        * Note: variance can be calculated from the "s" vector by multiplying it by `1/(k-1)`
        *
        * If s value is ommitted it won't be used.
        **/
        pushRunningVectorAvg: function( v, k, m, s ){
            var invK = 1/k
                ,x = v.get(0) - m.get(0)
                ,y = v.get(1) - m.get(1)
                ;

            // Mk = Mk-1+ (xk – Mk-1)/k
            // Sk = Sk-1 + (xk – Mk-1)*(xk – Mk).
            m.add( x * invK, y * invK );

            if ( s ){
                x *= v.get(0) - m.get(0);
                y *= v.get(1) - m.get(1);

                s.add( x, y );
            }
        }
    };
})();


// ---
// inside: src/math/transform.js

(function(){
    
    /**
     * class Physics.transform
     * 
     * Vector Transformations class for rotating and translating vectors
     **/

    /**
     * new Physics.transform( [vect, angle, origin] )
     * new Physics.transform( transform )
     * - vect (Vectorish): Translation vector
     * - transform (Physics.transform): Transform to copy
     * - angle (Number): Angle (radians) to use for rotation
     * - origin (Vectorish): Origin of the rotation
     * 
     * Transform Constructor / Factory
     **/
    var Transform = function Transform( vect, angle, origin ) {

        if (!(this instanceof Transform)){
            return new Transform( vect, angle );
        }

        this.v = new Physics.vector();
        this.o = new Physics.vector(); // origin of rotation
        
        if ( vect instanceof Transform ){

            this.clone( vect );
            return;
        }

        if (vect){
            this.setTranslation( vect );
        }

        this.setRotation( angle || 0, origin );
    };

    /**
     * Physics.transform#setTranslation( vect ) -> this
     * - vect (Vectorish): The translation vector
     * 
     * Set the translation portion of the transform.
     **/
    Transform.prototype.setTranslation = function( vect ){

        this.v.clone( vect );
        return this;
    };

    /**
     * Physics.transform#setRotation( angle[, origin ] ) -> this
     * - angle (Number): Angle (radians) to use for rotation
     * - origin (Vectorish): Origin of the rotation
     *
     * Set the rotation portion of the transform
     **/
    Transform.prototype.setRotation = function( angle, origin ){

        this.cosA = Math.cos( angle );
        this.sinA = Math.sin( angle );

        if ( origin ){
            this.o.clone( origin );
        } else {
            this.o.zero();
        }

        return this;
    };

    /**
     * Physics.transform#clone( [transform] ) -> this|Physics.transform
     * - transform (Physics.transform): Transform to copy
     * + (this): For chaining
     * + (Physics.transform): New copy of `this` if none is specified as an argument
     * 
     * Clone another transform. Or clone self into new transform.
     **/
    Transform.prototype.clone = function( t ){

        if ( t ){

            this.setTranslation( t.v );
            this.cosA = t.cosA;
            this.sinA = t.sinA;
            this.o.clone( t.o );

            return this;
        }

        return new Transform( this );
    };

    Physics.transform = Transform;

})();

// ---
// inside: src/math/vector.js

(function(window){

    // http://jsperf.com/vector-storage-test/2

    // cached math functions
    // TODO: might be faster not to do this???
    var sqrt = Math.sqrt
        ,min = Math.min
        ,max = Math.max
        ,acos = Math.acos
        ,atan2 = Math.atan2
        ,TWOPI = Math.PI * 2
        ,typedArrays = !!window.Float64Array
        ;

    /**
     * class Physics.vector
     *
     * The vector class and factory function.
     *
     * Call `Physics.vector` with the same arguments as
     * [[new Physics.vector]] to create an instance.
     *
     * The vector methods mostly modify the vector instance.
     * This makes computations faster because creating vectors
     * is avoided.
     *
     * Creating vectors is generally an expensive operation
     * so try to avoid doing this in the simulation loop.
     * Instead you can use [[Physics.scratchpad]] to get
     * temporary vectors for use in performance critical
     * code.
     *
     * _Note_: The coordinate system is left-handed, meaning that
     * the clockwise angular direction is positive. This has implications
     * for the cross-product rule.
     **/

    /** section: Special
     * class Vectorish
     *
     * Any object with `.x` and `.y` properties.
     *
     * A `Vectorish` isn't really a class. In this documentation, when
     * an argument is specified as a `Vectorish` it means either a true
     * [[Physics.vector]] instance, or an object literal with `.x` and `.y`
     * properties.
     **/

    /**
     * new Physics.vector( x, y )
     * new Physics.vector( vect )
     * - x (Number): The x coordinate
     * - y (Number): The y coordinate
     * - vect (Vectorish): A vector-like object to clone
     *
     * Vector Constructor.
     **/
    var Vector = function Vector( x, y ) {

        // enforce instantiation
        if ( !(this instanceof Vector) ){

            return new Vector( x, y );
        }

        // arrays to store values
        // x = _[0]
        // y = _[1]
        // norm = _[3]
        // normsq = _[4]

        /** internal
         * Physics.vector#_
         *
         * Private storage array for data.
         *
         * Do not access this directly. Private. Keep out.
         **/
        if (typedArrays){
            this._ = new Float64Array(5);
        } else {
            this._ = [];
        }

        if (x && (x.x !== undefined || x._ && x._.length)){

            this.clone( x );

        } else {

            this.recalc = true; //whether or not recalculate norms
            this.set( x, y );
        }
    };

    Object.defineProperties( Vector.prototype, {
        /**
         * Physics.vector#x
         *
         * Getter/setter property for the x coordinate.
         **/
        x: {
            get: function(){
                return +this._[0];
            },
            set: function( x ){
                x = +x || 0;
                this.recalc = ( x === this._[0] );
                this._[0] = x;
            }
        },
        /**
         * Physics.vector#y
         *
         * Getter/setter property for the y coordinate.
         **/
        y: {
            get: function(){
                return +this._[1];
            },
            set: function( y ){
                y = +y || 0;
                this.recalc = ( y === this._[1] );
                this._[1] = y;
            }
        }
    });

    //
    // Methods
    //

    /**
     * Physics.vector#set( x, y ) -> this
     * - x (Number): x coordinate
     * - y (Number): y coordinate
     *
     * Sets the x and y components of this vector.
     **/
    Vector.prototype.set = function( x, y ) {

        this.recalc = true;

        this._[0] = +x || 0;
        this._[1] = +y || 0;
        return this;
    };

    /** deprecated: 0.6.0..1.0.0
     * Physics.vector#get( idx ) -> Number
     * - idx (Number): The coordinate index (0 or 1)
     *
     * Get the x or y component by index.
     **/
    Vector.prototype.get = function( n ){

        return this._[ n ];
    };

    /**
     * Physics.vector#vadd( v ) -> this
     * - v (Physics.vector): vector to add
     *
     * Add a [[Physics.vector]] to `this`.
     **/
    Vector.prototype.vadd = function( v ) {

        this.recalc = true;

        this._[0] += v._[0];
        this._[1] += v._[1];
        return this;
    };

    /**
     * Physics.vector#vsub( v ) -> this
     * - v (Physics.vector): vector to subtract
     *
     * Subtract a [[Physics.vector]] from `this`.
     **/
    Vector.prototype.vsub = function( v ) {

        this.recalc = true;

        this._[0] -= v._[0];
        this._[1] -= v._[1];
        return this;
    };

    /**
     * Physics.vector#add( x, y ) -> this
     * - x (Number): amount to add to the x coordinate
     * - y (Number): amount to add to the y coordinate
     *
     * Add scalars [[Physics.vector]] to the coordinates.
     **/
    Vector.prototype.add = function( x, y ){

        this.recalc = true;

        this._[0] += +x || 0;
        this._[1] += +y || 0;
        return this;
    };

    /**
     * Physics.vector#sub( x, y ) -> this
     * - x (Number): amount to subtract from the x coordinate
     * - y (Number): amount to subtract from the y coordinate
     *
     * Subtract scalars [[Physics.vector]] from the coordinates.
     **/
    Vector.prototype.sub = function( x, y ){

        this.recalc = true;

        this._[0] -= x;
        this._[1] -= y === undefined? 0 : y;
        return this;
    };

    /**
     * Physics.vector#mult( m ) -> this
     * - m (Number): amount to multiply this vector by
     *
     * Multiply this by a scalar quantity.
     *
     * Same as scaling the vector by an amount `m`.
     **/
    Vector.prototype.mult = function( m ) {

        if ( !this.recalc ){

            this._[4] *= m * m;
            this._[3] *= m;
        }

        this._[0] *= m;
        this._[1] *= m;
        return this;
    };

    /**
     * Physics.vector#dot( v ) -> Number
     * - v (Physics.vector): The other vector
     *
     * Compute the dot product of this vector with `v`.
     **/
    Vector.prototype.dot = function( v ) {

        return (this._[0] * v._[0]) + (this._[1] * v._[1]);
    };

    /**
     * Physics.vector#cross( v ) -> Number
     * - v (Physics.vector): The other vector
     *
     * Compute the (left-handed) cross product of this vector with `v`.
     **/
    Vector.prototype.cross = function( v ) {

        return ( - this._[0] * v._[1]) + (this._[1] * v._[0]);
    };

    /**
     * Physics.vector#proj( v ) -> Number
     * - v (Physics.vector): The other vector
     *
     * Compute the [scalar projection](http://en.wikipedia.org/wiki/Vector_projection#Scalar_projection_2) of this along `v`.
     **/
    Vector.prototype.proj = function( v ){

        return this.dot( v ) / v.norm();
    };


    /**
     * Physics.vector#vproj( v ) -> this
     * - v (Physics.vector): The other vector
     *
     * Compute the [vector projection](http://en.wikipedia.org/wiki/Vector_projection#Vector_projection_2) of this along `v` and copy the result into this vector.
     **/
    Vector.prototype.vproj = function( v ){

        var m = this.dot( v ) / v.normSq();
        return this.clone( v ).mult( m );
    };

    /**
     * Physics.vector#angle( [v] ) -> Number
     * - v (Physics.vector): The other vector
     * + (Number): The angle in radians between this vector and the x-axis OR `v` if specified
     *
     * Compute the angle between `this` and vector `v` or this and x axis.
     **/
    Vector.prototype.angle = function( v ){

        var ang;

        if ( this.equals( Vector.zero ) ){

            if ( v ){
                return v.angle();
            } else {
                return NaN;
            }

        } else {

            if ( v && !v.equals( Vector.zero ) ){
                ang = atan2( this._[1] * v._[0] - this._[0] * v._[1], this._[0] * v._[0] + this._[1] * v._[1]);
            } else {
                ang = atan2( this._[ 1 ], this._[ 0 ] );
            }
        }

        while (ang > Math.PI){
            ang -= TWOPI;
        }

        while (ang < -Math.PI){
            ang += TWOPI;
        }

        return ang;
    };

    /**
     * Physics.vector#angle2( left, right ) -> Number
     * - left (Physics.vector): The position on the left
     * - right (Physics.vector): The position on the right
     *
     * Compute the angle created between three points; left -> this -> right.
     **/
    Vector.prototype.angle2 = function( left, right ){

        var x1 = left._[0] - this._[0]
            ,y1 = left._[1] - this._[1]
            ,x2 = right._[0] - this._[0]
            ,y2 = right._[1] - this._[1]
            ,ang = atan2( y1 * x2 - x1 * y2, x1 * x2 + y1 * y2)
            ;

        while (ang > Math.PI){
            ang -= TWOPI;
        }

        while (ang < -Math.PI){
            ang += TWOPI;
        }

        return ang;
    };

    /**
     * Physics.vector#norm() -> Number
     *
     * Compute the norm (length) of this vector.
     **/
    Vector.prototype.norm = function() {

        if (this.recalc){
            this.recalc = false;
            this._[4] = (this._[0] * this._[0] + this._[1] * this._[1]);
            this._[3] = sqrt( this._[4] );
        }

        return this._[3];
    };

    /**
     * Physics.vector#normSq() -> Number
     *
     * Compute the norm (length) squared of this vector.
     **/
    Vector.prototype.normSq = function() {

        if (this.recalc){
            this.recalc = false;
            this._[4] = (this._[0] * this._[0] + this._[1] * this._[1]);
            this._[3] = sqrt( this._[4] );
        }

        return this._[4];
    };

    /**
     * Physics.vector#dist( v ) -> Number
     * - v (Physics.vector): The other vector
     *
     * Compute the distance from this vector to another vector `v`.
     **/
    Vector.prototype.dist = function( v ) {

        var dx, dy;
        return sqrt(
            (dx = (v._[0] - this._[0])) * dx +
            (dy = (v._[1] - this._[1])) * dy
        );
    };

    /**
     * Physics.vector#distSq( v ) -> Number
     * - v (Physics.vector): The other vector
     *
     * Compute the distance squared from this vector to another vector `v`.
     **/
    Vector.prototype.distSq = function( v ) {

        var dx, dy;
        return (
            (dx = (v._[0] - this._[0])) * dx +
            (dy = (v._[1] - this._[1])) * dy
        );
    };

    /**
     * Physics.vector#perp( [ccw] ) -> this
     * - ccw (Boolean): flag to indicate that we should rotate counterclockwise
     *
     * Change this vector into a vector that will be perpendicular.
     *
     * In other words, rotate by (+-) 90 degrees.
     **/
    Vector.prototype.perp = function( ccw ) {

        var tmp = this._[0]
            ;

        if ( ccw ){

            // x <-> y
            // negate y
            this._[0] = this._[1];
            this._[1] = -tmp;

        } else {

            // x <-> y
            // negate x
            this._[0] = -this._[1];
            this._[1] = tmp;
        }

        return this;
    };

    /**
     * Physics.vector#normalize() -> this
     *
     * Normalise this vector, making it a unit vector.
     **/
    Vector.prototype.normalize = function() {

        var m = this.norm();

        // means it's a zero Vector
        if ( m === 0 ){
            return this;
        }

        m = 1/m;

        this._[0] *= m;
        this._[1] *= m;

        this._[3] = 1.0;
        this._[4] = 1.0;

        return this;
    };

    /**
     * Physics.vector#transform( t ) -> this
     * - t (Physics.transform): The transformation to apply
     *
     * Apply a [[Physics.transform]] to this vector.
     **/
    Vector.prototype.transform = function( t ){

        var sinA = t.sinA
            ,cosA = t.cosA
            ,x = t.o._[ 0 ]
            ,y = t.o._[ 1 ]
            ;

        this._[ 0 ] -= x;
        this._[ 1 ] -= y;

        // rotate about origin "o" then translate
        return this.set(
            this._[ 0 ] * cosA - this._[ 1 ] * sinA + x + t.v._[ 0 ],
            this._[ 0 ] * sinA + this._[ 1 ] * cosA + y + t.v._[ 1 ]
        );
    };

    /**
     * Physics.vector#transformInv( t ) -> this
     * - t (Physics.transform): The transformation to apply the inverse of
     *
     * Apply an inverse [[Physics.transform]] to this vector.
     **/
    Vector.prototype.transformInv = function( t ){

        var sinA = t.sinA
            ,cosA = t.cosA
            ,x = t.o._[ 0 ]
            ,y = t.o._[ 1 ]
            ;

        this._[ 0 ] -= x + t.v._[ 0 ];
        this._[ 1 ] -= y + t.v._[ 1 ];

        // inverse translate then inverse rotate about origin "o"
        return this.set(
            this._[ 0 ] * cosA + this._[ 1 ] * sinA + x,
            - this._[ 0 ] * sinA + this._[ 1 ] * cosA + y
        );
    };

    /**
     * Physics.vector#rotate( t ) -> this
     * Physics.vector#rotate( ang[, o] ) -> this
     * - t (Physics.transform): The transformation to apply the rotational part of
     * - ang (Number): The angle (in radians), to rotate by
     * - o (Vectorish): The point of origin of the rotation
     *
     * Rotate this vector.
     *
     * An angle and rotation origin can be specified,
     * or a transform can be specified and only the rotation
     * portion of that transform will be applied
     **/
    Vector.prototype.rotate = function( t, o ){

        var sinA
            ,cosA
            ,x = 0
            ,y = 0
            ;

        if ( typeof t === 'number' ){
            sinA = Math.sin( t );
            cosA = Math.cos( t );

            if ( o ){
                x = o.x;
                y = o.y;
            }
        } else {
            sinA = t.sinA;
            cosA = t.cosA;

            x = t.o._[ 0 ];
            y = t.o._[ 1 ];
        }

        this._[ 0 ] -= x;
        this._[ 1 ] -= y;

        return this.set(
            this._[ 0 ] * cosA - this._[ 1 ] * sinA + x,
            this._[ 0 ] * sinA + this._[ 1 ] * cosA + y
        );
    };

    /**
     * Physics.vector#rotateInv( t ) -> this
     * - t (Physics.transform): The transformation to apply the inverse rotational part of
     *
     * Apply the inverse rotation of a transform.
     *
     * Only the inverse rotation portion of
     * that transform will be applied.
     **/
    Vector.prototype.rotateInv = function( t ){

        return this.set(
            (this._[ 0 ] - t.o._[ 0 ]) * t.cosA + (this._[ 1 ] - t.o._[ 1 ]) * t.sinA + t.o._[ 0 ],
            -(this._[ 0 ] - t.o._[ 0 ]) * t.sinA + (this._[ 1 ] - t.o._[ 1 ]) * t.cosA + t.o._[ 1 ]
        );
    };

    /**
     * Physics.vector#translate( t ) -> this
     * - t (Physics.transform): The transformation to apply the translational part of
     *
     * Apply the translation of a transform.
     *
     * Only the translation portion of
     * that transform will be applied.
     **/
    Vector.prototype.translate = function( t ){

        return this.vadd( t.v );
    };

    /**
     * Physics.vector#translateInv( t ) -> this
     * - t (Physics.transform): The transformation to apply the inverse translational part of
     *
     * Apply the inverse translation of a transform.
     *
     * Only the inverse translation portion of
     * that transform will be applied.
     **/
    Vector.prototype.translateInv = function( t ){

        return this.vsub( t.v );
    };


    /**
     * Physics.vector#clone( [v] ) -> this|Physics.vector
     * - v (Vectorish): The vector-like object to clone
     * + (this): If `v` is specified as an argument
     * + (Physics.vector): A new vector instance that clones this vector, if no argument is specified
     *
     * Create a clone of this vector, or clone another vector into this instance.
     *
     * This is especially useful in vector algorithms
     * that use temporary vectors (which most should).
     * You can create temporary vectors and then do things like...
     * ```
     * temp.clone( otherVector );
     * // compute things with temp...
     * // then save the result
     * result.clone( tmp );
     * ```
     **/
    Vector.prototype.clone = function( v ) {

        // http://jsperf.com/vector-storage-test

        if ( v ){

            if (!v._){

                return this.set( v.x, v.y );
            }

            this.recalc = v.recalc;

            if (!v.recalc){
                this._[3] = v._[3];
                this._[4] = v._[4];
            }

            this._[0] = v._[0];
            this._[1] = v._[1];

            return this;
        }

        return new Vector( this );
    };

    /**
     * Physics.vector#swap( v ) -> this
     * - v (Physics.vector): The other vector
     *
     * Swap values with other vector.
     **/
    Vector.prototype.swap = function( v ){

        var _ = this._;
        this._ = v._;
        v._ = _;

        _ = this.recalc;
        this.recalc = v.recalc;
        v.recalc = _;
        return this;
    };

    /**
     * Physics.vector#values() -> Object
     *
     * Get the coordinate values as an object literal.
     **/
    Vector.prototype.values = function(){

        return {
            x: this._[0],
            y: this._[1]
        };
    };


    /**
     * Physics.vector#zero() -> this
     *
     * Set the coordinates of this vector to zero.
     **/
    Vector.prototype.zero = function() {

        this._[3] = 0.0;
        this._[4] = 0.0;

        this._[0] = 0.0;
        this._[1] = 0.0;
        return this;
    };

    /**
     * Physics.vector#negate() -> this
     *
     * Flip this vector in the opposite direction.
     **/
    Vector.prototype.negate = function( component ){

        if (component !== undefined){

            this._[ component ] = -this._[ component ];
            return this;
        }

        this._[0] = -this._[0];
        this._[1] = -this._[1];
        return this;
    };

    /**
     * Physics.vector#clamp( minV, maxV ) -> this
     * - minV (Vectorish): The minimum vector
     * - maxV (Vectorish): The maximum vector
     *
     * Constrain vector components to minima and maxima.
     *
     * The vector analog of [scalar clamping](http://en.wikipedia.org/wiki/Clamping_(graphics)).
     **/
    Vector.prototype.clamp = function( minV, maxV ){

        this._[0] = min(max(this._[0], minV.x), maxV.x);
        this._[1] = min(max(this._[1], minV.y), maxV.y);
        this.recalc = true;
        return this;
    };

    /**
     * Physics.vector#toString() -> String
     *
     * Get a formatted string of this vector's coordinates.
     **/
    Vector.prototype.toString = function(){

        return '('+this._[0] + ', ' + this._[1]+')';
    };


    /**
     * Physics.vector#equals( v ) -> Boolean
     * - v (Physics.vector): The other vector
     *
     * Determine if this vector equals another.
     **/
    Vector.prototype.equals = function( v ){

        return this._[0] === v._[0] &&
            this._[1] === v._[1] &&
            this._[2] === v._[2];
    };

    /**
     * Physics.vector.axis = Array
     *
     * Read-only axis vectors for general reference.
     *
     * Example:
     *
     * ```javascript
     * Physics.vector.axis[0]; // The x axis unit vector
     * Physics.vector.axis[1]; // The y axis unit vector
     * ```
     **/
    Vector.axis = [
        new Vector(1.0, 0.0),
        new Vector(0.0, 1.0)
    ];

    /**
     * Physics.vector.zero = zeroVector
     *
     * Read-only zero vector for reference
     **/
    Vector.zero = new Vector(0, 0);

    // assign
    Physics.vector = Vector;

}(this)); // end Vector class


// ---
// inside: src/util/noconflict.js

(function( window ){

    var _Physics = window.Physics;

    /**
     * Physics.noConflict() -> Physics
     * 
     * Restore the original reference to the global window.Physics variable.
     * 
     * Does nothing if PhysicsJS doesn't have a reference in global scope
     **/
    Physics.noConflict = function(){

        if ( window.Physics === Physics ) {
            window.Physics = _Physics;
        }
        
        return Physics;
    };

})( this );

// ---
// inside: src/util/decorator.js

/** related to: factory
 * Physics.util.decorator( type [, protoDef ] ) -> Function
 * - type (String): The name of the factory you are creating
 * - protoDef (Object): The top-level prototype
 * + (Function): The factory function
 *
 * Facilitates creation of decorator factory functions.
 *
 * See the [[factory]] definition for the factory signatures.
 * [For full documentation and examples, please visit the wiki](https://github.com/wellcaffeinated/PhysicsJS/wiki/Fundamentals#the-factory-pattern).
 *
 * Example:
 *
 * ```javascript
 * var factory = Physics.util.decorator('factory', {
 *      // prototype methods...
 *      method: function( args ){
 *      }
 * });
 *
 * // define
 * factory( 'name', 'parent-name', function( parent ){
 *
 *      // extend further...
 *      return {
 *          // overrides
 *          init: function( cfg ){
 *              parent.init.call(this, cfg);
 *          }
 *      };
 * });
 *
 * // instantiate
 * var options = { key: 'val' };
 * var instance = factory( 'name', options );
 * ```
 **/
var Decorator = Physics.util.decorator = function Decorator( type, baseProto ){

    var registry = {}
        ,proto = {}
        ;

    // extend that supports getters/setters
    // only extends functions
    var extend = function extend( to, from ){
        var desc, key;
        for ( key in from ){
            desc = Object.getOwnPropertyDescriptor( from, key );
            if ( desc.get || desc.set ){

                Object.defineProperty( to, key, desc );

            } else if ( Physics.util.isFunction( desc.value ) ){

                to[ key ] = desc.value;
            }
        }
        return to;
    };

    // http://ejohn.org/blog/objectgetprototypeof/
    /* jshint -W103 */
    var getProto = Object.getPrototypeOf;
    if ( typeof getProto !== 'function' ) {
        if ( typeof 'test'.__proto__ === 'object' ) {
            getProto = function(object){
                return object.__proto__;
            };
        } else {
            getProto = function(object){
                // May break if the constructor has been tampered with
                return object.constructor.prototype;
            };
        }
    }
    /* jshint +W103 */

    var objectCreate = Object.create;
    if (typeof objectCreate !== 'function') {
        objectCreate = function (o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }

    /*
     * mixin( key, val )
     * mixin( obj )
     * - key (String): The method name
     * - val (Function): The function to assign
     * - obj (Object): object with many `key: fn` pairs
     *
     * Apply mixin methods to decorator base.
     */
    var mixin = function mixin( key, val ){

        if ( typeof key === 'object' ){
            proto = extend(proto, key);
            proto.type = type;
            return;
        }

        if ( key !== 'type' && Physics.util.isFunction( val ) ){
            proto[ key ] = val;
        }
    };

    // @TODO: not sure of the best way to make the constructor names
    // transparent and readable in debug consoles...
    mixin( baseProto );

    /**  belongs to: Physics.util.decorator
     * factory( name[, parentName], decorator[, cfg] )
     * factory( name, cfg ) -> Object
     * -  name       (String):  The class name
     * -  parentName (String): The name of parent class to extend
     * -  decorator  (Function): The decorator function that should define and return methods to extend (decorate) the base class
     * -  cfg        (Object): The configuration to pass to the class initializer
     *
     * Factory function for definition and instantiation of subclasses.
     *
     * Use the first signature (once) to define it first.
     * If defining without the "cfg" parameter, void will be returned. Otherwise the class instance will be returned.
     *
     * See [[Physics.util.decorator]] for more information.
     **/
    var factory = function factory( name, parentName, decorator, cfg ){

        var instance
            ,result
            ,parent = proto
            ,tmp
            ;

        // set parent if specified
        if ( typeof parentName !== 'string' ){

            // ... otherwise reassign parameters
            cfg = decorator;
            decorator = parentName;

        } else {

            // extend the specified module
            parent = registry[ parentName ];

            if ( !parent ){

                throw 'Error: "' + parentName + '" ' + type + ' not defined';
            }

            parent = parent.prototype;
        }

        if ( typeof decorator === 'function' ){

            result = registry[ name ];

            if ( result ){

                result.prototype = extend(result.prototype, decorator( getProto(result.prototype) ));

            } else {
                // newly defined
                // store the new class
                result = registry[ name ] = function constructor( opts ){
                    if (this.init){
                        this.init( opts );
                    }
                };

                result.prototype = objectCreate( parent );
                result.prototype = extend(result.prototype, decorator( parent, result.prototype ));
            }

            result.prototype.type = type;
            result.prototype.name = name;

        } else {

            cfg = decorator || {};
            result = registry[ name ];
            if (!result){

                throw 'Error: "' + name + '" ' + type + ' not defined';
            }
        }

        if ( cfg ) {

            // create a new instance from the provided decorator
            return new result( cfg );
        }
    };

    factory.mixin = mixin;

    return factory;
};


// ---
// inside: src/util/helpers.js

/**
 * Physics.util.indexOf( arr, value ) -> Number
 * - arr (Array): The array to search
 * - value (Mixed): The value to find
 * + (Number): The index of `value` in the array OR `-1` if not found
 *
 * Fast indexOf implementation.
 **/
Physics.util.indexOf = function indexOf(arr, value) {
    var fr = 0, bk = arr.length;
    while (fr < bk) {
        bk--;
        if (arr[ fr ] === value) {
            return fr;
        }
        if (arr[ bk ] === value) {
            return bk;
        }
        fr++;
    }
    return -1;
};


// http://jsperf.com/array-destroy/87
/**
 * Physics.util.clearArray( arr ) -> Array
 * - arr (Array): The array to clear
 * + (Array): The array passed in
 *
 * Quickly clear an array.
 **/
Physics.util.clearArray = function clearArray(arr){
    var l = arr.length;
    while( l-- ){
        arr.pop();
    }
    return arr;
};

/**
 * Physics.util.throttle( fn, delay ) -> Function
 * - fn (Function): The function to throttle
 * - delay (Number): Time in milliseconds
 *
 * Ensure a function is only called once every specified time span.
 **/
Physics.util.throttle = function throttle( fn, delay, scope ){
    var to
        ,call = false
        ,args
        ,cb = function(){
            clearTimeout( to );
            if ( call ){
                call = false;
                to = setTimeout(cb, delay);
                fn.apply(scope, args);
            } else {
                to = false;
            }
        }
        ;

    scope = scope || null;

    return function(){
        call = true;
        args = arguments;
        if ( !to ){
            cb();
        }
    };
};

/**
 * Physics.util.options( def[, target] ) -> Function
 * - def (Object): Default options to set
 * - target (Object): Where to copy the options to. Defaults to the returned function.
 * + (Function): The options function
 *
 * Options helper to keep track of options. Call it with a config object. Access options directly on the function.
 *
 * Example:
 *
 * ```javascript
 * this.options = Physics.util.options({ foo: 'bar', opt: 'def' });
 * this.options({ opt: 'myVal' });
 *
 * this.options.foo; // === 'bar'
 * this.options.def; // === 'myVal'
 *
 * // can also change defaults later
 * this.options.defaults({ foo: 'baz' });
 *
 * // can add a change callback
 * this.options.onChange(function( opts ){
 *     // some option changed
 *     // opts is the target
 * });
 * ```
 **/
// deep copy callback to extend deeper into options
var deepCopyFn = function( a, b ){

    if ( Physics.util.isPlainObject( b ) ){

        return Physics.util.extend({}, a, b, deepCopyFn );
    }

    return b !== undefined ? b : a;
};
Physics.util.options = function( def, target ){

    var _def = {}
        ,fn
        ,callbacks = []
        ;

    // set options
    fn = function fn( options, deep ){

        Physics.util.extend(target, options, deep ? deepCopyFn : null);
        for ( var i = 0, l = callbacks.length; i < l; ++i ){
            callbacks[ i ]( target );
        }
        return target;
    };

    // add defaults
    fn.defaults = function defaults( def, deep ){
        Physics.util.extend( _def, def, deep ? deepCopyFn : null );
        Physics.util.defaults( target, _def, deep ? deepCopyFn : null );
        return _def;
    };

    fn.onChange = function( cb ){
        callbacks.push( cb );
    };

    target = target || fn;

    fn.defaults( def );

    return fn;
};

/**
 * Physics.util.pairHash( id1, id2 ) -> Number
 * - id1 (Number): The id of the first thing
 * - id2 (Number): The id of the second thing
 * + (Number): A unique numeric hash (valid for values < 2^16)
 *
 * Generate a unique numeric hash from two input IDs.
 *
 * Useful for speedy indexing of pairs.
 **/
Physics.util.pairHash = function( id1, id2 ){
    id1 = id1|0;
    id2 = id2|0;

    if ( (id1|0) === (id2|0) ){

        return -1;
    }

    // valid for values < 2^16
    return ((id1|0) > (id2|0) ?
        (id1 << 16) | (id2 & 0xFFFF) :
        (id2 << 16) | (id1 & 0xFFFF))|0
        ;
};

/**
 * Physics.util.bind( fn, scope[, args... ] ) -> Function
 * - fn (Function): The function to bind scope to
 * - scope (Object): The scope to give to `fn`
 * - args (Mixed): Arguments to send to `fn`
 *
 * Bind a scope to a function.
 *
 * Basically the same functionality as [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 **/
if ( !Function.prototype.bind ){
    Physics.util.bind = function( fn, scope, args ){
        args = Array.prototype.slice.call( arguments, 2 );
        return function(){
            return fn.apply( scope, args.concat( Array.prototype.slice.call(arguments) ) );
        };
    };
} else {
    Physics.util.bind = function( fn, scope, args ){
        args = Array.prototype.slice.call( arguments, 1 );
        return Function.prototype.bind.apply( fn, args );
    };
}

/**
 * Physics.util.find( collection, fn( value, index, collection ) ) -> Mixed
 * - collection (Array): Collection of values to test
 * - fn (Function): The test function
 * - value (Mixed): The value to test
 * - index (Number): The index of value in collection
 * - collection (Array): The input collection
 *
 * Test an array of values against a test function
 * and return the first value for which the function
 * returns true.
 **/
Physics.util.find = function( collection, fn ){
    var i
        ,l = collection.length
        ,val
        ;

    for ( i = 0; i < l; i++ ){
        val = collection[ i ];
        if ( fn( val, i, collection ) ){
            return val;
        }
    }
};

/**
 * Physics.util.filter( collection, fn( value, index, collection ) ) -> Array
 * - collection (Array): Collection of values to test
 * - fn (Function): The test function
 * - value (Mixed): The value to test
 * - index (Number): The index of value in collection
 * - collection (Array): The input collection
 *
 * Test an array of values against a test function
 * and return another array of values for which
 * the test function returns true.
 **/
Physics.util.filter = function( collection, fn ){
    var i
        ,l = collection.length
        ,val
        ,matches = []
        ;

    for ( i = 0; i < l; i++ ){
        val = collection[ i ];
        if ( fn( val, i, collection ) ){
            matches.push( val );
        }
    }

    return matches;
};

// lodash methods

(function(){
/*
 * @license
 * Modified version of:
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/* Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};
var identity = function(a){ return a; };
var arrayClass = '[object Array]';
var objectClass = '[object Object]';
var nativeKeys = Object.keys;
var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
/* Used as the size when optimizations are enabled for large arrays */
var largeArraySize = 75;
/* Used to pool arrays and objects used internally */
var arrayPool = [],
    objectPool = [];
/* Used as the max size of the `arrayPool` and `objectPool` */
var maxPoolSize = 40;
var keyPrefix = +new Date() + '';

function releaseArray(array) {
  Physics.util.clearArray( array );
  if (arrayPool.length < maxPoolSize) {
    arrayPool.push(array);
  }
}

function releaseObject(object) {
  var cache = object.cache;
  if (cache) {
    releaseObject(cache);
  }
  object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
  if (objectPool.length < maxPoolSize) {
    objectPool.push(object);
  }
}

function getObject() {
  return objectPool.pop() || {
    'array': null,
    'cache': null,
    'criteria': null,
    'false': false,
    'index': 0,
    'null': false,
    'number': null,
    'object': null,
    'push': null,
    'string': null,
    'true': false,
    'undefined': false,
    'value': null
  };
}

function getArray() {
  return arrayPool.pop() || [];
}

function cacheIndexOf(cache, value) {
  var type = typeof value;
  cache = cache.cache;

  if (type === 'boolean' || value == null) {
    return cache[value] ? 0 : -1;
  }
  if (type !== 'number' && type !== 'string') {
    type = 'object';
  }
  var key = type === 'number' ? value : keyPrefix + value;
  cache = (cache = cache[type]) && cache[key];

  return type === 'object' ?
    (cache && Physics.util.indexOf(cache, value) > -1 ? 0 : -1) :
    (cache ? 0 : -1);
}

function cachePush(value) {
  var cache = this.cache,
      type = typeof value;

  if (type === 'boolean' || value == null) {
    cache[value] = true;
  } else {
    if (type !== 'number' && type !== 'string') {
      type = 'object';
    }
    var key = type === 'number' ? value : keyPrefix + value,
        typeCache = cache[type] || (cache[type] = {});

    if (type === 'object') {
      (typeCache[key] || (typeCache[key] = [])).push(value);
    } else {
      typeCache[key] = true;
    }
  }
}

function createCache(array) {
  var index = -1,
      length = array.length,
      first = array[0],
      mid = array[(length / 2) | 0],
      last = array[length - 1];

  if (first && typeof first === 'object' &&
      mid && typeof mid === 'object' && last && typeof last === 'object') {
    return false;
  }
  var cache = getObject();
  cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

  var result = getObject();
  result.array = array;
  result.cache = cache;
  result.push = cachePush;

  while (++index < length) {
    result.push(array[index]);
  }
  return result;
}

var shimKeys = function(object) {
  var index, iterable = object, result = [];
  if (!iterable){ return result; }
  if (!(objectTypes[typeof object])){ return result; }
    for (index in iterable) {
      if (hasOwnProperty.call(iterable, index)) {
        result.push(index);
      }
    }
  return result;
};

var keys = !nativeKeys ? shimKeys : function(object) {
  if (!Physics.util.isObject(object)) {
    return [];
  }
  return nativeKeys(object);
};

var idCounter = 0;
/**
 * Physics.util.uniqueId( [prefix] ) -> String
 * - prefix (String): Prefix to the id
 *
 * Generate a unique id, optionally prefixed.
 **/
Physics.util.uniqueId = function uniqueId(prefix) {
    var id = ++idCounter;
    return '' + (prefix || '') + id;
};

/*
 * The base implementation of `_.random` without argument juggling or support
 * for returning floating-point numbers.
 *
 * @private
 * @param {number} min The minimum possible value.
 * @param {number} max The maximum possible value.
 * @returns {number} Returns a random number.
 */
function baseRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

/*
 * Creates an array of shuffled values, using a version of the Fisher-Yates
 * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
 *
 * @static
 * @memberOf _
 * @category Collections
 * @param {Array|Object|string} collection The collection to shuffle.
 * @returns {Array} Returns a new shuffled collection.
 * @example
 *
 * _.shuffle([1, 2, 3, 4, 5, 6]);
 * // => [4, 1, 6, 3, 5, 2]
 */
Physics.util.shuffle = function(collection) {
    var index = -1
        ,length = collection ? collection.length : 0
        ,result = Array(typeof length === 'number' ? length : 0)
        ,i
        ,l
        ,value
        ,rand
        ;

    for ( i = 0, l = collection.length; i < l; i++ ){
        value = collection[ i ];
        rand = baseRandom(0, ++index);
        result[index] = result[rand];
        result[rand] = value;
    }
    return result;
};

/**
 * Physics.util.isObject( val ) -> Boolean
 * - val (Mixed): The value to test
 *
 * Test if a value is an object.
 **/
Physics.util.isObject = function isObject(value) {
    // check if the value is the ECMAScript language type of Object
    // http://es5.github.io/#x8
    // and avoid a V8 bug
    // http://code.google.com/p/v8/issues/detail?id=2291
    return !!(value && objectTypes[typeof value]);
};

function isFunction(value) {
    return typeof value === 'function';
}

/**
 * Physics.util.isFunction( val ) -> Boolean
 * - val (Mixed): The value to test
 *
 * Test if a value is a function.
 **/
Physics.util.isFunction = isFunction;

/**
 * Physics.util.isArray( val ) -> Boolean
 * - val (Mixed): The value to test
 *
 * Test if a value is an array.
 **/
Physics.util.isArray = Array.isArray || function(value) {
  return value && typeof value === 'object' && typeof value.length === 'number' &&
    toString.call(value) === arrayClass || false;
};

var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);
function isNative(value) {
  return typeof value === 'function' && reNative.test(value);
}

function shimIsPlainObject(value) {
  var ctor,
      result;

  // avoid non Object objects, `arguments` objects, and DOM elements
  if (!(value && toString.call(value) === objectClass) ||
      (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
    return false;
  }
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  for (var key in value){
    result = key;
  }
  return typeof result === 'undefined' || hasOwnProperty.call(value, result);
}

/**
 * Physics.util.isPlainObject( val ) -> Boolean
 * - val (Mixed): The value to test
 *
 * Test if a value is a plain javascript object.
 **/
Physics.util.isPlainObject = !Object.getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && toString.call(value) === objectClass)) {
    return false;
  }
  var valueOf = value.valueOf,
      objProto = isNative(valueOf) && (objProto = Object.getPrototypeOf(valueOf)) && Object.getPrototypeOf(objProto);

  return objProto ?
    (value === objProto || Object.getPrototypeOf(value) === objProto) :
    shimIsPlainObject(value);
};

function baseUniq(array, isSorted, callback) {
  var index = -1,
      indexOf = Physics.util.indexOf,
      length = array ? array.length : 0,
      result = [];

  var isLarge = !isSorted && length >= largeArraySize && indexOf === Physics.util.indexOf,
      seen = (callback || isLarge) ? getArray() : result;

  if (isLarge) {
    var cache = createCache(seen);
    indexOf = cacheIndexOf;
    seen = cache;
  }
  while (++index < length) {
    var value = array[index],
        computed = callback ? callback(value, index, array) : value;

    if (isSorted ?
          !index || seen[seen.length - 1] !== computed :
          indexOf(seen, computed) < 0
        ) {
      if (callback || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  if (isLarge) {
    releaseArray(seen.array);
    releaseObject(seen);
  } else if (callback) {
    releaseArray(seen);
  }
  return result;
}

/**
 * Physics.util.uniq( array, [isSorted, callback] ) -> Array
 * - array (Array): The array
 * - isSorted (Boolean): Flag to indicate the array is sorted
 * - callback (Function): Mapping function
 *
 * Create an array without duplicates.
 **/
Physics.util.uniq = function uniq(array, isSorted, callback) {
  // juggle arguments
  if (typeof isSorted !== 'boolean' && isSorted != null) {
    callback = isSorted;
    isSorted = false;
  }
  return baseUniq(array, isSorted, callback);
};

var assign = function(object, source, guard) {
  var index, iterable = object, result = iterable;
  if (!iterable) { return result; }
  var args = arguments,
      argsIndex = 0,
      callback,
      argsLength = typeof guard === 'number' ? 2 : args.length;
  if (argsLength > 2 && typeof args[argsLength - 1] === 'function') {
    callback = args[--argsLength];
  }
  while (++argsIndex < argsLength) {
    iterable = args[argsIndex];
    if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
        }
    }
  }
  return result;
};

/**
 * Physics.util.extend( object, source...[, callback] ) -> Object
 * - object (Object): The destination object
 * - source (Object): The source objects
 * - callback (Function): The function to customize assigning values
 *
 * Implementation of [lodash.extend](http://lodash.com/docs#assign)
 **/
Physics.util.extend = assign;

/**
 * Physics.util.defaults( object, source...[, callback] ) -> Object
 * - object (Object): The destination object
 * - source (Object): The source objects
 * - callback (Function): The function to customize assigning values
 *
 * Implementation of [lodash.defaults](http://lodash.com/docs#defaults).
 **/
Physics.util.defaults = function(object, source, guard) {
  var index, iterable = object, result = iterable;
  if (!iterable){ return result; }
  var args = arguments,
      argsIndex = 0,
      argsLength = typeof guard === 'number' ? 2 : args.length;
  while (++argsIndex < argsLength) {
    iterable = args[argsIndex];
    if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (typeof result[index] === 'undefined') {
              result[index] = iterable[index];
          }
        }
    }
  }
  return result;
};

/**
 * Physics.util.sortedIndex( array, value[, callback] ) -> Number
 * - array (Array): The array to inspect
 * - value (Mixed): The value to evaluate
 * - callback (Function): Function called per iteration
 *
 * Implementation of [lodash.sortedIndex](http://lodash.com/docs#sortedIndex).
 **/
Physics.util.sortedIndex = function sortedIndex(array, value, callback) {
  var low = 0,
      high = array ? array.length : low;

  // explicitly reference `identity` for better inlining in Firefox
  callback = callback || identity;
  value = callback(value);

  /* jshint -W030 */
  while (low < high) {
    var mid = (low + high) >>> 1;
    (callback(array[mid]) < value) ?
      low = mid + 1 :
      high = mid;
  }
  /* jshint +W030 */
  return low;
};

})();


// ---
// inside: src/util/scratchpad.js

/*
 * scratchpad
 * thread-safe management of temporary (voletile)
 * objects for use in calculations
 * https://github.com/wellcaffeinated/scratchpad.js
 */
Physics.scratchpad = (function(){

    // Errors
    var SCRATCH_USAGE_ERROR = 'Error: Scratchpad used after .done() called. (Could it be unintentionally scoped?)';
    var SCRATCH_INDEX_OUT_OF_BOUNDS = 'Error: Scratchpad usage space out of bounds. (Did you forget to call .done()?)';
    var SCRATCH_MAX_REACHED = 'Error: Too many scratchpads created. (Did you forget to call .done()?)';
    var ALREADY_DEFINED_ERROR = 'Error: Object is already registered.';

    // cache previously created scratches
    var scratches = [];
    var numScratches = 0;
    var Scratch, Scratchpad;

    var regIndex = 0;


    /** belongs to: Physics.scratchpad
     * class Scratch
     *
     * A scratchpad session.
     *
     * This class keeps track of temporary objects used
     * in this session and releases them when finished (call to `.done()`).
     *
     * Use this to retrieve temporary objects:
     * - `.vector()`: retrieve a temporary [[Physics.vector]]
     * - `.transform()`: retrieve a temporary [[Physics.transform]]
     *
     * See [[Physics.scratchpad]] for more info.
     **/
    Scratch = function Scratch(){

        // private variables
        this._active = false;
        this._indexArr = [];

        if (++numScratches >= Scratchpad.maxScratches){
            throw SCRATCH_MAX_REACHED;
        }
    };

    Scratch.prototype = {

        /**
         * Scratch#done( [val] ) -> Mixed
         * - val (Mixed): No effect on this method, just passed on to the return value so you can do things like:
         return scratch.done( myReturnVal );
         * + (Mixed): Whatever you specified as `val`
         *
         * Declare that your work is finished.
         *
         * Release temp objects for use elsewhere. Must be called when immediate work is done.
         *
         * You can wrap the return value in scratch.done() so that you don't forget to call it.
         *
         * Example:
         *
         * ```javascript
         * return scratch.done( myReturnValue );
         * ```
         **/
        done: function( val ){

            this._active = false;
            var s;
            for ( var i = 0; i < regIndex; ++i ){

                this[ i ] = 0;
            }

            // add it back to the scratch stack for future use
            scratches.push( this );
            return val;
        }
    };


    // API

    /**
     * Physics.scratchpad( [fn] ) -> Scratch|Function
     * - fn (Function): Some function you'd like to wrap in a scratch session. First argument is the scratch instance.
     * + (Function): The wrapped function (if `fn` arg specified) that can be reused like the original minus the first (scratch) parameter.
     * + (Scratch): The scratch session.
     *
     * Get a new scratch session to work from or wrap a function in a scratch session.
     *
     * Call `.done()` on it when finished.
     *
     * Example:
     *
     * ```javascript
     * // get a scratch session manually
     * var myAlg = function( scratch, arg1, arg2, ... ){
     *     var scratch = Physics.scratchpad()
     *     ,vec = scratch.vector().set( 0, 0 ) // need to reinitialize... it's recycled!
     *     ;
     *     // ...
     *     return scratch.done( result );
     * };
     * // later...
     * while( awesome ){
     *     myAlg( arg1, arg2, ... );
     * }
     * ```
     *
     * Example:
     *
     * ```javascript
     * // wrap a function in a scratch session
     * var myAlg = Physics.scratchpad(function( scratch, arg1, arg2, ... ){
     *     var vec = scratch.vector().set( 0, 0 ); // need to reinitialize... it's recycled!
     *     //...
     *     return result;
     * });
     * // later...
     * while( awesome ){
     *     myAlg( arg1, arg2, ... );
     * }
     * ```
     **/
    Scratchpad = function Scratchpad( fn ){

        if ( fn ){
            return Scratchpad.fn( fn );
        }

        var scratch = scratches.pop() || new Scratch();
        scratch._active = true;
        return scratch;
    };

    // options
    Scratchpad.maxScratches = 100; // maximum number of scratches
    Scratchpad.maxIndex = 20; // maximum number of any type of temp objects

    /**
     * Physics.scratchpad.fn( fn ) -> Function
     * - fn (Function): Some function you'd like to wrap in a scratch session. First argument is the scratch instance. See [[Physics.scratchpad]].
     * + (Function): The wrapped function that can be reused like the original minus the first (scratch) parameter.
     *
     * Wrap a function in a scratch session.
     *
     * Same as calling `Physics.scratchpad( fn )` with a function specified.
     **/
    Scratchpad.fn = function( fn ){

        var args = [];
        for ( var i = 0, l = fn.length; i < l; i++ ){
            args.push( i );
        }

        args = 'a' + args.join(',a');
        /* jshint -W054 */
        var handle = new Function('fn, scratches, Scratch', 'return function('+args+'){ '+
               'var scratch = scratches.pop() || new Scratch( scratches );'+
               'scratch._active = true;'+
               'return scratch.done( fn(scratch, '+args+') );'+
           '};'
        );
        /* jshint +W054 */

        return handle(fn, scratches, Scratch);
    };

    /**
     * Physics.scratchpad.register( name, constructor )
     * - name (String): Name of the object class
     * - constructor (Function): The object constructor
     *
     * Register a new object to be included in scratchpads.
     *
     * Example:
     *
     * ```javascript
     * // register a hypothetical vector class...
     * Physics.scratchpad.register('vector', Vector);
     * ```
     **/
    Scratchpad.register = function register( name, constructor, options ){

        var proto = Scratch.prototype
            ,idx = regIndex++ // increase the scratch type index
            ,stackname = '_' + name + 'Stack' // the name of the array stack
            ,useFactory = options && options.useFactory
            ;

        if ( name in proto ) {
            throw ALREADY_DEFINED_ERROR;
        }

        // create a new function on the prototype
        Scratch.prototype[ name ] = function(){

            // get the stack (or initialize it)
            var stack = this[ stackname ] || (this[ stackname ] = [])
                // we increase this index every time a voletile object is requested
                // seems weird to store it on this as a number (ie: this.0, this.1)...
                // but actually it's faster...
                ,stackIndex = this[ idx ] | 0
                ;

            this[ idx ] = stackIndex + 1;

            // if used after calling done...
            if (!this._active){
                throw SCRATCH_USAGE_ERROR;
            }

            // if too many objects created...
            if (stackIndex >= Scratchpad.maxIndex){
                throw SCRATCH_INDEX_OUT_OF_BOUNDS;
            }

            // return or create new instance
            return stack[ stackIndex ] ||
                    (stack[ stackIndex ] = useFactory ? constructor() : new constructor() );
        };

    };

    // register some classes
    Scratchpad.register('vector', Physics.vector);
    Scratchpad.register('transform', Physics.transform);

    return Scratchpad;

})();


// ---
// inside: src/util/pubsub.js

(function(){

    var defaultPriority = 1;

    function getPriority( val ){
        return val._priority_;
    }

    // register a new scratch object so we can reuse event data
    Physics.scratchpad.register('event', function(){ return {}; }, { useFactory: true });

    /**
     * class Physics.util.pubsub
     *
     * Fast pubsub implementation.
     *
     * Can be mixed into other classes easily.
     **/
    var PubSub = function PubSub(){

        if (!(this instanceof PubSub)){
            return new PubSub();
        }
    };

    PubSub.prototype = {

        /**
         * Physics.util.pubsub#on( topic, fn( data, event )[, scope, priority] ) -> this
         * Physics.util.pubsub#on( topicConfig[, scope, priority] ) -> this
         * - topic (String): The topic name
         * - topicConfig (Object): A config with key/value pairs of `{ topic: callbackFn, ... }`
         * - fn (Function): The callback function (if not using Object as previous argument)
         * - data (Mixed): The data sent from the call to `.emit()`
         * - event (Object): Event data, holding `.topic`, the topic, and `.handler`, the `fn` callback.
         * - scope (Object): The scope to bind callback to
         * - priority (Number): The priority of the callback (higher is earlier)
         *
         * Subscribe callback(s) to a topic(s).
         **/
        on: function( topic, fn, scope, priority ){

            var listeners
                ,orig
                ,idx
                ;

            // ensure topics hash is initialized
            this._topics = this._topics || (this._topics = {});

            // check if we're subscribing to multiple topics
            // with an object
            if ( Physics.util.isObject( topic ) ){

                for ( var t in topic ){

                    this.on( t, topic[ t ], fn, scope );
                }

                return this;
            }

            listeners = this._topics[ topic ] || (this._topics[ topic ] = []);
            orig = fn;

            if ( Physics.util.isObject( scope ) ){

                fn = Physics.util.bind( fn, scope );
                fn._bindfn_ = orig;
                fn._one_ = orig._one_;
                fn._scope_ = scope;

            } else if ( priority === undefined ) {

                priority = scope;
            }

            fn._priority_ = priority === undefined ? defaultPriority : priority;

            idx = Physics.util.sortedIndex( listeners, fn, getPriority );

            listeners.splice( idx, 0, fn );
            return this;
        },

        /**
         * Physics.util.pubsub#off( topic, fn[, scope] ) -> this
         * Physics.util.pubsub#off( topicCfg ) -> this
         * - topic (String): topic The topic name. Specify `true` to remove all listeners for all topics
         * - topicCfg (Object): A config with key/value pairs of `{ topic: callbackFn, ... }`
         * - fn (Function): The original callback function. Specify `true` to remove all listeners for specified topic
         * - scope (Object): The scope the callback was bound to. This is important if you are binding methods that come from object prototypes.
         *
         * Unsubscribe callback(s) from topic(s).
         **/
        off: function( topic, fn, scope ){

            var listeners
                ,listn
                ;

            if ( !this._topics ){
                // nothing subscribed
                return this;
            }

            if ( topic === true ){
                // purge all listeners
                this._topics = {};
                return this;
            }

            // check if we're subscribing to multiple topics
            // with an object
            if ( Physics.util.isObject( topic ) ){

                for ( var t in topic ){

                    this.off( t, topic[ t ] );
                }

                return this;
            }

            listeners = this._topics[ topic ];

            if (!listeners){
                return this;
            }

            if ( fn === true ){
                // purge all listeners for topic
                this._topics[ topic ] = [];
                return this;
            }

            for ( var i = 0, l = listeners.length; i < l; i++ ){

                listn = listeners[ i ];

                if (
                    (listn._bindfn_ === fn || listn === fn) &&
                    ( (!scope) || listn._scope_ === scope) // check the scope too if specified
                ){
                    listeners.splice( i, 1 );
                    break;
                }
            }

            return this;
        },

        /**
         * Physics.util.pubsub#emit( topic[, data] ) -> this
         * - topic (String): The topic name
         * - data (Mixed): The data to send
         *
         * Publish data to a topic.
         **/
        emit: function( topic, data ){

            if ( !this._topics ){
                // nothing subscribed
                return this;
            }

            var listeners = this._topics[ topic ]
                ,l = listeners && listeners.length
                ,handler
                ,e
                ,scratch = Physics.scratchpad()
                ;

            if ( !l ){
                return scratch.done(this);
            }

            e = scratch.event();
            // event data
            e.topic = topic;
            e.handler = handler;

            // reverse iterate so priorities work out correctly
            while ( l-- ){

                handler = listeners[ l ];
                handler( data, e );

                // if _one_ flag is set, the unsubscribe
                if ( handler._one_ ){
                    listeners.splice( l, 1 );
                }
            }

            return scratch.done(this);
        },

        /**
         * Physics.util.pubsub#one( topic, fn( data, event )[, scope, priority] ) -> this
         * Physics.util.pubsub#one( topicConfig[, scope, priority] ) -> this
         * - topic (String): The topic name
         * - topicConfig (Object): A config with key/value pairs of `{ topic: callbackFn, ... }`
         * - fn (Function): The callback function (if not using Object as previous argument)
         * - data (Mixed): The data sent from the call to `.emit()`
         * - event (Object): Event data, holding `.topic`, the topic, and `.handler`, the `fn` callback.
         * - scope (Object): The scope to bind callback to
         * - priority (Number): The priority of the callback (higher is earlier)
         *
         * Subscribe callback(s) to a topic(s), but only ONCE.
         **/
        one: function( topic, fn, scope ){

            // check if we're subscribing to multiple topics
            // with an object
            if ( Physics.util.isObject( topic ) ){

                for ( var t in topic ){

                    this.one( t, topic[ t ], fn, scope );
                }

                return this;
            }

            // set the _one_ flag
            fn._one_ = true;
            this.on( topic, fn, scope );

            return this;
        }
    };

    Physics.util.pubsub = PubSub;
})();


// ---
// inside: src/util/ticker.js

/**
 * class Physics.util.ticker
 *
 * The Ticker _singleton_ for easily binding callbacks to animation loops (requestAnimationFrame).
 *
 * Requires window.requestAnimationFrame... so polyfill it if you need to.
 **/
(function(window){

    var active = true
        ,ps = Physics.util.pubsub()
        ,perf = window.performance
        ;

    function now(){
        // http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision
        return (perf && perf.now) ?
            (perf.now() + perf.timing.navigationStart) :
            Date.now();
    }

    /*
     * step( time )
     * - time (Number): The current time
     *
     * Publish a tick to subscribed callbacks
     */
    function step(){

        var time;

        window.requestAnimationFrame( step );

        if (!active){
            return;
        }

        time = now();

        if (!time){
            return;
        }

        ps.emit( 'tick', time );
    }

    // start stepping if we can
    if ( window.requestAnimationFrame ){
        step();
    } else {
        active = false;
    }

    /**
     * Physics.util.ticker.start() -> this
     *
     * Start the ticker
     **/
    function start(){

        active = true;
        return this;
    }

    /**
     * Physics.util.ticker.stop() -> this
     *
     * Stop the ticker
     **/
    function stop(){

        active = false;
        return this;
    }

    /**
     * Physics.util.ticker.on( listener( time ) ) -> this
     * - listener (Function): The callback function
     * - time (Number): The current timestamp
     *
     * Subscribe a callback to the ticker.
     **/
    function on( listener ){

        ps.on('tick', listener);
        return this;
    }

    /**
     * Physics.util.ticker.off( listener ) -> this
     * - listener (Function): The callback function previously bound
     *
     * Unsubscribe a callback from the ticker.
     **/
    function off( listener ){

        ps.off('tick', listener);
        return this;
    }

    /**
     * Physics.util.ticker.isActive() -> Boolean
     * + (Boolean): `true` if running, `false` otherwise.
     *
     * Determine if ticker is currently running.
     **/
    function isActive(){

        return !!active;
    }

    // API
    Physics.util.ticker = {
        now: now,
        start: start,
        stop: stop,
        on: on,
        off: off,
        isActive: isActive
    };

}(this));


// ---
// inside: src/core/query.js

(function (window) {

    /*
     * Group helpers
     */
    var fnTrue = function(){ return !0; }; // return true
    
    var indexOf = Physics.util.indexOf;

    /** hide
     * wrapRule( fn( propVal ), prop ) -> Function
     * - fn (Function): The test function
     * - prop (String): The property name to test
     * - propVal (Mixed): The property value
     * 
     * Get test function to test on sub property.
     **/
    var wrapRule = function wrapRule( fn, prop ){
        return function( thing ){
            return fn( thing[ prop ] );
        };
    };

    /** hide
     * $eq( toMatch[, prop] ) -> Function
     * - toMatch (Mixed): The value to match
     * - prop (String): The property name to test
     * 
     * Get an equality test function.
     **/
    var $eq = function $eq( toMatch, prop ){
        return function( thing ){
            
            thing = prop ? thing[ prop ] : thing;

            var fr = 0
                ,bk
                ;
            
            if ( Physics.util.isArray( thing ) ){

                if ( Physics.util.isArray( toMatch ) ){
                    // match all
                    bk = thing.length;

                    // check lengths
                    if ( bk !== toMatch.length ){
                        return false;
                    }

                    while ( fr < bk ){
                        bk--;
                        if (
                            // check front
                            (indexOf(toMatch, thing[ fr ]) === -1) ||
                            // check back
                            (indexOf(toMatch, thing[ bk ]) === -1)
                        ) {
                            return false;
                        }
                        fr++;
                    }
                    return true;
                } else {
                    // find in array
                    return (indexOf( thing, toMatch ) > -1);
                }
            }

            // exact match
            return (thing === toMatch);
        };
    };

    /** hide
     * $ne( toMatch[, prop] ) -> Function
     * - toMatch (Mixed): The value to match
     * - prop (String): The property name to test
     * 
     * Get a NOT equality test function.
     **/
    var $ne = function $ne( toMatch, prop ){
        var fn = $eq( toMatch, prop );
        return function( thing ){
            return !fn( thing );
        };
    };

    /** hide
     * $in( toMatch[, prop] ) -> Function
     * - toMatch (Array): The array to match
     * - prop (String): The property name to test
     * 
     * Get a test function for matching ANY in array
     **/
    var $in = function $in( toMatch, prop ){
        return function( thing ){

            thing = prop ? thing[ prop ] : thing;
            
            var fr = 0
                ,bk
                ;

            if ( Physics.util.isArray( thing ) ){
                bk = thing.length;

                while( fr < bk ){
                    bk--;
                    if (
                        // check front
                        (indexOf(toMatch, thing[ fr ]) > -1) ||
                        // check back
                        (indexOf(toMatch, thing[ bk ]) > -1)
                    ) {
                        return true;
                    }
                    fr++;
                }
                return false;
            }

            // if thing matches any in array
            return (indexOf(toMatch, thing) > -1);
        };
    };

    /** hide
     * $nin( toMatch[, prop] ) -> Function
     * - toMatch (Array): The array to match
     * - prop (String): The property name to test
     * 
     * Get a test function for matching NOT ANY in array
     **/
    var $nin = function $nin( toMatch, prop ){
        var fn = $in( toMatch, prop );
        return function( thing ){
            return !fn( thing );
        };
    };

    /** hide
     * $at( point ) -> Function
     * - point (Vectorish): The point to check
     * 
     * Get a test function to match any body who's aabb intersects point
     **/
    var $at = function $at( point ){
        point = new Physics.vector( point );
        return function( body ){
            var aabb = body.aabb();
            return Physics.aabb.contains( aabb, point );
        };
    };

    /** hide
     * $and( first ) -> Function
     * - first (Function): First function node. `first.next` should have the next function, and so on.
     * 
     * Get an AND test function.
     **/
    var $and = function $and( first ){
        return first.next ? function( thing ){
            var fn = first;
            while ( fn ){

                if ( !fn( thing ) ){
                    return false;
                }
                fn = fn.next;
            }
            return true;
        } : first;
    };

    /** hide
     * $or( first ) -> Function
     * - first (Function): First function node. `first.next` should have the next function, and so on.
     * 
     * Get an OR test function.
     **/
    var $or = function $or( first ){
        return first.next ? function( thing ){
            var fn = first;
            while ( fn ){

                if ( fn( thing ) ){
                    return true;
                }
                fn = fn.next;
            }
            return false;
        } : first;
    };

    // operation hash
    var operations = {
        // $and and $or are separate
        $eq: $eq
        ,$ne: $ne
        ,$in: $in
        ,$nin: $nin
        ,$at: $at
    };

    /** related to: Physics.world#find
     * Physics.query( rules ) -> Function
     * - rules (Object): The mongodb-like search rules. (See description).
     * + (Function): The test function
     * 
     * Creates a function that can be used to perform tests on objects.
     *
     * The test function will return a [[Boolean]]; `true` if the object matches the tests.
     *
     * Query rules are mongodb-like. You can specify a hash of values to match like this:
     *
     * ```javascript
     * {
     *     foo: 'bar',
     *     baz: 2,
     *     some: {
     *         nested: 'value'
     *     }
     * }
     * ```
     *
     * And they will all need to match (it's an AND rule).
     *
     * You can also use operators for more versatility. The operators you can use include:
     *
     * - $eq: Test if some property is equal to a value (this is done by default, and is thus redundant)
     * - $ne: Test if some property is _NOT_ equal to a value
     * - $in: Test if some value (or array of values) is one of the specified array of values
     * - $nin: Test if some value (or array of values) is _NOT_ one of the specified array of values
     * - $at: Test if a body's [[Physics.aabb]] includes specified point. It's a primative hit-test.
     * 
     * Example:
     *
     * ```javascript
     * var wheelsArray = [];
     * 
     * var queryFn = Physics.query({
     *     name: 'circle', // only circles
     *     $nin: wheelsArray, // not in the wheelsArray
     *     labels: { $in: [ 'player', 'monster' ] } // that have player OR monster labels
     * });
     *
     * var obj = {
     *     name: 'circle',
     *     labels: [ 'round' ]
     * };
     *
     * queryFn( obj ); // -> false
     * // give it a player tag
     * obj.labels.push('player');
     * queryFn( obj ); // -> true
     * // put it inside the wheelsArray
     * wheelsArray.push( obj );
     * queryFn( obj ); // -> false
     * ```
     **/
    var Query = function Query( rules, /* internal use */ $op ){

        var op
            ,l
            ,rule
            ,first
            ,list
            ,fn
            ;

        if ( $op ){
            
            // parse operation choice
            if ( $op === '$or' || $op === '$and' ){

                // expect a rules array
                for ( op = 0, l = rules.length; op < l; ++op ){
                    
                    fn = Query( rules[ op ] );
                    // if first hasn't been set yet, set it and start the list there
                    // otherwise set the next node of the list
                    list = list ? list.next = fn : first = fn;
                }

                return ($op === '$or') ? $or( first ) : $and( first );
            } else if ( op = operations[ $op ] ){

                return op( rules );

            } else {
                // does not compute...
                throw 'Unknown query operation: ' + $op;
            }
        }

        // loop through rules
        for ( op in rules ){
            rule = rules[ op ];
   
            if ( op[0] === '$' ){
                // it's an operation rule
                fn = Query( rule, op );
                
            } else if ( Physics.util.isPlainObject( rule ) ) {
                // it's an object so parse subrules
                fn = wrapRule( Query( rule ), op );
            } else {
                // simple equality rule
                fn = $eq( rule, op );
            }

            // if first hasn't been set yet, set it and start the list there
            // otherwise set the next node of the list
            list = list ? list.next = fn : first = fn;
        }

        // return the rules test
        return $and( first || fnTrue );
    };

    Physics.query = Query;

})(this);


// ---
// inside: src/core/behavior.js

(function(){

    var defaults = {
        priority: 0
    };

    /** related to: Physics.util.decorator
     * Physics.behavior( name[, options] ) -> Behavior
     * - name (String): The name of the behavior to create
     * - options (Object): The configuration for that behavior ( depends on behavior ).
       Available options and defaults:
       
       ```javascript
        {
           priority: 0 // the priority of this body
        }
       ```
     *
     * Factory function for creating Behaviors.
     *
     * Visit [the PhysicsJS wiki on Behaviors](https://github.com/wellcaffeinated/PhysicsJS/wiki/Behaviors)
     * for usage documentation.
     **/
    Physics.behavior = Decorator('behavior', {

        /** belongs to: Physics.behavior
         * class Behavior
         *
         * The base class for behaviors created by [[Physics.behavior]] factory function.
         **/

        /** internal
         * Behavior#init( options )
         * - options (Object): The configuration options passed by the factory
         * 
         * Initialization. Internal use.
         **/
        init: function( options ){
            
            /** related to: Physics.util.options
             * Behavior#options( options ) -> Object
             * - options (Object): The options to set as an object
             * + (Object): The options
             * 
             * Set options on this instance. 
             * 
             * Access options directly from the options object.
             * 
             * Example:
             *
             * ```javascript
             * this.options.someOption;
             * ```
             * 
             **/
            this.options = Physics.util.options( defaults );
            this.options( options );
        },

        /**
         * Behavior#applyTo( arr ) -> this
         * - arr (Array): Array of bodies to apply this behavior to. Specify `true` for all objects in world.
         * 
         * Apply the behavior to a group of bodies.
         **/
        applyTo: function( arr ){

            if ( arr === true ){
                this._targets = null;
            } else {
                this._targets = Physics.util.uniq( arr );
            }
            return this;
        },

        /**
         * Behavior#getTargets() -> Array
         * + (Array): The array of bodies (by reference!) this behavior is applied to.
         * 
         * Get the array of bodies (by reference!) this behavior is applied to.
         **/
        getTargets: function(){
            
            return this._targets || ( this._world ? this._world._bodies : [] );
        },

        /**
         * Behavior#setWorld( world ) -> this
         * - world (Object): The world (or null)
         *
         * Set which world to apply to.
         *
         * Usually this is called internally. Shouldn't be a need to call this yourself usually.
         **/
        setWorld: function( world ){

            if ( this.disconnect && this._world ){
                this.disconnect( this._world );
            }

            this._world = world;

            if ( this.connect && world ){
                this.connect( world );
            }

            return this;
        },

        /**
         * Behavior#connect( world )
         * - world (Physics.world): The world to connect to
         * 
         * Connect to a world.
         *
         * Extend this when creating behaviors if you need to specify pubsub management.
         * Automatically called when added to world by the [[Behavior#setWorld]] method.
         **/
        connect: function( world ){

            if (this.behave){
                world.on('integrate:positions', this.behave, this, this.options.priority);
            }
        },

        /**
         * Behavior#disconnect( world )
         * - world (Physics.world): The world to disconnect from
         * 
         * Disconnect from a world.
         *
         * Extend this when creating behaviors if you need to specify pubsub management.
         * Automatically called when added to world by the [[Behavior#setWorld]] method.
         **/
        disconnect: function( world ){

            if (this.behave){
                world.off('integrate:positions', this.behave, this);
            }
        },

        /**
         * Behavior#behave( data )
         * - data (Object): The pubsub `integrate:positions` event data
         * 
         * Default method run on every world integration.
         *
         * You _must_ extend this when creating a behavior,
         * unless you extend the [[Behavior#connect]] and [[Behavior#disconnect]] methods.
         **/
        behave: null
    });

}());

// ---
// inside: src/core/body.js

(function(){

    var defaults = {

        // is the body hidden (not to be rendered)?
        hidden: false,
        // is the body `dynamic`, `kinematic` or `static`?
        // http://www.box2d.org/manual.html#_Toc258082973
        treatment: 'dynamic',
        // body mass
        mass: 1.0,
        // body restitution. How "bouncy" is it?
        restitution: 1.0,
        // what is its coefficient of friction with another surface with COF = 1?
        cof: 0.8,
        // what is the view object (mixed) that should be used when rendering?
        view: null
    };

    var uidGen = 1;

    var Pi2 = Math.PI * 2;
    function cycleAngle( ang ){
        return ((ang % Pi2) + Pi2) % Pi2;
    }

    /** related to: Physics.util.decorator
     * Physics.body( name[, options] ) -> Body
     * - name (String): The name of the body to create
     * - options (Object): The configuration for that body ( depends on body ).
       Available options and defaults:

       ```javascript
        {
            // is the body hidden (not to be rendered)?
            hidden: false,
            // is the body `dynamic`, `kinematic` or `static`?
            // http://www.box2d.org/manual.html#_Toc258082973
            treatment: 'dynamic',
            // body mass
            mass: 1.0,
            // body restitution. How "bouncy" is it?
            restitution: 1.0,
            // what is its coefficient of friction with another surface with COF = 1?
            cof: 0.8,
            // what is the view object (mixed) that should be used when rendering?
            view: null,
            // the vector offsetting the geometry from its center of mass
            offset: Physics.vector(0,0)
        }
       ```
     *
     * Factory function for creating Bodies.
     *
     * Visit [the PhysicsJS wiki on Bodies](https://github.com/wellcaffeinated/PhysicsJS/wiki/Bodies)
     * for usage documentation.
     **/
    Physics.body = Decorator('body', {

        /** belongs to: Physics.body
         * class Body
         *
         * The base class for bodies created by [[Physics.body]] factory function.
         **/

        /** internal
         * Body#init( options )
         * - options (Object): The configuration options passed by the factory
         *
         * Initialization. Internal use.
         **/
        init: function( options ){

            var self = this;
            var vector = Physics.vector;

            /** related to: Physics.util.options
             * Body#options( options ) -> Object
             * - options (Object): The options to set as an object
             * + (Object): The options
             *
             * Set options on this instance.
             *
             * Access options directly from the options object.
             *
             * Example:
             *
             * ```javascript
             * this.options.someOption;
             * ```
             *
             **/
            // all options get copied onto the body.
            this.options = Physics.util.options( defaults, this );
            this.options.onChange(function( opts ){
                self.offset = new vector( opts.offset );
            });
            this.options( options );

            /**
             * Body#state
             *
             * The physical state container.
             *
             * - ``this.state.pos`` ([[Physics.vector]]) The position vector.
             * - ``this.state.vel`` ([[Physics.vector]]) The velocity vector.
             * - ``this.state.acc`` ([[Physics.vector]]) The acceleration vector.
             * - ``this.state.angular.pos`` ([[Number]]) The angular position (in radians, positive is clockwise starting along the x axis)
             * - ``this.state.angular.vel`` ([[Number]]) The angular velocity
             * - ``this.state.angular.acc`` ([[Number]]) The angular acceleration
             *
             * Properties from the previous timestep are stored in:
             * ```javascript
             * this.state.old; // .pos, .vel, ...
             * ```
             **/
            this.state = {
                pos: new vector( this.x, this.y ),
                vel: new vector( this.vx, this.vy ),
                acc: new vector(),
                angular: {
                    pos: this.angle || 0.0,
                    vel: this.angularVelocity || 0.0,
                    acc: 0.0
                },
                old: {
                    pos: new vector(),
                    vel: new vector(),
                    acc: new vector(),
                    angular: {
                        pos: 0.0,
                        vel: 0.0,
                        acc: 0.0
                    }
                }
            };

            // private storage for sleeping
            this._sleepAngPosMean = 0;
            this._sleepAngPosVariance = 0;
            this._sleepPosMean = new vector();
            this._sleepPosVariance = new vector();
            this._sleepMeanK = 0;

            // cleanup
            delete this.x;
            delete this.y;
            delete this.vx;
            delete this.vy;
            delete this.angle;
            delete this.angularVelocity;

            if (this.mass === 0){
                throw "Error: Bodies must have non-zero mass";
            }

            /**
             * Body#uid = Number
             *
             * The unique id for the body
             **/
            this.uid = uidGen++;

            /** related to: Physics.geometry
             * Body#geometry
             *
             * The geometry for this body.
             *
             * By default it is a `point` geometry which gets overridden.
             **/
            this.geometry = Physics.geometry('point');

            /**
             * Body#mass = 1.0
             *
             * The mass.
             **/

            /**
             * Body#offset
             *
             * The vector offsetting the body's shape from its center of mass.
             **/

             /**
              * Body#restitution = 1.0
              *
              * The restitution.
              *
              * This is the "bounciness" of the body.
              * It's a number between `0` and `1`.
              *
              * A restitution of 1 is the bounciest.
              *
              * A restitution of 0 is not bouncy.
              *
              * When colliding the restitutions of bodies are
              * multiplied together to get the restitution between two
              * bodies.
              *
              **/

              /**
               * Body#cof = 0.8
               *
               * The coefficient of friction of the body.
               *
               * It's how much "slide" it has during collisions.
               *
               * A `cof` of `0` will really slidy.
               *
               * A `cof` of `1` has no slide.
               *
               * This is a very simplistic implementation at the moment.
               * What would be better is to have both static and kinetic
               * friction. But that's not done yet.
               **/

               /**
                * Body#treatment = String
                *
                * How the body is treated by the simulation.
                *
                * The body can be `dynamic`, `kinematic` or `static` as
                * described by the [analogous box2d docs](http://www.box2d.org/manual.html#_Toc258082973).
                *
                * * _dynamic_ bodies are treated "normally". They are integrated, and collide, and all that.
                * * _kinematic_ bodies are bodies that move at a specified velocity. Other bodies collide with them, but they don't bounce off of other bodies.
                * * _static_ bodies just stand still. They are like obstacles.
                **/

                /**
                 * Body#hidden = false
                 *
                 * Determines whether the body should be hidden by the renderer.
                 **/

                /** related to: Physics.renderer
                 * Body#view = it_depends
                 *
                 * Storage for use by the renderer.
                 *
                 * The type of renderer will put different things in the view property.
                 * Basically, this is how the body "looks". It could be a HTMLElement, or
                 * an Image, etc...
                 *
                 * If your body changes appearance (shape), you should modify this somehow
                 * otherwise the renderer will keep using this same view. If you're letting
                 * the renderer create the view for you, just set this to `undefined` if the
                 * body gets modified in shape during the simulation.
                 **/

                /** related to: Physics.renderer
                 * Body#styles
                 *
                 * The styles the renderer should use for creating the view.
                 *
                 * The styles depend on the renderer. See [[Renderer#createView]] for style options.
                 **/
        },

        /**
         * Body#sleep( [dt] ) -> Boolean
         * - dt (Number): Time to advance the idle time
         * - dt (Boolean): If `true`, the body will be forced to sleep. If `false`, the body will be forced to awake.
         *
         * Get and/or set whether the body is asleep.
         *
         * If called with a time (in ms), the time will be added to the idle time and sleep conditions will be checked.
         **/
        sleep: function( dt ){

            if ( dt === true ){
                // force sleep
                this.asleep = true;

            } else if ( dt === false ){
                // force wakup
                this.asleep = false;
                this._sleepMeanK = 0;
                this._sleepAngPosMean = 0;
                this._sleepAngPosVariance = 0;
                this._sleepPosMean.zero();
                this._sleepPosVariance.zero();
                this.sleepIdleTime = 0;

            } else if ( dt && !this.asleep ) {

                this.sleepCheck( dt );
            }

            return this.asleep;
        },

        /**
         * Body#sleepCheck( [dt] )
         * - dt (Number): Time to advance the idle time
         *
         * Check if the body should be sleeping.
         *
         * Call with no arguments if some event could possibly wake up the body. This will force the body to recheck.
         **/
        sleepCheck: function( dt ){

            var opts = this._world && this._world.options;

            // if sleeping disabled. stop.
            if ( this.sleepDisabled || (opts && opts.sleepDisabled) ){
                return;
            }

            var limit
                ,v
                ,d
                ,r
                ,aabb
                ,scratch = Physics.scratchpad()
                ,diff = scratch.vector()
                ,diff2 = scratch.vector()
                ,kfac
                ,stats
                ;

            dt = dt || 0;
            aabb = this.geometry.aabb();
            r = Math.max(aabb.hw, aabb.hh);

            if ( this.asleep ){
                // check velocity
                v = this.state.vel.norm() + Math.abs(r * this.state.angular.vel);
                limit = this.sleepSpeedLimit || (opts && opts.sleepSpeedLimit) || 0;

                if ( v >= limit ){
                    this.sleep( false );
                    return scratch.done();
                }
            }

            this._sleepMeanK++;
            kfac = this._sleepMeanK > 1 ? 1/(this._sleepMeanK - 1) : 0;
            Physics.statistics.pushRunningVectorAvg( this.state.pos, this._sleepMeanK, this._sleepPosMean, this._sleepPosVariance );
            // we take the sin because that maps the discontinuous angle to a continuous value
            // then the statistics calculations work better
            stats = Physics.statistics.pushRunningAvg( Math.sin(this.state.angular.pos), this._sleepMeanK, this._sleepAngPosMean, this._sleepAngPosVariance );
            this._sleepAngPosMean = stats[0];
            this._sleepAngPosVariance = stats[1];
            v = this._sleepPosVariance.norm() + Math.abs(r * Math.asin(stats[1]));
            v *= kfac;
            limit = this.sleepVarianceLimit || (opts && opts.sleepVarianceLimit) || 0;
            // console.log(v, limit, kfac, this._sleepPosVariance.norm(), stats[1])
            if ( v <= limit ){
                // check idle time
                limit = this.sleepTimeLimit || (opts && opts.sleepTimeLimit) || 0;
                this.sleepIdleTime = (this.sleepIdleTime || 0) + dt;

                if ( this.sleepIdleTime > limit ){
                    this.asleep = true;
                }
            } else {
                this.sleep( false );
            }

            scratch.done();
        },

        /**
         * Body#setWorld( world ) -> this
         * - world (Object): The world (or null)
         *
         * Set which world to apply to.
         *
         * Usually this is called internally. Shouldn't be a need to call this yourself usually.
         **/
        setWorld: function( world ){

            if ( this.disconnect && this._world ){
                this.disconnect( this._world );
            }

            this._world = world;

            if ( this.connect && world ){
                this.connect( world );
            }

            return this;
        },

        /**
         * Body#accelerate( acc ) -> this
         * - acc (Physics.vector): The acceleration vector
         *
         * Accelerate the body by adding supplied vector to its current acceleration
         **/
        accelerate: function( acc ){

            if ( this.treatment === 'dynamic' ){
                this.state.acc.vadd( acc );
            }

            return this;
        },

        /**
         * Body#applyForce( force[, p] ) -> this
         * - force (Vectorish): The force vector
         * - p (Vectorish): The point vector from the COM at which to apply the force
         *
         * Apply a force at center of mass, or at point `p` relative to the center of mass
         **/
        applyForce: function( force, p ){

            if ( this.treatment !== 'dynamic' ){
                return this;
            }

            var scratch = Physics.scratchpad()
                ,r = scratch.vector()
                ,state
                ;

            // if no point at which to apply the force... apply at center of mass
            if ( p && this.moi ){

                // apply torques
                state = this.state;
                r.clone( p );
                // r cross F
                this.state.angular.acc -= r.cross( force ) / this.moi;
            }

            this.accelerate( r.clone( force ).mult( 1/this.mass ) );

            scratch.done();
            return this;
        },

        /** related to: Body#offset
         * Body#getGlobalOffset( [out] ) -> Physics.vector
         * - out (Physics.vector): A vector to use to put the result into. One is created if `out` isn't specified.
         * + (Physics.vector): The offset in global coordinates
         *
         * Get the body offset vector (from the center of mass) for the body's shape in global coordinates.
         **/
        getGlobalOffset: function( out ){

            out = out || new Physics.vector();
            out.clone( this.offset ).rotate( this.state.angular.pos );
            return out;
        },

        /** related to: Physics.aabb
         * Body#aabb() -> Object
         * + (Object): The aabb of this body
         *
         * Get the Axis aligned bounding box for the body in its current position and rotation
         **/
        aabb: function(){

            var angle = this.state.angular.pos
                ,scratch = Physics.scratchpad()
                ,v = scratch.vector()
                ,aabb = this.geometry.aabb( angle )
                ;

            this.getGlobalOffset( v );

            aabb.x += this.state.pos._[0] + v._[0];
            aabb.y += this.state.pos._[1] + v._[1];

            return scratch.done( aabb );
        },

        /**
         * Body#toBodyCoords( v ) -> Physics.vector
         * - v (Physics.vector): The vector to transform
         * + (Physics.vector): The transformed vector
         *
         * Transform a vector into coordinates relative to this body.
         **/
        toBodyCoords: function( v ){
            return v.vsub( this.state.pos ).rotate( -this.state.angular.pos );
        },

        /**
          * Body#toWorldCoords( v ) -> Physics.vector
          * - v (Physics.vector): The vector to transform
          * + (Physics.vector): The transformed vector
          *
          * Transform a vector from body coordinates into world coordinates.
          **/
        toWorldCoords: function( v ){
            return v.rotate( this.state.angular.pos ).vadd( this.state.pos );
        },

        /**
         * Body#recalc() -> this
         *
         * Recalculate properties.
         *
         * Intended to be overridden by subclasses. Call when body physical properties are changed.
         **/
        recalc: function(){
            // override to recalculate properties
            return this;
        }
    });

    /**
     * Body.getCOM( bodies[, com] ) -> Physics.vector
     * - bodies (Array): The list of bodies
     * - com (Physics.vector): The vector to put result into. A new vector will be created if not provided.
     * + (Physics.vector): The center of mass position
     *
     * Get center of mass position from list of bodies.
     **/
    Physics.body.getCOM = function( bodies, com ){
        // @TODO add a test for this fn
        var b
            ,pos
            ,i
            ,l = bodies && bodies.length
            ,M = 0
            ;

        com = com || new Physics.vector();

        if ( !l ){
            return com.zero();
        }

        if ( l === 1 ){
            return com.clone( bodies[0].state.pos );
        }

        com.zero();

        for ( i = 0; i < l; i++ ){
            b = bodies[ i ];
            pos = b.state.pos;
            com.add( pos._[0] * b.mass, pos._[1] * b.mass );
            M += b.mass;
        }

        com.mult( 1 / M );

        return com;
    };

}());


// ---
// inside: src/core/geometry.js

(function(){
    /** related to: Physics.util.decorator
     * Physics.geometry( name[, options] ) -> Geometry
     * - name (String): The name of the geometry to create
     * - options (Object): The configuration for that geometry ( depends on geometry ).
     *
     * Factory function for creating Geometries.
     *
     * Visit [the PhysicsJS wiki on Geometries](https://github.com/wellcaffeinated/PhysicsJS/wiki/Geometries)
     * for usage documentation.
     **/
    Physics.geometry = Decorator('geometry', {

        /** belongs to: Physics.geometry
         * class Geometry
         *
         * The base class for geometries created by [[Physics.geometry]] factory function.
         **/

        /** internal
         * Geometry#init( options )
         * - options (Object): The configuration options passed by the factory
         * 
         * Initialization. Internal use.
         **/
        init: function( options ){

            /** related to: Physics.util.options
             * Geometry#options( options ) -> Object
             * - options (Object): The options to set as an object
             * + (Object): The options
             * 
             * Set options on this instance. 
             * 
             * Access options directly from the options object.
             * 
             * Example:
             *
             * ```javascript
             * this.options.someOption;
             * ```
             * 
             **/
            this.options = Physics.util.options();
            this.options( options );

            this._aabb = new Physics.aabb();
        },
        
        /** related to: Physics.aabb
         * Geometry#aabb( angle ) -> Object
         * - angle (Number): The angle to rotate the geometry
         * + (Object): Bounding box values
         * 
         * Get axis-aligned bounding box for this object (rotated by angle if specified).
         **/
        aabb: function( angle ){

            return Physics.aabb.clone(this._aabb);
        },

        /**
         * Geometry#getFarthestHullPoint( dir[, result] ) -> Physics.vector
         * - dir (Physics.vector): Direction to look
         * - result (Physics.vector): A vector to write result to. Speeds up calculations.
         * + (Physics.vector): The farthest hull point in local coordinates
         * 
         * Get farthest point on the hull of this geometry
         * along the direction vector `dir`
         * returns local coordinates. Replaces result if provided.
         *
         * Assume all coordinates are relative to the geometry 
         * centroid (IE: in the body frame).
         * 
         * This should take a direction vector then it should
         * calculate the location (in that frame of reference)
         * of the point on the perimeter (hull) if you traveled
         * in a straight line from the centroid in the provided
         * direction. The result should be returned/set just like
         * it is in the other geometries.
         **/
        getFarthestHullPoint: function( dir, result ){

            result = result || new Physics.vector();

            // not implemented.
            return result.set( 0, 0 );
        },

        /** related to: Geometry#getFarthestHullPoint
         * Geometry#getFarthestCorePoint( dir[, result] ) -> Physics.vector
         * - dir (Physics.vector): Direction to look
         * - result (Physics.vector): A vector to write result to. Speeds up calculations.
         * + (Physics.vector): The farthest hull point in local coordinates
         * 
         * Get farthest point on the core shape of this geometry
         * along the direction vector `dir`
         * returns local coordinates. Replaces result if provided.
         *
         * This does almost the same thing as [[Geometry#getFarthestHullPoint]]
         * but shrinks the shape by subtracting "margin" from it.
         * Return the position of the point on the "core" shape.
         **/
        getFarthestCorePoint: function( dir, result, margin ){

            result = result || new Physics.vector();

            // not implemented.
            return result.set( 0, 0 );
        }
    });

}());

// ---
// inside: src/core/geometry-helpers.js

/*
 * Geometry helper functions
 */

/**
 * Physics.geometry.regularPolygonVertices( sides, radius ) -> Array
 * - sides (Number): Number of sides the polygon has
 * - radius (Number): Size from center to a vertex
 * + (Array): A list of [[Vectorish]] objects representing the vertices
 *
 * Generate a list of vertices for a regular polygon of any number of sides.
 **/
Physics.geometry.regularPolygonVertices = function( sides, radius ){
    var verts = []
        ,angle = Math.PI * 2 / sides
        ,a = 0
        ,i
        ;

    for ( i = 0; i < sides; i++ ){
        verts.push({
            x: radius * Math.cos( a )
            ,y: radius * Math.sin( a )
        });

        a += angle;
    }

    return verts;
};

/**
 * Physics.geometry.isPolygonConvex( hull ) -> Boolean
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Boolean): `true` if the polygon is convex. `false` otherwise.
 *
 * Determine if polygon hull is convex
 **/
Physics.geometry.isPolygonConvex = function( hull ){

    var scratch = Physics.scratchpad()
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,tmp = scratch.vector()
        ,ret = true
        ,sign = false
        ,l = hull.length
        ;

    if ( !hull || !l ){
        return false;
    }

    if ( l < 3 ){
        // it must be a point or a line...
        // which are convex
        scratch.done();
        return ret;
    }

    prev.clone( hull[ 0 ] ).vsub( tmp.clone( hull[ l - 1 ] ) );

    // loop over the edges of the hull and construct vectors of the current
    // edge and retain the last edge
    // add two to the length to do a full cycle
    for ( var i = 1; i <= l; ++i ){

        next.clone( hull[ i % l ] ).vsub( tmp.clone( hull[ (i - 1) % l ] ) );

        if ( sign === false ){

            // first check the sign of the first cross product
            sign = prev.cross( next );

        } else if ( (sign > 0) ^ (prev.cross( next ) > 0) ){

            // if the cross products are different signs it's not convex
            ret = false;
            break;
        }

        // remember the last edge
        next.swap( prev );
    }

    scratch.done();
    return ret;
};

/**
 * Physics.geometry.getPolygonMOI( hull ) -> Number
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Number): The polygon's moment of inertia
 *
 * Gets the moment of inertia of a convex polygon
 *
 * See [List of moments of inertia](http://en.wikipedia.org/wiki/List_of_moments_of_inertia)
 * for more information.
 *
 * _Note_: we make the following assumpations:
 * * mass is unitary (== 1)
 * * axis of rotation is the origin
 **/
Physics.geometry.getPolygonMOI = function( hull ){

    var scratch = Physics.scratchpad()
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,num = 0
        ,denom = 0
        ,tmp
        ,l = hull.length
        ;

    if ( l < 2 ){
        // it must be a point
        // moi = 0
        scratch.done();
        return 0;
    }

    if ( l === 2 ){
        // it's a line
        // get length squared
        tmp = next.clone( hull[ 1 ] ).distSq( prev.clone( hull[ 0 ] ) );
        scratch.done();
        return tmp / 12;
    }

    prev.clone( hull[ 0 ] );

    for ( var i = 1; i < l; ++i ){

        next.clone( hull[ i ] );

        tmp = Math.abs( next.cross( prev ) );
        num += tmp * ( next.normSq() + next.dot( prev ) + prev.normSq() );
        denom += tmp;

        prev.swap( next );
    }

    scratch.done();
    return num / ( 6 * denom );
};

/**
 * Physics.geometry.isPointInPolygon( pt, hull ) -> Boolean
 * - pt (Vectorish): The point to test
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Boolean): `true` if point `pt` is inside the polygon
 *
 * Check if point is inside polygon hull.
 **/
Physics.geometry.isPointInPolygon = function( pt, hull ){

    var scratch = Physics.scratchpad()
        ,point = scratch.vector().clone( pt )
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,ang = 0
        ,l = hull.length
        ;

    if ( l < 2 ){
        // it's a point...
        ang = point.equals( prev.clone( hull[ 0 ] ));
        scratch.done();
        return ang;
    }

    if ( l === 2 ){
        // it's a line
        ang = point.angle( prev.clone( hull[ 0 ] ));
        ang += point.angle( prev.clone( hull[ 1 ] ));
        scratch.done();
        return ( Math.abs(ang) === Math.PI );
    }

    prev.clone( hull[ 0 ] ).vsub( point );

    // calculate the sum of angles between vector pairs
    // from point to vertices
    for ( var i = 1; i <= l; ++i ){

        next.clone( hull[ i % l ] ).vsub( point );
        ang += next.angle( prev );
        prev.swap( next );
    }

    scratch.done();
    return ( Math.abs(ang) > 1e-6 );
};

/**
 * Physics.geometry.getPolygonArea( hull ) -> Number
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Number): The area (positive for clockwise ordering)
 *
 * Get the signed area of the polygon.
 **/
Physics.geometry.getPolygonArea = function getPolygonArea( hull ){

    var scratch = Physics.scratchpad()
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,ret = 0
        ,l = hull.length
        ;

    if ( l < 3 ){
        // it must be a point or a line
        // area = 0
        scratch.done();
        return 0;
    }

    prev.clone( hull[ l - 1 ] );

    for ( var i = 0; i < l; ++i ){

        next.clone( hull[ i ] );

        ret += prev.cross( next );

        prev.swap( next );
    }

    scratch.done();
    return ret / 2;
};

/**
 * Physics.geometry.getPolygonCentroid( hull ) -> Physics.vector
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Physics.vector): The centroid
 *
 * Get the coordinates of the centroid.
 **/
Physics.geometry.getPolygonCentroid = function getPolygonCentroid( hull ){

    var scratch = Physics.scratchpad()
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,ret = new Physics.vector()
        ,tmp
        ,l = hull.length
        ;

    if ( l < 2 ){
        // it must be a point
        scratch.done();
        return new Physics.vector( hull[0] );
    }

    if ( l === 2 ){
        // it's a line
        // get the midpoint
        scratch.done();
        return new Physics.vector((hull[ 1 ].x + hull[ 0 ].x)/2, (hull[ 1 ].y + hull[ 0 ].y)/2 );
    }

    prev.clone( hull[ l - 1 ] );

    for ( var i = 0; i < l; ++i ){

        next.clone( hull[ i ] );

        tmp = prev.cross( next );
        prev.vadd( next ).mult( tmp );
        ret.vadd( prev );

        prev.swap( next );
    }

    tmp = 1 / (6 * Physics.geometry.getPolygonArea( hull ));

    scratch.done();
    return ret.mult( tmp );
};

/**
 * Physics.geometry.nearestPointOnLine( pt, linePt1, linePt2 ) -> Physics.vector
 * - pt (Vectorish): The point
 * - linePt1 (Vectorish): The first endpoint of the line
 * - linePt2 (Vectorish): The second endpoint of the line
 * + (Vector): The closest point
 *
 * Get the closest point on a discrete line to specified point.
 **/
Physics.geometry.nearestPointOnLine = function nearestPointOnLine( pt, linePt1, linePt2 ){

    var scratch = Physics.scratchpad()
        ,p = scratch.vector().clone( pt )
        ,A = scratch.vector().clone( linePt1 ).vsub( p )
        ,L = scratch.vector().clone( linePt2 ).vsub( p ).vsub( A )
        ,lambdaB
        ,lambdaA
        ;

    if ( L.equals(Physics.vector.zero) ){
        // oh.. it's a zero vector. So A and B are both the closest.
        // just use one of them
        scratch.done();
        return new Physics.vector( linePt1 );
    }

    lambdaB = - L.dot( A ) / L.normSq();
    lambdaA = 1 - lambdaB;

    if ( lambdaA <= 0 ){
        // woops.. that means the closest simplex point
        // isn't on the line it's point B itself
        scratch.done();
        return new Physics.vector( linePt2 );
    } else if ( lambdaB <= 0 ){
        // vice versa
        scratch.done();
        return new Physics.vector( linePt1 );
    }

    // guess we'd better do the math now...
    p = new Physics.vector( linePt2 ).mult( lambdaB ).vadd( A.clone( linePt1 ).mult( lambdaA ) );
    scratch.done();
    return p;
};


// ---
// inside: src/core/integrator.js

(function(){

    var defaults = {

        // drag applied during integration
        // 0 means vacuum
        // 0.9 means molasses
        drag: 0
    };

    /** related to: Physics.util.decorator
     * Physics.integrator( name[, options] ) -> Integrator
     * - name (String): The name of the integrator to create
     * - options (Object): The configuration for that integrator ( depends on integrator ).
       Available options and defaults:

       ```javascript
        {
            // drag applied during integration
            // 0 means vacuum
            // 0.9 means molasses
            drag: 0
        }
       ```
     *
     * Factory function for creating Integrators.
     *
     * Visit [the PhysicsJS wiki on Integrators](https://github.com/wellcaffeinated/PhysicsJS/wiki/Integrators)
     * for usage documentation.
     **/
    Physics.integrator = Decorator('integrator', {

        /** belongs to: Physics.integrator
         * class Integrator
         *
         * The base class for integrators created by [[Physics.integrator]] factory function.
         **/

        /** internal
         * Integrator#init( options )
         * - options (Object): The configuration options passed by the factory
         *
         * Initialization. Internal use.
         **/
        init: function( options ){

            /** related to: Physics.util.options
             * Integrator#options( options ) -> Object
             * - options (Object): The options to set as an object
             * + (Object): The options
             *
             * Set options on this instance.
             *
             * Access options directly from the options object.
             *
             * Example:
             *
             * ```javascript
             * this.options.someOption;
             * ```
             *
             **/
            this.options = Physics.util.options( defaults );
            this.options( options );
        },

        /**
         * Integrator#setWorld( world ) -> this
         * - world (Object): The world (or null)
         *
         * Set which world to apply to.
         *
         * Usually this is called internally. Shouldn't be a need to call this yourself usually.
         **/
        setWorld: function( world ){

            if ( this.disconnect && this._world ){
                this.disconnect( this._world );
            }

            this._world = world;

            if ( this.connect && world ){
                this.connect( world );
            }

            return this;
        },

        /**
         * Integrator#integrate( bodies, dt ) -> this
         * - bodies (Array): List of bodies to integrate
         * - dt (Number): Timestep size
         *
         * Integrate bodies by timestep.
         *
         * Will emit `integrate:velocities` and `integrate:positions`
         * events on the world.
         **/
        integrate: function( bodies, dt ){

            var world = this._world;

            this.integrateVelocities( bodies, dt );

            if ( world ){
                world.emit('integrate:velocities', {
                    bodies: bodies,
                    dt: dt
                });
            }

            this.integratePositions( bodies, dt );

            if ( world ){
                world.emit('integrate:positions', {
                    bodies: bodies,
                    dt: dt
                });
            }

            return this;
        },

        /**
         * Integrator#connect( world )
         * - world (Physics.world): The world to connect to
         *
         * Connect to a world.
         *
         * Extend this when creating integrators if you need to specify pubsub management.
         * Automatically called when added to world by the [[Integrator#setWorld]] method.
         **/
        connect: null,

        /**
         * Integrator#disconnect( world )
         * - world (Physics.world): The world to disconnect from
         *
         * Disconnect from a world.
         *
         * Extend this when creating integrators if you need to specify pubsub management.
         * Automatically called when added to world by the [[Integrator#setWorld]] method.
         **/
        disconnect: null,

        /**
         * Integrator#integrateVelocities( bodies, dt )
         * - bodies (Array): List of bodies to integrate
         * - dt (Number): Timestep size
         *
         * Just integrate the velocities.
         *
         * Should be overridden when creating integrators.
         **/
        integrateVelocities: function( bodies, dt ){

            throw 'The integrator.integrateVelocities() method must be overriden';
        },

        /**
         * Integrator#integratePositions( bodies, dt )
         * - bodies (Array): List of bodies to integrate
         * - dt (Number): Timestep size
         *
         * Just integrate the positions.
         *
         * Called after [[Integrator#integrateVelocities]].
         *
         * Should be overridden when creating integrators.
         **/
        integratePositions: function( bodies, dt ){

            throw 'The integrator.integratePositions() method must be overriden';
        }
    });

}());


// ---
// inside: src/core/renderer.js

(function(){

    var defaults = {
        // draw meta data (fps, steps, etc)
        meta: false,
        // refresh rate of meta info
        metaRefresh: 200,

        // width of viewport
        width: 600,
        // height of viewport
        height: 600,
        // automatically resize the renderer
        autoResize: true
    };

    /** related to: Physics.util.decorator
     * Physics.renderer( name[, options] ) -> Renderer
     * - name (String): The name of the renderer to create
     * - options (Object): The configuration for that renderer ( depends on renderer ).
       Available options and defaults:

       ```javascript
        {
            // draw meta data (fps, steps, etc)
            meta: false,
            // refresh rate of meta info
            metaRefresh: 200,

            // width of viewport
            width: 600,
            // height of viewport
            height: 600
            // automatically resize the renderer
            autoResize: true
        }
       ```
     *
     * Factory function for creating Renderers.
     *
     * Visit [the PhysicsJS wiki on Renderers](https://github.com/wellcaffeinated/PhysicsJS/wiki/Renderers)
     * for usage documentation.
     **/
    Physics.renderer = Decorator('renderer', {

        /** belongs to: Physics.renderer
         * class Renderer
         *
         * The base class for renderers created by [[Physics.renderer]] factory function.
         **/

        /** internal
         * Renderer#init( options )
         * - options (Object): The configuration options passed by the factory
         *
         * Initialization. Internal use.
         **/
        init: function( options ){

            var self = this
                ,el = typeof options.el === 'string' ? document.getElementById(options.el) : options.el
                ;

            this.options = Physics.util.options(defaults);
            this.options( options );

            this.el = el ? el : document.body;
            this.container = el && el.parentNode ? el.parentNode : document.body;
            this.drawMeta = Physics.util.throttle( Physics.util.bind(this.drawMeta, this), this.options.metaRefresh );

            window.addEventListener('resize', Physics.util.throttle(function(){
                if ( self.options.autoResize ){
                    self.resize();
                }
            }), 100);
        },

        /**
         * Renderer#resize( [width, height] ) -> this
         * - width (Number): The width in px
         * - height (Number): The height in px
         *
         * Set the dimensions of the renderer.
         *
         * If no dimensions are specified it will auto resize.
         **/
        resize: function( width, height ){

            if ( width === undefined && height === undefined ){
                width = this.container.offsetWidth;
                height = this.container.offsetHeight;
            }

            this.width = width || 0;
            this.height = height || 0;
            // should be implemented in renderers
        },

        /**
         * Renderer#setWorld( world ) -> this
         * - world (Object): The world (or null)
         *
         * Set which world to apply to.
         *
         * Usually this is called internally. Shouldn't be a need to call this yourself usually.
         **/
        setWorld: function( world ){

            if ( this.disconnect && this._world ){
                this.disconnect( this._world );
            }

            this._world = world;

            if ( this.connect && world ){
                this.connect( world );
            }

            return this;
        },

        /**
         * Renderer#render( bodies, meta ) -> this
         * - bodies (Array): Array of bodies in the world (by reference!)
         * - meta (Object): meta information
         *
         * Render the world bodies and meta. Called by world.render()
         **/
        render: function( bodies, meta ){

            var body
                ,view
                ,pos
                ;

            if (this.beforeRender){

                this.beforeRender();
            }

            this._world.emit('beforeRender', {
                renderer: this,
                bodies: bodies,
                meta: meta
            });

            if (this.options.meta){
                this.drawMeta( meta );
            }

            this._interpolateTime = meta.interpolateTime;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                view = body.view || ( body.view = this.createView(body.geometry, body.styles) );

                if ( !body.hidden ){
                    this.drawBody( body, view );
                }
            }

            return this;
        },

        /**
         * Renderer#createView( geometry, styles ) -> Mixed
         * - geometry (Geometry): geometry The geometry
         * - styles (Object|String): The styles configuration
         * + (Mixed): Whatever the renderer needs to render the body.
         *
         * Create a view for the specified geometry.
         *
         * The view is used to render the body. It is a cached version
         * of the body that gets moved and rotated according to the simulation.
         *
         * The styles are used to modify the appearance of the view.
         * They depend on the renderer.
         *
         * Override this when creating renderers.
         **/
        createView: function( geometry, styles ){

            // example:
            // var el = document.createElement('div');
            // el.style.height = geometry.height + 'px';
            // el.style.width = geometry.width + 'px';
            // return el;
            throw 'You must override the renderer.createView() method.';
        },

        /**
         * Renderer#drawMeta( meta )
         * - meta (Object): The meta data
         *
         * Draw the meta data.
         *
         * The meta data will look like this:
         *
         * ```javascript
         * meta = {
         *     fps: 60, // the frames per second
         *     ipf: 4 // the number of iterations per frame
         * };
         * ```
         *
         * Override this when creating renderers.
         **/
        drawMeta: function( meta ){

            // example:
            // this.els.fps.innerHTML = meta.fps.toFixed(2);
            // this.els.steps.innerHTML = meta.steps;
            throw 'You must override the renderer.drawMeta() method.';
        },

        /**
         * Renderer#drawBody( body, view )
         * - body (Object): The body to draw
         * - view (Object): The view for the body
         *
         * Draw specified body using specified view.
         *
         * Override this when creating renderers.
         **/
        drawBody: function( body, view ){

            // example (pseudocode):
            // view.angle = body.state.angle
            // view.position = body.state.position
            throw 'You must override the renderer.drawBody() method.';
        }


    });

}());


// ---
// inside: src/core/world.js

/** related to: Physics
 * class Physics.world
 *
 * The world class and factory function.
 *
 * Use [[Physics]] to create worlds.
 **/
(function(){

    var execCallbacks = function execCallbacks( fns, scope, args ){

        var fn
            ,ret
            ,cb = function(){
                return execCallbacks( fns, scope, args );
            }
            ;

        while ( fn = fns.shift() ){

            ret = fn.apply(scope, args);

            if (ret && ret.then){
                return ret.then( cb );
            }
        }
    };

    var defaults = {

        // default timestep
        timestep: 6,
        // maximum number of iterations per step
        maxIPF: 4,
        webworker: false, // NOT YET IMPLEMENTED

        // default integrator
        integrator: 'verlet',

        // is sleeping disabled?
        sleepDisabled: false,
        // speed at which bodies wake up
        sleepSpeedLimit: 0.05,
        // variance in position below which bodies fall asleep
        sleepVarianceLimit: 0.02,
        // time (ms) before sleepy bodies fall asleep
        sleepTimeLimit: 500
    };

    // begin world definitions

    /** alias of: Physics
     * new Physics.world([options, fn(world, Physics)])
     * - options (Object): configuration options (see description)
     * - fn (Function|Array): Callback function or array of callbacks called with this === world
     * - world (Physics.world): The current world created
     * - Physics (Physics): The Physics namespace
     *
     * World Constructor.
     *
     * Use [[Physics]] to create worlds.
     *
     * Configuration options and defaults:
     *
     * ```javascript
     * {
     *  // default timestep
     *  timestep: 6,
     *  // maximum number of iterations per step
     *  maxIPF: 4,
     *
     *  // default integrator
     *  integrator: 'verlet',
     *
     *  // is sleeping disabled?
     *  sleepDisabled: false,
     *  // speed at which bodies wake up
     *  sleepSpeedLimit: 0.1,
     *  // variance in position below which bodies fall asleep
     *  sleepVarianceLimit: 2,
     *  // time (ms) before sleepy bodies fall asleep
     *  sleepTimeLimit: 500
     * }
     * ```
     *
     * If called with an array of functions, and any functions
     * return a [promise-like object](http://promises-aplus.github.io/promises-spec/),
     * each remaining callback will be called only when that promise is resolved.
     *
     * Example:
     *
     * ```javascript
     * // hypothetical resources need to be loaded...
     * Physics( cfg, [
     *     function( world ){
     *         var dfd = $.Deferred()
     *             ,images = []
     *             ,toLoad = myImages.length
     *             ,callback = function(){
     *                 toLoad--;
     *                 // wait for all images to be loaded
     *                 if ( toLoad <= 0 ){
     *                     dfd.resolve();
     *                 }
     *             }
     *             ;
     *
     *         // load images
     *         $.each(myImages, function( src ){
     *             var img = new Image();
     *             img.onload = callback;
     *             img.src = src;
     *         });
     *
     *         return dfd.promise();
     *     },
     *     function( world ){
     *         // won't be executed until images are loaded
     *         // initialize world... etc...
     *     }
     * ]);
     * ```
     **/
    var World = function World( cfg, fn ){

        // allow creation of world without "new"
        if (!(this instanceof World)){
            return new World( cfg, fn );
        }

        this.init( cfg, fn );
    };

    // extend pubsub
    World.prototype = Physics.util.extend({}, Physics.util.pubsub.prototype, {

        /** internal, see: new Physics.world
         * Physics.world#init( [options, fn(world, Physics)] )
         * - options (Object): configuration options (see constructor)
         * - fn (Function|Array): Callback function or array of callbacks called with this === world
         *
         * Initialization
         **/
        init: function( cfg, fn ){

            var self = this;

            if ( Physics.util.isFunction( cfg ) || Physics.util.isArray( cfg ) ){
                fn = cfg;
                cfg = {};
            }

            this._meta = {
               // statistics (fps, etc)
               fps: 0,
               ipf: 0
            };
            this._bodies = [];
            this._behaviors = [];
            this._integrator = null;
            this._renderer = null;
            this._paused = false;
            this._warp = 1;
            this._time = 0;

            // set options
            this.options = Physics.util.options( defaults );
            this.options.onChange(function( opts ){

                // set timestep
                self.timestep( opts.timestep );
            });
            this.options( cfg );

            // add integrator
            this.add(Physics.integrator( this.options.integrator ));

            // apply the callback function
            if ( Physics.util.isFunction( fn ) ){

                execCallbacks([ fn ], this, [this, Physics] );

            } else if ( Physics.util.isArray( fn ) ){

                execCallbacks(fn, this, [this, Physics] );
            }
        },

        /**
         * Physics.world#options( cfg ) -> Object
         * - options (Object): configuration options (see constructor)
         * + (Object): Options container
         *
         * Set config options. Also access options by `.options.<option>`.
         **/
        options: null,

        /** chainable
         * Physics.world#add( things ) -> this
         * - things (Object|Array): The thing, or array of things (body, behavior, integrator, or renderer) to add.
         *
         * Multipurpose add method. Add one or many bodies, behaviors, integrators, renderers...
         **/
        add: function( arg ){

            var i = 0
                ,len = arg && arg.length || 0
                ,thing = Physics.util.isArray( arg ) ? arg[ 0 ] : arg
                ;

            if ( !thing ){
                return this;
            }

            // we'll either cycle through an array
            // or just run this on the arg itself
            do {
                switch (thing.type){

                    case 'behavior':
                        this.addBehavior(thing);
                    break; // end behavior

                    case 'integrator':
                        this.integrator(thing);
                    break; // end integrator

                    case 'renderer':
                        this.renderer(thing);
                    break; // end renderer

                    case 'body':
                        this.addBody(thing);
                    break; // end body

                    default:
                        throw 'Error: failed to add item of unknown type "'+ thing.type +'" to world';
                    // end default
                }

            } while ( ++i < len && (thing = arg[ i ]) );

            return this;
        },

        /** chainable
         * Physics.world#remove( things ) -> this
         * - things (Object|Array): The thing, or array of things (body, behavior, integrator, or renderer) to remove.
         *
         * Multipurpose remove method. Remove one or many bodies, behaviors, integrators, renderers...
         **/
        remove: function( arg ){

            var i = 0
                ,len = arg && arg.length || 0
                ,thing = Physics.util.isArray( arg ) ? arg[ 0 ] : arg
                ;

            if ( !thing ){
                return this;
            }

            // we'll either cycle through an array
            // or just run this on the arg itself
            do {
                switch (thing.type){

                    case 'behavior':
                        this.removeBehavior( thing );
                    break; // end behavior

                    case 'integrator':
                        if (thing === this._integrator){
                            this.integrator( null );
                        }
                    break; // end integrator

                    case 'renderer':
                        if (thing === this._renderer){
                            this.renderer( null );
                        }
                    break; // end renderer

                    case 'body':
                        this.removeBody( thing );
                    break; // end body

                    default:
                        throw 'Error: failed to remove item of unknown type "'+ thing.type +'" from world';
                    // end default
                }

            } while ( ++i < len && (thing = arg[ i ]) );

            return this;
        },

        /** chainable
         * Physics.world#has( thing ) -> Boolean
         * - thing (Object): The thing to test
         * + (Boolean): `true` if thing is in the world, `false` otherwise.
         *
         * Determine if a thing has been added to world.
         **/
        has: function( thing ){

            var arr
                ,i
                ,l
                ;

            if ( !thing ){
                return false;
            }

            switch (thing.type){

                case 'behavior':
                    arr = this._behaviors;
                break; // end behavior

                case 'integrator':
                return ( this._integrator === thing );
                // end integrator

                case 'renderer':
                return ( this._renderer === thing );
                // end renderer

                case 'body':
                    arr = this._bodies;
                break; // end body

                default:
                    throw 'Error: unknown type "'+ thing.type +'"';
                // end default
            }

            // check array
            return (Physics.util.indexOf( arr, thing ) > -1);
        },

        /** chainable
         * Physics.world#integrator( [integrator] ) -> Integrator|this
         * - integrator (Integrator): The integrator to set on the world
         * + (Integrator): The currently set integrator if `integrator` not specified
         * + (this): for chaining if `integrator` specified
         *
         * Get or Set the integrator
         **/
        integrator: function( integrator ){

            if ( integrator === undefined ){
                return this._integrator;
            }

            // do nothing if already added
            if ( this._integrator === integrator ){
                return this;
            }

            if ( this._integrator ){

                this._integrator.setWorld( null );

                this.emit( 'remove:integrator', {
                    integrator: this._integrator
                });
            }

            if ( integrator ){
                this._integrator = integrator;
                this._integrator.setWorld( this );

                this.emit( 'add:integrator', {
                    integrator: this._integrator
                });
            }

            return this;
        },

        /** chainable
         * Physics.world#renderer( [renderer] ) -> Renderer|this
         * - renderer (Renderer): The renderer to set on the world
         * + (Renderer): The currently set renderer if `renderer` not specified
         * + (this): for chaining if `renderer` specified
         *
         * Get or Set the renderer
         **/
        renderer: function( renderer ){

            if ( renderer === undefined ){
                return this._renderer;
            }

            // do nothing if renderer already added
            if ( this._renderer === renderer ){
                return this;
            }

            if ( this._renderer ){

                this._renderer.setWorld( null );

                this.emit( 'remove:renderer', {
                    renderer: this._renderer
                });
            }

            if ( renderer ){
                this._renderer = renderer;
                this._renderer.setWorld( this );

                this.emit( 'add:renderer', {
                    renderer: this._renderer
                });
            }

            return this;
        },

        /** chainable
         * Physics.world#timestep( [dt] ) -> Number|this
         * - dt (Number): The time step for the world
         * + (Number): The currently set time step if `dt` not specified
         * + (this): for chaining if `dt` specified
         *
         * Get or Set the timestep
         **/
        timestep: function( dt ){

            if ( dt ){

                this._dt = +dt.toPrecision(4); // only keep 4 decimal places of precision otherwise we get rounding errors
                // calculate the maximum jump in time over which to do iterations
                this._maxJump = dt * this.options.maxIPF;

                return this;
            }

            return this._dt;
        },

        /** chainable
         * Physics.world#wakeUpAll() -> this
         * + (this): for chaining
         *
         * Wake up all bodies in world.
         **/
        wakeUpAll: function(){
            var i = 0
                ,l = this._bodies.length
                ;

            for ( i = 0; i < l; i++ ){
                this._bodies[ i ].sleep( false );
            }
        },

        /** chainable
         * Physics.world#addBehavior( behavior ) -> this
         * - behavior (Behavior): The behavior to add
         *
         * Add a behavior to the world
         **/
        addBehavior: function( behavior ){

            var notify;

            // don't allow duplicates
            if ( this.has( behavior ) ){
                return this;
            }

            behavior.setWorld( this );
            this._behaviors.push( behavior );

            this.emit( 'add:behavior', {
                behavior: behavior
            });

            return this;
        },

        /**
         * Physics.world#getBehaviors() -> Array
         * + (Array): Array of behaviors
         *
         * Get copied list of behaviors in the world
         **/
        getBehaviors: function(){

            // return the copied array
            return [].concat(this._behaviors);
        },

        /** chainable
         * Physics.world#removeBehavior( behavior ) -> this
         * - behavior (Behavior): The behavior to remove
         *
         * Remove a behavior from the world
         **/
        removeBehavior: function( behavior ){

            var behaviors = this._behaviors;

            if (behavior){

                for ( var i = 0, l = behaviors.length; i < l; ++i ){

                    if (behavior === behaviors[ i ]){

                        behaviors.splice( i, 1 );
                        behavior.setWorld( null );

                        this.emit( 'remove:behavior', {
                            behavior: behavior
                        });

                        break;
                    }
                }
            }

            return this;
        },

        /** chainable
         * Physics.world#addBody( body ) -> this
         * - body (Body): The behavior to add
         *
         * Add a body to the world
         **/
        addBody: function( body ){

            var notify;

            // don't allow duplicates
            if ( this.has( body ) ){
                return this;
            }

            body.setWorld( this );
            this._bodies.push( body );

            this.emit( 'add:body', {
                body: body
            });

            return this;
        },

        /**
         * Physics.world#getBodies() -> Array
         * + (Array): Array of bodies
         *
         * Get copied list of bodies in the world
         **/
        getBodies: function(){

            // return the copied array
            return [].concat(this._bodies);
        },

        /** chainable
         * Physics.world#removeBody( body ) -> this
         * - body (Body): The body to remove
         *
         * Remove a body from the world
         **/
        removeBody: function( body ){

            var bodies = this._bodies;

            if (body){

                for ( var i = 0, l = bodies.length; i < l; ++i ){

                    if (body === bodies[ i ]){

                        bodies.splice( i, 1 );
                        body.setWorld( null );

                        this.emit( 'remove:body', {
                            body: body
                        });

                        break;
                    }
                }
            }

            return this;
        },

        /** see: Physics.query
         * Physics.world#findOne( rules ) -> Body | false
         * Physics.world#findOne( filter(body) ) -> Body | false
         * - rules (Object): Query rules.
         * - filter (Function): Filter function called to check bodies
         * - body (Body): Each body in the world
         *
         * Find first matching body based on query rules.
         **/
        findOne: function( rules ){

            var self = this
                ,fn = (typeof rules === 'function') ? rules : Physics.query( rules )
                ;

            return Physics.util.find( self._bodies, fn ) || false;
        },

        /** see: Physics.query
         * Physics.world#find( rules ) -> Array
         * Physics.world#find( filter(body) ) -> Array
         * - rules (Object): Query rules
         * - filter (Function): Filter function called to check bodies
         * - body (Body): Each body in the world
         *
         * Find all matching bodies based on query rules.
         **/
        find: function( rules ){

            var self = this
                ,fn = (typeof rules === 'function') ? rules : Physics.query( rules )
                ;

            return Physics.util.filter( self._bodies, fn );
        },

        /** internal
         * Physics.world#iterate( dt )
         * - dt (Number): The timestep
         *
         * Do a single iteration.
         **/
        iterate: function( dt ){

            this._integrator.integrate( this._bodies, dt );
        },

        /** chainable
         * Physics.world#step( [now] ) -> this
         * - now (Number): Current unix timestamp
         *
         * Step the world up to specified time or do one step if no time is specified.
         **/
        step: function( now ){

            var time = this._time
                ,warp = this._warp
                ,invWarp = 1 / warp
                ,dt = this._dt
                ,animDt = dt * invWarp
                ,animMaxJump = this._maxJump * invWarp
                ,animDiff
                ,worldDiff
                ,target
                ,meta = this._meta
                ;

            // if it's paused, don't step
            // or if it's the first step...
            if ( this._paused || this._animTime === undefined ){
                this._animTime = now || this._animTime || Physics.util.ticker.now();

                if ( !this._paused ){
                    this.emit('step', meta);
                }
                return this;
            }

            // new time is specified, or just one iteration ahead
            now = now || (this._animTime + animDt);
            // the time between this step and the last
            animDiff = now - this._animTime;

            // if the time difference is too big... adjust
            if ( animDiff > animMaxJump ){
                this._animTime = now - animMaxJump;
                animDiff = animMaxJump;
            }

            // the "world" time between this step and the last. Adjusts for warp
            worldDiff = animDiff * warp;

            // the target time for the world time to step to
            target = time + worldDiff - dt;

            this.emit('beforeStep');

            if ( time <= target ){

                while ( time <= target ){
                    // increment world time
                    time += dt;
                    // increment animation time
                    this._animTime += animDt;
                    // record the world time
                    this._time = time;
                    // iterate by one timestep
                    this.iterate( dt );
                }
            }

            // set some meta
            meta.fps = 1000 / (now - this._lastTime); // frames per second
            meta.ipf = (worldDiff / dt).toFixed(2); // iterations per frame
            meta.interpolateTime = dt + target - time;

            // record the time this was called
            this._lastTime = now;

            this.emit('step', meta);
            return this;
        },

        /**
         * Physics.world#warp( [warp] ) -> this|Number
         * - warp (Number): The time warp factor
         *
         * Speed up or slow down the iteration by this factor.
         *
         * Example:
         * ```javascript
         * // slow motion... 10x slower
         * world.warp( 0.01 );
         * ```
         **/
        warp: function( warp ){
            if ( warp === undefined ){
                return this._warp;
            }

            this._warp = warp || 1;

            return this;
        },

        /** chainable
         * Physics.world#render() -> this
         *
         * Render current world state using the renderer
         **/
        render: function(){

            if ( !this._renderer ){
                throw "No renderer added to world";
            }

            this._renderer.render( this._bodies, this._meta );
            this.emit('render', {
                bodies: this._bodies,
                meta: this._meta,
                renderer: this._renderer
            });
            return this;
        },

        /** chainable
         * Physics.world#pause() -> this
         *
         * Pause the world (step calls do nothing).
         **/
        pause: function(){

            this._paused = true;
            this.emit('pause');
            return this;
        },

        /** chainable
         * Physics.world#unpause() -> this
         *
         * Unpause the world (step calls continue as usual).
         **/
        unpause: function(){

            this._paused = false;
            this.emit('unpause');
            return this;
        },

        /**
         * Physics.world#isPaused() -> Boolean
         * + (Boolean): Returns `true` if world is paused, `false` otherwise.
         *
         * Determine if world is paused.
         **/
        isPaused: function(){

            return !!this._paused;
        },

        /**
         * Physics.world#destroy()
         *
         * Destroy the world.
         * (Bwahahahahaha!)
         **/
        destroy: function(){

            var self = this;
            self.pause();

            // notify before
            this.emit('destroy');

            // remove all listeners
            self.off( true );
            // remove everything
            self.remove( self.getBodies() );
            self.remove( self.getBehaviors() );
            self.integrator( null );
            self.renderer( null );
        }

    });

    Physics.world = World;

}());


// ---
// inside: src/integrators/verlet.js

Physics.integrator('verlet', function( parent ){

    // for this integrator we need to know if the object has been integrated before
    // so let's add a mixin to bodies

    Physics.body.mixin({

        started: function( val ){
            if ( val !== undefined ){
                this._started = true;
            }

            return !!this._started;
        }
    });


    return {
        /**
         * class Verlet < Integrator
         *
         * `Physics.integrator('verlet')`.
         *
         * The verlet integrator.
         **/

        // extended
        init: function( options ){

            // call parent init
            parent.init.call(this, options);
        },

        // extended
        integrateVelocities: function( bodies, dt ){

            // half the timestep
            var dtdt = dt * dt
                ,drag = 1 - this.options.drag
                ,body = null
                ,state
                ,prevDt = this.prevDt || dt
                ,dtMul = (dtdt + dt * prevDt) * 0.5
                ;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                state = body.state;

                // only integrate if the body isn't static
                if ( body.treatment !== 'static' && !body.sleep( dt ) ){

                    // Inspired from https://github.com/soulwire/Coffee-Physics
                    // @licence MIT
                    //
                    // v = x - ox
                    // x = x + (v + a * dt * dt)

                    // use the velocity in vel if the velocity has been changed manually
                    if (state.vel.equals( state.old.vel ) && body.started()){

                        // Get velocity by subtracting old position from curr position
                        state.vel.clone( state.pos ).vsub( state.old.pos );

                    } else {

                        state.old.pos.clone( state.pos ).vsub( state.vel );
                        // so we need to scale the value by dt so it
                        // complies with other integration methods
                        state.vel.mult( dt );
                    }

                    // Apply "air resistance".
                    if ( drag ){

                        state.vel.mult( drag );
                    }

                    // Apply acceleration
                    // v += a * dt * dt
                    state.vel.vadd( state.acc.mult( dtMul ) );

                    // restore velocity
                    state.vel.mult( 1/dt );

                    // store calculated velocity
                    state.old.vel.clone( state.vel );

                    // Reset accel
                    state.acc.zero();

                    //
                    // Angular components
                    //

                    if (state.angular.vel === state.old.angular.vel && body.started()){

                        state.angular.vel = (state.angular.pos - state.old.angular.pos);

                    } else {

                        state.old.angular.pos = state.angular.pos - state.angular.vel;
                        state.angular.vel *= dt;
                    }

                    state.angular.vel += state.angular.acc * dtMul;
                    state.angular.vel /= dt;
                    state.old.angular.vel = state.angular.vel;
                    state.angular.acc = 0;

                    body.started( true );

                } else {
                    // set the velocity and acceleration to zero!
                    state.vel.zero();
                    state.acc.zero();
                    state.angular.vel = 0;
                    state.angular.acc = 0;
                }
            }
        },

        // extended
        integratePositions: function( bodies, dt ){

            // half the timestep
            var dtdt = dt * dt
                ,body = null
                ,state
                ,prevDt = this.prevDt || dt
                ,dtcorr = dt/prevDt
                ;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                state = body.state;

                // only integrate if the body isn't static
                if ( body.treatment !== 'static' && !body.sleep() ){

                    // so we need to scale the value by dt so it
                    // complies with other integration methods
                    state.vel.mult( dt * dtcorr );

                    // Store old position.
                    // xold = x
                    state.old.pos.clone( state.pos );

                    state.pos.vadd( state.vel );

                    // restore velocity
                    state.vel.mult( 1 / (dt * dtcorr) );

                    // store calculated velocity
                    state.old.vel.clone( state.vel );

                    //
                    // Angular components
                    //


                    state.angular.vel *= dt * dtcorr;

                    state.old.angular.pos = state.angular.pos;

                    state.angular.pos += state.angular.vel;
                    state.angular.vel /= dt * dtcorr;
                    state.old.angular.vel = state.angular.vel;
                }
            }

            this.prevDt = dt;
        }
    };
});


// ---
// inside: src/geometries/point.js

/** alias of: Geometry
 * class PointGeometry < Geometry
 *
 * Physics.geometry('point')
 *
 * The point geometry represents a point.
 **/
Physics.geometry('point', function( parent ){});


// ---
// inside: src/bodies/point.js

/** alias of: Body
 * class PointBody < Body
 *
 * Physics.body('point')
 *
 * The point body represents a point.
 **/
Physics.body('point', function( parent ){
    return {
        init: function( opts ){
            parent.init.call( this, opts );
            this.moi = 0;
        }
    };
});


// ---
// inside: src/geometries/circle.js

/** 
 * class CircleGeometry < Geometry
 *
 * Physics.geometry('circle')
 *
 * The circle geometry has a circular shape.
 *
 * Additional options include:
 * - radius: the radius
 *
 * Example:
 *
 * ```javascript
 * var round = Physics.body('circle', {
 *     x: 30,
 *     y: 20,
 *     radius: 5
 * });
 * ```
 **/
Physics.geometry('circle', function( parent ){

    var defaults = {

        radius: 1.0
    };

    return {

        // extended
        init: function( options ){

            var self = this;
            // call parent init method
            parent.init.call(this, options);

            this.options.defaults( defaults );
            this.options.onChange(function( opts ){
                this.radius = opts.radius;
            });
            this.options( options );

            this._aabb = Physics.aabb();
            this.radius = this.options.radius;
        },
                
        // extended
        aabb: function( angle ){

            var r = this.radius
                ;

            // circles are symetric... so angle has no effect
            if ( this._aabb.hw !== r ){
                // recalculate
                this._aabb = Physics.aabb( -r, -r, r, r );
            }

            return Physics.aabb.clone( this._aabb );
        },

        // extended
        getFarthestHullPoint: function( dir, result ){

            result = result || new Physics.vector();

            return result.clone( dir ).normalize().mult( this.radius );
        },

        // extended
        getFarthestCorePoint: function( dir, result, margin ){

            result = result || new Physics.vector();

            // we can use the center of the circle as the core object
            // because we can project a point to the hull in any direction
            // ... yay circles!
            // but since the caller is expecting a certain margin... give it
            // to them
            return result.clone( dir ).normalize().mult( this.radius - margin );
        }
    };
});


// ---
// inside: src/geometries/compound.js

/**
 * class CompoundGeometry < Geometry
 *
 * Physics.geometry('compound')
 *
 * Geometry for compound shapes.
 *
 * Example:
 *
 * ```javascript
 * var thing = Physics.geometry('compound');
 * thing.addChild( child, pos, rotation );
 * ```
 **/
Physics.geometry('compound', function( parent ){

    var defaults = {

    };

    return {

        // extended
        init: function( options ){

            var self = this;

            // call parent init method
            parent.init.call(this, options);

            this.options.defaults( defaults );
            this.options( options );

            this.children = [];
        },

        /**
         * CompoundGeometry#addChild( geometry, pos ) -> this
         * - geometry (Geometry): The child to add.
         * - pos (Physics.vector): The position to add the child at.
         * - angle (Number): The rotation angle
         *
         * Add a child at relative position.
         **/
        addChild: function( geometry, pos, angle ){

            this._aabb = null;
            this.children.push({
                g: geometry
                ,pos: new Physics.vector( pos )
                ,angle: angle
            });

            return this;
        },

        /**
         * CompoundGeometry#clear() -> this
         *
         * Remove all children.
         **/
        clear: function(){

            this._aabb = null;
            this.children = [];

            return this;
        },

        // extended
        aabb: function( angle ){

            if (!angle && this._aabb){
                return Physics.aabb.clone( this._aabb );
            }

            var b
                ,aabb
                ,ch
                ,ret
                ,scratch = Physics.scratchpad()
                ,pos = Physics.vector()
                ;

            angle = angle || 0;

            for ( var i = 0, l = this.children.length; i < l; i++ ) {
                ch = this.children[ i ];
                // the aabb rotated by overall angle and the child rotation
                aabb = ch.g.aabb( angle + ch.angle );
                pos.clone( ch.pos );
                if ( angle ){
                    // get the child's position rotated if needed
                    pos.rotate( angle );
                }
                // move the aabb to the child's position
                aabb.x += pos._[0];
                aabb.y += pos._[1];
                ret = ret ? Physics.aabb.union(ret, aabb, true) : aabb;
            }

            if ( !angle ){
                // if we don't have an angle specified (or it's zero)
                // then we can cache this result
                this._aabb = Physics.aabb.clone( ret );
            }

            return scratch.done( ret );
        },

        // extended
        // NOTE: unlike other geometries this can't be used in the
        // GJK algorithm because the shape isn't garanteed to be convex
        getFarthestHullPoint: function( dir, result ){

            var ch
                ,i
                ,l = this.children.length
                ,scratch = Physics.scratchpad()
                ,v = scratch.vector()
                ,len = 0
                ,maxlen = 0
                ;

            result = result || new Physics.vector();

            // find the one with the largest projection along dir
            for ( i = 0; i < l; i++ ) {
                ch = this.children[ i ];
                ch.g.getFarthestHullPoint( dir.rotate(-ch.angle), v );
                len = v.rotate(ch.angle).vadd( ch.pos ).proj( dir.rotate(ch.angle) );

                if ( len > maxlen ){
                    maxlen = len;
                    result.swap( v );
                }
            }

            return scratch.done( result );
        },

        // extended
        // NOTE: unlike other geometries this can't be used in the
        // GJK algorithm because the shape isn't garanteed to be convex
        getFarthestCorePoint: function( dir, result, margin ){

            var ch
                ,i
                ,l = this.children.length
                ,scratch = Physics.scratchpad()
                ,v = scratch.vector()
                ,len = 0
                ,maxlen = 0
                ;

            result = result || new Physics.vector();

            // find the one with the largest projection along dir
            for ( i = 0; i < l; i++ ) {
                ch = this.children[ i ];
                ch.g.getFarthestCorePoint(dir.rotate(-ch.angle), v, margin );
                len = v.rotate(ch.angle).vadd( ch.pos ).proj( dir.rotate(ch.angle) );

                if ( len > maxlen ){
                    maxlen = len;
                    result.swap( v );
                }
            }

            return scratch.done( result );
        }
    };
});


// ---
// inside: src/geometries/convex-polygon.js

/**
 * class ConvexPolygonGeometry < Geometry
 *
 * Physics.geometry('convex-polygon')
 *
 * Geometry for convex polygons.
 *
 * Additional config options:
 *
 * - vertices: Array of [[Vectorish]] objects representing the polygon vertices in clockwise (or counterclockwise) order.
 *
 * Example:
 *
 * ```javascript
 * var pentagon = Physics.geometry('convex-polygon', {
 *     // the centroid is automatically calculated and used to position the shape
 *     vertices: [
 *         { x: 0, y: -30 },
 *         { x: -29, y: -9 },
 *         { x: -18, y: 24 },
 *         { x: 18, y: 24 },
 *         { x: 29, y: -9 }
 *     ]
 * });
 * ```
 **/
Physics.geometry('convex-polygon', function( parent ){

    var ERROR_NOT_CONVEX = 'Error: The vertices specified do not match that of a _convex_ polygon.';

    var defaults = {

    };

    return {

        // extended
        init: function( options ){

            var self = this;

            // call parent init method
            parent.init.call(this, options);

            this.options.defaults( defaults );
            this.options.onChange(function( opts ){
                self.setVertices( opts.vertices || [] );
            });
            this.options( options );

            self.setVertices( this.options.vertices || [] );

        },

        /**
         * ConvexPolygonGeometry#setVertices( hull ) -> this
         * - hull (Array): Vertices represented by an array of [[Vectorish]] objects, in either clockwise or counterclockwise order
         *
         * Set the vertices of this polygon.
         **/
        setVertices: function( hull ){

            var scratch = Physics.scratchpad()
                ,transl = scratch.transform()
                ,verts = this.vertices = []
                ;

            if ( !Physics.geometry.isPolygonConvex( hull ) ){
                throw ERROR_NOT_CONVEX;
            }

            transl.setRotation( 0 );
            transl.setTranslation( Physics.geometry.getPolygonCentroid( hull ).negate() );

            // translate each vertex so that the centroid is at the origin
            // then add the vertex as a vector to this.vertices
            for ( var i = 0, l = hull.length; i < l; ++i ){

                verts.push( new Physics.vector( hull[ i ] ).translate( transl ) );
            }

            this._area = Physics.geometry.getPolygonArea( verts );
            this._aabb = false;
            return scratch.done(this);
        },

        // extended
        aabb: function( angle ){

            if (!angle && this._aabb){
                return Physics.aabb.clone( this._aabb );
            }

            var scratch = Physics.scratchpad()
                ,p = scratch.vector()
                ,trans = scratch.transform().setRotation( angle || 0 )
                ,xaxis = scratch.vector().set( 1, 0 ).rotateInv( trans )
                ,yaxis = scratch.vector().set( 0, 1 ).rotateInv( trans )
                ,xmax = this.getFarthestHullPoint( xaxis, p ).proj( xaxis )
                ,xmin = - this.getFarthestHullPoint( xaxis.negate(), p ).proj( xaxis )
                ,ymax = this.getFarthestHullPoint( yaxis, p ).proj( yaxis )
                ,ymin = - this.getFarthestHullPoint( yaxis.negate(), p ).proj( yaxis )
                ,aabb
                ;

            aabb = Physics.aabb( xmin, ymin, xmax, ymax );

            if (!angle){
                // if we don't have an angle specified (or it's zero)
                // then we can cache this result
                this._aabb = Physics.aabb.clone( aabb );
            }

            scratch.done();
            return aabb;
        },

        // extended
        getFarthestHullPoint: function( dir, result, data ){

            var verts = this.vertices
                ,val
                ,prev
                ,l = verts.length
                ,i = 2
                ,idx
                ;

            result = result || new Physics.vector();

            if ( l < 2 ){
                if ( data ){
                    data.idx = 0;
                }
                return result.clone( verts[0] );
            }

            prev = verts[ 0 ].dot( dir );
            val = verts[ 1 ].dot( dir );

            if ( l === 2 ){
                idx = (val >= prev) ? 1 : 0;
                if ( data ){
                    data.idx = idx;
                }
                return result.clone( verts[ idx ] );
            }

            if ( val >= prev ){
                // go up
                // search until the next dot product
                // is less than the previous
                while ( i < l && val >= prev ){
                    prev = val;
                    val = verts[ i ].dot( dir );
                    i++;
                }

                if (val >= prev){
                    i++;
                }

                // return the previous (furthest with largest dot product)
                idx = i - 2;
                if ( data ){
                    data.idx = i - 2;
                }
                return result.clone( verts[ idx ] );

            } else {
                // go down

                i = l;
                while ( i > 1 && prev >= val ){
                    i--;
                    val = prev;
                    prev = verts[ i ].dot( dir );
                }

                // return the previous (furthest with largest dot product)
                idx = (i + 1) % l;
                if ( data ){
                    data.idx = idx;
                }
                return result.clone( verts[ idx ] );
            }
        },

        // extended
        getFarthestCorePoint: function( dir, result, margin ){

            var norm
                ,scratch = Physics.scratchpad()
                ,next = scratch.vector()
                ,prev = scratch.vector()
                ,verts = this.vertices
                ,l = verts.length
                ,mag
                ,sign = this._area > 0
                ,data = {}
                ;

            result = this.getFarthestHullPoint( dir, result, data );

            // get normalized directions to next and previous vertices
            next.clone( verts[ (data.idx + 1) % l ] ).vsub( result ).normalize().perp( sign );
            prev.clone( verts[ (data.idx - 1 + l) % l ] ).vsub( result ).normalize().perp( !sign );

            // get the magnitude of a vector from the result vertex
            // that splits down the middle
            // creating a margin of "m" to each edge
            mag = margin / (1 + next.dot(prev));

            result.vadd( next.vadd( prev ).mult( mag ) );
            scratch.done();
            return result;
        }
    };
});


// ---
// inside: src/geometries/rectangle.js

/**
 * class RectangleGeometry < Geometry
 *
 * Physics.geometry('rectangle')
 *
 * Geometry for rectangles.
 *
 * Additional config options:
 *
 * - width: The width
 * - height: The height
 *
 * Example:
 *
 * ```javascript
 * var rectGeo = Physics.geometry('rectangle', {
 *     width: 30,
 *     height: 40
 * });
 * ```
 **/
Physics.geometry('rectangle', function( parent ){

    var defaults = {

    };

    return {

        // extended
        init: function( options ){

            var self = this;

            // call parent init method
            parent.init.call(this, options);

            this.options.defaults( defaults );
            this.options.onChange(function( opts ){
                /**
                 * RectangleGeometry#width = Number
                 *
                 * The width
                 **/
                self.width = self.options.width || 1;
                /**
                 * RectangleGeometry#height = Number
                 *
                 * The height
                 **/
                self.height = self.options.height || 1;
            });
            this.options( options );
        },

        // extended
        aabb: function( angle ){

            if (!angle){
                return Physics.aabb( this.width, this.height );
            }

            var scratch = Physics.scratchpad()
                ,p = scratch.vector()
                ,trans = scratch.transform().setRotation( angle || 0 )
                ,xaxis = scratch.vector().set( 1, 0 ).rotateInv( trans )
                ,yaxis = scratch.vector().set( 0, 1 ).rotateInv( trans )
                ,xmax = this.getFarthestHullPoint( xaxis, p ).proj( xaxis )
                ,xmin = - this.getFarthestHullPoint( xaxis.negate(), p ).proj( xaxis )
                ,ymax = this.getFarthestHullPoint( yaxis, p ).proj( yaxis )
                ,ymin = - this.getFarthestHullPoint( yaxis.negate(), p ).proj( yaxis )
                ;

            scratch.done();
            return Physics.aabb( xmin, ymin, xmax, ymax );
        },

        // extended
        getFarthestHullPoint: function( dir, result ){

            result = result || new Physics.vector();

            var x = dir.x
                ,y = dir.y
                ;

            x = x === 0 ? 0 : x < 0 ? -this.width * 0.5 : this.width * 0.5;
            y = y === 0 ? 0 : y < 0 ? -this.height * 0.5 : this.height * 0.5;

            return result.set( x, y );
        },

        // extended
        getFarthestCorePoint: function( dir, result, margin ){

            var x, y;
            result = this.getFarthestHullPoint( dir, result );
            x = result.x;
            y = result.y;
            result.x = x === 0 ? 0 : x < 0 ? x + margin : x - margin;
            result.y = y === 0 ? 0 : y < 0 ? y + margin : y - margin;

            return result;
        }
    };
});


// ---
// inside: src/bodies/circle.js

/*
 * @requires geometries/circle
 */
/** 
 * class CircleBody < Body
 *
 * Physics.body('circle')
 *
 * The circle body has a circular shape.
 *
 * Additional options include:
 * - radius: the radius
 *
 * Example:
 *
 * ```javascript
 * var round = Physics.body('circle', {
 *     x: 30,
 *     y: 20,
 *     radius: 5
 * });
 * ```
 **/
Physics.body('circle', function( parent ){

    var defaults = {
        radius: 1.0
    };

    return {

        // extended
        init: function( options ){

            // call parent init method
            parent.init.call(this, options);

            options = Physics.util.extend({}, defaults, options);

            this.geometry = Physics.geometry('circle', {
                radius: options.radius
            });

            this.recalc();
        },

        // extended
        recalc: function(){
            parent.recalc.call(this);
            // moment of inertia
            this.moi = this.mass * this.geometry.radius * this.geometry.radius / 2;
        }
    };
});


// ---
// inside: src/bodies/compound.js

/*
 * @requires geometries/compound
 */
 /**
  * class CompoundBody < Body
  *
  * Physics.body('compound')
  *
  * Not a body in itself. It's a container to group other bodies. The position of the body is the center of mass.
  * It must have at least one child before being added to the world.
  *
  * Additional config options:
  *
  * - children: Array of [[Body]] objects.
  *
  * Example:
  *
  * ```javascript
  * var thing = Physics.body('compound', {
  *     // place the center of mass at (300, 200)
  *     x: 300,
  *     y: 200,
  *     // the center of mass is automatically calculated and used to position the shape
  *     children: [
  *         body1,
  *         body2,
  *         // ...
  *     ]
  * });
  * ```
  **/
Physics.body('compound', function( parent ){

    var defaults = {

    };

    return {

        // extended
        init: function( options ){

            // call parent init method
            parent.init.call(this, options);

            this.mass = 0;
            this.moi = 0;

            this.children = [];
            this.geometry = Physics.geometry('compound');
            this.addChildren( options.children );
        },

        // extended
        connect: function( world ){
            // sanity check
            if ( this.mass <= 0 ){
                throw 'Can not add empty compound body to world.';
            }
        },

        /**
         * CompoundBody#addChild( body ) -> this
         * - body (Body): The child to add
         *
         * Add a body as a child.
         **/
        addChild: function( body ){

            this.addChildren([ body ]);
            return this;
        },

        /**
         * CompoundBody#addChildren( bodies ) -> this
         * - bodies (Array): The list of children to add
         *
         * Add an array of children to the compound.
         **/
        addChildren: function( bodies ){

            var self = this
                ,scratch = Physics.scratchpad()
                ,com = scratch.vector().zero()
                ,b
                ,pos
                ,i
                ,l = bodies && bodies.length
                ,M = 0
                ;

            if ( !l ){
                return scratch.done( this );
            }

            for ( i = 0; i < l; i++ ){
                b = bodies[ i ];
                // remove body from world if applicable
                if ( b._world ){
                    b._world.remove( b );
                }
                // add child
                this.children.push( b );
                // add child to geometry
                this.geometry.addChild(
                    b.geometry,
                    new Physics.vector(b.offset)
                        .rotate(b.state.angular.pos)
                        .vadd(b.state.pos),
                    b.state.angular.pos
                );
                // calc com contribution
                pos = b.state.pos;
                com.add( pos._[0] * b.mass, pos._[1] * b.mass );
                M += b.mass;
            }

            // add mass
            this.mass += M;
            // com adjustment (assuming com is currently at (0,0) body coords)
            com.mult( 1 / this.mass );

            // shift the center of mass
            this.offset.vsub( com );

            // refresh view on next render
            if ( this._world ){
                this._world.one('render', function(){
                    self.view = null;
                });
            }
            this.recalc();

            return scratch.done( this );
        },

        /**
         * CompoundBody#clear() -> this
         *
         * Remove all children.
         **/
        clear: function(){

            this._aabb = null;
            this.moi = 0;
            this.mass = 0;
            this.offset.zero();
            this.children = [];
            this.geometry.clear();

            return this;
        },

        /**
         * CompoundBody#refreshGeometry() -> this
         *
         * If the children's positions change, `refreshGeometry()` should be called to fix the shape.
         **/
        refreshGeometry: function(){

            this.geometry.clear();

            for ( var i = 0, b, l = this.children.length; i < l; i++ ) {
                b = this.children[ i ];
                this.geometry.addChild( b.geometry, new Physics.vector(b.state.pos).vadd(b.offset), b.state.angular.pos );
            }

            return this;
        },

        // extended
        recalc: function(){

            parent.recalc.call(this);
            // moment of inertia
            var b
                ,moi = 0
                ;

            for ( var i = 0, l = this.children.length; i < l; i++ ) {
                b = this.children[ i ];
                b.recalc();
                // parallel axis theorem
                moi += b.moi + b.mass * b.state.pos.normSq();
            }

            this.moi = moi;
            return this;
        }
    };
});


// ---
// inside: src/bodies/convex-polygon.js

/*
 * @requires geometries/convex-polygon
 */
 /**
  * class ConvexPolygonBody < Body
  *
  * Physics.body('convex-polygon')
  *
  * Body for convex polygons. The position of the body is the centroid of the polygon.
  *
  * Additional config options:
  *
  * - vertices: Array of [[Vectorish]] objects representing the polygon vertices in clockwise (or counterclockwise) order.
  *
  * Example:
  *
  * ```javascript
  * var pentagon = Physics.body('convex-polygon', {
  *     // place the centroid of the polygon at (300, 200)
  *     x: 300,
  *     y: 200,
  *     // the centroid is automatically calculated and used to position the shape
  *     vertices: [
  *         { x: 0, y: -30 },
  *         { x: -29, y: -9 },
  *         { x: -18, y: 24 },
  *         { x: 18, y: 24 },
  *         { x: 29, y: -9 }
  *     ]
  * });
  * ```
  **/
Physics.body('convex-polygon', function( parent ){

    var defaults = {

    };

    return {

        // extended
        init: function( options ){

            // call parent init method
            parent.init.call(this, options);

            options = Physics.util.extend({}, defaults, options);

            this.geometry = Physics.geometry('convex-polygon', {
                vertices: options.vertices
            });

            this.recalc();
        },

        // extended
        recalc: function(){
            parent.recalc.call(this);
            // moment of inertia
            this.moi = Physics.geometry.getPolygonMOI( this.geometry.vertices );
        }
    };
});


// ---
// inside: src/bodies/rectangle.js

/*
 * @requires geometries/rectangle
 */
 /**
  * class RectangleBody < Body
  *
  * Physics.body('rectangle')
  *
  * Body for rectangles. The position of the body is the centroid of the rectangle.
  *
  * Additional config options:
  *
  * - width: The width
  * - height: The height
  *
  * Example:
  *
  * ```javascript
  * var rect = Physics.body('rectangle', {
  *     // place the centroid of the rectangle at (300, 200)
  *     x: 300,
  *     y: 200,
  *     width: 30,
  *     height: 40
  * });
  * ```
  **/
Physics.body('rectangle', function( parent ){

    var defaults = {

    };

    return {

        // extended
        init: function( options ){

            // call parent init method
            parent.init.call(this, options);

            options = Physics.util.extend({}, defaults, options);

            this.geometry = Physics.geometry('rectangle', {
                width: options.width,
                height: options.height
            });

            this.recalc();
        },

        // extended
        recalc: function(){
            var w = this.geometry.width;
            var h = this.geometry.height;
            parent.recalc.call(this);
            // moment of inertia
            this.moi = ( w*w + h*h ) * this.mass / 12;
        }
    };
});


// ---
// inside: src/behaviors/attractor.js

/** 
 * class AttractorBehavior < Behavior
 *
 * `Physics.behavior('attractor')`.
 *
 * Attractor behavior attracts bodies to a specific point.
 *
 * Additional options include:
 * - pos: The position of the attraction point
 * - strength: How strong the attraction is (default: `1`)
 * - order: The power of the inverse distance (default: `2` because that is newtonian gravity... inverse square)
 * - max: The maximum distance in which to apply the attraction (default: Infinity)
 * - min: The minimum distance above which to apply the attraction (default: very small non-zero)
 **/
Physics.behavior('attractor', function( parent ){

    var defaults = {

        pos: null, // default to (0, 0)
        // how strong the attraction is
        strength: 1,
        // power of the inverse distance (2 is inverse square)
        order: 2,
        // max distance to apply it to
        max: false, // infinite
        // min distance to apply it to
        min: false // auto calc
    };

    return {

        // extended
        init: function( options ){

            var self = this;
            this._pos = new Physics.vector();
            // call parent init method
            parent.init.call( this );
            this.options.defaults( defaults );
            this.options.onChange(function( opts ){
                self._maxDist = opts.max === false ? Infinity : opts.max;
                self._minDist = opts.min ? opts.min : 10;
                self.position( opts.pos );
            });
            this.options( options );
        },

        /**
         * AttractorBehavior#position( [pos] ) -> this|Object
         * - pos (Vectorish): The position to set
         * + (Object): Returns the [[Vectorish]] position if no arguments provided
         * + (this): For chaining
         *
         * Get or set the position of the attractor.
         **/
        position: function( pos ){
            
            var self = this;

            if ( pos ){
                this._pos.clone( pos );
                return self;
            }

            return this._pos.values();
        },
        
        // extended
        behave: function( data ){

            var bodies = this.getTargets()
                ,body
                ,order = this.options.order
                ,strength = this.options.strength
                ,minDist = this._minDist
                ,maxDist = this._maxDist
                ,scratch = Physics.scratchpad()
                ,acc = scratch.vector()
                ,norm
                ,g
                ;

            for ( var j = 0, l = bodies.length; j < l; j++ ){
                
                body = bodies[ j ];

                // clone the position
                acc.clone( this._pos );
                acc.vsub( body.state.pos );
                // get the distance
                norm = acc.norm();

                if (norm > minDist && norm < maxDist){

                    g = strength / Math.pow(norm, order);

                    body.accelerate( acc.normalize().mult( g ) );
                }
            }

            scratch.done();
        }
    };
});


// ---
// inside: src/behaviors/body-collision-detection.js

/**
 * class BodyCollisionDetectionBehavior < Behavior
 *
 * `Physics.behavior('body-collision-detection')`.
 *
 * Detect collisions of bodies.
 *
 * Publishes collision events to the world as a group of detected collisions per iteration.
 *
 * The event data will have a `.collisions` property that is an array of collisions of the form:
 *
 * ```javascript
 * {
 *     bodyA: // the first body
 *     bodyB: // the second body
 *     norm: // the normal vector (Vectorish)
 *     mtv: // the minimum transit vector. (the direction and length needed to extract bodyB from bodyA)
 *     pos: // the collision point relative to bodyA
 *     overlap: // the amount bodyA overlaps bodyB
 * }
 * ```
 *
 * Additional options include:
 * - check: channel to listen to for collision candidates (default: `collisions:candidates`). set to `true` to force check every pair of bodies in the world
 * - channel: channel to publish events to (default: `collisions:detected`)
 **/
Physics.behavior('body-collision-detection', function( parent ){

    var supportFnStack = [];

    /*
     * getSupportFn( bodyA, bodyB ) -> Function
     * - bodyA (Object): First body
     * - bodyB (Object): Second body
     * + (Function): The support function
     *
     * Get a general support function for use with GJK algorithm
     */
    var getSupportFn = function getSupportFn( bodyA, bodyB ){

        var hash = Physics.util.pairHash( bodyA.uid, bodyB.uid )
            ,fn = supportFnStack[ hash ]
            ;

        if ( !fn ){
            fn = supportFnStack[ hash ] = function pairSupportFunction( searchDir ){

                var tA = fn.tA
                    ,tB = fn.tB
                    ,vA = fn.tmpv1
                    ,vB = fn.tmpv2
                    ;

                if ( fn.useCore ){
                    vA = bodyA.geometry.getFarthestCorePoint( searchDir.rotateInv( tA ), vA, fn.marginA );
                    vB = bodyB.geometry.getFarthestCorePoint( searchDir.rotate( tA ).rotateInv( tB ).negate(), vB, fn.marginB );
                } else {
                    vA = bodyA.geometry.getFarthestHullPoint( searchDir.rotateInv( tA ), vA );
                    vB = bodyB.geometry.getFarthestHullPoint( searchDir.rotate( tA ).rotateInv( tB ).negate(), vB );
                }

                vA.vadd( bodyA.offset ).transform( tA );
                vB.vadd( bodyB.offset ).transform( tB );
                searchDir.negate().rotate( tB );

                return {
                    a: vA.values(),
                    b: vB.values(),
                    pt: vA.vsub( vB ).values()
                };
            };

            // transforms for coordinate transformations
            fn.tA = new Physics.transform();
            fn.tB = new Physics.transform();

            // temp vectors (used too frequently to justify scratchpad)
            fn.tmpv1 = new Physics.vector();
            fn.tmpv2 = new Physics.vector();
        }

        fn.useCore = false;
        fn.margin = 0;
        fn.tA.setRotation( bodyA.state.angular.pos ).setTranslation( bodyA.state.pos );
        fn.tB.setRotation( bodyB.state.angular.pos ).setTranslation( bodyB.state.pos );
        fn.bodyA = bodyA;
        fn.bodyB = bodyB;

        return fn;
    };

    /*
     * checkGJK( bodyA, bodyB ) -> Object
     * - bodyA (Object): First body
     * - bodyB (Object): Second body
     * + (Object): Collision result
     *
     * Use GJK algorithm to check arbitrary bodies for collisions
     */
    var checkGJK = function checkGJK( bodyA, bodyB ){

        var scratch = Physics.scratchpad()
            ,d = scratch.vector()
            ,tmp = scratch.vector()
            ,os = scratch.vector()
            ,overlap
            ,result
            ,support
            ,inc
            ,collision = false
            ,aabbA = bodyA.aabb()
            ,dimA = Math.min( aabbA.hw, aabbA.hh )
            ,aabbB = bodyB.aabb()
            ,dimB = Math.min( aabbB.hw, aabbB.hh )
            ;

        // just check the overlap first
        support = getSupportFn( bodyA, bodyB );
        d.clone( bodyA.state.pos )
            .vadd( bodyA.getGlobalOffset( os ) )
            .vsub( bodyB.state.pos )
            .vsub( bodyB.getGlobalOffset( os ) )
            ;
        result = Physics.gjk(support, d, true);

        if ( result.overlap ){

            // there is a collision. let's do more work.
            collision = {
                bodyA: bodyA,
                bodyB: bodyB
            };

            // inc by 1% of the smallest dim.
            inc = 1e-2 * Math.min(dimA || 1, dimB || 1);

            // first get the min distance of between core objects
            support.useCore = true;
            support.marginA = 0;
            support.marginB = 0;

            // while there's still an overlap (or we don't have a positive distance)
            // and the support margins aren't bigger than the shapes...
            // search for the distance data
            while ( (result.overlap || result.distance === 0) && (support.marginA < dimA || support.marginB < dimB) ){
                if ( support.marginA < dimA ){
                    support.marginA += inc;
                }
                if ( support.marginB < dimB ){
                    support.marginB += inc;
                }

                result = Physics.gjk(support, d);
            }

            if ( result.overlap || result.maxIterationsReached ){
                // This implementation can't deal with a core overlap yet
                return scratch.done(false);
            }

            // calc overlap
            overlap = (support.marginA + support.marginB) - result.distance;

            if ( overlap <= 0 ){
                return scratch.done(false);
            }

            collision.overlap = overlap;
            // @TODO: for now, just let the normal be the mtv
            collision.norm = d.clone( result.closest.b ).vsub( tmp.clone( result.closest.a ) ).normalize().values();
            collision.mtv = d.mult( overlap ).values();
            // get a corresponding hull point for one of the core points.. relative to body A
            collision.pos = d.clone( collision.norm ).mult( support.marginA ).vadd( tmp.clone( result.closest.a ) ).vsub( bodyA.state.pos ).values();
        }

        return scratch.done( collision );
    };

    /*
     * checkCircles( bodyA, bodyB ) -> Object
     * - bodyA (Object): First body
     * - bodyB (Object): Second body
     * + (Object): Collision result
     *
     * Check two circles for collisions.
     */
    var checkCircles = function checkCircles( bodyA, bodyB ){

        var scratch = Physics.scratchpad()
            ,d = scratch.vector()
            ,tmp = scratch.vector()
            ,overlap
            ,collision = false
            ;

        d.clone( bodyB.state.pos )
            .vadd( bodyB.getGlobalOffset( tmp ) )
            .vsub( bodyA.state.pos )
            .vsub( bodyA.getGlobalOffset( tmp ) ) // save offset for later
            ;
        overlap = d.norm() - (bodyA.geometry.radius + bodyB.geometry.radius);

        // hmm... they overlap exactly... choose a direction
        if ( d.equals( Physics.vector.zero ) ){

            d.set( 1, 0 );
        }

        if ( overlap <= 0 ){

            collision = {
                bodyA: bodyA,
                bodyB: bodyB,
                norm: d.normalize().values(),
                mtv: d.mult( -overlap ).values(),
                pos: d.mult( -bodyA.geometry.radius/overlap ).vadd( tmp ).values(),
                overlap: -overlap
            };
        }

        return scratch.done( collision );
    };

    /*
     * checkPair( bodyA, bodyB[, disp] ) -> Object
     * - bodyA (Object): First body
     * - bodyB (Object): Second body
     * + (Object): Collision result
     *
     * Check a pair for collisions
     */
    var checkPair = function checkPair( bodyA, bodyB ){

        // filter out bodies that don't collide with each other
        if (
            ( bodyA.treatment === 'static' || bodyA.treatment === 'kinematic' ) &&
            ( bodyB.treatment === 'static' || bodyB.treatment === 'kinematic' )
        ){
            return false;
        }

        if ( bodyA.geometry.name === 'circle' && bodyB.geometry.name === 'circle' ){

            return checkCircles( bodyA, bodyB );

        } else if ( bodyA.geometry.name === 'compound' || bodyB.geometry.name === 'compound' ){
            // compound bodies are special. We can't use gjk because
            // they could have concavities. so we do the pieces individually
            var test = (bodyA.geometry.name === 'compound')
                ,compound = test ? bodyA : bodyB
                ,other = test ? bodyB : bodyA
                ,cols
                ,ch
                ,ret = []
                ,scratch = Physics.scratchpad()
                ,vec = scratch.vector()
                ,oldPos = scratch.vector()
                ,otherAABB = other.aabb()
                ,i
                ,l
                ;

            for ( i = 0, l = compound.children.length; i < l; i++ ){

                ch = compound.children[ i ];
                // move body to fake position
                oldPos.clone( ch.state.pos );
                ch.offset.vadd( oldPos.vadd( compound.offset ).rotate( -ch.state.angular.pos ) );
                ch.state.pos.clone( compound.state.pos );
                ch.state.angular.pos += compound.state.angular.pos;

                // check it if the aabbs overlap
                if ( Physics.aabb.overlap(otherAABB, ch.aabb()) ){

                    cols = checkPair( other, ch );

                    if ( cols instanceof Array ){
                        for ( var j = 0, c, ll = cols.length; j < ll; j++ ){
                            c = cols[j];
                            // set body to be the compound body
                            if ( c.bodyA === ch ){
                                c.bodyA = compound;
                            } else {
                                c.bodyB = compound;
                            }
                            ret.push( c );
                        }

                    } else if ( cols ) {
                        // set body to be the compound body
                        if ( cols.bodyA === ch ){
                            cols.bodyA = compound;
                        } else {
                            cols.bodyB = compound;
                        }
                        ret.push( cols );
                    }
                }

                // transform it back
                ch.state.angular.pos -= compound.state.angular.pos;
                ch.offset.vsub( oldPos );
                ch.state.pos.clone( oldPos.rotate( ch.state.angular.pos ).vsub( compound.offset ) );
            }

            return scratch.done( ret );

        } else {

            return checkGJK( bodyA, bodyB );
        }
    };

    var defaults = {

        // channel to listen to for collision candidates
        // set to "true" to force check every pair of bodies in the world
        check: 'collisions:candidates',

        // channel to publish events to
        channel: 'collisions:detected'
    };

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );
        },

        // extended
        connect: function( world ){

            if ( this.options.check === true ){

                world.on( 'integrate:velocities', this.checkAll, this );

            } else {

                world.on( this.options.check, this.check, this );
            }
        },

        // extended
        disconnect: function( world ){

            if ( this.options.check === true ){

                world.off( 'integrate:velocities', this.checkAll, this );

            } else {

                world.off( this.options.check, this.check, this );
            }
        },

        /** internal
         * BodyCollisionDetectionBehavior#check( data )
         * - data (Object): The event data
         *
         * Event callback to check pairs of objects that have been flagged by broad phase for possible collisions.
         **/
        check: function( data ){

            var candidates = data.candidates
                ,pair
                ,targets = this.getTargets()
                ,collisions = []
                ,ret
                ,prevContacts = this.prevContacts || {}
                ,contactList = {}
                ,pairHash = Physics.util.pairHash
                ,hash
                ;

            for ( var i = 0, l = candidates.length; i < l; ++i ){

                pair = candidates[ i ];

                if ( targets === this._world._bodies ||
                    // only check if the members are targeted by this behavior
                    (Physics.util.indexOf( targets, pair.bodyA ) > -1) &&
                    (Physics.util.indexOf( targets, pair.bodyB ) > -1)
                ){
                    ret = checkPair( pair.bodyA, pair.bodyB );

                    if ( ret instanceof Array ){

                        for ( var j = 0, r, ll = ret.length; j < ll; j++ ){
                            r = ret[j];
                            if ( r ){
                                hash = pairHash( pair.bodyA.uid, pair.bodyB.uid );
                                contactList[ hash ] = true;
                                r.collidedPreviously = prevContacts[ hash ];
                                collisions.push( r );
                            }
                        }

                    } else if ( ret ){
                        hash = pairHash( pair.bodyA.uid, pair.bodyB.uid );
                        contactList[ hash ] = true;
                        ret.collidedPreviously = prevContacts[ hash ];

                        collisions.push( ret );
                    }
                }
            }

            this.prevContacts = contactList;

            if ( collisions.length ){

                this._world.emit( this.options.channel, {
                    collisions: collisions
                });
            }
        },

        /** internal
         * BodyCollisionDetectionBehavior#checkAll( data )
         * - data (Object): The event data
         *
         * Event callback to check all pairs of objects in the list for collisions
         **/
        checkAll: function( data ){

            var bodies = this.getTargets()
                ,dt = data.dt
                ,bodyA
                ,bodyB
                ,collisions = []
                ,ret
                ,prevContacts = this.prevContacts || {}
                ,contactList = {}
                ,pairHash = Physics.util.pairHash
                ,hash
                ;

            for ( var j = 0, l = bodies.length; j < l; j++ ){

                bodyA = bodies[ j ];

                for ( var i = j + 1; i < l; i++ ){

                    bodyB = bodies[ i ];

                    ret = checkPair( bodyA, bodyB );

                    if ( ret instanceof Array ){

                        for ( var k = 0, r, ll = ret.length; k < ll; k++ ){
                            r = ret[k];
                            if ( r ){
                                hash = pairHash( bodyA.uid, bodyB.uid );
                                contactList[ hash ] = true;
                                r.collidedPreviously = prevContacts[ hash ];
                                collisions.push( r );
                            }
                        }

                    } else if ( ret ){
                        hash = pairHash( bodyA.uid, bodyB.uid );
                        contactList[ hash ] = true;
                        ret.collidedPreviously = prevContacts[ hash ];

                        collisions.push( ret );
                    }
                }
            }

            this.prevContacts = contactList;

            if ( collisions.length ){

                this._world.emit( this.options.channel, {
                    collisions: collisions
                });
            }
        }
    };

});


// ---
// inside: src/behaviors/body-impulse-response.js

/**
 * class BodyImpulseResponseBehavior < Behavior
 *
 * `Physics.behavior('body-impulse-response')`.
 *
 * Responds to collisions by applying impulses.
 *
 * Additional options include:
 * - check: channel to listen to for collisions (default: `collisions:detected`).
 * - mtvThreshold: apply partial extraction of bodies if the minimum transit vector is less than this value ( default: `1`)
 *   this will depend on your simulation characteristic length scale
 * - bodyExtractDropoff: every body overlap correction (underneith mtvThreshold) will only extract by this fraction (0..1). Helps with stablizing contacts. (default: `0.5`)
 * - forceWakeupAboveOverlapThreshold: force bodies to wake up if the overlap is above mtvThreshold ( default: `true` )
 **/
Physics.behavior('body-impulse-response', function( parent ){

    var defaults = {
        // channel to listen to for collisions
        check: 'collisions:detected'
        // apply partial extraction of bodies if the minimum transit vector is less than this value
        // this will depend on your simulation characteristic length scale
        ,mtvThreshold: 1
        // every body overlap correction (underneith mtvThreshold) will only extract by this fraction (0..1)
        // helps with stablizing contacts.
        ,bodyExtractDropoff: 0.5
        // force bodies to wake up if the overlap is above mtvThreshold
        ,forceWakeupAboveOverlapThreshold: true
    };

    function getUid( b ){
        return b.uid;
    }

    function clampMTV( totalV, mtv, into ){

        var m, n;
        n = mtv.norm();
        m = n - totalV.proj( mtv );
        m = Math.max( 0, Math.min( n, m ) );

        if ( n === 0 ){
            into.zero();
        } else {
            into.clone( mtv ).mult( m/n );
        }

        return into;
    }

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );

            this._bodyList = [];
        },

        // no applyTo method
        applyTo: false,

        // extended
        connect: function( world ){

            world.on( this.options.check, this.respond, this );
        },

        // extended
        disconnect: function( world ){

            world.off( this.options.check, this.respond, this );
        },

        /** internal
         * BodyImpulseResponseBehavior#collideBodes( bodyA, bodyB, normal, point, mtrans, contact )
         * - bodyA (Object): First Body
         * - bodyB (Object): Second body
         * - normal (Vector): Normal vector of the collision surface
         * - point (Vector): Contact point of the collision
         * - mtrans (Vector): Minimum transit vector that is the smallest displacement to separate the bodies
         * - contact (Boolean): Are the bodies in resting contact relative to each other
         *
         * Collide two bodies by modifying their positions and velocities to conserve momentum
         **/
        collideBodies: function(bodyA, bodyB, normal, point, mtrans, contact){

            var fixedA = bodyA.treatment === 'static' || bodyA.treatment === 'kinematic'
                ,fixedB = bodyB.treatment === 'static' || bodyB.treatment === 'kinematic'
                ,scratch = Physics.scratchpad()
                // minimum transit vector for each body
                ,mtv = scratch.vector().clone( mtrans )
                ;

            // do nothing if both are fixed
            if ( fixedA && fixedB ){
                scratch.done();
                return;
            }

            // inverse masses and moments of inertia.
            // give fixed bodies infinite mass and moi
            var invMoiA = fixedA ? 0 : 1 / bodyA.moi
                ,invMoiB = fixedB ? 0 : 1 / bodyB.moi
                ,invMassA = fixedA ? 0 : 1 / bodyA.mass
                ,invMassB = fixedB ? 0 : 1 / bodyB.mass
                // coefficient of restitution between bodies
                ,cor = bodyA.restitution * bodyB.restitution
                // coefficient of friction between bodies
                ,cof = bodyA.cof * bodyB.cof
                // normal vector
                ,n = scratch.vector().clone( normal )
                // vector perpendicular to n
                ,perp = scratch.vector().clone( n ).perp()
                ,tmp = scratch.vector()
                // collision point from A's center
                ,rA = scratch.vector().clone( point )
                // collision point from B's center
                ,rB = scratch.vector().clone( point )
                    .vadd( bodyA.state.pos )
                    .vsub( bodyB.state.pos )
                ,angVelA = bodyA.state.angular.vel
                ,angVelB = bodyB.state.angular.vel
                // relative velocity towards B at collision point
                ,vAB = scratch.vector().clone( bodyB.state.vel )
                        .vadd( tmp.clone(rB).perp().mult( angVelB ) )
                        .vsub( bodyA.state.vel )
                        .vsub( tmp.clone(rA).perp().mult( angVelA ) )
                // break up components along normal and perp-normal directions
                ,rAproj = rA.proj( n )
                ,rAreg = rA.proj( perp )
                ,rBproj = rB.proj( n )
                ,rBreg = rB.proj( perp )
                ,vproj = vAB.proj( n ) // projection of vAB along n
                ,vreg = vAB.proj( perp ) // rejection of vAB along n (perp of proj)
                ,impulse
                ,sign
                ,max
                ,ratio
                ,inContact = contact
                ;

            if ( contact ){

                if ( fixedA ){

                    clampMTV( bodyB._mtvTotal, mtv, tmp );
                    bodyB._mtvTotal.vadd( tmp );

                } else if ( fixedB ){

                    clampMTV( bodyA._mtvTotal, mtv.negate(), tmp );
                    bodyA._mtvTotal.vadd( tmp );
                    mtv.negate();

                } else {

                    ratio = 0.5; //bodyA.mass / ( bodyA.mass + bodyB.mass );
                    mtv.mult( ratio );
                    clampMTV( bodyB._mtvTotal, mtv, tmp );
                    bodyB._mtvTotal.vadd( tmp );

                    mtv.clone( mtrans ).mult( ratio - 1 );
                    clampMTV( bodyA._mtvTotal, mtv, tmp );
                    bodyA._mtvTotal.vadd( tmp );

                }
            }

            // if moving away from each other... don't bother.
            if (vproj >= 0){
                scratch.done();
                return;
            }

            invMoiA = invMoiA === Infinity ? 0 : invMoiA;
            invMoiB = invMoiB === Infinity ? 0 : invMoiB;

            impulse =  - ((1 + cor) * vproj) / ( invMassA + invMassB + (invMoiA * rAreg * rAreg) + (invMoiB * rBreg * rBreg) );
            // vproj += impulse * ( invMass + (invMoi * rreg * rreg) );
            // angVel -= impulse * rreg * invMoi;


            if ( fixedA ){

                // apply impulse
                bodyB.state.vel.vadd( n.mult( impulse * invMassB ) );
                bodyB.state.angular.vel -= impulse * invMoiB * rBreg;

            } else if ( fixedB ){

                // apply impulse
                bodyA.state.vel.vsub( n.mult( impulse * invMassA ) );
                bodyA.state.angular.vel += impulse * invMoiA * rAreg;

            } else {

                // apply impulse
                bodyB.state.vel.vadd( n.mult( impulse * invMassB ) );
                bodyB.state.angular.vel -= impulse * invMoiB * rBreg;
                bodyA.state.vel.vsub( n.mult( invMassA * bodyB.mass ) );
                bodyA.state.angular.vel += impulse * invMoiA * rAreg;
            }

            // inContact = (impulse < 0.004);

            // if we have friction and a relative velocity perpendicular to the normal
            if ( cof && vreg ){


                // TODO: here, we could first assume static friction applies
                // and that the tangential relative velocity is zero.
                // Then we could calculate the impulse and check if the
                // tangential impulse is less than that allowed by static
                // friction. If not, _then_ apply kinetic friction.

                // instead we're just applying kinetic friction and making
                // sure the impulse we apply is less than the maximum
                // allowed amount

                // maximum impulse allowed by kinetic friction
                max = Math.abs(vreg) / ( invMassA + invMassB + (invMoiA * rAproj * rAproj) + (invMoiB * rBproj * rBproj) );
                // the sign of vreg ( plus or minus 1 )
                sign = vreg < 0 ? -1 : 1;

                // get impulse due to friction
                impulse = cof * Math.abs( impulse );
                // constrain the impulse within the "friction cone" ( max < mu * impulse)
                impulse = Math.min( impulse, max );
                impulse *= sign;

                if ( fixedA ){

                    // apply frictional impulse
                    bodyB.state.vel.vsub( perp.mult( impulse * invMassB ) );
                    bodyB.state.angular.vel -= impulse * invMoiB * rBproj;

                } else if ( fixedB ){

                    // apply frictional impulse
                    bodyA.state.vel.vadd( perp.mult( impulse * invMassA ) );
                    bodyA.state.angular.vel += impulse * invMoiA * rAproj;

                } else {

                    // apply frictional impulse
                    bodyB.state.vel.vsub( perp.mult( impulse * invMassB ) );
                    bodyB.state.angular.vel -= impulse * invMoiB * rBproj;
                    bodyA.state.vel.vadd( perp.mult( invMassA * bodyB.mass ) );
                    bodyA.state.angular.vel += impulse * invMoiA * rAproj;
                }
            }

            // wake up bodies if necessary
            if ( bodyA.sleep() ){
                bodyA.sleepCheck();
            }
            if ( bodyB.sleep() ){
                bodyB.sleepCheck();
            }

            scratch.done();
        },

        // internal
        _pushUniq: function( body ){
            var idx = Physics.util.sortedIndex( this._bodyList, body, getUid );
            if ( this._bodyList[ idx ] !== body ){
                this._bodyList.splice( idx, 0, body );
            }
        },

        /** internal
         * BodyImpulseResponseBehavior#respond( data )
         * - data (Object): event data
         *
         * Event callback to respond to collision data.
         **/
        respond: function( data ){

            var self = this
                ,col
                ,collisions = data.collisions// Physics.util.shuffle(data.collisions)
                ,i,l,b
                ;

            for ( i = 0, l = collisions.length; i < l; ++i ){

                col = collisions[ i ];
                // add bodies to list for later
                this._pushUniq( col.bodyA );
                this._pushUniq( col.bodyB );
                // ensure they have mtv stat vectors
                col.bodyA._mtvTotal = col.bodyA._mtvTotal || new Physics.vector();
                col.bodyB._mtvTotal = col.bodyB._mtvTotal || new Physics.vector();
                col.bodyA._oldmtvTotal = col.bodyA._oldmtvTotal || new Physics.vector();
                col.bodyB._oldmtvTotal = col.bodyB._oldmtvTotal || new Physics.vector();

                self.collideBodies(
                    col.bodyA,
                    col.bodyB,
                    col.norm,
                    col.pos,
                    col.mtv,
                    col.collidedPreviously
                );
            }

            // apply mtv vectors from the average mtv vector
            for ( i = 0, l = this._bodyList.length; i < l; ++i ){
                b = this._bodyList.pop();
                // clampMTV( b._oldmtvTotal, b._mtvTotal, b._mtvTotal );

                if ( b._mtvTotal.normSq() < this.options.mtvThreshold ){
                    b._mtvTotal.mult( this.options.bodyExtractDropoff );
                } else if ( this.options.forceWakeupAboveOverlapThreshold ) {
                    // wake up bodies if necessary
                    b.sleep( false );
                }

                b.state.pos.vadd( b._mtvTotal );
                b.state.old.pos.vadd( b._mtvTotal );
                b._oldmtvTotal.swap( b._mtvTotal );
                b._mtvTotal.zero();
            }
        }
    };
});


// ---
// inside: src/behaviors/constant-acceleration.js

/** 
 * class ConstantAccelerationBehavior < Behavior
 *
 * `Physics.behavior('constant-acceleration')`.
 *
 * Constant acceleration behavior.
 *
 * Basically the "gravity" behavior. Used to give "earth-like gravity" to the world.
 *
 * Additional options include:
 * - acc: The acceleration vector (Vectorish). (default: `{ x: 0, y: 0.0004 }`)
 **/
Physics.behavior('constant-acceleration', function( parent ){

    var defaults = {

        acc: { x : 0, y: 0.0004 }
    };

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );

            // extend options
            this._acc = new Physics.vector();
            this.setAcceleration( this.options.acc );
            delete this.options.acc;
        },

        /**
         * ConstantAccelerationBehavior#setAcceleration( acc ) -> this
         * - acc (Vectorish): The acceleration vector
         * 
         * Set the acceleration of the behavior.
         **/
        setAcceleration: function( acc ){

            this._acc.clone( acc );
            return this;
        },

        // extended
        behave: function( data ){

            var bodies = this.getTargets();

            for ( var i = 0, l = bodies.length; i < l; ++i ){
                
                bodies[ i ].accelerate( this._acc );
            }
        }
    };
});

// ---
// inside: src/behaviors/edge-collision-detection.js

/**
 * class EdgeCollisionDetectionBehavior < Behavior
 *
 * `Physics.behavior('edge-collision-detection')`.
 *
 * Used to detect collisions with the boundaries of an AABB.
 *
 * Additional options include:
 * - aabb: The [[Physics.aabb]] bounds to use as the constraining boundary
 * - restitution: The restitution of the boundary walls (default: `0.99`)
 * - cof: The coefficient of friction of the boundary walls (default: `1`)
 * - channel: The channel to publish collisions to. (default: 'collisions:detected')
 **/
Physics.behavior('edge-collision-detection', function( parent ){

    /*
     * checkGeneral( body, bounds, dummy ) -> Array
     * - body (Body): The body to check
     * - bounds (Physics.aabb): The boundary
     * - dummy: (Body): The dummy body to publish as the static other body it collides with
     * + (Array): The collision data
     *
     * Check if a body collides with the boundary
     */
    var checkGeneral = function checkGeneral( body, bounds, dummy ){

        var overlap
            ,aabb = body.aabb()
            ,scratch = Physics.scratchpad()
            ,offset = body.getGlobalOffset( scratch.vector() )
            ,trans = scratch.transform()
            ,dir = scratch.vector()
            ,result = scratch.vector()
            ,collision = false
            ,collisions = []
            ;

        // right
        overlap = (aabb.x + aabb.hw) - bounds.max.x;

        if ( overlap >= 0 ){

            dir.set( 1, 0 ).rotateInv( trans.setRotation( body.state.angular.pos ) );

            collision = {
                bodyA: body,
                bodyB: dummy,
                overlap: overlap,
                norm: {
                    x: 1,
                    y: 0
                },
                mtv: {
                    x: overlap,
                    y: 0
                },
                pos: body.geometry.getFarthestHullPoint( dir, result ).rotate( trans ).vadd( offset ).values()
            };

            collisions.push(collision);
        }

        // bottom
        overlap = (aabb.y + aabb.hh) - bounds.max.y;

        if ( overlap >= 0 ){

            dir.set( 0, 1 ).rotateInv( trans.setRotation( body.state.angular.pos ) );

            collision = {
                bodyA: body,
                bodyB: dummy,
                overlap: overlap,
                norm: {
                    x: 0,
                    y: 1
                },
                mtv: {
                    x: 0,
                    y: overlap
                },
                pos: body.geometry.getFarthestHullPoint( dir, result ).rotate( trans ).vadd( offset ).values()
            };

            collisions.push(collision);
        }

        // left
        overlap = bounds.min.x - (aabb.x - aabb.hw);

        if ( overlap >= 0 ){

            dir.set( -1, 0 ).rotateInv( trans.setRotation( body.state.angular.pos ) );

            collision = {
                bodyA: body,
                bodyB: dummy,
                overlap: overlap,
                norm: {
                    x: -1,
                    y: 0
                },
                mtv: {
                    x: -overlap,
                    y: 0
                },
                pos: body.geometry.getFarthestHullPoint( dir, result ).rotate( trans ).vadd( offset ).values()
            };

            collisions.push(collision);
        }

        // top
        overlap = bounds.min.y - (aabb.y - aabb.hh);

        if ( overlap >= 0 ){

            dir.set( 0, -1 ).rotateInv( trans.setRotation( body.state.angular.pos ) );

            collision = {
                bodyA: body,
                bodyB: dummy,
                overlap: overlap,
                norm: {
                    x: 0,
                    y: -1
                },
                mtv: {
                    x: 0,
                    y: -overlap
                },
                pos: body.geometry.getFarthestHullPoint( dir, result ).rotate( trans ).vadd( offset ).values()
            };

            collisions.push(collision);
        }

        scratch.done();
        return collisions;
    };

    /*
     * checkEdgeCollide( body, bounds, dummy ) -> Array
     * - body (Body): The body to check
     * - bounds (Physics.aabb): The boundary
     * - dummy: (Body): The dummy body to publish as the static other body it collides with
     * + (Array): The collision data
     *
     * Check if a body collides with the boundary
     */
    var checkEdgeCollide = function checkEdgeCollide( body, bounds, dummy ){

        return checkGeneral( body, bounds, dummy );
    };

    var defaults = {

        aabb: null,
        restitution: 0.99,
        cof: 1.0,
        channel: 'collisions:detected'
    };

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );

            this.setAABB( this.options.aabb );
            this.restitution = this.options.restitution;

            this.body = Physics.body('point', {
                treatment: 'static',
                restitution: this.options.restitution,
                cof: this.options.cof
            });
        },

        /**
         * EdgeCollisionDetectionBehavior#setAABB( aabb ) -> this
         * - aabb (Physics.aabb): The aabb to use as the boundary
         *
         * Set the boundaries of the edge.
         **/
        setAABB: function( aabb ){

            if (!aabb) {
                throw 'Error: aabb not set';
            }

            this._edges = {
                min: {
                    x: (aabb.x - aabb.hw),
                    y: (aabb.y - aabb.hh)
                },
                max: {
                    x: (aabb.x + aabb.hw),
                    y: (aabb.y + aabb.hh)
                }
            };

            return this;
        },

        // extended
        connect: function( world ){

            world.on( 'integrate:positions', this.checkAll, this, 2 );
        },

        // extended
        disconnect: function( world ){

            world.off( 'integrate:positions', this.checkAll, this, 2 );
        },

        /** internal
         * EdgeCollisionDetectionBehavior#checkAll( data )
         * - data (Object): Event data
         *
         * Event callback to check all bodies for collisions with the edge
         **/
        checkAll: function( data ){

            var bodies = this.getTargets()
                ,dt = data.dt
                ,body
                ,collisions = []
                ,ret
                ,bounds = this._edges
                ,dummy = this.body
                ,prevContacts = this.prevContacts || {}
                ,contactList = {}
                ,pairHash = Physics.util.pairHash
                ,hash
                ;

            for ( var i = 0, l = bodies.length; i < l; i++ ){

                body = bodies[ i ];

                // only detect dynamic bodies
                if ( body.treatment === 'dynamic' ){

                    ret = checkEdgeCollide( body, bounds, dummy );

                    if ( ret ){
                        hash = pairHash( body.uid, dummy.uid );

                        for ( var j = 0, ll = ret.length; j < ll; j++ ){
                            contactList[ hash ] = true;
                            ret[ j ].collidedPreviously = prevContacts[ hash ];
                        }

                        collisions.push.apply( collisions, ret );
                    }
                }
            }

            this.prevContacts = contactList;

            if ( collisions.length ){

                this._world.emit( this.options.channel, {
                    collisions: collisions
                });
            }
        }
    };

});


// ---
// inside: src/behaviors/interactive.js

/**
 * class InteractiveBehavior < Behavior
 *
 * `Physics.behavior('interactive')`.
 *
 * User interaction helper.
 *
 * Used to get mouse/touch events and add grab interactions.
 *
 * Additional options include:
 * - el: The element of the renderer. What you input as the `el` for the renderer.
 * - moveThrottle: The min time between move events (default: `10`).
 * - minVel: The minimum velocity clamp [[Vectorish]] (default: { x: -5, y: -5 }) to restrict velocity a user can give to a body
 * - maxVel: The maximum velocity clamp [[Vectorish]] (default: { x: 5, y: 5 }) to restrict velocity a user can give to a body
 *
 * The behavior also triggers the following events on the world:
 * ```javascript
 * // a body has been grabbed
 * world.on('interact:grab', function( data ){
 *     data.x; // the x coord
 *     data.y; // the y coord
 *     data.body; // the body that was grabbed
 * });
 * // no body was grabbed, but the renderer area was clicked, or touched
 * world.on('interact:poke', function( data ){
 *     data.x; // the x coord
 *     data.y; // the y coord
 * });
 * // when a mouse or pointer moves
 * world.on('interact:move', function( data ){
 *     data.x; // the x coord
 *     data.y; // the y coord
 *     data.body; // the grabbed body that was moved (if applicable)
 * });
 * // when the viewport is released (mouseup, touchend)
 * world.on('interact:release', function( data ){
 *     data.x; // the x coord
 *     data.y; // the y coord
 *     data.body; // the body that was grabbed (if applicable)
 * });
 * ```
 *
 * The behavior also sets body.isGrabbed = true for any grabbed bodies while they are grabbed.
 **/
Physics.behavior('interactive', function( parent ){

    if ( !document ){
        // must be in node environment
        return {};
    }

    var defaults = {
            // the element to monitor
            el: null,
            // time between move events
            moveThrottle: 1000 / 100 | 0,
            // minimum velocity clamp
            minVel: { x: -5, y: -5 },
            // maximum velocity clamp
            maxVel: { x: 5, y: 5 }
        }
        ,getElementOffset = function( el ){
            var curleft = 0
                ,curtop = 0
                ;

            if (el.offsetParent) {
                do {
                    curleft += el.offsetLeft;
                    curtop += el.offsetTop;
                } while (el = el.offsetParent);
            }

            return { left: curleft, top: curtop };
        }
        ;

    return {
        // extended
        init: function( options ){

            var self = this;

            // call parent init method
            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );

            // vars
            this.bodyData = {};
            this.bodyDataByUID = {};

            this.el = typeof this.options.el === 'string' ? document.getElementById(this.options.el) : this.options.el;

            if ( !this.el ){
                throw "No DOM element specified";
            }

            // init events
            // when there are multiple touchdowns, grab is usually called separately for each,
            // but we loop through e.changedTouches just in case
            self.grab = function grab( e ){
                var pos
                    ,body
                    ,touchId
                    ,touch
                    ,offset
                    ,data
                    ,touchIndex
                    ,l
                    ;

                if ( self._world ){

                    // Adjust for PointerEvent and older browsers
                    if ( !e.changedTouches ) {
                        e.changedTouches = [ e ];
                    }

                    offset = getElementOffset( e.target );

                    for ( touchIndex = 0, l = e.changedTouches.length; touchIndex < l; touchIndex++) {
                        touch = e.changedTouches[touchIndex];
                        touchId = touch.identifier || touch.pointerId || "mouse";
                        pos = { idx: touchId, x: touch.pageX - offset.left, y: touch.pageY - offset.top };
                        body = self._world.findOne({ $at: new Physics.vector( pos ), $in: self.getTargets() });

                        if ( body ){
                            // we're trying to grab a body

                            // fix the body in place
                            body.state.vel.zero();
                            body.state.angular.vel = 0;
                            body.isGrabbed = true;
                            // remember the currently grabbed bodies
                            data = self.bodyData[touchId] || {};
                            data.body = body;
                            // wake the body up
                            body.sleep( false );
                            data.time = Physics.util.ticker.now();

                            // if we're grabbing the same body twice we don't want to remember the wrong treatment.
                            data.treatment = self.bodyDataByUID[ body.uid ] ? self.bodyDataByUID[ body.uid ].treatment : body.treatment;
                            // change its treatment but remember its old treatment
                            body.treatment = 'kinematic';
                            // remember the click/touch offset
                            data.pos = data.pos || new Physics.vector();
                            data.pos.clone( pos );

                            data.offset = data.offset || new Physics.vector();
                            data.offset.clone( pos ).vsub( body.state.pos );
                            // init touchPointsOld here, too, so we don't have to do it in "move"
                            data.oldPos = data.oldPos || new Physics.vector();
                            data.oldPos.clone( pos );

                            pos.body = body;
                            self.bodyData[touchId] = data;
                            self.bodyDataByUID[ body.uid ] = data;
                            self._world.emit('interact:grab', pos);

                        } else {

                            self._world.emit('interact:poke', pos);
                        }
                    }
                }
            };

            // when there are multiple touchdowns, move is called once
            // and e.changedTouches will have one or more touches in it
            self.move = Physics.util.throttle(function move( e ){
                var pos
                    ,state
                    ,body
                    ,touchId
                    ,touch
                    ,offset
                    ,data
                    ,touchIndex
                    ,l
                    ;

                if ( self._world ){

                    // Adjust for PointerEvent and older browsers
                    if ( !e.changedTouches ) {
                        e.changedTouches = [ e ];
                    }

                    offset = getElementOffset( self.el );

                    for ( touchIndex = 0, l = e.changedTouches.length; touchIndex < l; touchIndex++) {
                        touch = e.changedTouches[touchIndex];
                        touchId = touch.identifier || touch.pointerId || "mouse";
                        pos = { idx: touchId, x: touch.pageX - offset.left, y: touch.pageY - offset.top };
                        data = self.bodyData[touchId];

                        if ( data ){
                            body = data.body;

                            // wake the body up
                            body.sleep( false );
                            data.time = Physics.util.ticker.now();

                            // set old mouse position
                            data.oldPos.clone( data.pos );
                            // get new mouse position
                            data.pos.clone( pos );

                            pos.body = body;
                        }

                        self._world.emit('interact:move', pos);
                    }
                }

            }, self.options.moveThrottle);

            // when there are multiple touchups, release is called once
            // and e.changedTouches will have one or more touches in it
            self.release = function release( e ){
                var pos
                    ,body
                    ,touchId
                    ,touch
                    ,offset
                    ,data
                    ,dt
                    ,touchIndex
                    ,l
                    ;

                if ( self._world ){

                    // Adjust for PointerEvent and older browsers
                    if ( !e.changedTouches ) {
                        e.changedTouches = [ e ];
                    }

                    for ( touchIndex = 0, l = e.changedTouches.length; touchIndex < l; touchIndex++) {
                        offset = getElementOffset( self.el );
                        touch = e.changedTouches[touchIndex];
                        touchId = touch.identifier || touch.pointerId || "mouse";
                        pos = { idx: touchId, x: touch.pageX - offset.left, y: touch.pageY - offset.top };
                        data = self.bodyData[touchId];

                        // release the body
                        if ( data ){
                            body = data.body;
                            // wake the body up
                            body.sleep( false );
                            // get new mouse position
                            data.pos.clone( pos );

                            dt = Math.max(Physics.util.ticker.now() - data.time, self.options.moveThrottle);
                            body.treatment = data.treatment;
                            // calculate the release velocity
                            body.state.vel.clone( data.pos ).vsub( data.oldPos ).mult( 1 / dt );
                            // make sure it's not too big
                            body.state.vel.clamp( self.options.minVel, self.options.maxVel );

                            body.isGrabbed = false;
                            pos.body = body;

                            delete body.isGrabbed;
                        }

                        // emit before we delete the vars in case
                        // the listeners need the body
                        self._world.emit('interact:release', pos);

                        // remove vars
                        delete self.bodyData[touchId];
                    }
                }
            };
        },

        // extended
        connect: function( world ){

            // subscribe the .behave() method to the position integration step
            world.on('integrate:positions', this.behave, this);

            if ( window.PointerEvent ) {

                this.el.addEventListener('pointerdown', this.grab);
                window.addEventListener('pointermove', this.move);
                window.addEventListener('pointerup', this.release);

            } else {

                this.el.addEventListener('mousedown', this.grab);
                this.el.addEventListener('touchstart', this.grab);

                window.addEventListener('mousemove', this.move);
                window.addEventListener('touchmove', this.move);

                window.addEventListener('mouseup', this.release);
                window.addEventListener('touchend', this.release);

            }
        },

        // extended
        disconnect: function( world ){

            // unsubscribe when disconnected
            world.off('integrate:positions', this.behave, this);

            if ( window.PointerEvent ) {

                this.el.removeEventListener('pointerdown', this.grab);
                window.removeEventListener('pointermove', this.move);
                window.removeEventListener('pointerup', this.release);

            } else {

                this.el.removeEventListener('mousedown', this.grab);
                this.el.removeEventListener('touchstart', this.grab);

                window.removeEventListener('mousemove', this.move);
                window.removeEventListener('touchmove', this.move);

                window.removeEventListener('mouseup', this.release);
                window.removeEventListener('touchend', this.release);

            }
        },

        // extended
        behave: function( data ){

            var self = this
                ,state
                ,dt = Math.max(data.dt, self.options.moveThrottle)
                ,body
                ,d
                ;

            // if we have one or more bodies grabbed, we need to move them to the new mouse/finger positions.
            // we'll do this by adjusting the velocity so they get there at the next step
            for ( var touchId in self.bodyData ) {
                d = self.bodyData[touchId];
                body = d.body;
                state = body.state;
                state.vel.clone( d.pos ).vsub( d.offset ).vsub( state.pos ).mult( 1 / dt );
            }
        }
    };
});


// ---
// inside: src/behaviors/newtonian.js

/**
 * class NewtonianBehavior < Behavior
 *
 * `Physics.behavior('newtonian')`.
 *
 * Newtonian attraction between bodies (inverse square law).
 *
 * Additional options include:
 * - strength: The strength of the interaction between bodies. (default: `1`)
 * - max: The maximum distance between bodies at which to apply the behavior. (default: `false`... infinite)
 * - min: The minimum distance between bodies at which to apply the behavior. (default: `false`... autocalculate)
 **/
Physics.behavior('newtonian', function( parent ){

    var defaults = {

        strength: 1,
        // max distance to apply it to
        max: false, // infinite
        // min distance to apply it to
        min: false // auto calc
    };

    return {

        // extended
        init: function( options ){

            var self = this;
            // call parent init method
            parent.init.call( this );
            this.options.defaults( defaults );
            this.options.onChange(function( opts ){
                self._maxDistSq = opts.max === false ? Infinity : opts.max * opts.max;
                self._minDistSq = opts.min ? opts.min * opts.min : 100 * opts.strength;
            });
            this.options( options );
        },

        calcPotential: function( posA, posB, out ){

            var strength = this.options.strength
                ,minDistSq = this._minDistSq
                ,maxDistSq = this._maxDistSq
                ,normsq
                ,g
                ,pos
                ;

            pos = out || new Physics.vector();

            // clone the position
            pos.clone( posB ).vsub( posA );
            // get the square distance
            normsq = pos.normSq();

            if (normsq > minDistSq && normsq < maxDistSq){

                g = strength / normsq;
                return pos.normalize().mult( g );
            }

            return pos.zero();
        },

        // extended
        behave: function( data ){

            var bodies = this.getTargets()
                ,body
                ,other
                ,scratch = Physics.scratchpad()
                ,potential = scratch.vector()
                ,comp
                ,bodyA
                ,bodyB
                ,posA = scratch.vector()
                ,posB = scratch.vector()
                ,i, j, k, m, l, ll, lll
                ;

            for ( j = 0, l = bodies.length; j < l; j++ ){

                body = bodies[ j ];

                for ( i = j + 1; i < l; i++ ){

                    other = bodies[ i ];

                    if ( body.name === 'compound' ){
                        comp = body;
                    } else if ( other.name === 'compound' ){
                        comp = other;
                        other = body;
                    }

                    if ( comp ){
                        if ( other.name === 'compound' ){
                            for ( k = 0, ll = comp.children.length; k < ll; k++ ){
                                bodyA = comp.children[ k ];
                                comp.toWorldCoords( posA.clone( bodyA.state.pos ).vadd( comp.offset ) );
                                for ( m = 0, lll = other.children.length; m < lll; m++ ){
                                    bodyB = other.children[ m ];
                                    other.toWorldCoords( posB.clone( bodyB.state.pos ).vadd( other.offset ) );
                                    this.calcPotential( posA, posB, potential );
                                    comp.accelerate( potential.mult( bodyB.mass ) );
                                    other.accelerate( potential.mult( bodyA.mass/bodyB.mass ).negate() );
                                }
                            }
                        } else {
                            for ( k = 0, ll = comp.children.length; k < ll; k++ ){
                                bodyA = comp.children[ k ];
                                comp.toWorldCoords( posA.clone( bodyA.state.pos ).vadd( comp.offset ) );
                                this.calcPotential( posA, other.state.pos, potential );
                                comp.accelerate( potential.mult( other.mass ) );
                                other.accelerate( potential.mult( bodyA.mass/other.mass ).negate() );
                            }
                        }

                    } else {

                        this.calcPotential( body.state.pos, other.state.pos, potential );
                        body.accelerate( potential.mult( other.mass ) );
                        other.accelerate( potential.mult( body.mass/other.mass ).negate() );
                    }

                    comp = null;
                }
            }

            scratch.done();
        }
    };
});


// ---
// inside: src/behaviors/sweep-prune.js

/**
 * class SweepPruneBehavior < Behavior
 *
 * `Physics.behavior('sweep-prune')`.
 *
 * Sweep and Prune implementation for broad phase collision detection.
 *
 * This massively improves the speed of collision detection. It's set up to always be used with [[BodyCollisionDetection]], and [[BodyImpulseResponse]].
 *
 * Additional options include:
 * - channel: The channel to publish collision candidates to. (default: `collisions:candidates`)
 **/
Physics.behavior('sweep-prune', function( parent ){

    var uid = 1;

    // Get a unique numeric id for internal use
    var getUniqueId = function getUniqueId(){

        return uid++;
    };

    // add z: 2 to get this to work in 3D
    var dof = { x: 0, y: 1 }; // degrees of freedom
    // change to "3" to get it to work in 3D
    var maxDof = 2;

    var pairHash = Physics.util.pairHash;

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults({
                channel: 'collisions:candidates' //default channel
            });
            this.options( options );

            this.encounters = [];
            this.candidates = [];

            this.clear();
        },

        /**
         * SweepPruneBehavior#clear()
         *
         * Refresh tracking data
         **/
        clear: function(){

            this.tracked = [];
            this.pairs = []; // pairs selected as candidate collisions by broad phase
            this.intervalLists = []; // stores lists of aabb projection intervals to be sorted

            // init intervalLists
            for ( var xyz = 0; xyz < maxDof; ++xyz ){

                this.intervalLists[ xyz ] = [];
            }
        },

        // extended
        connect: function( world ){

            world.on( 'add:body', this.trackBody, this );
            world.on( 'remove:body', this.untrackBody, this );
            world.on( 'integrate:positions', this.sweep, this, 1 );

            // add current bodies
            var bodies = world.getBodies();
            for ( var i = 0, l = bodies.length; i < l; ++i ){

                this.trackBody({ body: bodies[ i ] });
            }
        },

        // extended
        disconnect: function( world ){

            world.off( 'add:body', this.trackBody, this );
            world.off( 'remove:body', this.untrackBody, this );
            world.off( 'integrate:positions', this.sweep, this, 1 );
            this.clear();
        },

        /** internal
         * SweepPruneBehavior#broadPhase() -> Array
         * + (Array): The candidate data of overlapping aabbs
         *
         * Execute the broad phase and get candidate collisions
         **/
        broadPhase: function(){

            this.updateIntervals();
            this.sortIntervalLists();

            if ( this._world ){
                this._world.emit('sweep-prune:intervals', this.intervalLists);
            }

            return this.checkOverlaps();
        },

        /** internal
         * SweepPruneBehavior#sortIntervalLists()
         *
         * Simple insertion sort for each axis
         **/
        sortIntervalLists: function(){

            var list
                ,len
                ,i
                ,hole
                ,bound
                ,boundVal
                ,left
                ,leftVal
                ,axis
                ;

            // for each axis...
            for ( var xyz = 0; xyz < maxDof; ++xyz ){

                // get the intervals for that axis
                list = this.intervalLists[ xyz ];
                i = 0;
                len = list.length;
                axis = xyz;

                // for each interval bound...
                while ( (++i) < len ){

                    // store bound
                    bound = list[ i ];
                    boundVal = bound.val.get( axis );
                    hole = i;

                    left = list[ hole - 1 ];
                    leftVal = left && left.val.get( axis );

                    // while others are greater than bound...
                    while (
                        hole > 0 &&
                        (
                            leftVal > boundVal ||
                            // if it's an equality, only move it over if
                            // the hole was created by a minimum
                            // and the previous is a maximum
                            // so that we detect contacts also
                            leftVal === boundVal &&
                            ( left.type && !bound.type )
                        )
                    ) {

                        // move others greater than bound to the right
                        list[ hole ] = left;
                        hole--;
                        left = list[ hole - 1 ];
                        leftVal = left && left.val.get( axis );
                    }

                    // insert bound in the hole
                    list[ hole ] = bound;
                }
            }
        },

        /** internal
         * SweepPruneBehavior#getPair( tr1, tr2, doCreate ) -> Object
         * - tr1 (Object): First tracker
         * - tr2 (Object): Second tracker
         * - doCreate (Boolean): Create if not found
         * + (Object): Pair object or null if not found
         *
         * Get a pair object for the tracker objects
         **/
        getPair: function(tr1, tr2, doCreate){

            var hash = pairHash( tr1.id, tr2.id );

            if ( hash === false ){
                return null;
            }

            var c = this.pairs[ hash ];

            if ( !c ){

                if ( !doCreate ){
                    return null;
                }

                c = this.pairs[ hash ] = {
                    bodyA: tr1.body,
                    bodyB: tr2.body,
                    flag: 1
                };
            }

            if ( doCreate){
                c.flag = 1;
            }

            return c;
        },

        // getPair: function(tr1, tr2, doCreate){

        //     var hash = Math.min(tr1.id, tr2.id) // = pairHash( tr1.id, tr2.id )
        //         ,other = Math.max(tr1.id, tr2.id)
        //         ,first
        //         ,c
        //         ;

        //     if ( hash === false ){
        //         return null;
        //     }

        //     first = this.pairs[ hash ];

        //     if ( !first ){
        //         if ( !doCreate ){
        //             return null;
        //         }

        //         first = this.pairs[ hash ] = [];
        //     }

        //     c = first[ other ];

        //     if ( !c ){

        //         if ( !doCreate ){
        //             return null;
        //         }

        //         c = first[ other ] = {
        //             bodyA: tr1.body,
        //             bodyB: tr2.body,
        //             flag: 1
        //         };
        //     }

        //     return c;
        // },

        /** internal
         * SweepPruneBehavior#checkOverlaps() -> Array
         * + (Array): List of candidate collisions
         *
         * Check each axis for overlaps of bodies AABBs
         **/
        checkOverlaps: function(){

            var isX
                ,hash
                ,tr1
                ,tr2
                ,bound
                ,list
                ,len
                ,i
                ,j
                ,c
                // determine which axis is the last we need to check
                ,collisionFlag = 1 << (dof.z + 1) << (dof.y + 1) << (dof.x + 1)
                ,encounters = this.encounters
                ,enclen = 0
                ,candidates = this.candidates
                ;

            Physics.util.clearArray( encounters );
            Physics.util.clearArray( candidates );

            for ( var xyz = 0; xyz < maxDof; ++xyz ){

                // is the x coord
                isX = (xyz === 0);
                // get the interval list for this axis
                list = this.intervalLists[ xyz ];

                // for each interval bound
                for ( i = 0, len = list.length; i < len; i++ ){

                    bound = list[ i ];
                    tr1 = bound.tracker;

                    if ( bound.type ){

                        // is a max

                        j = enclen;

                        for ( j = enclen - 1; j >= 0; j-- ){

                            tr2 = encounters[ j ];

                            // if they are the same tracked interval
                            if ( tr2 === tr1 ){

                                // remove the interval from the encounters list
                                // faster than .splice()
                                if ( j < enclen - 1 ) {

                                    encounters[ j ] = encounters.pop();

                                } else {

                                    // encountered a max right after a min... no overlap
                                    encounters.pop();
                                }

                                enclen--;

                            } else {

                                // check if we have flagged this pair before
                                // if it's the x axis, create a pair
                                c = this.getPair( tr1, tr2, isX );

                                if ( c && c.flag < collisionFlag ){

                                    // if it's greater than the axis index, set the flag
                                    // to = 0.
                                    // if not, increment the flag by one.
                                    c.flag = c.flag << (xyz + 1);

                                    // c.flag will equal collisionFlag
                                    // if we've incremented the flag
                                    // enough that all axes are overlapping
                                    if ( c.flag === collisionFlag ){

                                        // overlaps on all axes.
                                        // add it to possible collision
                                        // candidates list for narrow phase

                                        candidates.push( c );
                                    }
                                }
                            }
                        }

                    } else {

                        // is a min
                        // just add this minimum to the encounters list
                        enclen = encounters.push( tr1 );
                    }
                }
            }

            return candidates;
        },

        /** internal
         * SweepPruneBehavior#updateIntervals()
         *
         * Update position intervals on each axis
         **/
        updateIntervals: function(){

            var tr
                ,intr
                ,aabb
                ,list = this.tracked
                ,i = list.length
                ;

            // for all tracked bodies
            while ( (--i) >= 0 ){

                tr = list[ i ];
                intr = tr.interval;
                aabb = tr.body.aabb();

                // copy the position (plus or minus) the aabb half-dimensions
                // into the min/max intervals
                intr.min.val.clone( aabb ).sub( aabb.hw, aabb.hh );
                intr.max.val.clone( aabb ).add( aabb.hw, aabb.hh );
            }
        },

        /** internal
         * SweepPruneBehavior#trackBody( data )
         * - data (Object): Event data
         *
         * Event callback to add body to list of those tracked by sweep and prune
         **/
        trackBody: function( data ){

            var body = data.body
                ,tracker = {

                    id: getUniqueId(),
                    body: body
                }
                ,intr = {

                    min: {
                        type: false, //min
                        val: new Physics.vector(),
                        tracker: tracker
                    },

                    max: {
                        type: true, //max
                        val: new Physics.vector(),
                        tracker: tracker
                    }
                }
                ;

            tracker.interval = intr;
            this.tracked.push( tracker );

            for ( var xyz = 0; xyz < maxDof; ++xyz ){

                this.intervalLists[ xyz ].push( intr.min, intr.max );
            }
        },

        /** internal
         * SweepPruneBehavior#untrackBody( data )
         * - data (Object): Event data
         *
         * Event callback to remove body from list of those tracked
         **/
        untrackBody: function( data ){

            var body = data.body
                ,list
                ,minmax
                ,trackedList = this.tracked
                ,tracker
                ,count
                ;

            for ( var i = 0, l = trackedList.length; i < l; ++i ){

                tracker = trackedList[ i ];

                if ( tracker.body === body ){

                    // remove the tracker at this index
                    trackedList.splice(i, 1);

                    for ( var xyz = 0; xyz < maxDof; ++xyz ){

                        count = 0;
                        list = this.intervalLists[ xyz ];

                        for ( var j = 0, m = list.length; j < m; ++j ){

                            minmax = list[ j ];

                            if ( minmax === tracker.interval.min || minmax === tracker.interval.max ){

                                // remove interval from list
                                list.splice(j, 1);
                                j--;
                                l--;

                                if (count > 0){
                                    break;
                                }

                                count++;
                            }
                        }
                    }

                    break;
                }
            }
        },

        /** internal
         * SweepPruneBehavior#sweep( data )
         * - data (Object): Event data
         *
         * Event callback to sweep and publish event if any candidate collisions are found
         **/
        sweep: function( data ){

            var self = this
                ,candidates
                ;

            candidates = self.broadPhase();

            if ( candidates.length ){

                this._world.emit( this.options.channel, {
                    candidates: candidates
                });
            }
        }
    };
});


// ---
// inside: src/behaviors/verlet-constraints.js

/**
 * class VerletConstraintsBehavior < Behavior
 *
 * `Physics.behavior('verlet-constraints')`.
 *
 * Verlet constraints manager.
 *
 * Handles distance constraints, and angle constraints
 *
 * Additional options include:
 * - iterations: The number of iterations to take to relax the constraints. (default: `2`)
 **/
Physics.behavior('verlet-constraints', function( parent ){

    var TWOPI = 2 * Math.PI;

    var defaults = {

        // number of iterations to resolve constraints
        iterations: 2
    };

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );

            this._distanceConstraints = [];
            this._angleConstraints = [];
        },

        // extended
        connect: function( world ){

            var intg = world.integrator();

            if ( intg && intg.name.indexOf('verlet') < 0 ){

                throw 'The rigid constraint manager needs a world with a "verlet" compatible integrator.';
            }

            world.on('integrate:positions', this.resolve, this);
        },

        // extended
        disconnect: function( world ){

            world.off('integrate:positions', this.resolve, this);
        },

        /**
         * VerletConstraintsBehavior#drop() -> this
         *
         * Remove all constraints
         **/
        drop: function(){

            // drop the current constraints
            this._distanceConstraints = [];
            this._angleConstraints = [];
            return this;
        },

        /**
         * VerletConstraintsBehavior#distanceConstraint( bodyA, bodyB[, stiffness, targetLength] ) -> Object
         * - bodyA (Body): First body
         * - bodyB (Body): Second body
         * - stiffness (Number): A number between 0 and 1 that represents the stiffness of the constraint. Defaults to: `0.5`
         * - targetLength (Number): Target length. defaults to current distance between the bodies
         * + (Object): The constraint data object
         *
         * Constrain two bodies to a target relative distance.
         *
         * Returns constraint data that can be used to remove the constraint later.
         *
         * - `.bodyA` and `.bodyB` are references to the bodies
         * - `.type` is the type of constraint
         * - `.id` is the string ID of the constraint
         * - `.stiffness` is the stiffness
         * - `.targetLength` is the target length
         **/
        distanceConstraint: function( bodyA, bodyB, stiffness, targetLength ){

            var cst;

            if (!bodyA || !bodyB){

                return false;
            }

            cst = {
                id: Physics.util.uniqueId('dis-constraint'),
                type: 'dis',
                bodyA: bodyA,
                bodyB: bodyB,
                stiffness: stiffness || 0.5,
                targetLength: targetLength || bodyB.state.pos.dist( bodyA.state.pos )
            };

            cst.targetLengthSq = cst.targetLength * cst.targetLength;

            this._distanceConstraints.push( cst );
            return cst;
        },

        /**
         * VerletConstraintsBehavior#angleConstraint( bodyA, bodyB, bodyC[, stiffness, targetAngle] ) -> Object
         * - bodyA (Body): First body
         * - bodyB (Body): Second body
         * - bodyC (Body): Third body
         * - stiffness (Number): A number between 0 and 1 that represents the stiffness of the constraint. Defaults to: `0.5`
         * - targetAngle (Number): Target angle. Defaults to the current angle between bodies
         * + (Object): The constraint data object
         *
         * Constrain three bodies to a target relative angle
         *
         * Returns constraint data that can be used to remove the constraint later.
         *
         * - `.bodyA`, `.bodyB`, and `.bodyC` are references to the bodies
         * - `.type` is the type of constraint
         * - `.id` is the string ID of the constraint
         * - `.stiffness` is the stiffness
         * - `.targetAngle` is the target angle
         **/
        angleConstraint: function( bodyA, bodyB, bodyC, stiffness, targetAngle ){

            var cst;

            if (!bodyA || !bodyB){

                return false;
            }

            cst = {
                id: Physics.util.uniqueId('ang-constraint'),
                type: 'ang',
                bodyA: bodyA,
                bodyB: bodyB,
                bodyC: bodyC,
                stiffness: stiffness || 0.5,
                targetAngle: targetAngle || bodyB.state.pos.angle2( bodyA.state.pos, bodyC.state.pos )
            };

            this._angleConstraints.push( cst );
            return cst;
        },

        /**
         * VerletConstraintsBehavior#remove( constraintData ) -> this
         * VerletConstraintsBehavior#remove( constraintId ) -> this
         * - constraintData (Object): The constraint data returned when creating a constraint
         * - constraintId (String): The constraint id
         *
         * Remove a constraint
         **/
        remove: function( cstrOrId ){

            var constraints
                ,type
                ,isObj
                ,i
                ,l
                ;

            isObj = Physics.util.isObject( cstrOrId );

            type = (isObj) ? cstrOrId.type : cstrOrId.substr(0, 3);
            constraints = ( type === 'ang' ) ? this._angleConstraints : this._distanceConstraints;

            if ( isObj ){

                for ( i = 0, l = constraints.length; i < l; ++i ){

                    if ( constraints[ i ] === cstrOrId ){

                        constraints.splice( i, 1 );
                        return this;
                    }
                }
            } else {

                for ( i = 0, l = constraints.length; i < l; ++i ){

                    if ( constraints[ i ].id === cstrOrId ){

                        constraints.splice( i, 1 );
                        return this;
                    }
                }
            }

            return this;
        },

        /** internal
         * VerletConstraintsBehavior#resolveAngleConstraints( coef )
         * - coef (Number): Coefficient for this resolution phase
         *
         * Resolve angle constraints.
         **/
        resolveAngleConstraints: function( coef ){

            var constraints = this._angleConstraints
                ,scratch = Physics.scratchpad()
                ,trans = scratch.transform()
                ,con
                ,ang
                ,corr
                ,proportion
                ,invMassSum
                ;

            for ( var i = 0, l = constraints.length; i < l; ++i ){

                con = constraints[ i ];

                ang = con.bodyB.state.pos.angle2( con.bodyA.state.pos, con.bodyC.state.pos );
                corr = ang - con.targetAngle;

                if (!corr){

                    continue;

                } else if (corr <= -Math.PI){

                    corr += TWOPI;

                } else if (corr >= Math.PI){

                    corr -= TWOPI;
                }

                trans.setTranslation( con.bodyB.state.pos );

                corr *= -coef * con.stiffness;

                if ( con.bodyA.treatment === 'dynamic' && con.bodyB.treatment === 'dynamic' && con.bodyC.treatment === 'dynamic' ){
                    invMassSum = 1 / (con.bodyA.mass + con.bodyB.mass + con.bodyC.mass);
                }

                if ( con.bodyA.treatment === 'dynamic' ){

                    if ( con.bodyB.treatment === 'dynamic' && con.bodyC.treatment === 'dynamic' ){

                        ang = corr * (con.bodyB.mass + con.bodyC.mass) * invMassSum;

                    } else if ( con.bodyB.treatment !== 'dynamic' ){

                        ang = corr * con.bodyC.mass / ( con.bodyC.mass + con.bodyA.mass );

                    } else {

                        ang = corr * con.bodyB.mass / ( con.bodyB.mass + con.bodyA.mass );
                    }


                    trans.setRotation( ang );
                    con.bodyA.state.pos.translateInv( trans );
                    con.bodyA.state.pos.rotate( trans );
                    con.bodyA.state.pos.translate( trans );
                }

                if ( con.bodyC.treatment === 'dynamic' ){

                    if ( con.bodyA.treatment === 'dynamic' && con.bodyB.treatment === 'dynamic' ){

                        ang = -corr * (con.bodyB.mass + con.bodyA.mass) * invMassSum;

                    } else if ( con.bodyB.treatment !== 'dynamic' ){

                        ang = -corr * con.bodyA.mass / ( con.bodyC.mass + con.bodyA.mass );

                    } else {

                        ang = -corr * con.bodyB.mass / ( con.bodyB.mass + con.bodyC.mass );
                    }

                    trans.setRotation( ang );
                    con.bodyC.state.pos.translateInv( trans );
                    con.bodyC.state.pos.rotate( trans );
                    con.bodyC.state.pos.translate( trans );
                }

                if ( con.bodyB.treatment === 'dynamic' ){

                    if ( con.bodyA.treatment === 'dynamic' && con.bodyC.treatment === 'dynamic' ){

                        ang = corr * (con.bodyA.mass + con.bodyC.mass) * invMassSum;

                    } else if ( con.bodyA.treatment !== 'dynamic' ){

                        ang = corr * con.bodyC.mass / ( con.bodyC.mass + con.bodyB.mass );

                    } else {

                        ang = corr * con.bodyA.mass / ( con.bodyA.mass + con.bodyC.mass );
                    }

                    // ang = corr;

                    trans.setRotation( ang ).setTranslation( con.bodyA.state.pos );
                    con.bodyB.state.pos.translateInv( trans );
                    con.bodyB.state.pos.rotate( trans );
                    con.bodyB.state.pos.translate( trans );

                    trans.setTranslation( con.bodyC.state.pos );
                    con.bodyB.state.pos.translateInv( trans );
                    con.bodyB.state.pos.rotateInv( trans );
                    con.bodyB.state.pos.translate( trans );
                }

                con.bodyA.sleepCheck();
                con.bodyB.sleepCheck();
                con.bodyC.sleepCheck();
            }

            scratch.done();
        },

        /** internal
         * VerletConstraintsBehavior#resolveDistanceConstraints( coef )
         * - coef (Number): Coefficient for this resolution phase
         *
         * Resolve distance constraints.
         **/
        resolveDistanceConstraints: function( coef ){

            var constraints = this._distanceConstraints
                ,scratch = Physics.scratchpad()
                ,BA = scratch.vector()
                ,con
                ,len
                ,corr
                ,proportion
                ;

            for ( var i = 0, l = constraints.length; i < l; ++i ){

                con = constraints[ i ];

                // move constrained bodies to target length based on their
                // mass proportions
                BA.clone( con.bodyB.state.pos ).vsub( con.bodyA.state.pos );
                len = BA.normSq() || Math.random() * 0.0001;
                corr = coef * con.stiffness * ( len - con.targetLengthSq ) / len;

                BA.mult( corr );
                proportion = (con.bodyA.treatment !== 'dynamic' || con.bodyB.treatment !== 'dynamic') ? 1 : con.bodyB.mass / (con.bodyA.mass + con.bodyB.mass);

                if ( con.bodyA.treatment === 'dynamic' ){

                    if ( con.bodyB.treatment === 'dynamic' ){
                        BA.mult( proportion );
                    }

                    con.bodyA.state.pos.vadd( BA );

                    if ( con.bodyB.treatment === 'dynamic' ){
                        BA.mult( 1 / proportion );
                    }
                }

                if ( con.bodyB.treatment === 'dynamic' ){

                    if ( con.bodyA.treatment === 'dynamic' ){
                        BA.mult( 1 - proportion );
                    }

                    con.bodyB.state.pos.vsub( BA );
                }

                con.bodyA.sleepCheck();
                con.bodyB.sleepCheck();
            }

            scratch.done();
        },

        /** internal
         * VerletConstraintsBehavior#shuffleConstraints()
         *
         * Mix up the constraints.
         **/
        shuffleConstraints: function(){

            this._distanceConstraints = Physics.util.shuffle( this._distanceConstraints );
            this._angleConstraints = Physics.util.shuffle( this._angleConstraints );
        },

        /** internal
         * VerletConstraintsBehavior#resolve()
         *
         * Resolve all constraints.
         **/
        resolve: function(){

            var its = this.options.iterations
                ,coef = 1 / its
                ;

            for (var i = 0; i < its; i++){

                // this.shuffleConstraints();
                this.resolveDistanceConstraints( coef );
                this.resolveAngleConstraints( coef );
            }
        },

        /**
         * VerletConstraintsBehavior#getConstraints() -> Object
         * + (Object): The object containing copied arrays of the constraints
         *
         * Get all constraints.
         **/
        getConstraints: function(){

            return {
                distanceConstraints: [].concat(this._distanceConstraints),
                angleConstraints: [].concat(this._angleConstraints)
            };
        }
    };
});


// ---
// inside: src/integrators/improved-euler.js

Physics.integrator('improved-euler', function( parent ){

    return {
        /**
         * class ImprovedEuler < Integrator
         *
         * `Physics.integrator('improved-euler')`.
         *
         * The improved euler integrator.
         **/

        // extended
        init: function( options ){

            // call parent init
            parent.init.call(this, options);
        },

        // extended
        integrateVelocities: function( bodies, dt ){

            // half the timestep squared
            var drag = 1 - this.options.drag
                ,body = null
                ,state
                ;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                state = body.state;

                // only integrate if the body isn't fixed
                if ( body.treatment !== 'static' && !body.sleep( dt ) ){

                    // Inspired from https://github.com/soulwire/Coffee-Physics
                    // @licence MIT
                    //
                    // x += (v * dt) + (a * 0.5 * dt * dt)
                    // v += a * dt


                    // Scale force to mass.
                    // state.acc.mult( body.massInv );

                    // Remember velocity for future use.
                    state.old.vel.clone( state.vel );

                    // remember original acc
                    state.old.acc.clone( state.acc );

                    // Update velocity first so we can reuse the acc vector.
                    // a *= dt
                    // v += a ...
                    state.vel.vadd( state.acc.mult( dt ) );

                    // Apply "air resistance".
                    if ( drag ){

                        state.vel.mult( drag );
                    }

                    // Reset accel
                    state.acc.zero();

                    //
                    // Angular components
                    //

                    state.old.angular.vel = state.angular.vel;
                    state.angular.vel += state.angular.acc * dt;
                    state.angular.acc = 0;

                } else {
                    // set the velocity and acceleration to zero!
                    state.vel.zero();
                    state.acc.zero();
                    state.angular.vel = 0;
                    state.angular.acc = 0;
                }
            }
        },

        // extended
        integratePositions: function( bodies, dt ){

            // half the timestep squared
            var halfdtdt = 0.5 * dt * dt
                ,body = null
                ,state
                // use cached vector instances
                // so we don't need to recreate them in a loop
                ,scratch = Physics.scratchpad()
                ,vel = scratch.vector()
                ,angVel
                ;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                state = body.state;

                // only integrate if the body isn't fixed
                if ( body.treatment !== 'static' && !body.sleep() ){


                    // Store previous location.
                    state.old.pos.clone( state.pos );

                    // Update position.
                    // ...
                    // oldV *= dt
                    // a *= 0.5 * dt
                    // x += oldV + a
                    vel.clone( state.old.vel );
                    state.pos.vadd( vel.mult( dt ) ).vadd( state.old.acc.mult( halfdtdt ) );

                    state.old.acc.zero();

                    //
                    // Angular components
                    //

                    state.old.angular.pos = state.angular.pos;
                    state.angular.pos += state.old.angular.vel * dt + state.old.angular.acc * halfdtdt;
                    state.old.angular.acc = 0;

                }
            }

            scratch.done();
        }
    };
});


// ---
// inside: src/integrators/velocity-verlet-alt.js

Physics.integrator('velocity-verlet-alt', function( parent ){

    // for this integrator we need to know if the object has been integrated before
    // so let's add a mixin to bodies

    Physics.body.mixin({

        started: function( val ){
            if ( val !== undefined ){
                this._started = true;
            }

            return !!this._started;
        }
    });


    return {
        /**
         * class VelocityVerlet < Integrator
         *
         * `Physics.integrator('velocity-verlet')`.
         *
         * The velocity-verlet integrator.
         **/

        // extended
        init: function( options ){

            // call parent init
            parent.init.call(this, options);
        },

        // extended
        integrateVelocities: function( bodies, dt ){

            // half the timestep
            var dtdt = dt * dt
                ,drag = 1 - this.options.drag
                ,body = null
                ,state
                ;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                state = body.state;

                // only integrate if the body isn't static
                if ( body.treatment !== 'static' ){

                    // v = v_prev + 0.5 * (a_prev + a) * dt
                    // x = x_prev + v_prev * dt + 0.5 * a_prev * dt * dt

                    // use the velocity in vel if the velocity has been changed manually
                    if ( !body.started() ){

                        // Set old vals on first integration
                        state.old.acc.clone( state.acc );
                        state.old.acc.mult( dt );
                        state.old.vel.clone( state.vel ).vsub( state.old.acc );
                        state.old.acc.mult( 1/dt );
                    }

                    // Apply "air resistance".
                    if ( drag ){

                        state.vel.mult( drag );
                    }

                    // Apply acceleration
                    // v += 0.5 * (a_prev + a) * dt
                    state.vel.vadd( state.old.acc.vadd( state.acc ).mult( 0.5 * dt ) );

                    // Reset accel
                    // state.acc.zero();

                    //
                    // Angular components
                    //

                    if ( !body.started() ){

                        // Set old vals on first integration
                        state.old.angular.acc = state.angular.acc;
                        state.old.angular.vel = state.angular.vel - state.old.angular.acc * dt;
                    }

                    state.angular.vel += 0.5 * (state.angular.acc + state.old.angular.acc) * dt;
                    state.angular.acc = 0;

                    body.started( true );

                } else {
                    // set the velocity and acceleration to zero!
                    state.vel.zero();
                    state.acc.zero();
                    state.angular.vel = 0;
                    state.angular.acc = 0;
                }
            }
        },

        // extended
        integratePositions: function( bodies, dt ){

            // half the timestep
            var dtdt = dt * dt
                ,body = null
                ,state
                ;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                state = body.state;

                // only integrate if the body isn't static
                if ( body.treatment !== 'static' ){

                    // x = x_prev + v_prev * dt + 0.5 * a_prev * dt * dt

                    // Store old position.
                    // xold = x
                    state.old.pos.clone( state.pos );

                    state.old.vel.mult( dt );
                    state.old.acc.mult( 0.5 * dtdt );
                    state.pos.vadd( state.old.vel ).vadd( state.old.acc );

                    // store calculated velocity
                    state.old.vel.clone( state.vel );

                    // store old acc
                    state.old.acc.clone( state.acc );

                    // Reset accel
                    state.acc.zero();

                    //
                    // Angular components
                    //
                    state.old.angular.pos = state.angular.pos;

                    state.angular.pos += state.angular.vel * dt + 0.5 * state.old.angular.acc * dtdt;
                    state.old.angular.vel = state.angular.vel;
                    state.old.angular.acc = state.angular.acc;
                    state.angular.acc = 0;
                }
            }
        }
    };
});


// ---
// inside: src/integrators/velocity-verlet.js

Physics.integrator('velocity-verlet', function( parent ){

    // for this integrator we need to know if the object has been integrated before
    // so let's add a mixin to bodies

    Physics.body.mixin({

        started: function( val ){
            if ( val !== undefined ){
                this._started = true;
            }

            return !!this._started;
        }
    });


    return {
        /**
         * class VelocityVerlet < Integrator
         *
         * `Physics.integrator('velocity-verlet')`.
         *
         * The velocity-verlet integrator.
         **/

        // extended
        init: function( options ){

            // call parent init
            parent.init.call(this, options);
        },

        /**
         * Integrator#integrate( bodies, dt ) -> this
         * - bodies (Array): List of bodies to integrate
         * - dt (Number): Timestep size
         *
         * Integrate bodies by timestep.
         *
         * Will emit `integrate:velocities` and `integrate:positions`
         * events on the world.
         **/
        integrate: function( bodies, dt ){

            var world = this._world;

            this.integratePositions( bodies, dt );

            if ( world ){
                world.emit('integrate:positions', {
                    bodies: bodies,
                    dt: dt
                });
            }

            this.integrateVelocities( bodies, dt );

            if ( world ){
                world.emit('integrate:velocities', {
                    bodies: bodies,
                    dt: dt
                });
            }

            return this;
        },

        // extended
        integrateVelocities: function( bodies, dt ){

            // half the timestep
            var dtdt = dt * dt
                ,drag = 1 - this.options.drag
                ,body = null
                ,state
                ;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                state = body.state;

                // only integrate if the body isn't static
                if ( body.treatment !== 'static' && !body.sleep() ){

                    // v = v_prev + 0.5 * (a_prev + a) * dt
                    // x = x_prev + v_prev * dt + 0.5 * a_prev * dt * dt

                    // Apply "air resistance".
                    if ( drag ){

                        state.vel.mult( drag );
                    }

                    // Apply acceleration
                    // v += 0.5 * (a_prev + a) * dt
                    state.old.vel.clone( state.vel );
                    state.vel.vadd( state.old.acc.vadd( state.acc ).mult( 0.5 * dt ) );

                    // Reset accel
                    state.old.acc.clone( state.acc );
                    state.acc.zero();

                    //
                    // Angular components
                    //

                    state.old.angular.vel = state.angular.vel;
                    state.old.angular.acc = state.angular.acc;

                    state.angular.vel += 0.5 * (state.angular.acc + state.old.angular.acc) * dt;

                    state.angular.acc = 0;

                    body.started( true );

                } else {
                    // set the velocity and acceleration to zero!
                    state.vel.zero();
                    state.acc.zero();
                    state.angular.vel = 0;
                    state.angular.acc = 0;
                }
            }
        },

        // extended
        integratePositions: function( bodies, dt ){

            // half the timestep
            var dtdt = dt * dt
                ,body = null
                ,state
                ;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                state = body.state;

                // only integrate if the body isn't static
                if ( body.treatment !== 'static' && !body.sleep( dt ) ){

                    // x = x_prev + v_prev * dt + 0.5 * a_prev * dt * dt

                    // use the velocity in vel if the velocity has been changed manually
                    if ( !body.started() ){

                        // Set old vals on first integration
                        state.old.acc.clone( state.acc );
                        state.old.acc.mult( dt );
                        state.old.vel.clone( state.vel ).vsub( state.old.acc );
                        state.old.acc.mult( 1/dt );
                    }

                    // Store old position.
                    // xold = x
                    state.old.pos.clone( state.pos );

                    state.old.vel.mult( dt );
                    state.old.acc.mult( 0.5 * dtdt );
                    state.pos.vadd( state.old.vel ).vadd( state.old.acc );

                    // revert
                    state.old.vel.mult( 1/dt );
                    state.old.acc.mult( 2 / dtdt );

                    //
                    // Angular components
                    //

                    if ( !body.started() ){

                        // Set old vals on first integration
                        state.old.angular.acc = state.angular.acc;
                        state.old.angular.vel = state.angular.vel - state.old.angular.acc * dt;
                    }

                    state.old.angular.pos = state.angular.pos;

                    state.angular.pos += state.angular.vel * dt + 0.5 * state.old.angular.acc * dtdt;
                }
            }
        }
    };
});


// ---
// inside: src/renderers/canvas.js

/**
 * class CanvasRenderer < Renderer
 *
 * Physics.renderer('canvas')
 *
 * Renderer that uses HTMLCanvas to render the world bodies.
 *
 * Additional config options:
 *
 * - metaEl: HTMLElement to write meta information like FPS and IPF into. (default: autogenerated)
 * - offset: Offset the shapes by this amount. (default: `{ x: 0, y: 0 }`)
 * - styles: Styles to use to draw the shapes. (see below)
 *
 * The styles property should contain _default_ styles for each shape you want to draw.
 *
 * Example:
 *
 * ```javascript
 * styles: {
 *
 *    'circle' : {
 *        strokeStyle: '#542437',
 *        lineWidth: 1,
 *        fillStyle: '#542437',
 *        angleIndicator: 'white'
 *    },
 *
 *    'convex-polygon' : {
 *        strokeStyle: '#542437',
 *        lineWidth: 1,
 *        fillStyle: '#542437',
 *        angleIndicator: 'white'
 *    }
 * }
 * ```
 *
 * Styles can also be defined on a per-body basis. Use the "styles" property for a body:
 *
 * Example:
 *
 * ```javascript
 * Physics.body('circle', {
 *     // ...
 *     styles: {
 *        strokeStyle: '#542437',
 *        lineWidth: 1,
 *        fillStyle: '#542437',
 *        angleIndicator: 'white'
 *    }
 * });
 * ```
 *
 * You can also define an image to use for a body:
 *
 * Example:
 *
 * ```javascript
 * Physics.body('circle', {
 *     // ...
 *     styles: {
 *        src: 'path/to/image.jpg',
 *        width: 40,
 *        height: 50
 *    }
 * });
 * ```
 **/
Physics.renderer('canvas', function( proto ){

    if ( !document ){
        // must be in node environment
        return {};
    }

    var Pi2 = Math.PI * 2
        // helper to create new dom elements
        ,newEl = function( node, content ){
            var el = document.createElement(node || 'div');
            if (content){
                el.innerHTML = content;
            }
            return el;
        }
        ,colors = {
            white: '#fff'
            ,violet: '#542437'
            ,blue: '#53777A'
        }
        ;

    var defaults = {

        // the element to place meta data into
        metaEl: null,
        // default styles of drawn objects
        styles: {

            'point': colors.blue,

            'circle' : {
                strokeStyle: colors.blue,
                lineWidth: 1,
                fillStyle: colors.blue,
                angleIndicator: colors.white
            },

            'rectangle' : {
                strokeStyle: colors.violet,
                lineWidth: 1,
                fillStyle: colors.violet,
                angleIndicator: colors.white
            },

            'convex-polygon' : {
                strokeStyle: colors.violet,
                lineWidth: 1,
                fillStyle: colors.violet,
                angleIndicator: colors.white
            }
        },
        offset: { x: 0, y: 0 }
    };

    return {

        // extended
        init: function( options ){

            var self = this;

            // call proto init
            proto.init.call(this, options);

            // further options
            this.options.defaults( defaults, true );
            this.options.onChange(function(){
                self.options.offset = new Physics.vector( self.options.offset );
            });
            this.options( options, true );

            // hidden canvas
            this.hiddenCanvas = document.createElement('canvas');
            this.hiddenCanvas.width = this.hiddenCanvas.height = 100;

            if (!this.hiddenCanvas.getContext){
                throw "Canvas not supported";
            }

            this.hiddenCtx = this.hiddenCanvas.getContext('2d');

            // actual viewport
            var viewport = this.el;
            if (viewport.nodeName.toUpperCase() !== 'CANVAS'){

                viewport = document.createElement('canvas');
                this.el.appendChild( viewport );
                if (typeof this.options.el === 'string' && this.el === document.body){
                    viewport.id = this.options.el;
                }
                this.el = viewport;
            }

            this.container = this.el.parentNode;
            this.ctx = viewport.getContext('2d');

            this.els = {};

            if (this.options.meta){
                var stats = this.options.metaEl || newEl();
                stats.className = 'pjs-meta';
                this.els.fps = newEl('span');
                this.els.ipf = newEl('span');
                stats.appendChild(newEl('span', 'fps: '));
                stats.appendChild(this.els.fps);
                stats.appendChild(newEl('br'));
                stats.appendChild(newEl('span', 'ipf: '));
                stats.appendChild(this.els.ipf);

                viewport.parentNode.insertBefore(stats, viewport);
            }

            this._layers = {};
            this.addLayer( 'main', this.el );

            if ( this.options.autoResize ){
                this.resize();
            } else {
                this.resize( this.options.width, this.options.height );
            }
        },

        /**
         * CanvasRenderer#layer( id ) -> Layer
         * - id (String): The id for the layer
         *
         * Get the layer by id.
         **/
        layer: function( id ){

            if ( id in this._layers ){
                return this._layers[ id ];
            }

            return null;
        },

        /**
         * CanvasRenderer#addLayer( id[, el, opts ] ) -> Layer
         * - id (String): The id for the layer
         * - el (HTMLElement): The canvas element to use for this layer
         * - opts (Object): The options for this layer (see below)
         *
         * Create a new layer.
         *
         * Layers can have the following options:
         *
         * - width: The width
         * - height: The height
         * - manual: Draw manually (default: `false`)
         * - autoResize: Automatically resize the layer when the renderer's [[CanvasRenderer#resize]] method is called. (default: `true`)
         * - follow: A [[Body]]. Offset this layer's rendering to follow a body's position. (default: `null`)
         * - offset: The offset [[Vectorish]] for this layer. (default: `null`)
         * - scale: Scale the layer by this amount. (default: `1`)
         * - zIndex: The zIndex for the layer's HTMLElement. (default: `1`)
         **/
        addLayer: function( id, el, opts ){

            /** belongs to: CanvasRenderer
             * class Layer
             *
             * A rendering layer for the canvas renderer.
             *
             * Create by calling [[CanvasRenderer#addLayer]].
             **/

            var self = this
                ,bodies = []
                ,styles = Physics.util.extend({}, this.options.styles)
                ,layer = {
                    /**
                     * Layer#id = String
                     *
                     * The layer's ID
                     **/
                    id: id
                    /**
                     * Layer#el = HTMLElement
                     *
                     * The layer's Canvas
                     **/
                    ,el: el || document.createElement('canvas')
                    /** related to: Physics.util.options
                      * Layer#options( options ) -> Object
                      * - options (Object): The options to set as an object
                      * + (Object): The options
                      *
                      * Set options on this layer.
                      *
                      * Access options directly from the options object.
                      *
                      * Example:
                      *
                      * ```javascript
                      * this.options.someOption;
                      * ```
                      **/
                    ,options: Physics.util.options({
                        width: this.el.width
                        ,height: this.el.height
                        ,manual: false
                        ,autoResize: true
                        ,follow: null
                        ,offset: null
                        ,scale: 1
                        ,zIndex: 1
                    })( opts )
                }
                ;

            if ( id in this._layers ){
                throw 'Layer "' + id + '" already added.';
            }

            this.el.parentNode.insertBefore( layer.el, this.el );
            layer.el.style.position = 'absolute';
            layer.el.style.zIndex = layer.options.zIndex;
            layer.el.className += ' pjs-layer-' + layer.id;
            layer.ctx = layer.el.getContext('2d');
            layer.ctx.scale( 1, 1 );
            layer.el.width = layer.options.width;
            layer.el.height = layer.options.height;

            /**
             * Layer#bodies = Array
             *
             * The Bodies this layer is rendering.
             *
             * The "main" layer will render all world bodies if it's empty.
             **/
            layer.bodies = bodies;

            /**
             * Layer#reset( [arr] ) -> this
             * - arr (Array): Array to replace the current stack of Bodies.
             *
             * Reset the stack.
             **/
            layer.reset = function( arr ){

                bodies = arr || [];
                return layer;
            };

            /**
             * Layer#addToStack( arr ) -> this
             * Layer#addToStack( body ) -> this
             * - body (Body): Body to add
             * - arr (Array): Array of bodies to add
             *
             * Add body (bodies) to the rendering stack for this layer.
             *
             * Bodies must be added to the stack in order to be rendered by this layer UNLESS it is the "main" layer.
             **/
            layer.addToStack = function( thing ){

                if ( Physics.util.isArray( thing ) ){
                    bodies.push.apply( bodies, thing );
                } else {
                    bodies.push( thing );
                }
                return layer;
            };

            /**
             * Layer#removeFromStack( arr ) -> this
             * Layer#removeFromStack( body ) -> this
             * - body (Body): Body to remove
             * - arr (Array): Array of bodies to remove
             *
             * Remove body (bodies) from the rendering stack for this layer.
             **/
            layer.removeFromStack = function( thing ){

                var i, l;

                if ( Physics.util.isArray( thing ) ){
                    for ( i = 0, l = thing.length; i < l; ++i ){
                        layer.removeFromStack(thing[ i ]);
                    }
                } else {
                    i = Physics.util.indexOf( bodies, thing );
                    if ( i > -1 ){
                        bodies.splice( i, 1 );
                    }
                }
                return layer;
            };

            /**
             * Layer#render( [clear] ) -> this
             * - clear (Boolean): Clear the canvas (default: `true`)
             *
             * Render the bodies in this layer's stack.
             *
             * If you want you can replace this function with your own to do custom rendering.
             *
             * Example:
             *
             * ```javascript
             * layer.render = myCustomRenderFn;
             * ```
             **/
            layer.render = function( clear ){

                var body
                    ,scratch = Physics.scratchpad()
                    ,offset = scratch.vector().set(0, 0)
                    ,scale = layer.options.scale
                    ,view
                    ,i
                    ,l = bodies.length
                    ,t = self._interpolateTime
                    ,stack = (l || layer.id !== 'main') ? bodies : self._world._bodies
                    ;

                if ( layer.options.manual ){
                    scratch.done();
                    return layer;
                }

                if ( layer.options.offset ){
                    if ( layer.options.offset === 'center' ){
                        offset.add( layer.el.width * 0.5, layer.el.height * 0.5 ).mult( 1/scale );
                    } else {
                        offset.vadd( layer.options.offset ).mult( 1/scale );
                    }
                }

                if ( layer.options.follow ){
                    offset.vsub( layer.options.follow.state.pos );
                    offset.sub( layer.options.follow.state.vel.get(0)*t, layer.options.follow.state.vel.get(1)*t );
                }

                if ( clear !== false ){
                    layer.ctx.clearRect(0, 0, layer.el.width, layer.el.height);
                }

                if ( scale !== 1 ){
                    layer.ctx.save();
                    layer.ctx.scale( scale, scale );
                }

                for ( i = 0, l = stack.length; i < l; ++i ){

                    body = stack[ i ];
                    if ( !body.hidden ){
                        view = body.view || ( body.view = self.createView(body.geometry, body.styles || styles[ body.geometry.name ]) );
                        self.drawBody( body, body.view, layer.ctx, offset );
                    }
                }

                if ( scale !== 1 ){
                    layer.ctx.restore();
                }

                scratch.done();
                return layer;
            };

            // remember layer
            this._layers[ id ] = layer;

            return layer;
        },

        /**
         * CanvasRenderer#removeLayer( id ) -> this
         * CanvasRenderer#removeLayer( layer ) -> this
         * - id (String): The id for the layer
         * - layer (Layer): The layer
         *
         * Remove a layer.
         **/
        removeLayer: function( idOrLayer ){

            var id = idOrLayer.id ? idOrLayer.id : idOrLayer
                ,el = this._layers[ id ].el
                ;

            if ( el !== this.el ){
                el.parentNode.removeChild( el );
            }
            delete this._layers[ id ];
            return this;
        },

        /**
         * CanvasRenderer#resize( width, height ) -> this
         * - width (Number): The width
         * - height (Number): The height
         *
         * Resize all layer canvases that have the `autoResize` option set to `true`.
         **/
        resize: function( width, height ){

            var layer;
            proto.resize.call( this, width, height );

            for ( var id in this._layers ){

                layer = this._layers[ id ];
                if ( layer.options.autoResize ){
                    layer.el.width = this.width;
                    layer.el.height = this.height;
                }
            }

            return this;
        },

        /**
         * CanvasRenderer#setStyle( styles[, ctx] )
         * - styles (Object|String): Styles to set on the canvas context
         * - ctx (Canvas2DContext): The canvas context
         *
         * Set styles on the specified canvas context (or main context).
         **/
        setStyle: function( styles, ctx ){

            ctx = ctx || this.ctx;

            if ( Physics.util.isObject(styles) ){

                styles.strokeStyle = styles.lineWidth ? styles.strokeStyle : 'rgba(0,0,0,0)';
                Physics.util.extend(ctx, styles);

            } else {

                ctx.fillStyle = ctx.strokeStyle = styles;
                ctx.lineWidth = 1;
            }
        },

        /**
         * CanvasRenderer#drawCircle( x, y, r, styles[, ctx] )
         * - x (Number): The x coord
         * - y (Number): The y coord
         * - r (Number): The circle radius
         * - styles (Object): The styles configuration
         * - ctx (Canvas2DContext): The canvas context
         *
         * Draw a circle to specified canvas context.
         **/
        drawCircle: function(x, y, r, styles, ctx){

            ctx = ctx || this.ctx;

            ctx.beginPath();
            this.setStyle( styles, ctx );
            ctx.arc(x, y, r, 0, Pi2, false);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },

        /**
         * CanvasRenderer#drawPolygon( verts, styles[, ctx] )
         * - verts (Array): Array of [[Vectorish]] vertices
         * - styles (Object): The styles configuration
         * - ctx (Canvas2DContext): The canvas context
         *
         * Draw a polygon to specified canvas context.
         **/
        drawPolygon: function(verts, styles, ctx){

            var vert = verts[0]
                ,x = vert.x
                ,y = vert.y
                ,l = verts.length
                ;

            ctx = ctx || this.ctx;
            ctx.beginPath();
            this.setStyle( styles, ctx );

            ctx.moveTo(x, y);

            for ( var i = 1; i < l; ++i ){

                vert = verts[ i ];
                x = vert.x;
                y = vert.y;
                ctx.lineTo(x, y);
            }

            if ( l > 2 ){
                ctx.closePath();
            }

            ctx.stroke();
            ctx.fill();
        },

        /**
         * CanvasRenderer#drawRect( x, y, width, height, styles[, ctx] )
         * - x (Number): The x coord
         * - y (Number): The y coord
         * - width (Number): The width
         * - height (Number): The height
         * - styles (Object): The styles configuration
         * - ctx (Canvas2DContext): The canvas context
         *
         * Draw a rectangle to specified canvas context.
         **/
        drawRect: function(x, y, width, height, styles, ctx){

            var hw = width * 0.5
                ,hh = height * 0.5
                ;

            ctx = ctx || this.ctx;
            this.setStyle( styles, ctx );
            ctx.beginPath();
            ctx.rect(x - hw, y - hh, width, height);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },

        /**
         * CanvasRenderer#drawLine( from, to, styles[, ctx] )
         * - from (Vectorish): The starting pt
         * - to (Vectorish): The ending pt
         * - styles (Object): The styles configuration
         * - ctx (Canvas2DContext): The canvas context
         *
         * Draw a line onto specified canvas context.
         **/
        drawLine: function(from, to, styles, ctx){

            var x = from.x
                ,y = from.y
                ;

            ctx = ctx || this.ctx;

            ctx.beginPath();
            this.setStyle( styles, ctx );

            ctx.moveTo(x, y);

            x = to.x;
            y = to.y;

            ctx.lineTo(x, y);

            ctx.stroke();
            ctx.fill();
        },

        /**
         * CanvasRenderer#draw( geometry[, styles, ctx, offset] ) -> this
         * - geometry (Geometry): The shape to draw
         * - styles (Object): The styles configuration
         * - ctx (Canvas2DContext): The canvas context
         * - offset (Vectorish): The offset from center
         *
         * Draw a geometry to a context.
         **/
        draw: function( geometry, styles, ctx, offset ){

            var name = geometry.name
                ,x = +(offset && offset.x)
                ,y = +(offset && offset.y)
                ,w = geometry.aabb().hw
                ;

            ctx = ctx || this.ctx;
            styles = styles || this.options.styles[ name ] || this.options.styles.circle || {};

            ctx.save();
            ctx.translate(x, y);

            if (name === 'circle'){

                this.drawCircle(0, 0, geometry.radius, styles, ctx);

            } else if (name === 'convex-polygon'){

                this.drawPolygon(geometry.vertices, styles, ctx);

            } else if (name === 'rectangle'){

                this.drawRect(0, 0, geometry.width, geometry.height, styles, ctx);

            } else if (name === 'compound'){

                for ( var i = 0, l = geometry.children.length, ch; i < l; i++ ){
                    ch = geometry.children[ i ];

                    // translate
                    ctx.translate(ch.pos.x, ch.pos.y);
                    // rotate
                    ctx.rotate(ch.angle);

                    this.draw( ch.g, styles, ctx );

                    // unrotate
                    ctx.rotate(-ch.angle);
                    // untranslate
                    ctx.translate(-ch.pos.x, -ch.pos.y);
                }

            } else {

                // assume it's a point
                this.drawCircle(0, 0, 1, styles, ctx);
            }

            if (name !== 'compound' && styles.angleIndicator){

                ctx.beginPath();
                this.setStyle( styles.angleIndicator, ctx );
                ctx.moveTo(0, 0);
                ctx.lineTo(w, 0);
                ctx.closePath();
                ctx.stroke();
            }

            ctx.restore();

            return this;
        },

        // extended
        createView: function( geometry, styles ){

            var view
                ,aabb = geometry.aabb()
                ,hw = aabb.hw + Math.abs(aabb.x)
                ,hh = aabb.hh + Math.abs(aabb.y)
                ,offset = { x: hw + 1, y: hh + 1 }
                ,hiddenCtx = this.hiddenCtx
                ,hiddenCanvas = this.hiddenCanvas
                ;

            styles = styles || this.options.styles[ name ] || this.options.styles.circle || {};

            // must want an image
            if ( styles.src ){
                view = new Image();
                view.src = styles.src;
                if ( styles.width ){
                    view.width = styles.width;
                }
                if ( styles.height ){
                    view.height = styles.height;
                }
                return view;
            }

            offset.x += styles.lineWidth | 0;
            offset.y += styles.lineWidth | 0;

            // clear and resize
            hiddenCanvas.width = 2 * hw + 2 + (2 * styles.lineWidth|0);
            hiddenCanvas.height = 2 * hh + 2 + (2 * styles.lineWidth|0);

            this.draw( geometry, styles, hiddenCtx, offset );

            view = new Image( hiddenCanvas.width, hiddenCanvas.height );
            view.src = hiddenCanvas.toDataURL('image/png');
            return view;
        },

        // extended
        drawMeta: function( meta ){

            this.els.fps.innerHTML = meta.fps.toFixed(2);
            this.els.ipf.innerHTML = meta.ipf;
        },

        // extended
        drawBody: function( body, view, ctx, offset ){

            var pos = body.state.pos
                ,os = body.offset
                ,v = body.state.vel
                ,t = this._interpolateTime || 0
                ,x
                ,y
                ,ang
                ,aabb
                ;

            offset = offset || this.options.offset;
            ctx = ctx || this.ctx;

            // interpolate positions
            x = pos._[0] + offset.x + v._[0] * t;
            y = pos._[1] + offset.y + v._[1] * t;
            ang = body.state.angular.pos + body.state.angular.vel * t;

            ctx.save();
            ctx.translate( x, y );
            ctx.rotate( ang );
            ctx.translate( os._[0], os._[1] );
            ctx.drawImage(view, -view.width/2, -view.height/2, view.width, view.height);
            ctx.restore();
        },

        // extended
        render: function( bodies, meta ){

            var body
                ,view
                ,pos
                ;

            this._world.emit('beforeRender', {
                renderer: this,
                meta: meta
            });

            if ( this.options.meta ) {
                this.drawMeta( meta );
            }

            this._interpolateTime = meta.interpolateTime;

            for ( var id in this._layers ){

                this._layers[ id ].render();
            }

            return this;
        }
    };
});


// ---
// inside: src/renderers/dom.js

/**
 * class DomRenderer < Renderer
 *
 * Physics.renderer('dom')
 *
 * Renderer that manipulates DOM elements according to the physics simulation. Very primative...
 **/
Physics.renderer('dom', function( proto ){

    if ( !document ){
        // must be in node environment
        return {};
    }

    // utility methods
    var thePrefix = {}
        ,tmpdiv = document.createElement("div")
        ,toTitleCase = function toTitleCase(str) {
            return str.replace(/(?:^|\s)\w/g, function(match) {
                return match.toUpperCase();
            });
        }
        // return the prefixed name for the specified css property
        ,pfx = function pfx(prop) {

            if (thePrefix[prop]){
                return thePrefix[prop];
            }

            var arrayOfPrefixes = ['Webkit', 'Moz', 'Ms', 'O']
                ,name
                ;

            for (var i = 0, l = arrayOfPrefixes.length; i < l; ++i) {

                name = arrayOfPrefixes[i] + toTitleCase(prop);

                if (name in tmpdiv.style){
                    return thePrefix[prop] = name;
                }
            }

            if (name in tmpdiv.style){
                return thePrefix[prop] = prop;
            }

            return false;
        }
        ;

    var classpfx = 'pjs-'
        ,px = 'px'
        ,cssTransform = pfx('transform')
        ,borderRadius = pfx('borderRadius')
        ;

    var newEl = function( node, content ){
            var el = document.createElement(node || 'div');
            if (content){
                el.innerHTML = content;
            }
            return el;
        }
        ,drawBody
        ;

    return {

        // extended
        init: function( options ){

            // call proto init
            proto.init.call(this, options);

            var viewport = this.el;
            viewport.style.position = 'relative';
            viewport.style.overflow = 'hidden';
            viewport.style[cssTransform] = 'translateZ(0)'; // force GPU accel
            viewport.style.width = this.options.width + px;
            viewport.style.height = this.options.height + px;

            this.els = {};

            if (options.meta){
                var stats = newEl();
                stats.className = 'pjs-meta';
                this.els.fps = newEl('span');
                this.els.ipf = newEl('span');
                stats.appendChild(newEl('span', 'fps: '));
                stats.appendChild(this.els.fps);
                stats.appendChild(newEl('br'));
                stats.appendChild(newEl('span', 'ipf: '));
                stats.appendChild(this.els.ipf);

                viewport.appendChild(stats);
            }

            if ( this.options.autoResize ){
                this.resize();
            } else {
                this.resize( this.options.width, this.options.height );
            }
        },

        // extended
        resize: function( width, height ){

            proto.resize.call( this, width, height );
            this.el.style.width = this.width + px;
            this.el.style.height = this.height + px;
        },

        /** internal
         * DomRenderer#pointProperties( el, geometry )
         * - el (HTMLElement): The element
         * - geometry (Geometry): The body's geometry
         *
         * Set dom element style properties for a point.
         **/
        pointProperties: function( el, geometry ){

            el.style.width = '2px';
            el.style.height = '2px';
            el.style.marginLeft = '-1px';
            el.style.marginTop = '-1px';
            el.style[ borderRadius ] = '50%';
        },

        /** internal
         * DomRenderer#circleProperties( el, geometry )
         * - el (HTMLElement): The element
         * - geometry (Geometry): The body's geometry
         *
         * Set dom element style properties for a circle.
         **/
        circleProperties: function( el, geometry ){

            var aabb = geometry.aabb();

            el.style.width = (aabb.hw * 2) + px;
            el.style.height = (aabb.hh * 2) + px;
            el.style.marginLeft = (-aabb.hw) + px;
            el.style.marginTop = (-aabb.hh) + px;
            el.style[ borderRadius ] = '50%';
        },

        /** internal
         * DomRenderer#rectangleProperties( el, geometry )
         * - el (HTMLElement): The element
         * - geometry (Geometry): The body's geometry
         *
         * Set dom element style properties for a rectangle.
         **/
        rectangleProperties: function( el, geometry ){

            var aabb = geometry.aabb();

            el.style.width = (aabb.hw * 2) + px;
            el.style.height = (aabb.hh * 2) + px;
            el.style.marginLeft = (-aabb.hw) + px;
            el.style.marginTop = (-aabb.hh) + px;
        },

        // extended
        createView: function( geometry ){

            var el = newEl()
                ,chel
                ,fn = geometry.name + 'Properties'
                ;

            el.className = classpfx + geometry.name;
            el.style.position = 'absolute';
            el.style.top = '0px';
            el.style.left = '0px';

            if ( geometry.name === 'compound' ){

                for ( var i = 0, l = geometry.children.length, ch; i < l; i++ ){
                    ch = geometry.children[ i ];
                    chel = newEl();
                    chel.className = classpfx + geometry.name + ' ' + classpfx + 'child';
                    chel.style.position = 'absolute';
                    chel.style.top = '0px';
                    chel.style.left = '0px';
                    if ( this[ ch.g.name + 'Properties' ] ){
                        this[ ch.g.name + 'Properties' ](chel, ch.g);
                    }
                    chel.style[cssTransform] = 'translate('+ch.pos._[0]+'px,'+ch.pos._[1]+'px) rotate('+ ch.angle +'rad)';
                    el.appendChild( chel );
                }

            } else if ( this[ fn ] ){
                this[ fn ](el, geometry);
            }

            this.el.appendChild( el );
            return el;
        },

        // extended
        connect: function( world ){

            world.on( 'add:body', this.attach, this );
            world.on( 'remove:body', this.detach, this );
        },

        // extended
        disconnect: function( world ){

            world.off( 'add:body', this.attach, this );
            world.off( 'remove:body', this.detach, this );
        },

        /**
         * DomRenderer#detach( data ) -> this
         * - data (HTMLElement|Object): DOM node or event data (`data.body`)
         *
         * Event callback to detach a node from the DOM
         **/
        detach: function( data ){

            // interpred data as either dom node or event data
            var el = (data.nodeType && data) || (data.body && data.body.view)
                ,par = el && el.parentNode
                ;

            if ( el && par ){
                // remove view from dom
                par.removeChild( el );
            }

            return this;
        },

        /**
         * DomRenderer#attach( data ) -> this
         * - data (HTMLElement|Object): DOM node or event data (`data.body`)
         *
         * Event callback to attach a node to the viewport
         **/
        attach: function( data ){

            // interpred data as either dom node or event data
            var el = (data.nodeType && data) || (data.body && data.body.view)
                ;

            if ( el ){
                // attach to viewport
                this.el.appendChild( el );
            }

            return this;
        },

        // extended
        drawMeta: function( meta ){

            this.els.fps.innerHTML = meta.fps.toFixed(2);
            this.els.ipf.innerHTML = meta.ipf;
        },

        // extended
        drawBody: function( body, view ){

            var pos = body.state.pos
                ,v = body.state.vel
                ,os = body.offset
                ,x
                ,y
                ,ang
                ,t = this._interpolateTime
                ;

            // interpolate positions
            x = pos._[0] + v._[0] * t;
            y = pos._[1] + v._[1] * t;
            ang = body.state.angular.pos + body.state.angular.vel * t;
            view.style[cssTransform] = 'translate('+x+'px,'+y+'px) rotate('+ ang +'rad) translate('+os._[0]+'px,'+os._[1]+'px)';
        }
    };
});


// ---
// inside: src/renderers/pixi-renderer.js

/*
 * @requires pixi.js
 */
/**
 * class PixiRenderer < Renderer
 *
 * Physics.renderer('pixi')
 *
 * Renderer that uses the PIXI.js library. [Documentation can be found here](https://github.com/wellcaffeinated/PhysicsJS/wiki/PIXI-Renderer).
 *
 * Additional config options:
 *
 * - metaEl: HTMLElement to write meta information like FPS and IPF into. (default: autogenerated)
 * - offset: Offset the shapes by this amount. (default: `{ x: 0, y: 0 }`)
 * - styles: Styles to use to draw the shapes. (see below)
 *
 * The styles property should contain _default_ styles for each shape you want to draw.
 *
 * Example:
 *
 * ```javascript
 * styles: {
 *    // Defines the default canvas colour
 *    'color': '0x66FF99',
 *
 *    'circle' : {
 *        strokeStyle: '0xE8900C',
 *        lineWidth: 3,
 *        fillStyle: '0xD5DE4C',
 *        angleIndicator: '0xE8900C',
 *        strokeAlpha: 1,
 *        fillAlpha: 1
 *    },
 *
 *    'convex-polygon' : {
 *        strokeStyle: '0xE8900C',
 *        lineWidth: 3,
 *        fillStyle: '0xD5DE4C',
 *        angleIndicator: '0xE8900C'
 *    }
 * }
 * ```
 *
 * Styles can also be defined on a per-body basis. Use the "styles" property for a body:
 *
 * Example:
 *
 * ```javascript
 * Physics.body('circle', {
 *     // ...
 *     styles: {
 *        strokeStyle: '0x542437',
 *        lineWidth: 1,
 *        fillStyle: '0x542437',
 *        angleIndicator: '0xFFFFFF'
 *    }
 * });
 * ```
 *
 * You can also define an image to use for a body:
 *
 * Example:
 *
 * ```javascript
 * Physics.body('circle', {
 *     // ...
 *     styles: {
 *        src: 'path/to/image.jpg',
 *        width: 40,
 *        height: 50,
 *        anchor: { x: 0.5, y: 0.5 }
 *    }
 * });
 * ```
 **/
/* global PIXI */
Physics.renderer('pixi', function( parent ){

    if ( !document ){
        // must be in node environment
        return {};
    }

    var Pi2 = Math.PI * 2
        ,colors = {
            white: '0xFFFFFF'
            ,violet: '0x542437'
            ,blue: '0x53777A'
        }
        ,fontStyles = {
            font: "18px monospace",
            fill: "black",
            align: "left"
        }

        ,defaults = {

            // the element to place meta data into
            metaEl: null,
            offset: { x: 0, y: 0 },
            // Provide some default colours
            styles: {
                // Defines the default canvas colour
                'color': false,

                'point': colors.blue,

                'circle' : {
                    strokeStyle: colors.blue,
                    lineWidth: 1,
                    fillStyle: colors.blue,
                    angleIndicator: colors.white,
                    fillAlpha: 1,
                    strokeAlpha: 1,
                    alpha: 1
                },

                'rectangle' : {
                    strokeStyle: colors.violet,
                    lineWidth: 1,
                    fillStyle: colors.violet,
                    angleIndicator: colors.white,
                    fillAlpha: 1,
                    strokeAlpha: 1,
                    alpha: 1
                },

                'convex-polygon' : {
                    strokeStyle: colors.violet,
                    lineWidth: 1,
                    fillStyle: colors.violet,
                    angleIndicator: colors.white,
                    fillAlpha: 1,
                    strokeAlpha: 1,
                    alpha: 1
                }
            }
        }
        ;

    return {

        // extended
        init: function( options ){

            var self = this
                ,el
                ,isTransparent
                ;

            if (typeof PIXI === 'undefined') {
                throw "PIXI not present - cannot continue";
            }

            // call parent init
            parent.init.call(this, options);

            // further options
            this.options.defaults( defaults, true );
            this.options.onChange(function(){
                self.options.offset = new Physics.vector( self.options.offset );
            });
            this.options( options, true );

            isTransparent = (!this.options.styles.color || this.options.styles.color === 'transparent');
            // Hook in PIXI stage here
            this.stage = new PIXI.Stage(this.options.styles.color);

            // Create empty meta object for use later
            this.meta = {};

            el = (this.el && this.el.nodeName === 'CANVAS') ? el : null;
            // add the renderer view element to the DOM according to its type
            this.renderer = new PIXI.autoDetectRenderer(this.options.width, this.options.height, {
                view: el,
                transparent: isTransparent,
                resolution: window.devicePixelRatio || 1
            });

            if ( !el ){
                this.el = this.el || document.body;
                // add to passed in element
                this.el.appendChild( this.renderer.view );
            }

            if ( this.options.autoResize ){
                this.resize();
            } else {
                this.resize( this.options.width, this.options.height );
            }
        },

        // extended
        resize: function( width, height ){

            parent.resize.call( this, width, height );
            this.renderer.resize( this.width, this.height );
        },

        // extended
        connect: function( world ){

            world.on( 'add:body', this.attach, this );
            world.on( 'remove:body', this.detach, this );
        },

        // extended
        disconnect: function( world ){

            world.off( 'add:body', this.attach, this );
            world.off( 'remove:body', this.detach, this );
        },

        /**
         * PixiRenderer#detach( data ) -> this
         * - data (PIXI.Graphics|Object): Graphics object or event data (`data.body`)
         *
         * Event callback to detach a child from the stage
         **/
        detach: function( data ){

            // interpred data as either dom node or event data
            var el = (data instanceof PIXI.Graphics && data) || (data.body && data.body.view);

            if ( el ){
                // remove view from dom
                this.stage.removeChild( el );
            }

            return this;
        },

        /**
         * PixiRenderer#attach( data ) -> this
         * - data (PIXI.Graphics|Object): Graphics object or event data (`data.body`)
         *
         * Event callback to attach a child to the stage
         **/
        attach: function( data ){

            // interpred data as either dom node or event data
            var el = (data instanceof PIXI.Graphics && data) || (data.body && data.body.view);

            if ( el ){
                // attach to viewport
                this.stage.addChild( el );
            }

            return this;
        },

        /**
         * PixiRenderer#loadSpriteSheets( assetsToLoad, callback ) -> this
         * - assetsToLoad (Array): Array of spritesheets to load
         * - callback (Function): Function to call when loading is complete
         *
         * Loads textures defined in a spritesheet
         **/
        loadSpriteSheets: function( assetsToLoad, callback ){

            if ( !Physics.util.isArray( assetsToLoad ) ) {
                throw 'Spritesheets must be defined in arrays';
            }

            var self = this
                ,loader = new PIXI.AssetLoader(assetsToLoad)
                ;

            // Start loading resources!
            loader.load();

            loader.on('onComplete', function(evt){
                self.assetsLoaded = true;
                callback();
            });

            return self;
        },

        /**
         * PixiRenderer#drawBody( body, view )
         * - body (Body): The body to draw
         * - view (DisplayObject): The pixi display object
         *
         * Draw a PIXI.DisplayObject to the stage.
         **/
        drawBody: function( body, view ){
            var pos = body.state.pos
                ,v = body.state.vel
                ,os = body.offset
                ,t = this._interpolateTime || 0
                ,x
                ,y
                ,ang
                ;

            // interpolate positions
            x = pos._[0] + v._[0] * t;
            y = pos._[1] + v._[1] * t;
            ang = body.state.angular.pos + body.state.angular.vel * t;

            view.position.set( x, y );
            view.pivot.set( -os._[0], -os._[1] );
            view.rotation = ang;
        },

        // extended
        render: function( bodies, meta ){

            parent.render.call(this, bodies, meta);
            this.renderer.render(this.stage);
        },

        /**
         * PixiRenderer#setStyles( graphics, styles ) -> PIXI.Graphics
         * - graphics (PIXI.Graphics): The graphics object to set styles on
         * - styles (Object): The styles configuration
         * + (PIXI.Graphics): A graphic object
         *
         * Set styles on pixi graphics object
         **/
        setStyles: function( graphics, styles ){

            if ( Physics.util.isObject(styles) ){

                if ( styles.fillStyle && styles.fillStyle !== 'transparent' ){
                    graphics.beginFill( styles.fillStyle );
                    graphics.fillAlpha = styles.fillAlpha !== undefined ? styles.fillAlpha : 1;
                } else {
                    graphics.beginFill();
                    graphics.fillAlpha = 0;
                }

                graphics.lineStyle( styles.lineWidth || 0, styles.strokeStyle, styles.strokeAlpha !== undefined ? styles.strokeAlpha : 1 );
                graphics.alpha = styles.alpha !== undefined ? styles.alpha : 1;

            } else {

                if ( styles && styles !== 'transparent' ){
                    graphics.beginFill( styles );
                } else {
                    graphics.beginFill();
                    graphics.fillAlpha = 0;
                }

                graphics.lineStyle( 0 );
            }

            return graphics;
        },

        /**
         * PixiRenderer#createCircle( x, y, r, styles ) -> PIXI.Graphics
         * - x (Number): The x coord
         * - y (Number): The y coord
         * - r (Number): The circle radius
         * - styles (Object): The styles configuration
         * + (PIXI.Graphics): A graphic object representing a circle.
         *
         * Create a circle for use in PIXI stage
         **/
        createCircle: function( x, y, r, styles ){

            var graphics = new PIXI.Graphics();
            this.setStyles( graphics, styles );
            graphics.drawCircle( x, y, r );
            graphics.endFill();
            return graphics;
        },

        /**
         * PixiRenderer#createRect( x, y, r, styles ) -> PIXI.Graphics
         * - x (Number): The x coord
         * - y (Number): The y coord
         * - width (Number): The rectangle width
         * - height (Number): The rectangle height
         * - styles (Object): The styles configuration
         * + (PIXI.Graphics): A graphic object representing a circle.
         *
         * Create a rectangle for use in PIXI stage
         **/
        createRect: function( x, y, width, height, styles ){

            var graphics = new PIXI.Graphics();
            this.setStyles( graphics, styles );
            graphics.drawRect( x, y, width, height );
            graphics.endFill();
            return graphics;
        },

        /**
         * PixiRenderer#createPolygon( verts, styles ) -> PIXI.Graphics
         * - verts (Array): Array of [[Vectorish]] vertices
         * - styles (Object): The styles configuration
         * + (PIXI.Graphics): A graphic object representing a polygon.
         *
         * Create a polygon for use in PIXI stage
         **/
        createPolygon: function( verts, styles ){

            var vert = verts[0]
                ,x = vert.x
                ,y = vert.y
                ,l = verts.length
                ,start = {
                    x: x
                    ,y: y
                }
                ,graphics = new PIXI.Graphics()
                ;

            this.setStyles( graphics, styles );

            graphics.moveTo(x, y);

            for ( var i = 1; i < l; ++i ){

                vert = verts[ i ];
                x = vert.x;
                y = vert.y;
                graphics.lineTo(x, y);
            }

            if (l > 2){
                graphics.lineTo(start.x, start.y);
            }

            graphics.endFill();
            return graphics;
        },

        /**
         * PixiRenderer#createLine( from, to, styles ) -> PIXI.Graphics
         * - from (Vectorish): Starting point
         * - to (Vectorish): Ending point
         * - styles (Object): The styles configuration
         * + (PIXI.Graphics): A graphic object representing a polygon.
         *
         * Create a line for use in PIXI stage
         **/
        createLine: function( from, to, styles ){

            var x = from.x
                ,y = from.y
                ;

            var graphics = new PIXI.Graphics();
            this.setStyles( graphics, styles );

            graphics.moveTo(x, y);

            x = to.x;
            y = to.y;

            graphics.lineTo(x, y);

            graphics.endFill();
            return graphics;
        },

        // extended
        createView: function( geometry, styles, parent ){

            var view = null
                ,aabb = geometry.aabb()
                ,hw = aabb.hw + Math.abs(aabb.x)
                ,hh = aabb.hh + Math.abs(aabb.y)
                ,name = geometry.name
                ;

            parent = parent || this.stage;
            styles = styles || this.options.styles[ name ] || this.options.styles.circle || {};

            // must want an image
            if ( styles.src ){
                view = PIXI.Sprite.fromImage( styles.src );
                view.anchor.set( 0.5, 0.5 );
                if ( styles.anchor ) {
                    view.anchor.x = styles.anchor.x;
                    view.anchor.y = styles.anchor.y;
                }
                if ( styles.width ){
                    view.width = styles.width;
                }
                if ( styles.height ){
                    view.height = styles.height;
                }
                parent.addChild(view);
                return view;
            }

            if (name === 'circle'){

                view = this.createCircle(0, 0, geometry.radius, styles);

            } else if (name === 'convex-polygon'){

                view = this.createPolygon(geometry.vertices, styles);

            } else if (name === 'rectangle'){

                view = this.createRect(-geometry.width/2, -geometry.height/2, geometry.width, geometry.height, styles);
            } else if (name === 'compound'){

                view = new PIXI.Graphics();

                for ( var i = 0, l = geometry.children.length, ch, chview; i < l; i++ ){
                    ch = geometry.children[ i ];
                    chview = this.createView( ch.g, styles, view );
                    chview.position.set( ch.pos.x, ch.pos.y );
                    chview.rotation = ch.angle;
                }
            } else {

                // assume it's a point
                view = this.createCircle(0, 0, 1, styles);
            }

            if ( name !== 'compound' && styles.angleIndicator && styles.angleIndicator !== 'transparent' ){

                view.lineStyle( styles.lineWidth, styles.angleIndicator );
                view.moveTo( 0, 0 );
                view.lineTo( hw, 0 );
            }

            if ( name !== 'compound' ){
                view.cacheAsBitmap = true;
            }

            parent.addChild(view);
            return view;
        },

        // extended
        drawMeta: function( meta ){
            if (!this.meta.loaded){
                // define the font styles here
                this.meta.fps = new PIXI.Text('FPS: ' + meta.fps.toFixed(2), fontStyles);
                this.meta.fps.position.x = 15;
                this.meta.fps.position.y = 5;

                this.meta.ipf = new PIXI.Text('IPF: ' + meta.ipf, fontStyles);
                this.meta.ipf.position.x = 15;
                this.meta.ipf.position.y = 30;

                this.stage.addChild(this.meta.fps);
                this.stage.addChild(this.meta.ipf);
                this.meta.loaded = true;
            } else {
                this.meta.fps.setText('FPS: ' + meta.fps.toFixed(2));
                this.meta.ipf.setText('IPF: ' + meta.ipf);
            }
        },

        /**
         * PixiRenderer#createDisplay( type, options ) -> PIXI.DisplayObject
         * - type (String): The type of PIXI.DisplayObject to make
         * - options (Object): Options to apply to the view.
         * + (PIXI.DisplayObject): An object that is renderable.
         *
         * Create a PIXI sprite or movie clip.
         **/
        createDisplay: function( type, options ){
            var view = null
                ,texture = null
                ;
            switch (type){
                // Create a sprite object
                case 'sprite':
                    texture = PIXI.Texture.fromImage(options.texture);
                    view = new PIXI.Sprite(texture);
                    if (options.anchor ) {
                        view.anchor.x = options.anchor.x;
                        view.anchor.y = options.anchor.y;
                    }
                    // If a container is specified, use add to that container
                    if (options.container) {
                        options.container.addChild(view);
                    } else {
                        // Otherwise just add the view to the stage
                        this.stage.addChild(view);
                    }
                    return view;
                // Create a movieclip object
                case 'movieclip':
                    if (!this.assetsLoaded) {
                        throw "No assets have been loaded. Use loadSpritesheet() first";
                    }
                    var tex = []
                        ,i = 0
                        ;
                    // Populate our movieclip
                    for (i; i < options.frames.length; i++) {
                        texture = PIXI.Texture.fromFrame(options.frames[i]);
                        tex.push(texture);
                    }
                    view = new PIXI.MovieClip(tex);
                    if (options.anchor ) {
                        view.anchor.x = options.anchor.x;
                        view.anchor.y = options.anchor.y;
                    }
                    // If a container is specified, use add to that container
                    if (options.container) {
                        options.container.addChild(view);
                    } else {
                        // Otherwise just add the view to the stage
                        this.stage.addChild(view);
                    }
                    return view;
                // Create a default case
                default:
                    throw 'Invalid PIXI.DisplayObject passed';
            }
        },

        /**
         * PixiRenderer#centerAnchor( view )
         * - view (PIXI.DisplayObject): The view to center
         *
         * Centers the anchor to {x: 0.5, y: 0.5} of a view
         **/
        centerAnchor: function( view ) {
            if (view !== null){
                view.anchor.x = 0.5;
                view.anchor.y = 0.5;
            }
        }
    };
});


// ---
// inside: src/outro.js

return Physics;
}));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _physicsjs = __webpack_require__(0);

var _physicsjs2 = _interopRequireDefault(_physicsjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paused = false;
var bodyRadius = 2;
var gravityWell = false;

function actionSelector(actionB) {
    switch (actionB) {
        case 'gravityWell':
            gravityWell = true;
            break;
        case 'small':
            bodyRadius = 2;
            gravityWell = false;
            break;
        case 'medium':
            bodyRadius = 4;
            gravityWell = false;
            break;
        case 'large':
            bodyRadius = 6;
            gravityWell = false;
            break;
        case 'huge':
            bodyRadius = 8;
            gravityWell = false;
            break;

    };
};

(0, _physicsjs2.default)({ sleepDisabled: true }, function (world) {
    var viewportWidth = document.getElementById('viewport').scrollWidth;
    var viewportHeight = document.getElementById('viewport').scrollHeight;
    var bounds = _physicsjs2.default.aabb(0, 0, viewportWidth, viewportHeight);
    var edgeBounce = _physicsjs2.default.behavior('edge-collision-detection', { aabb: bounds, restitution: 1, channel: 'collisions-edge:detected' });

    //document.getElementById('viewport').addEventListener('click', addCircle);
    document.getElementById('pauseButton').addEventListener('click', pauseGame);
    document.getElementById('resetButton').addEventListener('click', resetWorld);

    var renderer = _physicsjs2.default.renderer('canvas', {
        el: 'viewport',
        width: viewportWidth,
        height: viewportHeight
    });

    window.addEventListener('resize', function () {
        viewportWidth = document.getElementById('viewport').scrollWidth;
        viewportHeight = document.getElementById('viewport').scrollHeight;
        renderer.el.width = viewportWidth;
        renderer.el.height = viewportHeight;

        bounds = _physicsjs2.default.aabb(0, 0, viewportWidth, viewportHeight);
        edgeBounce.setAABB(bounds);
    });

    world.add(renderer);

    world.add([_physicsjs2.default.behavior('newtonian'), edgeBounce, _physicsjs2.default.behavior('body-impulse-response', {
        check: 'collisions-edge:detected'
    }), _physicsjs2.default.behavior('body-collision-detection', {
        channel: 'collisions-body:detected'
    }), _physicsjs2.default.behavior('sweep-prune'), _physicsjs2.default.behavior('interactive', { el: renderer.container })]);

    var attractor = _physicsjs2.default.behavior('attractor', {
        order: 0,
        strength: 0.001
    });
    world.on({
        'interact:poke': function interactPoke(pos) {
            if (!gravityWell) {
                var circle = addCircle(pos, bodyRadius);
                console.log("mass:" + circle.mass);
                world.add(circle);
            } else {
                world.wakeUpAll();
                attractor.position(pos);
                world.add(attractor);
            };
        },
        'interact:move': function interactMove(pos) {
            attractor.position(pos);
        },
        'interact:release': function interactRelease() {
            world.wakeUpAll();
            world.remove(attractor);
        }
    });

    world.on('collisions-body:detected', function (data) {
        //collision detection for merging bodies


        function calcImpulse(biggerBody, smallerBody) {
            console.log("Initial velocities: Big:" + biggerBody.state.old.vel + " Small:" + smallerBody.state.old.vel + "/n");
            console.log("In calcImpulse : Initial masses: Big: " + biggerBody.mass + " small: " + smallerBody.mass + " /n");
            var i1 = biggerBody.state.vel.mult(biggerBody.mass);
            var i2 = smallerBody.state.vel.mult(smallerBody.mass);
            var addedMasses = biggerBody.mass + smallerBody.mass;
            console.log("impulse1: " + i1 + "impulse2:" + i2 + "Added masses: " + addedMasses);
            i1.vadd(i2);
            i1.x = i1.x / addedMasses;
            i1.y = i1.y / addedMasses;
            console.log("Final impulse: " + i1);

            return i1;
        }

        function calcNewBody(biggerBody, smallerBody) {
            biggerBody.state.vel = calcImpulse(biggerBody, smallerBody);
            console.log("in calcNewBody 1 :" + biggerBody.mass);
            biggerBody.mass += smallerBody.mass;
            console.log("in calcNewBody 2 :" + biggerBody.mass);
            biggerBody.radius = Math.cbrt(biggerBody.mass * 12000 / (4 * Math.PI));
            biggerBody.geometry.radius = Math.cbrt(biggerBody.mass * 12000 / (4 * Math.PI));
            biggerBody.view = null;
            biggerBody.recalc();
            world.remove(smallerBody);
        };

        for (var i = 0; i < data.collisions.length; i++) {
            c = data.collisions[i];

            console.log("overlap: " + c.overlap);
            if (c.overlap > c.bodyA.radius / 4 || c.overlap > c.bodyB.radius / 4) {
                if (c.bodyA.mass >= c.bodyB.mass) {
                    console.log("In MassCheck A mass: " + c.bodyA.mass + "B mass: " + c.bodyB.mass);
                    console.log(data.collisions[i]);

                    calcNewBody(c.bodyA, c.bodyB);
                } else {
                    calcNewBody(c.bodyB, c.bodyA);
                };
            }
        }
    });

    function addCircle(pos, bRadius) {
        var bMass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4 / 3 * Math.PI * Math.pow(bodyRadius, 3) / 4000;
        var bVelocity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new _physicsjs2.default.vector({ x: 0.00, y: 0.00 });

        var xPos = pos.x;
        var yPos = pos.y;
        var circle = _physicsjs2.default.body('circle', {
            x: xPos,
            y: yPos,
            radius: bRadius,
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

    function resetWorld() {
        var circles = [];
        circles = world.getBodies();
        world.remove(circles);
    }

    function pauseGame() {
        if (!paused) {
            world.pause();
            paused = true;
        } else {
            world.unpause();
            paused = false;
        }
    }

    world.render();
    _physicsjs2.default.util.ticker.on(function (time, dt) {
        world.step(time);
    });
    _physicsjs2.default.util.ticker.start();
    world.on('step', function () {
        world.render();
    });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTM4MGJiMTM3MzBkOTE0NDk4NWEiLCJ3ZWJwYWNrOi8vLy4uL34vcGh5c2ljc2pzL2Rpc3QvcGh5c2ljc2pzLWZ1bGwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIl0sIm5hbWVzIjpbInBhdXNlZCIsImJvZHlSYWRpdXMiLCJncmF2aXR5V2VsbCIsImFjdGlvblNlbGVjdG9yIiwiYWN0aW9uQiIsInNsZWVwRGlzYWJsZWQiLCJ3b3JsZCIsInZpZXdwb3J0V2lkdGgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2Nyb2xsV2lkdGgiLCJ2aWV3cG9ydEhlaWdodCIsInNjcm9sbEhlaWdodCIsImJvdW5kcyIsImFhYmIiLCJlZGdlQm91bmNlIiwiYmVoYXZpb3IiLCJyZXN0aXR1dGlvbiIsImNoYW5uZWwiLCJhZGRFdmVudExpc3RlbmVyIiwicGF1c2VHYW1lIiwicmVzZXRXb3JsZCIsInJlbmRlcmVyIiwiZWwiLCJ3aWR0aCIsImhlaWdodCIsIndpbmRvdyIsInNldEFBQkIiLCJhZGQiLCJjaGVjayIsImNvbnRhaW5lciIsImF0dHJhY3RvciIsIm9yZGVyIiwic3RyZW5ndGgiLCJvbiIsInBvcyIsImNpcmNsZSIsImFkZENpcmNsZSIsImNvbnNvbGUiLCJsb2ciLCJtYXNzIiwid2FrZVVwQWxsIiwicG9zaXRpb24iLCJyZW1vdmUiLCJkYXRhIiwiY2FsY0ltcHVsc2UiLCJiaWdnZXJCb2R5Iiwic21hbGxlckJvZHkiLCJzdGF0ZSIsIm9sZCIsInZlbCIsImkxIiwibXVsdCIsImkyIiwiYWRkZWRNYXNzZXMiLCJ2YWRkIiwieCIsInkiLCJjYWxjTmV3Qm9keSIsInJhZGl1cyIsIk1hdGgiLCJjYnJ0IiwiUEkiLCJnZW9tZXRyeSIsInZpZXciLCJyZWNhbGMiLCJpIiwiY29sbGlzaW9ucyIsImxlbmd0aCIsImMiLCJvdmVybGFwIiwiYm9keUEiLCJib2R5QiIsImJSYWRpdXMiLCJiTWFzcyIsInBvdyIsImJWZWxvY2l0eSIsInZlY3RvciIsInhQb3MiLCJ5UG9zIiwiYm9keSIsInZ4IiwidnkiLCJzdHlsZXMiLCJmaWxsU3R5bGUiLCJhbmdsZUluZGljYXRvciIsImNpcmNsZXMiLCJnZXRCb2RpZXMiLCJwYXVzZSIsInVucGF1c2UiLCJyZW5kZXIiLCJ1dGlsIiwidGlja2VyIiwidGltZSIsImR0Iiwic3RlcCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMEJBQTBCLDRCQUE0QjtBQUN0RCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksRUFBRTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCLGdCQUFnQixhQUFhO0FBQzdCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDOztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxTQUFTOztBQUVULCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDLFFBQVE7OztBQUdUO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MseUJBQXlCO0FBQ2pFLGlCQUFpQixlQUFlO0FBQ2hDO0FBQ0Esb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsMEJBQTBCLGFBQWE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQ0FBcUM7QUFDckM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFVBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EOztBQUVwRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEMscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0IsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixlQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QixjQUFjOztBQUUxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7QUFDbEMsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVGQUF1RjtBQUN2RiwwRUFBMEU7QUFDMUUsdUNBQXVDO0FBQ3ZDLDZEQUE2RDtBQUM3RCxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9EQUFvRCxXQUFXLEVBQUUsR0FBRyxtQkFBbUI7O0FBRXZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0UseUJBQXlCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZEQUE2RDs7QUFFN0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSx5QkFBeUI7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtELE9BQU87O0FBRXpEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0UseUJBQXlCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFdBQVcsR0FBRzs7QUFFMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0JBQStCO0FBQ25ELFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLFFBQVE7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsQ0FBQzs7QUFFRDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFROztBQUU1Qjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQW9CLE9BQU87O0FBRTNCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsT0FBTzs7QUFFM0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsT0FBTzs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxDQUFDOzs7QUFHRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsK0NBQStDLE9BQU87O0FBRXREO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLEtBQUs7O0FBRUwsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw4Q0FBOEM7QUFDOUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxzREFBc0QsT0FBTzs7QUFFN0Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbURBQW1ELE9BQU87O0FBRTFEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxREFBcUQ7QUFDckQsbURBQW1EO0FBQ25EOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUEsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxPQUFPOztBQUV0RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBK0MsT0FBTzs7QUFFdEQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDOzs7QUFHOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHNEQUFzRCxPQUFPO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZUFBZTtBQUMzQixZQUFZLGdCQUFnQjtBQUM1QixZQUFZLGdCQUFnQjtBQUM1QixZQUFZLGVBQWU7QUFDM0IsWUFBWTtBQUNaO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZDQUE2QyxPQUFPOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDRDQUE0Qzs7QUFFNUM7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx5REFBeUQsT0FBTztBQUNoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzREFBc0QsT0FBTztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsZ0JBQWdCO0FBQzdCLGFBQWEsZ0JBQWdCO0FBQzdCLGFBQWEsZUFBZTtBQUM1QixhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw0Q0FBNEM7O0FBRTVDO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNENBQTRDOztBQUU1QztBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0NBQStDLE9BQU87O0FBRXREOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzREFBc0QsT0FBTzs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw2REFBNkQsUUFBUTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBOztBQUVBOztBQUVBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1EQUFtRCxPQUFPOztBQUUxRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsNERBQTRELFFBQVE7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0NBQStDLE9BQU87O0FBRXREOztBQUVBLG9DQUFvQyxPQUFPOztBQUUzQzs7QUFFQTs7QUFFQTs7QUFFQSw0REFBNEQsUUFBUTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBLGlCQUFpQjs7QUFFakIsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxPQUFPOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1ELE9BQU87QUFDMUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsa0JBQWtCO0FBQzdFO0FBQ0E7O0FBRUE7O0FBRUEsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBOztBQUVBLCtDQUErQyxPQUFPOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxPQUFPOztBQUV0RDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEseURBQXlELFFBQVE7QUFDakU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLGVBQWU7QUFDaEYsaUVBQWlFLGFBQWE7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxjQUFjO0FBQ2QsaUJBQWlCO0FBQ2pCLElBQUk7QUFDSjtBQUNBO0FBQ0EsY0FBYztBQUNkLGNBQWM7QUFDZCxJQUFJO0FBQ0o7QUFDQTtBQUNBLGNBQWM7QUFDZCxjQUFjO0FBQ2QsaUJBQWlCO0FBQ2pCLElBQUk7QUFDSjtBQUNBO0FBQ0EsY0FBYztBQUNkLGNBQWM7QUFDZCxpQkFBaUI7QUFDakIsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxzRUFBc0UsZ0JBQWdCO0FBQ3RGO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0Isb0RBQW9ELHlEQUF5RDs7QUFFN0c7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxzRUFBc0UsZ0JBQWdCO0FBQ3RGO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzRUFBc0UsZ0JBQWdCO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJDQUEyQyxPQUFPOztBQUVsRDs7QUFFQSxnQ0FBZ0MsT0FBTzs7QUFFdkM7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1FQUFtRSxRQUFRO0FBQzNFO0FBQ0E7QUFDQSx5RUFBeUUsU0FBUztBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixtRUFBbUUsUUFBUTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QixvQ0FBb0M7O0FBRXBDO0FBQ0EsOEJBQThCLGNBQWM7O0FBRTVDO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0MsT0FBTzs7QUFFdEQsZ0NBQWdDLG9CQUFvQjtBQUNwRDtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixjQUFjOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhCQUE4QixjQUFjOztBQUU1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxTQUFTOztBQUV4RDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLDZDQUE2QyxRQUFROztBQUVyRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhCQUE4QixjQUFjOztBQUU1QztBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvREFBb0QsT0FBTzs7QUFFM0Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxzQ0FBc0MsY0FBYzs7QUFFcEQ7QUFDQTs7QUFFQSx5REFBeUQsT0FBTzs7QUFFaEU7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxvREFBb0QsT0FBTzs7QUFFM0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViLG9EQUFvRCxPQUFPOztBQUUzRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0RBQW9ELE9BQU87O0FBRTNEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsaUJBQWlCOztBQUVqQjs7QUFFQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHFCQUFxQjs7QUFFckI7O0FBRUEscUJBQXFCOztBQUVyQjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHFCQUFxQjs7QUFFckI7O0FBRUEscUJBQXFCOztBQUVyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEscUJBQXFCOztBQUVyQjs7QUFFQSxxQkFBcUI7O0FBRXJCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvREFBb0QsT0FBTzs7QUFFM0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixTQUFTOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxPQUFPOztBQUV0RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0NBQStDLE9BQU87O0FBRXREO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0NBQStDLE9BQU87O0FBRXREO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBK0MsT0FBTzs7QUFFdEQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxPQUFPOztBQUV0RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxPQUFPOztBQUV0RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGFBQWE7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsaUJBQWlCO0FBQ2pCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtEQUFrRCxPQUFPO0FBQ3pEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4QyxPQUFPOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIsT0FBTzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxhQUFhOztBQUViOztBQUVBLGFBQWE7O0FBRWI7O0FBRUEsYUFBYTs7QUFFYixrRUFBa0UsT0FBTztBQUN6RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1REFBdUQsT0FBTzs7QUFFOUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrRUFBa0UsT0FBTztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxhQUFhO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixhQUFhO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDRCQUE0QixPQUFPOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxhQUFhOztBQUViOztBQUVBLGFBQWE7O0FBRWI7QUFDQSxhQUFhOztBQUViOztBQUVBLDBFQUEwRSxPQUFPO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxlQUFlO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBO0FBQ0EsQ0FBQyxHOzs7Ozs7Ozs7QUMxclhEOzs7Ozs7QUFFQSxJQUFJQSxTQUFTLEtBQWI7QUFDQSxJQUFJQyxhQUFhLENBQWpCO0FBQ0EsSUFBSUMsY0FBYyxLQUFsQjs7QUFFQyxTQUFTQyxjQUFULENBQXdCQyxPQUF4QixFQUFpQztBQUMvQixTQUFPQSxPQUFQO0FBQ0MsT0FBSyxhQUFMO0FBQ0FGLGlCQUFjLElBQWQ7QUFDQTtBQUNBLE9BQUssT0FBTDtBQUNBRCxnQkFBYSxDQUFiO0FBQ0FDLGlCQUFjLEtBQWQ7QUFDQTtBQUNBLE9BQUssUUFBTDtBQUNBRCxnQkFBYSxDQUFiO0FBQ0FDLGlCQUFjLEtBQWQ7QUFDQTtBQUNBLE9BQUssT0FBTDtBQUNBRCxnQkFBYSxDQUFiO0FBQ0FDLGlCQUFjLEtBQWQ7QUFDQTtBQUNBLE9BQUssTUFBTDtBQUNBRCxnQkFBYSxDQUFiO0FBQ0FDLGlCQUFjLEtBQWQ7QUFDQTs7QUFuQkQsRUFxQkM7QUFDRDs7QUFHRix5QkFBUSxFQUFDRyxlQUFlLElBQWhCLEVBQVIsRUFBK0IsVUFBU0MsS0FBVCxFQUFnQjtBQUM5QyxLQUFJQyxnQkFBZ0JDLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NDLFdBQXhEO0FBQ0EsS0FBSUMsaUJBQWlCSCxTQUFTQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DRyxZQUF6RDtBQUNBLEtBQUlDLFNBQVMsb0JBQVFDLElBQVIsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CUCxhQUFuQixFQUFrQ0ksY0FBbEMsQ0FBYjtBQUNBLEtBQUlJLGFBQWEsb0JBQVFDLFFBQVIsQ0FBaUIsMEJBQWpCLEVBQTZDLEVBQUNGLE1BQU1ELE1BQVAsRUFBZUksYUFBYSxDQUE1QixFQUErQkMsU0FBUSwwQkFBdkMsRUFBN0MsQ0FBakI7O0FBRUE7QUFDQVYsVUFBU0MsY0FBVCxDQUF3QixhQUF4QixFQUF1Q1UsZ0JBQXZDLENBQXdELE9BQXhELEVBQWlFQyxTQUFqRTtBQUNBWixVQUFTQyxjQUFULENBQXdCLGFBQXhCLEVBQXVDVSxnQkFBdkMsQ0FBd0QsT0FBeEQsRUFBaUVFLFVBQWpFOztBQU1BLEtBQUlDLFdBQVcsb0JBQVFBLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkI7QUFDekNDLE1BQUksVUFEcUM7QUFFekNDLFNBQU9qQixhQUZrQztBQUd6Q2tCLFVBQVFkO0FBSGlDLEVBQTNCLENBQWY7O0FBT0FlLFFBQU9QLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQVc7QUFDNUNaLGtCQUFnQkMsU0FBU0MsY0FBVCxDQUF3QixVQUF4QixFQUFvQ0MsV0FBcEQ7QUFDQUMsbUJBQWlCSCxTQUFTQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DRyxZQUFyRDtBQUNBVSxXQUFTQyxFQUFULENBQVlDLEtBQVosR0FBb0JqQixhQUFwQjtBQUNBZSxXQUFTQyxFQUFULENBQVlFLE1BQVosR0FBcUJkLGNBQXJCOztBQUVBRSxXQUFTLG9CQUFRQyxJQUFSLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQlAsYUFBbkIsRUFBa0NJLGNBQWxDLENBQVQ7QUFDQUksYUFBV1ksT0FBWCxDQUFtQmQsTUFBbkI7QUFDQSxFQVJEOztBQVVBUCxPQUFNc0IsR0FBTixDQUFVTixRQUFWOztBQUVBaEIsT0FBTXNCLEdBQU4sQ0FBVSxDQUNULG9CQUFRWixRQUFSLENBQWlCLFdBQWpCLENBRFMsRUFFVEQsVUFGUyxFQUdULG9CQUFRQyxRQUFSLENBQWlCLHVCQUFqQixFQUEwQztBQUN6Q2EsU0FBTztBQURrQyxFQUExQyxDQUhTLEVBTVQsb0JBQVFiLFFBQVIsQ0FBaUIsMEJBQWpCLEVBQTZDO0FBQzVDRSxXQUFTO0FBRG1DLEVBQTdDLENBTlMsRUFTVCxvQkFBUUYsUUFBUixDQUFpQixhQUFqQixDQVRTLEVBVVQsb0JBQVFBLFFBQVIsQ0FBaUIsYUFBakIsRUFBZ0MsRUFBQ08sSUFBSUQsU0FBU1EsU0FBZCxFQUFoQyxDQVZTLENBQVY7O0FBYUEsS0FBSUMsWUFBWSxvQkFBUWYsUUFBUixDQUFpQixXQUFqQixFQUE4QjtBQUN4Q2dCLFNBQU8sQ0FEaUM7QUFFeENDLFlBQVU7QUFGOEIsRUFBOUIsQ0FBaEI7QUFJQTNCLE9BQU00QixFQUFOLENBQVM7QUFDUixtQkFBaUIsc0JBQVVDLEdBQVYsRUFBZTtBQUMvQixPQUFHLENBQUNqQyxXQUFKLEVBQWlCO0FBQ2hCLFFBQUlrQyxTQUFTQyxVQUFVRixHQUFWLEVBQWVsQyxVQUFmLENBQWI7QUFDQXFDLFlBQVFDLEdBQVIsQ0FBWSxVQUFRSCxPQUFPSSxJQUEzQjtBQUNBbEMsVUFBTXNCLEdBQU4sQ0FBVVEsTUFBVjtBQUNBLElBSkQsTUFJTztBQUNOOUIsVUFBTW1DLFNBQU47QUFDQVYsY0FBVVcsUUFBVixDQUFvQlAsR0FBcEI7QUFDQTdCLFVBQU1zQixHQUFOLENBQVdHLFNBQVg7QUFDQTtBQUNELEdBWE87QUFZUCxtQkFBaUIsc0JBQVVJLEdBQVYsRUFBZTtBQUNoQ0osYUFBVVcsUUFBVixDQUFvQlAsR0FBcEI7QUFDQSxHQWRPO0FBZVAsc0JBQW9CLDJCQUFVO0FBQzlCN0IsU0FBTW1DLFNBQU47QUFDQW5DLFNBQU1xQyxNQUFOLENBQWNaLFNBQWQ7QUFDQTtBQWxCTyxFQUFUOztBQXFCQXpCLE9BQU00QixFQUFOLENBQVMsMEJBQVQsRUFBcUMsVUFBU1UsSUFBVCxFQUFlO0FBQUc7OztBQUd0RCxXQUFTQyxXQUFULENBQXFCQyxVQUFyQixFQUFpQ0MsV0FBakMsRUFBOEM7QUFDN0NULFdBQVFDLEdBQVIsQ0FBWSw2QkFBMkJPLFdBQVdFLEtBQVgsQ0FBaUJDLEdBQWpCLENBQXFCQyxHQUFoRCxHQUFvRCxTQUFwRCxHQUE4REgsWUFBWUMsS0FBWixDQUFrQkMsR0FBbEIsQ0FBc0JDLEdBQXBGLEdBQTBGLElBQXRHO0FBQ0FaLFdBQVFDLEdBQVIsQ0FBWSwyQ0FBMkNPLFdBQVdOLElBQXRELEdBQTZELFVBQTdELEdBQXlFTyxZQUFZUCxJQUFyRixHQUEwRixLQUF0RztBQUNBLE9BQUlXLEtBQUtMLFdBQVdFLEtBQVgsQ0FBaUJFLEdBQWpCLENBQXFCRSxJQUFyQixDQUEwQk4sV0FBV04sSUFBckMsQ0FBVDtBQUNBLE9BQUlhLEtBQUtOLFlBQVlDLEtBQVosQ0FBa0JFLEdBQWxCLENBQXNCRSxJQUF0QixDQUEyQkwsWUFBWVAsSUFBdkMsQ0FBVDtBQUNBLE9BQUljLGNBQWNSLFdBQVdOLElBQVgsR0FBa0JPLFlBQVlQLElBQWhEO0FBQ0FGLFdBQVFDLEdBQVIsQ0FBWSxlQUFjWSxFQUFkLEdBQW1CLFdBQW5CLEdBQWlDRSxFQUFqQyxHQUFzQyxnQkFBdEMsR0FBd0RDLFdBQXBFO0FBQ0FILE1BQUdJLElBQUgsQ0FBUUYsRUFBUjtBQUNBRixNQUFHSyxDQUFILEdBQU9MLEdBQUdLLENBQUgsR0FBT0YsV0FBZDtBQUNBSCxNQUFHTSxDQUFILEdBQU9OLEdBQUdNLENBQUgsR0FBT0gsV0FBZDtBQUNBaEIsV0FBUUMsR0FBUixDQUFZLG9CQUFvQlksRUFBaEM7O0FBRUEsVUFBT0EsRUFBUDtBQUNBOztBQUdELFdBQVNPLFdBQVQsQ0FBcUJaLFVBQXJCLEVBQWlDQyxXQUFqQyxFQUE4QztBQUM3Q0QsY0FBV0UsS0FBWCxDQUFpQkUsR0FBakIsR0FBdUJMLFlBQVlDLFVBQVosRUFBd0JDLFdBQXhCLENBQXZCO0FBQ0FULFdBQVFDLEdBQVIsQ0FBWSx1QkFBdUJPLFdBQVdOLElBQTlDO0FBQ0FNLGNBQVdOLElBQVgsSUFBbUJPLFlBQVlQLElBQS9CO0FBQ0FGLFdBQVFDLEdBQVIsQ0FBWSx1QkFBdUJPLFdBQVdOLElBQTlDO0FBQ0FNLGNBQVdhLE1BQVgsR0FBb0JDLEtBQUtDLElBQUwsQ0FBV2YsV0FBV04sSUFBWCxHQUFnQixLQUFqQixJQUF5QixJQUFFb0IsS0FBS0UsRUFBaEMsQ0FBVixDQUFwQjtBQUNBaEIsY0FBV2lCLFFBQVgsQ0FBb0JKLE1BQXBCLEdBQTZCQyxLQUFLQyxJQUFMLENBQVdmLFdBQVdOLElBQVgsR0FBZ0IsS0FBakIsSUFBeUIsSUFBRW9CLEtBQUtFLEVBQWhDLENBQVYsQ0FBN0I7QUFDQWhCLGNBQVdrQixJQUFYLEdBQWtCLElBQWxCO0FBQ0FsQixjQUFXbUIsTUFBWDtBQUNBM0QsU0FBTXFDLE1BQU4sQ0FBYUksV0FBYjtBQUNBOztBQUdELE9BQUksSUFBSW1CLElBQUksQ0FBWixFQUFlQSxJQUFJdEIsS0FBS3VCLFVBQUwsQ0FBZ0JDLE1BQW5DLEVBQTJDRixHQUEzQyxFQUFnRDtBQUMvQ0csT0FBSXpCLEtBQUt1QixVQUFMLENBQWdCRCxDQUFoQixDQUFKOztBQUVBNUIsV0FBUUMsR0FBUixDQUFZLGNBQVk4QixFQUFFQyxPQUExQjtBQUNBLE9BQUtELEVBQUVDLE9BQUYsR0FBWUQsRUFBRUUsS0FBRixDQUFRWixNQUFSLEdBQWUsQ0FBNUIsSUFBbUNVLEVBQUVDLE9BQUYsR0FBWUQsRUFBRUcsS0FBRixDQUFRYixNQUFSLEdBQWUsQ0FBbEUsRUFBcUU7QUFDcEUsUUFBR1UsRUFBRUUsS0FBRixDQUFRL0IsSUFBUixJQUFnQjZCLEVBQUVHLEtBQUYsQ0FBUWhDLElBQTNCLEVBQWlDO0FBQ2hDRixhQUFRQyxHQUFSLENBQVksMEJBQTBCOEIsRUFBRUUsS0FBRixDQUFRL0IsSUFBbEMsR0FBd0MsVUFBeEMsR0FBb0Q2QixFQUFFRyxLQUFGLENBQVFoQyxJQUF4RTtBQUNBRixhQUFRQyxHQUFSLENBQVlLLEtBQUt1QixVQUFMLENBQWdCRCxDQUFoQixDQUFaOztBQUVBUixpQkFBWVcsRUFBRUUsS0FBZCxFQUFxQkYsRUFBRUcsS0FBdkI7QUFDQSxLQUxELE1BS087QUFDTmQsaUJBQVlXLEVBQUVHLEtBQWQsRUFBcUJILEVBQUVFLEtBQXZCO0FBQ0E7QUFDRDtBQUdEO0FBQ0QsRUFqREQ7O0FBb0RBLFVBQVNsQyxTQUFULENBQW1CRixHQUFuQixFQUNBc0MsT0FEQSxFQUlBO0FBQUEsTUFGQUMsS0FFQSx1RUFGVSxJQUFFLENBQUgsR0FBTWQsS0FBS0UsRUFBWCxHQUFjRixLQUFLZSxHQUFMLENBQVMxRSxVQUFULEVBQXFCLENBQXJCLENBQWYsR0FBd0MsSUFFaEQ7QUFBQSxNQURBMkUsU0FDQSx1RUFEWSxJQUFJLG9CQUFRQyxNQUFaLENBQW1CLEVBQUNyQixHQUFHLElBQUosRUFBVUMsR0FBRyxJQUFiLEVBQW5CLENBQ1o7O0FBQ0MsTUFBSXFCLE9BQU8zQyxJQUFJcUIsQ0FBZjtBQUNBLE1BQUl1QixPQUFPNUMsSUFBSXNCLENBQWY7QUFDQSxNQUFJckIsU0FBUyxvQkFBUTRDLElBQVIsQ0FBYSxRQUFiLEVBQXVCO0FBQ3BDeEIsTUFBR3NCLElBRGlDO0FBRXBDckIsTUFBR3NCLElBRmlDO0FBR3BDcEIsV0FBUWMsT0FINEI7QUFJcENqQyxTQUFNa0MsS0FKOEI7QUFLcENPLE9BQUlMLFVBQVVwQixDQUxzQjtBQU1wQzBCLE9BQUlOLFVBQVVuQixDQU5zQjtBQU9wQzBCLFdBQVE7QUFDUEMsZUFBVyxTQURKO0FBRVBDLG9CQUFnQjtBQUZUO0FBUDRCLEdBQXZCLENBQWI7QUFZQTtBQUNBLFNBQU9qRCxNQUFQO0FBRUE7O0FBRUQsVUFBU2YsVUFBVCxHQUFzQjtBQUNyQixNQUFJaUUsVUFBVSxFQUFkO0FBQ0FBLFlBQVVoRixNQUFNaUYsU0FBTixFQUFWO0FBQ0FqRixRQUFNcUMsTUFBTixDQUFhMkMsT0FBYjtBQUNBOztBQUVELFVBQVNsRSxTQUFULEdBQXFCO0FBQ3BCLE1BQUcsQ0FBQ3BCLE1BQUosRUFBWTtBQUNYTSxTQUFNa0YsS0FBTjtBQUNBeEYsWUFBUyxJQUFUO0FBQ0EsR0FIRCxNQUlLO0FBQ0pNLFNBQU1tRixPQUFOO0FBQ0F6RixZQUFTLEtBQVQ7QUFDQTtBQUNEOztBQUdETSxPQUFNb0YsTUFBTjtBQUNBLHFCQUFRQyxJQUFSLENBQWFDLE1BQWIsQ0FBb0IxRCxFQUFwQixDQUF1QixVQUFVMkQsSUFBVixFQUFnQkMsRUFBaEIsRUFBb0I7QUFDMUN4RixRQUFNeUYsSUFBTixDQUFXRixJQUFYO0FBQ0EsRUFGRDtBQUdBLHFCQUFRRixJQUFSLENBQWFDLE1BQWIsQ0FBb0JJLEtBQXBCO0FBQ0ExRixPQUFNNEIsRUFBTixDQUFTLE1BQVQsRUFBaUIsWUFBVztBQUMzQjVCLFFBQU1vRixNQUFOO0FBQ0EsRUFGRDtBQUdBLENBN0tELEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1MzgwYmIxMzczMGQ5MTQ0OTg1YSIsIi8qKlxuICogUGh5c2ljc0pTIHYwLjcuMCAtIDIwMTQtMTItMDhcbiAqIEEgbW9kdWxhciwgZXh0ZW5kYWJsZSwgYW5kIGVhc3ktdG8tdXNlIHBoeXNpY3MgZW5naW5lIGZvciBqYXZhc2NyaXB0XG4gKiBodHRwOi8vd2VsbGNhZmZlaW5hdGVkLm5ldC9QaHlzaWNzSlNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSmFzcGVyIFBhbGZyZWUgPGphc3BlckB3ZWxsY2FmZmVpbmF0ZWQubmV0PlxuICogTGljZW5zZWQgTUlUXG4gKi9cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9pbnRyby5qc1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeS5jYWxsKHJvb3QpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCl7IHJldHVybiBmYWN0b3J5LmNhbGwocm9vdCkgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgICAgcm9vdC5QaHlzaWNzID0gZmFjdG9yeS5jYWxsKHJvb3QpO1xuICAgIH1cbn0odHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHdpbmRvdyA9IHRoaXM7XG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cbi8qKiByZWxhdGVkIHRvOiBQaHlzaWNzLndvcmxkXG4gKiBQaHlzaWNzXG4gKlxuICogVGhlIHRvcC1sZXZlbCBuYW1lc3BhY2UuIEFsbCBvZiBQaHlzaWNzSlMgaXMgY29udGFpbmVkIGluXG4gKiB0aGUgYFBoeXNpY3NgIG5hbWVzcGFjZS5cbiAqXG4gKiBJdCBtYXkgKGFuZCBzaG91bGQpIGJlIGludm9rZWQgYXMgYSBmdW5jdGlvbiB0byBjcmVhdGUgYSB3b3JsZCBpbnN0YW5jZS4gRm9yIGFsbCBpbnRlbnNpdmUgcHVycG9zZXMsIFtbUGh5c2ljc11dIGFuZCBbW1BoeXNpY3Mud29ybGRdXSBhcmUgdGhlIHNhbWUgdGhpbmcuXG4gKlxuICogU2VlIFtbbmV3IFBoeXNpY3Mud29ybGRdXSBmb3IgY29uZmlnIG9wdGlvbnMgYW5kIGZ1bmN0aW9uIHNpZ25hdHVyZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIFBoeXNpY3MoIGNmZywgZnVuY3Rpb24oIHdvcmxkICkge1xuICogICAgIC8vIHVzZSB3b3JsZFxuICogfSk7IC8vIC0+IHdvcmxkXG4gKiBgYGBcbiAqKi9cbnZhciBQaHlzaWNzID0gZnVuY3Rpb24gUGh5c2ljcygpe1xuXG4gICAgcmV0dXJuIFBoeXNpY3Mud29ybGQuYXBwbHkoUGh5c2ljcywgYXJndW1lbnRzKTtcbn07XG5cbi8qKlxuICogUGh5c2ljcy51dGlsXG4gKlxuICogTmFtZXNwYWNlIGZvciB1dGlsaXR5IGZ1bmN0aW9ucy5cbiAqKi9cblBoeXNpY3MudXRpbCA9IHt9O1xuXG4vKipcbiAqID09IFNwZWNpYWwgPT1cbiAqXG4gKiBUaGlzIHNlY3Rpb24gY29udGFpbnMgbWlzY2VsbGFuZW91cyBmdW5jdGlvbmFsaXR5LlxuICoqL1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvbWF0aC9hYWJiLmpzXG5cbihmdW5jdGlvbigpe1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy5hYWJiKCBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZICkgLT4gT2JqZWN0XG4gICAgICogUGh5c2ljcy5hYWJiKCBwdDEsIHB0MiApIC0+IE9iamVjdFxuICAgICAqIFBoeXNpY3MuYWFiYiggd2lkdGgsIGhlaWdodFssIHB0XSApIC0+IE9iamVjdFxuICAgICAqIC0gbWluWCAoTnVtYmVyKTogVGhlIHggY29vcmQgb2YgdGhlIFwidG9wIGxlZnRcIiBwb2ludFxuICAgICAqIC0gbWluWSAoTnVtYmVyKTogVGhlIHkgY29vcmQgb2YgdGhlIFwidG9wIGxlZnRcIiBwb2ludFxuICAgICAqIC0gbWF4WCAoTnVtYmVyKTogVGhlIHggY29vcmQgb2YgdGhlIFwiYm90dG9tIHJpZ2h0XCIgcG9pbnRcbiAgICAgKiAtIG1heFkgKE51bWJlcik6IFRoZSB5IGNvb3JkIG9mIHRoZSBcImJvdHRvbSByaWdodFwiIHBvaW50XG4gICAgICogLSBwdDEgKFZlY3RvcmlzaCk6IFRoZSBmaXJzdCBjb3JuZXJcbiAgICAgKiAtIHB0MiAoVmVjdG9yaXNoKTogVGhlIG9wcG9zaXRlIGNvcm5lclxuICAgICAqIC0gd2lkdGggKE51bWJlcik6IFRoZSB3aWR0aCBvZiB0aGUgYm91bmRpbmcgYm94XG4gICAgICogLSBoZWlnaHQgKE51bWJlcik6IFRoZSBoZWlnaHQgb2YgdGhlIGJvdW5kaW5nIGJveFxuICAgICAqIC0gcHQgKFZlY3RvcmlzaCk6IFRoZSBjZW50ZXIgcG9pbnQgb2YgdGhlIGJvdW5kaW5nIGJveFxuICAgICAqXG4gICAgICogQ3JlYXRlIGFuIEF4aXMgQWxpZ25lZCBCb3VuZGluZyBCb3guXG4gICAgICpcbiAgICAgKiBTaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICoge1xuICAgICAqICAgICB4OiBOdW1iZXIsIC8vIHRoZSB4IGNvb3JkIG9mIHRoZSBjZW50ZXIgcG9pbnRcbiAgICAgKiAgICAgeTogTnVtYmVyLCAvLyB0aGUgeSBjb29yZCBvZiB0aGUgY2VudGVyIHBvaW50XG4gICAgICogICAgIGh3OiBOdW1iZXIsIC8vIHRoZSBoYWxmLXdpZHRoXG4gICAgICogICAgIGhoOiBOdW1iZXIsIC8vIHRoZSBoYWxmLWhlaWdodFxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKiovXG4gICAgUGh5c2ljcy5hYWJiID0gZnVuY3Rpb24oIG1pblgsIG1pblksIG1heFgsIG1heFkgKXtcblxuICAgICAgICB2YXIgYWFiYiA9IHsgeDogMCwgeTogMCwgaHc6IDAsIGhoOiAwIH07XG5cbiAgICAgICAgaWYgKCBtaW5YID09PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgIHJldHVybiBhYWJiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBtaW5YICYmIG1pblgueCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgcG9pbnQgc3BlY2lmaWVkIGFzIGZpcnN0IGFyZ1xuICAgICAgICAgICAgbWF4WCA9IG1pblkueDtcbiAgICAgICAgICAgIG1heFkgPSBtaW5ZLnk7XG4gICAgICAgICAgICBtaW5ZID0gbWluWC55O1xuICAgICAgICAgICAgbWluWCA9IG1pblgueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggbWF4WSA9PT0gdW5kZWZpbmVkICYmIG1pblggIT09IHVuZGVmaW5lZCAmJiBtaW5ZICE9PSB1bmRlZmluZWQgKXtcblxuICAgICAgICAgICAgYWFiYi5odyA9IG1pblggKiAwLjU7XG4gICAgICAgICAgICBhYWJiLmhoID0gbWluWSAqIDAuNTtcblxuICAgICAgICAgICAgaWYgKCBtYXhYICYmIG1heFgueCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHBvaW50IHNwZWNpZmllZCBhcyB0aGUgdGhpcmQgYXJnXG4gICAgICAgICAgICAgICAgLy8gc28gd2UgYXNzdW1lIGl0J3MgdGhlIGNlbnRlciBwb2ludFxuICAgICAgICAgICAgICAgIGFhYmIueCA9IG1heFgueDtcbiAgICAgICAgICAgICAgICBhYWJiLnkgPSBtYXhYLnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhYWJiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGVyZSwgd2Ugc2hvdWxkIGhhdmUgYWxsIHRoZSBhcmd1bWVudHMgYXMgbnVtYmVyc1xuICAgICAgICBhYWJiLmh3ID0gTWF0aC5hYnMobWF4WCAtIG1pblgpICogMC41O1xuICAgICAgICBhYWJiLmhoID0gTWF0aC5hYnMobWF4WSAtIG1pblkpICogMC41O1xuICAgICAgICBhYWJiLnggPSAobWF4WCArIG1pblgpICogMC41O1xuICAgICAgICBhYWJiLnkgPSAobWF4WSArIG1pblkpICogMC41O1xuXG4gICAgICAgIHJldHVybiBhYWJiO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLmFhYmIuY29udGFpbnMoIGFhYmIsIHB0ICkgLT4gQm9vbGVhblxuICAgICAqIC0gYWFiYiAoT2JqZWN0KTogVGhlIGFhYmJcbiAgICAgKiAtIHB0IChWZWN0b3Jpc2gpOiBUaGUgcG9pbnRcbiAgICAgKiArIChCb29sZWFuKTogYHRydWVgIGlmIGBwdGAgaXMgaW5zaWRlIGBhYWJiYCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICAgKlxuICAgICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGFuIGFhYmIuXG4gICAgICoqL1xuICAgIFBoeXNpY3MuYWFiYi5jb250YWlucyA9IGZ1bmN0aW9uIGNvbnRhaW5zKCBhYWJiLCBwdCApe1xuXG4gICAgICAgIHJldHVybiAgKHB0LnggPiAoYWFiYi54IC0gYWFiYi5odykpICYmXG4gICAgICAgICAgICAgICAgKHB0LnggPCAoYWFiYi54ICsgYWFiYi5odykpICYmXG4gICAgICAgICAgICAgICAgKHB0LnkgPiAoYWFiYi55IC0gYWFiYi5oaCkpICYmXG4gICAgICAgICAgICAgICAgKHB0LnkgPCAoYWFiYi55ICsgYWFiYi5oaCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLmFhYmIuY2xvbmUoIGFhYmIgKSAtPiBPYmplY3RcbiAgICAgKiAtIGFhYmIgKE9iamVjdCk6IFRoZSBhYWJiIHRvIGNsb25lXG4gICAgICogKyAoT2JqZWN0KTogVGhlIGNsb25lXG4gICAgICpcbiAgICAgKiBDbG9uZSBhbiBhYWJiLlxuICAgICAqKi9cbiAgICBQaHlzaWNzLmFhYmIuY2xvbmUgPSBmdW5jdGlvbiggYWFiYiApe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogYWFiYi54LFxuICAgICAgICAgICAgeTogYWFiYi55LFxuICAgICAgICAgICAgaHc6IGFhYmIuaHcsXG4gICAgICAgICAgICBoaDogYWFiYi5oaFxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLmFhYmIudW5pb24oIGFhYmIxLCBhYWJiMlssIG1vZGlmeV0gKSAtPiBPYmplY3RcbiAgICAgKiAtIGFhYmIxIChPYmplY3QpOiBUaGUgZmlyc3QgYWFiYiAocmV0dXJuZWQgaWYgbW9kaWZ5IGlzIGB0cnVlYClcbiAgICAgKiAtIGFhYmIyIChPYmplY3QpOiBUaGUgc2Vjb25kIGFhYmJcbiAgICAgKiArIChPYmplY3QpOiBUaGUgdW5pb24gb2YgdHdvIGFhYmJzLiBJZiBtb2RpZnkgaXMgYHRydWVgLCB0aGVuIHRoZSBmaXJzdCBhYWJiIHdpbGwgYmUgbW9kaWZpZWQgYW5kIHJldHVybmVkLlxuICAgICAqXG4gICAgICogR2V0IHRoZSB1bmlvbiBvZiB0d28gYWFiYnMuXG4gICAgICoqL1xuICAgIFBoeXNpY3MuYWFiYi51bmlvbiA9IGZ1bmN0aW9uKCBhYWJiMSwgYWFiYjIsIG1vZGlmeSApe1xuXG4gICAgICAgIHZhciByZXQgPSBtb2RpZnkgPT09IHRydWUgPyBhYWJiMSA6IHt9XG4gICAgICAgICAgICAsbWF4WCA9IE1hdGgubWF4KCBhYWJiMS54ICsgYWFiYjEuaHcsIGFhYmIyLnggKyBhYWJiMi5odyApXG4gICAgICAgICAgICAsbWF4WSA9IE1hdGgubWF4KCBhYWJiMS55ICsgYWFiYjEuaGgsIGFhYmIyLnkgKyBhYWJiMi5oaCApXG4gICAgICAgICAgICAsbWluWCA9IE1hdGgubWluKCBhYWJiMS54IC0gYWFiYjEuaHcsIGFhYmIyLnggLSBhYWJiMi5odyApXG4gICAgICAgICAgICAsbWluWSA9IE1hdGgubWluKCBhYWJiMS55IC0gYWFiYjEuaGgsIGFhYmIyLnkgLSBhYWJiMi5oaCApXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgcmV0Lmh3ID0gTWF0aC5hYnMobWF4WCAtIG1pblgpICogMC41O1xuICAgICAgICByZXQuaGggPSBNYXRoLmFicyhtYXhZIC0gbWluWSkgKiAwLjU7XG4gICAgICAgIHJldC54ID0gKG1heFggKyBtaW5YKSAqIDAuNTtcbiAgICAgICAgcmV0LnkgPSAobWF4WSArIG1pblkpICogMC41O1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy5hYWJiLm92ZXJsYXAoIGFhYmIxLCBhYWJiMiApIC0+IEJvb2xlYW5cbiAgICAgKiAtIGFhYmIxIChPYmplY3QpOiBUaGUgZmlyc3QgYWFiYlxuICAgICAqIC0gYWFiYjIgKE9iamVjdCk6IFRoZSBzZWNvbmQgYWFiYlxuICAgICAqICsgKEJvb2xlYW4pOiBgdHJ1ZWAgaWYgdGhleSBvdmVybGFwLCBgZmFsc2VgIG90aGVyd2lzZVxuICAgICAqXG4gICAgICogQ2hlY2sgaWYgdHdvIEFBQkJzIG92ZXJsYXAuXG4gICAgICoqL1xuICAgIFBoeXNpY3MuYWFiYi5vdmVybGFwID0gZnVuY3Rpb24oIGFhYmIxLCBhYWJiMiApe1xuXG4gICAgICAgIHZhciBtaW4xID0gYWFiYjEueCAtIGFhYmIxLmh3XG4gICAgICAgICAgICAsbWluMiA9IGFhYmIyLnggLSBhYWJiMi5od1xuICAgICAgICAgICAgLG1heDEgPSBhYWJiMS54ICsgYWFiYjEuaHdcbiAgICAgICAgICAgICxtYXgyID0gYWFiYjIueCArIGFhYmIyLmh3XG4gICAgICAgICAgICA7XG5cbiAgICAgICAgLy8gZmlyc3QgY2hlY2sgeC1heGlzXG5cbiAgICAgICAgaWYgKCAobWluMiA8PSBtYXgxICYmIG1heDEgPD0gbWF4MikgfHwgKG1pbjEgPD0gbWF4MiAmJiBtYXgyIDw9IG1heDEpICl7XG4gICAgICAgICAgICAvLyBvdmVybGFwIGluIHgtYXhpc1xuICAgICAgICAgICAgLy8gY2hlY2sgeS4uLlxuICAgICAgICAgICAgbWluMSA9IGFhYmIxLnkgLSBhYWJiMS5oaDtcbiAgICAgICAgICAgIG1pbjIgPSBhYWJiMi55IC0gYWFiYjIuaGg7XG4gICAgICAgICAgICBtYXgxID0gYWFiYjEueSArIGFhYmIxLmhoO1xuICAgICAgICAgICAgbWF4MiA9IGFhYmIyLnkgKyBhYWJiMi5oaDtcblxuICAgICAgICAgICAgcmV0dXJuIChtaW4yIDw9IG1heDEgJiYgbWF4MSA8PSBtYXgyKSB8fCAobWluMSA8PSBtYXgyICYmIG1heDIgPD0gbWF4MSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGV5IGRvbid0IG92ZXJsYXBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbn0oKSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9tYXRoL2dqay5qc1xuXG4oZnVuY3Rpb24oKXtcblxuICAgIC8vIHRoZSBhbGdvcml0aG0gZG9lc24ndCBhbHdheXMgY29udmVyZ2UgZm9yIGN1cnZlZCBzaGFwZXMuXG4gICAgLy8gbmVlZCB0aGVzZSBjb25zdGFudHMgdG8gZGljdGF0ZSBob3cgYWNjdXJhdGUgd2Ugd2FudCB0byBiZS5cbiAgICB2YXIgZ2prQWNjdXJhY3kgPSAwLjAwMDE7XG4gICAgdmFyIGdqa01heEl0ZXJhdGlvbnMgPSAxMDA7XG5cbiAgICAvLyBnZXQgdGhlIG5leHQgc2VhcmNoIGRpcmVjdGlvbiBmcm9tIHR3byBzaW1wbGV4IHBvaW50c1xuICAgIHZhciBnZXROZXh0U2VhcmNoRGlyID0gZnVuY3Rpb24gZ2V0TmV4dFNlYXJjaERpciggcHRBLCBwdEIsIGRpciApe1xuXG4gICAgICAgIHZhciBBQmRvdEIgPSBwdEIubm9ybVNxKCkgLSBwdEIuZG90KCBwdEEgKVxuICAgICAgICAgICAgLEFCZG90QSA9IHB0Qi5kb3QoIHB0QSApIC0gcHRBLm5vcm1TcSgpXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgLy8gaWYgdGhlIG9yaWdpbiBpcyBmYXJ0aGVyIHRoYW4gZWl0aGVyIG9mIHRoZXNlIHBvaW50c1xuICAgICAgICAvLyBnZXQgdGhlIGRpcmVjdGlvbiBmcm9tIG9uZSBvZiB0aG9zZSBwb2ludHMgdG8gdGhlIG9yaWdpblxuICAgICAgICBpZiAoIEFCZG90QiA8IDAgKXtcblxuICAgICAgICAgICAgcmV0dXJuIGRpci5jbG9uZSggcHRCICkubmVnYXRlKCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggQUJkb3RBID4gMCApe1xuXG4gICAgICAgICAgICByZXR1cm4gZGlyLmNsb25lKCBwdEEgKS5uZWdhdGUoKTtcblxuICAgICAgICAvLyBvdGhlcndpc2UsIHVzZSB0aGUgcGVycGVuZGljdWxhciBkaXJlY3Rpb24gZnJvbSB0aGUgc2ltcGxleFxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBkaXIgPSBBQiA9IEIgLSBBXG4gICAgICAgICAgICBkaXIuY2xvbmUoIHB0QiApLnZzdWIoIHB0QSApO1xuICAgICAgICAgICAgLy8gaWYgKGxlZnQgaGFuZGVkIGNvb3JkaW5hdGUgc3lzdGVtKVxuICAgICAgICAgICAgLy8gQSBjcm9zcyBBQiA8IDAgdGhlbiBnZXQgcGVycGVuZGljdWxhciBjb3VudGVyY2xvY2t3aXNlXG4gICAgICAgICAgICByZXR1cm4gZGlyLnBlcnAoIChwdEEuY3Jvc3MoIGRpciApID4gMCkgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKiogaGlkZVxuICAgICAqIGdldENsb3Nlc3RQb2ludHMoIHNpbXBsZXggKSAtPiBPYmplY3RcbiAgICAgKiAtIHNpbXBsZXggKEFycmF5KTogVGhlIHNpbXBsZXhcbiAgICAgKlxuICAgICAqIEZpZ3VyZSBvdXQgdGhlIGNsb3Nlc3QgcG9pbnRzIG9uIHRoZSBvcmlnaW5hbCBvYmplY3RzXG4gICAgICogZnJvbSB0aGUgbGFzdCB0d28gZW50cmllcyBvZiB0aGUgc2ltcGxleFxuICAgICAqKi9cbiAgICB2YXIgZ2V0Q2xvc2VzdFBvaW50cyA9IGZ1bmN0aW9uIGdldENsb3Nlc3RQb2ludHMoIHNpbXBsZXggKXtcblxuICAgICAgICAvLyBzZWUgaHR0cDovL3d3dy5jb2RlemVhbG90Lm9yZy9hcmNoaXZlcy8xNTNcbiAgICAgICAgLy8gZm9yIGFsZ29yaXRobSBkZXRhaWxzXG5cbiAgICAgICAgLy8gd2Uga25vdyB0aGF0IHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBwb2ludFxuICAgICAgICAvLyBpcyB2ZXJ5IGNsb3NlIHRvIHRoZSBwcmV2aW91cy4gKGJ5IG5hdHVyZSBvZiB0aGUgZGlzdGFuY2UgdGVzdClcbiAgICAgICAgLy8gdGhpcyB3b24ndCBnaXZlIGdyZWF0IHJlc3VsdHMgZm9yIHRoZSBjbG9zZXN0XG4gICAgICAgIC8vIHBvaW50cyBhbGdvcml0aG0sIHNvIGxldCdzIHVzZSB0aGUgcHJldmlvdXMgdHdvXG4gICAgICAgIHZhciBsZW4gPSBzaW1wbGV4Lmxlbmd0aFxuICAgICAgICAgICAgLGxhc3QgPSBzaW1wbGV4WyBsZW4gLSAyIF1cbiAgICAgICAgICAgICxwcmV2ID0gc2ltcGxleFsgbGVuIC0gMyBdXG4gICAgICAgICAgICAsc2NyYXRjaCA9IFBoeXNpY3Muc2NyYXRjaHBhZCgpXG4gICAgICAgICAgICAsQSA9IHNjcmF0Y2gudmVjdG9yKCkuY2xvbmUoIGxhc3QucHQgKVxuICAgICAgICAgICAgLy8gTCA9IEIgLSBBXG4gICAgICAgICAgICAsTCA9IHNjcmF0Y2gudmVjdG9yKCkuY2xvbmUoIHByZXYucHQgKS52c3ViKCBBIClcbiAgICAgICAgICAgICxsYW1iZGFCXG4gICAgICAgICAgICAsbGFtYmRhQVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIGlmICggTC5lcXVhbHMoUGh5c2ljcy52ZWN0b3IuemVybykgKXtcblxuICAgICAgICAgICAgLy8gb2guLiBpdCdzIGEgemVybyB2ZWN0b3IuIFNvIEEgYW5kIEIgYXJlIGJvdGggdGhlIGNsb3Nlc3QuXG4gICAgICAgICAgICAvLyBqdXN0IHVzZSBvbmUgb2YgdGhlbVxuICAgICAgICAgICAgcmV0dXJuIHNjcmF0Y2guZG9uZSh7XG5cbiAgICAgICAgICAgICAgICBhOiBsYXN0LmEsXG4gICAgICAgICAgICAgICAgYjogbGFzdC5iXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxhbWJkYUIgPSAtIEwuZG90KCBBICkgLyBMLm5vcm1TcSgpO1xuICAgICAgICBsYW1iZGFBID0gMSAtIGxhbWJkYUI7XG5cbiAgICAgICAgaWYgKCBsYW1iZGFBIDw9IDAgKXtcbiAgICAgICAgICAgIC8vIHdvb3BzLi4gdGhhdCBtZWFucyB0aGUgY2xvc2VzdCBzaW1wbGV4IHBvaW50XG4gICAgICAgICAgICAvLyBpc24ndCBvbiB0aGUgbGluZSBpdCdzIHBvaW50IEIgaXRzZWxmXG4gICAgICAgICAgICByZXR1cm4gc2NyYXRjaC5kb25lKHtcbiAgICAgICAgICAgICAgICBhOiBwcmV2LmEsXG4gICAgICAgICAgICAgICAgYjogcHJldi5iXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICggbGFtYmRhQiA8PSAwICl7XG4gICAgICAgICAgICAvLyB2aWNlIHZlcnNhXG4gICAgICAgICAgICByZXR1cm4gc2NyYXRjaC5kb25lKHtcbiAgICAgICAgICAgICAgICBhOiBsYXN0LmEsXG4gICAgICAgICAgICAgICAgYjogbGFzdC5iXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGd1ZXNzIHdlJ2QgYmV0dGVyIGRvIHRoZSBtYXRoIG5vdy4uLlxuICAgICAgICByZXR1cm4gc2NyYXRjaC5kb25lKHtcbiAgICAgICAgICAgIC8vIGEgY2xvc2VzdCA9IGxhbWJkYUEgKiBBYSArIGxhbWJkYUIgKiBCYVxuICAgICAgICAgICAgYTogQS5jbG9uZSggbGFzdC5hICkubXVsdCggbGFtYmRhQSApLnZhZGQoIEwuY2xvbmUoIHByZXYuYSApLm11bHQoIGxhbWJkYUIgKSApLnZhbHVlcygpLFxuICAgICAgICAgICAgLy8gYiBjbG9zZXN0ID0gbGFtYmRhQSAqIEFiICsgbGFtYmRhQiAqIEJiXG4gICAgICAgICAgICBiOiBBLmNsb25lKCBsYXN0LmIgKS5tdWx0KCBsYW1iZGFBICkudmFkZCggTC5jbG9uZSggcHJldi5iICkubXVsdCggbGFtYmRhQiApICkudmFsdWVzKClcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MuZ2prKCBzdXBwb3J0KGF4aXMpWywgc2VlZCwgY2hlY2tPdmVybGFwT25seSwgZGVidWdGbl0gKSAtPiBPYmplY3RcbiAgICAgKiAtIHN1cHBvcnQgKEZ1bmN0aW9uKTogVGhlIHN1cHBvcnQgZnVuY3Rpb24uIE11c3QgcmV0dXJuIGFuIG9iamVjdCBjb250YWluaW5nXG4gICAgICAgdGhlIHdpdG5lc3MgcG9pbnRzIChgLmFgLCBgLmJgKSBhbmQgdGhlIHN1cHBvcnQgcG9pbnQgKGAucHRgKS5cbiAgICAgICBSZWNvbW1lbmRlZCB0byB1c2Ugc2ltcGxlIG9iamVjdHMuXG4gICAgICAgRWc6XG4gICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhOiB7IHg6IDEsIHk6MiB9LFxuICAgICAgICAgICAgYjogeyB4OiAzLCB5OiA0IH0sXG4gICAgICAgICAgICBwdDogeyB4OiAyLCB5OiAyIH1cbiAgICAgICB9O1xuICAgICAgIGBgYFxuICAgICAqIC0gYXhpcyAoUGh5c2ljcy52ZWN0b3IpOiBUaGUgYXhpcyB0byBzZWFyY2hcbiAgICAgKiAtIHNlZWQgKFBoeXNpY3MudmVjdG9yKTogVGhlIHN0YXJ0aW5nIGRpcmVjdGlvbiBmb3IgdGhlIHNpbXBsZXggKGRlZmF1bHRzIHRvIHgtYXhpcylcbiAgICAgKiAtIGNoZWNrT3ZlcmxhcE9ubHkgKEJvb2xlYW4pOiBvbmx5IGNoZWNrIHdoZXRoZXIgdGhlcmUgaXMgYW4gb3ZlcmxhcCwgZG9uJ3QgY2FsY3VsYXRlIHRoZSBkZXB0aFxuICAgICAqIC0gZGVidWdGbiAoRnVuY3Rpb24pOiBGb3IgZGVidWdnaW5nLiBDYWxsZWQgYXQgZXZlcnkgaXRlcmF0aW9uIHdpdGggdGhlIGN1cnJlbnQgc2ltcGxleC5cbiAgICAgKlxuICAgICAqIEltcGxlbWVudGF0aW9uIGFnbm9zdGljIEdKSyBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEdpbGJlcnTigJNKb2huc29u4oCTS2VlcnRoaSBvYmplY3QgY29sbGlzb24gYWxnb3JpdGhtXG4gICAgICogRm9yIGdlbmVyYWwgaW5mb3JtYXRpb24gYWJvdXQgR0pLIHNlZTpcbiAgICAgKiAtIFt3d3cuY29kZXplYWxvdC5vcmcvYXJjaGl2ZXMvODhdKGh0dHA6Ly93d3cuY29kZXplYWxvdC5vcmcvYXJjaGl2ZXMvODgpXG4gICAgICogLSBbbW9sbHlyb2NrZXQuY29tLzg0OV0oaHR0cDovL21vbGx5cm9ja2V0LmNvbS84NDkpXG4gICAgICpcbiAgICAgKiBUaGUgYWxnb3JpdGhtIGluZm9ybWF0aW9uIHJldHVybmVkOlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiB7XG4gICAgICogICAgIG92ZXJsYXA6IEJvb2xlYW4sXG4gICAgICogICAgIHNpbXBsZXg6IFtdIC8vIGFycmF5IGNvbnRhaW5pbmcgc2ltcGxleCBwb2ludHMgYXMgc2ltcGxlIHgveSBvYmplY3RzXG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqKi9cbiAgICB2YXIgZ2prID0gZnVuY3Rpb24gZ2prKCBzdXBwb3J0LCBzZWVkLCBjaGVja092ZXJsYXBPbmx5LCBkZWJ1Z0ZuICl7XG5cbiAgICAgICAgdmFyIG92ZXJsYXAgPSBmYWxzZVxuICAgICAgICAgICAgLG5vT3ZlcmxhcCA9IGZhbHNlIC8vIGlmIHdlJ3JlIHN1cmUgd2UncmUgbm90IG92ZXJsYXBwaW5nXG4gICAgICAgICAgICAsZGlzdGFuY2UgPSBmYWxzZVxuICAgICAgICAgICAgLHNpbXBsZXggPSBbXVxuICAgICAgICAgICAgLHNpbXBsZXhMZW4gPSAxXG4gICAgICAgICAgICAvLyBzZXR1cCBhIHNjcmF0Y2hwYWQgb2YgdGVtcG9yYXJ5IGNoZWFwIG9iamVjdHNcbiAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgIC8vIHVzZSBzZWVkIGFzIHN0YXJ0aW5nIGRpcmVjdGlvbiBvciB1c2UgeCBheGlzXG4gICAgICAgICAgICAsZGlyID0gc2NyYXRjaC52ZWN0b3IoKS5jbG9uZShzZWVkIHx8IFBoeXNpY3MudmVjdG9yLmF4aXNbIDAgXSlcbiAgICAgICAgICAgICxsYXN0ID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgLGxhc3RsYXN0ID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgLy8gc29tZSB0ZW1wIHZlY3RvcnNcbiAgICAgICAgICAgICx2MSA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICx2MiA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICxhYlxuICAgICAgICAgICAgLGFjXG4gICAgICAgICAgICAsc2lnblxuICAgICAgICAgICAgLHRtcFxuICAgICAgICAgICAgLGl0ZXJhdGlvbnMgPSAwXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBmaXJzdCBNaW5rb3dza2kgRGlmZmVyZW5jZSBwb2ludFxuICAgICAgICB0bXAgPSBzdXBwb3J0KCBkaXIgKTtcbiAgICAgICAgc2ltcGxleExlbiA9IHNpbXBsZXgucHVzaCggdG1wICk7XG4gICAgICAgIGxhc3QuY2xvbmUoIHRtcC5wdCApO1xuICAgICAgICAvLyBuZWdhdGUgZCBmb3IgdGhlIG5leHQgcG9pbnRcbiAgICAgICAgZGlyLm5lZ2F0ZSgpO1xuXG4gICAgICAgIC8vIHN0YXJ0IGxvb3BpbmdcbiAgICAgICAgd2hpbGUgKCArK2l0ZXJhdGlvbnMgKSB7XG5cbiAgICAgICAgICAgIC8vIHN3YXAgbGFzdCBhbmQgbGFzdGxhc3QsIHRvIHNhdmUgb24gbWVtb3J5L3NwZWVkXG4gICAgICAgICAgICBsYXN0LnN3YXAobGFzdGxhc3QpO1xuICAgICAgICAgICAgLy8gcHVzaCBhIG5ldyBwb2ludCB0byB0aGUgc2ltcGxleCBiZWNhdXNlIHdlIGhhdmVuJ3QgdGVybWluYXRlZCB5ZXRcbiAgICAgICAgICAgIHRtcCA9IHN1cHBvcnQoIGRpciApO1xuICAgICAgICAgICAgc2ltcGxleExlbiA9IHNpbXBsZXgucHVzaCggdG1wICk7XG4gICAgICAgICAgICBsYXN0LmNsb25lKCB0bXAucHQgKTtcblxuICAgICAgICAgICAgaWYgKCBkZWJ1Z0ZuICl7XG4gICAgICAgICAgICAgICAgZGVidWdGbiggc2ltcGxleCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGxhc3QuZXF1YWxzKFBoeXNpY3MudmVjdG9yLnplcm8pICl7XG4gICAgICAgICAgICAgICAgLy8gd2UgaGFwcGVuZWQgdG8gcGljayB0aGUgb3JpZ2luIGFzIGEgc3VwcG9ydCBwb2ludC4uLiBsdWNreS5cbiAgICAgICAgICAgICAgICBvdmVybGFwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGxhc3QgcG9pbnQgd2UgYWRkZWQgYWN0dWFsbHkgcGFzc2VkIHRoZSBvcmlnaW5cbiAgICAgICAgICAgIGlmICggIW5vT3ZlcmxhcCAmJiBsYXN0LmRvdCggZGlyICkgPD0gMC4wICkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwb2ludCBhZGRlZCBsYXN0IHdhcyBub3QgcGFzdCB0aGUgb3JpZ2luIGluIHRoZSBkaXJlY3Rpb24gb2YgZFxuICAgICAgICAgICAgICAgIC8vIHRoZW4gdGhlIE1pbmtvd3NraSBkaWZmZXJlbmNlIGNhbm5vdCBwb3NzaWJseSBjb250YWluIHRoZSBvcmlnaW4gc2luY2VcbiAgICAgICAgICAgICAgICAvLyB0aGUgbGFzdCBwb2ludCBhZGRlZCBpcyBvbiB0aGUgZWRnZSBvZiB0aGUgTWlua293c2tpIERpZmZlcmVuY2VcblxuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGp1c3QgbmVlZCB0aGUgb3ZlcmxhcC4uLlxuICAgICAgICAgICAgICAgIGlmICggY2hlY2tPdmVybGFwT25seSApe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBub092ZXJsYXAgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBpdCdzIGEgbGluZS4uLlxuICAgICAgICAgICAgaWYgKCBzaW1wbGV4TGVuID09PSAyICl7XG5cbiAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2Ugd2UgbmVlZCB0byBkZXRlcm1pbmUgaWYgdGhlIG9yaWdpbiBpcyBpblxuICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHNpbXBsZXggYW5kIGFjdCBhY2NvcmRpbmdseVxuXG4gICAgICAgICAgICAgICAgZGlyID0gZ2V0TmV4dFNlYXJjaERpciggbGFzdCwgbGFzdGxhc3QsIGRpciApO1xuICAgICAgICAgICAgICAgIC8vIGNvbnRpbnVlLi4uXG5cbiAgICAgICAgICAgIC8vIGlmIGl0J3MgYSB0cmlhbmdsZS4uLiBhbmQgd2UncmUgbG9va2luZyBmb3IgdGhlIGRpc3RhbmNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBub092ZXJsYXAgKXtcblxuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGtub3cgdGhlcmUgaXNuJ3QgYW55IG92ZXJsYXAgYW5kXG4gICAgICAgICAgICAgICAgLy8gd2UncmUganVzdCB0cnlpbmcgdG8gZmluZCB0aGUgZGlzdGFuY2UuLi5cbiAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgd2UncmUgZ2V0dGluZyBjbG9zZXIgdG8gdGhlIG9yaWdpblxuICAgICAgICAgICAgICAgIGRpci5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICB0bXAgPSBsYXN0bGFzdC5kb3QoIGRpciApO1xuICAgICAgICAgICAgICAgIGlmICggTWF0aC5hYnModG1wIC0gbGFzdC5kb3QoIGRpciApKSA8IGdqa0FjY3VyYWN5ICl7XG5cbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSAtdG1wO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBhcmUgc3RpbGwgZ2V0dGluZyBjbG9zZXIgdGhlbiBvbmx5IGtlZXBcbiAgICAgICAgICAgICAgICAvLyB0aGUgcG9pbnRzIGluIHRoZSBzaW1wbGV4IHRoYXQgYXJlIGNsb3Nlc3QgdG9cbiAgICAgICAgICAgICAgICAvLyB0aGUgb3JpZ2luICh3ZSBhbHJlYWR5IGtub3cgdGhhdCBsYXN0IGlzIGNsb3NlclxuICAgICAgICAgICAgICAgIC8vIHRoYW4gdGhlIHByZXZpb3VzIHR3bylcbiAgICAgICAgICAgICAgICAvLyB0aGUgbm9ybSBpcyB0aGUgc2FtZSBhcyBkaXN0YW5jZShvcmlnaW4sIGEpXG4gICAgICAgICAgICAgICAgLy8gdXNlIG5vcm0gc3F1YXJlZCB0byBhdm9pZCB0aGUgc3FydCBvcGVyYXRpb25zXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RsYXN0Lm5vcm1TcSgpIDwgdjEuY2xvbmUoc2ltcGxleFsgMCBdLnB0KS5ub3JtU3EoKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZXguc2hpZnQoKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2ltcGxleC5zcGxpY2UoMSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGlyID0gZ2V0TmV4dFNlYXJjaERpciggdjEuY2xvbmUoc2ltcGxleFsgMSBdLnB0KSwgdjIuY2xvbmUoc2ltcGxleFsgMCBdLnB0KSwgZGlyICk7XG4gICAgICAgICAgICAgICAgLy8gY29udGludWUuLi5cblxuICAgICAgICAgICAgLy8gaWYgaXQncyBhIHRyaWFuZ2xlXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB0cmltIHRoZSB1c2VsZXNzIHBvaW50Li4uXG5cbiAgICAgICAgICAgICAgICBhYiA9IGFiIHx8IHNjcmF0Y2gudmVjdG9yKCk7XG4gICAgICAgICAgICAgICAgYWMgPSBhYyB8fCBzY3JhdGNoLnZlY3RvcigpO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBlZGdlcyBBQiBhbmQgQUNcbiAgICAgICAgICAgICAgICBhYi5jbG9uZSggbGFzdGxhc3QgKS52c3ViKCBsYXN0ICk7XG4gICAgICAgICAgICAgICAgYWMuY2xvbmUoIHNpbXBsZXhbIDAgXS5wdCApLnZzdWIoIGxhc3QgKTtcblxuICAgICAgICAgICAgICAgIC8vIGhlcmUgbm9ybWFsbHkgcGVvcGxlIHRoaW5rIGFib3V0IHRoaXMgYXMgZ2V0dGluZyBvdXR3YXJkIGZhY2luZ1xuICAgICAgICAgICAgICAgIC8vIG5vcm1hbHMgYW5kIGNoZWNraW5nIGRvdCBwcm9kdWN0cy4gU2luY2Ugd2UncmUgaW4gMkRcbiAgICAgICAgICAgICAgICAvLyB3ZSBjYW4gYmUgY2xldmVyLi4uXG4gICAgICAgICAgICAgICAgc2lnbiA9IGFiLmNyb3NzKCBhYyApID4gMDtcblxuICAgICAgICAgICAgICAgIGlmICggc2lnbiBeIChsYXN0LmNyb3NzKCBhYiApID4gMCkgKXtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvay4uLiBzbyB0aGVyZSdzIGFuIFhPUiBoZXJlLi4uIGRvbid0IGZyZWFrIG91dFxuICAgICAgICAgICAgICAgICAgICAvLyByZW1lbWJlciBsYXN0ID0gQSA9IC1BT1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBBQiBjcm9zcyBBQyBhbmQgQU8gY3Jvc3MgQUIgaGF2ZSB0aGUgc2FtZSBzaWduXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZW4gdGhlIG9yaWdpbiBpcyBhbG9uZyB0aGUgb3V0d2FyZCBmYWNpbmcgbm9ybWFsIG9mIEFCXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIGlmIEFCIGNyb3NzIEFDIGFuZCBBIGNyb3NzIEFCIGhhdmUgX2RpZmZlcmVudF8gKFhPUikgc2lnbnNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGlzIGFsc28gdGhlIGNhc2UuLi4gc28gd2UgcHJvY2VlZC4uLlxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvaW50IEMgaXMgZGVhZCB0byB1cyBub3cuLi5cbiAgICAgICAgICAgICAgICAgICAgc2ltcGxleC5zaGlmdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIGhhdmVuJ3QgZGVkdWNlZCB0aGF0IHdlJ3ZlIGVuY2xvc2VkIHRoZSBvcmlnaW5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiB3ZSBrbm93IHdoaWNoIHdheSB0byBsb29rLi4uXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vcnBoIHRoZSBhYiB2ZWN0b3IgaW50byBpdHMgb3V0d2FyZCBmYWNpbmcgbm9ybWFsXG4gICAgICAgICAgICAgICAgICAgIGFiLnBlcnAoICFzaWduICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc3dhcFxuICAgICAgICAgICAgICAgICAgICBkaXIuc3dhcCggYWIgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb250aW51ZS4uLlxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIGdldCB0byB0aGlzIGlmLCB0aGVuIGl0IG1lYW5zIHdlIGNhbiBjb250aW51ZSB0byBsb29rIGFsb25nXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBvdGhlciBvdXR3YXJkIG5vcm1hbCBkaXJlY3Rpb24gKEFDcGVycClcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UgZG9uJ3Qgc2VlIHRoZSBvcmlnaW4uLi4gdGhlbiB3ZSBtdXN0IGhhdmUgaXQgZW5jbG9zZWRcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBzaWduIF4gKGFjLmNyb3NzKCBsYXN0ICkgPiAwKSApe1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIHRoZSBvcmlnaW4gaXMgYWxvbmcgdGhlIG91dHdhcmQgZmFjaW5nIG5vcm1hbFxuICAgICAgICAgICAgICAgICAgICAvLyBvZiBBQzsgKEFDcGVycClcblxuICAgICAgICAgICAgICAgICAgICAvLyBwb2ludCBCIGlzIGRlYWQgdG8gdXMgbm93Li4uXG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZXguc3BsaWNlKDEsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFjLnBlcnAoIHNpZ24gKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzd2FwXG4gICAgICAgICAgICAgICAgICAgIGRpci5zd2FwKCBhYiApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnRpbnVlLi4uXG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgZW5jbG9zZWQgdGhlIG9yaWdpbiFcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxhcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZld2YuLi4gdGFrZSBhIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gd29haCBuZWxseS4uLiB0aGF0J3MgYSBsb3Qgb2YgaXRlcmF0aW9ucy5cbiAgICAgICAgICAgIC8vIFN0b3AgaXQhXG4gICAgICAgICAgICBpZiAoaXRlcmF0aW9ucyA+IGdqa01heEl0ZXJhdGlvbnMpe1xuICAgICAgICAgICAgICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZXg6IHNpbXBsZXgsXG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdGlvbnM6IGl0ZXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlOiAwLFxuICAgICAgICAgICAgICAgICAgICBtYXhJdGVyYXRpb25zUmVhY2hlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmcmVlIHdvcmtzcGFjZVxuICAgICAgICBzY3JhdGNoLmRvbmUoKTtcblxuICAgICAgICB0bXAgPSB7XG4gICAgICAgICAgICBvdmVybGFwOiBvdmVybGFwLFxuICAgICAgICAgICAgc2ltcGxleDogc2ltcGxleCxcbiAgICAgICAgICAgIGl0ZXJhdGlvbnM6IGl0ZXJhdGlvbnNcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIGRpc3RhbmNlICE9PSBmYWxzZSApe1xuXG4gICAgICAgICAgICB0bXAuZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIHRtcC5jbG9zZXN0ID0gZ2V0Q2xvc2VzdFBvaW50cyggc2ltcGxleCApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRtcDtcbiAgICB9O1xuXG4gICAgUGh5c2ljcy5namsgPSBnams7XG5cbn0pKCk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9tYXRoL3N0YXRpc3RpY3MuanNcblxuKGZ1bmN0aW9uKCl7XG5cbiAgICBQaHlzaWNzLnN0YXRpc3RpY3MgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaHlzaWNzLnN0YXRpc3RpY3MucHVzaFJ1bm5pbmdBdmcoIHYsIGssIG0sIHMgKSAtPiBBcnJheVxuICAgICAgICAgKiAtIHYgKE51bWJlcik6IGlzIHZhbHVlIHRvIHB1c2hcbiAgICAgICAgICogLSBrIChOdW1iZXIpOiBpcyBudW0gZWxlbWVudHNcbiAgICAgICAgICogLSBtIChOdW1iZXIpOiBpcyBjdXJyZW50IG1lYW5cbiAgICAgICAgICogLSBzIChOdW1iZXIpOiBpcyBjdXJyZW50IHMgdmFsdWVcbiAgICAgICAgICogKyAoQXJyYXkpOiBSZXR1cm5zIGEgMiBlbGVtZW50IGFycmF5IGNvbnRhaW5pbmcgdGhlIG5leHQgbWVhbiwgYW5kIHMgdmFsdWVcbiAgICAgICAgICpcbiAgICAgICAgICogUHVzaCBhIHZhbHVlIHRvIGEgcnVubmluZyBhdmVyYWdlIGNhbGN1bGF0aW9uLlxuICAgICAgICAgKiBzZWUgW2h0dHA6Ly93d3cuam9obmRjb29rLmNvbS9ibG9nL3N0YW5kYXJkX2RldmlhdGlvbl1cbiAgICAgICAgICpcbiAgICAgICAgICogTm90ZTogdmFyaWFuY2UgY2FuIGJlIGNhbGN1bGF0ZWQgZnJvbSB0aGUgXCJzXCIgdmFsdWUgYnkgbXVsdGlwbHlpbmcgaXQgYnkgYDEvKGstMSlgXG4gICAgICAgICAqKi9cbiAgICAgICAgcHVzaFJ1bm5pbmdBdmc6IGZ1bmN0aW9uKCB2LCBrLCBtLCBzICl7XG5cbiAgICAgICAgICAgIHZhciB4ID0gdiAtIG07XG5cbiAgICAgICAgICAgIC8vIE1rID0gTWstMSsgKHhrIOKAkyBNay0xKS9rXG4gICAgICAgICAgICAvLyBTayA9IFNrLTEgKyAoeGsg4oCTIE1rLTEpKih4ayDigJMgTWspLlxuICAgICAgICAgICAgbSArPSB4IC8gaztcbiAgICAgICAgICAgIHMgKz0geCAqICh2IC0gbSk7XG4gICAgICAgICAgICByZXR1cm4gW20sIHNdO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIFBoeXNpY3Muc3RhdGlzdGljcy5wdXNoUnVubmluZ1ZlY3RvckF2ZyggdiwgaywgbVssIHNdIClcbiAgICAgICAgKiAtIHYgKFBoeXNpY3MudmVjdG9yKTogaXMgdmVjdG9yIHRvIHB1c2hcbiAgICAgICAgKiAtIGsgKE51bWJlcik6IGlzIG51bSBlbGVtZW50c1xuICAgICAgICAqIC0gbSAoUGh5c2ljcy52ZWN0b3IpOiBpcyBjdXJyZW50IG1lYW5cbiAgICAgICAgKiAtIHMgKFBoeXNpY3MudmVjdG9yKTogaXMgY3VycmVudCBzIHZhbHVlXG4gICAgICAgICpcbiAgICAgICAgKiBQdXNoIGEgdmVjdG9yIHRvIGEgcnVubmluZyB2ZWN0b3IgYXZlcmFnZSBjYWxjdWxhdGlvbi5cbiAgICAgICAgKiBzZWUgW2h0dHA6Ly93d3cuam9obmRjb29rLmNvbS9ibG9nL3N0YW5kYXJkX2RldmlhdGlvbl1cbiAgICAgICAgKlxuICAgICAgICAqIENhbGN1bGF0aW9ucyBhcmUgZG9uZSBpbiBwbGFjZS4gVGhlIGBtYCBhbmQgYHNgIHBhcmFtZXRlcnMgYXJlIGFsdGVyZWQuXG4gICAgICAgICpcbiAgICAgICAgKiBOb3RlOiB2YXJpYW5jZSBjYW4gYmUgY2FsY3VsYXRlZCBmcm9tIHRoZSBcInNcIiB2ZWN0b3IgYnkgbXVsdGlwbHlpbmcgaXQgYnkgYDEvKGstMSlgXG4gICAgICAgICpcbiAgICAgICAgKiBJZiBzIHZhbHVlIGlzIG9tbWl0dGVkIGl0IHdvbid0IGJlIHVzZWQuXG4gICAgICAgICoqL1xuICAgICAgICBwdXNoUnVubmluZ1ZlY3RvckF2ZzogZnVuY3Rpb24oIHYsIGssIG0sIHMgKXtcbiAgICAgICAgICAgIHZhciBpbnZLID0gMS9rXG4gICAgICAgICAgICAgICAgLHggPSB2LmdldCgwKSAtIG0uZ2V0KDApXG4gICAgICAgICAgICAgICAgLHkgPSB2LmdldCgxKSAtIG0uZ2V0KDEpXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAvLyBNayA9IE1rLTErICh4ayDigJMgTWstMSkva1xuICAgICAgICAgICAgLy8gU2sgPSBTay0xICsgKHhrIOKAkyBNay0xKSooeGsg4oCTIE1rKS5cbiAgICAgICAgICAgIG0uYWRkKCB4ICogaW52SywgeSAqIGludksgKTtcblxuICAgICAgICAgICAgaWYgKCBzICl7XG4gICAgICAgICAgICAgICAgeCAqPSB2LmdldCgwKSAtIG0uZ2V0KDApO1xuICAgICAgICAgICAgICAgIHkgKj0gdi5nZXQoMSkgLSBtLmdldCgxKTtcblxuICAgICAgICAgICAgICAgIHMuYWRkKCB4LCB5ICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL21hdGgvdHJhbnNmb3JtLmpzXG5cbihmdW5jdGlvbigpe1xuICAgIFxuICAgIC8qKlxuICAgICAqIGNsYXNzIFBoeXNpY3MudHJhbnNmb3JtXG4gICAgICogXG4gICAgICogVmVjdG9yIFRyYW5zZm9ybWF0aW9ucyBjbGFzcyBmb3Igcm90YXRpbmcgYW5kIHRyYW5zbGF0aW5nIHZlY3RvcnNcbiAgICAgKiovXG5cbiAgICAvKipcbiAgICAgKiBuZXcgUGh5c2ljcy50cmFuc2Zvcm0oIFt2ZWN0LCBhbmdsZSwgb3JpZ2luXSApXG4gICAgICogbmV3IFBoeXNpY3MudHJhbnNmb3JtKCB0cmFuc2Zvcm0gKVxuICAgICAqIC0gdmVjdCAoVmVjdG9yaXNoKTogVHJhbnNsYXRpb24gdmVjdG9yXG4gICAgICogLSB0cmFuc2Zvcm0gKFBoeXNpY3MudHJhbnNmb3JtKTogVHJhbnNmb3JtIHRvIGNvcHlcbiAgICAgKiAtIGFuZ2xlIChOdW1iZXIpOiBBbmdsZSAocmFkaWFucykgdG8gdXNlIGZvciByb3RhdGlvblxuICAgICAqIC0gb3JpZ2luIChWZWN0b3Jpc2gpOiBPcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gICAgICogXG4gICAgICogVHJhbnNmb3JtIENvbnN0cnVjdG9yIC8gRmFjdG9yeVxuICAgICAqKi9cbiAgICB2YXIgVHJhbnNmb3JtID0gZnVuY3Rpb24gVHJhbnNmb3JtKCB2ZWN0LCBhbmdsZSwgb3JpZ2luICkge1xuXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBUcmFuc2Zvcm0pKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVHJhbnNmb3JtKCB2ZWN0LCBhbmdsZSApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52ID0gbmV3IFBoeXNpY3MudmVjdG9yKCk7XG4gICAgICAgIHRoaXMubyA9IG5ldyBQaHlzaWNzLnZlY3RvcigpOyAvLyBvcmlnaW4gb2Ygcm90YXRpb25cbiAgICAgICAgXG4gICAgICAgIGlmICggdmVjdCBpbnN0YW5jZW9mIFRyYW5zZm9ybSApe1xuXG4gICAgICAgICAgICB0aGlzLmNsb25lKCB2ZWN0ICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmVjdCl7XG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0aW9uKCB2ZWN0ICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFJvdGF0aW9uKCBhbmdsZSB8fCAwLCBvcmlnaW4gKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy50cmFuc2Zvcm0jc2V0VHJhbnNsYXRpb24oIHZlY3QgKSAtPiB0aGlzXG4gICAgICogLSB2ZWN0IChWZWN0b3Jpc2gpOiBUaGUgdHJhbnNsYXRpb24gdmVjdG9yXG4gICAgICogXG4gICAgICogU2V0IHRoZSB0cmFuc2xhdGlvbiBwb3J0aW9uIG9mIHRoZSB0cmFuc2Zvcm0uXG4gICAgICoqL1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUuc2V0VHJhbnNsYXRpb24gPSBmdW5jdGlvbiggdmVjdCApe1xuXG4gICAgICAgIHRoaXMudi5jbG9uZSggdmVjdCApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy50cmFuc2Zvcm0jc2V0Um90YXRpb24oIGFuZ2xlWywgb3JpZ2luIF0gKSAtPiB0aGlzXG4gICAgICogLSBhbmdsZSAoTnVtYmVyKTogQW5nbGUgKHJhZGlhbnMpIHRvIHVzZSBmb3Igcm90YXRpb25cbiAgICAgKiAtIG9yaWdpbiAoVmVjdG9yaXNoKTogT3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICAgICAqXG4gICAgICogU2V0IHRoZSByb3RhdGlvbiBwb3J0aW9uIG9mIHRoZSB0cmFuc2Zvcm1cbiAgICAgKiovXG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRSb3RhdGlvbiA9IGZ1bmN0aW9uKCBhbmdsZSwgb3JpZ2luICl7XG5cbiAgICAgICAgdGhpcy5jb3NBID0gTWF0aC5jb3MoIGFuZ2xlICk7XG4gICAgICAgIHRoaXMuc2luQSA9IE1hdGguc2luKCBhbmdsZSApO1xuXG4gICAgICAgIGlmICggb3JpZ2luICl7XG4gICAgICAgICAgICB0aGlzLm8uY2xvbmUoIG9yaWdpbiApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vLnplcm8oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnRyYW5zZm9ybSNjbG9uZSggW3RyYW5zZm9ybV0gKSAtPiB0aGlzfFBoeXNpY3MudHJhbnNmb3JtXG4gICAgICogLSB0cmFuc2Zvcm0gKFBoeXNpY3MudHJhbnNmb3JtKTogVHJhbnNmb3JtIHRvIGNvcHlcbiAgICAgKiArICh0aGlzKTogRm9yIGNoYWluaW5nXG4gICAgICogKyAoUGh5c2ljcy50cmFuc2Zvcm0pOiBOZXcgY29weSBvZiBgdGhpc2AgaWYgbm9uZSBpcyBzcGVjaWZpZWQgYXMgYW4gYXJndW1lbnRcbiAgICAgKiBcbiAgICAgKiBDbG9uZSBhbm90aGVyIHRyYW5zZm9ybS4gT3IgY2xvbmUgc2VsZiBpbnRvIG5ldyB0cmFuc2Zvcm0uXG4gICAgICoqL1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiggdCApe1xuXG4gICAgICAgIGlmICggdCApe1xuXG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0aW9uKCB0LnYgKTtcbiAgICAgICAgICAgIHRoaXMuY29zQSA9IHQuY29zQTtcbiAgICAgICAgICAgIHRoaXMuc2luQSA9IHQuc2luQTtcbiAgICAgICAgICAgIHRoaXMuby5jbG9uZSggdC5vICk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBUcmFuc2Zvcm0oIHRoaXMgKTtcbiAgICB9O1xuXG4gICAgUGh5c2ljcy50cmFuc2Zvcm0gPSBUcmFuc2Zvcm07XG5cbn0pKCk7XG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvbWF0aC92ZWN0b3IuanNcblxuKGZ1bmN0aW9uKHdpbmRvdyl7XG5cbiAgICAvLyBodHRwOi8vanNwZXJmLmNvbS92ZWN0b3Itc3RvcmFnZS10ZXN0LzJcblxuICAgIC8vIGNhY2hlZCBtYXRoIGZ1bmN0aW9uc1xuICAgIC8vIFRPRE86IG1pZ2h0IGJlIGZhc3RlciBub3QgdG8gZG8gdGhpcz8/P1xuICAgIHZhciBzcXJ0ID0gTWF0aC5zcXJ0XG4gICAgICAgICxtaW4gPSBNYXRoLm1pblxuICAgICAgICAsbWF4ID0gTWF0aC5tYXhcbiAgICAgICAgLGFjb3MgPSBNYXRoLmFjb3NcbiAgICAgICAgLGF0YW4yID0gTWF0aC5hdGFuMlxuICAgICAgICAsVFdPUEkgPSBNYXRoLlBJICogMlxuICAgICAgICAsdHlwZWRBcnJheXMgPSAhIXdpbmRvdy5GbG9hdDY0QXJyYXlcbiAgICAgICAgO1xuXG4gICAgLyoqXG4gICAgICogY2xhc3MgUGh5c2ljcy52ZWN0b3JcbiAgICAgKlxuICAgICAqIFRoZSB2ZWN0b3IgY2xhc3MgYW5kIGZhY3RvcnkgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBDYWxsIGBQaHlzaWNzLnZlY3RvcmAgd2l0aCB0aGUgc2FtZSBhcmd1bWVudHMgYXNcbiAgICAgKiBbW25ldyBQaHlzaWNzLnZlY3Rvcl1dIHRvIGNyZWF0ZSBhbiBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIFRoZSB2ZWN0b3IgbWV0aG9kcyBtb3N0bHkgbW9kaWZ5IHRoZSB2ZWN0b3IgaW5zdGFuY2UuXG4gICAgICogVGhpcyBtYWtlcyBjb21wdXRhdGlvbnMgZmFzdGVyIGJlY2F1c2UgY3JlYXRpbmcgdmVjdG9yc1xuICAgICAqIGlzIGF2b2lkZWQuXG4gICAgICpcbiAgICAgKiBDcmVhdGluZyB2ZWN0b3JzIGlzIGdlbmVyYWxseSBhbiBleHBlbnNpdmUgb3BlcmF0aW9uXG4gICAgICogc28gdHJ5IHRvIGF2b2lkIGRvaW5nIHRoaXMgaW4gdGhlIHNpbXVsYXRpb24gbG9vcC5cbiAgICAgKiBJbnN0ZWFkIHlvdSBjYW4gdXNlIFtbUGh5c2ljcy5zY3JhdGNocGFkXV0gdG8gZ2V0XG4gICAgICogdGVtcG9yYXJ5IHZlY3RvcnMgZm9yIHVzZSBpbiBwZXJmb3JtYW5jZSBjcml0aWNhbFxuICAgICAqIGNvZGUuXG4gICAgICpcbiAgICAgKiBfTm90ZV86IFRoZSBjb29yZGluYXRlIHN5c3RlbSBpcyBsZWZ0LWhhbmRlZCwgbWVhbmluZyB0aGF0XG4gICAgICogdGhlIGNsb2Nrd2lzZSBhbmd1bGFyIGRpcmVjdGlvbiBpcyBwb3NpdGl2ZS4gVGhpcyBoYXMgaW1wbGljYXRpb25zXG4gICAgICogZm9yIHRoZSBjcm9zcy1wcm9kdWN0IHJ1bGUuXG4gICAgICoqL1xuXG4gICAgLyoqIHNlY3Rpb246IFNwZWNpYWxcbiAgICAgKiBjbGFzcyBWZWN0b3Jpc2hcbiAgICAgKlxuICAgICAqIEFueSBvYmplY3Qgd2l0aCBgLnhgIGFuZCBgLnlgIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBBIGBWZWN0b3Jpc2hgIGlzbid0IHJlYWxseSBhIGNsYXNzLiBJbiB0aGlzIGRvY3VtZW50YXRpb24sIHdoZW5cbiAgICAgKiBhbiBhcmd1bWVudCBpcyBzcGVjaWZpZWQgYXMgYSBgVmVjdG9yaXNoYCBpdCBtZWFucyBlaXRoZXIgYSB0cnVlXG4gICAgICogW1tQaHlzaWNzLnZlY3Rvcl1dIGluc3RhbmNlLCBvciBhbiBvYmplY3QgbGl0ZXJhbCB3aXRoIGAueGAgYW5kIGAueWBcbiAgICAgKiBwcm9wZXJ0aWVzLlxuICAgICAqKi9cblxuICAgIC8qKlxuICAgICAqIG5ldyBQaHlzaWNzLnZlY3RvciggeCwgeSApXG4gICAgICogbmV3IFBoeXNpY3MudmVjdG9yKCB2ZWN0IClcbiAgICAgKiAtIHggKE51bWJlcik6IFRoZSB4IGNvb3JkaW5hdGVcbiAgICAgKiAtIHkgKE51bWJlcik6IFRoZSB5IGNvb3JkaW5hdGVcbiAgICAgKiAtIHZlY3QgKFZlY3RvcmlzaCk6IEEgdmVjdG9yLWxpa2Ugb2JqZWN0IHRvIGNsb25lXG4gICAgICpcbiAgICAgKiBWZWN0b3IgQ29uc3RydWN0b3IuXG4gICAgICoqL1xuICAgIHZhciBWZWN0b3IgPSBmdW5jdGlvbiBWZWN0b3IoIHgsIHkgKSB7XG5cbiAgICAgICAgLy8gZW5mb3JjZSBpbnN0YW50aWF0aW9uXG4gICAgICAgIGlmICggISh0aGlzIGluc3RhbmNlb2YgVmVjdG9yKSApe1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvciggeCwgeSApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXJyYXlzIHRvIHN0b3JlIHZhbHVlc1xuICAgICAgICAvLyB4ID0gX1swXVxuICAgICAgICAvLyB5ID0gX1sxXVxuICAgICAgICAvLyBub3JtID0gX1szXVxuICAgICAgICAvLyBub3Jtc3EgPSBfWzRdXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIFBoeXNpY3MudmVjdG9yI19cbiAgICAgICAgICpcbiAgICAgICAgICogUHJpdmF0ZSBzdG9yYWdlIGFycmF5IGZvciBkYXRhLlxuICAgICAgICAgKlxuICAgICAgICAgKiBEbyBub3QgYWNjZXNzIHRoaXMgZGlyZWN0bHkuIFByaXZhdGUuIEtlZXAgb3V0LlxuICAgICAgICAgKiovXG4gICAgICAgIGlmICh0eXBlZEFycmF5cyl7XG4gICAgICAgICAgICB0aGlzLl8gPSBuZXcgRmxvYXQ2NEFycmF5KDUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeCAmJiAoeC54ICE9PSB1bmRlZmluZWQgfHwgeC5fICYmIHguXy5sZW5ndGgpKXtcblxuICAgICAgICAgICAgdGhpcy5jbG9uZSggeCApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVjYWxjID0gdHJ1ZTsgLy93aGV0aGVyIG9yIG5vdCByZWNhbGN1bGF0ZSBub3Jtc1xuICAgICAgICAgICAgdGhpcy5zZXQoIHgsIHkgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyggVmVjdG9yLnByb3RvdHlwZSwge1xuICAgICAgICAvKipcbiAgICAgICAgICogUGh5c2ljcy52ZWN0b3IjeFxuICAgICAgICAgKlxuICAgICAgICAgKiBHZXR0ZXIvc2V0dGVyIHByb3BlcnR5IGZvciB0aGUgeCBjb29yZGluYXRlLlxuICAgICAgICAgKiovXG4gICAgICAgIHg6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gK3RoaXMuX1swXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKCB4ICl7XG4gICAgICAgICAgICAgICAgeCA9ICt4IHx8IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGMgPSAoIHggPT09IHRoaXMuX1swXSApO1xuICAgICAgICAgICAgICAgIHRoaXMuX1swXSA9IHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaHlzaWNzLnZlY3RvciN5XG4gICAgICAgICAqXG4gICAgICAgICAqIEdldHRlci9zZXR0ZXIgcHJvcGVydHkgZm9yIHRoZSB5IGNvb3JkaW5hdGUuXG4gICAgICAgICAqKi9cbiAgICAgICAgeToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJldHVybiArdGhpcy5fWzFdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIHkgKXtcbiAgICAgICAgICAgICAgICB5ID0gK3kgfHwgMDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsYyA9ICggeSA9PT0gdGhpcy5fWzFdICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fWzFdID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9cbiAgICAvLyBNZXRob2RzXG4gICAgLy9cblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI3NldCggeCwgeSApIC0+IHRoaXNcbiAgICAgKiAtIHggKE51bWJlcik6IHggY29vcmRpbmF0ZVxuICAgICAqIC0geSAoTnVtYmVyKTogeSBjb29yZGluYXRlXG4gICAgICpcbiAgICAgKiBTZXRzIHRoZSB4IGFuZCB5IGNvbXBvbmVudHMgb2YgdGhpcyB2ZWN0b3IuXG4gICAgICoqL1xuICAgIFZlY3Rvci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oIHgsIHkgKSB7XG5cbiAgICAgICAgdGhpcy5yZWNhbGMgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX1swXSA9ICt4IHx8IDA7XG4gICAgICAgIHRoaXMuX1sxXSA9ICt5IHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKiogZGVwcmVjYXRlZDogMC42LjAuLjEuMC4wXG4gICAgICogUGh5c2ljcy52ZWN0b3IjZ2V0KCBpZHggKSAtPiBOdW1iZXJcbiAgICAgKiAtIGlkeCAoTnVtYmVyKTogVGhlIGNvb3JkaW5hdGUgaW5kZXggKDAgb3IgMSlcbiAgICAgKlxuICAgICAqIEdldCB0aGUgeCBvciB5IGNvbXBvbmVudCBieSBpbmRleC5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiggbiApe1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9bIG4gXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3IjdmFkZCggdiApIC0+IHRoaXNcbiAgICAgKiAtIHYgKFBoeXNpY3MudmVjdG9yKTogdmVjdG9yIHRvIGFkZFxuICAgICAqXG4gICAgICogQWRkIGEgW1tQaHlzaWNzLnZlY3Rvcl1dIHRvIGB0aGlzYC5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS52YWRkID0gZnVuY3Rpb24oIHYgKSB7XG5cbiAgICAgICAgdGhpcy5yZWNhbGMgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX1swXSArPSB2Ll9bMF07XG4gICAgICAgIHRoaXMuX1sxXSArPSB2Ll9bMV07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciN2c3ViKCB2ICkgLT4gdGhpc1xuICAgICAqIC0gdiAoUGh5c2ljcy52ZWN0b3IpOiB2ZWN0b3IgdG8gc3VidHJhY3RcbiAgICAgKlxuICAgICAqIFN1YnRyYWN0IGEgW1tQaHlzaWNzLnZlY3Rvcl1dIGZyb20gYHRoaXNgLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLnZzdWIgPSBmdW5jdGlvbiggdiApIHtcblxuICAgICAgICB0aGlzLnJlY2FsYyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fWzBdIC09IHYuX1swXTtcbiAgICAgICAgdGhpcy5fWzFdIC09IHYuX1sxXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI2FkZCggeCwgeSApIC0+IHRoaXNcbiAgICAgKiAtIHggKE51bWJlcik6IGFtb3VudCB0byBhZGQgdG8gdGhlIHggY29vcmRpbmF0ZVxuICAgICAqIC0geSAoTnVtYmVyKTogYW1vdW50IHRvIGFkZCB0byB0aGUgeSBjb29yZGluYXRlXG4gICAgICpcbiAgICAgKiBBZGQgc2NhbGFycyBbW1BoeXNpY3MudmVjdG9yXV0gdG8gdGhlIGNvb3JkaW5hdGVzLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKCB4LCB5ICl7XG5cbiAgICAgICAgdGhpcy5yZWNhbGMgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX1swXSArPSAreCB8fCAwO1xuICAgICAgICB0aGlzLl9bMV0gKz0gK3kgfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI3N1YiggeCwgeSApIC0+IHRoaXNcbiAgICAgKiAtIHggKE51bWJlcik6IGFtb3VudCB0byBzdWJ0cmFjdCBmcm9tIHRoZSB4IGNvb3JkaW5hdGVcbiAgICAgKiAtIHkgKE51bWJlcik6IGFtb3VudCB0byBzdWJ0cmFjdCBmcm9tIHRoZSB5IGNvb3JkaW5hdGVcbiAgICAgKlxuICAgICAqIFN1YnRyYWN0IHNjYWxhcnMgW1tQaHlzaWNzLnZlY3Rvcl1dIGZyb20gdGhlIGNvb3JkaW5hdGVzLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uKCB4LCB5ICl7XG5cbiAgICAgICAgdGhpcy5yZWNhbGMgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX1swXSAtPSB4O1xuICAgICAgICB0aGlzLl9bMV0gLT0geSA9PT0gdW5kZWZpbmVkPyAwIDogeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI211bHQoIG0gKSAtPiB0aGlzXG4gICAgICogLSBtIChOdW1iZXIpOiBhbW91bnQgdG8gbXVsdGlwbHkgdGhpcyB2ZWN0b3IgYnlcbiAgICAgKlxuICAgICAqIE11bHRpcGx5IHRoaXMgYnkgYSBzY2FsYXIgcXVhbnRpdHkuXG4gICAgICpcbiAgICAgKiBTYW1lIGFzIHNjYWxpbmcgdGhlIHZlY3RvciBieSBhbiBhbW91bnQgYG1gLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLm11bHQgPSBmdW5jdGlvbiggbSApIHtcblxuICAgICAgICBpZiAoICF0aGlzLnJlY2FsYyApe1xuXG4gICAgICAgICAgICB0aGlzLl9bNF0gKj0gbSAqIG07XG4gICAgICAgICAgICB0aGlzLl9bM10gKj0gbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX1swXSAqPSBtO1xuICAgICAgICB0aGlzLl9bMV0gKj0gbTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI2RvdCggdiApIC0+IE51bWJlclxuICAgICAqIC0gdiAoUGh5c2ljcy52ZWN0b3IpOiBUaGUgb3RoZXIgdmVjdG9yXG4gICAgICpcbiAgICAgKiBDb21wdXRlIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciB3aXRoIGB2YC5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiggdiApIHtcblxuICAgICAgICByZXR1cm4gKHRoaXMuX1swXSAqIHYuX1swXSkgKyAodGhpcy5fWzFdICogdi5fWzFdKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3IjY3Jvc3MoIHYgKSAtPiBOdW1iZXJcbiAgICAgKiAtIHYgKFBoeXNpY3MudmVjdG9yKTogVGhlIG90aGVyIHZlY3RvclxuICAgICAqXG4gICAgICogQ29tcHV0ZSB0aGUgKGxlZnQtaGFuZGVkKSBjcm9zcyBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIHdpdGggYHZgLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLmNyb3NzID0gZnVuY3Rpb24oIHYgKSB7XG5cbiAgICAgICAgcmV0dXJuICggLSB0aGlzLl9bMF0gKiB2Ll9bMV0pICsgKHRoaXMuX1sxXSAqIHYuX1swXSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI3Byb2ooIHYgKSAtPiBOdW1iZXJcbiAgICAgKiAtIHYgKFBoeXNpY3MudmVjdG9yKTogVGhlIG90aGVyIHZlY3RvclxuICAgICAqXG4gICAgICogQ29tcHV0ZSB0aGUgW3NjYWxhciBwcm9qZWN0aW9uXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1ZlY3Rvcl9wcm9qZWN0aW9uI1NjYWxhcl9wcm9qZWN0aW9uXzIpIG9mIHRoaXMgYWxvbmcgYHZgLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLnByb2ogPSBmdW5jdGlvbiggdiApe1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRvdCggdiApIC8gdi5ub3JtKCk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3IjdnByb2ooIHYgKSAtPiB0aGlzXG4gICAgICogLSB2IChQaHlzaWNzLnZlY3Rvcik6IFRoZSBvdGhlciB2ZWN0b3JcbiAgICAgKlxuICAgICAqIENvbXB1dGUgdGhlIFt2ZWN0b3IgcHJvamVjdGlvbl0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9WZWN0b3JfcHJvamVjdGlvbiNWZWN0b3JfcHJvamVjdGlvbl8yKSBvZiB0aGlzIGFsb25nIGB2YCBhbmQgY29weSB0aGUgcmVzdWx0IGludG8gdGhpcyB2ZWN0b3IuXG4gICAgICoqL1xuICAgIFZlY3Rvci5wcm90b3R5cGUudnByb2ogPSBmdW5jdGlvbiggdiApe1xuXG4gICAgICAgIHZhciBtID0gdGhpcy5kb3QoIHYgKSAvIHYubm9ybVNxKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCB2ICkubXVsdCggbSApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciNhbmdsZSggW3ZdICkgLT4gTnVtYmVyXG4gICAgICogLSB2IChQaHlzaWNzLnZlY3Rvcik6IFRoZSBvdGhlciB2ZWN0b3JcbiAgICAgKiArIChOdW1iZXIpOiBUaGUgYW5nbGUgaW4gcmFkaWFucyBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCB0aGUgeC1heGlzIE9SIGB2YCBpZiBzcGVjaWZpZWRcbiAgICAgKlxuICAgICAqIENvbXB1dGUgdGhlIGFuZ2xlIGJldHdlZW4gYHRoaXNgIGFuZCB2ZWN0b3IgYHZgIG9yIHRoaXMgYW5kIHggYXhpcy5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS5hbmdsZSA9IGZ1bmN0aW9uKCB2ICl7XG5cbiAgICAgICAgdmFyIGFuZztcblxuICAgICAgICBpZiAoIHRoaXMuZXF1YWxzKCBWZWN0b3IuemVybyApICl7XG5cbiAgICAgICAgICAgIGlmICggdiApe1xuICAgICAgICAgICAgICAgIHJldHVybiB2LmFuZ2xlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCB2ICYmICF2LmVxdWFscyggVmVjdG9yLnplcm8gKSApe1xuICAgICAgICAgICAgICAgIGFuZyA9IGF0YW4yKCB0aGlzLl9bMV0gKiB2Ll9bMF0gLSB0aGlzLl9bMF0gKiB2Ll9bMV0sIHRoaXMuX1swXSAqIHYuX1swXSArIHRoaXMuX1sxXSAqIHYuX1sxXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuZyA9IGF0YW4yKCB0aGlzLl9bIDEgXSwgdGhpcy5fWyAwIF0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChhbmcgPiBNYXRoLlBJKXtcbiAgICAgICAgICAgIGFuZyAtPSBUV09QSTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChhbmcgPCAtTWF0aC5QSSl7XG4gICAgICAgICAgICBhbmcgKz0gVFdPUEk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW5nO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciNhbmdsZTIoIGxlZnQsIHJpZ2h0ICkgLT4gTnVtYmVyXG4gICAgICogLSBsZWZ0IChQaHlzaWNzLnZlY3Rvcik6IFRoZSBwb3NpdGlvbiBvbiB0aGUgbGVmdFxuICAgICAqIC0gcmlnaHQgKFBoeXNpY3MudmVjdG9yKTogVGhlIHBvc2l0aW9uIG9uIHRoZSByaWdodFxuICAgICAqXG4gICAgICogQ29tcHV0ZSB0aGUgYW5nbGUgY3JlYXRlZCBiZXR3ZWVuIHRocmVlIHBvaW50czsgbGVmdCAtPiB0aGlzIC0+IHJpZ2h0LlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLmFuZ2xlMiA9IGZ1bmN0aW9uKCBsZWZ0LCByaWdodCApe1xuXG4gICAgICAgIHZhciB4MSA9IGxlZnQuX1swXSAtIHRoaXMuX1swXVxuICAgICAgICAgICAgLHkxID0gbGVmdC5fWzFdIC0gdGhpcy5fWzFdXG4gICAgICAgICAgICAseDIgPSByaWdodC5fWzBdIC0gdGhpcy5fWzBdXG4gICAgICAgICAgICAseTIgPSByaWdodC5fWzFdIC0gdGhpcy5fWzFdXG4gICAgICAgICAgICAsYW5nID0gYXRhbjIoIHkxICogeDIgLSB4MSAqIHkyLCB4MSAqIHgyICsgeTEgKiB5MilcbiAgICAgICAgICAgIDtcblxuICAgICAgICB3aGlsZSAoYW5nID4gTWF0aC5QSSl7XG4gICAgICAgICAgICBhbmcgLT0gVFdPUEk7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoYW5nIDwgLU1hdGguUEkpe1xuICAgICAgICAgICAgYW5nICs9IFRXT1BJO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFuZztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3Ijbm9ybSgpIC0+IE51bWJlclxuICAgICAqXG4gICAgICogQ29tcHV0ZSB0aGUgbm9ybSAobGVuZ3RoKSBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS5ub3JtID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucmVjYWxjKXtcbiAgICAgICAgICAgIHRoaXMucmVjYWxjID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9bNF0gPSAodGhpcy5fWzBdICogdGhpcy5fWzBdICsgdGhpcy5fWzFdICogdGhpcy5fWzFdKTtcbiAgICAgICAgICAgIHRoaXMuX1szXSA9IHNxcnQoIHRoaXMuX1s0XSApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX1szXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3Ijbm9ybVNxKCkgLT4gTnVtYmVyXG4gICAgICpcbiAgICAgKiBDb21wdXRlIHRoZSBub3JtIChsZW5ndGgpIHNxdWFyZWQgb2YgdGhpcyB2ZWN0b3IuXG4gICAgICoqL1xuICAgIFZlY3Rvci5wcm90b3R5cGUubm9ybVNxID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucmVjYWxjKXtcbiAgICAgICAgICAgIHRoaXMucmVjYWxjID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9bNF0gPSAodGhpcy5fWzBdICogdGhpcy5fWzBdICsgdGhpcy5fWzFdICogdGhpcy5fWzFdKTtcbiAgICAgICAgICAgIHRoaXMuX1szXSA9IHNxcnQoIHRoaXMuX1s0XSApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX1s0XTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3IjZGlzdCggdiApIC0+IE51bWJlclxuICAgICAqIC0gdiAoUGh5c2ljcy52ZWN0b3IpOiBUaGUgb3RoZXIgdmVjdG9yXG4gICAgICpcbiAgICAgKiBDb21wdXRlIHRoZSBkaXN0YW5jZSBmcm9tIHRoaXMgdmVjdG9yIHRvIGFub3RoZXIgdmVjdG9yIGB2YC5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS5kaXN0ID0gZnVuY3Rpb24oIHYgKSB7XG5cbiAgICAgICAgdmFyIGR4LCBkeTtcbiAgICAgICAgcmV0dXJuIHNxcnQoXG4gICAgICAgICAgICAoZHggPSAodi5fWzBdIC0gdGhpcy5fWzBdKSkgKiBkeCArXG4gICAgICAgICAgICAoZHkgPSAodi5fWzFdIC0gdGhpcy5fWzFdKSkgKiBkeVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciNkaXN0U3EoIHYgKSAtPiBOdW1iZXJcbiAgICAgKiAtIHYgKFBoeXNpY3MudmVjdG9yKTogVGhlIG90aGVyIHZlY3RvclxuICAgICAqXG4gICAgICogQ29tcHV0ZSB0aGUgZGlzdGFuY2Ugc3F1YXJlZCBmcm9tIHRoaXMgdmVjdG9yIHRvIGFub3RoZXIgdmVjdG9yIGB2YC5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS5kaXN0U3EgPSBmdW5jdGlvbiggdiApIHtcblxuICAgICAgICB2YXIgZHgsIGR5O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGR4ID0gKHYuX1swXSAtIHRoaXMuX1swXSkpICogZHggK1xuICAgICAgICAgICAgKGR5ID0gKHYuX1sxXSAtIHRoaXMuX1sxXSkpICogZHlcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3IjcGVycCggW2Njd10gKSAtPiB0aGlzXG4gICAgICogLSBjY3cgKEJvb2xlYW4pOiBmbGFnIHRvIGluZGljYXRlIHRoYXQgd2Ugc2hvdWxkIHJvdGF0ZSBjb3VudGVyY2xvY2t3aXNlXG4gICAgICpcbiAgICAgKiBDaGFuZ2UgdGhpcyB2ZWN0b3IgaW50byBhIHZlY3RvciB0aGF0IHdpbGwgYmUgcGVycGVuZGljdWxhci5cbiAgICAgKlxuICAgICAqIEluIG90aGVyIHdvcmRzLCByb3RhdGUgYnkgKCstKSA5MCBkZWdyZWVzLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLnBlcnAgPSBmdW5jdGlvbiggY2N3ICkge1xuXG4gICAgICAgIHZhciB0bXAgPSB0aGlzLl9bMF1cbiAgICAgICAgICAgIDtcblxuICAgICAgICBpZiAoIGNjdyApe1xuXG4gICAgICAgICAgICAvLyB4IDwtPiB5XG4gICAgICAgICAgICAvLyBuZWdhdGUgeVxuICAgICAgICAgICAgdGhpcy5fWzBdID0gdGhpcy5fWzFdO1xuICAgICAgICAgICAgdGhpcy5fWzFdID0gLXRtcDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyB4IDwtPiB5XG4gICAgICAgICAgICAvLyBuZWdhdGUgeFxuICAgICAgICAgICAgdGhpcy5fWzBdID0gLXRoaXMuX1sxXTtcbiAgICAgICAgICAgIHRoaXMuX1sxXSA9IHRtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciNub3JtYWxpemUoKSAtPiB0aGlzXG4gICAgICpcbiAgICAgKiBOb3JtYWxpc2UgdGhpcyB2ZWN0b3IsIG1ha2luZyBpdCBhIHVuaXQgdmVjdG9yLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBtID0gdGhpcy5ub3JtKCk7XG5cbiAgICAgICAgLy8gbWVhbnMgaXQncyBhIHplcm8gVmVjdG9yXG4gICAgICAgIGlmICggbSA9PT0gMCApe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBtID0gMS9tO1xuXG4gICAgICAgIHRoaXMuX1swXSAqPSBtO1xuICAgICAgICB0aGlzLl9bMV0gKj0gbTtcblxuICAgICAgICB0aGlzLl9bM10gPSAxLjA7XG4gICAgICAgIHRoaXMuX1s0XSA9IDEuMDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3IjdHJhbnNmb3JtKCB0ICkgLT4gdGhpc1xuICAgICAqIC0gdCAoUGh5c2ljcy50cmFuc2Zvcm0pOiBUaGUgdHJhbnNmb3JtYXRpb24gdG8gYXBwbHlcbiAgICAgKlxuICAgICAqIEFwcGx5IGEgW1tQaHlzaWNzLnRyYW5zZm9ybV1dIHRvIHRoaXMgdmVjdG9yLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKCB0ICl7XG5cbiAgICAgICAgdmFyIHNpbkEgPSB0LnNpbkFcbiAgICAgICAgICAgICxjb3NBID0gdC5jb3NBXG4gICAgICAgICAgICAseCA9IHQuby5fWyAwIF1cbiAgICAgICAgICAgICx5ID0gdC5vLl9bIDEgXVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIHRoaXMuX1sgMCBdIC09IHg7XG4gICAgICAgIHRoaXMuX1sgMSBdIC09IHk7XG5cbiAgICAgICAgLy8gcm90YXRlIGFib3V0IG9yaWdpbiBcIm9cIiB0aGVuIHRyYW5zbGF0ZVxuICAgICAgICByZXR1cm4gdGhpcy5zZXQoXG4gICAgICAgICAgICB0aGlzLl9bIDAgXSAqIGNvc0EgLSB0aGlzLl9bIDEgXSAqIHNpbkEgKyB4ICsgdC52Ll9bIDAgXSxcbiAgICAgICAgICAgIHRoaXMuX1sgMCBdICogc2luQSArIHRoaXMuX1sgMSBdICogY29zQSArIHkgKyB0LnYuX1sgMSBdXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI3RyYW5zZm9ybUludiggdCApIC0+IHRoaXNcbiAgICAgKiAtIHQgKFBoeXNpY3MudHJhbnNmb3JtKTogVGhlIHRyYW5zZm9ybWF0aW9uIHRvIGFwcGx5IHRoZSBpbnZlcnNlIG9mXG4gICAgICpcbiAgICAgKiBBcHBseSBhbiBpbnZlcnNlIFtbUGh5c2ljcy50cmFuc2Zvcm1dXSB0byB0aGlzIHZlY3Rvci5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS50cmFuc2Zvcm1JbnYgPSBmdW5jdGlvbiggdCApe1xuXG4gICAgICAgIHZhciBzaW5BID0gdC5zaW5BXG4gICAgICAgICAgICAsY29zQSA9IHQuY29zQVxuICAgICAgICAgICAgLHggPSB0Lm8uX1sgMCBdXG4gICAgICAgICAgICAseSA9IHQuby5fWyAxIF1cbiAgICAgICAgICAgIDtcblxuICAgICAgICB0aGlzLl9bIDAgXSAtPSB4ICsgdC52Ll9bIDAgXTtcbiAgICAgICAgdGhpcy5fWyAxIF0gLT0geSArIHQudi5fWyAxIF07XG5cbiAgICAgICAgLy8gaW52ZXJzZSB0cmFuc2xhdGUgdGhlbiBpbnZlcnNlIHJvdGF0ZSBhYm91dCBvcmlnaW4gXCJvXCJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KFxuICAgICAgICAgICAgdGhpcy5fWyAwIF0gKiBjb3NBICsgdGhpcy5fWyAxIF0gKiBzaW5BICsgeCxcbiAgICAgICAgICAgIC0gdGhpcy5fWyAwIF0gKiBzaW5BICsgdGhpcy5fWyAxIF0gKiBjb3NBICsgeVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciNyb3RhdGUoIHQgKSAtPiB0aGlzXG4gICAgICogUGh5c2ljcy52ZWN0b3Ijcm90YXRlKCBhbmdbLCBvXSApIC0+IHRoaXNcbiAgICAgKiAtIHQgKFBoeXNpY3MudHJhbnNmb3JtKTogVGhlIHRyYW5zZm9ybWF0aW9uIHRvIGFwcGx5IHRoZSByb3RhdGlvbmFsIHBhcnQgb2ZcbiAgICAgKiAtIGFuZyAoTnVtYmVyKTogVGhlIGFuZ2xlIChpbiByYWRpYW5zKSwgdG8gcm90YXRlIGJ5XG4gICAgICogLSBvIChWZWN0b3Jpc2gpOiBUaGUgcG9pbnQgb2Ygb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICAgICAqXG4gICAgICogUm90YXRlIHRoaXMgdmVjdG9yLlxuICAgICAqXG4gICAgICogQW4gYW5nbGUgYW5kIHJvdGF0aW9uIG9yaWdpbiBjYW4gYmUgc3BlY2lmaWVkLFxuICAgICAqIG9yIGEgdHJhbnNmb3JtIGNhbiBiZSBzcGVjaWZpZWQgYW5kIG9ubHkgdGhlIHJvdGF0aW9uXG4gICAgICogcG9ydGlvbiBvZiB0aGF0IHRyYW5zZm9ybSB3aWxsIGJlIGFwcGxpZWRcbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiggdCwgbyApe1xuXG4gICAgICAgIHZhciBzaW5BXG4gICAgICAgICAgICAsY29zQVxuICAgICAgICAgICAgLHggPSAwXG4gICAgICAgICAgICAseSA9IDBcbiAgICAgICAgICAgIDtcblxuICAgICAgICBpZiAoIHR5cGVvZiB0ID09PSAnbnVtYmVyJyApe1xuICAgICAgICAgICAgc2luQSA9IE1hdGguc2luKCB0ICk7XG4gICAgICAgICAgICBjb3NBID0gTWF0aC5jb3MoIHQgKTtcblxuICAgICAgICAgICAgaWYgKCBvICl7XG4gICAgICAgICAgICAgICAgeCA9IG8ueDtcbiAgICAgICAgICAgICAgICB5ID0gby55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2luQSA9IHQuc2luQTtcbiAgICAgICAgICAgIGNvc0EgPSB0LmNvc0E7XG5cbiAgICAgICAgICAgIHggPSB0Lm8uX1sgMCBdO1xuICAgICAgICAgICAgeSA9IHQuby5fWyAxIF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9bIDAgXSAtPSB4O1xuICAgICAgICB0aGlzLl9bIDEgXSAtPSB5O1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNldChcbiAgICAgICAgICAgIHRoaXMuX1sgMCBdICogY29zQSAtIHRoaXMuX1sgMSBdICogc2luQSArIHgsXG4gICAgICAgICAgICB0aGlzLl9bIDAgXSAqIHNpbkEgKyB0aGlzLl9bIDEgXSAqIGNvc0EgKyB5XG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI3JvdGF0ZUludiggdCApIC0+IHRoaXNcbiAgICAgKiAtIHQgKFBoeXNpY3MudHJhbnNmb3JtKTogVGhlIHRyYW5zZm9ybWF0aW9uIHRvIGFwcGx5IHRoZSBpbnZlcnNlIHJvdGF0aW9uYWwgcGFydCBvZlxuICAgICAqXG4gICAgICogQXBwbHkgdGhlIGludmVyc2Ugcm90YXRpb24gb2YgYSB0cmFuc2Zvcm0uXG4gICAgICpcbiAgICAgKiBPbmx5IHRoZSBpbnZlcnNlIHJvdGF0aW9uIHBvcnRpb24gb2ZcbiAgICAgKiB0aGF0IHRyYW5zZm9ybSB3aWxsIGJlIGFwcGxpZWQuXG4gICAgICoqL1xuICAgIFZlY3Rvci5wcm90b3R5cGUucm90YXRlSW52ID0gZnVuY3Rpb24oIHQgKXtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZXQoXG4gICAgICAgICAgICAodGhpcy5fWyAwIF0gLSB0Lm8uX1sgMCBdKSAqIHQuY29zQSArICh0aGlzLl9bIDEgXSAtIHQuby5fWyAxIF0pICogdC5zaW5BICsgdC5vLl9bIDAgXSxcbiAgICAgICAgICAgIC0odGhpcy5fWyAwIF0gLSB0Lm8uX1sgMCBdKSAqIHQuc2luQSArICh0aGlzLl9bIDEgXSAtIHQuby5fWyAxIF0pICogdC5jb3NBICsgdC5vLl9bIDEgXVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciN0cmFuc2xhdGUoIHQgKSAtPiB0aGlzXG4gICAgICogLSB0IChQaHlzaWNzLnRyYW5zZm9ybSk6IFRoZSB0cmFuc2Zvcm1hdGlvbiB0byBhcHBseSB0aGUgdHJhbnNsYXRpb25hbCBwYXJ0IG9mXG4gICAgICpcbiAgICAgKiBBcHBseSB0aGUgdHJhbnNsYXRpb24gb2YgYSB0cmFuc2Zvcm0uXG4gICAgICpcbiAgICAgKiBPbmx5IHRoZSB0cmFuc2xhdGlvbiBwb3J0aW9uIG9mXG4gICAgICogdGhhdCB0cmFuc2Zvcm0gd2lsbCBiZSBhcHBsaWVkLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKCB0ICl7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFkZCggdC52ICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI3RyYW5zbGF0ZUludiggdCApIC0+IHRoaXNcbiAgICAgKiAtIHQgKFBoeXNpY3MudHJhbnNmb3JtKTogVGhlIHRyYW5zZm9ybWF0aW9uIHRvIGFwcGx5IHRoZSBpbnZlcnNlIHRyYW5zbGF0aW9uYWwgcGFydCBvZlxuICAgICAqXG4gICAgICogQXBwbHkgdGhlIGludmVyc2UgdHJhbnNsYXRpb24gb2YgYSB0cmFuc2Zvcm0uXG4gICAgICpcbiAgICAgKiBPbmx5IHRoZSBpbnZlcnNlIHRyYW5zbGF0aW9uIHBvcnRpb24gb2ZcbiAgICAgKiB0aGF0IHRyYW5zZm9ybSB3aWxsIGJlIGFwcGxpZWQuXG4gICAgICoqL1xuICAgIFZlY3Rvci5wcm90b3R5cGUudHJhbnNsYXRlSW52ID0gZnVuY3Rpb24oIHQgKXtcblxuICAgICAgICByZXR1cm4gdGhpcy52c3ViKCB0LnYgKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciNjbG9uZSggW3ZdICkgLT4gdGhpc3xQaHlzaWNzLnZlY3RvclxuICAgICAqIC0gdiAoVmVjdG9yaXNoKTogVGhlIHZlY3Rvci1saWtlIG9iamVjdCB0byBjbG9uZVxuICAgICAqICsgKHRoaXMpOiBJZiBgdmAgaXMgc3BlY2lmaWVkIGFzIGFuIGFyZ3VtZW50XG4gICAgICogKyAoUGh5c2ljcy52ZWN0b3IpOiBBIG5ldyB2ZWN0b3IgaW5zdGFuY2UgdGhhdCBjbG9uZXMgdGhpcyB2ZWN0b3IsIGlmIG5vIGFyZ3VtZW50IGlzIHNwZWNpZmllZFxuICAgICAqXG4gICAgICogQ3JlYXRlIGEgY2xvbmUgb2YgdGhpcyB2ZWN0b3IsIG9yIGNsb25lIGFub3RoZXIgdmVjdG9yIGludG8gdGhpcyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgZXNwZWNpYWxseSB1c2VmdWwgaW4gdmVjdG9yIGFsZ29yaXRobXNcbiAgICAgKiB0aGF0IHVzZSB0ZW1wb3JhcnkgdmVjdG9ycyAod2hpY2ggbW9zdCBzaG91bGQpLlxuICAgICAqIFlvdSBjYW4gY3JlYXRlIHRlbXBvcmFyeSB2ZWN0b3JzIGFuZCB0aGVuIGRvIHRoaW5ncyBsaWtlLi4uXG4gICAgICogYGBgXG4gICAgICogdGVtcC5jbG9uZSggb3RoZXJWZWN0b3IgKTtcbiAgICAgKiAvLyBjb21wdXRlIHRoaW5ncyB3aXRoIHRlbXAuLi5cbiAgICAgKiAvLyB0aGVuIHNhdmUgdGhlIHJlc3VsdFxuICAgICAqIHJlc3VsdC5jbG9uZSggdG1wICk7XG4gICAgICogYGBgXG4gICAgICoqL1xuICAgIFZlY3Rvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiggdiApIHtcblxuICAgICAgICAvLyBodHRwOi8vanNwZXJmLmNvbS92ZWN0b3Itc3RvcmFnZS10ZXN0XG5cbiAgICAgICAgaWYgKCB2ICl7XG5cbiAgICAgICAgICAgIGlmICghdi5fKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldCggdi54LCB2LnkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWNhbGMgPSB2LnJlY2FsYztcblxuICAgICAgICAgICAgaWYgKCF2LnJlY2FsYyl7XG4gICAgICAgICAgICAgICAgdGhpcy5fWzNdID0gdi5fWzNdO1xuICAgICAgICAgICAgICAgIHRoaXMuX1s0XSA9IHYuX1s0XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fWzBdID0gdi5fWzBdO1xuICAgICAgICAgICAgdGhpcy5fWzFdID0gdi5fWzFdO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKCB0aGlzICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI3N3YXAoIHYgKSAtPiB0aGlzXG4gICAgICogLSB2IChQaHlzaWNzLnZlY3Rvcik6IFRoZSBvdGhlciB2ZWN0b3JcbiAgICAgKlxuICAgICAqIFN3YXAgdmFsdWVzIHdpdGggb3RoZXIgdmVjdG9yLlxuICAgICAqKi9cbiAgICBWZWN0b3IucHJvdG90eXBlLnN3YXAgPSBmdW5jdGlvbiggdiApe1xuXG4gICAgICAgIHZhciBfID0gdGhpcy5fO1xuICAgICAgICB0aGlzLl8gPSB2Ll87XG4gICAgICAgIHYuXyA9IF87XG5cbiAgICAgICAgXyA9IHRoaXMucmVjYWxjO1xuICAgICAgICB0aGlzLnJlY2FsYyA9IHYucmVjYWxjO1xuICAgICAgICB2LnJlY2FsYyA9IF87XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciN2YWx1ZXMoKSAtPiBPYmplY3RcbiAgICAgKlxuICAgICAqIEdldCB0aGUgY29vcmRpbmF0ZSB2YWx1ZXMgYXMgYW4gb2JqZWN0IGxpdGVyYWwuXG4gICAgICoqL1xuICAgIFZlY3Rvci5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKXtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5fWzBdLFxuICAgICAgICAgICAgeTogdGhpcy5fWzFdXG4gICAgICAgIH07XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3IjemVybygpIC0+IHRoaXNcbiAgICAgKlxuICAgICAqIFNldCB0aGUgY29vcmRpbmF0ZXMgb2YgdGhpcyB2ZWN0b3IgdG8gemVyby5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS56ZXJvID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5fWzNdID0gMC4wO1xuICAgICAgICB0aGlzLl9bNF0gPSAwLjA7XG5cbiAgICAgICAgdGhpcy5fWzBdID0gMC4wO1xuICAgICAgICB0aGlzLl9bMV0gPSAwLjA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciNuZWdhdGUoKSAtPiB0aGlzXG4gICAgICpcbiAgICAgKiBGbGlwIHRoaXMgdmVjdG9yIGluIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24uXG4gICAgICoqL1xuICAgIFZlY3Rvci5wcm90b3R5cGUubmVnYXRlID0gZnVuY3Rpb24oIGNvbXBvbmVudCApe1xuXG4gICAgICAgIGlmIChjb21wb25lbnQgIT09IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgICAgIHRoaXMuX1sgY29tcG9uZW50IF0gPSAtdGhpcy5fWyBjb21wb25lbnQgXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fWzBdID0gLXRoaXMuX1swXTtcbiAgICAgICAgdGhpcy5fWzFdID0gLXRoaXMuX1sxXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yI2NsYW1wKCBtaW5WLCBtYXhWICkgLT4gdGhpc1xuICAgICAqIC0gbWluViAoVmVjdG9yaXNoKTogVGhlIG1pbmltdW0gdmVjdG9yXG4gICAgICogLSBtYXhWIChWZWN0b3Jpc2gpOiBUaGUgbWF4aW11bSB2ZWN0b3JcbiAgICAgKlxuICAgICAqIENvbnN0cmFpbiB2ZWN0b3IgY29tcG9uZW50cyB0byBtaW5pbWEgYW5kIG1heGltYS5cbiAgICAgKlxuICAgICAqIFRoZSB2ZWN0b3IgYW5hbG9nIG9mIFtzY2FsYXIgY2xhbXBpbmddKGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ2xhbXBpbmdfKGdyYXBoaWNzKSkuXG4gICAgICoqL1xuICAgIFZlY3Rvci5wcm90b3R5cGUuY2xhbXAgPSBmdW5jdGlvbiggbWluViwgbWF4ViApe1xuXG4gICAgICAgIHRoaXMuX1swXSA9IG1pbihtYXgodGhpcy5fWzBdLCBtaW5WLngpLCBtYXhWLngpO1xuICAgICAgICB0aGlzLl9bMV0gPSBtaW4obWF4KHRoaXMuX1sxXSwgbWluVi55KSwgbWF4Vi55KTtcbiAgICAgICAgdGhpcy5yZWNhbGMgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy52ZWN0b3IjdG9TdHJpbmcoKSAtPiBTdHJpbmdcbiAgICAgKlxuICAgICAqIEdldCBhIGZvcm1hdHRlZCBzdHJpbmcgb2YgdGhpcyB2ZWN0b3IncyBjb29yZGluYXRlcy5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgcmV0dXJuICcoJyt0aGlzLl9bMF0gKyAnLCAnICsgdGhpcy5fWzFdKycpJztcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3RvciNlcXVhbHMoIHYgKSAtPiBCb29sZWFuXG4gICAgICogLSB2IChQaHlzaWNzLnZlY3Rvcik6IFRoZSBvdGhlciB2ZWN0b3JcbiAgICAgKlxuICAgICAqIERldGVybWluZSBpZiB0aGlzIHZlY3RvciBlcXVhbHMgYW5vdGhlci5cbiAgICAgKiovXG4gICAgVmVjdG9yLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiggdiApe1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9bMF0gPT09IHYuX1swXSAmJlxuICAgICAgICAgICAgdGhpcy5fWzFdID09PSB2Ll9bMV0gJiZcbiAgICAgICAgICAgIHRoaXMuX1syXSA9PT0gdi5fWzJdO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnZlY3Rvci5heGlzID0gQXJyYXlcbiAgICAgKlxuICAgICAqIFJlYWQtb25seSBheGlzIHZlY3RvcnMgZm9yIGdlbmVyYWwgcmVmZXJlbmNlLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiBQaHlzaWNzLnZlY3Rvci5heGlzWzBdOyAvLyBUaGUgeCBheGlzIHVuaXQgdmVjdG9yXG4gICAgICogUGh5c2ljcy52ZWN0b3IuYXhpc1sxXTsgLy8gVGhlIHkgYXhpcyB1bml0IHZlY3RvclxuICAgICAqIGBgYFxuICAgICAqKi9cbiAgICBWZWN0b3IuYXhpcyA9IFtcbiAgICAgICAgbmV3IFZlY3RvcigxLjAsIDAuMCksXG4gICAgICAgIG5ldyBWZWN0b3IoMC4wLCAxLjApXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudmVjdG9yLnplcm8gPSB6ZXJvVmVjdG9yXG4gICAgICpcbiAgICAgKiBSZWFkLW9ubHkgemVybyB2ZWN0b3IgZm9yIHJlZmVyZW5jZVxuICAgICAqKi9cbiAgICBWZWN0b3IuemVybyA9IG5ldyBWZWN0b3IoMCwgMCk7XG5cbiAgICAvLyBhc3NpZ25cbiAgICBQaHlzaWNzLnZlY3RvciA9IFZlY3RvcjtcblxufSh0aGlzKSk7IC8vIGVuZCBWZWN0b3IgY2xhc3NcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL3V0aWwvbm9jb25mbGljdC5qc1xuXG4oZnVuY3Rpb24oIHdpbmRvdyApe1xuXG4gICAgdmFyIF9QaHlzaWNzID0gd2luZG93LlBoeXNpY3M7XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLm5vQ29uZmxpY3QoKSAtPiBQaHlzaWNzXG4gICAgICogXG4gICAgICogUmVzdG9yZSB0aGUgb3JpZ2luYWwgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgd2luZG93LlBoeXNpY3MgdmFyaWFibGUuXG4gICAgICogXG4gICAgICogRG9lcyBub3RoaW5nIGlmIFBoeXNpY3NKUyBkb2Vzbid0IGhhdmUgYSByZWZlcmVuY2UgaW4gZ2xvYmFsIHNjb3BlXG4gICAgICoqL1xuICAgIFBoeXNpY3Mubm9Db25mbGljdCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYgKCB3aW5kb3cuUGh5c2ljcyA9PT0gUGh5c2ljcyApIHtcbiAgICAgICAgICAgIHdpbmRvdy5QaHlzaWNzID0gX1BoeXNpY3M7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQaHlzaWNzO1xuICAgIH07XG5cbn0pKCB0aGlzICk7XG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvdXRpbC9kZWNvcmF0b3IuanNcblxuLyoqIHJlbGF0ZWQgdG86IGZhY3RvcnlcbiAqIFBoeXNpY3MudXRpbC5kZWNvcmF0b3IoIHR5cGUgWywgcHJvdG9EZWYgXSApIC0+IEZ1bmN0aW9uXG4gKiAtIHR5cGUgKFN0cmluZyk6IFRoZSBuYW1lIG9mIHRoZSBmYWN0b3J5IHlvdSBhcmUgY3JlYXRpbmdcbiAqIC0gcHJvdG9EZWYgKE9iamVjdCk6IFRoZSB0b3AtbGV2ZWwgcHJvdG90eXBlXG4gKiArIChGdW5jdGlvbik6IFRoZSBmYWN0b3J5IGZ1bmN0aW9uXG4gKlxuICogRmFjaWxpdGF0ZXMgY3JlYXRpb24gb2YgZGVjb3JhdG9yIGZhY3RvcnkgZnVuY3Rpb25zLlxuICpcbiAqIFNlZSB0aGUgW1tmYWN0b3J5XV0gZGVmaW5pdGlvbiBmb3IgdGhlIGZhY3Rvcnkgc2lnbmF0dXJlcy5cbiAqIFtGb3IgZnVsbCBkb2N1bWVudGF0aW9uIGFuZCBleGFtcGxlcywgcGxlYXNlIHZpc2l0IHRoZSB3aWtpXShodHRwczovL2dpdGh1Yi5jb20vd2VsbGNhZmZlaW5hdGVkL1BoeXNpY3NKUy93aWtpL0Z1bmRhbWVudGFscyN0aGUtZmFjdG9yeS1wYXR0ZXJuKS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHZhciBmYWN0b3J5ID0gUGh5c2ljcy51dGlsLmRlY29yYXRvcignZmFjdG9yeScsIHtcbiAqICAgICAgLy8gcHJvdG90eXBlIG1ldGhvZHMuLi5cbiAqICAgICAgbWV0aG9kOiBmdW5jdGlvbiggYXJncyApe1xuICogICAgICB9XG4gKiB9KTtcbiAqXG4gKiAvLyBkZWZpbmVcbiAqIGZhY3RvcnkoICduYW1lJywgJ3BhcmVudC1uYW1lJywgZnVuY3Rpb24oIHBhcmVudCApe1xuICpcbiAqICAgICAgLy8gZXh0ZW5kIGZ1cnRoZXIuLi5cbiAqICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAgIC8vIG92ZXJyaWRlc1xuICogICAgICAgICAgaW5pdDogZnVuY3Rpb24oIGNmZyApe1xuICogICAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwodGhpcywgY2ZnKTtcbiAqICAgICAgICAgIH1cbiAqICAgICAgfTtcbiAqIH0pO1xuICpcbiAqIC8vIGluc3RhbnRpYXRlXG4gKiB2YXIgb3B0aW9ucyA9IHsga2V5OiAndmFsJyB9O1xuICogdmFyIGluc3RhbmNlID0gZmFjdG9yeSggJ25hbWUnLCBvcHRpb25zICk7XG4gKiBgYGBcbiAqKi9cbnZhciBEZWNvcmF0b3IgPSBQaHlzaWNzLnV0aWwuZGVjb3JhdG9yID0gZnVuY3Rpb24gRGVjb3JhdG9yKCB0eXBlLCBiYXNlUHJvdG8gKXtcblxuICAgIHZhciByZWdpc3RyeSA9IHt9XG4gICAgICAgICxwcm90byA9IHt9XG4gICAgICAgIDtcblxuICAgIC8vIGV4dGVuZCB0aGF0IHN1cHBvcnRzIGdldHRlcnMvc2V0dGVyc1xuICAgIC8vIG9ubHkgZXh0ZW5kcyBmdW5jdGlvbnNcbiAgICB2YXIgZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKCB0bywgZnJvbSApe1xuICAgICAgICB2YXIgZGVzYywga2V5O1xuICAgICAgICBmb3IgKCBrZXkgaW4gZnJvbSApe1xuICAgICAgICAgICAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoIGZyb20sIGtleSApO1xuICAgICAgICAgICAgaWYgKCBkZXNjLmdldCB8fCBkZXNjLnNldCApe1xuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KCB0bywga2V5LCBkZXNjICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIFBoeXNpY3MudXRpbC5pc0Z1bmN0aW9uKCBkZXNjLnZhbHVlICkgKXtcblxuICAgICAgICAgICAgICAgIHRvWyBrZXkgXSA9IGRlc2MudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH07XG5cbiAgICAvLyBodHRwOi8vZWpvaG4ub3JnL2Jsb2cvb2JqZWN0Z2V0cHJvdG90eXBlb2YvXG4gICAgLyoganNoaW50IC1XMTAzICovXG4gICAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICAgIGlmICggdHlwZW9mIGdldFByb3RvICE9PSAnZnVuY3Rpb24nICkge1xuICAgICAgICBpZiAoIHR5cGVvZiAndGVzdCcuX19wcm90b19fID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgICAgIGdldFByb3RvID0gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0Ll9fcHJvdG9fXztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRQcm90byA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgICAgICAgICAgICAgLy8gTWF5IGJyZWFrIGlmIHRoZSBjb25zdHJ1Y3RvciBoYXMgYmVlbiB0YW1wZXJlZCB3aXRoXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qIGpzaGludCArVzEwMyAqL1xuXG4gICAgdmFyIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG4gICAgaWYgKHR5cGVvZiBvYmplY3RDcmVhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqZWN0Q3JlYXRlID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGKCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBtaXhpbigga2V5LCB2YWwgKVxuICAgICAqIG1peGluKCBvYmogKVxuICAgICAqIC0ga2V5IChTdHJpbmcpOiBUaGUgbWV0aG9kIG5hbWVcbiAgICAgKiAtIHZhbCAoRnVuY3Rpb24pOiBUaGUgZnVuY3Rpb24gdG8gYXNzaWduXG4gICAgICogLSBvYmogKE9iamVjdCk6IG9iamVjdCB3aXRoIG1hbnkgYGtleTogZm5gIHBhaXJzXG4gICAgICpcbiAgICAgKiBBcHBseSBtaXhpbiBtZXRob2RzIHRvIGRlY29yYXRvciBiYXNlLlxuICAgICAqL1xuICAgIHZhciBtaXhpbiA9IGZ1bmN0aW9uIG1peGluKCBrZXksIHZhbCApe1xuXG4gICAgICAgIGlmICggdHlwZW9mIGtleSA9PT0gJ29iamVjdCcgKXtcbiAgICAgICAgICAgIHByb3RvID0gZXh0ZW5kKHByb3RvLCBrZXkpO1xuICAgICAgICAgICAgcHJvdG8udHlwZSA9IHR5cGU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGtleSAhPT0gJ3R5cGUnICYmIFBoeXNpY3MudXRpbC5pc0Z1bmN0aW9uKCB2YWwgKSApe1xuICAgICAgICAgICAgcHJvdG9bIGtleSBdID0gdmFsO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIEBUT0RPOiBub3Qgc3VyZSBvZiB0aGUgYmVzdCB3YXkgdG8gbWFrZSB0aGUgY29uc3RydWN0b3IgbmFtZXNcbiAgICAvLyB0cmFuc3BhcmVudCBhbmQgcmVhZGFibGUgaW4gZGVidWcgY29uc29sZXMuLi5cbiAgICBtaXhpbiggYmFzZVByb3RvICk7XG5cbiAgICAvKiogIGJlbG9uZ3MgdG86IFBoeXNpY3MudXRpbC5kZWNvcmF0b3JcbiAgICAgKiBmYWN0b3J5KCBuYW1lWywgcGFyZW50TmFtZV0sIGRlY29yYXRvclssIGNmZ10gKVxuICAgICAqIGZhY3RvcnkoIG5hbWUsIGNmZyApIC0+IE9iamVjdFxuICAgICAqIC0gIG5hbWUgICAgICAgKFN0cmluZyk6ICBUaGUgY2xhc3MgbmFtZVxuICAgICAqIC0gIHBhcmVudE5hbWUgKFN0cmluZyk6IFRoZSBuYW1lIG9mIHBhcmVudCBjbGFzcyB0byBleHRlbmRcbiAgICAgKiAtICBkZWNvcmF0b3IgIChGdW5jdGlvbik6IFRoZSBkZWNvcmF0b3IgZnVuY3Rpb24gdGhhdCBzaG91bGQgZGVmaW5lIGFuZCByZXR1cm4gbWV0aG9kcyB0byBleHRlbmQgKGRlY29yYXRlKSB0aGUgYmFzZSBjbGFzc1xuICAgICAqIC0gIGNmZyAgICAgICAgKE9iamVjdCk6IFRoZSBjb25maWd1cmF0aW9uIHRvIHBhc3MgdG8gdGhlIGNsYXNzIGluaXRpYWxpemVyXG4gICAgICpcbiAgICAgKiBGYWN0b3J5IGZ1bmN0aW9uIGZvciBkZWZpbml0aW9uIGFuZCBpbnN0YW50aWF0aW9uIG9mIHN1YmNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBVc2UgdGhlIGZpcnN0IHNpZ25hdHVyZSAob25jZSkgdG8gZGVmaW5lIGl0IGZpcnN0LlxuICAgICAqIElmIGRlZmluaW5nIHdpdGhvdXQgdGhlIFwiY2ZnXCIgcGFyYW1ldGVyLCB2b2lkIHdpbGwgYmUgcmV0dXJuZWQuIE90aGVyd2lzZSB0aGUgY2xhc3MgaW5zdGFuY2Ugd2lsbCBiZSByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqIFNlZSBbW1BoeXNpY3MudXRpbC5kZWNvcmF0b3JdXSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKiovXG4gICAgdmFyIGZhY3RvcnkgPSBmdW5jdGlvbiBmYWN0b3J5KCBuYW1lLCBwYXJlbnROYW1lLCBkZWNvcmF0b3IsIGNmZyApe1xuXG4gICAgICAgIHZhciBpbnN0YW5jZVxuICAgICAgICAgICAgLHJlc3VsdFxuICAgICAgICAgICAgLHBhcmVudCA9IHByb3RvXG4gICAgICAgICAgICAsdG1wXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgLy8gc2V0IHBhcmVudCBpZiBzcGVjaWZpZWRcbiAgICAgICAgaWYgKCB0eXBlb2YgcGFyZW50TmFtZSAhPT0gJ3N0cmluZycgKXtcblxuICAgICAgICAgICAgLy8gLi4uIG90aGVyd2lzZSByZWFzc2lnbiBwYXJhbWV0ZXJzXG4gICAgICAgICAgICBjZmcgPSBkZWNvcmF0b3I7XG4gICAgICAgICAgICBkZWNvcmF0b3IgPSBwYXJlbnROYW1lO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIGV4dGVuZCB0aGUgc3BlY2lmaWVkIG1vZHVsZVxuICAgICAgICAgICAgcGFyZW50ID0gcmVnaXN0cnlbIHBhcmVudE5hbWUgXTtcblxuICAgICAgICAgICAgaWYgKCAhcGFyZW50ICl7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyAnRXJyb3I6IFwiJyArIHBhcmVudE5hbWUgKyAnXCIgJyArIHR5cGUgKyAnIG5vdCBkZWZpbmVkJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnByb3RvdHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdHlwZW9mIGRlY29yYXRvciA9PT0gJ2Z1bmN0aW9uJyApe1xuXG4gICAgICAgICAgICByZXN1bHQgPSByZWdpc3RyeVsgbmFtZSBdO1xuXG4gICAgICAgICAgICBpZiAoIHJlc3VsdCApe1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnByb3RvdHlwZSA9IGV4dGVuZChyZXN1bHQucHJvdG90eXBlLCBkZWNvcmF0b3IoIGdldFByb3RvKHJlc3VsdC5wcm90b3R5cGUpICkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5ld2x5IGRlZmluZWRcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSB0aGUgbmV3IGNsYXNzXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVnaXN0cnlbIG5hbWUgXSA9IGZ1bmN0aW9uIGNvbnN0cnVjdG9yKCBvcHRzICl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmluaXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCBvcHRzICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnByb3RvdHlwZSA9IG9iamVjdENyZWF0ZSggcGFyZW50ICk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnByb3RvdHlwZSA9IGV4dGVuZChyZXN1bHQucHJvdG90eXBlLCBkZWNvcmF0b3IoIHBhcmVudCwgcmVzdWx0LnByb3RvdHlwZSApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnByb3RvdHlwZS50eXBlID0gdHlwZTtcbiAgICAgICAgICAgIHJlc3VsdC5wcm90b3R5cGUubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgY2ZnID0gZGVjb3JhdG9yIHx8IHt9O1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVnaXN0cnlbIG5hbWUgXTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KXtcblxuICAgICAgICAgICAgICAgIHRocm93ICdFcnJvcjogXCInICsgbmFtZSArICdcIiAnICsgdHlwZSArICcgbm90IGRlZmluZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBjZmcgKSB7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBmcm9tIHRoZSBwcm92aWRlZCBkZWNvcmF0b3JcbiAgICAgICAgICAgIHJldHVybiBuZXcgcmVzdWx0KCBjZmcgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmYWN0b3J5Lm1peGluID0gbWl4aW47XG5cbiAgICByZXR1cm4gZmFjdG9yeTtcbn07XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy91dGlsL2hlbHBlcnMuanNcblxuLyoqXG4gKiBQaHlzaWNzLnV0aWwuaW5kZXhPZiggYXJyLCB2YWx1ZSApIC0+IE51bWJlclxuICogLSBhcnIgKEFycmF5KTogVGhlIGFycmF5IHRvIHNlYXJjaFxuICogLSB2YWx1ZSAoTWl4ZWQpOiBUaGUgdmFsdWUgdG8gZmluZFxuICogKyAoTnVtYmVyKTogVGhlIGluZGV4IG9mIGB2YWx1ZWAgaW4gdGhlIGFycmF5IE9SIGAtMWAgaWYgbm90IGZvdW5kXG4gKlxuICogRmFzdCBpbmRleE9mIGltcGxlbWVudGF0aW9uLlxuICoqL1xuUGh5c2ljcy51dGlsLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mKGFyciwgdmFsdWUpIHtcbiAgICB2YXIgZnIgPSAwLCBiayA9IGFyci5sZW5ndGg7XG4gICAgd2hpbGUgKGZyIDwgYmspIHtcbiAgICAgICAgYmstLTtcbiAgICAgICAgaWYgKGFyclsgZnIgXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJyWyBiayBdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGJrO1xuICAgICAgICB9XG4gICAgICAgIGZyKys7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cblxuLy8gaHR0cDovL2pzcGVyZi5jb20vYXJyYXktZGVzdHJveS84N1xuLyoqXG4gKiBQaHlzaWNzLnV0aWwuY2xlYXJBcnJheSggYXJyICkgLT4gQXJyYXlcbiAqIC0gYXJyIChBcnJheSk6IFRoZSBhcnJheSB0byBjbGVhclxuICogKyAoQXJyYXkpOiBUaGUgYXJyYXkgcGFzc2VkIGluXG4gKlxuICogUXVpY2tseSBjbGVhciBhbiBhcnJheS5cbiAqKi9cblBoeXNpY3MudXRpbC5jbGVhckFycmF5ID0gZnVuY3Rpb24gY2xlYXJBcnJheShhcnIpe1xuICAgIHZhciBsID0gYXJyLmxlbmd0aDtcbiAgICB3aGlsZSggbC0tICl7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogUGh5c2ljcy51dGlsLnRocm90dGxlKCBmbiwgZGVsYXkgKSAtPiBGdW5jdGlvblxuICogLSBmbiAoRnVuY3Rpb24pOiBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGVcbiAqIC0gZGVsYXkgKE51bWJlcik6IFRpbWUgaW4gbWlsbGlzZWNvbmRzXG4gKlxuICogRW5zdXJlIGEgZnVuY3Rpb24gaXMgb25seSBjYWxsZWQgb25jZSBldmVyeSBzcGVjaWZpZWQgdGltZSBzcGFuLlxuICoqL1xuUGh5c2ljcy51dGlsLnRocm90dGxlID0gZnVuY3Rpb24gdGhyb3R0bGUoIGZuLCBkZWxheSwgc2NvcGUgKXtcbiAgICB2YXIgdG9cbiAgICAgICAgLGNhbGwgPSBmYWxzZVxuICAgICAgICAsYXJnc1xuICAgICAgICAsY2IgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCB0byApO1xuICAgICAgICAgICAgaWYgKCBjYWxsICl7XG4gICAgICAgICAgICAgICAgY2FsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRvID0gc2V0VGltZW91dChjYiwgZGVsYXkpO1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KHNjb3BlLCBhcmdzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG8gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICA7XG5cbiAgICBzY29wZSA9IHNjb3BlIHx8IG51bGw7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgY2FsbCA9IHRydWU7XG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIGlmICggIXRvICl7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbi8qKlxuICogUGh5c2ljcy51dGlsLm9wdGlvbnMoIGRlZlssIHRhcmdldF0gKSAtPiBGdW5jdGlvblxuICogLSBkZWYgKE9iamVjdCk6IERlZmF1bHQgb3B0aW9ucyB0byBzZXRcbiAqIC0gdGFyZ2V0IChPYmplY3QpOiBXaGVyZSB0byBjb3B5IHRoZSBvcHRpb25zIHRvLiBEZWZhdWx0cyB0byB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gKiArIChGdW5jdGlvbik6IFRoZSBvcHRpb25zIGZ1bmN0aW9uXG4gKlxuICogT3B0aW9ucyBoZWxwZXIgdG8ga2VlcCB0cmFjayBvZiBvcHRpb25zLiBDYWxsIGl0IHdpdGggYSBjb25maWcgb2JqZWN0LiBBY2Nlc3Mgb3B0aW9ucyBkaXJlY3RseSBvbiB0aGUgZnVuY3Rpb24uXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB0aGlzLm9wdGlvbnMgPSBQaHlzaWNzLnV0aWwub3B0aW9ucyh7IGZvbzogJ2JhcicsIG9wdDogJ2RlZicgfSk7XG4gKiB0aGlzLm9wdGlvbnMoeyBvcHQ6ICdteVZhbCcgfSk7XG4gKlxuICogdGhpcy5vcHRpb25zLmZvbzsgLy8gPT09ICdiYXInXG4gKiB0aGlzLm9wdGlvbnMuZGVmOyAvLyA9PT0gJ215VmFsJ1xuICpcbiAqIC8vIGNhbiBhbHNvIGNoYW5nZSBkZWZhdWx0cyBsYXRlclxuICogdGhpcy5vcHRpb25zLmRlZmF1bHRzKHsgZm9vOiAnYmF6JyB9KTtcbiAqXG4gKiAvLyBjYW4gYWRkIGEgY2hhbmdlIGNhbGxiYWNrXG4gKiB0aGlzLm9wdGlvbnMub25DaGFuZ2UoZnVuY3Rpb24oIG9wdHMgKXtcbiAqICAgICAvLyBzb21lIG9wdGlvbiBjaGFuZ2VkXG4gKiAgICAgLy8gb3B0cyBpcyB0aGUgdGFyZ2V0XG4gKiB9KTtcbiAqIGBgYFxuICoqL1xuLy8gZGVlcCBjb3B5IGNhbGxiYWNrIHRvIGV4dGVuZCBkZWVwZXIgaW50byBvcHRpb25zXG52YXIgZGVlcENvcHlGbiA9IGZ1bmN0aW9uKCBhLCBiICl7XG5cbiAgICBpZiAoIFBoeXNpY3MudXRpbC5pc1BsYWluT2JqZWN0KCBiICkgKXtcblxuICAgICAgICByZXR1cm4gUGh5c2ljcy51dGlsLmV4dGVuZCh7fSwgYSwgYiwgZGVlcENvcHlGbiApO1xuICAgIH1cblxuICAgIHJldHVybiBiICE9PSB1bmRlZmluZWQgPyBiIDogYTtcbn07XG5QaHlzaWNzLnV0aWwub3B0aW9ucyA9IGZ1bmN0aW9uKCBkZWYsIHRhcmdldCApe1xuXG4gICAgdmFyIF9kZWYgPSB7fVxuICAgICAgICAsZm5cbiAgICAgICAgLGNhbGxiYWNrcyA9IFtdXG4gICAgICAgIDtcblxuICAgIC8vIHNldCBvcHRpb25zXG4gICAgZm4gPSBmdW5jdGlvbiBmbiggb3B0aW9ucywgZGVlcCApe1xuXG4gICAgICAgIFBoeXNpY3MudXRpbC5leHRlbmQodGFyZ2V0LCBvcHRpb25zLCBkZWVwID8gZGVlcENvcHlGbiA6IG51bGwpO1xuICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbDsgKytpICl7XG4gICAgICAgICAgICBjYWxsYmFja3NbIGkgXSggdGFyZ2V0ICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xuXG4gICAgLy8gYWRkIGRlZmF1bHRzXG4gICAgZm4uZGVmYXVsdHMgPSBmdW5jdGlvbiBkZWZhdWx0cyggZGVmLCBkZWVwICl7XG4gICAgICAgIFBoeXNpY3MudXRpbC5leHRlbmQoIF9kZWYsIGRlZiwgZGVlcCA/IGRlZXBDb3B5Rm4gOiBudWxsICk7XG4gICAgICAgIFBoeXNpY3MudXRpbC5kZWZhdWx0cyggdGFyZ2V0LCBfZGVmLCBkZWVwID8gZGVlcENvcHlGbiA6IG51bGwgKTtcbiAgICAgICAgcmV0dXJuIF9kZWY7XG4gICAgfTtcblxuICAgIGZuLm9uQ2hhbmdlID0gZnVuY3Rpb24oIGNiICl7XG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKCBjYiApO1xuICAgIH07XG5cbiAgICB0YXJnZXQgPSB0YXJnZXQgfHwgZm47XG5cbiAgICBmbi5kZWZhdWx0cyggZGVmICk7XG5cbiAgICByZXR1cm4gZm47XG59O1xuXG4vKipcbiAqIFBoeXNpY3MudXRpbC5wYWlySGFzaCggaWQxLCBpZDIgKSAtPiBOdW1iZXJcbiAqIC0gaWQxIChOdW1iZXIpOiBUaGUgaWQgb2YgdGhlIGZpcnN0IHRoaW5nXG4gKiAtIGlkMiAoTnVtYmVyKTogVGhlIGlkIG9mIHRoZSBzZWNvbmQgdGhpbmdcbiAqICsgKE51bWJlcik6IEEgdW5pcXVlIG51bWVyaWMgaGFzaCAodmFsaWQgZm9yIHZhbHVlcyA8IDJeMTYpXG4gKlxuICogR2VuZXJhdGUgYSB1bmlxdWUgbnVtZXJpYyBoYXNoIGZyb20gdHdvIGlucHV0IElEcy5cbiAqXG4gKiBVc2VmdWwgZm9yIHNwZWVkeSBpbmRleGluZyBvZiBwYWlycy5cbiAqKi9cblBoeXNpY3MudXRpbC5wYWlySGFzaCA9IGZ1bmN0aW9uKCBpZDEsIGlkMiApe1xuICAgIGlkMSA9IGlkMXwwO1xuICAgIGlkMiA9IGlkMnwwO1xuXG4gICAgaWYgKCAoaWQxfDApID09PSAoaWQyfDApICl7XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8vIHZhbGlkIGZvciB2YWx1ZXMgPCAyXjE2XG4gICAgcmV0dXJuICgoaWQxfDApID4gKGlkMnwwKSA/XG4gICAgICAgIChpZDEgPDwgMTYpIHwgKGlkMiAmIDB4RkZGRikgOlxuICAgICAgICAoaWQyIDw8IDE2KSB8IChpZDEgJiAweEZGRkYpKXwwXG4gICAgICAgIDtcbn07XG5cbi8qKlxuICogUGh5c2ljcy51dGlsLmJpbmQoIGZuLCBzY29wZVssIGFyZ3MuLi4gXSApIC0+IEZ1bmN0aW9uXG4gKiAtIGZuIChGdW5jdGlvbik6IFRoZSBmdW5jdGlvbiB0byBiaW5kIHNjb3BlIHRvXG4gKiAtIHNjb3BlIChPYmplY3QpOiBUaGUgc2NvcGUgdG8gZ2l2ZSB0byBgZm5gXG4gKiAtIGFyZ3MgKE1peGVkKTogQXJndW1lbnRzIHRvIHNlbmQgdG8gYGZuYFxuICpcbiAqIEJpbmQgYSBzY29wZSB0byBhIGZ1bmN0aW9uLlxuICpcbiAqIEJhc2ljYWxseSB0aGUgc2FtZSBmdW5jdGlvbmFsaXR5IGFzIFtGdW5jdGlvbi5wcm90b3R5cGUuYmluZF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRnVuY3Rpb24vYmluZCkuXG4gKiovXG5pZiAoICFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCApe1xuICAgIFBoeXNpY3MudXRpbC5iaW5kID0gZnVuY3Rpb24oIGZuLCBzY29wZSwgYXJncyApe1xuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSggc2NvcGUsIGFyZ3MuY29uY2F0KCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpICkgKTtcbiAgICAgICAgfTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBQaHlzaWNzLnV0aWwuYmluZCA9IGZ1bmN0aW9uKCBmbiwgc2NvcGUsIGFyZ3MgKXtcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKTtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBmbiwgYXJncyApO1xuICAgIH07XG59XG5cbi8qKlxuICogUGh5c2ljcy51dGlsLmZpbmQoIGNvbGxlY3Rpb24sIGZuKCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24gKSApIC0+IE1peGVkXG4gKiAtIGNvbGxlY3Rpb24gKEFycmF5KTogQ29sbGVjdGlvbiBvZiB2YWx1ZXMgdG8gdGVzdFxuICogLSBmbiAoRnVuY3Rpb24pOiBUaGUgdGVzdCBmdW5jdGlvblxuICogLSB2YWx1ZSAoTWl4ZWQpOiBUaGUgdmFsdWUgdG8gdGVzdFxuICogLSBpbmRleCAoTnVtYmVyKTogVGhlIGluZGV4IG9mIHZhbHVlIGluIGNvbGxlY3Rpb25cbiAqIC0gY29sbGVjdGlvbiAoQXJyYXkpOiBUaGUgaW5wdXQgY29sbGVjdGlvblxuICpcbiAqIFRlc3QgYW4gYXJyYXkgb2YgdmFsdWVzIGFnYWluc3QgYSB0ZXN0IGZ1bmN0aW9uXG4gKiBhbmQgcmV0dXJuIHRoZSBmaXJzdCB2YWx1ZSBmb3Igd2hpY2ggdGhlIGZ1bmN0aW9uXG4gKiByZXR1cm5zIHRydWUuXG4gKiovXG5QaHlzaWNzLnV0aWwuZmluZCA9IGZ1bmN0aW9uKCBjb2xsZWN0aW9uLCBmbiApe1xuICAgIHZhciBpXG4gICAgICAgICxsID0gY29sbGVjdGlvbi5sZW5ndGhcbiAgICAgICAgLHZhbFxuICAgICAgICA7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IGw7IGkrKyApe1xuICAgICAgICB2YWwgPSBjb2xsZWN0aW9uWyBpIF07XG4gICAgICAgIGlmICggZm4oIHZhbCwgaSwgY29sbGVjdGlvbiApICl7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBQaHlzaWNzLnV0aWwuZmlsdGVyKCBjb2xsZWN0aW9uLCBmbiggdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uICkgKSAtPiBBcnJheVxuICogLSBjb2xsZWN0aW9uIChBcnJheSk6IENvbGxlY3Rpb24gb2YgdmFsdWVzIHRvIHRlc3RcbiAqIC0gZm4gKEZ1bmN0aW9uKTogVGhlIHRlc3QgZnVuY3Rpb25cbiAqIC0gdmFsdWUgKE1peGVkKTogVGhlIHZhbHVlIHRvIHRlc3RcbiAqIC0gaW5kZXggKE51bWJlcik6IFRoZSBpbmRleCBvZiB2YWx1ZSBpbiBjb2xsZWN0aW9uXG4gKiAtIGNvbGxlY3Rpb24gKEFycmF5KTogVGhlIGlucHV0IGNvbGxlY3Rpb25cbiAqXG4gKiBUZXN0IGFuIGFycmF5IG9mIHZhbHVlcyBhZ2FpbnN0IGEgdGVzdCBmdW5jdGlvblxuICogYW5kIHJldHVybiBhbm90aGVyIGFycmF5IG9mIHZhbHVlcyBmb3Igd2hpY2hcbiAqIHRoZSB0ZXN0IGZ1bmN0aW9uIHJldHVybnMgdHJ1ZS5cbiAqKi9cblBoeXNpY3MudXRpbC5maWx0ZXIgPSBmdW5jdGlvbiggY29sbGVjdGlvbiwgZm4gKXtcbiAgICB2YXIgaVxuICAgICAgICAsbCA9IGNvbGxlY3Rpb24ubGVuZ3RoXG4gICAgICAgICx2YWxcbiAgICAgICAgLG1hdGNoZXMgPSBbXVxuICAgICAgICA7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IGw7IGkrKyApe1xuICAgICAgICB2YWwgPSBjb2xsZWN0aW9uWyBpIF07XG4gICAgICAgIGlmICggZm4oIHZhbCwgaSwgY29sbGVjdGlvbiApICl7XG4gICAgICAgICAgICBtYXRjaGVzLnB1c2goIHZhbCApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZXM7XG59O1xuXG4vLyBsb2Rhc2ggbWV0aG9kc1xuXG4oZnVuY3Rpb24oKXtcbi8qXG4gKiBAbGljZW5zZVxuICogTW9kaWZpZWQgdmVyc2lvbiBvZjpcbiAqIExvLURhc2ggMi40LjEgKEN1c3RvbSBCdWlsZCkgPGh0dHA6Ly9sb2Rhc2guY29tLz5cbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qIFVzZWQgdG8gZGV0ZXJtaW5lIGlmIHZhbHVlcyBhcmUgb2YgdGhlIGxhbmd1YWdlIHR5cGUgT2JqZWN0ICovXG52YXIgb2JqZWN0VHlwZXMgPSB7XG4gICdib29sZWFuJzogZmFsc2UsXG4gICdmdW5jdGlvbic6IHRydWUsXG4gICdvYmplY3QnOiB0cnVlLFxuICAnbnVtYmVyJzogZmFsc2UsXG4gICdzdHJpbmcnOiBmYWxzZSxcbiAgJ3VuZGVmaW5lZCc6IGZhbHNlXG59O1xudmFyIGlkZW50aXR5ID0gZnVuY3Rpb24oYSl7IHJldHVybiBhOyB9O1xudmFyIGFycmF5Q2xhc3MgPSAnW29iamVjdCBBcnJheV0nO1xudmFyIG9iamVjdENsYXNzID0gJ1tvYmplY3QgT2JqZWN0XSc7XG52YXIgbmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4vKiBVc2VkIGFzIHRoZSBzaXplIHdoZW4gb3B0aW1pemF0aW9ucyBhcmUgZW5hYmxlZCBmb3IgbGFyZ2UgYXJyYXlzICovXG52YXIgbGFyZ2VBcnJheVNpemUgPSA3NTtcbi8qIFVzZWQgdG8gcG9vbCBhcnJheXMgYW5kIG9iamVjdHMgdXNlZCBpbnRlcm5hbGx5ICovXG52YXIgYXJyYXlQb29sID0gW10sXG4gICAgb2JqZWN0UG9vbCA9IFtdO1xuLyogVXNlZCBhcyB0aGUgbWF4IHNpemUgb2YgdGhlIGBhcnJheVBvb2xgIGFuZCBgb2JqZWN0UG9vbGAgKi9cbnZhciBtYXhQb29sU2l6ZSA9IDQwO1xudmFyIGtleVByZWZpeCA9ICtuZXcgRGF0ZSgpICsgJyc7XG5cbmZ1bmN0aW9uIHJlbGVhc2VBcnJheShhcnJheSkge1xuICBQaHlzaWNzLnV0aWwuY2xlYXJBcnJheSggYXJyYXkgKTtcbiAgaWYgKGFycmF5UG9vbC5sZW5ndGggPCBtYXhQb29sU2l6ZSkge1xuICAgIGFycmF5UG9vbC5wdXNoKGFycmF5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWxlYXNlT2JqZWN0KG9iamVjdCkge1xuICB2YXIgY2FjaGUgPSBvYmplY3QuY2FjaGU7XG4gIGlmIChjYWNoZSkge1xuICAgIHJlbGVhc2VPYmplY3QoY2FjaGUpO1xuICB9XG4gIG9iamVjdC5hcnJheSA9IG9iamVjdC5jYWNoZSA9IG9iamVjdC5jcml0ZXJpYSA9IG9iamVjdC5vYmplY3QgPSBvYmplY3QubnVtYmVyID0gb2JqZWN0LnN0cmluZyA9IG9iamVjdC52YWx1ZSA9IG51bGw7XG4gIGlmIChvYmplY3RQb29sLmxlbmd0aCA8IG1heFBvb2xTaXplKSB7XG4gICAgb2JqZWN0UG9vbC5wdXNoKG9iamVjdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0KCkge1xuICByZXR1cm4gb2JqZWN0UG9vbC5wb3AoKSB8fCB7XG4gICAgJ2FycmF5JzogbnVsbCxcbiAgICAnY2FjaGUnOiBudWxsLFxuICAgICdjcml0ZXJpYSc6IG51bGwsXG4gICAgJ2ZhbHNlJzogZmFsc2UsXG4gICAgJ2luZGV4JzogMCxcbiAgICAnbnVsbCc6IGZhbHNlLFxuICAgICdudW1iZXInOiBudWxsLFxuICAgICdvYmplY3QnOiBudWxsLFxuICAgICdwdXNoJzogbnVsbCxcbiAgICAnc3RyaW5nJzogbnVsbCxcbiAgICAndHJ1ZSc6IGZhbHNlLFxuICAgICd1bmRlZmluZWQnOiBmYWxzZSxcbiAgICAndmFsdWUnOiBudWxsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEFycmF5KCkge1xuICByZXR1cm4gYXJyYXlQb29sLnBvcCgpIHx8IFtdO1xufVxuXG5mdW5jdGlvbiBjYWNoZUluZGV4T2YoY2FjaGUsIHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBjYWNoZSA9IGNhY2hlLmNhY2hlO1xuXG4gIGlmICh0eXBlID09PSAnYm9vbGVhbicgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBjYWNoZVt2YWx1ZV0gPyAwIDogLTE7XG4gIH1cbiAgaWYgKHR5cGUgIT09ICdudW1iZXInICYmIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdHlwZSA9ICdvYmplY3QnO1xuICB9XG4gIHZhciBrZXkgPSB0eXBlID09PSAnbnVtYmVyJyA/IHZhbHVlIDoga2V5UHJlZml4ICsgdmFsdWU7XG4gIGNhY2hlID0gKGNhY2hlID0gY2FjaGVbdHlwZV0pICYmIGNhY2hlW2tleV07XG5cbiAgcmV0dXJuIHR5cGUgPT09ICdvYmplY3QnID9cbiAgICAoY2FjaGUgJiYgUGh5c2ljcy51dGlsLmluZGV4T2YoY2FjaGUsIHZhbHVlKSA+IC0xID8gMCA6IC0xKSA6XG4gICAgKGNhY2hlID8gMCA6IC0xKTtcbn1cblxuZnVuY3Rpb24gY2FjaGVQdXNoKHZhbHVlKSB7XG4gIHZhciBjYWNoZSA9IHRoaXMuY2FjaGUsXG4gICAgICB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG4gIGlmICh0eXBlID09PSAnYm9vbGVhbicgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIGNhY2hlW3ZhbHVlXSA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGUgIT09ICdudW1iZXInICYmIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0eXBlID0gJ29iamVjdCc7XG4gICAgfVxuICAgIHZhciBrZXkgPSB0eXBlID09PSAnbnVtYmVyJyA/IHZhbHVlIDoga2V5UHJlZml4ICsgdmFsdWUsXG4gICAgICAgIHR5cGVDYWNoZSA9IGNhY2hlW3R5cGVdIHx8IChjYWNoZVt0eXBlXSA9IHt9KTtcblxuICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgKHR5cGVDYWNoZVtrZXldIHx8ICh0eXBlQ2FjaGVba2V5XSA9IFtdKSkucHVzaCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGVDYWNoZVtrZXldID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2FjaGUoYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBmaXJzdCA9IGFycmF5WzBdLFxuICAgICAgbWlkID0gYXJyYXlbKGxlbmd0aCAvIDIpIHwgMF0sXG4gICAgICBsYXN0ID0gYXJyYXlbbGVuZ3RoIC0gMV07XG5cbiAgaWYgKGZpcnN0ICYmIHR5cGVvZiBmaXJzdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIG1pZCAmJiB0eXBlb2YgbWlkID09PSAnb2JqZWN0JyAmJiBsYXN0ICYmIHR5cGVvZiBsYXN0ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgY2FjaGUgPSBnZXRPYmplY3QoKTtcbiAgY2FjaGVbJ2ZhbHNlJ10gPSBjYWNoZVsnbnVsbCddID0gY2FjaGVbJ3RydWUnXSA9IGNhY2hlWyd1bmRlZmluZWQnXSA9IGZhbHNlO1xuXG4gIHZhciByZXN1bHQgPSBnZXRPYmplY3QoKTtcbiAgcmVzdWx0LmFycmF5ID0gYXJyYXk7XG4gIHJlc3VsdC5jYWNoZSA9IGNhY2hlO1xuICByZXN1bHQucHVzaCA9IGNhY2hlUHVzaDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdC5wdXNoKGFycmF5W2luZGV4XSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIHNoaW1LZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBpbmRleCwgaXRlcmFibGUgPSBvYmplY3QsIHJlc3VsdCA9IFtdO1xuICBpZiAoIWl0ZXJhYmxlKXsgcmV0dXJuIHJlc3VsdDsgfVxuICBpZiAoIShvYmplY3RUeXBlc1t0eXBlb2Ygb2JqZWN0XSkpeyByZXR1cm4gcmVzdWx0OyB9XG4gICAgZm9yIChpbmRleCBpbiBpdGVyYWJsZSkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoaXRlcmFibGUsIGluZGV4KSkge1xuICAgICAgICByZXN1bHQucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmICghUGh5c2ljcy51dGlsLmlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbn07XG5cbnZhciBpZENvdW50ZXIgPSAwO1xuLyoqXG4gKiBQaHlzaWNzLnV0aWwudW5pcXVlSWQoIFtwcmVmaXhdICkgLT4gU3RyaW5nXG4gKiAtIHByZWZpeCAoU3RyaW5nKTogUHJlZml4IHRvIHRoZSBpZFxuICpcbiAqIEdlbmVyYXRlIGEgdW5pcXVlIGlkLCBvcHRpb25hbGx5IHByZWZpeGVkLlxuICoqL1xuUGh5c2ljcy51dGlsLnVuaXF1ZUlkID0gZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG4gICAgdmFyIGlkID0gKytpZENvdW50ZXI7XG4gICAgcmV0dXJuICcnICsgKHByZWZpeCB8fCAnJykgKyBpZDtcbn07XG5cbi8qXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yYW5kb21gIHdpdGhvdXQgYXJndW1lbnQganVnZ2xpbmcgb3Igc3VwcG9ydFxuICogZm9yIHJldHVybmluZyBmbG9hdGluZy1wb2ludCBudW1iZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIFRoZSBtaW5pbXVtIHBvc3NpYmxlIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ9IG1heCBUaGUgbWF4aW11bSBwb3NzaWJsZSB2YWx1ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYSByYW5kb20gbnVtYmVyLlxuICovXG5mdW5jdGlvbiBiYXNlUmFuZG9tKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG59XG5cbi8qXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHNodWZmbGVkIHZhbHVlcywgdXNpbmcgYSB2ZXJzaW9uIG9mIHRoZSBGaXNoZXItWWF0ZXNcbiAqIHNodWZmbGUuIFNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlci1ZYXRlc19zaHVmZmxlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzaHVmZmxlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IHNodWZmbGVkIGNvbGxlY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc2h1ZmZsZShbMSwgMiwgMywgNCwgNSwgNl0pO1xuICogLy8gPT4gWzQsIDEsIDYsIDMsIDUsIDJdXG4gKi9cblBoeXNpY3MudXRpbC5zaHVmZmxlID0gZnVuY3Rpb24oY29sbGVjdGlvbikge1xuICAgIHZhciBpbmRleCA9IC0xXG4gICAgICAgICxsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwXG4gICAgICAgICxyZXN1bHQgPSBBcnJheSh0eXBlb2YgbGVuZ3RoID09PSAnbnVtYmVyJyA/IGxlbmd0aCA6IDApXG4gICAgICAgICxpXG4gICAgICAgICxsXG4gICAgICAgICx2YWx1ZVxuICAgICAgICAscmFuZFxuICAgICAgICA7XG5cbiAgICBmb3IgKCBpID0gMCwgbCA9IGNvbGxlY3Rpb24ubGVuZ3RoOyBpIDwgbDsgaSsrICl7XG4gICAgICAgIHZhbHVlID0gY29sbGVjdGlvblsgaSBdO1xuICAgICAgICByYW5kID0gYmFzZVJhbmRvbSgwLCArK2luZGV4KTtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IHJlc3VsdFtyYW5kXTtcbiAgICAgICAgcmVzdWx0W3JhbmRdID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFBoeXNpY3MudXRpbC5pc09iamVjdCggdmFsICkgLT4gQm9vbGVhblxuICogLSB2YWwgKE1peGVkKTogVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICoqL1xuUGh5c2ljcy51dGlsLmlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICAvLyBjaGVjayBpZiB0aGUgdmFsdWUgaXMgdGhlIEVDTUFTY3JpcHQgbGFuZ3VhZ2UgdHlwZSBvZiBPYmplY3RcbiAgICAvLyBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDhcbiAgICAvLyBhbmQgYXZvaWQgYSBWOCBidWdcbiAgICAvLyBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxXG4gICAgcmV0dXJuICEhKHZhbHVlICYmIG9iamVjdFR5cGVzW3R5cGVvZiB2YWx1ZV0pO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogUGh5c2ljcy51dGlsLmlzRnVuY3Rpb24oIHZhbCApIC0+IEJvb2xlYW5cbiAqIC0gdmFsIChNaXhlZCk6IFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb24uXG4gKiovXG5QaHlzaWNzLnV0aWwuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbi8qKlxuICogUGh5c2ljcy51dGlsLmlzQXJyYXkoIHZhbCApIC0+IEJvb2xlYW5cbiAqIC0gdmFsIChNaXhlZCk6IFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIGFycmF5LlxuICoqL1xuUGh5c2ljcy51dGlsLmlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInICYmXG4gICAgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IGFycmF5Q2xhc3MgfHwgZmFsc2U7XG59O1xuXG52YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgU3RyaW5nKHRvU3RyaW5nKVxuICAgIC5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXG4gICAgLnJlcGxhY2UoL3RvU3RyaW5nfCBmb3IgW15cXF1dKy9nLCAnLio/JykgKyAnJCdcbik7XG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHJlTmF0aXZlLnRlc3QodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBzaGltSXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICB2YXIgY3RvcixcbiAgICAgIHJlc3VsdDtcblxuICAvLyBhdm9pZCBub24gT2JqZWN0IG9iamVjdHMsIGBhcmd1bWVudHNgIG9iamVjdHMsIGFuZCBET00gZWxlbWVudHNcbiAgaWYgKCEodmFsdWUgJiYgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IG9iamVjdENsYXNzKSB8fFxuICAgICAgKGN0b3IgPSB2YWx1ZS5jb25zdHJ1Y3RvciwgaXNGdW5jdGlvbihjdG9yKSAmJiAhKGN0b3IgaW5zdGFuY2VvZiBjdG9yKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSW4gbW9zdCBlbnZpcm9ubWVudHMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMgYXJlIGl0ZXJhdGVkIGJlZm9yZVxuICAvLyBpdHMgaW5oZXJpdGVkIHByb3BlcnRpZXMuIElmIHRoZSBsYXN0IGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzXG4gIC8vIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpe1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIHJlc3VsdCA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgcmVzdWx0KTtcbn1cblxuLyoqXG4gKiBQaHlzaWNzLnV0aWwuaXNQbGFpbk9iamVjdCggdmFsICkgLT4gQm9vbGVhblxuICogLSB2YWwgKE1peGVkKTogVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBqYXZhc2NyaXB0IG9iamVjdC5cbiAqKi9cblBoeXNpY3MudXRpbC5pc1BsYWluT2JqZWN0ID0gIU9iamVjdC5nZXRQcm90b3R5cGVPZiA/IHNoaW1Jc1BsYWluT2JqZWN0IDogZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCEodmFsdWUgJiYgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IG9iamVjdENsYXNzKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdmFsdWVPZiA9IHZhbHVlLnZhbHVlT2YsXG4gICAgICBvYmpQcm90byA9IGlzTmF0aXZlKHZhbHVlT2YpICYmIChvYmpQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZU9mKSkgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9ialByb3RvKTtcblxuICByZXR1cm4gb2JqUHJvdG8gP1xuICAgICh2YWx1ZSA9PT0gb2JqUHJvdG8gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKSA9PT0gb2JqUHJvdG8pIDpcbiAgICBzaGltSXNQbGFpbk9iamVjdCh2YWx1ZSk7XG59O1xuXG5mdW5jdGlvbiBiYXNlVW5pcShhcnJheSwgaXNTb3J0ZWQsIGNhbGxiYWNrKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5kZXhPZiA9IFBoeXNpY3MudXRpbC5pbmRleE9mLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgdmFyIGlzTGFyZ2UgPSAhaXNTb3J0ZWQgJiYgbGVuZ3RoID49IGxhcmdlQXJyYXlTaXplICYmIGluZGV4T2YgPT09IFBoeXNpY3MudXRpbC5pbmRleE9mLFxuICAgICAgc2VlbiA9IChjYWxsYmFjayB8fCBpc0xhcmdlKSA/IGdldEFycmF5KCkgOiByZXN1bHQ7XG5cbiAgaWYgKGlzTGFyZ2UpIHtcbiAgICB2YXIgY2FjaGUgPSBjcmVhdGVDYWNoZShzZWVuKTtcbiAgICBpbmRleE9mID0gY2FjaGVJbmRleE9mO1xuICAgIHNlZW4gPSBjYWNoZTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBjYWxsYmFjayA/IGNhbGxiYWNrKHZhbHVlLCBpbmRleCwgYXJyYXkpIDogdmFsdWU7XG5cbiAgICBpZiAoaXNTb3J0ZWQgP1xuICAgICAgICAgICFpbmRleCB8fCBzZWVuW3NlZW4ubGVuZ3RoIC0gMV0gIT09IGNvbXB1dGVkIDpcbiAgICAgICAgICBpbmRleE9mKHNlZW4sIGNvbXB1dGVkKSA8IDBcbiAgICAgICAgKSB7XG4gICAgICBpZiAoY2FsbGJhY2sgfHwgaXNMYXJnZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNMYXJnZSkge1xuICAgIHJlbGVhc2VBcnJheShzZWVuLmFycmF5KTtcbiAgICByZWxlYXNlT2JqZWN0KHNlZW4pO1xuICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgcmVsZWFzZUFycmF5KHNlZW4pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogUGh5c2ljcy51dGlsLnVuaXEoIGFycmF5LCBbaXNTb3J0ZWQsIGNhbGxiYWNrXSApIC0+IEFycmF5XG4gKiAtIGFycmF5IChBcnJheSk6IFRoZSBhcnJheVxuICogLSBpc1NvcnRlZCAoQm9vbGVhbik6IEZsYWcgdG8gaW5kaWNhdGUgdGhlIGFycmF5IGlzIHNvcnRlZFxuICogLSBjYWxsYmFjayAoRnVuY3Rpb24pOiBNYXBwaW5nIGZ1bmN0aW9uXG4gKlxuICogQ3JlYXRlIGFuIGFycmF5IHdpdGhvdXQgZHVwbGljYXRlcy5cbiAqKi9cblBoeXNpY3MudXRpbC51bmlxID0gZnVuY3Rpb24gdW5pcShhcnJheSwgaXNTb3J0ZWQsIGNhbGxiYWNrKSB7XG4gIC8vIGp1Z2dsZSBhcmd1bWVudHNcbiAgaWYgKHR5cGVvZiBpc1NvcnRlZCAhPT0gJ2Jvb2xlYW4nICYmIGlzU29ydGVkICE9IG51bGwpIHtcbiAgICBjYWxsYmFjayA9IGlzU29ydGVkO1xuICAgIGlzU29ydGVkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGJhc2VVbmlxKGFycmF5LCBpc1NvcnRlZCwgY2FsbGJhY2spO1xufTtcblxudmFyIGFzc2lnbiA9IGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBndWFyZCkge1xuICB2YXIgaW5kZXgsIGl0ZXJhYmxlID0gb2JqZWN0LCByZXN1bHQgPSBpdGVyYWJsZTtcbiAgaWYgKCFpdGVyYWJsZSkgeyByZXR1cm4gcmVzdWx0OyB9XG4gIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgYXJnc0luZGV4ID0gMCxcbiAgICAgIGNhbGxiYWNrLFxuICAgICAgYXJnc0xlbmd0aCA9IHR5cGVvZiBndWFyZCA9PT0gJ251bWJlcicgPyAyIDogYXJncy5sZW5ndGg7XG4gIGlmIChhcmdzTGVuZ3RoID4gMiAmJiB0eXBlb2YgYXJnc1thcmdzTGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGFyZ3NbLS1hcmdzTGVuZ3RoXTtcbiAgfVxuICB3aGlsZSAoKythcmdzSW5kZXggPCBhcmdzTGVuZ3RoKSB7XG4gICAgaXRlcmFibGUgPSBhcmdzW2FyZ3NJbmRleF07XG4gICAgaWYgKGl0ZXJhYmxlICYmIG9iamVjdFR5cGVzW3R5cGVvZiBpdGVyYWJsZV0pIHtcbiAgICAgICAgdmFyIG93bkluZGV4ID0gLTEsXG4gICAgICAgICAgICBvd25Qcm9wcyA9IG9iamVjdFR5cGVzW3R5cGVvZiBpdGVyYWJsZV0gJiYga2V5cyhpdGVyYWJsZSksXG4gICAgICAgICAgICBsZW5ndGggPSBvd25Qcm9wcyA/IG93blByb3BzLmxlbmd0aCA6IDA7XG5cbiAgICAgICAgd2hpbGUgKCsrb3duSW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICBpbmRleCA9IG93blByb3BzW293bkluZGV4XTtcbiAgICAgICAgICByZXN1bHRbaW5kZXhdID0gY2FsbGJhY2sgPyBjYWxsYmFjayhyZXN1bHRbaW5kZXhdLCBpdGVyYWJsZVtpbmRleF0pIDogaXRlcmFibGVbaW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFBoeXNpY3MudXRpbC5leHRlbmQoIG9iamVjdCwgc291cmNlLi4uWywgY2FsbGJhY2tdICkgLT4gT2JqZWN0XG4gKiAtIG9iamVjdCAoT2JqZWN0KTogVGhlIGRlc3RpbmF0aW9uIG9iamVjdFxuICogLSBzb3VyY2UgKE9iamVjdCk6IFRoZSBzb3VyY2Ugb2JqZWN0c1xuICogLSBjYWxsYmFjayAoRnVuY3Rpb24pOiBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXNcbiAqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBbbG9kYXNoLmV4dGVuZF0oaHR0cDovL2xvZGFzaC5jb20vZG9jcyNhc3NpZ24pXG4gKiovXG5QaHlzaWNzLnV0aWwuZXh0ZW5kID0gYXNzaWduO1xuXG4vKipcbiAqIFBoeXNpY3MudXRpbC5kZWZhdWx0cyggb2JqZWN0LCBzb3VyY2UuLi5bLCBjYWxsYmFja10gKSAtPiBPYmplY3RcbiAqIC0gb2JqZWN0IChPYmplY3QpOiBUaGUgZGVzdGluYXRpb24gb2JqZWN0XG4gKiAtIHNvdXJjZSAoT2JqZWN0KTogVGhlIHNvdXJjZSBvYmplY3RzXG4gKiAtIGNhbGxiYWNrIChGdW5jdGlvbik6IFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlc1xuICpcbiAqIEltcGxlbWVudGF0aW9uIG9mIFtsb2Rhc2guZGVmYXVsdHNdKGh0dHA6Ly9sb2Rhc2guY29tL2RvY3MjZGVmYXVsdHMpLlxuICoqL1xuUGh5c2ljcy51dGlsLmRlZmF1bHRzID0gZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIGd1YXJkKSB7XG4gIHZhciBpbmRleCwgaXRlcmFibGUgPSBvYmplY3QsIHJlc3VsdCA9IGl0ZXJhYmxlO1xuICBpZiAoIWl0ZXJhYmxlKXsgcmV0dXJuIHJlc3VsdDsgfVxuICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgIGFyZ3NJbmRleCA9IDAsXG4gICAgICBhcmdzTGVuZ3RoID0gdHlwZW9mIGd1YXJkID09PSAnbnVtYmVyJyA/IDIgOiBhcmdzLmxlbmd0aDtcbiAgd2hpbGUgKCsrYXJnc0luZGV4IDwgYXJnc0xlbmd0aCkge1xuICAgIGl0ZXJhYmxlID0gYXJnc1thcmdzSW5kZXhdO1xuICAgIGlmIChpdGVyYWJsZSAmJiBvYmplY3RUeXBlc1t0eXBlb2YgaXRlcmFibGVdKSB7XG4gICAgICAgIHZhciBvd25JbmRleCA9IC0xLFxuICAgICAgICAgICAgb3duUHJvcHMgPSBvYmplY3RUeXBlc1t0eXBlb2YgaXRlcmFibGVdICYmIGtleXMoaXRlcmFibGUpLFxuICAgICAgICAgICAgbGVuZ3RoID0gb3duUHJvcHMgPyBvd25Qcm9wcy5sZW5ndGggOiAwO1xuXG4gICAgICAgIHdoaWxlICgrK293bkluZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgaW5kZXggPSBvd25Qcm9wc1tvd25JbmRleF07XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHRbaW5kZXhdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICByZXN1bHRbaW5kZXhdID0gaXRlcmFibGVbaW5kZXhdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBQaHlzaWNzLnV0aWwuc29ydGVkSW5kZXgoIGFycmF5LCB2YWx1ZVssIGNhbGxiYWNrXSApIC0+IE51bWJlclxuICogLSBhcnJheSAoQXJyYXkpOiBUaGUgYXJyYXkgdG8gaW5zcGVjdFxuICogLSB2YWx1ZSAoTWl4ZWQpOiBUaGUgdmFsdWUgdG8gZXZhbHVhdGVcbiAqIC0gY2FsbGJhY2sgKEZ1bmN0aW9uKTogRnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb25cbiAqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBbbG9kYXNoLnNvcnRlZEluZGV4XShodHRwOi8vbG9kYXNoLmNvbS9kb2NzI3NvcnRlZEluZGV4KS5cbiAqKi9cblBoeXNpY3MudXRpbC5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uIHNvcnRlZEluZGV4KGFycmF5LCB2YWx1ZSwgY2FsbGJhY2spIHtcbiAgdmFyIGxvdyA9IDAsXG4gICAgICBoaWdoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiBsb3c7XG5cbiAgLy8gZXhwbGljaXRseSByZWZlcmVuY2UgYGlkZW50aXR5YCBmb3IgYmV0dGVyIGlubGluaW5nIGluIEZpcmVmb3hcbiAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBpZGVudGl0eTtcbiAgdmFsdWUgPSBjYWxsYmFjayh2YWx1ZSk7XG5cbiAgLyoganNoaW50IC1XMDMwICovXG4gIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgdmFyIG1pZCA9IChsb3cgKyBoaWdoKSA+Pj4gMTtcbiAgICAoY2FsbGJhY2soYXJyYXlbbWlkXSkgPCB2YWx1ZSkgP1xuICAgICAgbG93ID0gbWlkICsgMSA6XG4gICAgICBoaWdoID0gbWlkO1xuICB9XG4gIC8qIGpzaGludCArVzAzMCAqL1xuICByZXR1cm4gbG93O1xufTtcblxufSkoKTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL3V0aWwvc2NyYXRjaHBhZC5qc1xuXG4vKlxuICogc2NyYXRjaHBhZFxuICogdGhyZWFkLXNhZmUgbWFuYWdlbWVudCBvZiB0ZW1wb3JhcnkgKHZvbGV0aWxlKVxuICogb2JqZWN0cyBmb3IgdXNlIGluIGNhbGN1bGF0aW9uc1xuICogaHR0cHM6Ly9naXRodWIuY29tL3dlbGxjYWZmZWluYXRlZC9zY3JhdGNocGFkLmpzXG4gKi9cblBoeXNpY3Muc2NyYXRjaHBhZCA9IChmdW5jdGlvbigpe1xuXG4gICAgLy8gRXJyb3JzXG4gICAgdmFyIFNDUkFUQ0hfVVNBR0VfRVJST1IgPSAnRXJyb3I6IFNjcmF0Y2hwYWQgdXNlZCBhZnRlciAuZG9uZSgpIGNhbGxlZC4gKENvdWxkIGl0IGJlIHVuaW50ZW50aW9uYWxseSBzY29wZWQ/KSc7XG4gICAgdmFyIFNDUkFUQ0hfSU5ERVhfT1VUX09GX0JPVU5EUyA9ICdFcnJvcjogU2NyYXRjaHBhZCB1c2FnZSBzcGFjZSBvdXQgb2YgYm91bmRzLiAoRGlkIHlvdSBmb3JnZXQgdG8gY2FsbCAuZG9uZSgpPyknO1xuICAgIHZhciBTQ1JBVENIX01BWF9SRUFDSEVEID0gJ0Vycm9yOiBUb28gbWFueSBzY3JhdGNocGFkcyBjcmVhdGVkLiAoRGlkIHlvdSBmb3JnZXQgdG8gY2FsbCAuZG9uZSgpPyknO1xuICAgIHZhciBBTFJFQURZX0RFRklORURfRVJST1IgPSAnRXJyb3I6IE9iamVjdCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQuJztcblxuICAgIC8vIGNhY2hlIHByZXZpb3VzbHkgY3JlYXRlZCBzY3JhdGNoZXNcbiAgICB2YXIgc2NyYXRjaGVzID0gW107XG4gICAgdmFyIG51bVNjcmF0Y2hlcyA9IDA7XG4gICAgdmFyIFNjcmF0Y2gsIFNjcmF0Y2hwYWQ7XG5cbiAgICB2YXIgcmVnSW5kZXggPSAwO1xuXG5cbiAgICAvKiogYmVsb25ncyB0bzogUGh5c2ljcy5zY3JhdGNocGFkXG4gICAgICogY2xhc3MgU2NyYXRjaFxuICAgICAqXG4gICAgICogQSBzY3JhdGNocGFkIHNlc3Npb24uXG4gICAgICpcbiAgICAgKiBUaGlzIGNsYXNzIGtlZXBzIHRyYWNrIG9mIHRlbXBvcmFyeSBvYmplY3RzIHVzZWRcbiAgICAgKiBpbiB0aGlzIHNlc3Npb24gYW5kIHJlbGVhc2VzIHRoZW0gd2hlbiBmaW5pc2hlZCAoY2FsbCB0byBgLmRvbmUoKWApLlxuICAgICAqXG4gICAgICogVXNlIHRoaXMgdG8gcmV0cmlldmUgdGVtcG9yYXJ5IG9iamVjdHM6XG4gICAgICogLSBgLnZlY3RvcigpYDogcmV0cmlldmUgYSB0ZW1wb3JhcnkgW1tQaHlzaWNzLnZlY3Rvcl1dXG4gICAgICogLSBgLnRyYW5zZm9ybSgpYDogcmV0cmlldmUgYSB0ZW1wb3JhcnkgW1tQaHlzaWNzLnRyYW5zZm9ybV1dXG4gICAgICpcbiAgICAgKiBTZWUgW1tQaHlzaWNzLnNjcmF0Y2hwYWRdXSBmb3IgbW9yZSBpbmZvLlxuICAgICAqKi9cbiAgICBTY3JhdGNoID0gZnVuY3Rpb24gU2NyYXRjaCgpe1xuXG4gICAgICAgIC8vIHByaXZhdGUgdmFyaWFibGVzXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbmRleEFyciA9IFtdO1xuXG4gICAgICAgIGlmICgrK251bVNjcmF0Y2hlcyA+PSBTY3JhdGNocGFkLm1heFNjcmF0Y2hlcyl7XG4gICAgICAgICAgICB0aHJvdyBTQ1JBVENIX01BWF9SRUFDSEVEO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNjcmF0Y2gucHJvdG90eXBlID0ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTY3JhdGNoI2RvbmUoIFt2YWxdICkgLT4gTWl4ZWRcbiAgICAgICAgICogLSB2YWwgKE1peGVkKTogTm8gZWZmZWN0IG9uIHRoaXMgbWV0aG9kLCBqdXN0IHBhc3NlZCBvbiB0byB0aGUgcmV0dXJuIHZhbHVlIHNvIHlvdSBjYW4gZG8gdGhpbmdzIGxpa2U6XG4gICAgICAgICByZXR1cm4gc2NyYXRjaC5kb25lKCBteVJldHVyblZhbCApO1xuICAgICAgICAgKiArIChNaXhlZCk6IFdoYXRldmVyIHlvdSBzcGVjaWZpZWQgYXMgYHZhbGBcbiAgICAgICAgICpcbiAgICAgICAgICogRGVjbGFyZSB0aGF0IHlvdXIgd29yayBpcyBmaW5pc2hlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogUmVsZWFzZSB0ZW1wIG9iamVjdHMgZm9yIHVzZSBlbHNld2hlcmUuIE11c3QgYmUgY2FsbGVkIHdoZW4gaW1tZWRpYXRlIHdvcmsgaXMgZG9uZS5cbiAgICAgICAgICpcbiAgICAgICAgICogWW91IGNhbiB3cmFwIHRoZSByZXR1cm4gdmFsdWUgaW4gc2NyYXRjaC5kb25lKCkgc28gdGhhdCB5b3UgZG9uJ3QgZm9yZ2V0IHRvIGNhbGwgaXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEV4YW1wbGU6XG4gICAgICAgICAqXG4gICAgICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgICAgICogcmV0dXJuIHNjcmF0Y2guZG9uZSggbXlSZXR1cm5WYWx1ZSApO1xuICAgICAgICAgKiBgYGBcbiAgICAgICAgICoqL1xuICAgICAgICBkb25lOiBmdW5jdGlvbiggdmFsICl7XG5cbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHM7XG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCByZWdJbmRleDsgKytpICl7XG5cbiAgICAgICAgICAgICAgICB0aGlzWyBpIF0gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgaXQgYmFjayB0byB0aGUgc2NyYXRjaCBzdGFjayBmb3IgZnV0dXJlIHVzZVxuICAgICAgICAgICAgc2NyYXRjaGVzLnB1c2goIHRoaXMgKTtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvLyBBUElcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3Muc2NyYXRjaHBhZCggW2ZuXSApIC0+IFNjcmF0Y2h8RnVuY3Rpb25cbiAgICAgKiAtIGZuIChGdW5jdGlvbik6IFNvbWUgZnVuY3Rpb24geW91J2QgbGlrZSB0byB3cmFwIGluIGEgc2NyYXRjaCBzZXNzaW9uLiBGaXJzdCBhcmd1bWVudCBpcyB0aGUgc2NyYXRjaCBpbnN0YW5jZS5cbiAgICAgKiArIChGdW5jdGlvbik6IFRoZSB3cmFwcGVkIGZ1bmN0aW9uIChpZiBgZm5gIGFyZyBzcGVjaWZpZWQpIHRoYXQgY2FuIGJlIHJldXNlZCBsaWtlIHRoZSBvcmlnaW5hbCBtaW51cyB0aGUgZmlyc3QgKHNjcmF0Y2gpIHBhcmFtZXRlci5cbiAgICAgKiArIChTY3JhdGNoKTogVGhlIHNjcmF0Y2ggc2Vzc2lvbi5cbiAgICAgKlxuICAgICAqIEdldCBhIG5ldyBzY3JhdGNoIHNlc3Npb24gdG8gd29yayBmcm9tIG9yIHdyYXAgYSBmdW5jdGlvbiBpbiBhIHNjcmF0Y2ggc2Vzc2lvbi5cbiAgICAgKlxuICAgICAqIENhbGwgYC5kb25lKClgIG9uIGl0IHdoZW4gZmluaXNoZWQuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIGdldCBhIHNjcmF0Y2ggc2Vzc2lvbiBtYW51YWxseVxuICAgICAqIHZhciBteUFsZyA9IGZ1bmN0aW9uKCBzY3JhdGNoLCBhcmcxLCBhcmcyLCAuLi4gKXtcbiAgICAgKiAgICAgdmFyIHNjcmF0Y2ggPSBQaHlzaWNzLnNjcmF0Y2hwYWQoKVxuICAgICAqICAgICAsdmVjID0gc2NyYXRjaC52ZWN0b3IoKS5zZXQoIDAsIDAgKSAvLyBuZWVkIHRvIHJlaW5pdGlhbGl6ZS4uLiBpdCdzIHJlY3ljbGVkIVxuICAgICAqICAgICA7XG4gICAgICogICAgIC8vIC4uLlxuICAgICAqICAgICByZXR1cm4gc2NyYXRjaC5kb25lKCByZXN1bHQgKTtcbiAgICAgKiB9O1xuICAgICAqIC8vIGxhdGVyLi4uXG4gICAgICogd2hpbGUoIGF3ZXNvbWUgKXtcbiAgICAgKiAgICAgbXlBbGcoIGFyZzEsIGFyZzIsIC4uLiApO1xuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gd3JhcCBhIGZ1bmN0aW9uIGluIGEgc2NyYXRjaCBzZXNzaW9uXG4gICAgICogdmFyIG15QWxnID0gUGh5c2ljcy5zY3JhdGNocGFkKGZ1bmN0aW9uKCBzY3JhdGNoLCBhcmcxLCBhcmcyLCAuLi4gKXtcbiAgICAgKiAgICAgdmFyIHZlYyA9IHNjcmF0Y2gudmVjdG9yKCkuc2V0KCAwLCAwICk7IC8vIG5lZWQgdG8gcmVpbml0aWFsaXplLi4uIGl0J3MgcmVjeWNsZWQhXG4gICAgICogICAgIC8vLi4uXG4gICAgICogICAgIHJldHVybiByZXN1bHQ7XG4gICAgICogfSk7XG4gICAgICogLy8gbGF0ZXIuLi5cbiAgICAgKiB3aGlsZSggYXdlc29tZSApe1xuICAgICAqICAgICBteUFsZyggYXJnMSwgYXJnMiwgLi4uICk7XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqKi9cbiAgICBTY3JhdGNocGFkID0gZnVuY3Rpb24gU2NyYXRjaHBhZCggZm4gKXtcblxuICAgICAgICBpZiAoIGZuICl7XG4gICAgICAgICAgICByZXR1cm4gU2NyYXRjaHBhZC5mbiggZm4gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzY3JhdGNoID0gc2NyYXRjaGVzLnBvcCgpIHx8IG5ldyBTY3JhdGNoKCk7XG4gICAgICAgIHNjcmF0Y2guX2FjdGl2ZSA9IHRydWU7XG4gICAgICAgIHJldHVybiBzY3JhdGNoO1xuICAgIH07XG5cbiAgICAvLyBvcHRpb25zXG4gICAgU2NyYXRjaHBhZC5tYXhTY3JhdGNoZXMgPSAxMDA7IC8vIG1heGltdW0gbnVtYmVyIG9mIHNjcmF0Y2hlc1xuICAgIFNjcmF0Y2hwYWQubWF4SW5kZXggPSAyMDsgLy8gbWF4aW11bSBudW1iZXIgb2YgYW55IHR5cGUgb2YgdGVtcCBvYmplY3RzXG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnNjcmF0Y2hwYWQuZm4oIGZuICkgLT4gRnVuY3Rpb25cbiAgICAgKiAtIGZuIChGdW5jdGlvbik6IFNvbWUgZnVuY3Rpb24geW91J2QgbGlrZSB0byB3cmFwIGluIGEgc2NyYXRjaCBzZXNzaW9uLiBGaXJzdCBhcmd1bWVudCBpcyB0aGUgc2NyYXRjaCBpbnN0YW5jZS4gU2VlIFtbUGh5c2ljcy5zY3JhdGNocGFkXV0uXG4gICAgICogKyAoRnVuY3Rpb24pOiBUaGUgd3JhcHBlZCBmdW5jdGlvbiB0aGF0IGNhbiBiZSByZXVzZWQgbGlrZSB0aGUgb3JpZ2luYWwgbWludXMgdGhlIGZpcnN0IChzY3JhdGNoKSBwYXJhbWV0ZXIuXG4gICAgICpcbiAgICAgKiBXcmFwIGEgZnVuY3Rpb24gaW4gYSBzY3JhdGNoIHNlc3Npb24uXG4gICAgICpcbiAgICAgKiBTYW1lIGFzIGNhbGxpbmcgYFBoeXNpY3Muc2NyYXRjaHBhZCggZm4gKWAgd2l0aCBhIGZ1bmN0aW9uIHNwZWNpZmllZC5cbiAgICAgKiovXG4gICAgU2NyYXRjaHBhZC5mbiA9IGZ1bmN0aW9uKCBmbiApe1xuXG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGZuLmxlbmd0aDsgaSA8IGw7IGkrKyApe1xuICAgICAgICAgICAgYXJncy5wdXNoKCBpICk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzID0gJ2EnICsgYXJncy5qb2luKCcsYScpO1xuICAgICAgICAvKiBqc2hpbnQgLVcwNTQgKi9cbiAgICAgICAgdmFyIGhhbmRsZSA9IG5ldyBGdW5jdGlvbignZm4sIHNjcmF0Y2hlcywgU2NyYXRjaCcsICdyZXR1cm4gZnVuY3Rpb24oJythcmdzKycpeyAnK1xuICAgICAgICAgICAgICAgJ3ZhciBzY3JhdGNoID0gc2NyYXRjaGVzLnBvcCgpIHx8IG5ldyBTY3JhdGNoKCBzY3JhdGNoZXMgKTsnK1xuICAgICAgICAgICAgICAgJ3NjcmF0Y2guX2FjdGl2ZSA9IHRydWU7JytcbiAgICAgICAgICAgICAgICdyZXR1cm4gc2NyYXRjaC5kb25lKCBmbihzY3JhdGNoLCAnK2FyZ3MrJykgKTsnK1xuICAgICAgICAgICAnfTsnXG4gICAgICAgICk7XG4gICAgICAgIC8qIGpzaGludCArVzA1NCAqL1xuXG4gICAgICAgIHJldHVybiBoYW5kbGUoZm4sIHNjcmF0Y2hlcywgU2NyYXRjaCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3Muc2NyYXRjaHBhZC5yZWdpc3RlciggbmFtZSwgY29uc3RydWN0b3IgKVxuICAgICAqIC0gbmFtZSAoU3RyaW5nKTogTmFtZSBvZiB0aGUgb2JqZWN0IGNsYXNzXG4gICAgICogLSBjb25zdHJ1Y3RvciAoRnVuY3Rpb24pOiBUaGUgb2JqZWN0IGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBSZWdpc3RlciBhIG5ldyBvYmplY3QgdG8gYmUgaW5jbHVkZWQgaW4gc2NyYXRjaHBhZHMuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIHJlZ2lzdGVyIGEgaHlwb3RoZXRpY2FsIHZlY3RvciBjbGFzcy4uLlxuICAgICAqIFBoeXNpY3Muc2NyYXRjaHBhZC5yZWdpc3RlcigndmVjdG9yJywgVmVjdG9yKTtcbiAgICAgKiBgYGBcbiAgICAgKiovXG4gICAgU2NyYXRjaHBhZC5yZWdpc3RlciA9IGZ1bmN0aW9uIHJlZ2lzdGVyKCBuYW1lLCBjb25zdHJ1Y3Rvciwgb3B0aW9ucyApe1xuXG4gICAgICAgIHZhciBwcm90byA9IFNjcmF0Y2gucHJvdG90eXBlXG4gICAgICAgICAgICAsaWR4ID0gcmVnSW5kZXgrKyAvLyBpbmNyZWFzZSB0aGUgc2NyYXRjaCB0eXBlIGluZGV4XG4gICAgICAgICAgICAsc3RhY2tuYW1lID0gJ18nICsgbmFtZSArICdTdGFjaycgLy8gdGhlIG5hbWUgb2YgdGhlIGFycmF5IHN0YWNrXG4gICAgICAgICAgICAsdXNlRmFjdG9yeSA9IG9wdGlvbnMgJiYgb3B0aW9ucy51c2VGYWN0b3J5XG4gICAgICAgICAgICA7XG5cbiAgICAgICAgaWYgKCBuYW1lIGluIHByb3RvICkge1xuICAgICAgICAgICAgdGhyb3cgQUxSRUFEWV9ERUZJTkVEX0VSUk9SO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9uIHRoZSBwcm90b3R5cGVcbiAgICAgICAgU2NyYXRjaC5wcm90b3R5cGVbIG5hbWUgXSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgc3RhY2sgKG9yIGluaXRpYWxpemUgaXQpXG4gICAgICAgICAgICB2YXIgc3RhY2sgPSB0aGlzWyBzdGFja25hbWUgXSB8fCAodGhpc1sgc3RhY2tuYW1lIF0gPSBbXSlcbiAgICAgICAgICAgICAgICAvLyB3ZSBpbmNyZWFzZSB0aGlzIGluZGV4IGV2ZXJ5IHRpbWUgYSB2b2xldGlsZSBvYmplY3QgaXMgcmVxdWVzdGVkXG4gICAgICAgICAgICAgICAgLy8gc2VlbXMgd2VpcmQgdG8gc3RvcmUgaXQgb24gdGhpcyBhcyBhIG51bWJlciAoaWU6IHRoaXMuMCwgdGhpcy4xKS4uLlxuICAgICAgICAgICAgICAgIC8vIGJ1dCBhY3R1YWxseSBpdCdzIGZhc3Rlci4uLlxuICAgICAgICAgICAgICAgICxzdGFja0luZGV4ID0gdGhpc1sgaWR4IF0gfCAwXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICB0aGlzWyBpZHggXSA9IHN0YWNrSW5kZXggKyAxO1xuXG4gICAgICAgICAgICAvLyBpZiB1c2VkIGFmdGVyIGNhbGxpbmcgZG9uZS4uLlxuICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmUpe1xuICAgICAgICAgICAgICAgIHRocm93IFNDUkFUQ0hfVVNBR0VfRVJST1I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRvbyBtYW55IG9iamVjdHMgY3JlYXRlZC4uLlxuICAgICAgICAgICAgaWYgKHN0YWNrSW5kZXggPj0gU2NyYXRjaHBhZC5tYXhJbmRleCl7XG4gICAgICAgICAgICAgICAgdGhyb3cgU0NSQVRDSF9JTkRFWF9PVVRfT0ZfQk9VTkRTO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZXR1cm4gb3IgY3JlYXRlIG5ldyBpbnN0YW5jZVxuICAgICAgICAgICAgcmV0dXJuIHN0YWNrWyBzdGFja0luZGV4IF0gfHxcbiAgICAgICAgICAgICAgICAgICAgKHN0YWNrWyBzdGFja0luZGV4IF0gPSB1c2VGYWN0b3J5ID8gY29uc3RydWN0b3IoKSA6IG5ldyBjb25zdHJ1Y3RvcigpICk7XG4gICAgICAgIH07XG5cbiAgICB9O1xuXG4gICAgLy8gcmVnaXN0ZXIgc29tZSBjbGFzc2VzXG4gICAgU2NyYXRjaHBhZC5yZWdpc3RlcigndmVjdG9yJywgUGh5c2ljcy52ZWN0b3IpO1xuICAgIFNjcmF0Y2hwYWQucmVnaXN0ZXIoJ3RyYW5zZm9ybScsIFBoeXNpY3MudHJhbnNmb3JtKTtcblxuICAgIHJldHVybiBTY3JhdGNocGFkO1xuXG59KSgpO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvdXRpbC9wdWJzdWIuanNcblxuKGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgZGVmYXVsdFByaW9yaXR5ID0gMTtcblxuICAgIGZ1bmN0aW9uIGdldFByaW9yaXR5KCB2YWwgKXtcbiAgICAgICAgcmV0dXJuIHZhbC5fcHJpb3JpdHlfO1xuICAgIH1cblxuICAgIC8vIHJlZ2lzdGVyIGEgbmV3IHNjcmF0Y2ggb2JqZWN0IHNvIHdlIGNhbiByZXVzZSBldmVudCBkYXRhXG4gICAgUGh5c2ljcy5zY3JhdGNocGFkLnJlZ2lzdGVyKCdldmVudCcsIGZ1bmN0aW9uKCl7IHJldHVybiB7fTsgfSwgeyB1c2VGYWN0b3J5OiB0cnVlIH0pO1xuXG4gICAgLyoqXG4gICAgICogY2xhc3MgUGh5c2ljcy51dGlsLnB1YnN1YlxuICAgICAqXG4gICAgICogRmFzdCBwdWJzdWIgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBDYW4gYmUgbWl4ZWQgaW50byBvdGhlciBjbGFzc2VzIGVhc2lseS5cbiAgICAgKiovXG4gICAgdmFyIFB1YlN1YiA9IGZ1bmN0aW9uIFB1YlN1Yigpe1xuXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQdWJTdWIpKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHViU3ViKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgUHViU3ViLnByb3RvdHlwZSA9IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGh5c2ljcy51dGlsLnB1YnN1YiNvbiggdG9waWMsIGZuKCBkYXRhLCBldmVudCApWywgc2NvcGUsIHByaW9yaXR5XSApIC0+IHRoaXNcbiAgICAgICAgICogUGh5c2ljcy51dGlsLnB1YnN1YiNvbiggdG9waWNDb25maWdbLCBzY29wZSwgcHJpb3JpdHldICkgLT4gdGhpc1xuICAgICAgICAgKiAtIHRvcGljIChTdHJpbmcpOiBUaGUgdG9waWMgbmFtZVxuICAgICAgICAgKiAtIHRvcGljQ29uZmlnIChPYmplY3QpOiBBIGNvbmZpZyB3aXRoIGtleS92YWx1ZSBwYWlycyBvZiBgeyB0b3BpYzogY2FsbGJhY2tGbiwgLi4uIH1gXG4gICAgICAgICAqIC0gZm4gKEZ1bmN0aW9uKTogVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIChpZiBub3QgdXNpbmcgT2JqZWN0IGFzIHByZXZpb3VzIGFyZ3VtZW50KVxuICAgICAgICAgKiAtIGRhdGEgKE1peGVkKTogVGhlIGRhdGEgc2VudCBmcm9tIHRoZSBjYWxsIHRvIGAuZW1pdCgpYFxuICAgICAgICAgKiAtIGV2ZW50IChPYmplY3QpOiBFdmVudCBkYXRhLCBob2xkaW5nIGAudG9waWNgLCB0aGUgdG9waWMsIGFuZCBgLmhhbmRsZXJgLCB0aGUgYGZuYCBjYWxsYmFjay5cbiAgICAgICAgICogLSBzY29wZSAoT2JqZWN0KTogVGhlIHNjb3BlIHRvIGJpbmQgY2FsbGJhY2sgdG9cbiAgICAgICAgICogLSBwcmlvcml0eSAoTnVtYmVyKTogVGhlIHByaW9yaXR5IG9mIHRoZSBjYWxsYmFjayAoaGlnaGVyIGlzIGVhcmxpZXIpXG4gICAgICAgICAqXG4gICAgICAgICAqIFN1YnNjcmliZSBjYWxsYmFjayhzKSB0byBhIHRvcGljKHMpLlxuICAgICAgICAgKiovXG4gICAgICAgIG9uOiBmdW5jdGlvbiggdG9waWMsIGZuLCBzY29wZSwgcHJpb3JpdHkgKXtcblxuICAgICAgICAgICAgdmFyIGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgICxvcmlnXG4gICAgICAgICAgICAgICAgLGlkeFxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgLy8gZW5zdXJlIHRvcGljcyBoYXNoIGlzIGluaXRpYWxpemVkXG4gICAgICAgICAgICB0aGlzLl90b3BpY3MgPSB0aGlzLl90b3BpY3MgfHwgKHRoaXMuX3RvcGljcyA9IHt9KTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UncmUgc3Vic2NyaWJpbmcgdG8gbXVsdGlwbGUgdG9waWNzXG4gICAgICAgICAgICAvLyB3aXRoIGFuIG9iamVjdFxuICAgICAgICAgICAgaWYgKCBQaHlzaWNzLnV0aWwuaXNPYmplY3QoIHRvcGljICkgKXtcblxuICAgICAgICAgICAgICAgIGZvciAoIHZhciB0IGluIHRvcGljICl7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbiggdCwgdG9waWNbIHQgXSwgZm4sIHNjb3BlICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX3RvcGljc1sgdG9waWMgXSB8fCAodGhpcy5fdG9waWNzWyB0b3BpYyBdID0gW10pO1xuICAgICAgICAgICAgb3JpZyA9IGZuO1xuXG4gICAgICAgICAgICBpZiAoIFBoeXNpY3MudXRpbC5pc09iamVjdCggc2NvcGUgKSApe1xuXG4gICAgICAgICAgICAgICAgZm4gPSBQaHlzaWNzLnV0aWwuYmluZCggZm4sIHNjb3BlICk7XG4gICAgICAgICAgICAgICAgZm4uX2JpbmRmbl8gPSBvcmlnO1xuICAgICAgICAgICAgICAgIGZuLl9vbmVfID0gb3JpZy5fb25lXztcbiAgICAgICAgICAgICAgICBmbi5fc2NvcGVfID0gc2NvcGU7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHByaW9yaXR5ID09PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgICAgICBwcmlvcml0eSA9IHNjb3BlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmbi5fcHJpb3JpdHlfID0gcHJpb3JpdHkgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRQcmlvcml0eSA6IHByaW9yaXR5O1xuXG4gICAgICAgICAgICBpZHggPSBQaHlzaWNzLnV0aWwuc29ydGVkSW5kZXgoIGxpc3RlbmVycywgZm4sIGdldFByaW9yaXR5ICk7XG5cbiAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoIGlkeCwgMCwgZm4gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaHlzaWNzLnV0aWwucHVic3ViI29mZiggdG9waWMsIGZuWywgc2NvcGVdICkgLT4gdGhpc1xuICAgICAgICAgKiBQaHlzaWNzLnV0aWwucHVic3ViI29mZiggdG9waWNDZmcgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gdG9waWMgKFN0cmluZyk6IHRvcGljIFRoZSB0b3BpYyBuYW1lLiBTcGVjaWZ5IGB0cnVlYCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgYWxsIHRvcGljc1xuICAgICAgICAgKiAtIHRvcGljQ2ZnIChPYmplY3QpOiBBIGNvbmZpZyB3aXRoIGtleS92YWx1ZSBwYWlycyBvZiBgeyB0b3BpYzogY2FsbGJhY2tGbiwgLi4uIH1gXG4gICAgICAgICAqIC0gZm4gKEZ1bmN0aW9uKTogVGhlIG9yaWdpbmFsIGNhbGxiYWNrIGZ1bmN0aW9uLiBTcGVjaWZ5IGB0cnVlYCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3Igc3BlY2lmaWVkIHRvcGljXG4gICAgICAgICAqIC0gc2NvcGUgKE9iamVjdCk6IFRoZSBzY29wZSB0aGUgY2FsbGJhY2sgd2FzIGJvdW5kIHRvLiBUaGlzIGlzIGltcG9ydGFudCBpZiB5b3UgYXJlIGJpbmRpbmcgbWV0aG9kcyB0aGF0IGNvbWUgZnJvbSBvYmplY3QgcHJvdG90eXBlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogVW5zdWJzY3JpYmUgY2FsbGJhY2socykgZnJvbSB0b3BpYyhzKS5cbiAgICAgICAgICoqL1xuICAgICAgICBvZmY6IGZ1bmN0aW9uKCB0b3BpYywgZm4sIHNjb3BlICl7XG5cbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAsbGlzdG5cbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGlmICggIXRoaXMuX3RvcGljcyApe1xuICAgICAgICAgICAgICAgIC8vIG5vdGhpbmcgc3Vic2NyaWJlZFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRvcGljID09PSB0cnVlICl7XG4gICAgICAgICAgICAgICAgLy8gcHVyZ2UgYWxsIGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvcGljcyA9IHt9O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSdyZSBzdWJzY3JpYmluZyB0byBtdWx0aXBsZSB0b3BpY3NcbiAgICAgICAgICAgIC8vIHdpdGggYW4gb2JqZWN0XG4gICAgICAgICAgICBpZiAoIFBoeXNpY3MudXRpbC5pc09iamVjdCggdG9waWMgKSApe1xuXG4gICAgICAgICAgICAgICAgZm9yICggdmFyIHQgaW4gdG9waWMgKXtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZiggdCwgdG9waWNbIHQgXSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl90b3BpY3NbIHRvcGljIF07XG5cbiAgICAgICAgICAgIGlmICghbGlzdGVuZXJzKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBmbiA9PT0gdHJ1ZSApe1xuICAgICAgICAgICAgICAgIC8vIHB1cmdlIGFsbCBsaXN0ZW5lcnMgZm9yIHRvcGljXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9waWNzWyB0b3BpYyBdID0gW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyBpKysgKXtcblxuICAgICAgICAgICAgICAgIGxpc3RuID0gbGlzdGVuZXJzWyBpIF07XG5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIChsaXN0bi5fYmluZGZuXyA9PT0gZm4gfHwgbGlzdG4gPT09IGZuKSAmJlxuICAgICAgICAgICAgICAgICAgICAoICghc2NvcGUpIHx8IGxpc3RuLl9zY29wZV8gPT09IHNjb3BlKSAvLyBjaGVjayB0aGUgc2NvcGUgdG9vIGlmIHNwZWNpZmllZFxuICAgICAgICAgICAgICAgICl7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoIGksIDEgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGh5c2ljcy51dGlsLnB1YnN1YiNlbWl0KCB0b3BpY1ssIGRhdGFdICkgLT4gdGhpc1xuICAgICAgICAgKiAtIHRvcGljIChTdHJpbmcpOiBUaGUgdG9waWMgbmFtZVxuICAgICAgICAgKiAtIGRhdGEgKE1peGVkKTogVGhlIGRhdGEgdG8gc2VuZFxuICAgICAgICAgKlxuICAgICAgICAgKiBQdWJsaXNoIGRhdGEgdG8gYSB0b3BpYy5cbiAgICAgICAgICoqL1xuICAgICAgICBlbWl0OiBmdW5jdGlvbiggdG9waWMsIGRhdGEgKXtcblxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fdG9waWNzICl7XG4gICAgICAgICAgICAgICAgLy8gbm90aGluZyBzdWJzY3JpYmVkXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl90b3BpY3NbIHRvcGljIF1cbiAgICAgICAgICAgICAgICAsbCA9IGxpc3RlbmVycyAmJiBsaXN0ZW5lcnMubGVuZ3RoXG4gICAgICAgICAgICAgICAgLGhhbmRsZXJcbiAgICAgICAgICAgICAgICAsZVxuICAgICAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGlmICggIWwgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NyYXRjaC5kb25lKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlID0gc2NyYXRjaC5ldmVudCgpO1xuICAgICAgICAgICAgLy8gZXZlbnQgZGF0YVxuICAgICAgICAgICAgZS50b3BpYyA9IHRvcGljO1xuICAgICAgICAgICAgZS5oYW5kbGVyID0gaGFuZGxlcjtcblxuICAgICAgICAgICAgLy8gcmV2ZXJzZSBpdGVyYXRlIHNvIHByaW9yaXRpZXMgd29yayBvdXQgY29ycmVjdGx5XG4gICAgICAgICAgICB3aGlsZSAoIGwtLSApe1xuXG4gICAgICAgICAgICAgICAgaGFuZGxlciA9IGxpc3RlbmVyc1sgbCBdO1xuICAgICAgICAgICAgICAgIGhhbmRsZXIoIGRhdGEsIGUgKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIF9vbmVfIGZsYWcgaXMgc2V0LCB0aGUgdW5zdWJzY3JpYmVcbiAgICAgICAgICAgICAgICBpZiAoIGhhbmRsZXIuX29uZV8gKXtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZSggbCwgMSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNjcmF0Y2guZG9uZSh0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGh5c2ljcy51dGlsLnB1YnN1YiNvbmUoIHRvcGljLCBmbiggZGF0YSwgZXZlbnQgKVssIHNjb3BlLCBwcmlvcml0eV0gKSAtPiB0aGlzXG4gICAgICAgICAqIFBoeXNpY3MudXRpbC5wdWJzdWIjb25lKCB0b3BpY0NvbmZpZ1ssIHNjb3BlLCBwcmlvcml0eV0gKSAtPiB0aGlzXG4gICAgICAgICAqIC0gdG9waWMgKFN0cmluZyk6IFRoZSB0b3BpYyBuYW1lXG4gICAgICAgICAqIC0gdG9waWNDb25maWcgKE9iamVjdCk6IEEgY29uZmlnIHdpdGgga2V5L3ZhbHVlIHBhaXJzIG9mIGB7IHRvcGljOiBjYWxsYmFja0ZuLCAuLi4gfWBcbiAgICAgICAgICogLSBmbiAoRnVuY3Rpb24pOiBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gKGlmIG5vdCB1c2luZyBPYmplY3QgYXMgcHJldmlvdXMgYXJndW1lbnQpXG4gICAgICAgICAqIC0gZGF0YSAoTWl4ZWQpOiBUaGUgZGF0YSBzZW50IGZyb20gdGhlIGNhbGwgdG8gYC5lbWl0KClgXG4gICAgICAgICAqIC0gZXZlbnQgKE9iamVjdCk6IEV2ZW50IGRhdGEsIGhvbGRpbmcgYC50b3BpY2AsIHRoZSB0b3BpYywgYW5kIGAuaGFuZGxlcmAsIHRoZSBgZm5gIGNhbGxiYWNrLlxuICAgICAgICAgKiAtIHNjb3BlIChPYmplY3QpOiBUaGUgc2NvcGUgdG8gYmluZCBjYWxsYmFjayB0b1xuICAgICAgICAgKiAtIHByaW9yaXR5IChOdW1iZXIpOiBUaGUgcHJpb3JpdHkgb2YgdGhlIGNhbGxiYWNrIChoaWdoZXIgaXMgZWFybGllcilcbiAgICAgICAgICpcbiAgICAgICAgICogU3Vic2NyaWJlIGNhbGxiYWNrKHMpIHRvIGEgdG9waWMocyksIGJ1dCBvbmx5IE9OQ0UuXG4gICAgICAgICAqKi9cbiAgICAgICAgb25lOiBmdW5jdGlvbiggdG9waWMsIGZuLCBzY29wZSApe1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSdyZSBzdWJzY3JpYmluZyB0byBtdWx0aXBsZSB0b3BpY3NcbiAgICAgICAgICAgIC8vIHdpdGggYW4gb2JqZWN0XG4gICAgICAgICAgICBpZiAoIFBoeXNpY3MudXRpbC5pc09iamVjdCggdG9waWMgKSApe1xuXG4gICAgICAgICAgICAgICAgZm9yICggdmFyIHQgaW4gdG9waWMgKXtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uZSggdCwgdG9waWNbIHQgXSwgZm4sIHNjb3BlICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgX29uZV8gZmxhZ1xuICAgICAgICAgICAgZm4uX29uZV8gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vbiggdG9waWMsIGZuLCBzY29wZSApO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBQaHlzaWNzLnV0aWwucHVic3ViID0gUHViU3ViO1xufSkoKTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL3V0aWwvdGlja2VyLmpzXG5cbi8qKlxuICogY2xhc3MgUGh5c2ljcy51dGlsLnRpY2tlclxuICpcbiAqIFRoZSBUaWNrZXIgX3NpbmdsZXRvbl8gZm9yIGVhc2lseSBiaW5kaW5nIGNhbGxiYWNrcyB0byBhbmltYXRpb24gbG9vcHMgKHJlcXVlc3RBbmltYXRpb25GcmFtZSkuXG4gKlxuICogUmVxdWlyZXMgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS4uLiBzbyBwb2x5ZmlsbCBpdCBpZiB5b3UgbmVlZCB0by5cbiAqKi9cbihmdW5jdGlvbih3aW5kb3cpe1xuXG4gICAgdmFyIGFjdGl2ZSA9IHRydWVcbiAgICAgICAgLHBzID0gUGh5c2ljcy51dGlsLnB1YnN1YigpXG4gICAgICAgICxwZXJmID0gd2luZG93LnBlcmZvcm1hbmNlXG4gICAgICAgIDtcblxuICAgIGZ1bmN0aW9uIG5vdygpe1xuICAgICAgICAvLyBodHRwOi8vdXBkYXRlcy5odG1sNXJvY2tzLmNvbS8yMDEyLzA1L3JlcXVlc3RBbmltYXRpb25GcmFtZS1BUEktbm93LXdpdGgtc3ViLW1pbGxpc2Vjb25kLXByZWNpc2lvblxuICAgICAgICByZXR1cm4gKHBlcmYgJiYgcGVyZi5ub3cpID9cbiAgICAgICAgICAgIChwZXJmLm5vdygpICsgcGVyZi50aW1pbmcubmF2aWdhdGlvblN0YXJ0KSA6XG4gICAgICAgICAgICBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogc3RlcCggdGltZSApXG4gICAgICogLSB0aW1lIChOdW1iZXIpOiBUaGUgY3VycmVudCB0aW1lXG4gICAgICpcbiAgICAgKiBQdWJsaXNoIGEgdGljayB0byBzdWJzY3JpYmVkIGNhbGxiYWNrc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0ZXAoKXtcblxuICAgICAgICB2YXIgdGltZTtcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBzdGVwICk7XG5cbiAgICAgICAgaWYgKCFhY3RpdmUpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGltZSA9IG5vdygpO1xuXG4gICAgICAgIGlmICghdGltZSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcy5lbWl0KCAndGljaycsIHRpbWUgKTtcbiAgICB9XG5cbiAgICAvLyBzdGFydCBzdGVwcGluZyBpZiB3ZSBjYW5cbiAgICBpZiAoIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgKXtcbiAgICAgICAgc3RlcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBoeXNpY3MudXRpbC50aWNrZXIuc3RhcnQoKSAtPiB0aGlzXG4gICAgICpcbiAgICAgKiBTdGFydCB0aGUgdGlja2VyXG4gICAgICoqL1xuICAgIGZ1bmN0aW9uIHN0YXJ0KCl7XG5cbiAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy51dGlsLnRpY2tlci5zdG9wKCkgLT4gdGhpc1xuICAgICAqXG4gICAgICogU3RvcCB0aGUgdGlja2VyXG4gICAgICoqL1xuICAgIGZ1bmN0aW9uIHN0b3AoKXtcblxuICAgICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy51dGlsLnRpY2tlci5vbiggbGlzdGVuZXIoIHRpbWUgKSApIC0+IHRoaXNcbiAgICAgKiAtIGxpc3RlbmVyIChGdW5jdGlvbik6IFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIC0gdGltZSAoTnVtYmVyKTogVGhlIGN1cnJlbnQgdGltZXN0YW1wXG4gICAgICpcbiAgICAgKiBTdWJzY3JpYmUgYSBjYWxsYmFjayB0byB0aGUgdGlja2VyLlxuICAgICAqKi9cbiAgICBmdW5jdGlvbiBvbiggbGlzdGVuZXIgKXtcblxuICAgICAgICBwcy5vbigndGljaycsIGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGh5c2ljcy51dGlsLnRpY2tlci5vZmYoIGxpc3RlbmVyICkgLT4gdGhpc1xuICAgICAqIC0gbGlzdGVuZXIgKEZ1bmN0aW9uKTogVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHByZXZpb3VzbHkgYm91bmRcbiAgICAgKlxuICAgICAqIFVuc3Vic2NyaWJlIGEgY2FsbGJhY2sgZnJvbSB0aGUgdGlja2VyLlxuICAgICAqKi9cbiAgICBmdW5jdGlvbiBvZmYoIGxpc3RlbmVyICl7XG5cbiAgICAgICAgcHMub2ZmKCd0aWNrJywgbGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQaHlzaWNzLnV0aWwudGlja2VyLmlzQWN0aXZlKCkgLT4gQm9vbGVhblxuICAgICAqICsgKEJvb2xlYW4pOiBgdHJ1ZWAgaWYgcnVubmluZywgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGlja2VyIGlzIGN1cnJlbnRseSBydW5uaW5nLlxuICAgICAqKi9cbiAgICBmdW5jdGlvbiBpc0FjdGl2ZSgpe1xuXG4gICAgICAgIHJldHVybiAhIWFjdGl2ZTtcbiAgICB9XG5cbiAgICAvLyBBUElcbiAgICBQaHlzaWNzLnV0aWwudGlja2VyID0ge1xuICAgICAgICBub3c6IG5vdyxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBzdG9wOiBzdG9wLFxuICAgICAgICBvbjogb24sXG4gICAgICAgIG9mZjogb2ZmLFxuICAgICAgICBpc0FjdGl2ZTogaXNBY3RpdmVcbiAgICB9O1xuXG59KHRoaXMpKTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2NvcmUvcXVlcnkuanNcblxuKGZ1bmN0aW9uICh3aW5kb3cpIHtcblxuICAgIC8qXG4gICAgICogR3JvdXAgaGVscGVyc1xuICAgICAqL1xuICAgIHZhciBmblRydWUgPSBmdW5jdGlvbigpeyByZXR1cm4gITA7IH07IC8vIHJldHVybiB0cnVlXG4gICAgXG4gICAgdmFyIGluZGV4T2YgPSBQaHlzaWNzLnV0aWwuaW5kZXhPZjtcblxuICAgIC8qKiBoaWRlXG4gICAgICogd3JhcFJ1bGUoIGZuKCBwcm9wVmFsICksIHByb3AgKSAtPiBGdW5jdGlvblxuICAgICAqIC0gZm4gKEZ1bmN0aW9uKTogVGhlIHRlc3QgZnVuY3Rpb25cbiAgICAgKiAtIHByb3AgKFN0cmluZyk6IFRoZSBwcm9wZXJ0eSBuYW1lIHRvIHRlc3RcbiAgICAgKiAtIHByb3BWYWwgKE1peGVkKTogVGhlIHByb3BlcnR5IHZhbHVlXG4gICAgICogXG4gICAgICogR2V0IHRlc3QgZnVuY3Rpb24gdG8gdGVzdCBvbiBzdWIgcHJvcGVydHkuXG4gICAgICoqL1xuICAgIHZhciB3cmFwUnVsZSA9IGZ1bmN0aW9uIHdyYXBSdWxlKCBmbiwgcHJvcCApe1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIHRoaW5nICl7XG4gICAgICAgICAgICByZXR1cm4gZm4oIHRoaW5nWyBwcm9wIF0gKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqIGhpZGVcbiAgICAgKiAkZXEoIHRvTWF0Y2hbLCBwcm9wXSApIC0+IEZ1bmN0aW9uXG4gICAgICogLSB0b01hdGNoIChNaXhlZCk6IFRoZSB2YWx1ZSB0byBtYXRjaFxuICAgICAqIC0gcHJvcCAoU3RyaW5nKTogVGhlIHByb3BlcnR5IG5hbWUgdG8gdGVzdFxuICAgICAqIFxuICAgICAqIEdldCBhbiBlcXVhbGl0eSB0ZXN0IGZ1bmN0aW9uLlxuICAgICAqKi9cbiAgICB2YXIgJGVxID0gZnVuY3Rpb24gJGVxKCB0b01hdGNoLCBwcm9wICl7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggdGhpbmcgKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpbmcgPSBwcm9wID8gdGhpbmdbIHByb3AgXSA6IHRoaW5nO1xuXG4gICAgICAgICAgICB2YXIgZnIgPSAwXG4gICAgICAgICAgICAgICAgLGJrXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIFBoeXNpY3MudXRpbC5pc0FycmF5KCB0aGluZyApICl7XG5cbiAgICAgICAgICAgICAgICBpZiAoIFBoeXNpY3MudXRpbC5pc0FycmF5KCB0b01hdGNoICkgKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2ggYWxsXG4gICAgICAgICAgICAgICAgICAgIGJrID0gdGhpbmcubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGxlbmd0aHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBiayAhPT0gdG9NYXRjaC5sZW5ndGggKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggZnIgPCBiayApe1xuICAgICAgICAgICAgICAgICAgICAgICAgYmstLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmcm9udFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRleE9mKHRvTWF0Y2gsIHRoaW5nWyBmciBdKSA9PT0gLTEpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRleE9mKHRvTWF0Y2gsIHRoaW5nWyBiayBdKSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmcisrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmQgaW4gYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChpbmRleE9mKCB0aGluZywgdG9NYXRjaCApID4gLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZXhhY3QgbWF0Y2hcbiAgICAgICAgICAgIHJldHVybiAodGhpbmcgPT09IHRvTWF0Y2gpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKiogaGlkZVxuICAgICAqICRuZSggdG9NYXRjaFssIHByb3BdICkgLT4gRnVuY3Rpb25cbiAgICAgKiAtIHRvTWF0Y2ggKE1peGVkKTogVGhlIHZhbHVlIHRvIG1hdGNoXG4gICAgICogLSBwcm9wIChTdHJpbmcpOiBUaGUgcHJvcGVydHkgbmFtZSB0byB0ZXN0XG4gICAgICogXG4gICAgICogR2V0IGEgTk9UIGVxdWFsaXR5IHRlc3QgZnVuY3Rpb24uXG4gICAgICoqL1xuICAgIHZhciAkbmUgPSBmdW5jdGlvbiAkbmUoIHRvTWF0Y2gsIHByb3AgKXtcbiAgICAgICAgdmFyIGZuID0gJGVxKCB0b01hdGNoLCBwcm9wICk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggdGhpbmcgKXtcbiAgICAgICAgICAgIHJldHVybiAhZm4oIHRoaW5nICk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKiBoaWRlXG4gICAgICogJGluKCB0b01hdGNoWywgcHJvcF0gKSAtPiBGdW5jdGlvblxuICAgICAqIC0gdG9NYXRjaCAoQXJyYXkpOiBUaGUgYXJyYXkgdG8gbWF0Y2hcbiAgICAgKiAtIHByb3AgKFN0cmluZyk6IFRoZSBwcm9wZXJ0eSBuYW1lIHRvIHRlc3RcbiAgICAgKiBcbiAgICAgKiBHZXQgYSB0ZXN0IGZ1bmN0aW9uIGZvciBtYXRjaGluZyBBTlkgaW4gYXJyYXlcbiAgICAgKiovXG4gICAgdmFyICRpbiA9IGZ1bmN0aW9uICRpbiggdG9NYXRjaCwgcHJvcCApe1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIHRoaW5nICl7XG5cbiAgICAgICAgICAgIHRoaW5nID0gcHJvcCA/IHRoaW5nWyBwcm9wIF0gOiB0aGluZztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGZyID0gMFxuICAgICAgICAgICAgICAgICxia1xuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgaWYgKCBQaHlzaWNzLnV0aWwuaXNBcnJheSggdGhpbmcgKSApe1xuICAgICAgICAgICAgICAgIGJrID0gdGhpbmcubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUoIGZyIDwgYmsgKXtcbiAgICAgICAgICAgICAgICAgICAgYmstLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgZnJvbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbmRleE9mKHRvTWF0Y2gsIHRoaW5nWyBmciBdKSA+IC0xKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgKGluZGV4T2YodG9NYXRjaCwgdGhpbmdbIGJrIF0pID4gLTEpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZnIrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGluZyBtYXRjaGVzIGFueSBpbiBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIChpbmRleE9mKHRvTWF0Y2gsIHRoaW5nKSA+IC0xKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqIGhpZGVcbiAgICAgKiAkbmluKCB0b01hdGNoWywgcHJvcF0gKSAtPiBGdW5jdGlvblxuICAgICAqIC0gdG9NYXRjaCAoQXJyYXkpOiBUaGUgYXJyYXkgdG8gbWF0Y2hcbiAgICAgKiAtIHByb3AgKFN0cmluZyk6IFRoZSBwcm9wZXJ0eSBuYW1lIHRvIHRlc3RcbiAgICAgKiBcbiAgICAgKiBHZXQgYSB0ZXN0IGZ1bmN0aW9uIGZvciBtYXRjaGluZyBOT1QgQU5ZIGluIGFycmF5XG4gICAgICoqL1xuICAgIHZhciAkbmluID0gZnVuY3Rpb24gJG5pbiggdG9NYXRjaCwgcHJvcCApe1xuICAgICAgICB2YXIgZm4gPSAkaW4oIHRvTWF0Y2gsIHByb3AgKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCB0aGluZyApe1xuICAgICAgICAgICAgcmV0dXJuICFmbiggdGhpbmcgKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqIGhpZGVcbiAgICAgKiAkYXQoIHBvaW50ICkgLT4gRnVuY3Rpb25cbiAgICAgKiAtIHBvaW50IChWZWN0b3Jpc2gpOiBUaGUgcG9pbnQgdG8gY2hlY2tcbiAgICAgKiBcbiAgICAgKiBHZXQgYSB0ZXN0IGZ1bmN0aW9uIHRvIG1hdGNoIGFueSBib2R5IHdobydzIGFhYmIgaW50ZXJzZWN0cyBwb2ludFxuICAgICAqKi9cbiAgICB2YXIgJGF0ID0gZnVuY3Rpb24gJGF0KCBwb2ludCApe1xuICAgICAgICBwb2ludCA9IG5ldyBQaHlzaWNzLnZlY3RvciggcG9pbnQgKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBib2R5ICl7XG4gICAgICAgICAgICB2YXIgYWFiYiA9IGJvZHkuYWFiYigpO1xuICAgICAgICAgICAgcmV0dXJuIFBoeXNpY3MuYWFiYi5jb250YWlucyggYWFiYiwgcG9pbnQgKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqIGhpZGVcbiAgICAgKiAkYW5kKCBmaXJzdCApIC0+IEZ1bmN0aW9uXG4gICAgICogLSBmaXJzdCAoRnVuY3Rpb24pOiBGaXJzdCBmdW5jdGlvbiBub2RlLiBgZmlyc3QubmV4dGAgc2hvdWxkIGhhdmUgdGhlIG5leHQgZnVuY3Rpb24sIGFuZCBzbyBvbi5cbiAgICAgKiBcbiAgICAgKiBHZXQgYW4gQU5EIHRlc3QgZnVuY3Rpb24uXG4gICAgICoqL1xuICAgIHZhciAkYW5kID0gZnVuY3Rpb24gJGFuZCggZmlyc3QgKXtcbiAgICAgICAgcmV0dXJuIGZpcnN0Lm5leHQgPyBmdW5jdGlvbiggdGhpbmcgKXtcbiAgICAgICAgICAgIHZhciBmbiA9IGZpcnN0O1xuICAgICAgICAgICAgd2hpbGUgKCBmbiApe1xuXG4gICAgICAgICAgICAgICAgaWYgKCAhZm4oIHRoaW5nICkgKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmbiA9IGZuLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSA6IGZpcnN0O1xuICAgIH07XG5cbiAgICAvKiogaGlkZVxuICAgICAqICRvciggZmlyc3QgKSAtPiBGdW5jdGlvblxuICAgICAqIC0gZmlyc3QgKEZ1bmN0aW9uKTogRmlyc3QgZnVuY3Rpb24gbm9kZS4gYGZpcnN0Lm5leHRgIHNob3VsZCBoYXZlIHRoZSBuZXh0IGZ1bmN0aW9uLCBhbmQgc28gb24uXG4gICAgICogXG4gICAgICogR2V0IGFuIE9SIHRlc3QgZnVuY3Rpb24uXG4gICAgICoqL1xuICAgIHZhciAkb3IgPSBmdW5jdGlvbiAkb3IoIGZpcnN0ICl7XG4gICAgICAgIHJldHVybiBmaXJzdC5uZXh0ID8gZnVuY3Rpb24oIHRoaW5nICl7XG4gICAgICAgICAgICB2YXIgZm4gPSBmaXJzdDtcbiAgICAgICAgICAgIHdoaWxlICggZm4gKXtcblxuICAgICAgICAgICAgICAgIGlmICggZm4oIHRoaW5nICkgKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZuID0gZm4ubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSA6IGZpcnN0O1xuICAgIH07XG5cbiAgICAvLyBvcGVyYXRpb24gaGFzaFxuICAgIHZhciBvcGVyYXRpb25zID0ge1xuICAgICAgICAvLyAkYW5kIGFuZCAkb3IgYXJlIHNlcGFyYXRlXG4gICAgICAgICRlcTogJGVxXG4gICAgICAgICwkbmU6ICRuZVxuICAgICAgICAsJGluOiAkaW5cbiAgICAgICAgLCRuaW46ICRuaW5cbiAgICAgICAgLCRhdDogJGF0XG4gICAgfTtcblxuICAgIC8qKiByZWxhdGVkIHRvOiBQaHlzaWNzLndvcmxkI2ZpbmRcbiAgICAgKiBQaHlzaWNzLnF1ZXJ5KCBydWxlcyApIC0+IEZ1bmN0aW9uXG4gICAgICogLSBydWxlcyAoT2JqZWN0KTogVGhlIG1vbmdvZGItbGlrZSBzZWFyY2ggcnVsZXMuIChTZWUgZGVzY3JpcHRpb24pLlxuICAgICAqICsgKEZ1bmN0aW9uKTogVGhlIHRlc3QgZnVuY3Rpb25cbiAgICAgKiBcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBwZXJmb3JtIHRlc3RzIG9uIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBUaGUgdGVzdCBmdW5jdGlvbiB3aWxsIHJldHVybiBhIFtbQm9vbGVhbl1dOyBgdHJ1ZWAgaWYgdGhlIG9iamVjdCBtYXRjaGVzIHRoZSB0ZXN0cy5cbiAgICAgKlxuICAgICAqIFF1ZXJ5IHJ1bGVzIGFyZSBtb25nb2RiLWxpa2UuIFlvdSBjYW4gc3BlY2lmeSBhIGhhc2ggb2YgdmFsdWVzIHRvIG1hdGNoIGxpa2UgdGhpczpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiB7XG4gICAgICogICAgIGZvbzogJ2JhcicsXG4gICAgICogICAgIGJhejogMixcbiAgICAgKiAgICAgc29tZToge1xuICAgICAqICAgICAgICAgbmVzdGVkOiAndmFsdWUnXG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBBbmQgdGhleSB3aWxsIGFsbCBuZWVkIHRvIG1hdGNoIChpdCdzIGFuIEFORCBydWxlKS5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gYWxzbyB1c2Ugb3BlcmF0b3JzIGZvciBtb3JlIHZlcnNhdGlsaXR5LiBUaGUgb3BlcmF0b3JzIHlvdSBjYW4gdXNlIGluY2x1ZGU6XG4gICAgICpcbiAgICAgKiAtICRlcTogVGVzdCBpZiBzb21lIHByb3BlcnR5IGlzIGVxdWFsIHRvIGEgdmFsdWUgKHRoaXMgaXMgZG9uZSBieSBkZWZhdWx0LCBhbmQgaXMgdGh1cyByZWR1bmRhbnQpXG4gICAgICogLSAkbmU6IFRlc3QgaWYgc29tZSBwcm9wZXJ0eSBpcyBfTk9UXyBlcXVhbCB0byBhIHZhbHVlXG4gICAgICogLSAkaW46IFRlc3QgaWYgc29tZSB2YWx1ZSAob3IgYXJyYXkgb2YgdmFsdWVzKSBpcyBvbmUgb2YgdGhlIHNwZWNpZmllZCBhcnJheSBvZiB2YWx1ZXNcbiAgICAgKiAtICRuaW46IFRlc3QgaWYgc29tZSB2YWx1ZSAob3IgYXJyYXkgb2YgdmFsdWVzKSBpcyBfTk9UXyBvbmUgb2YgdGhlIHNwZWNpZmllZCBhcnJheSBvZiB2YWx1ZXNcbiAgICAgKiAtICRhdDogVGVzdCBpZiBhIGJvZHkncyBbW1BoeXNpY3MuYWFiYl1dIGluY2x1ZGVzIHNwZWNpZmllZCBwb2ludC4gSXQncyBhIHByaW1hdGl2ZSBoaXQtdGVzdC5cbiAgICAgKiBcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIHZhciB3aGVlbHNBcnJheSA9IFtdO1xuICAgICAqIFxuICAgICAqIHZhciBxdWVyeUZuID0gUGh5c2ljcy5xdWVyeSh7XG4gICAgICogICAgIG5hbWU6ICdjaXJjbGUnLCAvLyBvbmx5IGNpcmNsZXNcbiAgICAgKiAgICAgJG5pbjogd2hlZWxzQXJyYXksIC8vIG5vdCBpbiB0aGUgd2hlZWxzQXJyYXlcbiAgICAgKiAgICAgbGFiZWxzOiB7ICRpbjogWyAncGxheWVyJywgJ21vbnN0ZXInIF0gfSAvLyB0aGF0IGhhdmUgcGxheWVyIE9SIG1vbnN0ZXIgbGFiZWxzXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiB2YXIgb2JqID0ge1xuICAgICAqICAgICBuYW1lOiAnY2lyY2xlJyxcbiAgICAgKiAgICAgbGFiZWxzOiBbICdyb3VuZCcgXVxuICAgICAqIH07XG4gICAgICpcbiAgICAgKiBxdWVyeUZuKCBvYmogKTsgLy8gLT4gZmFsc2VcbiAgICAgKiAvLyBnaXZlIGl0IGEgcGxheWVyIHRhZ1xuICAgICAqIG9iai5sYWJlbHMucHVzaCgncGxheWVyJyk7XG4gICAgICogcXVlcnlGbiggb2JqICk7IC8vIC0+IHRydWVcbiAgICAgKiAvLyBwdXQgaXQgaW5zaWRlIHRoZSB3aGVlbHNBcnJheVxuICAgICAqIHdoZWVsc0FycmF5LnB1c2goIG9iaiApO1xuICAgICAqIHF1ZXJ5Rm4oIG9iaiApOyAvLyAtPiBmYWxzZVxuICAgICAqIGBgYFxuICAgICAqKi9cbiAgICB2YXIgUXVlcnkgPSBmdW5jdGlvbiBRdWVyeSggcnVsZXMsIC8qIGludGVybmFsIHVzZSAqLyAkb3AgKXtcblxuICAgICAgICB2YXIgb3BcbiAgICAgICAgICAgICxsXG4gICAgICAgICAgICAscnVsZVxuICAgICAgICAgICAgLGZpcnN0XG4gICAgICAgICAgICAsbGlzdFxuICAgICAgICAgICAgLGZuXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgaWYgKCAkb3AgKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcGFyc2Ugb3BlcmF0aW9uIGNob2ljZVxuICAgICAgICAgICAgaWYgKCAkb3AgPT09ICckb3InIHx8ICRvcCA9PT0gJyRhbmQnICl7XG5cbiAgICAgICAgICAgICAgICAvLyBleHBlY3QgYSBydWxlcyBhcnJheVxuICAgICAgICAgICAgICAgIGZvciAoIG9wID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgb3AgPCBsOyArK29wICl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBmbiA9IFF1ZXJ5KCBydWxlc1sgb3AgXSApO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBmaXJzdCBoYXNuJ3QgYmVlbiBzZXQgeWV0LCBzZXQgaXQgYW5kIHN0YXJ0IHRoZSBsaXN0IHRoZXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSBzZXQgdGhlIG5leHQgbm9kZSBvZiB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gbGlzdCA/IGxpc3QubmV4dCA9IGZuIDogZmlyc3QgPSBmbjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKCRvcCA9PT0gJyRvcicpID8gJG9yKCBmaXJzdCApIDogJGFuZCggZmlyc3QgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIG9wID0gb3BlcmF0aW9uc1sgJG9wIF0gKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiBvcCggcnVsZXMgKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBjb21wdXRlLi4uXG4gICAgICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24gcXVlcnkgb3BlcmF0aW9uOiAnICsgJG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHJ1bGVzXG4gICAgICAgIGZvciAoIG9wIGluIHJ1bGVzICl7XG4gICAgICAgICAgICBydWxlID0gcnVsZXNbIG9wIF07XG4gICBcbiAgICAgICAgICAgIGlmICggb3BbMF0gPT09ICckJyApe1xuICAgICAgICAgICAgICAgIC8vIGl0J3MgYW4gb3BlcmF0aW9uIHJ1bGVcbiAgICAgICAgICAgICAgICBmbiA9IFF1ZXJ5KCBydWxlLCBvcCApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICggUGh5c2ljcy51dGlsLmlzUGxhaW5PYmplY3QoIHJ1bGUgKSApIHtcbiAgICAgICAgICAgICAgICAvLyBpdCdzIGFuIG9iamVjdCBzbyBwYXJzZSBzdWJydWxlc1xuICAgICAgICAgICAgICAgIGZuID0gd3JhcFJ1bGUoIFF1ZXJ5KCBydWxlICksIG9wICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBlcXVhbGl0eSBydWxlXG4gICAgICAgICAgICAgICAgZm4gPSAkZXEoIHJ1bGUsIG9wICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIGZpcnN0IGhhc24ndCBiZWVuIHNldCB5ZXQsIHNldCBpdCBhbmQgc3RhcnQgdGhlIGxpc3QgdGhlcmVcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBzZXQgdGhlIG5leHQgbm9kZSBvZiB0aGUgbGlzdFxuICAgICAgICAgICAgbGlzdCA9IGxpc3QgPyBsaXN0Lm5leHQgPSBmbiA6IGZpcnN0ID0gZm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhlIHJ1bGVzIHRlc3RcbiAgICAgICAgcmV0dXJuICRhbmQoIGZpcnN0IHx8IGZuVHJ1ZSApO1xuICAgIH07XG5cbiAgICBQaHlzaWNzLnF1ZXJ5ID0gUXVlcnk7XG5cbn0pKHRoaXMpO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvY29yZS9iZWhhdmlvci5qc1xuXG4oZnVuY3Rpb24oKXtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgcHJpb3JpdHk6IDBcbiAgICB9O1xuXG4gICAgLyoqIHJlbGF0ZWQgdG86IFBoeXNpY3MudXRpbC5kZWNvcmF0b3JcbiAgICAgKiBQaHlzaWNzLmJlaGF2aW9yKCBuYW1lWywgb3B0aW9uc10gKSAtPiBCZWhhdmlvclxuICAgICAqIC0gbmFtZSAoU3RyaW5nKTogVGhlIG5hbWUgb2YgdGhlIGJlaGF2aW9yIHRvIGNyZWF0ZVxuICAgICAqIC0gb3B0aW9ucyAoT2JqZWN0KTogVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoYXQgYmVoYXZpb3IgKCBkZXBlbmRzIG9uIGJlaGF2aW9yICkuXG4gICAgICAgQXZhaWxhYmxlIG9wdGlvbnMgYW5kIGRlZmF1bHRzOlxuICAgICAgIFxuICAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgICAge1xuICAgICAgICAgICBwcmlvcml0eTogMCAvLyB0aGUgcHJpb3JpdHkgb2YgdGhpcyBib2R5XG4gICAgICAgIH1cbiAgICAgICBgYGBcbiAgICAgKlxuICAgICAqIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIEJlaGF2aW9ycy5cbiAgICAgKlxuICAgICAqIFZpc2l0IFt0aGUgUGh5c2ljc0pTIHdpa2kgb24gQmVoYXZpb3JzXShodHRwczovL2dpdGh1Yi5jb20vd2VsbGNhZmZlaW5hdGVkL1BoeXNpY3NKUy93aWtpL0JlaGF2aW9ycylcbiAgICAgKiBmb3IgdXNhZ2UgZG9jdW1lbnRhdGlvbi5cbiAgICAgKiovXG4gICAgUGh5c2ljcy5iZWhhdmlvciA9IERlY29yYXRvcignYmVoYXZpb3InLCB7XG5cbiAgICAgICAgLyoqIGJlbG9uZ3MgdG86IFBoeXNpY3MuYmVoYXZpb3JcbiAgICAgICAgICogY2xhc3MgQmVoYXZpb3JcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIGJhc2UgY2xhc3MgZm9yIGJlaGF2aW9ycyBjcmVhdGVkIGJ5IFtbUGh5c2ljcy5iZWhhdmlvcl1dIGZhY3RvcnkgZnVuY3Rpb24uXG4gICAgICAgICAqKi9cblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogQmVoYXZpb3IjaW5pdCggb3B0aW9ucyApXG4gICAgICAgICAqIC0gb3B0aW9ucyAoT2JqZWN0KTogVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBwYXNzZWQgYnkgdGhlIGZhY3RvcnlcbiAgICAgICAgICogXG4gICAgICAgICAqIEluaXRpYWxpemF0aW9uLiBJbnRlcm5hbCB1c2UuXG4gICAgICAgICAqKi9cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqIHJlbGF0ZWQgdG86IFBoeXNpY3MudXRpbC5vcHRpb25zXG4gICAgICAgICAgICAgKiBCZWhhdmlvciNvcHRpb25zKCBvcHRpb25zICkgLT4gT2JqZWN0XG4gICAgICAgICAgICAgKiAtIG9wdGlvbnMgKE9iamVjdCk6IFRoZSBvcHRpb25zIHRvIHNldCBhcyBhbiBvYmplY3RcbiAgICAgICAgICAgICAqICsgKE9iamVjdCk6IFRoZSBvcHRpb25zXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIFNldCBvcHRpb25zIG9uIHRoaXMgaW5zdGFuY2UuIFxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKiBBY2Nlc3Mgb3B0aW9ucyBkaXJlY3RseSBmcm9tIHRoZSBvcHRpb25zIG9iamVjdC5cbiAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICogRXhhbXBsZTpcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICAgICAgICAgKiB0aGlzLm9wdGlvbnMuc29tZU9wdGlvbjtcbiAgICAgICAgICAgICAqIGBgYFxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKiovXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBQaHlzaWNzLnV0aWwub3B0aW9ucyggZGVmYXVsdHMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyggb3B0aW9ucyApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvciNhcHBseVRvKCBhcnIgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gYXJyIChBcnJheSk6IEFycmF5IG9mIGJvZGllcyB0byBhcHBseSB0aGlzIGJlaGF2aW9yIHRvLiBTcGVjaWZ5IGB0cnVlYCBmb3IgYWxsIG9iamVjdHMgaW4gd29ybGQuXG4gICAgICAgICAqIFxuICAgICAgICAgKiBBcHBseSB0aGUgYmVoYXZpb3IgdG8gYSBncm91cCBvZiBib2RpZXMuXG4gICAgICAgICAqKi9cbiAgICAgICAgYXBwbHlUbzogZnVuY3Rpb24oIGFyciApe1xuXG4gICAgICAgICAgICBpZiAoIGFyciA9PT0gdHJ1ZSApe1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldHMgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRzID0gUGh5c2ljcy51dGlsLnVuaXEoIGFyciApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJlaGF2aW9yI2dldFRhcmdldHMoKSAtPiBBcnJheVxuICAgICAgICAgKiArIChBcnJheSk6IFRoZSBhcnJheSBvZiBib2RpZXMgKGJ5IHJlZmVyZW5jZSEpIHRoaXMgYmVoYXZpb3IgaXMgYXBwbGllZCB0by5cbiAgICAgICAgICogXG4gICAgICAgICAqIEdldCB0aGUgYXJyYXkgb2YgYm9kaWVzIChieSByZWZlcmVuY2UhKSB0aGlzIGJlaGF2aW9yIGlzIGFwcGxpZWQgdG8uXG4gICAgICAgICAqKi9cbiAgICAgICAgZ2V0VGFyZ2V0czogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldHMgfHwgKCB0aGlzLl93b3JsZCA/IHRoaXMuX3dvcmxkLl9ib2RpZXMgOiBbXSApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvciNzZXRXb3JsZCggd29ybGQgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gd29ybGQgKE9iamVjdCk6IFRoZSB3b3JsZCAob3IgbnVsbClcbiAgICAgICAgICpcbiAgICAgICAgICogU2V0IHdoaWNoIHdvcmxkIHRvIGFwcGx5IHRvLlxuICAgICAgICAgKlxuICAgICAgICAgKiBVc3VhbGx5IHRoaXMgaXMgY2FsbGVkIGludGVybmFsbHkuIFNob3VsZG4ndCBiZSBhIG5lZWQgdG8gY2FsbCB0aGlzIHlvdXJzZWxmIHVzdWFsbHkuXG4gICAgICAgICAqKi9cbiAgICAgICAgc2V0V29ybGQ6IGZ1bmN0aW9uKCB3b3JsZCApe1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuZGlzY29ubmVjdCAmJiB0aGlzLl93b3JsZCApe1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCggdGhpcy5fd29ybGQgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fd29ybGQgPSB3b3JsZDtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmNvbm5lY3QgJiYgd29ybGQgKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3QoIHdvcmxkICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvciNjb25uZWN0KCB3b3JsZCApXG4gICAgICAgICAqIC0gd29ybGQgKFBoeXNpY3Mud29ybGQpOiBUaGUgd29ybGQgdG8gY29ubmVjdCB0b1xuICAgICAgICAgKiBcbiAgICAgICAgICogQ29ubmVjdCB0byBhIHdvcmxkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBFeHRlbmQgdGhpcyB3aGVuIGNyZWF0aW5nIGJlaGF2aW9ycyBpZiB5b3UgbmVlZCB0byBzcGVjaWZ5IHB1YnN1YiBtYW5hZ2VtZW50LlxuICAgICAgICAgKiBBdXRvbWF0aWNhbGx5IGNhbGxlZCB3aGVuIGFkZGVkIHRvIHdvcmxkIGJ5IHRoZSBbW0JlaGF2aW9yI3NldFdvcmxkXV0gbWV0aG9kLlxuICAgICAgICAgKiovXG4gICAgICAgIGNvbm5lY3Q6IGZ1bmN0aW9uKCB3b3JsZCApe1xuXG4gICAgICAgICAgICBpZiAodGhpcy5iZWhhdmUpe1xuICAgICAgICAgICAgICAgIHdvcmxkLm9uKCdpbnRlZ3JhdGU6cG9zaXRpb25zJywgdGhpcy5iZWhhdmUsIHRoaXMsIHRoaXMub3B0aW9ucy5wcmlvcml0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJlaGF2aW9yI2Rpc2Nvbm5lY3QoIHdvcmxkIClcbiAgICAgICAgICogLSB3b3JsZCAoUGh5c2ljcy53b3JsZCk6IFRoZSB3b3JsZCB0byBkaXNjb25uZWN0IGZyb21cbiAgICAgICAgICogXG4gICAgICAgICAqIERpc2Nvbm5lY3QgZnJvbSBhIHdvcmxkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBFeHRlbmQgdGhpcyB3aGVuIGNyZWF0aW5nIGJlaGF2aW9ycyBpZiB5b3UgbmVlZCB0byBzcGVjaWZ5IHB1YnN1YiBtYW5hZ2VtZW50LlxuICAgICAgICAgKiBBdXRvbWF0aWNhbGx5IGNhbGxlZCB3aGVuIGFkZGVkIHRvIHdvcmxkIGJ5IHRoZSBbW0JlaGF2aW9yI3NldFdvcmxkXV0gbWV0aG9kLlxuICAgICAgICAgKiovXG4gICAgICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCB3b3JsZCApe1xuXG4gICAgICAgICAgICBpZiAodGhpcy5iZWhhdmUpe1xuICAgICAgICAgICAgICAgIHdvcmxkLm9mZignaW50ZWdyYXRlOnBvc2l0aW9ucycsIHRoaXMuYmVoYXZlLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmVoYXZpb3IjYmVoYXZlKCBkYXRhIClcbiAgICAgICAgICogLSBkYXRhIChPYmplY3QpOiBUaGUgcHVic3ViIGBpbnRlZ3JhdGU6cG9zaXRpb25zYCBldmVudCBkYXRhXG4gICAgICAgICAqIFxuICAgICAgICAgKiBEZWZhdWx0IG1ldGhvZCBydW4gb24gZXZlcnkgd29ybGQgaW50ZWdyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIFlvdSBfbXVzdF8gZXh0ZW5kIHRoaXMgd2hlbiBjcmVhdGluZyBhIGJlaGF2aW9yLFxuICAgICAgICAgKiB1bmxlc3MgeW91IGV4dGVuZCB0aGUgW1tCZWhhdmlvciNjb25uZWN0XV0gYW5kIFtbQmVoYXZpb3IjZGlzY29ubmVjdF1dIG1ldGhvZHMuXG4gICAgICAgICAqKi9cbiAgICAgICAgYmVoYXZlOiBudWxsXG4gICAgfSk7XG5cbn0oKSk7XG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvY29yZS9ib2R5LmpzXG5cbihmdW5jdGlvbigpe1xuXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuXG4gICAgICAgIC8vIGlzIHRoZSBib2R5IGhpZGRlbiAobm90IHRvIGJlIHJlbmRlcmVkKT9cbiAgICAgICAgaGlkZGVuOiBmYWxzZSxcbiAgICAgICAgLy8gaXMgdGhlIGJvZHkgYGR5bmFtaWNgLCBga2luZW1hdGljYCBvciBgc3RhdGljYD9cbiAgICAgICAgLy8gaHR0cDovL3d3dy5ib3gyZC5vcmcvbWFudWFsLmh0bWwjX1RvYzI1ODA4Mjk3M1xuICAgICAgICB0cmVhdG1lbnQ6ICdkeW5hbWljJyxcbiAgICAgICAgLy8gYm9keSBtYXNzXG4gICAgICAgIG1hc3M6IDEuMCxcbiAgICAgICAgLy8gYm9keSByZXN0aXR1dGlvbi4gSG93IFwiYm91bmN5XCIgaXMgaXQ/XG4gICAgICAgIHJlc3RpdHV0aW9uOiAxLjAsXG4gICAgICAgIC8vIHdoYXQgaXMgaXRzIGNvZWZmaWNpZW50IG9mIGZyaWN0aW9uIHdpdGggYW5vdGhlciBzdXJmYWNlIHdpdGggQ09GID0gMT9cbiAgICAgICAgY29mOiAwLjgsXG4gICAgICAgIC8vIHdoYXQgaXMgdGhlIHZpZXcgb2JqZWN0IChtaXhlZCkgdGhhdCBzaG91bGQgYmUgdXNlZCB3aGVuIHJlbmRlcmluZz9cbiAgICAgICAgdmlldzogbnVsbFxuICAgIH07XG5cbiAgICB2YXIgdWlkR2VuID0gMTtcblxuICAgIHZhciBQaTIgPSBNYXRoLlBJICogMjtcbiAgICBmdW5jdGlvbiBjeWNsZUFuZ2xlKCBhbmcgKXtcbiAgICAgICAgcmV0dXJuICgoYW5nICUgUGkyKSArIFBpMikgJSBQaTI7XG4gICAgfVxuXG4gICAgLyoqIHJlbGF0ZWQgdG86IFBoeXNpY3MudXRpbC5kZWNvcmF0b3JcbiAgICAgKiBQaHlzaWNzLmJvZHkoIG5hbWVbLCBvcHRpb25zXSApIC0+IEJvZHlcbiAgICAgKiAtIG5hbWUgKFN0cmluZyk6IFRoZSBuYW1lIG9mIHRoZSBib2R5IHRvIGNyZWF0ZVxuICAgICAqIC0gb3B0aW9ucyAoT2JqZWN0KTogVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoYXQgYm9keSAoIGRlcGVuZHMgb24gYm9keSApLlxuICAgICAgIEF2YWlsYWJsZSBvcHRpb25zIGFuZCBkZWZhdWx0czpcblxuICAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gaXMgdGhlIGJvZHkgaGlkZGVuIChub3QgdG8gYmUgcmVuZGVyZWQpP1xuICAgICAgICAgICAgaGlkZGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIGlzIHRoZSBib2R5IGBkeW5hbWljYCwgYGtpbmVtYXRpY2Agb3IgYHN0YXRpY2A/XG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LmJveDJkLm9yZy9tYW51YWwuaHRtbCNfVG9jMjU4MDgyOTczXG4gICAgICAgICAgICB0cmVhdG1lbnQ6ICdkeW5hbWljJyxcbiAgICAgICAgICAgIC8vIGJvZHkgbWFzc1xuICAgICAgICAgICAgbWFzczogMS4wLFxuICAgICAgICAgICAgLy8gYm9keSByZXN0aXR1dGlvbi4gSG93IFwiYm91bmN5XCIgaXMgaXQ/XG4gICAgICAgICAgICByZXN0aXR1dGlvbjogMS4wLFxuICAgICAgICAgICAgLy8gd2hhdCBpcyBpdHMgY29lZmZpY2llbnQgb2YgZnJpY3Rpb24gd2l0aCBhbm90aGVyIHN1cmZhY2Ugd2l0aCBDT0YgPSAxP1xuICAgICAgICAgICAgY29mOiAwLjgsXG4gICAgICAgICAgICAvLyB3aGF0IGlzIHRoZSB2aWV3IG9iamVjdCAobWl4ZWQpIHRoYXQgc2hvdWxkIGJlIHVzZWQgd2hlbiByZW5kZXJpbmc/XG4gICAgICAgICAgICB2aWV3OiBudWxsLFxuICAgICAgICAgICAgLy8gdGhlIHZlY3RvciBvZmZzZXR0aW5nIHRoZSBnZW9tZXRyeSBmcm9tIGl0cyBjZW50ZXIgb2YgbWFzc1xuICAgICAgICAgICAgb2Zmc2V0OiBQaHlzaWNzLnZlY3RvcigwLDApXG4gICAgICAgIH1cbiAgICAgICBgYGBcbiAgICAgKlxuICAgICAqIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIEJvZGllcy5cbiAgICAgKlxuICAgICAqIFZpc2l0IFt0aGUgUGh5c2ljc0pTIHdpa2kgb24gQm9kaWVzXShodHRwczovL2dpdGh1Yi5jb20vd2VsbGNhZmZlaW5hdGVkL1BoeXNpY3NKUy93aWtpL0JvZGllcylcbiAgICAgKiBmb3IgdXNhZ2UgZG9jdW1lbnRhdGlvbi5cbiAgICAgKiovXG4gICAgUGh5c2ljcy5ib2R5ID0gRGVjb3JhdG9yKCdib2R5Jywge1xuXG4gICAgICAgIC8qKiBiZWxvbmdzIHRvOiBQaHlzaWNzLmJvZHlcbiAgICAgICAgICogY2xhc3MgQm9keVxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgYmFzZSBjbGFzcyBmb3IgYm9kaWVzIGNyZWF0ZWQgYnkgW1tQaHlzaWNzLmJvZHldXSBmYWN0b3J5IGZ1bmN0aW9uLlxuICAgICAgICAgKiovXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIEJvZHkjaW5pdCggb3B0aW9ucyApXG4gICAgICAgICAqIC0gb3B0aW9ucyAoT2JqZWN0KTogVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBwYXNzZWQgYnkgdGhlIGZhY3RvcnlcbiAgICAgICAgICpcbiAgICAgICAgICogSW5pdGlhbGl6YXRpb24uIEludGVybmFsIHVzZS5cbiAgICAgICAgICoqL1xuICAgICAgICBpbml0OiBmdW5jdGlvbiggb3B0aW9ucyApe1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgdmVjdG9yID0gUGh5c2ljcy52ZWN0b3I7XG5cbiAgICAgICAgICAgIC8qKiByZWxhdGVkIHRvOiBQaHlzaWNzLnV0aWwub3B0aW9uc1xuICAgICAgICAgICAgICogQm9keSNvcHRpb25zKCBvcHRpb25zICkgLT4gT2JqZWN0XG4gICAgICAgICAgICAgKiAtIG9wdGlvbnMgKE9iamVjdCk6IFRoZSBvcHRpb25zIHRvIHNldCBhcyBhbiBvYmplY3RcbiAgICAgICAgICAgICAqICsgKE9iamVjdCk6IFRoZSBvcHRpb25zXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogU2V0IG9wdGlvbnMgb24gdGhpcyBpbnN0YW5jZS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBBY2Nlc3Mgb3B0aW9ucyBkaXJlY3RseSBmcm9tIHRoZSBvcHRpb25zIG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBFeGFtcGxlOlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgICAgICAgICAqIHRoaXMub3B0aW9ucy5zb21lT3B0aW9uO1xuICAgICAgICAgICAgICogYGBgXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICoqL1xuICAgICAgICAgICAgLy8gYWxsIG9wdGlvbnMgZ2V0IGNvcGllZCBvbnRvIHRoZSBib2R5LlxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gUGh5c2ljcy51dGlsLm9wdGlvbnMoIGRlZmF1bHRzLCB0aGlzICk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25DaGFuZ2UoZnVuY3Rpb24oIG9wdHMgKXtcbiAgICAgICAgICAgICAgICBzZWxmLm9mZnNldCA9IG5ldyB2ZWN0b3IoIG9wdHMub2Zmc2V0ICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyggb3B0aW9ucyApO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEJvZHkjc3RhdGVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBUaGUgcGh5c2ljYWwgc3RhdGUgY29udGFpbmVyLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIC0gYGB0aGlzLnN0YXRlLnBvc2BgIChbW1BoeXNpY3MudmVjdG9yXV0pIFRoZSBwb3NpdGlvbiB2ZWN0b3IuXG4gICAgICAgICAgICAgKiAtIGBgdGhpcy5zdGF0ZS52ZWxgYCAoW1tQaHlzaWNzLnZlY3Rvcl1dKSBUaGUgdmVsb2NpdHkgdmVjdG9yLlxuICAgICAgICAgICAgICogLSBgYHRoaXMuc3RhdGUuYWNjYGAgKFtbUGh5c2ljcy52ZWN0b3JdXSkgVGhlIGFjY2VsZXJhdGlvbiB2ZWN0b3IuXG4gICAgICAgICAgICAgKiAtIGBgdGhpcy5zdGF0ZS5hbmd1bGFyLnBvc2BgIChbW051bWJlcl1dKSBUaGUgYW5ndWxhciBwb3NpdGlvbiAoaW4gcmFkaWFucywgcG9zaXRpdmUgaXMgY2xvY2t3aXNlIHN0YXJ0aW5nIGFsb25nIHRoZSB4IGF4aXMpXG4gICAgICAgICAgICAgKiAtIGBgdGhpcy5zdGF0ZS5hbmd1bGFyLnZlbGBgIChbW051bWJlcl1dKSBUaGUgYW5ndWxhciB2ZWxvY2l0eVxuICAgICAgICAgICAgICogLSBgYHRoaXMuc3RhdGUuYW5ndWxhci5hY2NgYCAoW1tOdW1iZXJdXSkgVGhlIGFuZ3VsYXIgYWNjZWxlcmF0aW9uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogUHJvcGVydGllcyBmcm9tIHRoZSBwcmV2aW91cyB0aW1lc3RlcCBhcmUgc3RvcmVkIGluOlxuICAgICAgICAgICAgICogYGBgamF2YXNjcmlwdFxuICAgICAgICAgICAgICogdGhpcy5zdGF0ZS5vbGQ7IC8vIC5wb3MsIC52ZWwsIC4uLlxuICAgICAgICAgICAgICogYGBgXG4gICAgICAgICAgICAgKiovXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHBvczogbmV3IHZlY3RvciggdGhpcy54LCB0aGlzLnkgKSxcbiAgICAgICAgICAgICAgICB2ZWw6IG5ldyB2ZWN0b3IoIHRoaXMudngsIHRoaXMudnkgKSxcbiAgICAgICAgICAgICAgICBhY2M6IG5ldyB2ZWN0b3IoKSxcbiAgICAgICAgICAgICAgICBhbmd1bGFyOiB7XG4gICAgICAgICAgICAgICAgICAgIHBvczogdGhpcy5hbmdsZSB8fCAwLjAsXG4gICAgICAgICAgICAgICAgICAgIHZlbDogdGhpcy5hbmd1bGFyVmVsb2NpdHkgfHwgMC4wLFxuICAgICAgICAgICAgICAgICAgICBhY2M6IDAuMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb2xkOiB7XG4gICAgICAgICAgICAgICAgICAgIHBvczogbmV3IHZlY3RvcigpLFxuICAgICAgICAgICAgICAgICAgICB2ZWw6IG5ldyB2ZWN0b3IoKSxcbiAgICAgICAgICAgICAgICAgICAgYWNjOiBuZXcgdmVjdG9yKCksXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczogMC4wLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVsOiAwLjAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2M6IDAuMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcHJpdmF0ZSBzdG9yYWdlIGZvciBzbGVlcGluZ1xuICAgICAgICAgICAgdGhpcy5fc2xlZXBBbmdQb3NNZWFuID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3NsZWVwQW5nUG9zVmFyaWFuY2UgPSAwO1xuICAgICAgICAgICAgdGhpcy5fc2xlZXBQb3NNZWFuID0gbmV3IHZlY3RvcigpO1xuICAgICAgICAgICAgdGhpcy5fc2xlZXBQb3NWYXJpYW5jZSA9IG5ldyB2ZWN0b3IoKTtcbiAgICAgICAgICAgIHRoaXMuX3NsZWVwTWVhbksgPSAwO1xuXG4gICAgICAgICAgICAvLyBjbGVhbnVwXG4gICAgICAgICAgICBkZWxldGUgdGhpcy54O1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMueTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnZ4O1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMudnk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hbmdsZTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFuZ3VsYXJWZWxvY2l0eTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubWFzcyA9PT0gMCl7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJFcnJvcjogQm9kaWVzIG11c3QgaGF2ZSBub24temVybyBtYXNzXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQm9keSN1aWQgPSBOdW1iZXJcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBUaGUgdW5pcXVlIGlkIGZvciB0aGUgYm9keVxuICAgICAgICAgICAgICoqL1xuICAgICAgICAgICAgdGhpcy51aWQgPSB1aWRHZW4rKztcblxuICAgICAgICAgICAgLyoqIHJlbGF0ZWQgdG86IFBoeXNpY3MuZ2VvbWV0cnlcbiAgICAgICAgICAgICAqIEJvZHkjZ2VvbWV0cnlcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBUaGUgZ2VvbWV0cnkgZm9yIHRoaXMgYm9keS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBCeSBkZWZhdWx0IGl0IGlzIGEgYHBvaW50YCBnZW9tZXRyeSB3aGljaCBnZXRzIG92ZXJyaWRkZW4uXG4gICAgICAgICAgICAgKiovXG4gICAgICAgICAgICB0aGlzLmdlb21ldHJ5ID0gUGh5c2ljcy5nZW9tZXRyeSgncG9pbnQnKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCb2R5I21hc3MgPSAxLjBcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBUaGUgbWFzcy5cbiAgICAgICAgICAgICAqKi9cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCb2R5I29mZnNldFxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIFRoZSB2ZWN0b3Igb2Zmc2V0dGluZyB0aGUgYm9keSdzIHNoYXBlIGZyb20gaXRzIGNlbnRlciBvZiBtYXNzLlxuICAgICAgICAgICAgICoqL1xuXG4gICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICogQm9keSNyZXN0aXR1dGlvbiA9IDEuMFxuICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICogVGhlIHJlc3RpdHV0aW9uLlxuICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICogVGhpcyBpcyB0aGUgXCJib3VuY2luZXNzXCIgb2YgdGhlIGJvZHkuXG4gICAgICAgICAgICAgICogSXQncyBhIG51bWJlciBiZXR3ZWVuIGAwYCBhbmQgYDFgLlxuICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICogQSByZXN0aXR1dGlvbiBvZiAxIGlzIHRoZSBib3VuY2llc3QuXG4gICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgKiBBIHJlc3RpdHV0aW9uIG9mIDAgaXMgbm90IGJvdW5jeS5cbiAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAqIFdoZW4gY29sbGlkaW5nIHRoZSByZXN0aXR1dGlvbnMgb2YgYm9kaWVzIGFyZVxuICAgICAgICAgICAgICAqIG11bHRpcGxpZWQgdG9nZXRoZXIgdG8gZ2V0IHRoZSByZXN0aXR1dGlvbiBiZXR3ZWVuIHR3b1xuICAgICAgICAgICAgICAqIGJvZGllcy5cbiAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAqKi9cblxuICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICogQm9keSNjb2YgPSAwLjhcbiAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICogVGhlIGNvZWZmaWNpZW50IG9mIGZyaWN0aW9uIG9mIHRoZSBib2R5LlxuICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgKiBJdCdzIGhvdyBtdWNoIFwic2xpZGVcIiBpdCBoYXMgZHVyaW5nIGNvbGxpc2lvbnMuXG4gICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAqIEEgYGNvZmAgb2YgYDBgIHdpbGwgcmVhbGx5IHNsaWR5LlxuICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgKiBBIGBjb2ZgIG9mIGAxYCBoYXMgbm8gc2xpZGUuXG4gICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAqIFRoaXMgaXMgYSB2ZXJ5IHNpbXBsaXN0aWMgaW1wbGVtZW50YXRpb24gYXQgdGhlIG1vbWVudC5cbiAgICAgICAgICAgICAgICogV2hhdCB3b3VsZCBiZSBiZXR0ZXIgaXMgdG8gaGF2ZSBib3RoIHN0YXRpYyBhbmQga2luZXRpY1xuICAgICAgICAgICAgICAgKiBmcmljdGlvbi4gQnV0IHRoYXQncyBub3QgZG9uZSB5ZXQuXG4gICAgICAgICAgICAgICAqKi9cblxuICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBCb2R5I3RyZWF0bWVudCA9IFN0cmluZ1xuICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAqIEhvdyB0aGUgYm9keSBpcyB0cmVhdGVkIGJ5IHRoZSBzaW11bGF0aW9uLlxuICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAqIFRoZSBib2R5IGNhbiBiZSBgZHluYW1pY2AsIGBraW5lbWF0aWNgIG9yIGBzdGF0aWNgIGFzXG4gICAgICAgICAgICAgICAgKiBkZXNjcmliZWQgYnkgdGhlIFthbmFsb2dvdXMgYm94MmQgZG9jc10oaHR0cDovL3d3dy5ib3gyZC5vcmcvbWFudWFsLmh0bWwjX1RvYzI1ODA4Mjk3MykuXG4gICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICogKiBfZHluYW1pY18gYm9kaWVzIGFyZSB0cmVhdGVkIFwibm9ybWFsbHlcIi4gVGhleSBhcmUgaW50ZWdyYXRlZCwgYW5kIGNvbGxpZGUsIGFuZCBhbGwgdGhhdC5cbiAgICAgICAgICAgICAgICAqICogX2tpbmVtYXRpY18gYm9kaWVzIGFyZSBib2RpZXMgdGhhdCBtb3ZlIGF0IGEgc3BlY2lmaWVkIHZlbG9jaXR5LiBPdGhlciBib2RpZXMgY29sbGlkZSB3aXRoIHRoZW0sIGJ1dCB0aGV5IGRvbid0IGJvdW5jZSBvZmYgb2Ygb3RoZXIgYm9kaWVzLlxuICAgICAgICAgICAgICAgICogKiBfc3RhdGljXyBib2RpZXMganVzdCBzdGFuZCBzdGlsbC4gVGhleSBhcmUgbGlrZSBvYnN0YWNsZXMuXG4gICAgICAgICAgICAgICAgKiovXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBCb2R5I2hpZGRlbiA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGJvZHkgc2hvdWxkIGJlIGhpZGRlbiBieSB0aGUgcmVuZGVyZXIuXG4gICAgICAgICAgICAgICAgICoqL1xuXG4gICAgICAgICAgICAgICAgLyoqIHJlbGF0ZWQgdG86IFBoeXNpY3MucmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgKiBCb2R5I3ZpZXcgPSBpdF9kZXBlbmRzXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiBTdG9yYWdlIGZvciB1c2UgYnkgdGhlIHJlbmRlcmVyLlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogVGhlIHR5cGUgb2YgcmVuZGVyZXIgd2lsbCBwdXQgZGlmZmVyZW50IHRoaW5ncyBpbiB0aGUgdmlldyBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAgKiBCYXNpY2FsbHksIHRoaXMgaXMgaG93IHRoZSBib2R5IFwibG9va3NcIi4gSXQgY291bGQgYmUgYSBIVE1MRWxlbWVudCwgb3JcbiAgICAgICAgICAgICAgICAgKiBhbiBJbWFnZSwgZXRjLi4uXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiBJZiB5b3VyIGJvZHkgY2hhbmdlcyBhcHBlYXJhbmNlIChzaGFwZSksIHlvdSBzaG91bGQgbW9kaWZ5IHRoaXMgc29tZWhvd1xuICAgICAgICAgICAgICAgICAqIG90aGVyd2lzZSB0aGUgcmVuZGVyZXIgd2lsbCBrZWVwIHVzaW5nIHRoaXMgc2FtZSB2aWV3LiBJZiB5b3UncmUgbGV0dGluZ1xuICAgICAgICAgICAgICAgICAqIHRoZSByZW5kZXJlciBjcmVhdGUgdGhlIHZpZXcgZm9yIHlvdSwganVzdCBzZXQgdGhpcyB0byBgdW5kZWZpbmVkYCBpZiB0aGVcbiAgICAgICAgICAgICAgICAgKiBib2R5IGdldHMgbW9kaWZpZWQgaW4gc2hhcGUgZHVyaW5nIHRoZSBzaW11bGF0aW9uLlxuICAgICAgICAgICAgICAgICAqKi9cblxuICAgICAgICAgICAgICAgIC8qKiByZWxhdGVkIHRvOiBQaHlzaWNzLnJlbmRlcmVyXG4gICAgICAgICAgICAgICAgICogQm9keSNzdHlsZXNcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIFRoZSBzdHlsZXMgdGhlIHJlbmRlcmVyIHNob3VsZCB1c2UgZm9yIGNyZWF0aW5nIHRoZSB2aWV3LlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogVGhlIHN0eWxlcyBkZXBlbmQgb24gdGhlIHJlbmRlcmVyLiBTZWUgW1tSZW5kZXJlciNjcmVhdGVWaWV3XV0gZm9yIHN0eWxlIG9wdGlvbnMuXG4gICAgICAgICAgICAgICAgICoqL1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCb2R5I3NsZWVwKCBbZHRdICkgLT4gQm9vbGVhblxuICAgICAgICAgKiAtIGR0IChOdW1iZXIpOiBUaW1lIHRvIGFkdmFuY2UgdGhlIGlkbGUgdGltZVxuICAgICAgICAgKiAtIGR0IChCb29sZWFuKTogSWYgYHRydWVgLCB0aGUgYm9keSB3aWxsIGJlIGZvcmNlZCB0byBzbGVlcC4gSWYgYGZhbHNlYCwgdGhlIGJvZHkgd2lsbCBiZSBmb3JjZWQgdG8gYXdha2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEdldCBhbmQvb3Igc2V0IHdoZXRoZXIgdGhlIGJvZHkgaXMgYXNsZWVwLlxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiBjYWxsZWQgd2l0aCBhIHRpbWUgKGluIG1zKSwgdGhlIHRpbWUgd2lsbCBiZSBhZGRlZCB0byB0aGUgaWRsZSB0aW1lIGFuZCBzbGVlcCBjb25kaXRpb25zIHdpbGwgYmUgY2hlY2tlZC5cbiAgICAgICAgICoqL1xuICAgICAgICBzbGVlcDogZnVuY3Rpb24oIGR0ICl7XG5cbiAgICAgICAgICAgIGlmICggZHQgPT09IHRydWUgKXtcbiAgICAgICAgICAgICAgICAvLyBmb3JjZSBzbGVlcFxuICAgICAgICAgICAgICAgIHRoaXMuYXNsZWVwID0gdHJ1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggZHQgPT09IGZhbHNlICl7XG4gICAgICAgICAgICAgICAgLy8gZm9yY2Ugd2FrdXBcbiAgICAgICAgICAgICAgICB0aGlzLmFzbGVlcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NsZWVwTWVhbksgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NsZWVwQW5nUG9zTWVhbiA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2xlZXBBbmdQb3NWYXJpYW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2xlZXBQb3NNZWFuLnplcm8oKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zbGVlcFBvc1ZhcmlhbmNlLnplcm8oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNsZWVwSWRsZVRpbWUgPSAwO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBkdCAmJiAhdGhpcy5hc2xlZXAgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNsZWVwQ2hlY2soIGR0ICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzbGVlcDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQm9keSNzbGVlcENoZWNrKCBbZHRdIClcbiAgICAgICAgICogLSBkdCAoTnVtYmVyKTogVGltZSB0byBhZHZhbmNlIHRoZSBpZGxlIHRpbWVcbiAgICAgICAgICpcbiAgICAgICAgICogQ2hlY2sgaWYgdGhlIGJvZHkgc2hvdWxkIGJlIHNsZWVwaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBDYWxsIHdpdGggbm8gYXJndW1lbnRzIGlmIHNvbWUgZXZlbnQgY291bGQgcG9zc2libHkgd2FrZSB1cCB0aGUgYm9keS4gVGhpcyB3aWxsIGZvcmNlIHRoZSBib2R5IHRvIHJlY2hlY2suXG4gICAgICAgICAqKi9cbiAgICAgICAgc2xlZXBDaGVjazogZnVuY3Rpb24oIGR0ICl7XG5cbiAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5fd29ybGQgJiYgdGhpcy5fd29ybGQub3B0aW9ucztcblxuICAgICAgICAgICAgLy8gaWYgc2xlZXBpbmcgZGlzYWJsZWQuIHN0b3AuXG4gICAgICAgICAgICBpZiAoIHRoaXMuc2xlZXBEaXNhYmxlZCB8fCAob3B0cyAmJiBvcHRzLnNsZWVwRGlzYWJsZWQpICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGltaXRcbiAgICAgICAgICAgICAgICAsdlxuICAgICAgICAgICAgICAgICxkXG4gICAgICAgICAgICAgICAgLHJcbiAgICAgICAgICAgICAgICAsYWFiYlxuICAgICAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAsZGlmZiA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICAgICAsZGlmZjIgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICAgICAgICAgLGtmYWNcbiAgICAgICAgICAgICAgICAsc3RhdHNcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGR0ID0gZHQgfHwgMDtcbiAgICAgICAgICAgIGFhYmIgPSB0aGlzLmdlb21ldHJ5LmFhYmIoKTtcbiAgICAgICAgICAgIHIgPSBNYXRoLm1heChhYWJiLmh3LCBhYWJiLmhoKTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmFzbGVlcCApe1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIHZlbG9jaXR5XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuc3RhdGUudmVsLm5vcm0oKSArIE1hdGguYWJzKHIgKiB0aGlzLnN0YXRlLmFuZ3VsYXIudmVsKTtcbiAgICAgICAgICAgICAgICBsaW1pdCA9IHRoaXMuc2xlZXBTcGVlZExpbWl0IHx8IChvcHRzICYmIG9wdHMuc2xlZXBTcGVlZExpbWl0KSB8fCAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCB2ID49IGxpbWl0ICl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xlZXAoIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY3JhdGNoLmRvbmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3NsZWVwTWVhbksrKztcbiAgICAgICAgICAgIGtmYWMgPSB0aGlzLl9zbGVlcE1lYW5LID4gMSA/IDEvKHRoaXMuX3NsZWVwTWVhbksgLSAxKSA6IDA7XG4gICAgICAgICAgICBQaHlzaWNzLnN0YXRpc3RpY3MucHVzaFJ1bm5pbmdWZWN0b3JBdmcoIHRoaXMuc3RhdGUucG9zLCB0aGlzLl9zbGVlcE1lYW5LLCB0aGlzLl9zbGVlcFBvc01lYW4sIHRoaXMuX3NsZWVwUG9zVmFyaWFuY2UgKTtcbiAgICAgICAgICAgIC8vIHdlIHRha2UgdGhlIHNpbiBiZWNhdXNlIHRoYXQgbWFwcyB0aGUgZGlzY29udGludW91cyBhbmdsZSB0byBhIGNvbnRpbnVvdXMgdmFsdWVcbiAgICAgICAgICAgIC8vIHRoZW4gdGhlIHN0YXRpc3RpY3MgY2FsY3VsYXRpb25zIHdvcmsgYmV0dGVyXG4gICAgICAgICAgICBzdGF0cyA9IFBoeXNpY3Muc3RhdGlzdGljcy5wdXNoUnVubmluZ0F2ZyggTWF0aC5zaW4odGhpcy5zdGF0ZS5hbmd1bGFyLnBvcyksIHRoaXMuX3NsZWVwTWVhbkssIHRoaXMuX3NsZWVwQW5nUG9zTWVhbiwgdGhpcy5fc2xlZXBBbmdQb3NWYXJpYW5jZSApO1xuICAgICAgICAgICAgdGhpcy5fc2xlZXBBbmdQb3NNZWFuID0gc3RhdHNbMF07XG4gICAgICAgICAgICB0aGlzLl9zbGVlcEFuZ1Bvc1ZhcmlhbmNlID0gc3RhdHNbMV07XG4gICAgICAgICAgICB2ID0gdGhpcy5fc2xlZXBQb3NWYXJpYW5jZS5ub3JtKCkgKyBNYXRoLmFicyhyICogTWF0aC5hc2luKHN0YXRzWzFdKSk7XG4gICAgICAgICAgICB2ICo9IGtmYWM7XG4gICAgICAgICAgICBsaW1pdCA9IHRoaXMuc2xlZXBWYXJpYW5jZUxpbWl0IHx8IChvcHRzICYmIG9wdHMuc2xlZXBWYXJpYW5jZUxpbWl0KSB8fCAwO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codiwgbGltaXQsIGtmYWMsIHRoaXMuX3NsZWVwUG9zVmFyaWFuY2Uubm9ybSgpLCBzdGF0c1sxXSlcbiAgICAgICAgICAgIGlmICggdiA8PSBsaW1pdCApe1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlkbGUgdGltZVxuICAgICAgICAgICAgICAgIGxpbWl0ID0gdGhpcy5zbGVlcFRpbWVMaW1pdCB8fCAob3B0cyAmJiBvcHRzLnNsZWVwVGltZUxpbWl0KSB8fCAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2xlZXBJZGxlVGltZSA9ICh0aGlzLnNsZWVwSWRsZVRpbWUgfHwgMCkgKyBkdDtcblxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5zbGVlcElkbGVUaW1lID4gbGltaXQgKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hc2xlZXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGVlcCggZmFsc2UgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJvZHkjc2V0V29ybGQoIHdvcmxkICkgLT4gdGhpc1xuICAgICAgICAgKiAtIHdvcmxkIChPYmplY3QpOiBUaGUgd29ybGQgKG9yIG51bGwpXG4gICAgICAgICAqXG4gICAgICAgICAqIFNldCB3aGljaCB3b3JsZCB0byBhcHBseSB0by5cbiAgICAgICAgICpcbiAgICAgICAgICogVXN1YWxseSB0aGlzIGlzIGNhbGxlZCBpbnRlcm5hbGx5LiBTaG91bGRuJ3QgYmUgYSBuZWVkIHRvIGNhbGwgdGhpcyB5b3Vyc2VsZiB1c3VhbGx5LlxuICAgICAgICAgKiovXG4gICAgICAgIHNldFdvcmxkOiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmRpc2Nvbm5lY3QgJiYgdGhpcy5fd29ybGQgKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoIHRoaXMuX3dvcmxkICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3dvcmxkID0gd29ybGQ7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5jb25uZWN0ICYmIHdvcmxkICl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0KCB3b3JsZCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQm9keSNhY2NlbGVyYXRlKCBhY2MgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gYWNjIChQaHlzaWNzLnZlY3Rvcik6IFRoZSBhY2NlbGVyYXRpb24gdmVjdG9yXG4gICAgICAgICAqXG4gICAgICAgICAqIEFjY2VsZXJhdGUgdGhlIGJvZHkgYnkgYWRkaW5nIHN1cHBsaWVkIHZlY3RvciB0byBpdHMgY3VycmVudCBhY2NlbGVyYXRpb25cbiAgICAgICAgICoqL1xuICAgICAgICBhY2NlbGVyYXRlOiBmdW5jdGlvbiggYWNjICl7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy50cmVhdG1lbnQgPT09ICdkeW5hbWljJyApe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYWNjLnZhZGQoIGFjYyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQm9keSNhcHBseUZvcmNlKCBmb3JjZVssIHBdICkgLT4gdGhpc1xuICAgICAgICAgKiAtIGZvcmNlIChWZWN0b3Jpc2gpOiBUaGUgZm9yY2UgdmVjdG9yXG4gICAgICAgICAqIC0gcCAoVmVjdG9yaXNoKTogVGhlIHBvaW50IHZlY3RvciBmcm9tIHRoZSBDT00gYXQgd2hpY2ggdG8gYXBwbHkgdGhlIGZvcmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEFwcGx5IGEgZm9yY2UgYXQgY2VudGVyIG9mIG1hc3MsIG9yIGF0IHBvaW50IGBwYCByZWxhdGl2ZSB0byB0aGUgY2VudGVyIG9mIG1hc3NcbiAgICAgICAgICoqL1xuICAgICAgICBhcHBseUZvcmNlOiBmdW5jdGlvbiggZm9yY2UsIHAgKXtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLnRyZWF0bWVudCAhPT0gJ2R5bmFtaWMnICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAsciA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICAgICAsc3RhdGVcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIC8vIGlmIG5vIHBvaW50IGF0IHdoaWNoIHRvIGFwcGx5IHRoZSBmb3JjZS4uLiBhcHBseSBhdCBjZW50ZXIgb2YgbWFzc1xuICAgICAgICAgICAgaWYgKCBwICYmIHRoaXMubW9pICl7XG5cbiAgICAgICAgICAgICAgICAvLyBhcHBseSB0b3JxdWVzXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICAgICAgICAgIHIuY2xvbmUoIHAgKTtcbiAgICAgICAgICAgICAgICAvLyByIGNyb3NzIEZcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFuZ3VsYXIuYWNjIC09IHIuY3Jvc3MoIGZvcmNlICkgLyB0aGlzLm1vaTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hY2NlbGVyYXRlKCByLmNsb25lKCBmb3JjZSApLm11bHQoIDEvdGhpcy5tYXNzICkgKTtcblxuICAgICAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogcmVsYXRlZCB0bzogQm9keSNvZmZzZXRcbiAgICAgICAgICogQm9keSNnZXRHbG9iYWxPZmZzZXQoIFtvdXRdICkgLT4gUGh5c2ljcy52ZWN0b3JcbiAgICAgICAgICogLSBvdXQgKFBoeXNpY3MudmVjdG9yKTogQSB2ZWN0b3IgdG8gdXNlIHRvIHB1dCB0aGUgcmVzdWx0IGludG8uIE9uZSBpcyBjcmVhdGVkIGlmIGBvdXRgIGlzbid0IHNwZWNpZmllZC5cbiAgICAgICAgICogKyAoUGh5c2ljcy52ZWN0b3IpOiBUaGUgb2Zmc2V0IGluIGdsb2JhbCBjb29yZGluYXRlc1xuICAgICAgICAgKlxuICAgICAgICAgKiBHZXQgdGhlIGJvZHkgb2Zmc2V0IHZlY3RvciAoZnJvbSB0aGUgY2VudGVyIG9mIG1hc3MpIGZvciB0aGUgYm9keSdzIHNoYXBlIGluIGdsb2JhbCBjb29yZGluYXRlcy5cbiAgICAgICAgICoqL1xuICAgICAgICBnZXRHbG9iYWxPZmZzZXQ6IGZ1bmN0aW9uKCBvdXQgKXtcblxuICAgICAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBQaHlzaWNzLnZlY3RvcigpO1xuICAgICAgICAgICAgb3V0LmNsb25lKCB0aGlzLm9mZnNldCApLnJvdGF0ZSggdGhpcy5zdGF0ZS5hbmd1bGFyLnBvcyApO1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogcmVsYXRlZCB0bzogUGh5c2ljcy5hYWJiXG4gICAgICAgICAqIEJvZHkjYWFiYigpIC0+IE9iamVjdFxuICAgICAgICAgKiArIChPYmplY3QpOiBUaGUgYWFiYiBvZiB0aGlzIGJvZHlcbiAgICAgICAgICpcbiAgICAgICAgICogR2V0IHRoZSBBeGlzIGFsaWduZWQgYm91bmRpbmcgYm94IGZvciB0aGUgYm9keSBpbiBpdHMgY3VycmVudCBwb3NpdGlvbiBhbmQgcm90YXRpb25cbiAgICAgICAgICoqL1xuICAgICAgICBhYWJiOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgYW5nbGUgPSB0aGlzLnN0YXRlLmFuZ3VsYXIucG9zXG4gICAgICAgICAgICAgICAgLHNjcmF0Y2ggPSBQaHlzaWNzLnNjcmF0Y2hwYWQoKVxuICAgICAgICAgICAgICAgICx2ID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgICAgICxhYWJiID0gdGhpcy5nZW9tZXRyeS5hYWJiKCBhbmdsZSApXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICB0aGlzLmdldEdsb2JhbE9mZnNldCggdiApO1xuXG4gICAgICAgICAgICBhYWJiLnggKz0gdGhpcy5zdGF0ZS5wb3MuX1swXSArIHYuX1swXTtcbiAgICAgICAgICAgIGFhYmIueSArPSB0aGlzLnN0YXRlLnBvcy5fWzFdICsgdi5fWzFdO1xuXG4gICAgICAgICAgICByZXR1cm4gc2NyYXRjaC5kb25lKCBhYWJiICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJvZHkjdG9Cb2R5Q29vcmRzKCB2ICkgLT4gUGh5c2ljcy52ZWN0b3JcbiAgICAgICAgICogLSB2IChQaHlzaWNzLnZlY3Rvcik6IFRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAgICAgICAqICsgKFBoeXNpY3MudmVjdG9yKTogVGhlIHRyYW5zZm9ybWVkIHZlY3RvclxuICAgICAgICAgKlxuICAgICAgICAgKiBUcmFuc2Zvcm0gYSB2ZWN0b3IgaW50byBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGlzIGJvZHkuXG4gICAgICAgICAqKi9cbiAgICAgICAgdG9Cb2R5Q29vcmRzOiBmdW5jdGlvbiggdiApe1xuICAgICAgICAgICAgcmV0dXJuIHYudnN1YiggdGhpcy5zdGF0ZS5wb3MgKS5yb3RhdGUoIC10aGlzLnN0YXRlLmFuZ3VsYXIucG9zICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAgKiBCb2R5I3RvV29ybGRDb29yZHMoIHYgKSAtPiBQaHlzaWNzLnZlY3RvclxuICAgICAgICAgICogLSB2IChQaHlzaWNzLnZlY3Rvcik6IFRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAgICAgICAgKiArIChQaHlzaWNzLnZlY3Rvcik6IFRoZSB0cmFuc2Zvcm1lZCB2ZWN0b3JcbiAgICAgICAgICAqXG4gICAgICAgICAgKiBUcmFuc2Zvcm0gYSB2ZWN0b3IgZnJvbSBib2R5IGNvb3JkaW5hdGVzIGludG8gd29ybGQgY29vcmRpbmF0ZXMuXG4gICAgICAgICAgKiovXG4gICAgICAgIHRvV29ybGRDb29yZHM6IGZ1bmN0aW9uKCB2ICl7XG4gICAgICAgICAgICByZXR1cm4gdi5yb3RhdGUoIHRoaXMuc3RhdGUuYW5ndWxhci5wb3MgKS52YWRkKCB0aGlzLnN0YXRlLnBvcyApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCb2R5I3JlY2FsYygpIC0+IHRoaXNcbiAgICAgICAgICpcbiAgICAgICAgICogUmVjYWxjdWxhdGUgcHJvcGVydGllcy5cbiAgICAgICAgICpcbiAgICAgICAgICogSW50ZW5kZWQgdG8gYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzLiBDYWxsIHdoZW4gYm9keSBwaHlzaWNhbCBwcm9wZXJ0aWVzIGFyZSBjaGFuZ2VkLlxuICAgICAgICAgKiovXG4gICAgICAgIHJlY2FsYzogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIG92ZXJyaWRlIHRvIHJlY2FsY3VsYXRlIHByb3BlcnRpZXNcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBCb2R5LmdldENPTSggYm9kaWVzWywgY29tXSApIC0+IFBoeXNpY3MudmVjdG9yXG4gICAgICogLSBib2RpZXMgKEFycmF5KTogVGhlIGxpc3Qgb2YgYm9kaWVzXG4gICAgICogLSBjb20gKFBoeXNpY3MudmVjdG9yKTogVGhlIHZlY3RvciB0byBwdXQgcmVzdWx0IGludG8uIEEgbmV3IHZlY3RvciB3aWxsIGJlIGNyZWF0ZWQgaWYgbm90IHByb3ZpZGVkLlxuICAgICAqICsgKFBoeXNpY3MudmVjdG9yKTogVGhlIGNlbnRlciBvZiBtYXNzIHBvc2l0aW9uXG4gICAgICpcbiAgICAgKiBHZXQgY2VudGVyIG9mIG1hc3MgcG9zaXRpb24gZnJvbSBsaXN0IG9mIGJvZGllcy5cbiAgICAgKiovXG4gICAgUGh5c2ljcy5ib2R5LmdldENPTSA9IGZ1bmN0aW9uKCBib2RpZXMsIGNvbSApe1xuICAgICAgICAvLyBAVE9ETyBhZGQgYSB0ZXN0IGZvciB0aGlzIGZuXG4gICAgICAgIHZhciBiXG4gICAgICAgICAgICAscG9zXG4gICAgICAgICAgICAsaVxuICAgICAgICAgICAgLGwgPSBib2RpZXMgJiYgYm9kaWVzLmxlbmd0aFxuICAgICAgICAgICAgLE0gPSAwXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgY29tID0gY29tIHx8IG5ldyBQaHlzaWNzLnZlY3RvcigpO1xuXG4gICAgICAgIGlmICggIWwgKXtcbiAgICAgICAgICAgIHJldHVybiBjb20uemVybygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBsID09PSAxICl7XG4gICAgICAgICAgICByZXR1cm4gY29tLmNsb25lKCBib2RpZXNbMF0uc3RhdGUucG9zICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb20uemVybygpO1xuXG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbDsgaSsrICl7XG4gICAgICAgICAgICBiID0gYm9kaWVzWyBpIF07XG4gICAgICAgICAgICBwb3MgPSBiLnN0YXRlLnBvcztcbiAgICAgICAgICAgIGNvbS5hZGQoIHBvcy5fWzBdICogYi5tYXNzLCBwb3MuX1sxXSAqIGIubWFzcyApO1xuICAgICAgICAgICAgTSArPSBiLm1hc3M7XG4gICAgICAgIH1cblxuICAgICAgICBjb20ubXVsdCggMSAvIE0gKTtcblxuICAgICAgICByZXR1cm4gY29tO1xuICAgIH07XG5cbn0oKSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9jb3JlL2dlb21ldHJ5LmpzXG5cbihmdW5jdGlvbigpe1xuICAgIC8qKiByZWxhdGVkIHRvOiBQaHlzaWNzLnV0aWwuZGVjb3JhdG9yXG4gICAgICogUGh5c2ljcy5nZW9tZXRyeSggbmFtZVssIG9wdGlvbnNdICkgLT4gR2VvbWV0cnlcbiAgICAgKiAtIG5hbWUgKFN0cmluZyk6IFRoZSBuYW1lIG9mIHRoZSBnZW9tZXRyeSB0byBjcmVhdGVcbiAgICAgKiAtIG9wdGlvbnMgKE9iamVjdCk6IFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGF0IGdlb21ldHJ5ICggZGVwZW5kcyBvbiBnZW9tZXRyeSApLlxuICAgICAqXG4gICAgICogRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgR2VvbWV0cmllcy5cbiAgICAgKlxuICAgICAqIFZpc2l0IFt0aGUgUGh5c2ljc0pTIHdpa2kgb24gR2VvbWV0cmllc10oaHR0cHM6Ly9naXRodWIuY29tL3dlbGxjYWZmZWluYXRlZC9QaHlzaWNzSlMvd2lraS9HZW9tZXRyaWVzKVxuICAgICAqIGZvciB1c2FnZSBkb2N1bWVudGF0aW9uLlxuICAgICAqKi9cbiAgICBQaHlzaWNzLmdlb21ldHJ5ID0gRGVjb3JhdG9yKCdnZW9tZXRyeScsIHtcblxuICAgICAgICAvKiogYmVsb25ncyB0bzogUGh5c2ljcy5nZW9tZXRyeVxuICAgICAgICAgKiBjbGFzcyBHZW9tZXRyeVxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgYmFzZSBjbGFzcyBmb3IgZ2VvbWV0cmllcyBjcmVhdGVkIGJ5IFtbUGh5c2ljcy5nZW9tZXRyeV1dIGZhY3RvcnkgZnVuY3Rpb24uXG4gICAgICAgICAqKi9cblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogR2VvbWV0cnkjaW5pdCggb3B0aW9ucyApXG4gICAgICAgICAqIC0gb3B0aW9ucyAoT2JqZWN0KTogVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBwYXNzZWQgYnkgdGhlIGZhY3RvcnlcbiAgICAgICAgICogXG4gICAgICAgICAqIEluaXRpYWxpemF0aW9uLiBJbnRlcm5hbCB1c2UuXG4gICAgICAgICAqKi9cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgLyoqIHJlbGF0ZWQgdG86IFBoeXNpY3MudXRpbC5vcHRpb25zXG4gICAgICAgICAgICAgKiBHZW9tZXRyeSNvcHRpb25zKCBvcHRpb25zICkgLT4gT2JqZWN0XG4gICAgICAgICAgICAgKiAtIG9wdGlvbnMgKE9iamVjdCk6IFRoZSBvcHRpb25zIHRvIHNldCBhcyBhbiBvYmplY3RcbiAgICAgICAgICAgICAqICsgKE9iamVjdCk6IFRoZSBvcHRpb25zXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIFNldCBvcHRpb25zIG9uIHRoaXMgaW5zdGFuY2UuIFxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKiBBY2Nlc3Mgb3B0aW9ucyBkaXJlY3RseSBmcm9tIHRoZSBvcHRpb25zIG9iamVjdC5cbiAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICogRXhhbXBsZTpcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICAgICAgICAgKiB0aGlzLm9wdGlvbnMuc29tZU9wdGlvbjtcbiAgICAgICAgICAgICAqIGBgYFxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKiovXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBQaHlzaWNzLnV0aWwub3B0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zKCBvcHRpb25zICk7XG5cbiAgICAgICAgICAgIHRoaXMuX2FhYmIgPSBuZXcgUGh5c2ljcy5hYWJiKCk7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAvKiogcmVsYXRlZCB0bzogUGh5c2ljcy5hYWJiXG4gICAgICAgICAqIEdlb21ldHJ5I2FhYmIoIGFuZ2xlICkgLT4gT2JqZWN0XG4gICAgICAgICAqIC0gYW5nbGUgKE51bWJlcik6IFRoZSBhbmdsZSB0byByb3RhdGUgdGhlIGdlb21ldHJ5XG4gICAgICAgICAqICsgKE9iamVjdCk6IEJvdW5kaW5nIGJveCB2YWx1ZXNcbiAgICAgICAgICogXG4gICAgICAgICAqIEdldCBheGlzLWFsaWduZWQgYm91bmRpbmcgYm94IGZvciB0aGlzIG9iamVjdCAocm90YXRlZCBieSBhbmdsZSBpZiBzcGVjaWZpZWQpLlxuICAgICAgICAgKiovXG4gICAgICAgIGFhYmI6IGZ1bmN0aW9uKCBhbmdsZSApe1xuXG4gICAgICAgICAgICByZXR1cm4gUGh5c2ljcy5hYWJiLmNsb25lKHRoaXMuX2FhYmIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZW9tZXRyeSNnZXRGYXJ0aGVzdEh1bGxQb2ludCggZGlyWywgcmVzdWx0XSApIC0+IFBoeXNpY3MudmVjdG9yXG4gICAgICAgICAqIC0gZGlyIChQaHlzaWNzLnZlY3Rvcik6IERpcmVjdGlvbiB0byBsb29rXG4gICAgICAgICAqIC0gcmVzdWx0IChQaHlzaWNzLnZlY3Rvcik6IEEgdmVjdG9yIHRvIHdyaXRlIHJlc3VsdCB0by4gU3BlZWRzIHVwIGNhbGN1bGF0aW9ucy5cbiAgICAgICAgICogKyAoUGh5c2ljcy52ZWN0b3IpOiBUaGUgZmFydGhlc3QgaHVsbCBwb2ludCBpbiBsb2NhbCBjb29yZGluYXRlc1xuICAgICAgICAgKiBcbiAgICAgICAgICogR2V0IGZhcnRoZXN0IHBvaW50IG9uIHRoZSBodWxsIG9mIHRoaXMgZ2VvbWV0cnlcbiAgICAgICAgICogYWxvbmcgdGhlIGRpcmVjdGlvbiB2ZWN0b3IgYGRpcmBcbiAgICAgICAgICogcmV0dXJucyBsb2NhbCBjb29yZGluYXRlcy4gUmVwbGFjZXMgcmVzdWx0IGlmIHByb3ZpZGVkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBBc3N1bWUgYWxsIGNvb3JkaW5hdGVzIGFyZSByZWxhdGl2ZSB0byB0aGUgZ2VvbWV0cnkgXG4gICAgICAgICAqIGNlbnRyb2lkIChJRTogaW4gdGhlIGJvZHkgZnJhbWUpLlxuICAgICAgICAgKiBcbiAgICAgICAgICogVGhpcyBzaG91bGQgdGFrZSBhIGRpcmVjdGlvbiB2ZWN0b3IgdGhlbiBpdCBzaG91bGRcbiAgICAgICAgICogY2FsY3VsYXRlIHRoZSBsb2NhdGlvbiAoaW4gdGhhdCBmcmFtZSBvZiByZWZlcmVuY2UpXG4gICAgICAgICAqIG9mIHRoZSBwb2ludCBvbiB0aGUgcGVyaW1ldGVyIChodWxsKSBpZiB5b3UgdHJhdmVsZWRcbiAgICAgICAgICogaW4gYSBzdHJhaWdodCBsaW5lIGZyb20gdGhlIGNlbnRyb2lkIGluIHRoZSBwcm92aWRlZFxuICAgICAgICAgKiBkaXJlY3Rpb24uIFRoZSByZXN1bHQgc2hvdWxkIGJlIHJldHVybmVkL3NldCBqdXN0IGxpa2VcbiAgICAgICAgICogaXQgaXMgaW4gdGhlIG90aGVyIGdlb21ldHJpZXMuXG4gICAgICAgICAqKi9cbiAgICAgICAgZ2V0RmFydGhlc3RIdWxsUG9pbnQ6IGZ1bmN0aW9uKCBkaXIsIHJlc3VsdCApe1xuXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgbmV3IFBoeXNpY3MudmVjdG9yKCk7XG5cbiAgICAgICAgICAgIC8vIG5vdCBpbXBsZW1lbnRlZC5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuc2V0KCAwLCAwICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIHJlbGF0ZWQgdG86IEdlb21ldHJ5I2dldEZhcnRoZXN0SHVsbFBvaW50XG4gICAgICAgICAqIEdlb21ldHJ5I2dldEZhcnRoZXN0Q29yZVBvaW50KCBkaXJbLCByZXN1bHRdICkgLT4gUGh5c2ljcy52ZWN0b3JcbiAgICAgICAgICogLSBkaXIgKFBoeXNpY3MudmVjdG9yKTogRGlyZWN0aW9uIHRvIGxvb2tcbiAgICAgICAgICogLSByZXN1bHQgKFBoeXNpY3MudmVjdG9yKTogQSB2ZWN0b3IgdG8gd3JpdGUgcmVzdWx0IHRvLiBTcGVlZHMgdXAgY2FsY3VsYXRpb25zLlxuICAgICAgICAgKiArIChQaHlzaWNzLnZlY3Rvcik6IFRoZSBmYXJ0aGVzdCBodWxsIHBvaW50IGluIGxvY2FsIGNvb3JkaW5hdGVzXG4gICAgICAgICAqIFxuICAgICAgICAgKiBHZXQgZmFydGhlc3QgcG9pbnQgb24gdGhlIGNvcmUgc2hhcGUgb2YgdGhpcyBnZW9tZXRyeVxuICAgICAgICAgKiBhbG9uZyB0aGUgZGlyZWN0aW9uIHZlY3RvciBgZGlyYFxuICAgICAgICAgKiByZXR1cm5zIGxvY2FsIGNvb3JkaW5hdGVzLiBSZXBsYWNlcyByZXN1bHQgaWYgcHJvdmlkZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoaXMgZG9lcyBhbG1vc3QgdGhlIHNhbWUgdGhpbmcgYXMgW1tHZW9tZXRyeSNnZXRGYXJ0aGVzdEh1bGxQb2ludF1dXG4gICAgICAgICAqIGJ1dCBzaHJpbmtzIHRoZSBzaGFwZSBieSBzdWJ0cmFjdGluZyBcIm1hcmdpblwiIGZyb20gaXQuXG4gICAgICAgICAqIFJldHVybiB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50IG9uIHRoZSBcImNvcmVcIiBzaGFwZS5cbiAgICAgICAgICoqL1xuICAgICAgICBnZXRGYXJ0aGVzdENvcmVQb2ludDogZnVuY3Rpb24oIGRpciwgcmVzdWx0LCBtYXJnaW4gKXtcblxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IG5ldyBQaHlzaWNzLnZlY3RvcigpO1xuXG4gICAgICAgICAgICAvLyBub3QgaW1wbGVtZW50ZWQuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnNldCggMCwgMCApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0oKSk7XG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvY29yZS9nZW9tZXRyeS1oZWxwZXJzLmpzXG5cbi8qXG4gKiBHZW9tZXRyeSBoZWxwZXIgZnVuY3Rpb25zXG4gKi9cblxuLyoqXG4gKiBQaHlzaWNzLmdlb21ldHJ5LnJlZ3VsYXJQb2x5Z29uVmVydGljZXMoIHNpZGVzLCByYWRpdXMgKSAtPiBBcnJheVxuICogLSBzaWRlcyAoTnVtYmVyKTogTnVtYmVyIG9mIHNpZGVzIHRoZSBwb2x5Z29uIGhhc1xuICogLSByYWRpdXMgKE51bWJlcik6IFNpemUgZnJvbSBjZW50ZXIgdG8gYSB2ZXJ0ZXhcbiAqICsgKEFycmF5KTogQSBsaXN0IG9mIFtbVmVjdG9yaXNoXV0gb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIHZlcnRpY2VzXG4gKlxuICogR2VuZXJhdGUgYSBsaXN0IG9mIHZlcnRpY2VzIGZvciBhIHJlZ3VsYXIgcG9seWdvbiBvZiBhbnkgbnVtYmVyIG9mIHNpZGVzLlxuICoqL1xuUGh5c2ljcy5nZW9tZXRyeS5yZWd1bGFyUG9seWdvblZlcnRpY2VzID0gZnVuY3Rpb24oIHNpZGVzLCByYWRpdXMgKXtcbiAgICB2YXIgdmVydHMgPSBbXVxuICAgICAgICAsYW5nbGUgPSBNYXRoLlBJICogMiAvIHNpZGVzXG4gICAgICAgICxhID0gMFxuICAgICAgICAsaVxuICAgICAgICA7XG5cbiAgICBmb3IgKCBpID0gMDsgaSA8IHNpZGVzOyBpKysgKXtcbiAgICAgICAgdmVydHMucHVzaCh7XG4gICAgICAgICAgICB4OiByYWRpdXMgKiBNYXRoLmNvcyggYSApXG4gICAgICAgICAgICAseTogcmFkaXVzICogTWF0aC5zaW4oIGEgKVxuICAgICAgICB9KTtcblxuICAgICAgICBhICs9IGFuZ2xlO1xuICAgIH1cblxuICAgIHJldHVybiB2ZXJ0cztcbn07XG5cbi8qKlxuICogUGh5c2ljcy5nZW9tZXRyeS5pc1BvbHlnb25Db252ZXgoIGh1bGwgKSAtPiBCb29sZWFuXG4gKiAtIGh1bGwgKEFycmF5KTogQXJyYXkgb2YgKFtbVmVjdG9yaXNoXV0pIHZlcnRpY2VzXG4gKiArIChCb29sZWFuKTogYHRydWVgIGlmIHRoZSBwb2x5Z29uIGlzIGNvbnZleC4gYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogRGV0ZXJtaW5lIGlmIHBvbHlnb24gaHVsbCBpcyBjb252ZXhcbiAqKi9cblBoeXNpY3MuZ2VvbWV0cnkuaXNQb2x5Z29uQ29udmV4ID0gZnVuY3Rpb24oIGh1bGwgKXtcblxuICAgIHZhciBzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgLHByZXYgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICxuZXh0ID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAsdG1wID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAscmV0ID0gdHJ1ZVxuICAgICAgICAsc2lnbiA9IGZhbHNlXG4gICAgICAgICxsID0gaHVsbC5sZW5ndGhcbiAgICAgICAgO1xuXG4gICAgaWYgKCAhaHVsbCB8fCAhbCApe1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCBsIDwgMyApe1xuICAgICAgICAvLyBpdCBtdXN0IGJlIGEgcG9pbnQgb3IgYSBsaW5lLi4uXG4gICAgICAgIC8vIHdoaWNoIGFyZSBjb252ZXhcbiAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgcHJldi5jbG9uZSggaHVsbFsgMCBdICkudnN1YiggdG1wLmNsb25lKCBodWxsWyBsIC0gMSBdICkgKTtcblxuICAgIC8vIGxvb3Agb3ZlciB0aGUgZWRnZXMgb2YgdGhlIGh1bGwgYW5kIGNvbnN0cnVjdCB2ZWN0b3JzIG9mIHRoZSBjdXJyZW50XG4gICAgLy8gZWRnZSBhbmQgcmV0YWluIHRoZSBsYXN0IGVkZ2VcbiAgICAvLyBhZGQgdHdvIHRvIHRoZSBsZW5ndGggdG8gZG8gYSBmdWxsIGN5Y2xlXG4gICAgZm9yICggdmFyIGkgPSAxOyBpIDw9IGw7ICsraSApe1xuXG4gICAgICAgIG5leHQuY2xvbmUoIGh1bGxbIGkgJSBsIF0gKS52c3ViKCB0bXAuY2xvbmUoIGh1bGxbIChpIC0gMSkgJSBsIF0gKSApO1xuXG4gICAgICAgIGlmICggc2lnbiA9PT0gZmFsc2UgKXtcblxuICAgICAgICAgICAgLy8gZmlyc3QgY2hlY2sgdGhlIHNpZ24gb2YgdGhlIGZpcnN0IGNyb3NzIHByb2R1Y3RcbiAgICAgICAgICAgIHNpZ24gPSBwcmV2LmNyb3NzKCBuZXh0ICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggKHNpZ24gPiAwKSBeIChwcmV2LmNyb3NzKCBuZXh0ICkgPiAwKSApe1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgY3Jvc3MgcHJvZHVjdHMgYXJlIGRpZmZlcmVudCBzaWducyBpdCdzIG5vdCBjb252ZXhcbiAgICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1lbWJlciB0aGUgbGFzdCBlZGdlXG4gICAgICAgIG5leHQuc3dhcCggcHJldiApO1xuICAgIH1cblxuICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG4vKipcbiAqIFBoeXNpY3MuZ2VvbWV0cnkuZ2V0UG9seWdvbk1PSSggaHVsbCApIC0+IE51bWJlclxuICogLSBodWxsIChBcnJheSk6IEFycmF5IG9mIChbW1ZlY3RvcmlzaF1dKSB2ZXJ0aWNlc1xuICogKyAoTnVtYmVyKTogVGhlIHBvbHlnb24ncyBtb21lbnQgb2YgaW5lcnRpYVxuICpcbiAqIEdldHMgdGhlIG1vbWVudCBvZiBpbmVydGlhIG9mIGEgY29udmV4IHBvbHlnb25cbiAqXG4gKiBTZWUgW0xpc3Qgb2YgbW9tZW50cyBvZiBpbmVydGlhXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xpc3Rfb2ZfbW9tZW50c19vZl9pbmVydGlhKVxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogX05vdGVfOiB3ZSBtYWtlIHRoZSBmb2xsb3dpbmcgYXNzdW1wYXRpb25zOlxuICogKiBtYXNzIGlzIHVuaXRhcnkgKD09IDEpXG4gKiAqIGF4aXMgb2Ygcm90YXRpb24gaXMgdGhlIG9yaWdpblxuICoqL1xuUGh5c2ljcy5nZW9tZXRyeS5nZXRQb2x5Z29uTU9JID0gZnVuY3Rpb24oIGh1bGwgKXtcblxuICAgIHZhciBzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgLHByZXYgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICxuZXh0ID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAsbnVtID0gMFxuICAgICAgICAsZGVub20gPSAwXG4gICAgICAgICx0bXBcbiAgICAgICAgLGwgPSBodWxsLmxlbmd0aFxuICAgICAgICA7XG5cbiAgICBpZiAoIGwgPCAyICl7XG4gICAgICAgIC8vIGl0IG11c3QgYmUgYSBwb2ludFxuICAgICAgICAvLyBtb2kgPSAwXG4gICAgICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAoIGwgPT09IDIgKXtcbiAgICAgICAgLy8gaXQncyBhIGxpbmVcbiAgICAgICAgLy8gZ2V0IGxlbmd0aCBzcXVhcmVkXG4gICAgICAgIHRtcCA9IG5leHQuY2xvbmUoIGh1bGxbIDEgXSApLmRpc3RTcSggcHJldi5jbG9uZSggaHVsbFsgMCBdICkgKTtcbiAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIHJldHVybiB0bXAgLyAxMjtcbiAgICB9XG5cbiAgICBwcmV2LmNsb25lKCBodWxsWyAwIF0gKTtcblxuICAgIGZvciAoIHZhciBpID0gMTsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgIG5leHQuY2xvbmUoIGh1bGxbIGkgXSApO1xuXG4gICAgICAgIHRtcCA9IE1hdGguYWJzKCBuZXh0LmNyb3NzKCBwcmV2ICkgKTtcbiAgICAgICAgbnVtICs9IHRtcCAqICggbmV4dC5ub3JtU3EoKSArIG5leHQuZG90KCBwcmV2ICkgKyBwcmV2Lm5vcm1TcSgpICk7XG4gICAgICAgIGRlbm9tICs9IHRtcDtcblxuICAgICAgICBwcmV2LnN3YXAoIG5leHQgKTtcbiAgICB9XG5cbiAgICBzY3JhdGNoLmRvbmUoKTtcbiAgICByZXR1cm4gbnVtIC8gKCA2ICogZGVub20gKTtcbn07XG5cbi8qKlxuICogUGh5c2ljcy5nZW9tZXRyeS5pc1BvaW50SW5Qb2x5Z29uKCBwdCwgaHVsbCApIC0+IEJvb2xlYW5cbiAqIC0gcHQgKFZlY3RvcmlzaCk6IFRoZSBwb2ludCB0byB0ZXN0XG4gKiAtIGh1bGwgKEFycmF5KTogQXJyYXkgb2YgKFtbVmVjdG9yaXNoXV0pIHZlcnRpY2VzXG4gKiArIChCb29sZWFuKTogYHRydWVgIGlmIHBvaW50IGBwdGAgaXMgaW5zaWRlIHRoZSBwb2x5Z29uXG4gKlxuICogQ2hlY2sgaWYgcG9pbnQgaXMgaW5zaWRlIHBvbHlnb24gaHVsbC5cbiAqKi9cblBoeXNpY3MuZ2VvbWV0cnkuaXNQb2ludEluUG9seWdvbiA9IGZ1bmN0aW9uKCBwdCwgaHVsbCApe1xuXG4gICAgdmFyIHNjcmF0Y2ggPSBQaHlzaWNzLnNjcmF0Y2hwYWQoKVxuICAgICAgICAscG9pbnQgPSBzY3JhdGNoLnZlY3RvcigpLmNsb25lKCBwdCApXG4gICAgICAgICxwcmV2ID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAsbmV4dCA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgLGFuZyA9IDBcbiAgICAgICAgLGwgPSBodWxsLmxlbmd0aFxuICAgICAgICA7XG5cbiAgICBpZiAoIGwgPCAyICl7XG4gICAgICAgIC8vIGl0J3MgYSBwb2ludC4uLlxuICAgICAgICBhbmcgPSBwb2ludC5lcXVhbHMoIHByZXYuY2xvbmUoIGh1bGxbIDAgXSApKTtcbiAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIHJldHVybiBhbmc7XG4gICAgfVxuXG4gICAgaWYgKCBsID09PSAyICl7XG4gICAgICAgIC8vIGl0J3MgYSBsaW5lXG4gICAgICAgIGFuZyA9IHBvaW50LmFuZ2xlKCBwcmV2LmNsb25lKCBodWxsWyAwIF0gKSk7XG4gICAgICAgIGFuZyArPSBwb2ludC5hbmdsZSggcHJldi5jbG9uZSggaHVsbFsgMSBdICkpO1xuICAgICAgICBzY3JhdGNoLmRvbmUoKTtcbiAgICAgICAgcmV0dXJuICggTWF0aC5hYnMoYW5nKSA9PT0gTWF0aC5QSSApO1xuICAgIH1cblxuICAgIHByZXYuY2xvbmUoIGh1bGxbIDAgXSApLnZzdWIoIHBvaW50ICk7XG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIHN1bSBvZiBhbmdsZXMgYmV0d2VlbiB2ZWN0b3IgcGFpcnNcbiAgICAvLyBmcm9tIHBvaW50IHRvIHZlcnRpY2VzXG4gICAgZm9yICggdmFyIGkgPSAxOyBpIDw9IGw7ICsraSApe1xuXG4gICAgICAgIG5leHQuY2xvbmUoIGh1bGxbIGkgJSBsIF0gKS52c3ViKCBwb2ludCApO1xuICAgICAgICBhbmcgKz0gbmV4dC5hbmdsZSggcHJldiApO1xuICAgICAgICBwcmV2LnN3YXAoIG5leHQgKTtcbiAgICB9XG5cbiAgICBzY3JhdGNoLmRvbmUoKTtcbiAgICByZXR1cm4gKCBNYXRoLmFicyhhbmcpID4gMWUtNiApO1xufTtcblxuLyoqXG4gKiBQaHlzaWNzLmdlb21ldHJ5LmdldFBvbHlnb25BcmVhKCBodWxsICkgLT4gTnVtYmVyXG4gKiAtIGh1bGwgKEFycmF5KTogQXJyYXkgb2YgKFtbVmVjdG9yaXNoXV0pIHZlcnRpY2VzXG4gKiArIChOdW1iZXIpOiBUaGUgYXJlYSAocG9zaXRpdmUgZm9yIGNsb2Nrd2lzZSBvcmRlcmluZylcbiAqXG4gKiBHZXQgdGhlIHNpZ25lZCBhcmVhIG9mIHRoZSBwb2x5Z29uLlxuICoqL1xuUGh5c2ljcy5nZW9tZXRyeS5nZXRQb2x5Z29uQXJlYSA9IGZ1bmN0aW9uIGdldFBvbHlnb25BcmVhKCBodWxsICl7XG5cbiAgICB2YXIgc2NyYXRjaCA9IFBoeXNpY3Muc2NyYXRjaHBhZCgpXG4gICAgICAgICxwcmV2ID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAsbmV4dCA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgLHJldCA9IDBcbiAgICAgICAgLGwgPSBodWxsLmxlbmd0aFxuICAgICAgICA7XG5cbiAgICBpZiAoIGwgPCAzICl7XG4gICAgICAgIC8vIGl0IG11c3QgYmUgYSBwb2ludCBvciBhIGxpbmVcbiAgICAgICAgLy8gYXJlYSA9IDBcbiAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHByZXYuY2xvbmUoIGh1bGxbIGwgLSAxIF0gKTtcblxuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgIG5leHQuY2xvbmUoIGh1bGxbIGkgXSApO1xuXG4gICAgICAgIHJldCArPSBwcmV2LmNyb3NzKCBuZXh0ICk7XG5cbiAgICAgICAgcHJldi5zd2FwKCBuZXh0ICk7XG4gICAgfVxuXG4gICAgc2NyYXRjaC5kb25lKCk7XG4gICAgcmV0dXJuIHJldCAvIDI7XG59O1xuXG4vKipcbiAqIFBoeXNpY3MuZ2VvbWV0cnkuZ2V0UG9seWdvbkNlbnRyb2lkKCBodWxsICkgLT4gUGh5c2ljcy52ZWN0b3JcbiAqIC0gaHVsbCAoQXJyYXkpOiBBcnJheSBvZiAoW1tWZWN0b3Jpc2hdXSkgdmVydGljZXNcbiAqICsgKFBoeXNpY3MudmVjdG9yKTogVGhlIGNlbnRyb2lkXG4gKlxuICogR2V0IHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudHJvaWQuXG4gKiovXG5QaHlzaWNzLmdlb21ldHJ5LmdldFBvbHlnb25DZW50cm9pZCA9IGZ1bmN0aW9uIGdldFBvbHlnb25DZW50cm9pZCggaHVsbCApe1xuXG4gICAgdmFyIHNjcmF0Y2ggPSBQaHlzaWNzLnNjcmF0Y2hwYWQoKVxuICAgICAgICAscHJldiA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgLG5leHQgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICxyZXQgPSBuZXcgUGh5c2ljcy52ZWN0b3IoKVxuICAgICAgICAsdG1wXG4gICAgICAgICxsID0gaHVsbC5sZW5ndGhcbiAgICAgICAgO1xuXG4gICAgaWYgKCBsIDwgMiApe1xuICAgICAgICAvLyBpdCBtdXN0IGJlIGEgcG9pbnRcbiAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIHJldHVybiBuZXcgUGh5c2ljcy52ZWN0b3IoIGh1bGxbMF0gKTtcbiAgICB9XG5cbiAgICBpZiAoIGwgPT09IDIgKXtcbiAgICAgICAgLy8gaXQncyBhIGxpbmVcbiAgICAgICAgLy8gZ2V0IHRoZSBtaWRwb2ludFxuICAgICAgICBzY3JhdGNoLmRvbmUoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQaHlzaWNzLnZlY3RvcigoaHVsbFsgMSBdLnggKyBodWxsWyAwIF0ueCkvMiwgKGh1bGxbIDEgXS55ICsgaHVsbFsgMCBdLnkpLzIgKTtcbiAgICB9XG5cbiAgICBwcmV2LmNsb25lKCBodWxsWyBsIC0gMSBdICk7XG5cbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsOyArK2kgKXtcblxuICAgICAgICBuZXh0LmNsb25lKCBodWxsWyBpIF0gKTtcblxuICAgICAgICB0bXAgPSBwcmV2LmNyb3NzKCBuZXh0ICk7XG4gICAgICAgIHByZXYudmFkZCggbmV4dCApLm11bHQoIHRtcCApO1xuICAgICAgICByZXQudmFkZCggcHJldiApO1xuXG4gICAgICAgIHByZXYuc3dhcCggbmV4dCApO1xuICAgIH1cblxuICAgIHRtcCA9IDEgLyAoNiAqIFBoeXNpY3MuZ2VvbWV0cnkuZ2V0UG9seWdvbkFyZWEoIGh1bGwgKSk7XG5cbiAgICBzY3JhdGNoLmRvbmUoKTtcbiAgICByZXR1cm4gcmV0Lm11bHQoIHRtcCApO1xufTtcblxuLyoqXG4gKiBQaHlzaWNzLmdlb21ldHJ5Lm5lYXJlc3RQb2ludE9uTGluZSggcHQsIGxpbmVQdDEsIGxpbmVQdDIgKSAtPiBQaHlzaWNzLnZlY3RvclxuICogLSBwdCAoVmVjdG9yaXNoKTogVGhlIHBvaW50XG4gKiAtIGxpbmVQdDEgKFZlY3RvcmlzaCk6IFRoZSBmaXJzdCBlbmRwb2ludCBvZiB0aGUgbGluZVxuICogLSBsaW5lUHQyIChWZWN0b3Jpc2gpOiBUaGUgc2Vjb25kIGVuZHBvaW50IG9mIHRoZSBsaW5lXG4gKiArIChWZWN0b3IpOiBUaGUgY2xvc2VzdCBwb2ludFxuICpcbiAqIEdldCB0aGUgY2xvc2VzdCBwb2ludCBvbiBhIGRpc2NyZXRlIGxpbmUgdG8gc3BlY2lmaWVkIHBvaW50LlxuICoqL1xuUGh5c2ljcy5nZW9tZXRyeS5uZWFyZXN0UG9pbnRPbkxpbmUgPSBmdW5jdGlvbiBuZWFyZXN0UG9pbnRPbkxpbmUoIHB0LCBsaW5lUHQxLCBsaW5lUHQyICl7XG5cbiAgICB2YXIgc2NyYXRjaCA9IFBoeXNpY3Muc2NyYXRjaHBhZCgpXG4gICAgICAgICxwID0gc2NyYXRjaC52ZWN0b3IoKS5jbG9uZSggcHQgKVxuICAgICAgICAsQSA9IHNjcmF0Y2gudmVjdG9yKCkuY2xvbmUoIGxpbmVQdDEgKS52c3ViKCBwIClcbiAgICAgICAgLEwgPSBzY3JhdGNoLnZlY3RvcigpLmNsb25lKCBsaW5lUHQyICkudnN1YiggcCApLnZzdWIoIEEgKVxuICAgICAgICAsbGFtYmRhQlxuICAgICAgICAsbGFtYmRhQVxuICAgICAgICA7XG5cbiAgICBpZiAoIEwuZXF1YWxzKFBoeXNpY3MudmVjdG9yLnplcm8pICl7XG4gICAgICAgIC8vIG9oLi4gaXQncyBhIHplcm8gdmVjdG9yLiBTbyBBIGFuZCBCIGFyZSBib3RoIHRoZSBjbG9zZXN0LlxuICAgICAgICAvLyBqdXN0IHVzZSBvbmUgb2YgdGhlbVxuICAgICAgICBzY3JhdGNoLmRvbmUoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQaHlzaWNzLnZlY3RvciggbGluZVB0MSApO1xuICAgIH1cblxuICAgIGxhbWJkYUIgPSAtIEwuZG90KCBBICkgLyBMLm5vcm1TcSgpO1xuICAgIGxhbWJkYUEgPSAxIC0gbGFtYmRhQjtcblxuICAgIGlmICggbGFtYmRhQSA8PSAwICl7XG4gICAgICAgIC8vIHdvb3BzLi4gdGhhdCBtZWFucyB0aGUgY2xvc2VzdCBzaW1wbGV4IHBvaW50XG4gICAgICAgIC8vIGlzbid0IG9uIHRoZSBsaW5lIGl0J3MgcG9pbnQgQiBpdHNlbGZcbiAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIHJldHVybiBuZXcgUGh5c2ljcy52ZWN0b3IoIGxpbmVQdDIgKTtcbiAgICB9IGVsc2UgaWYgKCBsYW1iZGFCIDw9IDAgKXtcbiAgICAgICAgLy8gdmljZSB2ZXJzYVxuICAgICAgICBzY3JhdGNoLmRvbmUoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQaHlzaWNzLnZlY3RvciggbGluZVB0MSApO1xuICAgIH1cblxuICAgIC8vIGd1ZXNzIHdlJ2QgYmV0dGVyIGRvIHRoZSBtYXRoIG5vdy4uLlxuICAgIHAgPSBuZXcgUGh5c2ljcy52ZWN0b3IoIGxpbmVQdDIgKS5tdWx0KCBsYW1iZGFCICkudmFkZCggQS5jbG9uZSggbGluZVB0MSApLm11bHQoIGxhbWJkYUEgKSApO1xuICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgIHJldHVybiBwO1xufTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2NvcmUvaW50ZWdyYXRvci5qc1xuXG4oZnVuY3Rpb24oKXtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcblxuICAgICAgICAvLyBkcmFnIGFwcGxpZWQgZHVyaW5nIGludGVncmF0aW9uXG4gICAgICAgIC8vIDAgbWVhbnMgdmFjdXVtXG4gICAgICAgIC8vIDAuOSBtZWFucyBtb2xhc3Nlc1xuICAgICAgICBkcmFnOiAwXG4gICAgfTtcblxuICAgIC8qKiByZWxhdGVkIHRvOiBQaHlzaWNzLnV0aWwuZGVjb3JhdG9yXG4gICAgICogUGh5c2ljcy5pbnRlZ3JhdG9yKCBuYW1lWywgb3B0aW9uc10gKSAtPiBJbnRlZ3JhdG9yXG4gICAgICogLSBuYW1lIChTdHJpbmcpOiBUaGUgbmFtZSBvZiB0aGUgaW50ZWdyYXRvciB0byBjcmVhdGVcbiAgICAgKiAtIG9wdGlvbnMgKE9iamVjdCk6IFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGF0IGludGVncmF0b3IgKCBkZXBlbmRzIG9uIGludGVncmF0b3IgKS5cbiAgICAgICBBdmFpbGFibGUgb3B0aW9ucyBhbmQgZGVmYXVsdHM6XG5cbiAgICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGRyYWcgYXBwbGllZCBkdXJpbmcgaW50ZWdyYXRpb25cbiAgICAgICAgICAgIC8vIDAgbWVhbnMgdmFjdXVtXG4gICAgICAgICAgICAvLyAwLjkgbWVhbnMgbW9sYXNzZXNcbiAgICAgICAgICAgIGRyYWc6IDBcbiAgICAgICAgfVxuICAgICAgIGBgYFxuICAgICAqXG4gICAgICogRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgSW50ZWdyYXRvcnMuXG4gICAgICpcbiAgICAgKiBWaXNpdCBbdGhlIFBoeXNpY3NKUyB3aWtpIG9uIEludGVncmF0b3JzXShodHRwczovL2dpdGh1Yi5jb20vd2VsbGNhZmZlaW5hdGVkL1BoeXNpY3NKUy93aWtpL0ludGVncmF0b3JzKVxuICAgICAqIGZvciB1c2FnZSBkb2N1bWVudGF0aW9uLlxuICAgICAqKi9cbiAgICBQaHlzaWNzLmludGVncmF0b3IgPSBEZWNvcmF0b3IoJ2ludGVncmF0b3InLCB7XG5cbiAgICAgICAgLyoqIGJlbG9uZ3MgdG86IFBoeXNpY3MuaW50ZWdyYXRvclxuICAgICAgICAgKiBjbGFzcyBJbnRlZ3JhdG9yXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBiYXNlIGNsYXNzIGZvciBpbnRlZ3JhdG9ycyBjcmVhdGVkIGJ5IFtbUGh5c2ljcy5pbnRlZ3JhdG9yXV0gZmFjdG9yeSBmdW5jdGlvbi5cbiAgICAgICAgICoqL1xuXG4gICAgICAgIC8qKiBpbnRlcm5hbFxuICAgICAgICAgKiBJbnRlZ3JhdG9yI2luaXQoIG9wdGlvbnMgKVxuICAgICAgICAgKiAtIG9wdGlvbnMgKE9iamVjdCk6IFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgcGFzc2VkIGJ5IHRoZSBmYWN0b3J5XG4gICAgICAgICAqXG4gICAgICAgICAqIEluaXRpYWxpemF0aW9uLiBJbnRlcm5hbCB1c2UuXG4gICAgICAgICAqKi9cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgLyoqIHJlbGF0ZWQgdG86IFBoeXNpY3MudXRpbC5vcHRpb25zXG4gICAgICAgICAgICAgKiBJbnRlZ3JhdG9yI29wdGlvbnMoIG9wdGlvbnMgKSAtPiBPYmplY3RcbiAgICAgICAgICAgICAqIC0gb3B0aW9ucyAoT2JqZWN0KTogVGhlIG9wdGlvbnMgdG8gc2V0IGFzIGFuIG9iamVjdFxuICAgICAgICAgICAgICogKyAoT2JqZWN0KTogVGhlIG9wdGlvbnNcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBTZXQgb3B0aW9ucyBvbiB0aGlzIGluc3RhbmNlLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEFjY2VzcyBvcHRpb25zIGRpcmVjdGx5IGZyb20gdGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEV4YW1wbGU6XG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogYGBgamF2YXNjcmlwdFxuICAgICAgICAgICAgICogdGhpcy5vcHRpb25zLnNvbWVPcHRpb247XG4gICAgICAgICAgICAgKiBgYGBcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiovXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBQaHlzaWNzLnV0aWwub3B0aW9ucyggZGVmYXVsdHMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyggb3B0aW9ucyApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlZ3JhdG9yI3NldFdvcmxkKCB3b3JsZCApIC0+IHRoaXNcbiAgICAgICAgICogLSB3b3JsZCAoT2JqZWN0KTogVGhlIHdvcmxkIChvciBudWxsKVxuICAgICAgICAgKlxuICAgICAgICAgKiBTZXQgd2hpY2ggd29ybGQgdG8gYXBwbHkgdG8uXG4gICAgICAgICAqXG4gICAgICAgICAqIFVzdWFsbHkgdGhpcyBpcyBjYWxsZWQgaW50ZXJuYWxseS4gU2hvdWxkbid0IGJlIGEgbmVlZCB0byBjYWxsIHRoaXMgeW91cnNlbGYgdXN1YWxseS5cbiAgICAgICAgICoqL1xuICAgICAgICBzZXRXb3JsZDogZnVuY3Rpb24oIHdvcmxkICl7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5kaXNjb25uZWN0ICYmIHRoaXMuX3dvcmxkICl7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCB0aGlzLl93b3JsZCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl93b3JsZCA9IHdvcmxkO1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuY29ubmVjdCAmJiB3b3JsZCApe1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdCggd29ybGQgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludGVncmF0b3IjaW50ZWdyYXRlKCBib2RpZXMsIGR0ICkgLT4gdGhpc1xuICAgICAgICAgKiAtIGJvZGllcyAoQXJyYXkpOiBMaXN0IG9mIGJvZGllcyB0byBpbnRlZ3JhdGVcbiAgICAgICAgICogLSBkdCAoTnVtYmVyKTogVGltZXN0ZXAgc2l6ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBJbnRlZ3JhdGUgYm9kaWVzIGJ5IHRpbWVzdGVwLlxuICAgICAgICAgKlxuICAgICAgICAgKiBXaWxsIGVtaXQgYGludGVncmF0ZTp2ZWxvY2l0aWVzYCBhbmQgYGludGVncmF0ZTpwb3NpdGlvbnNgXG4gICAgICAgICAqIGV2ZW50cyBvbiB0aGUgd29ybGQuXG4gICAgICAgICAqKi9cbiAgICAgICAgaW50ZWdyYXRlOiBmdW5jdGlvbiggYm9kaWVzLCBkdCApe1xuXG4gICAgICAgICAgICB2YXIgd29ybGQgPSB0aGlzLl93b3JsZDtcblxuICAgICAgICAgICAgdGhpcy5pbnRlZ3JhdGVWZWxvY2l0aWVzKCBib2RpZXMsIGR0ICk7XG5cbiAgICAgICAgICAgIGlmICggd29ybGQgKXtcbiAgICAgICAgICAgICAgICB3b3JsZC5lbWl0KCdpbnRlZ3JhdGU6dmVsb2NpdGllcycsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9kaWVzOiBib2RpZXMsXG4gICAgICAgICAgICAgICAgICAgIGR0OiBkdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmludGVncmF0ZVBvc2l0aW9ucyggYm9kaWVzLCBkdCApO1xuXG4gICAgICAgICAgICBpZiAoIHdvcmxkICl7XG4gICAgICAgICAgICAgICAgd29ybGQuZW1pdCgnaW50ZWdyYXRlOnBvc2l0aW9ucycsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9kaWVzOiBib2RpZXMsXG4gICAgICAgICAgICAgICAgICAgIGR0OiBkdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW50ZWdyYXRvciNjb25uZWN0KCB3b3JsZCApXG4gICAgICAgICAqIC0gd29ybGQgKFBoeXNpY3Mud29ybGQpOiBUaGUgd29ybGQgdG8gY29ubmVjdCB0b1xuICAgICAgICAgKlxuICAgICAgICAgKiBDb25uZWN0IHRvIGEgd29ybGQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEV4dGVuZCB0aGlzIHdoZW4gY3JlYXRpbmcgaW50ZWdyYXRvcnMgaWYgeW91IG5lZWQgdG8gc3BlY2lmeSBwdWJzdWIgbWFuYWdlbWVudC5cbiAgICAgICAgICogQXV0b21hdGljYWxseSBjYWxsZWQgd2hlbiBhZGRlZCB0byB3b3JsZCBieSB0aGUgW1tJbnRlZ3JhdG9yI3NldFdvcmxkXV0gbWV0aG9kLlxuICAgICAgICAgKiovXG4gICAgICAgIGNvbm5lY3Q6IG51bGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludGVncmF0b3IjZGlzY29ubmVjdCggd29ybGQgKVxuICAgICAgICAgKiAtIHdvcmxkIChQaHlzaWNzLndvcmxkKTogVGhlIHdvcmxkIHRvIGRpc2Nvbm5lY3QgZnJvbVxuICAgICAgICAgKlxuICAgICAgICAgKiBEaXNjb25uZWN0IGZyb20gYSB3b3JsZC5cbiAgICAgICAgICpcbiAgICAgICAgICogRXh0ZW5kIHRoaXMgd2hlbiBjcmVhdGluZyBpbnRlZ3JhdG9ycyBpZiB5b3UgbmVlZCB0byBzcGVjaWZ5IHB1YnN1YiBtYW5hZ2VtZW50LlxuICAgICAgICAgKiBBdXRvbWF0aWNhbGx5IGNhbGxlZCB3aGVuIGFkZGVkIHRvIHdvcmxkIGJ5IHRoZSBbW0ludGVncmF0b3Ijc2V0V29ybGRdXSBtZXRob2QuXG4gICAgICAgICAqKi9cbiAgICAgICAgZGlzY29ubmVjdDogbnVsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW50ZWdyYXRvciNpbnRlZ3JhdGVWZWxvY2l0aWVzKCBib2RpZXMsIGR0IClcbiAgICAgICAgICogLSBib2RpZXMgKEFycmF5KTogTGlzdCBvZiBib2RpZXMgdG8gaW50ZWdyYXRlXG4gICAgICAgICAqIC0gZHQgKE51bWJlcik6IFRpbWVzdGVwIHNpemVcbiAgICAgICAgICpcbiAgICAgICAgICogSnVzdCBpbnRlZ3JhdGUgdGhlIHZlbG9jaXRpZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIFNob3VsZCBiZSBvdmVycmlkZGVuIHdoZW4gY3JlYXRpbmcgaW50ZWdyYXRvcnMuXG4gICAgICAgICAqKi9cbiAgICAgICAgaW50ZWdyYXRlVmVsb2NpdGllczogZnVuY3Rpb24oIGJvZGllcywgZHQgKXtcblxuICAgICAgICAgICAgdGhyb3cgJ1RoZSBpbnRlZ3JhdG9yLmludGVncmF0ZVZlbG9jaXRpZXMoKSBtZXRob2QgbXVzdCBiZSBvdmVycmlkZW4nO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlZ3JhdG9yI2ludGVncmF0ZVBvc2l0aW9ucyggYm9kaWVzLCBkdCApXG4gICAgICAgICAqIC0gYm9kaWVzIChBcnJheSk6IExpc3Qgb2YgYm9kaWVzIHRvIGludGVncmF0ZVxuICAgICAgICAgKiAtIGR0IChOdW1iZXIpOiBUaW1lc3RlcCBzaXplXG4gICAgICAgICAqXG4gICAgICAgICAqIEp1c3QgaW50ZWdyYXRlIHRoZSBwb3NpdGlvbnMuXG4gICAgICAgICAqXG4gICAgICAgICAqIENhbGxlZCBhZnRlciBbW0ludGVncmF0b3IjaW50ZWdyYXRlVmVsb2NpdGllc11dLlxuICAgICAgICAgKlxuICAgICAgICAgKiBTaG91bGQgYmUgb3ZlcnJpZGRlbiB3aGVuIGNyZWF0aW5nIGludGVncmF0b3JzLlxuICAgICAgICAgKiovXG4gICAgICAgIGludGVncmF0ZVBvc2l0aW9uczogZnVuY3Rpb24oIGJvZGllcywgZHQgKXtcblxuICAgICAgICAgICAgdGhyb3cgJ1RoZSBpbnRlZ3JhdG9yLmludGVncmF0ZVBvc2l0aW9ucygpIG1ldGhvZCBtdXN0IGJlIG92ZXJyaWRlbic7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSgpKTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2NvcmUvcmVuZGVyZXIuanNcblxuKGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIC8vIGRyYXcgbWV0YSBkYXRhIChmcHMsIHN0ZXBzLCBldGMpXG4gICAgICAgIG1ldGE6IGZhbHNlLFxuICAgICAgICAvLyByZWZyZXNoIHJhdGUgb2YgbWV0YSBpbmZvXG4gICAgICAgIG1ldGFSZWZyZXNoOiAyMDAsXG5cbiAgICAgICAgLy8gd2lkdGggb2Ygdmlld3BvcnRcbiAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgLy8gaGVpZ2h0IG9mIHZpZXdwb3J0XG4gICAgICAgIGhlaWdodDogNjAwLFxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IHJlc2l6ZSB0aGUgcmVuZGVyZXJcbiAgICAgICAgYXV0b1Jlc2l6ZTogdHJ1ZVxuICAgIH07XG5cbiAgICAvKiogcmVsYXRlZCB0bzogUGh5c2ljcy51dGlsLmRlY29yYXRvclxuICAgICAqIFBoeXNpY3MucmVuZGVyZXIoIG5hbWVbLCBvcHRpb25zXSApIC0+IFJlbmRlcmVyXG4gICAgICogLSBuYW1lIChTdHJpbmcpOiBUaGUgbmFtZSBvZiB0aGUgcmVuZGVyZXIgdG8gY3JlYXRlXG4gICAgICogLSBvcHRpb25zIChPYmplY3QpOiBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhhdCByZW5kZXJlciAoIGRlcGVuZHMgb24gcmVuZGVyZXIgKS5cbiAgICAgICBBdmFpbGFibGUgb3B0aW9ucyBhbmQgZGVmYXVsdHM6XG5cbiAgICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGRyYXcgbWV0YSBkYXRhIChmcHMsIHN0ZXBzLCBldGMpXG4gICAgICAgICAgICBtZXRhOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIHJlZnJlc2ggcmF0ZSBvZiBtZXRhIGluZm9cbiAgICAgICAgICAgIG1ldGFSZWZyZXNoOiAyMDAsXG5cbiAgICAgICAgICAgIC8vIHdpZHRoIG9mIHZpZXdwb3J0XG4gICAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgICAgLy8gaGVpZ2h0IG9mIHZpZXdwb3J0XG4gICAgICAgICAgICBoZWlnaHQ6IDYwMFxuICAgICAgICAgICAgLy8gYXV0b21hdGljYWxseSByZXNpemUgdGhlIHJlbmRlcmVyXG4gICAgICAgICAgICBhdXRvUmVzaXplOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICBgYGBcbiAgICAgKlxuICAgICAqIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIFJlbmRlcmVycy5cbiAgICAgKlxuICAgICAqIFZpc2l0IFt0aGUgUGh5c2ljc0pTIHdpa2kgb24gUmVuZGVyZXJzXShodHRwczovL2dpdGh1Yi5jb20vd2VsbGNhZmZlaW5hdGVkL1BoeXNpY3NKUy93aWtpL1JlbmRlcmVycylcbiAgICAgKiBmb3IgdXNhZ2UgZG9jdW1lbnRhdGlvbi5cbiAgICAgKiovXG4gICAgUGh5c2ljcy5yZW5kZXJlciA9IERlY29yYXRvcigncmVuZGVyZXInLCB7XG5cbiAgICAgICAgLyoqIGJlbG9uZ3MgdG86IFBoeXNpY3MucmVuZGVyZXJcbiAgICAgICAgICogY2xhc3MgUmVuZGVyZXJcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIGJhc2UgY2xhc3MgZm9yIHJlbmRlcmVycyBjcmVhdGVkIGJ5IFtbUGh5c2ljcy5yZW5kZXJlcl1dIGZhY3RvcnkgZnVuY3Rpb24uXG4gICAgICAgICAqKi9cblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogUmVuZGVyZXIjaW5pdCggb3B0aW9ucyApXG4gICAgICAgICAqIC0gb3B0aW9ucyAoT2JqZWN0KTogVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBwYXNzZWQgYnkgdGhlIGZhY3RvcnlcbiAgICAgICAgICpcbiAgICAgICAgICogSW5pdGlhbGl6YXRpb24uIEludGVybmFsIHVzZS5cbiAgICAgICAgICoqL1xuICAgICAgICBpbml0OiBmdW5jdGlvbiggb3B0aW9ucyApe1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICAsZWwgPSB0eXBlb2Ygb3B0aW9ucy5lbCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcHRpb25zLmVsKSA6IG9wdGlvbnMuZWxcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IFBoeXNpY3MudXRpbC5vcHRpb25zKGRlZmF1bHRzKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyggb3B0aW9ucyApO1xuXG4gICAgICAgICAgICB0aGlzLmVsID0gZWwgPyBlbCA6IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGVsICYmIGVsLnBhcmVudE5vZGUgPyBlbC5wYXJlbnROb2RlIDogZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgIHRoaXMuZHJhd01ldGEgPSBQaHlzaWNzLnV0aWwudGhyb3R0bGUoIFBoeXNpY3MudXRpbC5iaW5kKHRoaXMuZHJhd01ldGEsIHRoaXMpLCB0aGlzLm9wdGlvbnMubWV0YVJlZnJlc2ggKTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIFBoeXNpY3MudXRpbC50aHJvdHRsZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmICggc2VsZi5vcHRpb25zLmF1dG9SZXNpemUgKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXNpemUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgMTAwKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVyZXIjcmVzaXplKCBbd2lkdGgsIGhlaWdodF0gKSAtPiB0aGlzXG4gICAgICAgICAqIC0gd2lkdGggKE51bWJlcik6IFRoZSB3aWR0aCBpbiBweFxuICAgICAgICAgKiAtIGhlaWdodCAoTnVtYmVyKTogVGhlIGhlaWdodCBpbiBweFxuICAgICAgICAgKlxuICAgICAgICAgKiBTZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHJlbmRlcmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiBubyBkaW1lbnNpb25zIGFyZSBzcGVjaWZpZWQgaXQgd2lsbCBhdXRvIHJlc2l6ZS5cbiAgICAgICAgICoqL1xuICAgICAgICByZXNpemU6IGZ1bmN0aW9uKCB3aWR0aCwgaGVpZ2h0ICl7XG5cbiAgICAgICAgICAgIGlmICggd2lkdGggPT09IHVuZGVmaW5lZCAmJiBoZWlnaHQgPT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgIHdpZHRoID0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgMDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XG4gICAgICAgICAgICAvLyBzaG91bGQgYmUgaW1wbGVtZW50ZWQgaW4gcmVuZGVyZXJzXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbmRlcmVyI3NldFdvcmxkKCB3b3JsZCApIC0+IHRoaXNcbiAgICAgICAgICogLSB3b3JsZCAoT2JqZWN0KTogVGhlIHdvcmxkIChvciBudWxsKVxuICAgICAgICAgKlxuICAgICAgICAgKiBTZXQgd2hpY2ggd29ybGQgdG8gYXBwbHkgdG8uXG4gICAgICAgICAqXG4gICAgICAgICAqIFVzdWFsbHkgdGhpcyBpcyBjYWxsZWQgaW50ZXJuYWxseS4gU2hvdWxkbid0IGJlIGEgbmVlZCB0byBjYWxsIHRoaXMgeW91cnNlbGYgdXN1YWxseS5cbiAgICAgICAgICoqL1xuICAgICAgICBzZXRXb3JsZDogZnVuY3Rpb24oIHdvcmxkICl7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5kaXNjb25uZWN0ICYmIHRoaXMuX3dvcmxkICl7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCB0aGlzLl93b3JsZCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl93b3JsZCA9IHdvcmxkO1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuY29ubmVjdCAmJiB3b3JsZCApe1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdCggd29ybGQgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbmRlcmVyI3JlbmRlciggYm9kaWVzLCBtZXRhICkgLT4gdGhpc1xuICAgICAgICAgKiAtIGJvZGllcyAoQXJyYXkpOiBBcnJheSBvZiBib2RpZXMgaW4gdGhlIHdvcmxkIChieSByZWZlcmVuY2UhKVxuICAgICAgICAgKiAtIG1ldGEgKE9iamVjdCk6IG1ldGEgaW5mb3JtYXRpb25cbiAgICAgICAgICpcbiAgICAgICAgICogUmVuZGVyIHRoZSB3b3JsZCBib2RpZXMgYW5kIG1ldGEuIENhbGxlZCBieSB3b3JsZC5yZW5kZXIoKVxuICAgICAgICAgKiovXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oIGJvZGllcywgbWV0YSApe1xuXG4gICAgICAgICAgICB2YXIgYm9keVxuICAgICAgICAgICAgICAgICx2aWV3XG4gICAgICAgICAgICAgICAgLHBvc1xuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYmVmb3JlUmVuZGVyKXtcblxuICAgICAgICAgICAgICAgIHRoaXMuYmVmb3JlUmVuZGVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3dvcmxkLmVtaXQoJ2JlZm9yZVJlbmRlcicsIHtcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogdGhpcyxcbiAgICAgICAgICAgICAgICBib2RpZXM6IGJvZGllcyxcbiAgICAgICAgICAgICAgICBtZXRhOiBtZXRhXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tZXRhKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNZXRhKCBtZXRhICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2ludGVycG9sYXRlVGltZSA9IG1ldGEuaW50ZXJwb2xhdGVUaW1lO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBib2RpZXMubGVuZ3RoOyBpIDwgbDsgKytpICl7XG5cbiAgICAgICAgICAgICAgICBib2R5ID0gYm9kaWVzWyBpIF07XG4gICAgICAgICAgICAgICAgdmlldyA9IGJvZHkudmlldyB8fCAoIGJvZHkudmlldyA9IHRoaXMuY3JlYXRlVmlldyhib2R5Lmdlb21ldHJ5LCBib2R5LnN0eWxlcykgKTtcblxuICAgICAgICAgICAgICAgIGlmICggIWJvZHkuaGlkZGVuICl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0JvZHkoIGJvZHksIHZpZXcgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXJlciNjcmVhdGVWaWV3KCBnZW9tZXRyeSwgc3R5bGVzICkgLT4gTWl4ZWRcbiAgICAgICAgICogLSBnZW9tZXRyeSAoR2VvbWV0cnkpOiBnZW9tZXRyeSBUaGUgZ2VvbWV0cnlcbiAgICAgICAgICogLSBzdHlsZXMgKE9iamVjdHxTdHJpbmcpOiBUaGUgc3R5bGVzIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICogKyAoTWl4ZWQpOiBXaGF0ZXZlciB0aGUgcmVuZGVyZXIgbmVlZHMgdG8gcmVuZGVyIHRoZSBib2R5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBDcmVhdGUgYSB2aWV3IGZvciB0aGUgc3BlY2lmaWVkIGdlb21ldHJ5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgdmlldyBpcyB1c2VkIHRvIHJlbmRlciB0aGUgYm9keS4gSXQgaXMgYSBjYWNoZWQgdmVyc2lvblxuICAgICAgICAgKiBvZiB0aGUgYm9keSB0aGF0IGdldHMgbW92ZWQgYW5kIHJvdGF0ZWQgYWNjb3JkaW5nIHRvIHRoZSBzaW11bGF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgc3R5bGVzIGFyZSB1c2VkIHRvIG1vZGlmeSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgdmlldy5cbiAgICAgICAgICogVGhleSBkZXBlbmQgb24gdGhlIHJlbmRlcmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBPdmVycmlkZSB0aGlzIHdoZW4gY3JlYXRpbmcgcmVuZGVyZXJzLlxuICAgICAgICAgKiovXG4gICAgICAgIGNyZWF0ZVZpZXc6IGZ1bmN0aW9uKCBnZW9tZXRyeSwgc3R5bGVzICl7XG5cbiAgICAgICAgICAgIC8vIGV4YW1wbGU6XG4gICAgICAgICAgICAvLyB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIC8vIGVsLnN0eWxlLmhlaWdodCA9IGdlb21ldHJ5LmhlaWdodCArICdweCc7XG4gICAgICAgICAgICAvLyBlbC5zdHlsZS53aWR0aCA9IGdlb21ldHJ5LndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIC8vIHJldHVybiBlbDtcbiAgICAgICAgICAgIHRocm93ICdZb3UgbXVzdCBvdmVycmlkZSB0aGUgcmVuZGVyZXIuY3JlYXRlVmlldygpIG1ldGhvZC4nO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXJlciNkcmF3TWV0YSggbWV0YSApXG4gICAgICAgICAqIC0gbWV0YSAoT2JqZWN0KTogVGhlIG1ldGEgZGF0YVxuICAgICAgICAgKlxuICAgICAgICAgKiBEcmF3IHRoZSBtZXRhIGRhdGEuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBtZXRhIGRhdGEgd2lsbCBsb29rIGxpa2UgdGhpczpcbiAgICAgICAgICpcbiAgICAgICAgICogYGBgamF2YXNjcmlwdFxuICAgICAgICAgKiBtZXRhID0ge1xuICAgICAgICAgKiAgICAgZnBzOiA2MCwgLy8gdGhlIGZyYW1lcyBwZXIgc2Vjb25kXG4gICAgICAgICAqICAgICBpcGY6IDQgLy8gdGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHBlciBmcmFtZVxuICAgICAgICAgKiB9O1xuICAgICAgICAgKiBgYGBcbiAgICAgICAgICpcbiAgICAgICAgICogT3ZlcnJpZGUgdGhpcyB3aGVuIGNyZWF0aW5nIHJlbmRlcmVycy5cbiAgICAgICAgICoqL1xuICAgICAgICBkcmF3TWV0YTogZnVuY3Rpb24oIG1ldGEgKXtcblxuICAgICAgICAgICAgLy8gZXhhbXBsZTpcbiAgICAgICAgICAgIC8vIHRoaXMuZWxzLmZwcy5pbm5lckhUTUwgPSBtZXRhLmZwcy50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbHMuc3RlcHMuaW5uZXJIVE1MID0gbWV0YS5zdGVwcztcbiAgICAgICAgICAgIHRocm93ICdZb3UgbXVzdCBvdmVycmlkZSB0aGUgcmVuZGVyZXIuZHJhd01ldGEoKSBtZXRob2QuJztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVyZXIjZHJhd0JvZHkoIGJvZHksIHZpZXcgKVxuICAgICAgICAgKiAtIGJvZHkgKE9iamVjdCk6IFRoZSBib2R5IHRvIGRyYXdcbiAgICAgICAgICogLSB2aWV3IChPYmplY3QpOiBUaGUgdmlldyBmb3IgdGhlIGJvZHlcbiAgICAgICAgICpcbiAgICAgICAgICogRHJhdyBzcGVjaWZpZWQgYm9keSB1c2luZyBzcGVjaWZpZWQgdmlldy5cbiAgICAgICAgICpcbiAgICAgICAgICogT3ZlcnJpZGUgdGhpcyB3aGVuIGNyZWF0aW5nIHJlbmRlcmVycy5cbiAgICAgICAgICoqL1xuICAgICAgICBkcmF3Qm9keTogZnVuY3Rpb24oIGJvZHksIHZpZXcgKXtcblxuICAgICAgICAgICAgLy8gZXhhbXBsZSAocHNldWRvY29kZSk6XG4gICAgICAgICAgICAvLyB2aWV3LmFuZ2xlID0gYm9keS5zdGF0ZS5hbmdsZVxuICAgICAgICAgICAgLy8gdmlldy5wb3NpdGlvbiA9IGJvZHkuc3RhdGUucG9zaXRpb25cbiAgICAgICAgICAgIHRocm93ICdZb3UgbXVzdCBvdmVycmlkZSB0aGUgcmVuZGVyZXIuZHJhd0JvZHkoKSBtZXRob2QuJztcbiAgICAgICAgfVxuXG5cbiAgICB9KTtcblxufSgpKTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2NvcmUvd29ybGQuanNcblxuLyoqIHJlbGF0ZWQgdG86IFBoeXNpY3NcbiAqIGNsYXNzIFBoeXNpY3Mud29ybGRcbiAqXG4gKiBUaGUgd29ybGQgY2xhc3MgYW5kIGZhY3RvcnkgZnVuY3Rpb24uXG4gKlxuICogVXNlIFtbUGh5c2ljc11dIHRvIGNyZWF0ZSB3b3JsZHMuXG4gKiovXG4oZnVuY3Rpb24oKXtcblxuICAgIHZhciBleGVjQ2FsbGJhY2tzID0gZnVuY3Rpb24gZXhlY0NhbGxiYWNrcyggZm5zLCBzY29wZSwgYXJncyApe1xuXG4gICAgICAgIHZhciBmblxuICAgICAgICAgICAgLHJldFxuICAgICAgICAgICAgLGNiID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhlY0NhbGxiYWNrcyggZm5zLCBzY29wZSwgYXJncyApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIHdoaWxlICggZm4gPSBmbnMuc2hpZnQoKSApe1xuXG4gICAgICAgICAgICByZXQgPSBmbi5hcHBseShzY29wZSwgYXJncyk7XG5cbiAgICAgICAgICAgIGlmIChyZXQgJiYgcmV0LnRoZW4pe1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQudGhlbiggY2IgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB0aW1lc3RlcFxuICAgICAgICB0aW1lc3RlcDogNixcbiAgICAgICAgLy8gbWF4aW11bSBudW1iZXIgb2YgaXRlcmF0aW9ucyBwZXIgc3RlcFxuICAgICAgICBtYXhJUEY6IDQsXG4gICAgICAgIHdlYndvcmtlcjogZmFsc2UsIC8vIE5PVCBZRVQgSU1QTEVNRU5URURcblxuICAgICAgICAvLyBkZWZhdWx0IGludGVncmF0b3JcbiAgICAgICAgaW50ZWdyYXRvcjogJ3ZlcmxldCcsXG5cbiAgICAgICAgLy8gaXMgc2xlZXBpbmcgZGlzYWJsZWQ/XG4gICAgICAgIHNsZWVwRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAvLyBzcGVlZCBhdCB3aGljaCBib2RpZXMgd2FrZSB1cFxuICAgICAgICBzbGVlcFNwZWVkTGltaXQ6IDAuMDUsXG4gICAgICAgIC8vIHZhcmlhbmNlIGluIHBvc2l0aW9uIGJlbG93IHdoaWNoIGJvZGllcyBmYWxsIGFzbGVlcFxuICAgICAgICBzbGVlcFZhcmlhbmNlTGltaXQ6IDAuMDIsXG4gICAgICAgIC8vIHRpbWUgKG1zKSBiZWZvcmUgc2xlZXB5IGJvZGllcyBmYWxsIGFzbGVlcFxuICAgICAgICBzbGVlcFRpbWVMaW1pdDogNTAwXG4gICAgfTtcblxuICAgIC8vIGJlZ2luIHdvcmxkIGRlZmluaXRpb25zXG5cbiAgICAvKiogYWxpYXMgb2Y6IFBoeXNpY3NcbiAgICAgKiBuZXcgUGh5c2ljcy53b3JsZChbb3B0aW9ucywgZm4od29ybGQsIFBoeXNpY3MpXSlcbiAgICAgKiAtIG9wdGlvbnMgKE9iamVjdCk6IGNvbmZpZ3VyYXRpb24gb3B0aW9ucyAoc2VlIGRlc2NyaXB0aW9uKVxuICAgICAqIC0gZm4gKEZ1bmN0aW9ufEFycmF5KTogQ2FsbGJhY2sgZnVuY3Rpb24gb3IgYXJyYXkgb2YgY2FsbGJhY2tzIGNhbGxlZCB3aXRoIHRoaXMgPT09IHdvcmxkXG4gICAgICogLSB3b3JsZCAoUGh5c2ljcy53b3JsZCk6IFRoZSBjdXJyZW50IHdvcmxkIGNyZWF0ZWRcbiAgICAgKiAtIFBoeXNpY3MgKFBoeXNpY3MpOiBUaGUgUGh5c2ljcyBuYW1lc3BhY2VcbiAgICAgKlxuICAgICAqIFdvcmxkIENvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogVXNlIFtbUGh5c2ljc11dIHRvIGNyZWF0ZSB3b3JsZHMuXG4gICAgICpcbiAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMgYW5kIGRlZmF1bHRzOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIHtcbiAgICAgKiAgLy8gZGVmYXVsdCB0aW1lc3RlcFxuICAgICAqICB0aW1lc3RlcDogNixcbiAgICAgKiAgLy8gbWF4aW11bSBudW1iZXIgb2YgaXRlcmF0aW9ucyBwZXIgc3RlcFxuICAgICAqICBtYXhJUEY6IDQsXG4gICAgICpcbiAgICAgKiAgLy8gZGVmYXVsdCBpbnRlZ3JhdG9yXG4gICAgICogIGludGVncmF0b3I6ICd2ZXJsZXQnLFxuICAgICAqXG4gICAgICogIC8vIGlzIHNsZWVwaW5nIGRpc2FibGVkP1xuICAgICAqICBzbGVlcERpc2FibGVkOiBmYWxzZSxcbiAgICAgKiAgLy8gc3BlZWQgYXQgd2hpY2ggYm9kaWVzIHdha2UgdXBcbiAgICAgKiAgc2xlZXBTcGVlZExpbWl0OiAwLjEsXG4gICAgICogIC8vIHZhcmlhbmNlIGluIHBvc2l0aW9uIGJlbG93IHdoaWNoIGJvZGllcyBmYWxsIGFzbGVlcFxuICAgICAqICBzbGVlcFZhcmlhbmNlTGltaXQ6IDIsXG4gICAgICogIC8vIHRpbWUgKG1zKSBiZWZvcmUgc2xlZXB5IGJvZGllcyBmYWxsIGFzbGVlcFxuICAgICAqICBzbGVlcFRpbWVMaW1pdDogNTAwXG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogSWYgY2FsbGVkIHdpdGggYW4gYXJyYXkgb2YgZnVuY3Rpb25zLCBhbmQgYW55IGZ1bmN0aW9uc1xuICAgICAqIHJldHVybiBhIFtwcm9taXNlLWxpa2Ugb2JqZWN0XShodHRwOi8vcHJvbWlzZXMtYXBsdXMuZ2l0aHViLmlvL3Byb21pc2VzLXNwZWMvKSxcbiAgICAgKiBlYWNoIHJlbWFpbmluZyBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBvbmx5IHdoZW4gdGhhdCBwcm9taXNlIGlzIHJlc29sdmVkLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBoeXBvdGhldGljYWwgcmVzb3VyY2VzIG5lZWQgdG8gYmUgbG9hZGVkLi4uXG4gICAgICogUGh5c2ljcyggY2ZnLCBbXG4gICAgICogICAgIGZ1bmN0aW9uKCB3b3JsZCApe1xuICAgICAqICAgICAgICAgdmFyIGRmZCA9ICQuRGVmZXJyZWQoKVxuICAgICAqICAgICAgICAgICAgICxpbWFnZXMgPSBbXVxuICAgICAqICAgICAgICAgICAgICx0b0xvYWQgPSBteUltYWdlcy5sZW5ndGhcbiAgICAgKiAgICAgICAgICAgICAsY2FsbGJhY2sgPSBmdW5jdGlvbigpe1xuICAgICAqICAgICAgICAgICAgICAgICB0b0xvYWQtLTtcbiAgICAgKiAgICAgICAgICAgICAgICAgLy8gd2FpdCBmb3IgYWxsIGltYWdlcyB0byBiZSBsb2FkZWRcbiAgICAgKiAgICAgICAgICAgICAgICAgaWYgKCB0b0xvYWQgPD0gMCApe1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmUoKTtcbiAgICAgKiAgICAgICAgICAgICAgICAgfVxuICAgICAqICAgICAgICAgICAgIH1cbiAgICAgKiAgICAgICAgICAgICA7XG4gICAgICpcbiAgICAgKiAgICAgICAgIC8vIGxvYWQgaW1hZ2VzXG4gICAgICogICAgICAgICAkLmVhY2gobXlJbWFnZXMsIGZ1bmN0aW9uKCBzcmMgKXtcbiAgICAgKiAgICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICogICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGNhbGxiYWNrO1xuICAgICAqICAgICAgICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICogICAgICAgICB9KTtcbiAgICAgKlxuICAgICAqICAgICAgICAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uKCB3b3JsZCApe1xuICAgICAqICAgICAgICAgLy8gd29uJ3QgYmUgZXhlY3V0ZWQgdW50aWwgaW1hZ2VzIGFyZSBsb2FkZWRcbiAgICAgKiAgICAgICAgIC8vIGluaXRpYWxpemUgd29ybGQuLi4gZXRjLi4uXG4gICAgICogICAgIH1cbiAgICAgKiBdKTtcbiAgICAgKiBgYGBcbiAgICAgKiovXG4gICAgdmFyIFdvcmxkID0gZnVuY3Rpb24gV29ybGQoIGNmZywgZm4gKXtcblxuICAgICAgICAvLyBhbGxvdyBjcmVhdGlvbiBvZiB3b3JsZCB3aXRob3V0IFwibmV3XCJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFdvcmxkKSl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFdvcmxkKCBjZmcsIGZuICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXQoIGNmZywgZm4gKTtcbiAgICB9O1xuXG4gICAgLy8gZXh0ZW5kIHB1YnN1YlxuICAgIFdvcmxkLnByb3RvdHlwZSA9IFBoeXNpY3MudXRpbC5leHRlbmQoe30sIFBoeXNpY3MudXRpbC5wdWJzdWIucHJvdG90eXBlLCB7XG5cbiAgICAgICAgLyoqIGludGVybmFsLCBzZWU6IG5ldyBQaHlzaWNzLndvcmxkXG4gICAgICAgICAqIFBoeXNpY3Mud29ybGQjaW5pdCggW29wdGlvbnMsIGZuKHdvcmxkLCBQaHlzaWNzKV0gKVxuICAgICAgICAgKiAtIG9wdGlvbnMgKE9iamVjdCk6IGNvbmZpZ3VyYXRpb24gb3B0aW9ucyAoc2VlIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAtIGZuIChGdW5jdGlvbnxBcnJheSk6IENhbGxiYWNrIGZ1bmN0aW9uIG9yIGFycmF5IG9mIGNhbGxiYWNrcyBjYWxsZWQgd2l0aCB0aGlzID09PSB3b3JsZFxuICAgICAgICAgKlxuICAgICAgICAgKiBJbml0aWFsaXphdGlvblxuICAgICAgICAgKiovXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBjZmcsIGZuICl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCBQaHlzaWNzLnV0aWwuaXNGdW5jdGlvbiggY2ZnICkgfHwgUGh5c2ljcy51dGlsLmlzQXJyYXkoIGNmZyApICl7XG4gICAgICAgICAgICAgICAgZm4gPSBjZmc7XG4gICAgICAgICAgICAgICAgY2ZnID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX21ldGEgPSB7XG4gICAgICAgICAgICAgICAvLyBzdGF0aXN0aWNzIChmcHMsIGV0YylcbiAgICAgICAgICAgICAgIGZwczogMCxcbiAgICAgICAgICAgICAgIGlwZjogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2JvZGllcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fYmVoYXZpb3JzID0gW107XG4gICAgICAgICAgICB0aGlzLl9pbnRlZ3JhdG9yID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fd2FycCA9IDE7XG4gICAgICAgICAgICB0aGlzLl90aW1lID0gMDtcblxuICAgICAgICAgICAgLy8gc2V0IG9wdGlvbnNcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IFBoeXNpY3MudXRpbC5vcHRpb25zKCBkZWZhdWx0cyApO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uQ2hhbmdlKGZ1bmN0aW9uKCBvcHRzICl7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgdGltZXN0ZXBcbiAgICAgICAgICAgICAgICBzZWxmLnRpbWVzdGVwKCBvcHRzLnRpbWVzdGVwICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyggY2ZnICk7XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbnRlZ3JhdG9yXG4gICAgICAgICAgICB0aGlzLmFkZChQaHlzaWNzLmludGVncmF0b3IoIHRoaXMub3B0aW9ucy5pbnRlZ3JhdG9yICkpO1xuXG4gICAgICAgICAgICAvLyBhcHBseSB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIGlmICggUGh5c2ljcy51dGlsLmlzRnVuY3Rpb24oIGZuICkgKXtcblxuICAgICAgICAgICAgICAgIGV4ZWNDYWxsYmFja3MoWyBmbiBdLCB0aGlzLCBbdGhpcywgUGh5c2ljc10gKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggUGh5c2ljcy51dGlsLmlzQXJyYXkoIGZuICkgKXtcblxuICAgICAgICAgICAgICAgIGV4ZWNDYWxsYmFja3MoZm4sIHRoaXMsIFt0aGlzLCBQaHlzaWNzXSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI29wdGlvbnMoIGNmZyApIC0+IE9iamVjdFxuICAgICAgICAgKiAtIG9wdGlvbnMgKE9iamVjdCk6IGNvbmZpZ3VyYXRpb24gb3B0aW9ucyAoc2VlIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiArIChPYmplY3QpOiBPcHRpb25zIGNvbnRhaW5lclxuICAgICAgICAgKlxuICAgICAgICAgKiBTZXQgY29uZmlnIG9wdGlvbnMuIEFsc28gYWNjZXNzIG9wdGlvbnMgYnkgYC5vcHRpb25zLjxvcHRpb24+YC5cbiAgICAgICAgICoqL1xuICAgICAgICBvcHRpb25zOiBudWxsLFxuXG4gICAgICAgIC8qKiBjaGFpbmFibGVcbiAgICAgICAgICogUGh5c2ljcy53b3JsZCNhZGQoIHRoaW5ncyApIC0+IHRoaXNcbiAgICAgICAgICogLSB0aGluZ3MgKE9iamVjdHxBcnJheSk6IFRoZSB0aGluZywgb3IgYXJyYXkgb2YgdGhpbmdzIChib2R5LCBiZWhhdmlvciwgaW50ZWdyYXRvciwgb3IgcmVuZGVyZXIpIHRvIGFkZC5cbiAgICAgICAgICpcbiAgICAgICAgICogTXVsdGlwdXJwb3NlIGFkZCBtZXRob2QuIEFkZCBvbmUgb3IgbWFueSBib2RpZXMsIGJlaGF2aW9ycywgaW50ZWdyYXRvcnMsIHJlbmRlcmVycy4uLlxuICAgICAgICAgKiovXG4gICAgICAgIGFkZDogZnVuY3Rpb24oIGFyZyApe1xuXG4gICAgICAgICAgICB2YXIgaSA9IDBcbiAgICAgICAgICAgICAgICAsbGVuID0gYXJnICYmIGFyZy5sZW5ndGggfHwgMFxuICAgICAgICAgICAgICAgICx0aGluZyA9IFBoeXNpY3MudXRpbC5pc0FycmF5KCBhcmcgKSA/IGFyZ1sgMCBdIDogYXJnXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBpZiAoICF0aGluZyApe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB3ZSdsbCBlaXRoZXIgY3ljbGUgdGhyb3VnaCBhbiBhcnJheVxuICAgICAgICAgICAgLy8gb3IganVzdCBydW4gdGhpcyBvbiB0aGUgYXJnIGl0c2VsZlxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpbmcudHlwZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmVoYXZpb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCZWhhdmlvcih0aGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBlbmQgYmVoYXZpb3JcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnRlZ3JhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZWdyYXRvcih0aGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBlbmQgaW50ZWdyYXRvclxuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbmRlcmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIodGhpbmcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gZW5kIHJlbmRlcmVyXG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9keSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEJvZHkodGhpbmcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gZW5kIGJvZHlcblxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ0Vycm9yOiBmYWlsZWQgdG8gYWRkIGl0ZW0gb2YgdW5rbm93biB0eXBlIFwiJysgdGhpbmcudHlwZSArJ1wiIHRvIHdvcmxkJztcbiAgICAgICAgICAgICAgICAgICAgLy8gZW5kIGRlZmF1bHRcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gd2hpbGUgKCArK2kgPCBsZW4gJiYgKHRoaW5nID0gYXJnWyBpIF0pICk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBjaGFpbmFibGVcbiAgICAgICAgICogUGh5c2ljcy53b3JsZCNyZW1vdmUoIHRoaW5ncyApIC0+IHRoaXNcbiAgICAgICAgICogLSB0aGluZ3MgKE9iamVjdHxBcnJheSk6IFRoZSB0aGluZywgb3IgYXJyYXkgb2YgdGhpbmdzIChib2R5LCBiZWhhdmlvciwgaW50ZWdyYXRvciwgb3IgcmVuZGVyZXIpIHRvIHJlbW92ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogTXVsdGlwdXJwb3NlIHJlbW92ZSBtZXRob2QuIFJlbW92ZSBvbmUgb3IgbWFueSBib2RpZXMsIGJlaGF2aW9ycywgaW50ZWdyYXRvcnMsIHJlbmRlcmVycy4uLlxuICAgICAgICAgKiovXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oIGFyZyApe1xuXG4gICAgICAgICAgICB2YXIgaSA9IDBcbiAgICAgICAgICAgICAgICAsbGVuID0gYXJnICYmIGFyZy5sZW5ndGggfHwgMFxuICAgICAgICAgICAgICAgICx0aGluZyA9IFBoeXNpY3MudXRpbC5pc0FycmF5KCBhcmcgKSA/IGFyZ1sgMCBdIDogYXJnXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBpZiAoICF0aGluZyApe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB3ZSdsbCBlaXRoZXIgY3ljbGUgdGhyb3VnaCBhbiBhcnJheVxuICAgICAgICAgICAgLy8gb3IganVzdCBydW4gdGhpcyBvbiB0aGUgYXJnIGl0c2VsZlxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpbmcudHlwZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmVoYXZpb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVCZWhhdmlvciggdGhpbmcgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIGVuZCBiZWhhdmlvclxuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ludGVncmF0b3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaW5nID09PSB0aGlzLl9pbnRlZ3JhdG9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVncmF0b3IoIG51bGwgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIGVuZCBpbnRlZ3JhdG9yXG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVuZGVyZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaW5nID09PSB0aGlzLl9yZW5kZXJlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlciggbnVsbCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gZW5kIHJlbmRlcmVyXG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9keSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUJvZHkoIHRoaW5nICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBlbmQgYm9keVxuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyAnRXJyb3I6IGZhaWxlZCB0byByZW1vdmUgaXRlbSBvZiB1bmtub3duIHR5cGUgXCInKyB0aGluZy50eXBlICsnXCIgZnJvbSB3b3JsZCc7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVuZCBkZWZhdWx0XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IHdoaWxlICggKytpIDwgbGVuICYmICh0aGluZyA9IGFyZ1sgaSBdKSApO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogY2hhaW5hYmxlXG4gICAgICAgICAqIFBoeXNpY3Mud29ybGQjaGFzKCB0aGluZyApIC0+IEJvb2xlYW5cbiAgICAgICAgICogLSB0aGluZyAoT2JqZWN0KTogVGhlIHRoaW5nIHRvIHRlc3RcbiAgICAgICAgICogKyAoQm9vbGVhbik6IGB0cnVlYCBpZiB0aGluZyBpcyBpbiB0aGUgd29ybGQsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBEZXRlcm1pbmUgaWYgYSB0aGluZyBoYXMgYmVlbiBhZGRlZCB0byB3b3JsZC5cbiAgICAgICAgICoqL1xuICAgICAgICBoYXM6IGZ1bmN0aW9uKCB0aGluZyApe1xuXG4gICAgICAgICAgICB2YXIgYXJyXG4gICAgICAgICAgICAgICAgLGlcbiAgICAgICAgICAgICAgICAsbFxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgaWYgKCAhdGhpbmcgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAodGhpbmcudHlwZSl7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdiZWhhdmlvcic6XG4gICAgICAgICAgICAgICAgICAgIGFyciA9IHRoaXMuX2JlaGF2aW9ycztcbiAgICAgICAgICAgICAgICBicmVhazsgLy8gZW5kIGJlaGF2aW9yXG5cbiAgICAgICAgICAgICAgICBjYXNlICdpbnRlZ3JhdG9yJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKCB0aGlzLl9pbnRlZ3JhdG9yID09PSB0aGluZyApO1xuICAgICAgICAgICAgICAgIC8vIGVuZCBpbnRlZ3JhdG9yXG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZW5kZXJlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuICggdGhpcy5fcmVuZGVyZXIgPT09IHRoaW5nICk7XG4gICAgICAgICAgICAgICAgLy8gZW5kIHJlbmRlcmVyXG5cbiAgICAgICAgICAgICAgICBjYXNlICdib2R5JzpcbiAgICAgICAgICAgICAgICAgICAgYXJyID0gdGhpcy5fYm9kaWVzO1xuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBlbmQgYm9keVxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ0Vycm9yOiB1bmtub3duIHR5cGUgXCInKyB0aGluZy50eXBlICsnXCInO1xuICAgICAgICAgICAgICAgIC8vIGVuZCBkZWZhdWx0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGFycmF5XG4gICAgICAgICAgICByZXR1cm4gKFBoeXNpY3MudXRpbC5pbmRleE9mKCBhcnIsIHRoaW5nICkgPiAtMSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGNoYWluYWJsZVxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI2ludGVncmF0b3IoIFtpbnRlZ3JhdG9yXSApIC0+IEludGVncmF0b3J8dGhpc1xuICAgICAgICAgKiAtIGludGVncmF0b3IgKEludGVncmF0b3IpOiBUaGUgaW50ZWdyYXRvciB0byBzZXQgb24gdGhlIHdvcmxkXG4gICAgICAgICAqICsgKEludGVncmF0b3IpOiBUaGUgY3VycmVudGx5IHNldCBpbnRlZ3JhdG9yIGlmIGBpbnRlZ3JhdG9yYCBub3Qgc3BlY2lmaWVkXG4gICAgICAgICAqICsgKHRoaXMpOiBmb3IgY2hhaW5pbmcgaWYgYGludGVncmF0b3JgIHNwZWNpZmllZFxuICAgICAgICAgKlxuICAgICAgICAgKiBHZXQgb3IgU2V0IHRoZSBpbnRlZ3JhdG9yXG4gICAgICAgICAqKi9cbiAgICAgICAgaW50ZWdyYXRvcjogZnVuY3Rpb24oIGludGVncmF0b3IgKXtcblxuICAgICAgICAgICAgaWYgKCBpbnRlZ3JhdG9yID09PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faW50ZWdyYXRvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZG8gbm90aGluZyBpZiBhbHJlYWR5IGFkZGVkXG4gICAgICAgICAgICBpZiAoIHRoaXMuX2ludGVncmF0b3IgPT09IGludGVncmF0b3IgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCB0aGlzLl9pbnRlZ3JhdG9yICl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlZ3JhdG9yLnNldFdvcmxkKCBudWxsICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoICdyZW1vdmU6aW50ZWdyYXRvcicsIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZWdyYXRvcjogdGhpcy5faW50ZWdyYXRvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGludGVncmF0b3IgKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlZ3JhdG9yID0gaW50ZWdyYXRvcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlZ3JhdG9yLnNldFdvcmxkKCB0aGlzICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoICdhZGQ6aW50ZWdyYXRvcicsIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZWdyYXRvcjogdGhpcy5faW50ZWdyYXRvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogY2hhaW5hYmxlXG4gICAgICAgICAqIFBoeXNpY3Mud29ybGQjcmVuZGVyZXIoIFtyZW5kZXJlcl0gKSAtPiBSZW5kZXJlcnx0aGlzXG4gICAgICAgICAqIC0gcmVuZGVyZXIgKFJlbmRlcmVyKTogVGhlIHJlbmRlcmVyIHRvIHNldCBvbiB0aGUgd29ybGRcbiAgICAgICAgICogKyAoUmVuZGVyZXIpOiBUaGUgY3VycmVudGx5IHNldCByZW5kZXJlciBpZiBgcmVuZGVyZXJgIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgICogKyAodGhpcyk6IGZvciBjaGFpbmluZyBpZiBgcmVuZGVyZXJgIHNwZWNpZmllZFxuICAgICAgICAgKlxuICAgICAgICAgKiBHZXQgb3IgU2V0IHRoZSByZW5kZXJlclxuICAgICAgICAgKiovXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiggcmVuZGVyZXIgKXtcblxuICAgICAgICAgICAgaWYgKCByZW5kZXJlciA9PT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nIGlmIHJlbmRlcmVyIGFscmVhZHkgYWRkZWRcbiAgICAgICAgICAgIGlmICggdGhpcy5fcmVuZGVyZXIgPT09IHJlbmRlcmVyICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5fcmVuZGVyZXIgKXtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFdvcmxkKCBudWxsICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoICdyZW1vdmU6cmVuZGVyZXInLCB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOiB0aGlzLl9yZW5kZXJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHJlbmRlcmVyICl7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRXb3JsZCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCAnYWRkOnJlbmRlcmVyJywge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcjogdGhpcy5fcmVuZGVyZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGNoYWluYWJsZVxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI3RpbWVzdGVwKCBbZHRdICkgLT4gTnVtYmVyfHRoaXNcbiAgICAgICAgICogLSBkdCAoTnVtYmVyKTogVGhlIHRpbWUgc3RlcCBmb3IgdGhlIHdvcmxkXG4gICAgICAgICAqICsgKE51bWJlcik6IFRoZSBjdXJyZW50bHkgc2V0IHRpbWUgc3RlcCBpZiBgZHRgIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgICogKyAodGhpcyk6IGZvciBjaGFpbmluZyBpZiBgZHRgIHNwZWNpZmllZFxuICAgICAgICAgKlxuICAgICAgICAgKiBHZXQgb3IgU2V0IHRoZSB0aW1lc3RlcFxuICAgICAgICAgKiovXG4gICAgICAgIHRpbWVzdGVwOiBmdW5jdGlvbiggZHQgKXtcblxuICAgICAgICAgICAgaWYgKCBkdCApe1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZHQgPSArZHQudG9QcmVjaXNpb24oNCk7IC8vIG9ubHkga2VlcCA0IGRlY2ltYWwgcGxhY2VzIG9mIHByZWNpc2lvbiBvdGhlcndpc2Ugd2UgZ2V0IHJvdW5kaW5nIGVycm9yc1xuICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbWF4aW11bSBqdW1wIGluIHRpbWUgb3ZlciB3aGljaCB0byBkbyBpdGVyYXRpb25zXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4SnVtcCA9IGR0ICogdGhpcy5vcHRpb25zLm1heElQRjtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGNoYWluYWJsZVxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI3dha2VVcEFsbCgpIC0+IHRoaXNcbiAgICAgICAgICogKyAodGhpcyk6IGZvciBjaGFpbmluZ1xuICAgICAgICAgKlxuICAgICAgICAgKiBXYWtlIHVwIGFsbCBib2RpZXMgaW4gd29ybGQuXG4gICAgICAgICAqKi9cbiAgICAgICAgd2FrZVVwQWxsOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGkgPSAwXG4gICAgICAgICAgICAgICAgLGwgPSB0aGlzLl9ib2RpZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGw7IGkrKyApe1xuICAgICAgICAgICAgICAgIHRoaXMuX2JvZGllc1sgaSBdLnNsZWVwKCBmYWxzZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBjaGFpbmFibGVcbiAgICAgICAgICogUGh5c2ljcy53b3JsZCNhZGRCZWhhdmlvciggYmVoYXZpb3IgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gYmVoYXZpb3IgKEJlaGF2aW9yKTogVGhlIGJlaGF2aW9yIHRvIGFkZFxuICAgICAgICAgKlxuICAgICAgICAgKiBBZGQgYSBiZWhhdmlvciB0byB0aGUgd29ybGRcbiAgICAgICAgICoqL1xuICAgICAgICBhZGRCZWhhdmlvcjogZnVuY3Rpb24oIGJlaGF2aW9yICl7XG5cbiAgICAgICAgICAgIHZhciBub3RpZnk7XG5cbiAgICAgICAgICAgIC8vIGRvbid0IGFsbG93IGR1cGxpY2F0ZXNcbiAgICAgICAgICAgIGlmICggdGhpcy5oYXMoIGJlaGF2aW9yICkgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYmVoYXZpb3Iuc2V0V29ybGQoIHRoaXMgKTtcbiAgICAgICAgICAgIHRoaXMuX2JlaGF2aW9ycy5wdXNoKCBiZWhhdmlvciApO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoICdhZGQ6YmVoYXZpb3InLCB7XG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IGJlaGF2aW9yXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBoeXNpY3Mud29ybGQjZ2V0QmVoYXZpb3JzKCkgLT4gQXJyYXlcbiAgICAgICAgICogKyAoQXJyYXkpOiBBcnJheSBvZiBiZWhhdmlvcnNcbiAgICAgICAgICpcbiAgICAgICAgICogR2V0IGNvcGllZCBsaXN0IG9mIGJlaGF2aW9ycyBpbiB0aGUgd29ybGRcbiAgICAgICAgICoqL1xuICAgICAgICBnZXRCZWhhdmlvcnM6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgY29waWVkIGFycmF5XG4gICAgICAgICAgICByZXR1cm4gW10uY29uY2F0KHRoaXMuX2JlaGF2aW9ycyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGNoYWluYWJsZVxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI3JlbW92ZUJlaGF2aW9yKCBiZWhhdmlvciApIC0+IHRoaXNcbiAgICAgICAgICogLSBiZWhhdmlvciAoQmVoYXZpb3IpOiBUaGUgYmVoYXZpb3IgdG8gcmVtb3ZlXG4gICAgICAgICAqXG4gICAgICAgICAqIFJlbW92ZSBhIGJlaGF2aW9yIGZyb20gdGhlIHdvcmxkXG4gICAgICAgICAqKi9cbiAgICAgICAgcmVtb3ZlQmVoYXZpb3I6IGZ1bmN0aW9uKCBiZWhhdmlvciApe1xuXG4gICAgICAgICAgICB2YXIgYmVoYXZpb3JzID0gdGhpcy5fYmVoYXZpb3JzO1xuXG4gICAgICAgICAgICBpZiAoYmVoYXZpb3Ipe1xuXG4gICAgICAgICAgICAgICAgZm9yICggdmFyIGkgPSAwLCBsID0gYmVoYXZpb3JzLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChiZWhhdmlvciA9PT0gYmVoYXZpb3JzWyBpIF0pe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcnMuc3BsaWNlKCBpLCAxICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvci5zZXRXb3JsZCggbnVsbCApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoICdyZW1vdmU6YmVoYXZpb3InLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IGJlaGF2aW9yXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBjaGFpbmFibGVcbiAgICAgICAgICogUGh5c2ljcy53b3JsZCNhZGRCb2R5KCBib2R5ICkgLT4gdGhpc1xuICAgICAgICAgKiAtIGJvZHkgKEJvZHkpOiBUaGUgYmVoYXZpb3IgdG8gYWRkXG4gICAgICAgICAqXG4gICAgICAgICAqIEFkZCBhIGJvZHkgdG8gdGhlIHdvcmxkXG4gICAgICAgICAqKi9cbiAgICAgICAgYWRkQm9keTogZnVuY3Rpb24oIGJvZHkgKXtcblxuICAgICAgICAgICAgdmFyIG5vdGlmeTtcblxuICAgICAgICAgICAgLy8gZG9uJ3QgYWxsb3cgZHVwbGljYXRlc1xuICAgICAgICAgICAgaWYgKCB0aGlzLmhhcyggYm9keSApICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJvZHkuc2V0V29ybGQoIHRoaXMgKTtcbiAgICAgICAgICAgIHRoaXMuX2JvZGllcy5wdXNoKCBib2R5ICk7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCggJ2FkZDpib2R5Jywge1xuICAgICAgICAgICAgICAgIGJvZHk6IGJvZHlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGh5c2ljcy53b3JsZCNnZXRCb2RpZXMoKSAtPiBBcnJheVxuICAgICAgICAgKiArIChBcnJheSk6IEFycmF5IG9mIGJvZGllc1xuICAgICAgICAgKlxuICAgICAgICAgKiBHZXQgY29waWVkIGxpc3Qgb2YgYm9kaWVzIGluIHRoZSB3b3JsZFxuICAgICAgICAgKiovXG4gICAgICAgIGdldEJvZGllczogZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBjb3BpZWQgYXJyYXlcbiAgICAgICAgICAgIHJldHVybiBbXS5jb25jYXQodGhpcy5fYm9kaWVzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogY2hhaW5hYmxlXG4gICAgICAgICAqIFBoeXNpY3Mud29ybGQjcmVtb3ZlQm9keSggYm9keSApIC0+IHRoaXNcbiAgICAgICAgICogLSBib2R5IChCb2R5KTogVGhlIGJvZHkgdG8gcmVtb3ZlXG4gICAgICAgICAqXG4gICAgICAgICAqIFJlbW92ZSBhIGJvZHkgZnJvbSB0aGUgd29ybGRcbiAgICAgICAgICoqL1xuICAgICAgICByZW1vdmVCb2R5OiBmdW5jdGlvbiggYm9keSApe1xuXG4gICAgICAgICAgICB2YXIgYm9kaWVzID0gdGhpcy5fYm9kaWVzO1xuXG4gICAgICAgICAgICBpZiAoYm9keSl7XG5cbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBib2RpZXMubGVuZ3RoOyBpIDwgbDsgKytpICl7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkgPT09IGJvZGllc1sgaSBdKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYm9kaWVzLnNwbGljZSggaSwgMSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5zZXRXb3JsZCggbnVsbCApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoICdyZW1vdmU6Ym9keScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBib2R5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBzZWU6IFBoeXNpY3MucXVlcnlcbiAgICAgICAgICogUGh5c2ljcy53b3JsZCNmaW5kT25lKCBydWxlcyApIC0+IEJvZHkgfCBmYWxzZVxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI2ZpbmRPbmUoIGZpbHRlcihib2R5KSApIC0+IEJvZHkgfCBmYWxzZVxuICAgICAgICAgKiAtIHJ1bGVzIChPYmplY3QpOiBRdWVyeSBydWxlcy5cbiAgICAgICAgICogLSBmaWx0ZXIgKEZ1bmN0aW9uKTogRmlsdGVyIGZ1bmN0aW9uIGNhbGxlZCB0byBjaGVjayBib2RpZXNcbiAgICAgICAgICogLSBib2R5IChCb2R5KTogRWFjaCBib2R5IGluIHRoZSB3b3JsZFxuICAgICAgICAgKlxuICAgICAgICAgKiBGaW5kIGZpcnN0IG1hdGNoaW5nIGJvZHkgYmFzZWQgb24gcXVlcnkgcnVsZXMuXG4gICAgICAgICAqKi9cbiAgICAgICAgZmluZE9uZTogZnVuY3Rpb24oIHJ1bGVzICl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICAgICxmbiA9ICh0eXBlb2YgcnVsZXMgPT09ICdmdW5jdGlvbicpID8gcnVsZXMgOiBQaHlzaWNzLnF1ZXJ5KCBydWxlcyApXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICByZXR1cm4gUGh5c2ljcy51dGlsLmZpbmQoIHNlbGYuX2JvZGllcywgZm4gKSB8fCBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogc2VlOiBQaHlzaWNzLnF1ZXJ5XG4gICAgICAgICAqIFBoeXNpY3Mud29ybGQjZmluZCggcnVsZXMgKSAtPiBBcnJheVxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI2ZpbmQoIGZpbHRlcihib2R5KSApIC0+IEFycmF5XG4gICAgICAgICAqIC0gcnVsZXMgKE9iamVjdCk6IFF1ZXJ5IHJ1bGVzXG4gICAgICAgICAqIC0gZmlsdGVyIChGdW5jdGlvbik6IEZpbHRlciBmdW5jdGlvbiBjYWxsZWQgdG8gY2hlY2sgYm9kaWVzXG4gICAgICAgICAqIC0gYm9keSAoQm9keSk6IEVhY2ggYm9keSBpbiB0aGUgd29ybGRcbiAgICAgICAgICpcbiAgICAgICAgICogRmluZCBhbGwgbWF0Y2hpbmcgYm9kaWVzIGJhc2VkIG9uIHF1ZXJ5IHJ1bGVzLlxuICAgICAgICAgKiovXG4gICAgICAgIGZpbmQ6IGZ1bmN0aW9uKCBydWxlcyApe1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICAsZm4gPSAodHlwZW9mIHJ1bGVzID09PSAnZnVuY3Rpb24nKSA/IHJ1bGVzIDogUGh5c2ljcy5xdWVyeSggcnVsZXMgKVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgcmV0dXJuIFBoeXNpY3MudXRpbC5maWx0ZXIoIHNlbGYuX2JvZGllcywgZm4gKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogUGh5c2ljcy53b3JsZCNpdGVyYXRlKCBkdCApXG4gICAgICAgICAqIC0gZHQgKE51bWJlcik6IFRoZSB0aW1lc3RlcFxuICAgICAgICAgKlxuICAgICAgICAgKiBEbyBhIHNpbmdsZSBpdGVyYXRpb24uXG4gICAgICAgICAqKi9cbiAgICAgICAgaXRlcmF0ZTogZnVuY3Rpb24oIGR0ICl7XG5cbiAgICAgICAgICAgIHRoaXMuX2ludGVncmF0b3IuaW50ZWdyYXRlKCB0aGlzLl9ib2RpZXMsIGR0ICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGNoYWluYWJsZVxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI3N0ZXAoIFtub3ddICkgLT4gdGhpc1xuICAgICAgICAgKiAtIG5vdyAoTnVtYmVyKTogQ3VycmVudCB1bml4IHRpbWVzdGFtcFxuICAgICAgICAgKlxuICAgICAgICAgKiBTdGVwIHRoZSB3b3JsZCB1cCB0byBzcGVjaWZpZWQgdGltZSBvciBkbyBvbmUgc3RlcCBpZiBubyB0aW1lIGlzIHNwZWNpZmllZC5cbiAgICAgICAgICoqL1xuICAgICAgICBzdGVwOiBmdW5jdGlvbiggbm93ICl7XG5cbiAgICAgICAgICAgIHZhciB0aW1lID0gdGhpcy5fdGltZVxuICAgICAgICAgICAgICAgICx3YXJwID0gdGhpcy5fd2FycFxuICAgICAgICAgICAgICAgICxpbnZXYXJwID0gMSAvIHdhcnBcbiAgICAgICAgICAgICAgICAsZHQgPSB0aGlzLl9kdFxuICAgICAgICAgICAgICAgICxhbmltRHQgPSBkdCAqIGludldhcnBcbiAgICAgICAgICAgICAgICAsYW5pbU1heEp1bXAgPSB0aGlzLl9tYXhKdW1wICogaW52V2FycFxuICAgICAgICAgICAgICAgICxhbmltRGlmZlxuICAgICAgICAgICAgICAgICx3b3JsZERpZmZcbiAgICAgICAgICAgICAgICAsdGFyZ2V0XG4gICAgICAgICAgICAgICAgLG1ldGEgPSB0aGlzLl9tZXRhXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAvLyBpZiBpdCdzIHBhdXNlZCwgZG9uJ3Qgc3RlcFxuICAgICAgICAgICAgLy8gb3IgaWYgaXQncyB0aGUgZmlyc3Qgc3RlcC4uLlxuICAgICAgICAgICAgaWYgKCB0aGlzLl9wYXVzZWQgfHwgdGhpcy5fYW5pbVRpbWUgPT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1UaW1lID0gbm93IHx8IHRoaXMuX2FuaW1UaW1lIHx8IFBoeXNpY3MudXRpbC50aWNrZXIubm93KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoICF0aGlzLl9wYXVzZWQgKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdzdGVwJywgbWV0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBuZXcgdGltZSBpcyBzcGVjaWZpZWQsIG9yIGp1c3Qgb25lIGl0ZXJhdGlvbiBhaGVhZFxuICAgICAgICAgICAgbm93ID0gbm93IHx8ICh0aGlzLl9hbmltVGltZSArIGFuaW1EdCk7XG4gICAgICAgICAgICAvLyB0aGUgdGltZSBiZXR3ZWVuIHRoaXMgc3RlcCBhbmQgdGhlIGxhc3RcbiAgICAgICAgICAgIGFuaW1EaWZmID0gbm93IC0gdGhpcy5fYW5pbVRpbWU7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSB0aW1lIGRpZmZlcmVuY2UgaXMgdG9vIGJpZy4uLiBhZGp1c3RcbiAgICAgICAgICAgIGlmICggYW5pbURpZmYgPiBhbmltTWF4SnVtcCApe1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1UaW1lID0gbm93IC0gYW5pbU1heEp1bXA7XG4gICAgICAgICAgICAgICAgYW5pbURpZmYgPSBhbmltTWF4SnVtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdGhlIFwid29ybGRcIiB0aW1lIGJldHdlZW4gdGhpcyBzdGVwIGFuZCB0aGUgbGFzdC4gQWRqdXN0cyBmb3Igd2FycFxuICAgICAgICAgICAgd29ybGREaWZmID0gYW5pbURpZmYgKiB3YXJwO1xuXG4gICAgICAgICAgICAvLyB0aGUgdGFyZ2V0IHRpbWUgZm9yIHRoZSB3b3JsZCB0aW1lIHRvIHN0ZXAgdG9cbiAgICAgICAgICAgIHRhcmdldCA9IHRpbWUgKyB3b3JsZERpZmYgLSBkdDtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdiZWZvcmVTdGVwJyk7XG5cbiAgICAgICAgICAgIGlmICggdGltZSA8PSB0YXJnZXQgKXtcblxuICAgICAgICAgICAgICAgIHdoaWxlICggdGltZSA8PSB0YXJnZXQgKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5jcmVtZW50IHdvcmxkIHRpbWVcbiAgICAgICAgICAgICAgICAgICAgdGltZSArPSBkdDtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5jcmVtZW50IGFuaW1hdGlvbiB0aW1lXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1UaW1lICs9IGFuaW1EdDtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjb3JkIHRoZSB3b3JsZCB0aW1lXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgICAgICAgICAgICAgICAgICAvLyBpdGVyYXRlIGJ5IG9uZSB0aW1lc3RlcFxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZXJhdGUoIGR0ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgc29tZSBtZXRhXG4gICAgICAgICAgICBtZXRhLmZwcyA9IDEwMDAgLyAobm93IC0gdGhpcy5fbGFzdFRpbWUpOyAvLyBmcmFtZXMgcGVyIHNlY29uZFxuICAgICAgICAgICAgbWV0YS5pcGYgPSAod29ybGREaWZmIC8gZHQpLnRvRml4ZWQoMik7IC8vIGl0ZXJhdGlvbnMgcGVyIGZyYW1lXG4gICAgICAgICAgICBtZXRhLmludGVycG9sYXRlVGltZSA9IGR0ICsgdGFyZ2V0IC0gdGltZTtcblxuICAgICAgICAgICAgLy8gcmVjb3JkIHRoZSB0aW1lIHRoaXMgd2FzIGNhbGxlZFxuICAgICAgICAgICAgdGhpcy5fbGFzdFRpbWUgPSBub3c7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnc3RlcCcsIG1ldGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBoeXNpY3Mud29ybGQjd2FycCggW3dhcnBdICkgLT4gdGhpc3xOdW1iZXJcbiAgICAgICAgICogLSB3YXJwIChOdW1iZXIpOiBUaGUgdGltZSB3YXJwIGZhY3RvclxuICAgICAgICAgKlxuICAgICAgICAgKiBTcGVlZCB1cCBvciBzbG93IGRvd24gdGhlIGl0ZXJhdGlvbiBieSB0aGlzIGZhY3Rvci5cbiAgICAgICAgICpcbiAgICAgICAgICogRXhhbXBsZTpcbiAgICAgICAgICogYGBgamF2YXNjcmlwdFxuICAgICAgICAgKiAvLyBzbG93IG1vdGlvbi4uLiAxMHggc2xvd2VyXG4gICAgICAgICAqIHdvcmxkLndhcnAoIDAuMDEgKTtcbiAgICAgICAgICogYGBgXG4gICAgICAgICAqKi9cbiAgICAgICAgd2FycDogZnVuY3Rpb24oIHdhcnAgKXtcbiAgICAgICAgICAgIGlmICggd2FycCA9PT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dhcnA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3dhcnAgPSB3YXJwIHx8IDE7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBjaGFpbmFibGVcbiAgICAgICAgICogUGh5c2ljcy53b3JsZCNyZW5kZXIoKSAtPiB0aGlzXG4gICAgICAgICAqXG4gICAgICAgICAqIFJlbmRlciBjdXJyZW50IHdvcmxkIHN0YXRlIHVzaW5nIHRoZSByZW5kZXJlclxuICAgICAgICAgKiovXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fcmVuZGVyZXIgKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIk5vIHJlbmRlcmVyIGFkZGVkIHRvIHdvcmxkXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlciggdGhpcy5fYm9kaWVzLCB0aGlzLl9tZXRhICk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbmRlcicsIHtcbiAgICAgICAgICAgICAgICBib2RpZXM6IHRoaXMuX2JvZGllcyxcbiAgICAgICAgICAgICAgICBtZXRhOiB0aGlzLl9tZXRhLFxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiB0aGlzLl9yZW5kZXJlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogY2hhaW5hYmxlXG4gICAgICAgICAqIFBoeXNpY3Mud29ybGQjcGF1c2UoKSAtPiB0aGlzXG4gICAgICAgICAqXG4gICAgICAgICAqIFBhdXNlIHRoZSB3b3JsZCAoc3RlcCBjYWxscyBkbyBub3RoaW5nKS5cbiAgICAgICAgICoqL1xuICAgICAgICBwYXVzZTogZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncGF1c2UnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBjaGFpbmFibGVcbiAgICAgICAgICogUGh5c2ljcy53b3JsZCN1bnBhdXNlKCkgLT4gdGhpc1xuICAgICAgICAgKlxuICAgICAgICAgKiBVbnBhdXNlIHRoZSB3b3JsZCAoc3RlcCBjYWxscyBjb250aW51ZSBhcyB1c3VhbCkuXG4gICAgICAgICAqKi9cbiAgICAgICAgdW5wYXVzZTogZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3VucGF1c2UnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI2lzUGF1c2VkKCkgLT4gQm9vbGVhblxuICAgICAgICAgKiArIChCb29sZWFuKTogUmV0dXJucyBgdHJ1ZWAgaWYgd29ybGQgaXMgcGF1c2VkLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgICAgICpcbiAgICAgICAgICogRGV0ZXJtaW5lIGlmIHdvcmxkIGlzIHBhdXNlZC5cbiAgICAgICAgICoqL1xuICAgICAgICBpc1BhdXNlZDogZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5fcGF1c2VkO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaHlzaWNzLndvcmxkI2Rlc3Ryb3koKVxuICAgICAgICAgKlxuICAgICAgICAgKiBEZXN0cm95IHRoZSB3b3JsZC5cbiAgICAgICAgICogKEJ3YWhhaGFoYWhhaGEhKVxuICAgICAgICAgKiovXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHNlbGYucGF1c2UoKTtcblxuICAgICAgICAgICAgLy8gbm90aWZ5IGJlZm9yZVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgbGlzdGVuZXJzXG4gICAgICAgICAgICBzZWxmLm9mZiggdHJ1ZSApO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlKCBzZWxmLmdldEJvZGllcygpICk7XG4gICAgICAgICAgICBzZWxmLnJlbW92ZSggc2VsZi5nZXRCZWhhdmlvcnMoKSApO1xuICAgICAgICAgICAgc2VsZi5pbnRlZ3JhdG9yKCBudWxsICk7XG4gICAgICAgICAgICBzZWxmLnJlbmRlcmVyKCBudWxsICk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgUGh5c2ljcy53b3JsZCA9IFdvcmxkO1xuXG59KCkpO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvaW50ZWdyYXRvcnMvdmVybGV0LmpzXG5cblBoeXNpY3MuaW50ZWdyYXRvcigndmVybGV0JywgZnVuY3Rpb24oIHBhcmVudCApe1xuXG4gICAgLy8gZm9yIHRoaXMgaW50ZWdyYXRvciB3ZSBuZWVkIHRvIGtub3cgaWYgdGhlIG9iamVjdCBoYXMgYmVlbiBpbnRlZ3JhdGVkIGJlZm9yZVxuICAgIC8vIHNvIGxldCdzIGFkZCBhIG1peGluIHRvIGJvZGllc1xuXG4gICAgUGh5c2ljcy5ib2R5Lm1peGluKHtcblxuICAgICAgICBzdGFydGVkOiBmdW5jdGlvbiggdmFsICl7XG4gICAgICAgICAgICBpZiAoIHZhbCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAhIXRoaXMuX3N0YXJ0ZWQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNsYXNzIFZlcmxldCA8IEludGVncmF0b3JcbiAgICAgICAgICpcbiAgICAgICAgICogYFBoeXNpY3MuaW50ZWdyYXRvcigndmVybGV0JylgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgdmVybGV0IGludGVncmF0b3IuXG4gICAgICAgICAqKi9cblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBpbml0OiBmdW5jdGlvbiggb3B0aW9ucyApe1xuXG4gICAgICAgICAgICAvLyBjYWxsIHBhcmVudCBpbml0XG4gICAgICAgICAgICBwYXJlbnQuaW5pdC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGludGVncmF0ZVZlbG9jaXRpZXM6IGZ1bmN0aW9uKCBib2RpZXMsIGR0ICl7XG5cbiAgICAgICAgICAgIC8vIGhhbGYgdGhlIHRpbWVzdGVwXG4gICAgICAgICAgICB2YXIgZHRkdCA9IGR0ICogZHRcbiAgICAgICAgICAgICAgICAsZHJhZyA9IDEgLSB0aGlzLm9wdGlvbnMuZHJhZ1xuICAgICAgICAgICAgICAgICxib2R5ID0gbnVsbFxuICAgICAgICAgICAgICAgICxzdGF0ZVxuICAgICAgICAgICAgICAgICxwcmV2RHQgPSB0aGlzLnByZXZEdCB8fCBkdFxuICAgICAgICAgICAgICAgICxkdE11bCA9IChkdGR0ICsgZHQgKiBwcmV2RHQpICogMC41XG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBib2RpZXMubGVuZ3RoOyBpIDwgbDsgKytpICl7XG5cbiAgICAgICAgICAgICAgICBib2R5ID0gYm9kaWVzWyBpIF07XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBib2R5LnN0YXRlO1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBpbnRlZ3JhdGUgaWYgdGhlIGJvZHkgaXNuJ3Qgc3RhdGljXG4gICAgICAgICAgICAgICAgaWYgKCBib2R5LnRyZWF0bWVudCAhPT0gJ3N0YXRpYycgJiYgIWJvZHkuc2xlZXAoIGR0ICkgKXtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbnNwaXJlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zb3Vsd2lyZS9Db2ZmZWUtUGh5c2ljc1xuICAgICAgICAgICAgICAgICAgICAvLyBAbGljZW5jZSBNSVRcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gdiA9IHggLSBveFxuICAgICAgICAgICAgICAgICAgICAvLyB4ID0geCArICh2ICsgYSAqIGR0ICogZHQpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHRoZSB2ZWxvY2l0eSBpbiB2ZWwgaWYgdGhlIHZlbG9jaXR5IGhhcyBiZWVuIGNoYW5nZWQgbWFudWFsbHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnZlbC5lcXVhbHMoIHN0YXRlLm9sZC52ZWwgKSAmJiBib2R5LnN0YXJ0ZWQoKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB2ZWxvY2l0eSBieSBzdWJ0cmFjdGluZyBvbGQgcG9zaXRpb24gZnJvbSBjdXJyIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS52ZWwuY2xvbmUoIHN0YXRlLnBvcyApLnZzdWIoIHN0YXRlLm9sZC5wb3MgKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQucG9zLmNsb25lKCBzdGF0ZS5wb3MgKS52c3ViKCBzdGF0ZS52ZWwgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gc2NhbGUgdGhlIHZhbHVlIGJ5IGR0IHNvIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb21wbGllcyB3aXRoIG90aGVyIGludGVncmF0aW9uIG1ldGhvZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnZlbC5tdWx0KCBkdCApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwbHkgXCJhaXIgcmVzaXN0YW5jZVwiLlxuICAgICAgICAgICAgICAgICAgICBpZiAoIGRyYWcgKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudmVsLm11bHQoIGRyYWcgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IGFjY2VsZXJhdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyB2ICs9IGEgKiBkdCAqIGR0XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnZlbC52YWRkKCBzdGF0ZS5hY2MubXVsdCggZHRNdWwgKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc3RvcmUgdmVsb2NpdHlcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudmVsLm11bHQoIDEvZHQgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzdG9yZSBjYWxjdWxhdGVkIHZlbG9jaXR5XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC52ZWwuY2xvbmUoIHN0YXRlLnZlbCApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IGFjY2VsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFjYy56ZXJvKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gQW5ndWxhciBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLmFuZ3VsYXIudmVsID09PSBzdGF0ZS5vbGQuYW5ndWxhci52ZWwgJiYgYm9keS5zdGFydGVkKCkpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hbmd1bGFyLnZlbCA9IChzdGF0ZS5hbmd1bGFyLnBvcyAtIHN0YXRlLm9sZC5hbmd1bGFyLnBvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFuZ3VsYXIucG9zID0gc3RhdGUuYW5ndWxhci5wb3MgLSBzdGF0ZS5hbmd1bGFyLnZlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIudmVsICo9IGR0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYW5ndWxhci52ZWwgKz0gc3RhdGUuYW5ndWxhci5hY2MgKiBkdE11bDtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYW5ndWxhci52ZWwgLz0gZHQ7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hbmd1bGFyLnZlbCA9IHN0YXRlLmFuZ3VsYXIudmVsO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hbmd1bGFyLmFjYyA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgYm9keS5zdGFydGVkKCB0cnVlICk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHZlbG9jaXR5IGFuZCBhY2NlbGVyYXRpb24gdG8gemVybyFcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudmVsLnplcm8oKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYWNjLnplcm8oKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYW5ndWxhci52ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hbmd1bGFyLmFjYyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGludGVncmF0ZVBvc2l0aW9uczogZnVuY3Rpb24oIGJvZGllcywgZHQgKXtcblxuICAgICAgICAgICAgLy8gaGFsZiB0aGUgdGltZXN0ZXBcbiAgICAgICAgICAgIHZhciBkdGR0ID0gZHQgKiBkdFxuICAgICAgICAgICAgICAgICxib2R5ID0gbnVsbFxuICAgICAgICAgICAgICAgICxzdGF0ZVxuICAgICAgICAgICAgICAgICxwcmV2RHQgPSB0aGlzLnByZXZEdCB8fCBkdFxuICAgICAgICAgICAgICAgICxkdGNvcnIgPSBkdC9wcmV2RHRcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGJvZGllcy5sZW5ndGg7IGkgPCBsOyArK2kgKXtcblxuICAgICAgICAgICAgICAgIGJvZHkgPSBib2RpZXNbIGkgXTtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGJvZHkuc3RhdGU7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGludGVncmF0ZSBpZiB0aGUgYm9keSBpc24ndCBzdGF0aWNcbiAgICAgICAgICAgICAgICBpZiAoIGJvZHkudHJlYXRtZW50ICE9PSAnc3RhdGljJyAmJiAhYm9keS5zbGVlcCgpICl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc28gd2UgbmVlZCB0byBzY2FsZSB0aGUgdmFsdWUgYnkgZHQgc28gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGxpZXMgd2l0aCBvdGhlciBpbnRlZ3JhdGlvbiBtZXRob2RzXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnZlbC5tdWx0KCBkdCAqIGR0Y29yciApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIG9sZCBwb3NpdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgLy8geG9sZCA9IHhcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLnBvcy5jbG9uZSggc3RhdGUucG9zICk7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucG9zLnZhZGQoIHN0YXRlLnZlbCApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc3RvcmUgdmVsb2NpdHlcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudmVsLm11bHQoIDEgLyAoZHQgKiBkdGNvcnIpICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc3RvcmUgY2FsY3VsYXRlZCB2ZWxvY2l0eVxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQudmVsLmNsb25lKCBzdGF0ZS52ZWwgKTtcblxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBBbmd1bGFyIGNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICAgICAgLy9cblxuXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIudmVsICo9IGR0ICogZHRjb3JyO1xuXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hbmd1bGFyLnBvcyA9IHN0YXRlLmFuZ3VsYXIucG9zO1xuXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIucG9zICs9IHN0YXRlLmFuZ3VsYXIudmVsO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hbmd1bGFyLnZlbCAvPSBkdCAqIGR0Y29ycjtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFuZ3VsYXIudmVsID0gc3RhdGUuYW5ndWxhci52ZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByZXZEdCA9IGR0O1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvZ2VvbWV0cmllcy9wb2ludC5qc1xuXG4vKiogYWxpYXMgb2Y6IEdlb21ldHJ5XG4gKiBjbGFzcyBQb2ludEdlb21ldHJ5IDwgR2VvbWV0cnlcbiAqXG4gKiBQaHlzaWNzLmdlb21ldHJ5KCdwb2ludCcpXG4gKlxuICogVGhlIHBvaW50IGdlb21ldHJ5IHJlcHJlc2VudHMgYSBwb2ludC5cbiAqKi9cblBoeXNpY3MuZ2VvbWV0cnkoJ3BvaW50JywgZnVuY3Rpb24oIHBhcmVudCApe30pO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvYm9kaWVzL3BvaW50LmpzXG5cbi8qKiBhbGlhcyBvZjogQm9keVxuICogY2xhc3MgUG9pbnRCb2R5IDwgQm9keVxuICpcbiAqIFBoeXNpY3MuYm9keSgncG9pbnQnKVxuICpcbiAqIFRoZSBwb2ludCBib2R5IHJlcHJlc2VudHMgYSBwb2ludC5cbiAqKi9cblBoeXNpY3MuYm9keSgncG9pbnQnLCBmdW5jdGlvbiggcGFyZW50ICl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdHMgKXtcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwoIHRoaXMsIG9wdHMgKTtcbiAgICAgICAgICAgIHRoaXMubW9pID0gMDtcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2dlb21ldHJpZXMvY2lyY2xlLmpzXG5cbi8qKiBcbiAqIGNsYXNzIENpcmNsZUdlb21ldHJ5IDwgR2VvbWV0cnlcbiAqXG4gKiBQaHlzaWNzLmdlb21ldHJ5KCdjaXJjbGUnKVxuICpcbiAqIFRoZSBjaXJjbGUgZ2VvbWV0cnkgaGFzIGEgY2lyY3VsYXIgc2hhcGUuXG4gKlxuICogQWRkaXRpb25hbCBvcHRpb25zIGluY2x1ZGU6XG4gKiAtIHJhZGl1czogdGhlIHJhZGl1c1xuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIHJvdW5kID0gUGh5c2ljcy5ib2R5KCdjaXJjbGUnLCB7XG4gKiAgICAgeDogMzAsXG4gKiAgICAgeTogMjAsXG4gKiAgICAgcmFkaXVzOiA1XG4gKiB9KTtcbiAqIGBgYFxuICoqL1xuUGh5c2ljcy5nZW9tZXRyeSgnY2lyY2xlJywgZnVuY3Rpb24oIHBhcmVudCApe1xuXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuXG4gICAgICAgIHJhZGl1czogMS4wXG4gICAgfTtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgLy8gY2FsbCBwYXJlbnQgaW5pdCBtZXRob2RcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0cyggZGVmYXVsdHMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkNoYW5nZShmdW5jdGlvbiggb3B0cyApe1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaXVzID0gb3B0cy5yYWRpdXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyggb3B0aW9ucyApO1xuXG4gICAgICAgICAgICB0aGlzLl9hYWJiID0gUGh5c2ljcy5hYWJiKCk7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHRoaXMub3B0aW9ucy5yYWRpdXM7XG4gICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGFhYmI6IGZ1bmN0aW9uKCBhbmdsZSApe1xuXG4gICAgICAgICAgICB2YXIgciA9IHRoaXMucmFkaXVzXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAvLyBjaXJjbGVzIGFyZSBzeW1ldHJpYy4uLiBzbyBhbmdsZSBoYXMgbm8gZWZmZWN0XG4gICAgICAgICAgICBpZiAoIHRoaXMuX2FhYmIuaHcgIT09IHIgKXtcbiAgICAgICAgICAgICAgICAvLyByZWNhbGN1bGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMuX2FhYmIgPSBQaHlzaWNzLmFhYmIoIC1yLCAtciwgciwgciApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUGh5c2ljcy5hYWJiLmNsb25lKCB0aGlzLl9hYWJiICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgZ2V0RmFydGhlc3RIdWxsUG9pbnQ6IGZ1bmN0aW9uKCBkaXIsIHJlc3VsdCApe1xuXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgbmV3IFBoeXNpY3MudmVjdG9yKCk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuY2xvbmUoIGRpciApLm5vcm1hbGl6ZSgpLm11bHQoIHRoaXMucmFkaXVzICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgZ2V0RmFydGhlc3RDb3JlUG9pbnQ6IGZ1bmN0aW9uKCBkaXIsIHJlc3VsdCwgbWFyZ2luICl7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBuZXcgUGh5c2ljcy52ZWN0b3IoKTtcblxuICAgICAgICAgICAgLy8gd2UgY2FuIHVzZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgYXMgdGhlIGNvcmUgb2JqZWN0XG4gICAgICAgICAgICAvLyBiZWNhdXNlIHdlIGNhbiBwcm9qZWN0IGEgcG9pbnQgdG8gdGhlIGh1bGwgaW4gYW55IGRpcmVjdGlvblxuICAgICAgICAgICAgLy8gLi4uIHlheSBjaXJjbGVzIVxuICAgICAgICAgICAgLy8gYnV0IHNpbmNlIHRoZSBjYWxsZXIgaXMgZXhwZWN0aW5nIGEgY2VydGFpbiBtYXJnaW4uLi4gZ2l2ZSBpdFxuICAgICAgICAgICAgLy8gdG8gdGhlbVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5jbG9uZSggZGlyICkubm9ybWFsaXplKCkubXVsdCggdGhpcy5yYWRpdXMgLSBtYXJnaW4gKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2dlb21ldHJpZXMvY29tcG91bmQuanNcblxuLyoqXG4gKiBjbGFzcyBDb21wb3VuZEdlb21ldHJ5IDwgR2VvbWV0cnlcbiAqXG4gKiBQaHlzaWNzLmdlb21ldHJ5KCdjb21wb3VuZCcpXG4gKlxuICogR2VvbWV0cnkgZm9yIGNvbXBvdW5kIHNoYXBlcy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHZhciB0aGluZyA9IFBoeXNpY3MuZ2VvbWV0cnkoJ2NvbXBvdW5kJyk7XG4gKiB0aGluZy5hZGRDaGlsZCggY2hpbGQsIHBvcywgcm90YXRpb24gKTtcbiAqIGBgYFxuICoqL1xuUGh5c2ljcy5nZW9tZXRyeSgnY29tcG91bmQnLCBmdW5jdGlvbiggcGFyZW50ICl7XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBpbml0OiBmdW5jdGlvbiggb3B0aW9ucyApe1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIGNhbGwgcGFyZW50IGluaXQgbWV0aG9kXG4gICAgICAgICAgICBwYXJlbnQuaW5pdC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZGVmYXVsdHMoIGRlZmF1bHRzICk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMoIG9wdGlvbnMgKTtcblxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wb3VuZEdlb21ldHJ5I2FkZENoaWxkKCBnZW9tZXRyeSwgcG9zICkgLT4gdGhpc1xuICAgICAgICAgKiAtIGdlb21ldHJ5IChHZW9tZXRyeSk6IFRoZSBjaGlsZCB0byBhZGQuXG4gICAgICAgICAqIC0gcG9zIChQaHlzaWNzLnZlY3Rvcik6IFRoZSBwb3NpdGlvbiB0byBhZGQgdGhlIGNoaWxkIGF0LlxuICAgICAgICAgKiAtIGFuZ2xlIChOdW1iZXIpOiBUaGUgcm90YXRpb24gYW5nbGVcbiAgICAgICAgICpcbiAgICAgICAgICogQWRkIGEgY2hpbGQgYXQgcmVsYXRpdmUgcG9zaXRpb24uXG4gICAgICAgICAqKi9cbiAgICAgICAgYWRkQ2hpbGQ6IGZ1bmN0aW9uKCBnZW9tZXRyeSwgcG9zLCBhbmdsZSApe1xuXG4gICAgICAgICAgICB0aGlzLl9hYWJiID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICAgICAgZzogZ2VvbWV0cnlcbiAgICAgICAgICAgICAgICAscG9zOiBuZXcgUGh5c2ljcy52ZWN0b3IoIHBvcyApXG4gICAgICAgICAgICAgICAgLGFuZ2xlOiBhbmdsZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wb3VuZEdlb21ldHJ5I2NsZWFyKCkgLT4gdGhpc1xuICAgICAgICAgKlxuICAgICAgICAgKiBSZW1vdmUgYWxsIGNoaWxkcmVuLlxuICAgICAgICAgKiovXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB0aGlzLl9hYWJiID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgYWFiYjogZnVuY3Rpb24oIGFuZ2xlICl7XG5cbiAgICAgICAgICAgIGlmICghYW5nbGUgJiYgdGhpcy5fYWFiYil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBoeXNpY3MuYWFiYi5jbG9uZSggdGhpcy5fYWFiYiApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYlxuICAgICAgICAgICAgICAgICxhYWJiXG4gICAgICAgICAgICAgICAgLGNoXG4gICAgICAgICAgICAgICAgLHJldFxuICAgICAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAscG9zID0gUGh5c2ljcy52ZWN0b3IoKVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSB8fCAwO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBjaCA9IHRoaXMuY2hpbGRyZW5bIGkgXTtcbiAgICAgICAgICAgICAgICAvLyB0aGUgYWFiYiByb3RhdGVkIGJ5IG92ZXJhbGwgYW5nbGUgYW5kIHRoZSBjaGlsZCByb3RhdGlvblxuICAgICAgICAgICAgICAgIGFhYmIgPSBjaC5nLmFhYmIoIGFuZ2xlICsgY2guYW5nbGUgKTtcbiAgICAgICAgICAgICAgICBwb3MuY2xvbmUoIGNoLnBvcyApO1xuICAgICAgICAgICAgICAgIGlmICggYW5nbGUgKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjaGlsZCdzIHBvc2l0aW9uIHJvdGF0ZWQgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgIHBvcy5yb3RhdGUoIGFuZ2xlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIG1vdmUgdGhlIGFhYmIgdG8gdGhlIGNoaWxkJ3MgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBhYWJiLnggKz0gcG9zLl9bMF07XG4gICAgICAgICAgICAgICAgYWFiYi55ICs9IHBvcy5fWzFdO1xuICAgICAgICAgICAgICAgIHJldCA9IHJldCA/IFBoeXNpY3MuYWFiYi51bmlvbihyZXQsIGFhYmIsIHRydWUpIDogYWFiYjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCAhYW5nbGUgKXtcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFuIGFuZ2xlIHNwZWNpZmllZCAob3IgaXQncyB6ZXJvKVxuICAgICAgICAgICAgICAgIC8vIHRoZW4gd2UgY2FuIGNhY2hlIHRoaXMgcmVzdWx0XG4gICAgICAgICAgICAgICAgdGhpcy5fYWFiYiA9IFBoeXNpY3MuYWFiYi5jbG9uZSggcmV0ICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzY3JhdGNoLmRvbmUoIHJldCApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIC8vIE5PVEU6IHVubGlrZSBvdGhlciBnZW9tZXRyaWVzIHRoaXMgY2FuJ3QgYmUgdXNlZCBpbiB0aGVcbiAgICAgICAgLy8gR0pLIGFsZ29yaXRobSBiZWNhdXNlIHRoZSBzaGFwZSBpc24ndCBnYXJhbnRlZWQgdG8gYmUgY29udmV4XG4gICAgICAgIGdldEZhcnRoZXN0SHVsbFBvaW50OiBmdW5jdGlvbiggZGlyLCByZXN1bHQgKXtcblxuICAgICAgICAgICAgdmFyIGNoXG4gICAgICAgICAgICAgICAgLGlcbiAgICAgICAgICAgICAgICAsbCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoXG4gICAgICAgICAgICAgICAgLHNjcmF0Y2ggPSBQaHlzaWNzLnNjcmF0Y2hwYWQoKVxuICAgICAgICAgICAgICAgICx2ID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgICAgICxsZW4gPSAwXG4gICAgICAgICAgICAgICAgLG1heGxlbiA9IDBcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBuZXcgUGh5c2ljcy52ZWN0b3IoKTtcblxuICAgICAgICAgICAgLy8gZmluZCB0aGUgb25lIHdpdGggdGhlIGxhcmdlc3QgcHJvamVjdGlvbiBhbG9uZyBkaXJcbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGNoID0gdGhpcy5jaGlsZHJlblsgaSBdO1xuICAgICAgICAgICAgICAgIGNoLmcuZ2V0RmFydGhlc3RIdWxsUG9pbnQoIGRpci5yb3RhdGUoLWNoLmFuZ2xlKSwgdiApO1xuICAgICAgICAgICAgICAgIGxlbiA9IHYucm90YXRlKGNoLmFuZ2xlKS52YWRkKCBjaC5wb3MgKS5wcm9qKCBkaXIucm90YXRlKGNoLmFuZ2xlKSApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBsZW4gPiBtYXhsZW4gKXtcbiAgICAgICAgICAgICAgICAgICAgbWF4bGVuID0gbGVuO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3dhcCggdiApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNjcmF0Y2guZG9uZSggcmVzdWx0ICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgLy8gTk9URTogdW5saWtlIG90aGVyIGdlb21ldHJpZXMgdGhpcyBjYW4ndCBiZSB1c2VkIGluIHRoZVxuICAgICAgICAvLyBHSksgYWxnb3JpdGhtIGJlY2F1c2UgdGhlIHNoYXBlIGlzbid0IGdhcmFudGVlZCB0byBiZSBjb252ZXhcbiAgICAgICAgZ2V0RmFydGhlc3RDb3JlUG9pbnQ6IGZ1bmN0aW9uKCBkaXIsIHJlc3VsdCwgbWFyZ2luICl7XG5cbiAgICAgICAgICAgIHZhciBjaFxuICAgICAgICAgICAgICAgICxpXG4gICAgICAgICAgICAgICAgLGwgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aFxuICAgICAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAsdiA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICAgICAsbGVuID0gMFxuICAgICAgICAgICAgICAgICxtYXhsZW4gPSAwXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgbmV3IFBoeXNpY3MudmVjdG9yKCk7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIG9uZSB3aXRoIHRoZSBsYXJnZXN0IHByb2plY3Rpb24gYWxvbmcgZGlyXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBjaCA9IHRoaXMuY2hpbGRyZW5bIGkgXTtcbiAgICAgICAgICAgICAgICBjaC5nLmdldEZhcnRoZXN0Q29yZVBvaW50KGRpci5yb3RhdGUoLWNoLmFuZ2xlKSwgdiwgbWFyZ2luICk7XG4gICAgICAgICAgICAgICAgbGVuID0gdi5yb3RhdGUoY2guYW5nbGUpLnZhZGQoIGNoLnBvcyApLnByb2ooIGRpci5yb3RhdGUoY2guYW5nbGUpICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGxlbiA+IG1heGxlbiApe1xuICAgICAgICAgICAgICAgICAgICBtYXhsZW4gPSBsZW47XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zd2FwKCB2ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2NyYXRjaC5kb25lKCByZXN1bHQgKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2dlb21ldHJpZXMvY29udmV4LXBvbHlnb24uanNcblxuLyoqXG4gKiBjbGFzcyBDb252ZXhQb2x5Z29uR2VvbWV0cnkgPCBHZW9tZXRyeVxuICpcbiAqIFBoeXNpY3MuZ2VvbWV0cnkoJ2NvbnZleC1wb2x5Z29uJylcbiAqXG4gKiBHZW9tZXRyeSBmb3IgY29udmV4IHBvbHlnb25zLlxuICpcbiAqIEFkZGl0aW9uYWwgY29uZmlnIG9wdGlvbnM6XG4gKlxuICogLSB2ZXJ0aWNlczogQXJyYXkgb2YgW1tWZWN0b3Jpc2hdXSBvYmplY3RzIHJlcHJlc2VudGluZyB0aGUgcG9seWdvbiB2ZXJ0aWNlcyBpbiBjbG9ja3dpc2UgKG9yIGNvdW50ZXJjbG9ja3dpc2UpIG9yZGVyLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIHBlbnRhZ29uID0gUGh5c2ljcy5nZW9tZXRyeSgnY29udmV4LXBvbHlnb24nLCB7XG4gKiAgICAgLy8gdGhlIGNlbnRyb2lkIGlzIGF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlZCBhbmQgdXNlZCB0byBwb3NpdGlvbiB0aGUgc2hhcGVcbiAqICAgICB2ZXJ0aWNlczogW1xuICogICAgICAgICB7IHg6IDAsIHk6IC0zMCB9LFxuICogICAgICAgICB7IHg6IC0yOSwgeTogLTkgfSxcbiAqICAgICAgICAgeyB4OiAtMTgsIHk6IDI0IH0sXG4gKiAgICAgICAgIHsgeDogMTgsIHk6IDI0IH0sXG4gKiAgICAgICAgIHsgeDogMjksIHk6IC05IH1cbiAqICAgICBdXG4gKiB9KTtcbiAqIGBgYFxuICoqL1xuUGh5c2ljcy5nZW9tZXRyeSgnY29udmV4LXBvbHlnb24nLCBmdW5jdGlvbiggcGFyZW50ICl7XG5cbiAgICB2YXIgRVJST1JfTk9UX0NPTlZFWCA9ICdFcnJvcjogVGhlIHZlcnRpY2VzIHNwZWNpZmllZCBkbyBub3QgbWF0Y2ggdGhhdCBvZiBhIF9jb252ZXhfIHBvbHlnb24uJztcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcblxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgLy8gY2FsbCBwYXJlbnQgaW5pdCBtZXRob2RcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0cyggZGVmYXVsdHMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkNoYW5nZShmdW5jdGlvbiggb3B0cyApe1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0VmVydGljZXMoIG9wdHMudmVydGljZXMgfHwgW10gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zKCBvcHRpb25zICk7XG5cbiAgICAgICAgICAgIHNlbGYuc2V0VmVydGljZXMoIHRoaXMub3B0aW9ucy52ZXJ0aWNlcyB8fCBbXSApO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZleFBvbHlnb25HZW9tZXRyeSNzZXRWZXJ0aWNlcyggaHVsbCApIC0+IHRoaXNcbiAgICAgICAgICogLSBodWxsIChBcnJheSk6IFZlcnRpY2VzIHJlcHJlc2VudGVkIGJ5IGFuIGFycmF5IG9mIFtbVmVjdG9yaXNoXV0gb2JqZWN0cywgaW4gZWl0aGVyIGNsb2Nrd2lzZSBvciBjb3VudGVyY2xvY2t3aXNlIG9yZGVyXG4gICAgICAgICAqXG4gICAgICAgICAqIFNldCB0aGUgdmVydGljZXMgb2YgdGhpcyBwb2x5Z29uLlxuICAgICAgICAgKiovXG4gICAgICAgIHNldFZlcnRpY2VzOiBmdW5jdGlvbiggaHVsbCApe1xuXG4gICAgICAgICAgICB2YXIgc2NyYXRjaCA9IFBoeXNpY3Muc2NyYXRjaHBhZCgpXG4gICAgICAgICAgICAgICAgLHRyYW5zbCA9IHNjcmF0Y2gudHJhbnNmb3JtKClcbiAgICAgICAgICAgICAgICAsdmVydHMgPSB0aGlzLnZlcnRpY2VzID0gW11cbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGlmICggIVBoeXNpY3MuZ2VvbWV0cnkuaXNQb2x5Z29uQ29udmV4KCBodWxsICkgKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBFUlJPUl9OT1RfQ09OVkVYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0cmFuc2wuc2V0Um90YXRpb24oIDAgKTtcbiAgICAgICAgICAgIHRyYW5zbC5zZXRUcmFuc2xhdGlvbiggUGh5c2ljcy5nZW9tZXRyeS5nZXRQb2x5Z29uQ2VudHJvaWQoIGh1bGwgKS5uZWdhdGUoKSApO1xuXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgZWFjaCB2ZXJ0ZXggc28gdGhhdCB0aGUgY2VudHJvaWQgaXMgYXQgdGhlIG9yaWdpblxuICAgICAgICAgICAgLy8gdGhlbiBhZGQgdGhlIHZlcnRleCBhcyBhIHZlY3RvciB0byB0aGlzLnZlcnRpY2VzXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBodWxsLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgdmVydHMucHVzaCggbmV3IFBoeXNpY3MudmVjdG9yKCBodWxsWyBpIF0gKS50cmFuc2xhdGUoIHRyYW5zbCApICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2FyZWEgPSBQaHlzaWNzLmdlb21ldHJ5LmdldFBvbHlnb25BcmVhKCB2ZXJ0cyApO1xuICAgICAgICAgICAgdGhpcy5fYWFiYiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHNjcmF0Y2guZG9uZSh0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBhYWJiOiBmdW5jdGlvbiggYW5nbGUgKXtcblxuICAgICAgICAgICAgaWYgKCFhbmdsZSAmJiB0aGlzLl9hYWJiKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gUGh5c2ljcy5hYWJiLmNsb25lKCB0aGlzLl9hYWJiICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAscCA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICAgICAsdHJhbnMgPSBzY3JhdGNoLnRyYW5zZm9ybSgpLnNldFJvdGF0aW9uKCBhbmdsZSB8fCAwIClcbiAgICAgICAgICAgICAgICAseGF4aXMgPSBzY3JhdGNoLnZlY3RvcigpLnNldCggMSwgMCApLnJvdGF0ZUludiggdHJhbnMgKVxuICAgICAgICAgICAgICAgICx5YXhpcyA9IHNjcmF0Y2gudmVjdG9yKCkuc2V0KCAwLCAxICkucm90YXRlSW52KCB0cmFucyApXG4gICAgICAgICAgICAgICAgLHhtYXggPSB0aGlzLmdldEZhcnRoZXN0SHVsbFBvaW50KCB4YXhpcywgcCApLnByb2ooIHhheGlzIClcbiAgICAgICAgICAgICAgICAseG1pbiA9IC0gdGhpcy5nZXRGYXJ0aGVzdEh1bGxQb2ludCggeGF4aXMubmVnYXRlKCksIHAgKS5wcm9qKCB4YXhpcyApXG4gICAgICAgICAgICAgICAgLHltYXggPSB0aGlzLmdldEZhcnRoZXN0SHVsbFBvaW50KCB5YXhpcywgcCApLnByb2ooIHlheGlzIClcbiAgICAgICAgICAgICAgICAseW1pbiA9IC0gdGhpcy5nZXRGYXJ0aGVzdEh1bGxQb2ludCggeWF4aXMubmVnYXRlKCksIHAgKS5wcm9qKCB5YXhpcyApXG4gICAgICAgICAgICAgICAgLGFhYmJcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGFhYmIgPSBQaHlzaWNzLmFhYmIoIHhtaW4sIHltaW4sIHhtYXgsIHltYXggKTtcblxuICAgICAgICAgICAgaWYgKCFhbmdsZSl7XG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhbiBhbmdsZSBzcGVjaWZpZWQgKG9yIGl0J3MgemVybylcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHdlIGNhbiBjYWNoZSB0aGlzIHJlc3VsdFxuICAgICAgICAgICAgICAgIHRoaXMuX2FhYmIgPSBQaHlzaWNzLmFhYmIuY2xvbmUoIGFhYmIgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgICAgICByZXR1cm4gYWFiYjtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBnZXRGYXJ0aGVzdEh1bGxQb2ludDogZnVuY3Rpb24oIGRpciwgcmVzdWx0LCBkYXRhICl7XG5cbiAgICAgICAgICAgIHZhciB2ZXJ0cyA9IHRoaXMudmVydGljZXNcbiAgICAgICAgICAgICAgICAsdmFsXG4gICAgICAgICAgICAgICAgLHByZXZcbiAgICAgICAgICAgICAgICAsbCA9IHZlcnRzLmxlbmd0aFxuICAgICAgICAgICAgICAgICxpID0gMlxuICAgICAgICAgICAgICAgICxpZHhcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBuZXcgUGh5c2ljcy52ZWN0b3IoKTtcblxuICAgICAgICAgICAgaWYgKCBsIDwgMiApe1xuICAgICAgICAgICAgICAgIGlmICggZGF0YSApe1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmlkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuY2xvbmUoIHZlcnRzWzBdICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZXYgPSB2ZXJ0c1sgMCBdLmRvdCggZGlyICk7XG4gICAgICAgICAgICB2YWwgPSB2ZXJ0c1sgMSBdLmRvdCggZGlyICk7XG5cbiAgICAgICAgICAgIGlmICggbCA9PT0gMiApe1xuICAgICAgICAgICAgICAgIGlkeCA9ICh2YWwgPj0gcHJldikgPyAxIDogMDtcbiAgICAgICAgICAgICAgICBpZiAoIGRhdGEgKXtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5pZHggPSBpZHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuY2xvbmUoIHZlcnRzWyBpZHggXSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHZhbCA+PSBwcmV2ICl7XG4gICAgICAgICAgICAgICAgLy8gZ28gdXBcbiAgICAgICAgICAgICAgICAvLyBzZWFyY2ggdW50aWwgdGhlIG5leHQgZG90IHByb2R1Y3RcbiAgICAgICAgICAgICAgICAvLyBpcyBsZXNzIHRoYW4gdGhlIHByZXZpb3VzXG4gICAgICAgICAgICAgICAgd2hpbGUgKCBpIDwgbCAmJiB2YWwgPj0gcHJldiApe1xuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2ZXJ0c1sgaSBdLmRvdCggZGlyICk7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsID49IHByZXYpe1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBwcmV2aW91cyAoZnVydGhlc3Qgd2l0aCBsYXJnZXN0IGRvdCBwcm9kdWN0KVxuICAgICAgICAgICAgICAgIGlkeCA9IGkgLSAyO1xuICAgICAgICAgICAgICAgIGlmICggZGF0YSApe1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmlkeCA9IGkgLSAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmNsb25lKCB2ZXJ0c1sgaWR4IF0gKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBnbyBkb3duXG5cbiAgICAgICAgICAgICAgICBpID0gbDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoIGkgPiAxICYmIHByZXYgPj0gdmFsICl7XG4gICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gcHJldjtcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IHZlcnRzWyBpIF0uZG90KCBkaXIgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHByZXZpb3VzIChmdXJ0aGVzdCB3aXRoIGxhcmdlc3QgZG90IHByb2R1Y3QpXG4gICAgICAgICAgICAgICAgaWR4ID0gKGkgKyAxKSAlIGw7XG4gICAgICAgICAgICAgICAgaWYgKCBkYXRhICl7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaWR4ID0gaWR4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmNsb25lKCB2ZXJ0c1sgaWR4IF0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBnZXRGYXJ0aGVzdENvcmVQb2ludDogZnVuY3Rpb24oIGRpciwgcmVzdWx0LCBtYXJnaW4gKXtcblxuICAgICAgICAgICAgdmFyIG5vcm1cbiAgICAgICAgICAgICAgICAsc2NyYXRjaCA9IFBoeXNpY3Muc2NyYXRjaHBhZCgpXG4gICAgICAgICAgICAgICAgLG5leHQgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICAgICAgICAgLHByZXYgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICAgICAgICAgLHZlcnRzID0gdGhpcy52ZXJ0aWNlc1xuICAgICAgICAgICAgICAgICxsID0gdmVydHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgLG1hZ1xuICAgICAgICAgICAgICAgICxzaWduID0gdGhpcy5fYXJlYSA+IDBcbiAgICAgICAgICAgICAgICAsZGF0YSA9IHt9XG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmdldEZhcnRoZXN0SHVsbFBvaW50KCBkaXIsIHJlc3VsdCwgZGF0YSApO1xuXG4gICAgICAgICAgICAvLyBnZXQgbm9ybWFsaXplZCBkaXJlY3Rpb25zIHRvIG5leHQgYW5kIHByZXZpb3VzIHZlcnRpY2VzXG4gICAgICAgICAgICBuZXh0LmNsb25lKCB2ZXJ0c1sgKGRhdGEuaWR4ICsgMSkgJSBsIF0gKS52c3ViKCByZXN1bHQgKS5ub3JtYWxpemUoKS5wZXJwKCBzaWduICk7XG4gICAgICAgICAgICBwcmV2LmNsb25lKCB2ZXJ0c1sgKGRhdGEuaWR4IC0gMSArIGwpICUgbCBdICkudnN1YiggcmVzdWx0ICkubm9ybWFsaXplKCkucGVycCggIXNpZ24gKTtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBtYWduaXR1ZGUgb2YgYSB2ZWN0b3IgZnJvbSB0aGUgcmVzdWx0IHZlcnRleFxuICAgICAgICAgICAgLy8gdGhhdCBzcGxpdHMgZG93biB0aGUgbWlkZGxlXG4gICAgICAgICAgICAvLyBjcmVhdGluZyBhIG1hcmdpbiBvZiBcIm1cIiB0byBlYWNoIGVkZ2VcbiAgICAgICAgICAgIG1hZyA9IG1hcmdpbiAvICgxICsgbmV4dC5kb3QocHJldikpO1xuXG4gICAgICAgICAgICByZXN1bHQudmFkZCggbmV4dC52YWRkKCBwcmV2ICkubXVsdCggbWFnICkgKTtcbiAgICAgICAgICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2dlb21ldHJpZXMvcmVjdGFuZ2xlLmpzXG5cbi8qKlxuICogY2xhc3MgUmVjdGFuZ2xlR2VvbWV0cnkgPCBHZW9tZXRyeVxuICpcbiAqIFBoeXNpY3MuZ2VvbWV0cnkoJ3JlY3RhbmdsZScpXG4gKlxuICogR2VvbWV0cnkgZm9yIHJlY3RhbmdsZXMuXG4gKlxuICogQWRkaXRpb25hbCBjb25maWcgb3B0aW9uczpcbiAqXG4gKiAtIHdpZHRoOiBUaGUgd2lkdGhcbiAqIC0gaGVpZ2h0OiBUaGUgaGVpZ2h0XG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgcmVjdEdlbyA9IFBoeXNpY3MuZ2VvbWV0cnkoJ3JlY3RhbmdsZScsIHtcbiAqICAgICB3aWR0aDogMzAsXG4gKiAgICAgaGVpZ2h0OiA0MFxuICogfSk7XG4gKiBgYGBcbiAqKi9cblBoeXNpY3MuZ2VvbWV0cnkoJ3JlY3RhbmdsZScsIGZ1bmN0aW9uKCBwYXJlbnQgKXtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcblxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgLy8gY2FsbCBwYXJlbnQgaW5pdCBtZXRob2RcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0cyggZGVmYXVsdHMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkNoYW5nZShmdW5jdGlvbiggb3B0cyApe1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJlY3RhbmdsZUdlb21ldHJ5I3dpZHRoID0gTnVtYmVyXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiBUaGUgd2lkdGhcbiAgICAgICAgICAgICAgICAgKiovXG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aCA9IHNlbGYub3B0aW9ucy53aWR0aCB8fCAxO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJlY3RhbmdsZUdlb21ldHJ5I2hlaWdodCA9IE51bWJlclxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogVGhlIGhlaWdodFxuICAgICAgICAgICAgICAgICAqKi9cbiAgICAgICAgICAgICAgICBzZWxmLmhlaWdodCA9IHNlbGYub3B0aW9ucy5oZWlnaHQgfHwgMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zKCBvcHRpb25zICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgYWFiYjogZnVuY3Rpb24oIGFuZ2xlICl7XG5cbiAgICAgICAgICAgIGlmICghYW5nbGUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBQaHlzaWNzLmFhYmIoIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAscCA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICAgICAsdHJhbnMgPSBzY3JhdGNoLnRyYW5zZm9ybSgpLnNldFJvdGF0aW9uKCBhbmdsZSB8fCAwIClcbiAgICAgICAgICAgICAgICAseGF4aXMgPSBzY3JhdGNoLnZlY3RvcigpLnNldCggMSwgMCApLnJvdGF0ZUludiggdHJhbnMgKVxuICAgICAgICAgICAgICAgICx5YXhpcyA9IHNjcmF0Y2gudmVjdG9yKCkuc2V0KCAwLCAxICkucm90YXRlSW52KCB0cmFucyApXG4gICAgICAgICAgICAgICAgLHhtYXggPSB0aGlzLmdldEZhcnRoZXN0SHVsbFBvaW50KCB4YXhpcywgcCApLnByb2ooIHhheGlzIClcbiAgICAgICAgICAgICAgICAseG1pbiA9IC0gdGhpcy5nZXRGYXJ0aGVzdEh1bGxQb2ludCggeGF4aXMubmVnYXRlKCksIHAgKS5wcm9qKCB4YXhpcyApXG4gICAgICAgICAgICAgICAgLHltYXggPSB0aGlzLmdldEZhcnRoZXN0SHVsbFBvaW50KCB5YXhpcywgcCApLnByb2ooIHlheGlzIClcbiAgICAgICAgICAgICAgICAseW1pbiA9IC0gdGhpcy5nZXRGYXJ0aGVzdEh1bGxQb2ludCggeWF4aXMubmVnYXRlKCksIHAgKS5wcm9qKCB5YXhpcyApXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBzY3JhdGNoLmRvbmUoKTtcbiAgICAgICAgICAgIHJldHVybiBQaHlzaWNzLmFhYmIoIHhtaW4sIHltaW4sIHhtYXgsIHltYXggKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBnZXRGYXJ0aGVzdEh1bGxQb2ludDogZnVuY3Rpb24oIGRpciwgcmVzdWx0ICl7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBuZXcgUGh5c2ljcy52ZWN0b3IoKTtcblxuICAgICAgICAgICAgdmFyIHggPSBkaXIueFxuICAgICAgICAgICAgICAgICx5ID0gZGlyLnlcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHggPSB4ID09PSAwID8gMCA6IHggPCAwID8gLXRoaXMud2lkdGggKiAwLjUgOiB0aGlzLndpZHRoICogMC41O1xuICAgICAgICAgICAgeSA9IHkgPT09IDAgPyAwIDogeSA8IDAgPyAtdGhpcy5oZWlnaHQgKiAwLjUgOiB0aGlzLmhlaWdodCAqIDAuNTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zZXQoIHgsIHkgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBnZXRGYXJ0aGVzdENvcmVQb2ludDogZnVuY3Rpb24oIGRpciwgcmVzdWx0LCBtYXJnaW4gKXtcblxuICAgICAgICAgICAgdmFyIHgsIHk7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmdldEZhcnRoZXN0SHVsbFBvaW50KCBkaXIsIHJlc3VsdCApO1xuICAgICAgICAgICAgeCA9IHJlc3VsdC54O1xuICAgICAgICAgICAgeSA9IHJlc3VsdC55O1xuICAgICAgICAgICAgcmVzdWx0LnggPSB4ID09PSAwID8gMCA6IHggPCAwID8geCArIG1hcmdpbiA6IHggLSBtYXJnaW47XG4gICAgICAgICAgICByZXN1bHQueSA9IHkgPT09IDAgPyAwIDogeSA8IDAgPyB5ICsgbWFyZ2luIDogeSAtIG1hcmdpbjtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2JvZGllcy9jaXJjbGUuanNcblxuLypcbiAqIEByZXF1aXJlcyBnZW9tZXRyaWVzL2NpcmNsZVxuICovXG4vKiogXG4gKiBjbGFzcyBDaXJjbGVCb2R5IDwgQm9keVxuICpcbiAqIFBoeXNpY3MuYm9keSgnY2lyY2xlJylcbiAqXG4gKiBUaGUgY2lyY2xlIGJvZHkgaGFzIGEgY2lyY3VsYXIgc2hhcGUuXG4gKlxuICogQWRkaXRpb25hbCBvcHRpb25zIGluY2x1ZGU6XG4gKiAtIHJhZGl1czogdGhlIHJhZGl1c1xuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIHJvdW5kID0gUGh5c2ljcy5ib2R5KCdjaXJjbGUnLCB7XG4gKiAgICAgeDogMzAsXG4gKiAgICAgeTogMjAsXG4gKiAgICAgcmFkaXVzOiA1XG4gKiB9KTtcbiAqIGBgYFxuICoqL1xuUGh5c2ljcy5ib2R5KCdjaXJjbGUnLCBmdW5jdGlvbiggcGFyZW50ICl7XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIHJhZGl1czogMS4wXG4gICAgfTtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgLy8gY2FsbCBwYXJlbnQgaW5pdCBtZXRob2RcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIG9wdGlvbnMgPSBQaHlzaWNzLnV0aWwuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBQaHlzaWNzLmdlb21ldHJ5KCdjaXJjbGUnLCB7XG4gICAgICAgICAgICAgICAgcmFkaXVzOiBvcHRpb25zLnJhZGl1c1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVjYWxjKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgcmVjYWxjOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcGFyZW50LnJlY2FsYy5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLy8gbW9tZW50IG9mIGluZXJ0aWFcbiAgICAgICAgICAgIHRoaXMubW9pID0gdGhpcy5tYXNzICogdGhpcy5nZW9tZXRyeS5yYWRpdXMgKiB0aGlzLmdlb21ldHJ5LnJhZGl1cyAvIDI7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9ib2RpZXMvY29tcG91bmQuanNcblxuLypcbiAqIEByZXF1aXJlcyBnZW9tZXRyaWVzL2NvbXBvdW5kXG4gKi9cbiAvKipcbiAgKiBjbGFzcyBDb21wb3VuZEJvZHkgPCBCb2R5XG4gICpcbiAgKiBQaHlzaWNzLmJvZHkoJ2NvbXBvdW5kJylcbiAgKlxuICAqIE5vdCBhIGJvZHkgaW4gaXRzZWxmLiBJdCdzIGEgY29udGFpbmVyIHRvIGdyb3VwIG90aGVyIGJvZGllcy4gVGhlIHBvc2l0aW9uIG9mIHRoZSBib2R5IGlzIHRoZSBjZW50ZXIgb2YgbWFzcy5cbiAgKiBJdCBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGNoaWxkIGJlZm9yZSBiZWluZyBhZGRlZCB0byB0aGUgd29ybGQuXG4gICpcbiAgKiBBZGRpdGlvbmFsIGNvbmZpZyBvcHRpb25zOlxuICAqXG4gICogLSBjaGlsZHJlbjogQXJyYXkgb2YgW1tCb2R5XV0gb2JqZWN0cy5cbiAgKlxuICAqIEV4YW1wbGU6XG4gICpcbiAgKiBgYGBqYXZhc2NyaXB0XG4gICogdmFyIHRoaW5nID0gUGh5c2ljcy5ib2R5KCdjb21wb3VuZCcsIHtcbiAgKiAgICAgLy8gcGxhY2UgdGhlIGNlbnRlciBvZiBtYXNzIGF0ICgzMDAsIDIwMClcbiAgKiAgICAgeDogMzAwLFxuICAqICAgICB5OiAyMDAsXG4gICogICAgIC8vIHRoZSBjZW50ZXIgb2YgbWFzcyBpcyBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZWQgYW5kIHVzZWQgdG8gcG9zaXRpb24gdGhlIHNoYXBlXG4gICogICAgIGNoaWxkcmVuOiBbXG4gICogICAgICAgICBib2R5MSxcbiAgKiAgICAgICAgIGJvZHkyLFxuICAqICAgICAgICAgLy8gLi4uXG4gICogICAgIF1cbiAgKiB9KTtcbiAgKiBgYGBcbiAgKiovXG5QaHlzaWNzLmJvZHkoJ2NvbXBvdW5kJywgZnVuY3Rpb24oIHBhcmVudCApe1xuXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuXG4gICAgfTtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgLy8gY2FsbCBwYXJlbnQgaW5pdCBtZXRob2RcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHRoaXMubWFzcyA9IDA7XG4gICAgICAgICAgICB0aGlzLm1vaSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBQaHlzaWNzLmdlb21ldHJ5KCdjb21wb3VuZCcpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZHJlbiggb3B0aW9ucy5jaGlsZHJlbiApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGNvbm5lY3Q6IGZ1bmN0aW9uKCB3b3JsZCApe1xuICAgICAgICAgICAgLy8gc2FuaXR5IGNoZWNrXG4gICAgICAgICAgICBpZiAoIHRoaXMubWFzcyA8PSAwICl7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0NhbiBub3QgYWRkIGVtcHR5IGNvbXBvdW5kIGJvZHkgdG8gd29ybGQuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcG91bmRCb2R5I2FkZENoaWxkKCBib2R5ICkgLT4gdGhpc1xuICAgICAgICAgKiAtIGJvZHkgKEJvZHkpOiBUaGUgY2hpbGQgdG8gYWRkXG4gICAgICAgICAqXG4gICAgICAgICAqIEFkZCBhIGJvZHkgYXMgYSBjaGlsZC5cbiAgICAgICAgICoqL1xuICAgICAgICBhZGRDaGlsZDogZnVuY3Rpb24oIGJvZHkgKXtcblxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZHJlbihbIGJvZHkgXSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcG91bmRCb2R5I2FkZENoaWxkcmVuKCBib2RpZXMgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gYm9kaWVzIChBcnJheSk6IFRoZSBsaXN0IG9mIGNoaWxkcmVuIHRvIGFkZFxuICAgICAgICAgKlxuICAgICAgICAgKiBBZGQgYW4gYXJyYXkgb2YgY2hpbGRyZW4gdG8gdGhlIGNvbXBvdW5kLlxuICAgICAgICAgKiovXG4gICAgICAgIGFkZENoaWxkcmVuOiBmdW5jdGlvbiggYm9kaWVzICl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAsY29tID0gc2NyYXRjaC52ZWN0b3IoKS56ZXJvKClcbiAgICAgICAgICAgICAgICAsYlxuICAgICAgICAgICAgICAgICxwb3NcbiAgICAgICAgICAgICAgICAsaVxuICAgICAgICAgICAgICAgICxsID0gYm9kaWVzICYmIGJvZGllcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAsTSA9IDBcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGlmICggIWwgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NyYXRjaC5kb25lKCB0aGlzICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbDsgaSsrICl7XG4gICAgICAgICAgICAgICAgYiA9IGJvZGllc1sgaSBdO1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBib2R5IGZyb20gd29ybGQgaWYgYXBwbGljYWJsZVxuICAgICAgICAgICAgICAgIGlmICggYi5fd29ybGQgKXtcbiAgICAgICAgICAgICAgICAgICAgYi5fd29ybGQucmVtb3ZlKCBiICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGFkZCBjaGlsZFxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaCggYiApO1xuICAgICAgICAgICAgICAgIC8vIGFkZCBjaGlsZCB0byBnZW9tZXRyeVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VvbWV0cnkuYWRkQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGIuZ2VvbWV0cnksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQaHlzaWNzLnZlY3RvcihiLm9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yb3RhdGUoYi5zdGF0ZS5hbmd1bGFyLnBvcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC52YWRkKGIuc3RhdGUucG9zKSxcbiAgICAgICAgICAgICAgICAgICAgYi5zdGF0ZS5hbmd1bGFyLnBvc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgLy8gY2FsYyBjb20gY29udHJpYnV0aW9uXG4gICAgICAgICAgICAgICAgcG9zID0gYi5zdGF0ZS5wb3M7XG4gICAgICAgICAgICAgICAgY29tLmFkZCggcG9zLl9bMF0gKiBiLm1hc3MsIHBvcy5fWzFdICogYi5tYXNzICk7XG4gICAgICAgICAgICAgICAgTSArPSBiLm1hc3M7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBtYXNzXG4gICAgICAgICAgICB0aGlzLm1hc3MgKz0gTTtcbiAgICAgICAgICAgIC8vIGNvbSBhZGp1c3RtZW50IChhc3N1bWluZyBjb20gaXMgY3VycmVudGx5IGF0ICgwLDApIGJvZHkgY29vcmRzKVxuICAgICAgICAgICAgY29tLm11bHQoIDEgLyB0aGlzLm1hc3MgKTtcblxuICAgICAgICAgICAgLy8gc2hpZnQgdGhlIGNlbnRlciBvZiBtYXNzXG4gICAgICAgICAgICB0aGlzLm9mZnNldC52c3ViKCBjb20gKTtcblxuICAgICAgICAgICAgLy8gcmVmcmVzaCB2aWV3IG9uIG5leHQgcmVuZGVyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3dvcmxkICl7XG4gICAgICAgICAgICAgICAgdGhpcy5fd29ybGQub25lKCdyZW5kZXInLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZXcgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZWNhbGMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNjcmF0Y2guZG9uZSggdGhpcyApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wb3VuZEJvZHkjY2xlYXIoKSAtPiB0aGlzXG4gICAgICAgICAqXG4gICAgICAgICAqIFJlbW92ZSBhbGwgY2hpbGRyZW4uXG4gICAgICAgICAqKi9cbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHRoaXMuX2FhYmIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5tb2kgPSAwO1xuICAgICAgICAgICAgdGhpcy5tYXNzID0gMDtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0Lnplcm8oKTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZ2VvbWV0cnkuY2xlYXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXBvdW5kQm9keSNyZWZyZXNoR2VvbWV0cnkoKSAtPiB0aGlzXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHRoZSBjaGlsZHJlbidzIHBvc2l0aW9ucyBjaGFuZ2UsIGByZWZyZXNoR2VvbWV0cnkoKWAgc2hvdWxkIGJlIGNhbGxlZCB0byBmaXggdGhlIHNoYXBlLlxuICAgICAgICAgKiovXG4gICAgICAgIHJlZnJlc2hHZW9tZXRyeTogZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdGhpcy5nZW9tZXRyeS5jbGVhcigpO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGIsIGwgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBiID0gdGhpcy5jaGlsZHJlblsgaSBdO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VvbWV0cnkuYWRkQ2hpbGQoIGIuZ2VvbWV0cnksIG5ldyBQaHlzaWNzLnZlY3RvcihiLnN0YXRlLnBvcykudmFkZChiLm9mZnNldCksIGIuc3RhdGUuYW5ndWxhci5wb3MgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgcmVjYWxjOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICBwYXJlbnQucmVjYWxjLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAvLyBtb21lbnQgb2YgaW5lcnRpYVxuICAgICAgICAgICAgdmFyIGJcbiAgICAgICAgICAgICAgICAsbW9pID0gMFxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgZm9yICggdmFyIGkgPSAwLCBsID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgYiA9IHRoaXMuY2hpbGRyZW5bIGkgXTtcbiAgICAgICAgICAgICAgICBiLnJlY2FsYygpO1xuICAgICAgICAgICAgICAgIC8vIHBhcmFsbGVsIGF4aXMgdGhlb3JlbVxuICAgICAgICAgICAgICAgIG1vaSArPSBiLm1vaSArIGIubWFzcyAqIGIuc3RhdGUucG9zLm5vcm1TcSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1vaSA9IG1vaTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvYm9kaWVzL2NvbnZleC1wb2x5Z29uLmpzXG5cbi8qXG4gKiBAcmVxdWlyZXMgZ2VvbWV0cmllcy9jb252ZXgtcG9seWdvblxuICovXG4gLyoqXG4gICogY2xhc3MgQ29udmV4UG9seWdvbkJvZHkgPCBCb2R5XG4gICpcbiAgKiBQaHlzaWNzLmJvZHkoJ2NvbnZleC1wb2x5Z29uJylcbiAgKlxuICAqIEJvZHkgZm9yIGNvbnZleCBwb2x5Z29ucy4gVGhlIHBvc2l0aW9uIG9mIHRoZSBib2R5IGlzIHRoZSBjZW50cm9pZCBvZiB0aGUgcG9seWdvbi5cbiAgKlxuICAqIEFkZGl0aW9uYWwgY29uZmlnIG9wdGlvbnM6XG4gICpcbiAgKiAtIHZlcnRpY2VzOiBBcnJheSBvZiBbW1ZlY3RvcmlzaF1dIG9iamVjdHMgcmVwcmVzZW50aW5nIHRoZSBwb2x5Z29uIHZlcnRpY2VzIGluIGNsb2Nrd2lzZSAob3IgY291bnRlcmNsb2Nrd2lzZSkgb3JkZXIuXG4gICpcbiAgKiBFeGFtcGxlOlxuICAqXG4gICogYGBgamF2YXNjcmlwdFxuICAqIHZhciBwZW50YWdvbiA9IFBoeXNpY3MuYm9keSgnY29udmV4LXBvbHlnb24nLCB7XG4gICogICAgIC8vIHBsYWNlIHRoZSBjZW50cm9pZCBvZiB0aGUgcG9seWdvbiBhdCAoMzAwLCAyMDApXG4gICogICAgIHg6IDMwMCxcbiAgKiAgICAgeTogMjAwLFxuICAqICAgICAvLyB0aGUgY2VudHJvaWQgaXMgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkIGFuZCB1c2VkIHRvIHBvc2l0aW9uIHRoZSBzaGFwZVxuICAqICAgICB2ZXJ0aWNlczogW1xuICAqICAgICAgICAgeyB4OiAwLCB5OiAtMzAgfSxcbiAgKiAgICAgICAgIHsgeDogLTI5LCB5OiAtOSB9LFxuICAqICAgICAgICAgeyB4OiAtMTgsIHk6IDI0IH0sXG4gICogICAgICAgICB7IHg6IDE4LCB5OiAyNCB9LFxuICAqICAgICAgICAgeyB4OiAyOSwgeTogLTkgfVxuICAqICAgICBdXG4gICogfSk7XG4gICogYGBgXG4gICoqL1xuUGh5c2ljcy5ib2R5KCdjb252ZXgtcG9seWdvbicsIGZ1bmN0aW9uKCBwYXJlbnQgKXtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcblxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIC8vIGNhbGwgcGFyZW50IGluaXQgbWV0aG9kXG4gICAgICAgICAgICBwYXJlbnQuaW5pdC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICBvcHRpb25zID0gUGh5c2ljcy51dGlsLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB0aGlzLmdlb21ldHJ5ID0gUGh5c2ljcy5nZW9tZXRyeSgnY29udmV4LXBvbHlnb24nLCB7XG4gICAgICAgICAgICAgICAgdmVydGljZXM6IG9wdGlvbnMudmVydGljZXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnJlY2FsYygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIHJlY2FsYzogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHBhcmVudC5yZWNhbGMuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8vIG1vbWVudCBvZiBpbmVydGlhXG4gICAgICAgICAgICB0aGlzLm1vaSA9IFBoeXNpY3MuZ2VvbWV0cnkuZ2V0UG9seWdvbk1PSSggdGhpcy5nZW9tZXRyeS52ZXJ0aWNlcyApO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvYm9kaWVzL3JlY3RhbmdsZS5qc1xuXG4vKlxuICogQHJlcXVpcmVzIGdlb21ldHJpZXMvcmVjdGFuZ2xlXG4gKi9cbiAvKipcbiAgKiBjbGFzcyBSZWN0YW5nbGVCb2R5IDwgQm9keVxuICAqXG4gICogUGh5c2ljcy5ib2R5KCdyZWN0YW5nbGUnKVxuICAqXG4gICogQm9keSBmb3IgcmVjdGFuZ2xlcy4gVGhlIHBvc2l0aW9uIG9mIHRoZSBib2R5IGlzIHRoZSBjZW50cm9pZCBvZiB0aGUgcmVjdGFuZ2xlLlxuICAqXG4gICogQWRkaXRpb25hbCBjb25maWcgb3B0aW9uczpcbiAgKlxuICAqIC0gd2lkdGg6IFRoZSB3aWR0aFxuICAqIC0gaGVpZ2h0OiBUaGUgaGVpZ2h0XG4gICpcbiAgKiBFeGFtcGxlOlxuICAqXG4gICogYGBgamF2YXNjcmlwdFxuICAqIHZhciByZWN0ID0gUGh5c2ljcy5ib2R5KCdyZWN0YW5nbGUnLCB7XG4gICogICAgIC8vIHBsYWNlIHRoZSBjZW50cm9pZCBvZiB0aGUgcmVjdGFuZ2xlIGF0ICgzMDAsIDIwMClcbiAgKiAgICAgeDogMzAwLFxuICAqICAgICB5OiAyMDAsXG4gICogICAgIHdpZHRoOiAzMCxcbiAgKiAgICAgaGVpZ2h0OiA0MFxuICAqIH0pO1xuICAqIGBgYFxuICAqKi9cblBoeXNpY3MuYm9keSgncmVjdGFuZ2xlJywgZnVuY3Rpb24oIHBhcmVudCApe1xuXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuXG4gICAgfTtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgLy8gY2FsbCBwYXJlbnQgaW5pdCBtZXRob2RcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIG9wdGlvbnMgPSBQaHlzaWNzLnV0aWwuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBQaHlzaWNzLmdlb21ldHJ5KCdyZWN0YW5nbGUnLCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVjYWxjKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgcmVjYWxjOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHcgPSB0aGlzLmdlb21ldHJ5LndpZHRoO1xuICAgICAgICAgICAgdmFyIGggPSB0aGlzLmdlb21ldHJ5LmhlaWdodDtcbiAgICAgICAgICAgIHBhcmVudC5yZWNhbGMuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8vIG1vbWVudCBvZiBpbmVydGlhXG4gICAgICAgICAgICB0aGlzLm1vaSA9ICggdyp3ICsgaCpoICkgKiB0aGlzLm1hc3MgLyAxMjtcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2JlaGF2aW9ycy9hdHRyYWN0b3IuanNcblxuLyoqIFxuICogY2xhc3MgQXR0cmFjdG9yQmVoYXZpb3IgPCBCZWhhdmlvclxuICpcbiAqIGBQaHlzaWNzLmJlaGF2aW9yKCdhdHRyYWN0b3InKWAuXG4gKlxuICogQXR0cmFjdG9yIGJlaGF2aW9yIGF0dHJhY3RzIGJvZGllcyB0byBhIHNwZWNpZmljIHBvaW50LlxuICpcbiAqIEFkZGl0aW9uYWwgb3B0aW9ucyBpbmNsdWRlOlxuICogLSBwb3M6IFRoZSBwb3NpdGlvbiBvZiB0aGUgYXR0cmFjdGlvbiBwb2ludFxuICogLSBzdHJlbmd0aDogSG93IHN0cm9uZyB0aGUgYXR0cmFjdGlvbiBpcyAoZGVmYXVsdDogYDFgKVxuICogLSBvcmRlcjogVGhlIHBvd2VyIG9mIHRoZSBpbnZlcnNlIGRpc3RhbmNlIChkZWZhdWx0OiBgMmAgYmVjYXVzZSB0aGF0IGlzIG5ld3RvbmlhbiBncmF2aXR5Li4uIGludmVyc2Ugc3F1YXJlKVxuICogLSBtYXg6IFRoZSBtYXhpbXVtIGRpc3RhbmNlIGluIHdoaWNoIHRvIGFwcGx5IHRoZSBhdHRyYWN0aW9uIChkZWZhdWx0OiBJbmZpbml0eSlcbiAqIC0gbWluOiBUaGUgbWluaW11bSBkaXN0YW5jZSBhYm92ZSB3aGljaCB0byBhcHBseSB0aGUgYXR0cmFjdGlvbiAoZGVmYXVsdDogdmVyeSBzbWFsbCBub24temVybylcbiAqKi9cblBoeXNpY3MuYmVoYXZpb3IoJ2F0dHJhY3RvcicsIGZ1bmN0aW9uKCBwYXJlbnQgKXtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcblxuICAgICAgICBwb3M6IG51bGwsIC8vIGRlZmF1bHQgdG8gKDAsIDApXG4gICAgICAgIC8vIGhvdyBzdHJvbmcgdGhlIGF0dHJhY3Rpb24gaXNcbiAgICAgICAgc3RyZW5ndGg6IDEsXG4gICAgICAgIC8vIHBvd2VyIG9mIHRoZSBpbnZlcnNlIGRpc3RhbmNlICgyIGlzIGludmVyc2Ugc3F1YXJlKVxuICAgICAgICBvcmRlcjogMixcbiAgICAgICAgLy8gbWF4IGRpc3RhbmNlIHRvIGFwcGx5IGl0IHRvXG4gICAgICAgIG1heDogZmFsc2UsIC8vIGluZmluaXRlXG4gICAgICAgIC8vIG1pbiBkaXN0YW5jZSB0byBhcHBseSBpdCB0b1xuICAgICAgICBtaW46IGZhbHNlIC8vIGF1dG8gY2FsY1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuX3BvcyA9IG5ldyBQaHlzaWNzLnZlY3RvcigpO1xuICAgICAgICAgICAgLy8gY2FsbCBwYXJlbnQgaW5pdCBtZXRob2RcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwoIHRoaXMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0cyggZGVmYXVsdHMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkNoYW5nZShmdW5jdGlvbiggb3B0cyApe1xuICAgICAgICAgICAgICAgIHNlbGYuX21heERpc3QgPSBvcHRzLm1heCA9PT0gZmFsc2UgPyBJbmZpbml0eSA6IG9wdHMubWF4O1xuICAgICAgICAgICAgICAgIHNlbGYuX21pbkRpc3QgPSBvcHRzLm1pbiA/IG9wdHMubWluIDogMTA7XG4gICAgICAgICAgICAgICAgc2VsZi5wb3NpdGlvbiggb3B0cy5wb3MgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zKCBvcHRpb25zICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF0dHJhY3RvckJlaGF2aW9yI3Bvc2l0aW9uKCBbcG9zXSApIC0+IHRoaXN8T2JqZWN0XG4gICAgICAgICAqIC0gcG9zIChWZWN0b3Jpc2gpOiBUaGUgcG9zaXRpb24gdG8gc2V0XG4gICAgICAgICAqICsgKE9iamVjdCk6IFJldHVybnMgdGhlIFtbVmVjdG9yaXNoXV0gcG9zaXRpb24gaWYgbm8gYXJndW1lbnRzIHByb3ZpZGVkXG4gICAgICAgICAqICsgKHRoaXMpOiBGb3IgY2hhaW5pbmdcbiAgICAgICAgICpcbiAgICAgICAgICogR2V0IG9yIHNldCB0aGUgcG9zaXRpb24gb2YgdGhlIGF0dHJhY3Rvci5cbiAgICAgICAgICoqL1xuICAgICAgICBwb3NpdGlvbjogZnVuY3Rpb24oIHBvcyApe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICggcG9zICl7XG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zLmNsb25lKCBwb3MgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bvcy52YWx1ZXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGJlaGF2ZTogZnVuY3Rpb24oIGRhdGEgKXtcblxuICAgICAgICAgICAgdmFyIGJvZGllcyA9IHRoaXMuZ2V0VGFyZ2V0cygpXG4gICAgICAgICAgICAgICAgLGJvZHlcbiAgICAgICAgICAgICAgICAsb3JkZXIgPSB0aGlzLm9wdGlvbnMub3JkZXJcbiAgICAgICAgICAgICAgICAsc3RyZW5ndGggPSB0aGlzLm9wdGlvbnMuc3RyZW5ndGhcbiAgICAgICAgICAgICAgICAsbWluRGlzdCA9IHRoaXMuX21pbkRpc3RcbiAgICAgICAgICAgICAgICAsbWF4RGlzdCA9IHRoaXMuX21heERpc3RcbiAgICAgICAgICAgICAgICAsc2NyYXRjaCA9IFBoeXNpY3Muc2NyYXRjaHBhZCgpXG4gICAgICAgICAgICAgICAgLGFjYyA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICAgICAsbm9ybVxuICAgICAgICAgICAgICAgICxnXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaiA9IDAsIGwgPSBib2RpZXMubGVuZ3RoOyBqIDwgbDsgaisrICl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYm9keSA9IGJvZGllc1sgaiBdO1xuXG4gICAgICAgICAgICAgICAgLy8gY2xvbmUgdGhlIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgYWNjLmNsb25lKCB0aGlzLl9wb3MgKTtcbiAgICAgICAgICAgICAgICBhY2MudnN1YiggYm9keS5zdGF0ZS5wb3MgKTtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGRpc3RhbmNlXG4gICAgICAgICAgICAgICAgbm9ybSA9IGFjYy5ub3JtKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobm9ybSA+IG1pbkRpc3QgJiYgbm9ybSA8IG1heERpc3Qpe1xuXG4gICAgICAgICAgICAgICAgICAgIGcgPSBzdHJlbmd0aCAvIE1hdGgucG93KG5vcm0sIG9yZGVyKTtcblxuICAgICAgICAgICAgICAgICAgICBib2R5LmFjY2VsZXJhdGUoIGFjYy5ub3JtYWxpemUoKS5tdWx0KCBnICkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvYmVoYXZpb3JzL2JvZHktY29sbGlzaW9uLWRldGVjdGlvbi5qc1xuXG4vKipcbiAqIGNsYXNzIEJvZHlDb2xsaXNpb25EZXRlY3Rpb25CZWhhdmlvciA8IEJlaGF2aW9yXG4gKlxuICogYFBoeXNpY3MuYmVoYXZpb3IoJ2JvZHktY29sbGlzaW9uLWRldGVjdGlvbicpYC5cbiAqXG4gKiBEZXRlY3QgY29sbGlzaW9ucyBvZiBib2RpZXMuXG4gKlxuICogUHVibGlzaGVzIGNvbGxpc2lvbiBldmVudHMgdG8gdGhlIHdvcmxkIGFzIGEgZ3JvdXAgb2YgZGV0ZWN0ZWQgY29sbGlzaW9ucyBwZXIgaXRlcmF0aW9uLlxuICpcbiAqIFRoZSBldmVudCBkYXRhIHdpbGwgaGF2ZSBhIGAuY29sbGlzaW9uc2AgcHJvcGVydHkgdGhhdCBpcyBhbiBhcnJheSBvZiBjb2xsaXNpb25zIG9mIHRoZSBmb3JtOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHtcbiAqICAgICBib2R5QTogLy8gdGhlIGZpcnN0IGJvZHlcbiAqICAgICBib2R5QjogLy8gdGhlIHNlY29uZCBib2R5XG4gKiAgICAgbm9ybTogLy8gdGhlIG5vcm1hbCB2ZWN0b3IgKFZlY3RvcmlzaClcbiAqICAgICBtdHY6IC8vIHRoZSBtaW5pbXVtIHRyYW5zaXQgdmVjdG9yLiAodGhlIGRpcmVjdGlvbiBhbmQgbGVuZ3RoIG5lZWRlZCB0byBleHRyYWN0IGJvZHlCIGZyb20gYm9keUEpXG4gKiAgICAgcG9zOiAvLyB0aGUgY29sbGlzaW9uIHBvaW50IHJlbGF0aXZlIHRvIGJvZHlBXG4gKiAgICAgb3ZlcmxhcDogLy8gdGhlIGFtb3VudCBib2R5QSBvdmVybGFwcyBib2R5QlxuICogfVxuICogYGBgXG4gKlxuICogQWRkaXRpb25hbCBvcHRpb25zIGluY2x1ZGU6XG4gKiAtIGNoZWNrOiBjaGFubmVsIHRvIGxpc3RlbiB0byBmb3IgY29sbGlzaW9uIGNhbmRpZGF0ZXMgKGRlZmF1bHQ6IGBjb2xsaXNpb25zOmNhbmRpZGF0ZXNgKS4gc2V0IHRvIGB0cnVlYCB0byBmb3JjZSBjaGVjayBldmVyeSBwYWlyIG9mIGJvZGllcyBpbiB0aGUgd29ybGRcbiAqIC0gY2hhbm5lbDogY2hhbm5lbCB0byBwdWJsaXNoIGV2ZW50cyB0byAoZGVmYXVsdDogYGNvbGxpc2lvbnM6ZGV0ZWN0ZWRgKVxuICoqL1xuUGh5c2ljcy5iZWhhdmlvcignYm9keS1jb2xsaXNpb24tZGV0ZWN0aW9uJywgZnVuY3Rpb24oIHBhcmVudCApe1xuXG4gICAgdmFyIHN1cHBvcnRGblN0YWNrID0gW107XG5cbiAgICAvKlxuICAgICAqIGdldFN1cHBvcnRGbiggYm9keUEsIGJvZHlCICkgLT4gRnVuY3Rpb25cbiAgICAgKiAtIGJvZHlBIChPYmplY3QpOiBGaXJzdCBib2R5XG4gICAgICogLSBib2R5QiAoT2JqZWN0KTogU2Vjb25kIGJvZHlcbiAgICAgKiArIChGdW5jdGlvbik6IFRoZSBzdXBwb3J0IGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBHZXQgYSBnZW5lcmFsIHN1cHBvcnQgZnVuY3Rpb24gZm9yIHVzZSB3aXRoIEdKSyBhbGdvcml0aG1cbiAgICAgKi9cbiAgICB2YXIgZ2V0U3VwcG9ydEZuID0gZnVuY3Rpb24gZ2V0U3VwcG9ydEZuKCBib2R5QSwgYm9keUIgKXtcblxuICAgICAgICB2YXIgaGFzaCA9IFBoeXNpY3MudXRpbC5wYWlySGFzaCggYm9keUEudWlkLCBib2R5Qi51aWQgKVxuICAgICAgICAgICAgLGZuID0gc3VwcG9ydEZuU3RhY2tbIGhhc2ggXVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIGlmICggIWZuICl7XG4gICAgICAgICAgICBmbiA9IHN1cHBvcnRGblN0YWNrWyBoYXNoIF0gPSBmdW5jdGlvbiBwYWlyU3VwcG9ydEZ1bmN0aW9uKCBzZWFyY2hEaXIgKXtcblxuICAgICAgICAgICAgICAgIHZhciB0QSA9IGZuLnRBXG4gICAgICAgICAgICAgICAgICAgICx0QiA9IGZuLnRCXG4gICAgICAgICAgICAgICAgICAgICx2QSA9IGZuLnRtcHYxXG4gICAgICAgICAgICAgICAgICAgICx2QiA9IGZuLnRtcHYyXG4gICAgICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgICAgIGlmICggZm4udXNlQ29yZSApe1xuICAgICAgICAgICAgICAgICAgICB2QSA9IGJvZHlBLmdlb21ldHJ5LmdldEZhcnRoZXN0Q29yZVBvaW50KCBzZWFyY2hEaXIucm90YXRlSW52KCB0QSApLCB2QSwgZm4ubWFyZ2luQSApO1xuICAgICAgICAgICAgICAgICAgICB2QiA9IGJvZHlCLmdlb21ldHJ5LmdldEZhcnRoZXN0Q29yZVBvaW50KCBzZWFyY2hEaXIucm90YXRlKCB0QSApLnJvdGF0ZUludiggdEIgKS5uZWdhdGUoKSwgdkIsIGZuLm1hcmdpbkIgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2QSA9IGJvZHlBLmdlb21ldHJ5LmdldEZhcnRoZXN0SHVsbFBvaW50KCBzZWFyY2hEaXIucm90YXRlSW52KCB0QSApLCB2QSApO1xuICAgICAgICAgICAgICAgICAgICB2QiA9IGJvZHlCLmdlb21ldHJ5LmdldEZhcnRoZXN0SHVsbFBvaW50KCBzZWFyY2hEaXIucm90YXRlKCB0QSApLnJvdGF0ZUludiggdEIgKS5uZWdhdGUoKSwgdkIgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2QS52YWRkKCBib2R5QS5vZmZzZXQgKS50cmFuc2Zvcm0oIHRBICk7XG4gICAgICAgICAgICAgICAgdkIudmFkZCggYm9keUIub2Zmc2V0ICkudHJhbnNmb3JtKCB0QiApO1xuICAgICAgICAgICAgICAgIHNlYXJjaERpci5uZWdhdGUoKS5yb3RhdGUoIHRCICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBhOiB2QS52YWx1ZXMoKSxcbiAgICAgICAgICAgICAgICAgICAgYjogdkIudmFsdWVzKCksXG4gICAgICAgICAgICAgICAgICAgIHB0OiB2QS52c3ViKCB2QiApLnZhbHVlcygpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHRyYW5zZm9ybXMgZm9yIGNvb3JkaW5hdGUgdHJhbnNmb3JtYXRpb25zXG4gICAgICAgICAgICBmbi50QSA9IG5ldyBQaHlzaWNzLnRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgZm4udEIgPSBuZXcgUGh5c2ljcy50cmFuc2Zvcm0oKTtcblxuICAgICAgICAgICAgLy8gdGVtcCB2ZWN0b3JzICh1c2VkIHRvbyBmcmVxdWVudGx5IHRvIGp1c3RpZnkgc2NyYXRjaHBhZClcbiAgICAgICAgICAgIGZuLnRtcHYxID0gbmV3IFBoeXNpY3MudmVjdG9yKCk7XG4gICAgICAgICAgICBmbi50bXB2MiA9IG5ldyBQaHlzaWNzLnZlY3RvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm4udXNlQ29yZSA9IGZhbHNlO1xuICAgICAgICBmbi5tYXJnaW4gPSAwO1xuICAgICAgICBmbi50QS5zZXRSb3RhdGlvbiggYm9keUEuc3RhdGUuYW5ndWxhci5wb3MgKS5zZXRUcmFuc2xhdGlvbiggYm9keUEuc3RhdGUucG9zICk7XG4gICAgICAgIGZuLnRCLnNldFJvdGF0aW9uKCBib2R5Qi5zdGF0ZS5hbmd1bGFyLnBvcyApLnNldFRyYW5zbGF0aW9uKCBib2R5Qi5zdGF0ZS5wb3MgKTtcbiAgICAgICAgZm4uYm9keUEgPSBib2R5QTtcbiAgICAgICAgZm4uYm9keUIgPSBib2R5QjtcblxuICAgICAgICByZXR1cm4gZm47XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogY2hlY2tHSksoIGJvZHlBLCBib2R5QiApIC0+IE9iamVjdFxuICAgICAqIC0gYm9keUEgKE9iamVjdCk6IEZpcnN0IGJvZHlcbiAgICAgKiAtIGJvZHlCIChPYmplY3QpOiBTZWNvbmQgYm9keVxuICAgICAqICsgKE9iamVjdCk6IENvbGxpc2lvbiByZXN1bHRcbiAgICAgKlxuICAgICAqIFVzZSBHSksgYWxnb3JpdGhtIHRvIGNoZWNrIGFyYml0cmFyeSBib2RpZXMgZm9yIGNvbGxpc2lvbnNcbiAgICAgKi9cbiAgICB2YXIgY2hlY2tHSksgPSBmdW5jdGlvbiBjaGVja0dKSyggYm9keUEsIGJvZHlCICl7XG5cbiAgICAgICAgdmFyIHNjcmF0Y2ggPSBQaHlzaWNzLnNjcmF0Y2hwYWQoKVxuICAgICAgICAgICAgLGQgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICAgICAsdG1wID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgLG9zID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgLG92ZXJsYXBcbiAgICAgICAgICAgICxyZXN1bHRcbiAgICAgICAgICAgICxzdXBwb3J0XG4gICAgICAgICAgICAsaW5jXG4gICAgICAgICAgICAsY29sbGlzaW9uID0gZmFsc2VcbiAgICAgICAgICAgICxhYWJiQSA9IGJvZHlBLmFhYmIoKVxuICAgICAgICAgICAgLGRpbUEgPSBNYXRoLm1pbiggYWFiYkEuaHcsIGFhYmJBLmhoIClcbiAgICAgICAgICAgICxhYWJiQiA9IGJvZHlCLmFhYmIoKVxuICAgICAgICAgICAgLGRpbUIgPSBNYXRoLm1pbiggYWFiYkIuaHcsIGFhYmJCLmhoIClcbiAgICAgICAgICAgIDtcblxuICAgICAgICAvLyBqdXN0IGNoZWNrIHRoZSBvdmVybGFwIGZpcnN0XG4gICAgICAgIHN1cHBvcnQgPSBnZXRTdXBwb3J0Rm4oIGJvZHlBLCBib2R5QiApO1xuICAgICAgICBkLmNsb25lKCBib2R5QS5zdGF0ZS5wb3MgKVxuICAgICAgICAgICAgLnZhZGQoIGJvZHlBLmdldEdsb2JhbE9mZnNldCggb3MgKSApXG4gICAgICAgICAgICAudnN1YiggYm9keUIuc3RhdGUucG9zIClcbiAgICAgICAgICAgIC52c3ViKCBib2R5Qi5nZXRHbG9iYWxPZmZzZXQoIG9zICkgKVxuICAgICAgICAgICAgO1xuICAgICAgICByZXN1bHQgPSBQaHlzaWNzLmdqayhzdXBwb3J0LCBkLCB0cnVlKTtcblxuICAgICAgICBpZiAoIHJlc3VsdC5vdmVybGFwICl7XG5cbiAgICAgICAgICAgIC8vIHRoZXJlIGlzIGEgY29sbGlzaW9uLiBsZXQncyBkbyBtb3JlIHdvcmsuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgYm9keUE6IGJvZHlBLFxuICAgICAgICAgICAgICAgIGJvZHlCOiBib2R5QlxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaW5jIGJ5IDElIG9mIHRoZSBzbWFsbGVzdCBkaW0uXG4gICAgICAgICAgICBpbmMgPSAxZS0yICogTWF0aC5taW4oZGltQSB8fCAxLCBkaW1CIHx8IDEpO1xuXG4gICAgICAgICAgICAvLyBmaXJzdCBnZXQgdGhlIG1pbiBkaXN0YW5jZSBvZiBiZXR3ZWVuIGNvcmUgb2JqZWN0c1xuICAgICAgICAgICAgc3VwcG9ydC51c2VDb3JlID0gdHJ1ZTtcbiAgICAgICAgICAgIHN1cHBvcnQubWFyZ2luQSA9IDA7XG4gICAgICAgICAgICBzdXBwb3J0Lm1hcmdpbkIgPSAwO1xuXG4gICAgICAgICAgICAvLyB3aGlsZSB0aGVyZSdzIHN0aWxsIGFuIG92ZXJsYXAgKG9yIHdlIGRvbid0IGhhdmUgYSBwb3NpdGl2ZSBkaXN0YW5jZSlcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgc3VwcG9ydCBtYXJnaW5zIGFyZW4ndCBiaWdnZXIgdGhhbiB0aGUgc2hhcGVzLi4uXG4gICAgICAgICAgICAvLyBzZWFyY2ggZm9yIHRoZSBkaXN0YW5jZSBkYXRhXG4gICAgICAgICAgICB3aGlsZSAoIChyZXN1bHQub3ZlcmxhcCB8fCByZXN1bHQuZGlzdGFuY2UgPT09IDApICYmIChzdXBwb3J0Lm1hcmdpbkEgPCBkaW1BIHx8IHN1cHBvcnQubWFyZ2luQiA8IGRpbUIpICl7XG4gICAgICAgICAgICAgICAgaWYgKCBzdXBwb3J0Lm1hcmdpbkEgPCBkaW1BICl7XG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnQubWFyZ2luQSArPSBpbmM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggc3VwcG9ydC5tYXJnaW5CIDwgZGltQiApe1xuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0Lm1hcmdpbkIgKz0gaW5jO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFBoeXNpY3MuZ2prKHN1cHBvcnQsIGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHJlc3VsdC5vdmVybGFwIHx8IHJlc3VsdC5tYXhJdGVyYXRpb25zUmVhY2hlZCApe1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaW1wbGVtZW50YXRpb24gY2FuJ3QgZGVhbCB3aXRoIGEgY29yZSBvdmVybGFwIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiBzY3JhdGNoLmRvbmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWxjIG92ZXJsYXBcbiAgICAgICAgICAgIG92ZXJsYXAgPSAoc3VwcG9ydC5tYXJnaW5BICsgc3VwcG9ydC5tYXJnaW5CKSAtIHJlc3VsdC5kaXN0YW5jZTtcblxuICAgICAgICAgICAgaWYgKCBvdmVybGFwIDw9IDAgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NyYXRjaC5kb25lKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29sbGlzaW9uLm92ZXJsYXAgPSBvdmVybGFwO1xuICAgICAgICAgICAgLy8gQFRPRE86IGZvciBub3csIGp1c3QgbGV0IHRoZSBub3JtYWwgYmUgdGhlIG10dlxuICAgICAgICAgICAgY29sbGlzaW9uLm5vcm0gPSBkLmNsb25lKCByZXN1bHQuY2xvc2VzdC5iICkudnN1YiggdG1wLmNsb25lKCByZXN1bHQuY2xvc2VzdC5hICkgKS5ub3JtYWxpemUoKS52YWx1ZXMoKTtcbiAgICAgICAgICAgIGNvbGxpc2lvbi5tdHYgPSBkLm11bHQoIG92ZXJsYXAgKS52YWx1ZXMoKTtcbiAgICAgICAgICAgIC8vIGdldCBhIGNvcnJlc3BvbmRpbmcgaHVsbCBwb2ludCBmb3Igb25lIG9mIHRoZSBjb3JlIHBvaW50cy4uIHJlbGF0aXZlIHRvIGJvZHkgQVxuICAgICAgICAgICAgY29sbGlzaW9uLnBvcyA9IGQuY2xvbmUoIGNvbGxpc2lvbi5ub3JtICkubXVsdCggc3VwcG9ydC5tYXJnaW5BICkudmFkZCggdG1wLmNsb25lKCByZXN1bHQuY2xvc2VzdC5hICkgKS52c3ViKCBib2R5QS5zdGF0ZS5wb3MgKS52YWx1ZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzY3JhdGNoLmRvbmUoIGNvbGxpc2lvbiApO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIGNoZWNrQ2lyY2xlcyggYm9keUEsIGJvZHlCICkgLT4gT2JqZWN0XG4gICAgICogLSBib2R5QSAoT2JqZWN0KTogRmlyc3QgYm9keVxuICAgICAqIC0gYm9keUIgKE9iamVjdCk6IFNlY29uZCBib2R5XG4gICAgICogKyAoT2JqZWN0KTogQ29sbGlzaW9uIHJlc3VsdFxuICAgICAqXG4gICAgICogQ2hlY2sgdHdvIGNpcmNsZXMgZm9yIGNvbGxpc2lvbnMuXG4gICAgICovXG4gICAgdmFyIGNoZWNrQ2lyY2xlcyA9IGZ1bmN0aW9uIGNoZWNrQ2lyY2xlcyggYm9keUEsIGJvZHlCICl7XG5cbiAgICAgICAgdmFyIHNjcmF0Y2ggPSBQaHlzaWNzLnNjcmF0Y2hwYWQoKVxuICAgICAgICAgICAgLGQgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICAgICAsdG1wID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgLG92ZXJsYXBcbiAgICAgICAgICAgICxjb2xsaXNpb24gPSBmYWxzZVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIGQuY2xvbmUoIGJvZHlCLnN0YXRlLnBvcyApXG4gICAgICAgICAgICAudmFkZCggYm9keUIuZ2V0R2xvYmFsT2Zmc2V0KCB0bXAgKSApXG4gICAgICAgICAgICAudnN1YiggYm9keUEuc3RhdGUucG9zIClcbiAgICAgICAgICAgIC52c3ViKCBib2R5QS5nZXRHbG9iYWxPZmZzZXQoIHRtcCApICkgLy8gc2F2ZSBvZmZzZXQgZm9yIGxhdGVyXG4gICAgICAgICAgICA7XG4gICAgICAgIG92ZXJsYXAgPSBkLm5vcm0oKSAtIChib2R5QS5nZW9tZXRyeS5yYWRpdXMgKyBib2R5Qi5nZW9tZXRyeS5yYWRpdXMpO1xuXG4gICAgICAgIC8vIGhtbS4uLiB0aGV5IG92ZXJsYXAgZXhhY3RseS4uLiBjaG9vc2UgYSBkaXJlY3Rpb25cbiAgICAgICAgaWYgKCBkLmVxdWFscyggUGh5c2ljcy52ZWN0b3IuemVybyApICl7XG5cbiAgICAgICAgICAgIGQuc2V0KCAxLCAwICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG92ZXJsYXAgPD0gMCApe1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgYm9keUE6IGJvZHlBLFxuICAgICAgICAgICAgICAgIGJvZHlCOiBib2R5QixcbiAgICAgICAgICAgICAgICBub3JtOiBkLm5vcm1hbGl6ZSgpLnZhbHVlcygpLFxuICAgICAgICAgICAgICAgIG10djogZC5tdWx0KCAtb3ZlcmxhcCApLnZhbHVlcygpLFxuICAgICAgICAgICAgICAgIHBvczogZC5tdWx0KCAtYm9keUEuZ2VvbWV0cnkucmFkaXVzL292ZXJsYXAgKS52YWRkKCB0bXAgKS52YWx1ZXMoKSxcbiAgICAgICAgICAgICAgICBvdmVybGFwOiAtb3ZlcmxhcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzY3JhdGNoLmRvbmUoIGNvbGxpc2lvbiApO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIGNoZWNrUGFpciggYm9keUEsIGJvZHlCWywgZGlzcF0gKSAtPiBPYmplY3RcbiAgICAgKiAtIGJvZHlBIChPYmplY3QpOiBGaXJzdCBib2R5XG4gICAgICogLSBib2R5QiAoT2JqZWN0KTogU2Vjb25kIGJvZHlcbiAgICAgKiArIChPYmplY3QpOiBDb2xsaXNpb24gcmVzdWx0XG4gICAgICpcbiAgICAgKiBDaGVjayBhIHBhaXIgZm9yIGNvbGxpc2lvbnNcbiAgICAgKi9cbiAgICB2YXIgY2hlY2tQYWlyID0gZnVuY3Rpb24gY2hlY2tQYWlyKCBib2R5QSwgYm9keUIgKXtcblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGJvZGllcyB0aGF0IGRvbid0IGNvbGxpZGUgd2l0aCBlYWNoIG90aGVyXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICggYm9keUEudHJlYXRtZW50ID09PSAnc3RhdGljJyB8fCBib2R5QS50cmVhdG1lbnQgPT09ICdraW5lbWF0aWMnICkgJiZcbiAgICAgICAgICAgICggYm9keUIudHJlYXRtZW50ID09PSAnc3RhdGljJyB8fCBib2R5Qi50cmVhdG1lbnQgPT09ICdraW5lbWF0aWMnIClcbiAgICAgICAgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggYm9keUEuZ2VvbWV0cnkubmFtZSA9PT0gJ2NpcmNsZScgJiYgYm9keUIuZ2VvbWV0cnkubmFtZSA9PT0gJ2NpcmNsZScgKXtcblxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrQ2lyY2xlcyggYm9keUEsIGJvZHlCICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggYm9keUEuZ2VvbWV0cnkubmFtZSA9PT0gJ2NvbXBvdW5kJyB8fCBib2R5Qi5nZW9tZXRyeS5uYW1lID09PSAnY29tcG91bmQnICl7XG4gICAgICAgICAgICAvLyBjb21wb3VuZCBib2RpZXMgYXJlIHNwZWNpYWwuIFdlIGNhbid0IHVzZSBnamsgYmVjYXVzZVxuICAgICAgICAgICAgLy8gdGhleSBjb3VsZCBoYXZlIGNvbmNhdml0aWVzLiBzbyB3ZSBkbyB0aGUgcGllY2VzIGluZGl2aWR1YWxseVxuICAgICAgICAgICAgdmFyIHRlc3QgPSAoYm9keUEuZ2VvbWV0cnkubmFtZSA9PT0gJ2NvbXBvdW5kJylcbiAgICAgICAgICAgICAgICAsY29tcG91bmQgPSB0ZXN0ID8gYm9keUEgOiBib2R5QlxuICAgICAgICAgICAgICAgICxvdGhlciA9IHRlc3QgPyBib2R5QiA6IGJvZHlBXG4gICAgICAgICAgICAgICAgLGNvbHNcbiAgICAgICAgICAgICAgICAsY2hcbiAgICAgICAgICAgICAgICAscmV0ID0gW11cbiAgICAgICAgICAgICAgICAsc2NyYXRjaCA9IFBoeXNpY3Muc2NyYXRjaHBhZCgpXG4gICAgICAgICAgICAgICAgLHZlYyA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICAgICAsb2xkUG9zID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgICAgICxvdGhlckFBQkIgPSBvdGhlci5hYWJiKClcbiAgICAgICAgICAgICAgICAsaVxuICAgICAgICAgICAgICAgICxsXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBmb3IgKCBpID0gMCwgbCA9IGNvbXBvdW5kLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgY2ggPSBjb21wb3VuZC5jaGlsZHJlblsgaSBdO1xuICAgICAgICAgICAgICAgIC8vIG1vdmUgYm9keSB0byBmYWtlIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgb2xkUG9zLmNsb25lKCBjaC5zdGF0ZS5wb3MgKTtcbiAgICAgICAgICAgICAgICBjaC5vZmZzZXQudmFkZCggb2xkUG9zLnZhZGQoIGNvbXBvdW5kLm9mZnNldCApLnJvdGF0ZSggLWNoLnN0YXRlLmFuZ3VsYXIucG9zICkgKTtcbiAgICAgICAgICAgICAgICBjaC5zdGF0ZS5wb3MuY2xvbmUoIGNvbXBvdW5kLnN0YXRlLnBvcyApO1xuICAgICAgICAgICAgICAgIGNoLnN0YXRlLmFuZ3VsYXIucG9zICs9IGNvbXBvdW5kLnN0YXRlLmFuZ3VsYXIucG9zO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaXQgaWYgdGhlIGFhYmJzIG92ZXJsYXBcbiAgICAgICAgICAgICAgICBpZiAoIFBoeXNpY3MuYWFiYi5vdmVybGFwKG90aGVyQUFCQiwgY2guYWFiYigpKSApe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbHMgPSBjaGVja1BhaXIoIG90aGVyLCBjaCApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggY29scyBpbnN0YW5jZW9mIEFycmF5ICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaiA9IDAsIGMsIGxsID0gY29scy5sZW5ndGg7IGogPCBsbDsgaisrICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IGNvbHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IGJvZHkgdG8gYmUgdGhlIGNvbXBvdW5kIGJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGMuYm9keUEgPT09IGNoICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuYm9keUEgPSBjb21wb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmJvZHlCID0gY29tcG91bmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKCBjICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggY29scyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCBib2R5IHRvIGJlIHRoZSBjb21wb3VuZCBib2R5XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbHMuYm9keUEgPT09IGNoICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scy5ib2R5QSA9IGNvbXBvdW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzLmJvZHlCID0gY29tcG91bmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQucHVzaCggY29scyApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdHJhbnNmb3JtIGl0IGJhY2tcbiAgICAgICAgICAgICAgICBjaC5zdGF0ZS5hbmd1bGFyLnBvcyAtPSBjb21wb3VuZC5zdGF0ZS5hbmd1bGFyLnBvcztcbiAgICAgICAgICAgICAgICBjaC5vZmZzZXQudnN1Yiggb2xkUG9zICk7XG4gICAgICAgICAgICAgICAgY2guc3RhdGUucG9zLmNsb25lKCBvbGRQb3Mucm90YXRlKCBjaC5zdGF0ZS5hbmd1bGFyLnBvcyApLnZzdWIoIGNvbXBvdW5kLm9mZnNldCApICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzY3JhdGNoLmRvbmUoIHJldCApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiBjaGVja0dKSyggYm9keUEsIGJvZHlCICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuXG4gICAgICAgIC8vIGNoYW5uZWwgdG8gbGlzdGVuIHRvIGZvciBjb2xsaXNpb24gY2FuZGlkYXRlc1xuICAgICAgICAvLyBzZXQgdG8gXCJ0cnVlXCIgdG8gZm9yY2UgY2hlY2sgZXZlcnkgcGFpciBvZiBib2RpZXMgaW4gdGhlIHdvcmxkXG4gICAgICAgIGNoZWNrOiAnY29sbGlzaW9uczpjYW5kaWRhdGVzJyxcblxuICAgICAgICAvLyBjaGFubmVsIHRvIHB1Ymxpc2ggZXZlbnRzIHRvXG4gICAgICAgIGNoYW5uZWw6ICdjb2xsaXNpb25zOmRldGVjdGVkJ1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwoIHRoaXMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0cyggZGVmYXVsdHMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyggb3B0aW9ucyApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGNvbm5lY3Q6IGZ1bmN0aW9uKCB3b3JsZCApe1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMub3B0aW9ucy5jaGVjayA9PT0gdHJ1ZSApe1xuXG4gICAgICAgICAgICAgICAgd29ybGQub24oICdpbnRlZ3JhdGU6dmVsb2NpdGllcycsIHRoaXMuY2hlY2tBbGwsIHRoaXMgKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHdvcmxkLm9uKCB0aGlzLm9wdGlvbnMuY2hlY2ssIHRoaXMuY2hlY2ssIHRoaXMgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBkaXNjb25uZWN0OiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLm9wdGlvbnMuY2hlY2sgPT09IHRydWUgKXtcblxuICAgICAgICAgICAgICAgIHdvcmxkLm9mZiggJ2ludGVncmF0ZTp2ZWxvY2l0aWVzJywgdGhpcy5jaGVja0FsbCwgdGhpcyApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgd29ybGQub2ZmKCB0aGlzLm9wdGlvbnMuY2hlY2ssIHRoaXMuY2hlY2ssIHRoaXMgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogQm9keUNvbGxpc2lvbkRldGVjdGlvbkJlaGF2aW9yI2NoZWNrKCBkYXRhIClcbiAgICAgICAgICogLSBkYXRhIChPYmplY3QpOiBUaGUgZXZlbnQgZGF0YVxuICAgICAgICAgKlxuICAgICAgICAgKiBFdmVudCBjYWxsYmFjayB0byBjaGVjayBwYWlycyBvZiBvYmplY3RzIHRoYXQgaGF2ZSBiZWVuIGZsYWdnZWQgYnkgYnJvYWQgcGhhc2UgZm9yIHBvc3NpYmxlIGNvbGxpc2lvbnMuXG4gICAgICAgICAqKi9cbiAgICAgICAgY2hlY2s6IGZ1bmN0aW9uKCBkYXRhICl7XG5cbiAgICAgICAgICAgIHZhciBjYW5kaWRhdGVzID0gZGF0YS5jYW5kaWRhdGVzXG4gICAgICAgICAgICAgICAgLHBhaXJcbiAgICAgICAgICAgICAgICAsdGFyZ2V0cyA9IHRoaXMuZ2V0VGFyZ2V0cygpXG4gICAgICAgICAgICAgICAgLGNvbGxpc2lvbnMgPSBbXVxuICAgICAgICAgICAgICAgICxyZXRcbiAgICAgICAgICAgICAgICAscHJldkNvbnRhY3RzID0gdGhpcy5wcmV2Q29udGFjdHMgfHwge31cbiAgICAgICAgICAgICAgICAsY29udGFjdExpc3QgPSB7fVxuICAgICAgICAgICAgICAgICxwYWlySGFzaCA9IFBoeXNpY3MudXRpbC5wYWlySGFzaFxuICAgICAgICAgICAgICAgICxoYXNoXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBjYW5kaWRhdGVzLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgcGFpciA9IGNhbmRpZGF0ZXNbIGkgXTtcblxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0cyA9PT0gdGhpcy5fd29ybGQuX2JvZGllcyB8fFxuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGNoZWNrIGlmIHRoZSBtZW1iZXJzIGFyZSB0YXJnZXRlZCBieSB0aGlzIGJlaGF2aW9yXG4gICAgICAgICAgICAgICAgICAgIChQaHlzaWNzLnV0aWwuaW5kZXhPZiggdGFyZ2V0cywgcGFpci5ib2R5QSApID4gLTEpICYmXG4gICAgICAgICAgICAgICAgICAgIChQaHlzaWNzLnV0aWwuaW5kZXhPZiggdGFyZ2V0cywgcGFpci5ib2R5QiApID4gLTEpXG4gICAgICAgICAgICAgICAgKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gY2hlY2tQYWlyKCBwYWlyLmJvZHlBLCBwYWlyLmJvZHlCICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCByZXQgaW5zdGFuY2VvZiBBcnJheSApe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaiA9IDAsIHIsIGxsID0gcmV0Lmxlbmd0aDsgaiA8IGxsOyBqKysgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByID0gcmV0W2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggciApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNoID0gcGFpckhhc2goIHBhaXIuYm9keUEudWlkLCBwYWlyLmJvZHlCLnVpZCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0TGlzdFsgaGFzaCBdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5jb2xsaWRlZFByZXZpb3VzbHkgPSBwcmV2Q29udGFjdHNbIGhhc2ggXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoKCByICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHJldCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzaCA9IHBhaXJIYXNoKCBwYWlyLmJvZHlBLnVpZCwgcGFpci5ib2R5Qi51aWQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0WyBoYXNoIF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LmNvbGxpZGVkUHJldmlvdXNseSA9IHByZXZDb250YWN0c1sgaGFzaCBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLnB1c2goIHJldCApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByZXZDb250YWN0cyA9IGNvbnRhY3RMaXN0O1xuXG4gICAgICAgICAgICBpZiAoIGNvbGxpc2lvbnMubGVuZ3RoICl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl93b3JsZC5lbWl0KCB0aGlzLm9wdGlvbnMuY2hhbm5lbCwge1xuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zOiBjb2xsaXNpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIEJvZHlDb2xsaXNpb25EZXRlY3Rpb25CZWhhdmlvciNjaGVja0FsbCggZGF0YSApXG4gICAgICAgICAqIC0gZGF0YSAoT2JqZWN0KTogVGhlIGV2ZW50IGRhdGFcbiAgICAgICAgICpcbiAgICAgICAgICogRXZlbnQgY2FsbGJhY2sgdG8gY2hlY2sgYWxsIHBhaXJzIG9mIG9iamVjdHMgaW4gdGhlIGxpc3QgZm9yIGNvbGxpc2lvbnNcbiAgICAgICAgICoqL1xuICAgICAgICBjaGVja0FsbDogZnVuY3Rpb24oIGRhdGEgKXtcblxuICAgICAgICAgICAgdmFyIGJvZGllcyA9IHRoaXMuZ2V0VGFyZ2V0cygpXG4gICAgICAgICAgICAgICAgLGR0ID0gZGF0YS5kdFxuICAgICAgICAgICAgICAgICxib2R5QVxuICAgICAgICAgICAgICAgICxib2R5QlxuICAgICAgICAgICAgICAgICxjb2xsaXNpb25zID0gW11cbiAgICAgICAgICAgICAgICAscmV0XG4gICAgICAgICAgICAgICAgLHByZXZDb250YWN0cyA9IHRoaXMucHJldkNvbnRhY3RzIHx8IHt9XG4gICAgICAgICAgICAgICAgLGNvbnRhY3RMaXN0ID0ge31cbiAgICAgICAgICAgICAgICAscGFpckhhc2ggPSBQaHlzaWNzLnV0aWwucGFpckhhc2hcbiAgICAgICAgICAgICAgICAsaGFzaFxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgZm9yICggdmFyIGogPSAwLCBsID0gYm9kaWVzLmxlbmd0aDsgaiA8IGw7IGorKyApe1xuXG4gICAgICAgICAgICAgICAgYm9keUEgPSBib2RpZXNbIGogXTtcblxuICAgICAgICAgICAgICAgIGZvciAoIHZhciBpID0gaiArIDE7IGkgPCBsOyBpKysgKXtcblxuICAgICAgICAgICAgICAgICAgICBib2R5QiA9IGJvZGllc1sgaSBdO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGNoZWNrUGFpciggYm9keUEsIGJvZHlCICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCByZXQgaW5zdGFuY2VvZiBBcnJheSApe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCB2YXIgayA9IDAsIHIsIGxsID0gcmV0Lmxlbmd0aDsgayA8IGxsOyBrKysgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByID0gcmV0W2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggciApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNoID0gcGFpckhhc2goIGJvZHlBLnVpZCwgYm9keUIudWlkICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0WyBoYXNoIF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmNvbGxpZGVkUHJldmlvdXNseSA9IHByZXZDb250YWN0c1sgaGFzaCBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLnB1c2goIHIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggcmV0ICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNoID0gcGFpckhhc2goIGJvZHlBLnVpZCwgYm9keUIudWlkICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0TGlzdFsgaGFzaCBdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5jb2xsaWRlZFByZXZpb3VzbHkgPSBwcmV2Q29udGFjdHNbIGhhc2ggXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoKCByZXQgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcmV2Q29udGFjdHMgPSBjb250YWN0TGlzdDtcblxuICAgICAgICAgICAgaWYgKCBjb2xsaXNpb25zLmxlbmd0aCApe1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fd29ybGQuZW1pdCggdGhpcy5vcHRpb25zLmNoYW5uZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uczogY29sbGlzaW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxufSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9iZWhhdmlvcnMvYm9keS1pbXB1bHNlLXJlc3BvbnNlLmpzXG5cbi8qKlxuICogY2xhc3MgQm9keUltcHVsc2VSZXNwb25zZUJlaGF2aW9yIDwgQmVoYXZpb3JcbiAqXG4gKiBgUGh5c2ljcy5iZWhhdmlvcignYm9keS1pbXB1bHNlLXJlc3BvbnNlJylgLlxuICpcbiAqIFJlc3BvbmRzIHRvIGNvbGxpc2lvbnMgYnkgYXBwbHlpbmcgaW1wdWxzZXMuXG4gKlxuICogQWRkaXRpb25hbCBvcHRpb25zIGluY2x1ZGU6XG4gKiAtIGNoZWNrOiBjaGFubmVsIHRvIGxpc3RlbiB0byBmb3IgY29sbGlzaW9ucyAoZGVmYXVsdDogYGNvbGxpc2lvbnM6ZGV0ZWN0ZWRgKS5cbiAqIC0gbXR2VGhyZXNob2xkOiBhcHBseSBwYXJ0aWFsIGV4dHJhY3Rpb24gb2YgYm9kaWVzIGlmIHRoZSBtaW5pbXVtIHRyYW5zaXQgdmVjdG9yIGlzIGxlc3MgdGhhbiB0aGlzIHZhbHVlICggZGVmYXVsdDogYDFgKVxuICogICB0aGlzIHdpbGwgZGVwZW5kIG9uIHlvdXIgc2ltdWxhdGlvbiBjaGFyYWN0ZXJpc3RpYyBsZW5ndGggc2NhbGVcbiAqIC0gYm9keUV4dHJhY3REcm9wb2ZmOiBldmVyeSBib2R5IG92ZXJsYXAgY29ycmVjdGlvbiAodW5kZXJuZWl0aCBtdHZUaHJlc2hvbGQpIHdpbGwgb25seSBleHRyYWN0IGJ5IHRoaXMgZnJhY3Rpb24gKDAuLjEpLiBIZWxwcyB3aXRoIHN0YWJsaXppbmcgY29udGFjdHMuIChkZWZhdWx0OiBgMC41YClcbiAqIC0gZm9yY2VXYWtldXBBYm92ZU92ZXJsYXBUaHJlc2hvbGQ6IGZvcmNlIGJvZGllcyB0byB3YWtlIHVwIGlmIHRoZSBvdmVybGFwIGlzIGFib3ZlIG10dlRocmVzaG9sZCAoIGRlZmF1bHQ6IGB0cnVlYCApXG4gKiovXG5QaHlzaWNzLmJlaGF2aW9yKCdib2R5LWltcHVsc2UtcmVzcG9uc2UnLCBmdW5jdGlvbiggcGFyZW50ICl7XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIC8vIGNoYW5uZWwgdG8gbGlzdGVuIHRvIGZvciBjb2xsaXNpb25zXG4gICAgICAgIGNoZWNrOiAnY29sbGlzaW9uczpkZXRlY3RlZCdcbiAgICAgICAgLy8gYXBwbHkgcGFydGlhbCBleHRyYWN0aW9uIG9mIGJvZGllcyBpZiB0aGUgbWluaW11bSB0cmFuc2l0IHZlY3RvciBpcyBsZXNzIHRoYW4gdGhpcyB2YWx1ZVxuICAgICAgICAvLyB0aGlzIHdpbGwgZGVwZW5kIG9uIHlvdXIgc2ltdWxhdGlvbiBjaGFyYWN0ZXJpc3RpYyBsZW5ndGggc2NhbGVcbiAgICAgICAgLG10dlRocmVzaG9sZDogMVxuICAgICAgICAvLyBldmVyeSBib2R5IG92ZXJsYXAgY29ycmVjdGlvbiAodW5kZXJuZWl0aCBtdHZUaHJlc2hvbGQpIHdpbGwgb25seSBleHRyYWN0IGJ5IHRoaXMgZnJhY3Rpb24gKDAuLjEpXG4gICAgICAgIC8vIGhlbHBzIHdpdGggc3RhYmxpemluZyBjb250YWN0cy5cbiAgICAgICAgLGJvZHlFeHRyYWN0RHJvcG9mZjogMC41XG4gICAgICAgIC8vIGZvcmNlIGJvZGllcyB0byB3YWtlIHVwIGlmIHRoZSBvdmVybGFwIGlzIGFib3ZlIG10dlRocmVzaG9sZFxuICAgICAgICAsZm9yY2VXYWtldXBBYm92ZU92ZXJsYXBUaHJlc2hvbGQ6IHRydWVcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0VWlkKCBiICl7XG4gICAgICAgIHJldHVybiBiLnVpZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGFtcE1UViggdG90YWxWLCBtdHYsIGludG8gKXtcblxuICAgICAgICB2YXIgbSwgbjtcbiAgICAgICAgbiA9IG10di5ub3JtKCk7XG4gICAgICAgIG0gPSBuIC0gdG90YWxWLnByb2ooIG10diApO1xuICAgICAgICBtID0gTWF0aC5tYXgoIDAsIE1hdGgubWluKCBuLCBtICkgKTtcblxuICAgICAgICBpZiAoIG4gPT09IDAgKXtcbiAgICAgICAgICAgIGludG8uemVybygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW50by5jbG9uZSggbXR2ICkubXVsdCggbS9uICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW50bztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwoIHRoaXMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0cyggZGVmYXVsdHMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyggb3B0aW9ucyApO1xuXG4gICAgICAgICAgICB0aGlzLl9ib2R5TGlzdCA9IFtdO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIG5vIGFwcGx5VG8gbWV0aG9kXG4gICAgICAgIGFwcGx5VG86IGZhbHNlLFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGNvbm5lY3Q6IGZ1bmN0aW9uKCB3b3JsZCApe1xuXG4gICAgICAgICAgICB3b3JsZC5vbiggdGhpcy5vcHRpb25zLmNoZWNrLCB0aGlzLnJlc3BvbmQsIHRoaXMgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBkaXNjb25uZWN0OiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgd29ybGQub2ZmKCB0aGlzLm9wdGlvbnMuY2hlY2ssIHRoaXMucmVzcG9uZCwgdGhpcyApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBpbnRlcm5hbFxuICAgICAgICAgKiBCb2R5SW1wdWxzZVJlc3BvbnNlQmVoYXZpb3IjY29sbGlkZUJvZGVzKCBib2R5QSwgYm9keUIsIG5vcm1hbCwgcG9pbnQsIG10cmFucywgY29udGFjdCApXG4gICAgICAgICAqIC0gYm9keUEgKE9iamVjdCk6IEZpcnN0IEJvZHlcbiAgICAgICAgICogLSBib2R5QiAoT2JqZWN0KTogU2Vjb25kIGJvZHlcbiAgICAgICAgICogLSBub3JtYWwgKFZlY3Rvcik6IE5vcm1hbCB2ZWN0b3Igb2YgdGhlIGNvbGxpc2lvbiBzdXJmYWNlXG4gICAgICAgICAqIC0gcG9pbnQgKFZlY3Rvcik6IENvbnRhY3QgcG9pbnQgb2YgdGhlIGNvbGxpc2lvblxuICAgICAgICAgKiAtIG10cmFucyAoVmVjdG9yKTogTWluaW11bSB0cmFuc2l0IHZlY3RvciB0aGF0IGlzIHRoZSBzbWFsbGVzdCBkaXNwbGFjZW1lbnQgdG8gc2VwYXJhdGUgdGhlIGJvZGllc1xuICAgICAgICAgKiAtIGNvbnRhY3QgKEJvb2xlYW4pOiBBcmUgdGhlIGJvZGllcyBpbiByZXN0aW5nIGNvbnRhY3QgcmVsYXRpdmUgdG8gZWFjaCBvdGhlclxuICAgICAgICAgKlxuICAgICAgICAgKiBDb2xsaWRlIHR3byBib2RpZXMgYnkgbW9kaWZ5aW5nIHRoZWlyIHBvc2l0aW9ucyBhbmQgdmVsb2NpdGllcyB0byBjb25zZXJ2ZSBtb21lbnR1bVxuICAgICAgICAgKiovXG4gICAgICAgIGNvbGxpZGVCb2RpZXM6IGZ1bmN0aW9uKGJvZHlBLCBib2R5Qiwgbm9ybWFsLCBwb2ludCwgbXRyYW5zLCBjb250YWN0KXtcblxuICAgICAgICAgICAgdmFyIGZpeGVkQSA9IGJvZHlBLnRyZWF0bWVudCA9PT0gJ3N0YXRpYycgfHwgYm9keUEudHJlYXRtZW50ID09PSAna2luZW1hdGljJ1xuICAgICAgICAgICAgICAgICxmaXhlZEIgPSBib2R5Qi50cmVhdG1lbnQgPT09ICdzdGF0aWMnIHx8IGJvZHlCLnRyZWF0bWVudCA9PT0gJ2tpbmVtYXRpYydcbiAgICAgICAgICAgICAgICAsc2NyYXRjaCA9IFBoeXNpY3Muc2NyYXRjaHBhZCgpXG4gICAgICAgICAgICAgICAgLy8gbWluaW11bSB0cmFuc2l0IHZlY3RvciBmb3IgZWFjaCBib2R5XG4gICAgICAgICAgICAgICAgLG10diA9IHNjcmF0Y2gudmVjdG9yKCkuY2xvbmUoIG10cmFucyApXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nIGlmIGJvdGggYXJlIGZpeGVkXG4gICAgICAgICAgICBpZiAoIGZpeGVkQSAmJiBmaXhlZEIgKXtcbiAgICAgICAgICAgICAgICBzY3JhdGNoLmRvbmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGludmVyc2UgbWFzc2VzIGFuZCBtb21lbnRzIG9mIGluZXJ0aWEuXG4gICAgICAgICAgICAvLyBnaXZlIGZpeGVkIGJvZGllcyBpbmZpbml0ZSBtYXNzIGFuZCBtb2lcbiAgICAgICAgICAgIHZhciBpbnZNb2lBID0gZml4ZWRBID8gMCA6IDEgLyBib2R5QS5tb2lcbiAgICAgICAgICAgICAgICAsaW52TW9pQiA9IGZpeGVkQiA/IDAgOiAxIC8gYm9keUIubW9pXG4gICAgICAgICAgICAgICAgLGludk1hc3NBID0gZml4ZWRBID8gMCA6IDEgLyBib2R5QS5tYXNzXG4gICAgICAgICAgICAgICAgLGludk1hc3NCID0gZml4ZWRCID8gMCA6IDEgLyBib2R5Qi5tYXNzXG4gICAgICAgICAgICAgICAgLy8gY29lZmZpY2llbnQgb2YgcmVzdGl0dXRpb24gYmV0d2VlbiBib2RpZXNcbiAgICAgICAgICAgICAgICAsY29yID0gYm9keUEucmVzdGl0dXRpb24gKiBib2R5Qi5yZXN0aXR1dGlvblxuICAgICAgICAgICAgICAgIC8vIGNvZWZmaWNpZW50IG9mIGZyaWN0aW9uIGJldHdlZW4gYm9kaWVzXG4gICAgICAgICAgICAgICAgLGNvZiA9IGJvZHlBLmNvZiAqIGJvZHlCLmNvZlxuICAgICAgICAgICAgICAgIC8vIG5vcm1hbCB2ZWN0b3JcbiAgICAgICAgICAgICAgICAsbiA9IHNjcmF0Y2gudmVjdG9yKCkuY2xvbmUoIG5vcm1hbCApXG4gICAgICAgICAgICAgICAgLy8gdmVjdG9yIHBlcnBlbmRpY3VsYXIgdG8gblxuICAgICAgICAgICAgICAgICxwZXJwID0gc2NyYXRjaC52ZWN0b3IoKS5jbG9uZSggbiApLnBlcnAoKVxuICAgICAgICAgICAgICAgICx0bXAgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICAgICAgICAgLy8gY29sbGlzaW9uIHBvaW50IGZyb20gQSdzIGNlbnRlclxuICAgICAgICAgICAgICAgICxyQSA9IHNjcmF0Y2gudmVjdG9yKCkuY2xvbmUoIHBvaW50IClcbiAgICAgICAgICAgICAgICAvLyBjb2xsaXNpb24gcG9pbnQgZnJvbSBCJ3MgY2VudGVyXG4gICAgICAgICAgICAgICAgLHJCID0gc2NyYXRjaC52ZWN0b3IoKS5jbG9uZSggcG9pbnQgKVxuICAgICAgICAgICAgICAgICAgICAudmFkZCggYm9keUEuc3RhdGUucG9zIClcbiAgICAgICAgICAgICAgICAgICAgLnZzdWIoIGJvZHlCLnN0YXRlLnBvcyApXG4gICAgICAgICAgICAgICAgLGFuZ1ZlbEEgPSBib2R5QS5zdGF0ZS5hbmd1bGFyLnZlbFxuICAgICAgICAgICAgICAgICxhbmdWZWxCID0gYm9keUIuc3RhdGUuYW5ndWxhci52ZWxcbiAgICAgICAgICAgICAgICAvLyByZWxhdGl2ZSB2ZWxvY2l0eSB0b3dhcmRzIEIgYXQgY29sbGlzaW9uIHBvaW50XG4gICAgICAgICAgICAgICAgLHZBQiA9IHNjcmF0Y2gudmVjdG9yKCkuY2xvbmUoIGJvZHlCLnN0YXRlLnZlbCApXG4gICAgICAgICAgICAgICAgICAgICAgICAudmFkZCggdG1wLmNsb25lKHJCKS5wZXJwKCkubXVsdCggYW5nVmVsQiApIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC52c3ViKCBib2R5QS5zdGF0ZS52ZWwgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnZzdWIoIHRtcC5jbG9uZShyQSkucGVycCgpLm11bHQoIGFuZ1ZlbEEgKSApXG4gICAgICAgICAgICAgICAgLy8gYnJlYWsgdXAgY29tcG9uZW50cyBhbG9uZyBub3JtYWwgYW5kIHBlcnAtbm9ybWFsIGRpcmVjdGlvbnNcbiAgICAgICAgICAgICAgICAsckFwcm9qID0gckEucHJvaiggbiApXG4gICAgICAgICAgICAgICAgLHJBcmVnID0gckEucHJvaiggcGVycCApXG4gICAgICAgICAgICAgICAgLHJCcHJvaiA9IHJCLnByb2ooIG4gKVxuICAgICAgICAgICAgICAgICxyQnJlZyA9IHJCLnByb2ooIHBlcnAgKVxuICAgICAgICAgICAgICAgICx2cHJvaiA9IHZBQi5wcm9qKCBuICkgLy8gcHJvamVjdGlvbiBvZiB2QUIgYWxvbmcgblxuICAgICAgICAgICAgICAgICx2cmVnID0gdkFCLnByb2ooIHBlcnAgKSAvLyByZWplY3Rpb24gb2YgdkFCIGFsb25nIG4gKHBlcnAgb2YgcHJvailcbiAgICAgICAgICAgICAgICAsaW1wdWxzZVxuICAgICAgICAgICAgICAgICxzaWduXG4gICAgICAgICAgICAgICAgLG1heFxuICAgICAgICAgICAgICAgICxyYXRpb1xuICAgICAgICAgICAgICAgICxpbkNvbnRhY3QgPSBjb250YWN0XG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBpZiAoIGNvbnRhY3QgKXtcblxuICAgICAgICAgICAgICAgIGlmICggZml4ZWRBICl7XG5cbiAgICAgICAgICAgICAgICAgICAgY2xhbXBNVFYoIGJvZHlCLl9tdHZUb3RhbCwgbXR2LCB0bXAgKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keUIuX210dlRvdGFsLnZhZGQoIHRtcCApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggZml4ZWRCICl7XG5cbiAgICAgICAgICAgICAgICAgICAgY2xhbXBNVFYoIGJvZHlBLl9tdHZUb3RhbCwgbXR2Lm5lZ2F0ZSgpLCB0bXAgKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keUEuX210dlRvdGFsLnZhZGQoIHRtcCApO1xuICAgICAgICAgICAgICAgICAgICBtdHYubmVnYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHJhdGlvID0gMC41OyAvL2JvZHlBLm1hc3MgLyAoIGJvZHlBLm1hc3MgKyBib2R5Qi5tYXNzICk7XG4gICAgICAgICAgICAgICAgICAgIG10di5tdWx0KCByYXRpbyApO1xuICAgICAgICAgICAgICAgICAgICBjbGFtcE1UViggYm9keUIuX210dlRvdGFsLCBtdHYsIHRtcCApO1xuICAgICAgICAgICAgICAgICAgICBib2R5Qi5fbXR2VG90YWwudmFkZCggdG1wICk7XG5cbiAgICAgICAgICAgICAgICAgICAgbXR2LmNsb25lKCBtdHJhbnMgKS5tdWx0KCByYXRpbyAtIDEgKTtcbiAgICAgICAgICAgICAgICAgICAgY2xhbXBNVFYoIGJvZHlBLl9tdHZUb3RhbCwgbXR2LCB0bXAgKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keUEuX210dlRvdGFsLnZhZGQoIHRtcCApO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBtb3ZpbmcgYXdheSBmcm9tIGVhY2ggb3RoZXIuLi4gZG9uJ3QgYm90aGVyLlxuICAgICAgICAgICAgaWYgKHZwcm9qID49IDApe1xuICAgICAgICAgICAgICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW52TW9pQSA9IGludk1vaUEgPT09IEluZmluaXR5ID8gMCA6IGludk1vaUE7XG4gICAgICAgICAgICBpbnZNb2lCID0gaW52TW9pQiA9PT0gSW5maW5pdHkgPyAwIDogaW52TW9pQjtcblxuICAgICAgICAgICAgaW1wdWxzZSA9ICAtICgoMSArIGNvcikgKiB2cHJvaikgLyAoIGludk1hc3NBICsgaW52TWFzc0IgKyAoaW52TW9pQSAqIHJBcmVnICogckFyZWcpICsgKGludk1vaUIgKiByQnJlZyAqIHJCcmVnKSApO1xuICAgICAgICAgICAgLy8gdnByb2ogKz0gaW1wdWxzZSAqICggaW52TWFzcyArIChpbnZNb2kgKiBycmVnICogcnJlZykgKTtcbiAgICAgICAgICAgIC8vIGFuZ1ZlbCAtPSBpbXB1bHNlICogcnJlZyAqIGludk1vaTtcblxuXG4gICAgICAgICAgICBpZiAoIGZpeGVkQSApe1xuXG4gICAgICAgICAgICAgICAgLy8gYXBwbHkgaW1wdWxzZVxuICAgICAgICAgICAgICAgIGJvZHlCLnN0YXRlLnZlbC52YWRkKCBuLm11bHQoIGltcHVsc2UgKiBpbnZNYXNzQiApICk7XG4gICAgICAgICAgICAgICAgYm9keUIuc3RhdGUuYW5ndWxhci52ZWwgLT0gaW1wdWxzZSAqIGludk1vaUIgKiByQnJlZztcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggZml4ZWRCICl7XG5cbiAgICAgICAgICAgICAgICAvLyBhcHBseSBpbXB1bHNlXG4gICAgICAgICAgICAgICAgYm9keUEuc3RhdGUudmVsLnZzdWIoIG4ubXVsdCggaW1wdWxzZSAqIGludk1hc3NBICkgKTtcbiAgICAgICAgICAgICAgICBib2R5QS5zdGF0ZS5hbmd1bGFyLnZlbCArPSBpbXB1bHNlICogaW52TW9pQSAqIHJBcmVnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gYXBwbHkgaW1wdWxzZVxuICAgICAgICAgICAgICAgIGJvZHlCLnN0YXRlLnZlbC52YWRkKCBuLm11bHQoIGltcHVsc2UgKiBpbnZNYXNzQiApICk7XG4gICAgICAgICAgICAgICAgYm9keUIuc3RhdGUuYW5ndWxhci52ZWwgLT0gaW1wdWxzZSAqIGludk1vaUIgKiByQnJlZztcbiAgICAgICAgICAgICAgICBib2R5QS5zdGF0ZS52ZWwudnN1Yiggbi5tdWx0KCBpbnZNYXNzQSAqIGJvZHlCLm1hc3MgKSApO1xuICAgICAgICAgICAgICAgIGJvZHlBLnN0YXRlLmFuZ3VsYXIudmVsICs9IGltcHVsc2UgKiBpbnZNb2lBICogckFyZWc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGluQ29udGFjdCA9IChpbXB1bHNlIDwgMC4wMDQpO1xuXG4gICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIGZyaWN0aW9uIGFuZCBhIHJlbGF0aXZlIHZlbG9jaXR5IHBlcnBlbmRpY3VsYXIgdG8gdGhlIG5vcm1hbFxuICAgICAgICAgICAgaWYgKCBjb2YgJiYgdnJlZyApe1xuXG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBoZXJlLCB3ZSBjb3VsZCBmaXJzdCBhc3N1bWUgc3RhdGljIGZyaWN0aW9uIGFwcGxpZXNcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhhdCB0aGUgdGFuZ2VudGlhbCByZWxhdGl2ZSB2ZWxvY2l0eSBpcyB6ZXJvLlxuICAgICAgICAgICAgICAgIC8vIFRoZW4gd2UgY291bGQgY2FsY3VsYXRlIHRoZSBpbXB1bHNlIGFuZCBjaGVjayBpZiB0aGVcbiAgICAgICAgICAgICAgICAvLyB0YW5nZW50aWFsIGltcHVsc2UgaXMgbGVzcyB0aGFuIHRoYXQgYWxsb3dlZCBieSBzdGF0aWNcbiAgICAgICAgICAgICAgICAvLyBmcmljdGlvbi4gSWYgbm90LCBfdGhlbl8gYXBwbHkga2luZXRpYyBmcmljdGlvbi5cblxuICAgICAgICAgICAgICAgIC8vIGluc3RlYWQgd2UncmUganVzdCBhcHBseWluZyBraW5ldGljIGZyaWN0aW9uIGFuZCBtYWtpbmdcbiAgICAgICAgICAgICAgICAvLyBzdXJlIHRoZSBpbXB1bHNlIHdlIGFwcGx5IGlzIGxlc3MgdGhhbiB0aGUgbWF4aW11bVxuICAgICAgICAgICAgICAgIC8vIGFsbG93ZWQgYW1vdW50XG5cbiAgICAgICAgICAgICAgICAvLyBtYXhpbXVtIGltcHVsc2UgYWxsb3dlZCBieSBraW5ldGljIGZyaWN0aW9uXG4gICAgICAgICAgICAgICAgbWF4ID0gTWF0aC5hYnModnJlZykgLyAoIGludk1hc3NBICsgaW52TWFzc0IgKyAoaW52TW9pQSAqIHJBcHJvaiAqIHJBcHJvaikgKyAoaW52TW9pQiAqIHJCcHJvaiAqIHJCcHJvaikgKTtcbiAgICAgICAgICAgICAgICAvLyB0aGUgc2lnbiBvZiB2cmVnICggcGx1cyBvciBtaW51cyAxIClcbiAgICAgICAgICAgICAgICBzaWduID0gdnJlZyA8IDAgPyAtMSA6IDE7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgaW1wdWxzZSBkdWUgdG8gZnJpY3Rpb25cbiAgICAgICAgICAgICAgICBpbXB1bHNlID0gY29mICogTWF0aC5hYnMoIGltcHVsc2UgKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdHJhaW4gdGhlIGltcHVsc2Ugd2l0aGluIHRoZSBcImZyaWN0aW9uIGNvbmVcIiAoIG1heCA8IG11ICogaW1wdWxzZSlcbiAgICAgICAgICAgICAgICBpbXB1bHNlID0gTWF0aC5taW4oIGltcHVsc2UsIG1heCApO1xuICAgICAgICAgICAgICAgIGltcHVsc2UgKj0gc2lnbjtcblxuICAgICAgICAgICAgICAgIGlmICggZml4ZWRBICl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXBwbHkgZnJpY3Rpb25hbCBpbXB1bHNlXG4gICAgICAgICAgICAgICAgICAgIGJvZHlCLnN0YXRlLnZlbC52c3ViKCBwZXJwLm11bHQoIGltcHVsc2UgKiBpbnZNYXNzQiApICk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlCLnN0YXRlLmFuZ3VsYXIudmVsIC09IGltcHVsc2UgKiBpbnZNb2lCICogckJwcm9qO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggZml4ZWRCICl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXBwbHkgZnJpY3Rpb25hbCBpbXB1bHNlXG4gICAgICAgICAgICAgICAgICAgIGJvZHlBLnN0YXRlLnZlbC52YWRkKCBwZXJwLm11bHQoIGltcHVsc2UgKiBpbnZNYXNzQSApICk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlBLnN0YXRlLmFuZ3VsYXIudmVsICs9IGltcHVsc2UgKiBpbnZNb2lBICogckFwcm9qO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhcHBseSBmcmljdGlvbmFsIGltcHVsc2VcbiAgICAgICAgICAgICAgICAgICAgYm9keUIuc3RhdGUudmVsLnZzdWIoIHBlcnAubXVsdCggaW1wdWxzZSAqIGludk1hc3NCICkgKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keUIuc3RhdGUuYW5ndWxhci52ZWwgLT0gaW1wdWxzZSAqIGludk1vaUIgKiByQnByb2o7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlBLnN0YXRlLnZlbC52YWRkKCBwZXJwLm11bHQoIGludk1hc3NBICogYm9keUIubWFzcyApICk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlBLnN0YXRlLmFuZ3VsYXIudmVsICs9IGltcHVsc2UgKiBpbnZNb2lBICogckFwcm9qO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gd2FrZSB1cCBib2RpZXMgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAoIGJvZHlBLnNsZWVwKCkgKXtcbiAgICAgICAgICAgICAgICBib2R5QS5zbGVlcENoZWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIGJvZHlCLnNsZWVwKCkgKXtcbiAgICAgICAgICAgICAgICBib2R5Qi5zbGVlcENoZWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGludGVybmFsXG4gICAgICAgIF9wdXNoVW5pcTogZnVuY3Rpb24oIGJvZHkgKXtcbiAgICAgICAgICAgIHZhciBpZHggPSBQaHlzaWNzLnV0aWwuc29ydGVkSW5kZXgoIHRoaXMuX2JvZHlMaXN0LCBib2R5LCBnZXRVaWQgKTtcbiAgICAgICAgICAgIGlmICggdGhpcy5fYm9keUxpc3RbIGlkeCBdICE9PSBib2R5ICl7XG4gICAgICAgICAgICAgICAgdGhpcy5fYm9keUxpc3Quc3BsaWNlKCBpZHgsIDAsIGJvZHkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogQm9keUltcHVsc2VSZXNwb25zZUJlaGF2aW9yI3Jlc3BvbmQoIGRhdGEgKVxuICAgICAgICAgKiAtIGRhdGEgKE9iamVjdCk6IGV2ZW50IGRhdGFcbiAgICAgICAgICpcbiAgICAgICAgICogRXZlbnQgY2FsbGJhY2sgdG8gcmVzcG9uZCB0byBjb2xsaXNpb24gZGF0YS5cbiAgICAgICAgICoqL1xuICAgICAgICByZXNwb25kOiBmdW5jdGlvbiggZGF0YSApe1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICAsY29sXG4gICAgICAgICAgICAgICAgLGNvbGxpc2lvbnMgPSBkYXRhLmNvbGxpc2lvbnMvLyBQaHlzaWNzLnV0aWwuc2h1ZmZsZShkYXRhLmNvbGxpc2lvbnMpXG4gICAgICAgICAgICAgICAgLGksbCxiXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBmb3IgKCBpID0gMCwgbCA9IGNvbGxpc2lvbnMubGVuZ3RoOyBpIDwgbDsgKytpICl7XG5cbiAgICAgICAgICAgICAgICBjb2wgPSBjb2xsaXNpb25zWyBpIF07XG4gICAgICAgICAgICAgICAgLy8gYWRkIGJvZGllcyB0byBsaXN0IGZvciBsYXRlclxuICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hVbmlxKCBjb2wuYm9keUEgKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wdXNoVW5pcSggY29sLmJvZHlCICk7XG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIHRoZXkgaGF2ZSBtdHYgc3RhdCB2ZWN0b3JzXG4gICAgICAgICAgICAgICAgY29sLmJvZHlBLl9tdHZUb3RhbCA9IGNvbC5ib2R5QS5fbXR2VG90YWwgfHwgbmV3IFBoeXNpY3MudmVjdG9yKCk7XG4gICAgICAgICAgICAgICAgY29sLmJvZHlCLl9tdHZUb3RhbCA9IGNvbC5ib2R5Qi5fbXR2VG90YWwgfHwgbmV3IFBoeXNpY3MudmVjdG9yKCk7XG4gICAgICAgICAgICAgICAgY29sLmJvZHlBLl9vbGRtdHZUb3RhbCA9IGNvbC5ib2R5QS5fb2xkbXR2VG90YWwgfHwgbmV3IFBoeXNpY3MudmVjdG9yKCk7XG4gICAgICAgICAgICAgICAgY29sLmJvZHlCLl9vbGRtdHZUb3RhbCA9IGNvbC5ib2R5Qi5fb2xkbXR2VG90YWwgfHwgbmV3IFBoeXNpY3MudmVjdG9yKCk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmNvbGxpZGVCb2RpZXMoXG4gICAgICAgICAgICAgICAgICAgIGNvbC5ib2R5QSxcbiAgICAgICAgICAgICAgICAgICAgY29sLmJvZHlCLFxuICAgICAgICAgICAgICAgICAgICBjb2wubm9ybSxcbiAgICAgICAgICAgICAgICAgICAgY29sLnBvcyxcbiAgICAgICAgICAgICAgICAgICAgY29sLm10dixcbiAgICAgICAgICAgICAgICAgICAgY29sLmNvbGxpZGVkUHJldmlvdXNseVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IG10diB2ZWN0b3JzIGZyb20gdGhlIGF2ZXJhZ2UgbXR2IHZlY3RvclxuICAgICAgICAgICAgZm9yICggaSA9IDAsIGwgPSB0aGlzLl9ib2R5TGlzdC5sZW5ndGg7IGkgPCBsOyArK2kgKXtcbiAgICAgICAgICAgICAgICBiID0gdGhpcy5fYm9keUxpc3QucG9wKCk7XG4gICAgICAgICAgICAgICAgLy8gY2xhbXBNVFYoIGIuX29sZG10dlRvdGFsLCBiLl9tdHZUb3RhbCwgYi5fbXR2VG90YWwgKTtcblxuICAgICAgICAgICAgICAgIGlmICggYi5fbXR2VG90YWwubm9ybVNxKCkgPCB0aGlzLm9wdGlvbnMubXR2VGhyZXNob2xkICl7XG4gICAgICAgICAgICAgICAgICAgIGIuX210dlRvdGFsLm11bHQoIHRoaXMub3B0aW9ucy5ib2R5RXh0cmFjdERyb3BvZmYgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLm9wdGlvbnMuZm9yY2VXYWtldXBBYm92ZU92ZXJsYXBUaHJlc2hvbGQgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdha2UgdXAgYm9kaWVzIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgICAgICAgICBiLnNsZWVwKCBmYWxzZSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGIuc3RhdGUucG9zLnZhZGQoIGIuX210dlRvdGFsICk7XG4gICAgICAgICAgICAgICAgYi5zdGF0ZS5vbGQucG9zLnZhZGQoIGIuX210dlRvdGFsICk7XG4gICAgICAgICAgICAgICAgYi5fb2xkbXR2VG90YWwuc3dhcCggYi5fbXR2VG90YWwgKTtcbiAgICAgICAgICAgICAgICBiLl9tdHZUb3RhbC56ZXJvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9iZWhhdmlvcnMvY29uc3RhbnQtYWNjZWxlcmF0aW9uLmpzXG5cbi8qKiBcbiAqIGNsYXNzIENvbnN0YW50QWNjZWxlcmF0aW9uQmVoYXZpb3IgPCBCZWhhdmlvclxuICpcbiAqIGBQaHlzaWNzLmJlaGF2aW9yKCdjb25zdGFudC1hY2NlbGVyYXRpb24nKWAuXG4gKlxuICogQ29uc3RhbnQgYWNjZWxlcmF0aW9uIGJlaGF2aW9yLlxuICpcbiAqIEJhc2ljYWxseSB0aGUgXCJncmF2aXR5XCIgYmVoYXZpb3IuIFVzZWQgdG8gZ2l2ZSBcImVhcnRoLWxpa2UgZ3Jhdml0eVwiIHRvIHRoZSB3b3JsZC5cbiAqXG4gKiBBZGRpdGlvbmFsIG9wdGlvbnMgaW5jbHVkZTpcbiAqIC0gYWNjOiBUaGUgYWNjZWxlcmF0aW9uIHZlY3RvciAoVmVjdG9yaXNoKS4gKGRlZmF1bHQ6IGB7IHg6IDAsIHk6IDAuMDAwNCB9YClcbiAqKi9cblBoeXNpY3MuYmVoYXZpb3IoJ2NvbnN0YW50LWFjY2VsZXJhdGlvbicsIGZ1bmN0aW9uKCBwYXJlbnQgKXtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcblxuICAgICAgICBhY2M6IHsgeCA6IDAsIHk6IDAuMDAwNCB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgcGFyZW50LmluaXQuY2FsbCggdGhpcyApO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRlZmF1bHRzKCBkZWZhdWx0cyApO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zKCBvcHRpb25zICk7XG5cbiAgICAgICAgICAgIC8vIGV4dGVuZCBvcHRpb25zXG4gICAgICAgICAgICB0aGlzLl9hY2MgPSBuZXcgUGh5c2ljcy52ZWN0b3IoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0QWNjZWxlcmF0aW9uKCB0aGlzLm9wdGlvbnMuYWNjICk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5vcHRpb25zLmFjYztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RhbnRBY2NlbGVyYXRpb25CZWhhdmlvciNzZXRBY2NlbGVyYXRpb24oIGFjYyApIC0+IHRoaXNcbiAgICAgICAgICogLSBhY2MgKFZlY3RvcmlzaCk6IFRoZSBhY2NlbGVyYXRpb24gdmVjdG9yXG4gICAgICAgICAqIFxuICAgICAgICAgKiBTZXQgdGhlIGFjY2VsZXJhdGlvbiBvZiB0aGUgYmVoYXZpb3IuXG4gICAgICAgICAqKi9cbiAgICAgICAgc2V0QWNjZWxlcmF0aW9uOiBmdW5jdGlvbiggYWNjICl7XG5cbiAgICAgICAgICAgIHRoaXMuX2FjYy5jbG9uZSggYWNjICk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBiZWhhdmU6IGZ1bmN0aW9uKCBkYXRhICl7XG5cbiAgICAgICAgICAgIHZhciBib2RpZXMgPSB0aGlzLmdldFRhcmdldHMoKTtcblxuICAgICAgICAgICAgZm9yICggdmFyIGkgPSAwLCBsID0gYm9kaWVzLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJvZGllc1sgaSBdLmFjY2VsZXJhdGUoIHRoaXMuX2FjYyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL2JlaGF2aW9ycy9lZGdlLWNvbGxpc2lvbi1kZXRlY3Rpb24uanNcblxuLyoqXG4gKiBjbGFzcyBFZGdlQ29sbGlzaW9uRGV0ZWN0aW9uQmVoYXZpb3IgPCBCZWhhdmlvclxuICpcbiAqIGBQaHlzaWNzLmJlaGF2aW9yKCdlZGdlLWNvbGxpc2lvbi1kZXRlY3Rpb24nKWAuXG4gKlxuICogVXNlZCB0byBkZXRlY3QgY29sbGlzaW9ucyB3aXRoIHRoZSBib3VuZGFyaWVzIG9mIGFuIEFBQkIuXG4gKlxuICogQWRkaXRpb25hbCBvcHRpb25zIGluY2x1ZGU6XG4gKiAtIGFhYmI6IFRoZSBbW1BoeXNpY3MuYWFiYl1dIGJvdW5kcyB0byB1c2UgYXMgdGhlIGNvbnN0cmFpbmluZyBib3VuZGFyeVxuICogLSByZXN0aXR1dGlvbjogVGhlIHJlc3RpdHV0aW9uIG9mIHRoZSBib3VuZGFyeSB3YWxscyAoZGVmYXVsdDogYDAuOTlgKVxuICogLSBjb2Y6IFRoZSBjb2VmZmljaWVudCBvZiBmcmljdGlvbiBvZiB0aGUgYm91bmRhcnkgd2FsbHMgKGRlZmF1bHQ6IGAxYClcbiAqIC0gY2hhbm5lbDogVGhlIGNoYW5uZWwgdG8gcHVibGlzaCBjb2xsaXNpb25zIHRvLiAoZGVmYXVsdDogJ2NvbGxpc2lvbnM6ZGV0ZWN0ZWQnKVxuICoqL1xuUGh5c2ljcy5iZWhhdmlvcignZWRnZS1jb2xsaXNpb24tZGV0ZWN0aW9uJywgZnVuY3Rpb24oIHBhcmVudCApe1xuXG4gICAgLypcbiAgICAgKiBjaGVja0dlbmVyYWwoIGJvZHksIGJvdW5kcywgZHVtbXkgKSAtPiBBcnJheVxuICAgICAqIC0gYm9keSAoQm9keSk6IFRoZSBib2R5IHRvIGNoZWNrXG4gICAgICogLSBib3VuZHMgKFBoeXNpY3MuYWFiYik6IFRoZSBib3VuZGFyeVxuICAgICAqIC0gZHVtbXk6IChCb2R5KTogVGhlIGR1bW15IGJvZHkgdG8gcHVibGlzaCBhcyB0aGUgc3RhdGljIG90aGVyIGJvZHkgaXQgY29sbGlkZXMgd2l0aFxuICAgICAqICsgKEFycmF5KTogVGhlIGNvbGxpc2lvbiBkYXRhXG4gICAgICpcbiAgICAgKiBDaGVjayBpZiBhIGJvZHkgY29sbGlkZXMgd2l0aCB0aGUgYm91bmRhcnlcbiAgICAgKi9cbiAgICB2YXIgY2hlY2tHZW5lcmFsID0gZnVuY3Rpb24gY2hlY2tHZW5lcmFsKCBib2R5LCBib3VuZHMsIGR1bW15ICl7XG5cbiAgICAgICAgdmFyIG92ZXJsYXBcbiAgICAgICAgICAgICxhYWJiID0gYm9keS5hYWJiKClcbiAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICxvZmZzZXQgPSBib2R5LmdldEdsb2JhbE9mZnNldCggc2NyYXRjaC52ZWN0b3IoKSApXG4gICAgICAgICAgICAsdHJhbnMgPSBzY3JhdGNoLnRyYW5zZm9ybSgpXG4gICAgICAgICAgICAsZGlyID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgLHJlc3VsdCA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICxjb2xsaXNpb24gPSBmYWxzZVxuICAgICAgICAgICAgLGNvbGxpc2lvbnMgPSBbXVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIC8vIHJpZ2h0XG4gICAgICAgIG92ZXJsYXAgPSAoYWFiYi54ICsgYWFiYi5odykgLSBib3VuZHMubWF4Lng7XG5cbiAgICAgICAgaWYgKCBvdmVybGFwID49IDAgKXtcblxuICAgICAgICAgICAgZGlyLnNldCggMSwgMCApLnJvdGF0ZUludiggdHJhbnMuc2V0Um90YXRpb24oIGJvZHkuc3RhdGUuYW5ndWxhci5wb3MgKSApO1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgYm9keUE6IGJvZHksXG4gICAgICAgICAgICAgICAgYm9keUI6IGR1bW15LFxuICAgICAgICAgICAgICAgIG92ZXJsYXA6IG92ZXJsYXAsXG4gICAgICAgICAgICAgICAgbm9ybToge1xuICAgICAgICAgICAgICAgICAgICB4OiAxLFxuICAgICAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtdHY6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogb3ZlcmxhcCxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zOiBib2R5Lmdlb21ldHJ5LmdldEZhcnRoZXN0SHVsbFBvaW50KCBkaXIsIHJlc3VsdCApLnJvdGF0ZSggdHJhbnMgKS52YWRkKCBvZmZzZXQgKS52YWx1ZXMoKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoKGNvbGxpc2lvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBib3R0b21cbiAgICAgICAgb3ZlcmxhcCA9IChhYWJiLnkgKyBhYWJiLmhoKSAtIGJvdW5kcy5tYXgueTtcblxuICAgICAgICBpZiAoIG92ZXJsYXAgPj0gMCApe1xuXG4gICAgICAgICAgICBkaXIuc2V0KCAwLCAxICkucm90YXRlSW52KCB0cmFucy5zZXRSb3RhdGlvbiggYm9keS5zdGF0ZS5hbmd1bGFyLnBvcyApICk7XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBib2R5QTogYm9keSxcbiAgICAgICAgICAgICAgICBib2R5QjogZHVtbXksXG4gICAgICAgICAgICAgICAgb3ZlcmxhcDogb3ZlcmxhcCxcbiAgICAgICAgICAgICAgICBub3JtOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgIHk6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG10djoge1xuICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICB5OiBvdmVybGFwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3M6IGJvZHkuZ2VvbWV0cnkuZ2V0RmFydGhlc3RIdWxsUG9pbnQoIGRpciwgcmVzdWx0ICkucm90YXRlKCB0cmFucyApLnZhZGQoIG9mZnNldCApLnZhbHVlcygpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb2xsaXNpb25zLnB1c2goY29sbGlzaW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxlZnRcbiAgICAgICAgb3ZlcmxhcCA9IGJvdW5kcy5taW4ueCAtIChhYWJiLnggLSBhYWJiLmh3KTtcblxuICAgICAgICBpZiAoIG92ZXJsYXAgPj0gMCApe1xuXG4gICAgICAgICAgICBkaXIuc2V0KCAtMSwgMCApLnJvdGF0ZUludiggdHJhbnMuc2V0Um90YXRpb24oIGJvZHkuc3RhdGUuYW5ndWxhci5wb3MgKSApO1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgYm9keUE6IGJvZHksXG4gICAgICAgICAgICAgICAgYm9keUI6IGR1bW15LFxuICAgICAgICAgICAgICAgIG92ZXJsYXA6IG92ZXJsYXAsXG4gICAgICAgICAgICAgICAgbm9ybToge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMSxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbXR2OiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC1vdmVybGFwLFxuICAgICAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3M6IGJvZHkuZ2VvbWV0cnkuZ2V0RmFydGhlc3RIdWxsUG9pbnQoIGRpciwgcmVzdWx0ICkucm90YXRlKCB0cmFucyApLnZhZGQoIG9mZnNldCApLnZhbHVlcygpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb2xsaXNpb25zLnB1c2goY29sbGlzaW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvcFxuICAgICAgICBvdmVybGFwID0gYm91bmRzLm1pbi55IC0gKGFhYmIueSAtIGFhYmIuaGgpO1xuXG4gICAgICAgIGlmICggb3ZlcmxhcCA+PSAwICl7XG5cbiAgICAgICAgICAgIGRpci5zZXQoIDAsIC0xICkucm90YXRlSW52KCB0cmFucy5zZXRSb3RhdGlvbiggYm9keS5zdGF0ZS5hbmd1bGFyLnBvcyApICk7XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBib2R5QTogYm9keSxcbiAgICAgICAgICAgICAgICBib2R5QjogZHVtbXksXG4gICAgICAgICAgICAgICAgb3ZlcmxhcDogb3ZlcmxhcCxcbiAgICAgICAgICAgICAgICBub3JtOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0xXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtdHY6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLW92ZXJsYXBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvczogYm9keS5nZW9tZXRyeS5nZXRGYXJ0aGVzdEh1bGxQb2ludCggZGlyLCByZXN1bHQgKS5yb3RhdGUoIHRyYW5zICkudmFkZCggb2Zmc2V0ICkudmFsdWVzKClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaChjb2xsaXNpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIHJldHVybiBjb2xsaXNpb25zO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIGNoZWNrRWRnZUNvbGxpZGUoIGJvZHksIGJvdW5kcywgZHVtbXkgKSAtPiBBcnJheVxuICAgICAqIC0gYm9keSAoQm9keSk6IFRoZSBib2R5IHRvIGNoZWNrXG4gICAgICogLSBib3VuZHMgKFBoeXNpY3MuYWFiYik6IFRoZSBib3VuZGFyeVxuICAgICAqIC0gZHVtbXk6IChCb2R5KTogVGhlIGR1bW15IGJvZHkgdG8gcHVibGlzaCBhcyB0aGUgc3RhdGljIG90aGVyIGJvZHkgaXQgY29sbGlkZXMgd2l0aFxuICAgICAqICsgKEFycmF5KTogVGhlIGNvbGxpc2lvbiBkYXRhXG4gICAgICpcbiAgICAgKiBDaGVjayBpZiBhIGJvZHkgY29sbGlkZXMgd2l0aCB0aGUgYm91bmRhcnlcbiAgICAgKi9cbiAgICB2YXIgY2hlY2tFZGdlQ29sbGlkZSA9IGZ1bmN0aW9uIGNoZWNrRWRnZUNvbGxpZGUoIGJvZHksIGJvdW5kcywgZHVtbXkgKXtcblxuICAgICAgICByZXR1cm4gY2hlY2tHZW5lcmFsKCBib2R5LCBib3VuZHMsIGR1bW15ICk7XG4gICAgfTtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcblxuICAgICAgICBhYWJiOiBudWxsLFxuICAgICAgICByZXN0aXR1dGlvbjogMC45OSxcbiAgICAgICAgY29mOiAxLjAsXG4gICAgICAgIGNoYW5uZWw6ICdjb2xsaXNpb25zOmRldGVjdGVkJ1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwoIHRoaXMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0cyggZGVmYXVsdHMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyggb3B0aW9ucyApO1xuXG4gICAgICAgICAgICB0aGlzLnNldEFBQkIoIHRoaXMub3B0aW9ucy5hYWJiICk7XG4gICAgICAgICAgICB0aGlzLnJlc3RpdHV0aW9uID0gdGhpcy5vcHRpb25zLnJlc3RpdHV0aW9uO1xuXG4gICAgICAgICAgICB0aGlzLmJvZHkgPSBQaHlzaWNzLmJvZHkoJ3BvaW50Jywge1xuICAgICAgICAgICAgICAgIHRyZWF0bWVudDogJ3N0YXRpYycsXG4gICAgICAgICAgICAgICAgcmVzdGl0dXRpb246IHRoaXMub3B0aW9ucy5yZXN0aXR1dGlvbixcbiAgICAgICAgICAgICAgICBjb2Y6IHRoaXMub3B0aW9ucy5jb2ZcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFZGdlQ29sbGlzaW9uRGV0ZWN0aW9uQmVoYXZpb3Ijc2V0QUFCQiggYWFiYiApIC0+IHRoaXNcbiAgICAgICAgICogLSBhYWJiIChQaHlzaWNzLmFhYmIpOiBUaGUgYWFiYiB0byB1c2UgYXMgdGhlIGJvdW5kYXJ5XG4gICAgICAgICAqXG4gICAgICAgICAqIFNldCB0aGUgYm91bmRhcmllcyBvZiB0aGUgZWRnZS5cbiAgICAgICAgICoqL1xuICAgICAgICBzZXRBQUJCOiBmdW5jdGlvbiggYWFiYiApe1xuXG4gICAgICAgICAgICBpZiAoIWFhYmIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnRXJyb3I6IGFhYmIgbm90IHNldCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2VkZ2VzID0ge1xuICAgICAgICAgICAgICAgIG1pbjoge1xuICAgICAgICAgICAgICAgICAgICB4OiAoYWFiYi54IC0gYWFiYi5odyksXG4gICAgICAgICAgICAgICAgICAgIHk6IChhYWJiLnkgLSBhYWJiLmhoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWF4OiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IChhYWJiLnggKyBhYWJiLmh3KSxcbiAgICAgICAgICAgICAgICAgICAgeTogKGFhYmIueSArIGFhYmIuaGgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgY29ubmVjdDogZnVuY3Rpb24oIHdvcmxkICl7XG5cbiAgICAgICAgICAgIHdvcmxkLm9uKCAnaW50ZWdyYXRlOnBvc2l0aW9ucycsIHRoaXMuY2hlY2tBbGwsIHRoaXMsIDIgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBkaXNjb25uZWN0OiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgd29ybGQub2ZmKCAnaW50ZWdyYXRlOnBvc2l0aW9ucycsIHRoaXMuY2hlY2tBbGwsIHRoaXMsIDIgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogRWRnZUNvbGxpc2lvbkRldGVjdGlvbkJlaGF2aW9yI2NoZWNrQWxsKCBkYXRhIClcbiAgICAgICAgICogLSBkYXRhIChPYmplY3QpOiBFdmVudCBkYXRhXG4gICAgICAgICAqXG4gICAgICAgICAqIEV2ZW50IGNhbGxiYWNrIHRvIGNoZWNrIGFsbCBib2RpZXMgZm9yIGNvbGxpc2lvbnMgd2l0aCB0aGUgZWRnZVxuICAgICAgICAgKiovXG4gICAgICAgIGNoZWNrQWxsOiBmdW5jdGlvbiggZGF0YSApe1xuXG4gICAgICAgICAgICB2YXIgYm9kaWVzID0gdGhpcy5nZXRUYXJnZXRzKClcbiAgICAgICAgICAgICAgICAsZHQgPSBkYXRhLmR0XG4gICAgICAgICAgICAgICAgLGJvZHlcbiAgICAgICAgICAgICAgICAsY29sbGlzaW9ucyA9IFtdXG4gICAgICAgICAgICAgICAgLHJldFxuICAgICAgICAgICAgICAgICxib3VuZHMgPSB0aGlzLl9lZGdlc1xuICAgICAgICAgICAgICAgICxkdW1teSA9IHRoaXMuYm9keVxuICAgICAgICAgICAgICAgICxwcmV2Q29udGFjdHMgPSB0aGlzLnByZXZDb250YWN0cyB8fCB7fVxuICAgICAgICAgICAgICAgICxjb250YWN0TGlzdCA9IHt9XG4gICAgICAgICAgICAgICAgLHBhaXJIYXNoID0gUGh5c2ljcy51dGlsLnBhaXJIYXNoXG4gICAgICAgICAgICAgICAgLGhhc2hcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGJvZGllcy5sZW5ndGg7IGkgPCBsOyBpKysgKXtcblxuICAgICAgICAgICAgICAgIGJvZHkgPSBib2RpZXNbIGkgXTtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgZGV0ZWN0IGR5bmFtaWMgYm9kaWVzXG4gICAgICAgICAgICAgICAgaWYgKCBib2R5LnRyZWF0bWVudCA9PT0gJ2R5bmFtaWMnICl7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gY2hlY2tFZGdlQ29sbGlkZSggYm9keSwgYm91bmRzLCBkdW1teSApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggcmV0ICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNoID0gcGFpckhhc2goIGJvZHkudWlkLCBkdW1teS51aWQgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggdmFyIGogPSAwLCBsbCA9IHJldC5sZW5ndGg7IGogPCBsbDsgaisrICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdExpc3RbIGhhc2ggXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0WyBqIF0uY29sbGlkZWRQcmV2aW91c2x5ID0gcHJldkNvbnRhY3RzWyBoYXNoIF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaC5hcHBseSggY29sbGlzaW9ucywgcmV0ICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJldkNvbnRhY3RzID0gY29udGFjdExpc3Q7XG5cbiAgICAgICAgICAgIGlmICggY29sbGlzaW9ucy5sZW5ndGggKXtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3dvcmxkLmVtaXQoIHRoaXMub3B0aW9ucy5jaGFubmVsLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnM6IGNvbGxpc2lvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbn0pO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvYmVoYXZpb3JzL2ludGVyYWN0aXZlLmpzXG5cbi8qKlxuICogY2xhc3MgSW50ZXJhY3RpdmVCZWhhdmlvciA8IEJlaGF2aW9yXG4gKlxuICogYFBoeXNpY3MuYmVoYXZpb3IoJ2ludGVyYWN0aXZlJylgLlxuICpcbiAqIFVzZXIgaW50ZXJhY3Rpb24gaGVscGVyLlxuICpcbiAqIFVzZWQgdG8gZ2V0IG1vdXNlL3RvdWNoIGV2ZW50cyBhbmQgYWRkIGdyYWIgaW50ZXJhY3Rpb25zLlxuICpcbiAqIEFkZGl0aW9uYWwgb3B0aW9ucyBpbmNsdWRlOlxuICogLSBlbDogVGhlIGVsZW1lbnQgb2YgdGhlIHJlbmRlcmVyLiBXaGF0IHlvdSBpbnB1dCBhcyB0aGUgYGVsYCBmb3IgdGhlIHJlbmRlcmVyLlxuICogLSBtb3ZlVGhyb3R0bGU6IFRoZSBtaW4gdGltZSBiZXR3ZWVuIG1vdmUgZXZlbnRzIChkZWZhdWx0OiBgMTBgKS5cbiAqIC0gbWluVmVsOiBUaGUgbWluaW11bSB2ZWxvY2l0eSBjbGFtcCBbW1ZlY3RvcmlzaF1dIChkZWZhdWx0OiB7IHg6IC01LCB5OiAtNSB9KSB0byByZXN0cmljdCB2ZWxvY2l0eSBhIHVzZXIgY2FuIGdpdmUgdG8gYSBib2R5XG4gKiAtIG1heFZlbDogVGhlIG1heGltdW0gdmVsb2NpdHkgY2xhbXAgW1tWZWN0b3Jpc2hdXSAoZGVmYXVsdDogeyB4OiA1LCB5OiA1IH0pIHRvIHJlc3RyaWN0IHZlbG9jaXR5IGEgdXNlciBjYW4gZ2l2ZSB0byBhIGJvZHlcbiAqXG4gKiBUaGUgYmVoYXZpb3IgYWxzbyB0cmlnZ2VycyB0aGUgZm9sbG93aW5nIGV2ZW50cyBvbiB0aGUgd29ybGQ6XG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAvLyBhIGJvZHkgaGFzIGJlZW4gZ3JhYmJlZFxuICogd29ybGQub24oJ2ludGVyYWN0OmdyYWInLCBmdW5jdGlvbiggZGF0YSApe1xuICogICAgIGRhdGEueDsgLy8gdGhlIHggY29vcmRcbiAqICAgICBkYXRhLnk7IC8vIHRoZSB5IGNvb3JkXG4gKiAgICAgZGF0YS5ib2R5OyAvLyB0aGUgYm9keSB0aGF0IHdhcyBncmFiYmVkXG4gKiB9KTtcbiAqIC8vIG5vIGJvZHkgd2FzIGdyYWJiZWQsIGJ1dCB0aGUgcmVuZGVyZXIgYXJlYSB3YXMgY2xpY2tlZCwgb3IgdG91Y2hlZFxuICogd29ybGQub24oJ2ludGVyYWN0OnBva2UnLCBmdW5jdGlvbiggZGF0YSApe1xuICogICAgIGRhdGEueDsgLy8gdGhlIHggY29vcmRcbiAqICAgICBkYXRhLnk7IC8vIHRoZSB5IGNvb3JkXG4gKiB9KTtcbiAqIC8vIHdoZW4gYSBtb3VzZSBvciBwb2ludGVyIG1vdmVzXG4gKiB3b3JsZC5vbignaW50ZXJhY3Q6bW92ZScsIGZ1bmN0aW9uKCBkYXRhICl7XG4gKiAgICAgZGF0YS54OyAvLyB0aGUgeCBjb29yZFxuICogICAgIGRhdGEueTsgLy8gdGhlIHkgY29vcmRcbiAqICAgICBkYXRhLmJvZHk7IC8vIHRoZSBncmFiYmVkIGJvZHkgdGhhdCB3YXMgbW92ZWQgKGlmIGFwcGxpY2FibGUpXG4gKiB9KTtcbiAqIC8vIHdoZW4gdGhlIHZpZXdwb3J0IGlzIHJlbGVhc2VkIChtb3VzZXVwLCB0b3VjaGVuZClcbiAqIHdvcmxkLm9uKCdpbnRlcmFjdDpyZWxlYXNlJywgZnVuY3Rpb24oIGRhdGEgKXtcbiAqICAgICBkYXRhLng7IC8vIHRoZSB4IGNvb3JkXG4gKiAgICAgZGF0YS55OyAvLyB0aGUgeSBjb29yZFxuICogICAgIGRhdGEuYm9keTsgLy8gdGhlIGJvZHkgdGhhdCB3YXMgZ3JhYmJlZCAoaWYgYXBwbGljYWJsZSlcbiAqIH0pO1xuICogYGBgXG4gKlxuICogVGhlIGJlaGF2aW9yIGFsc28gc2V0cyBib2R5LmlzR3JhYmJlZCA9IHRydWUgZm9yIGFueSBncmFiYmVkIGJvZGllcyB3aGlsZSB0aGV5IGFyZSBncmFiYmVkLlxuICoqL1xuUGh5c2ljcy5iZWhhdmlvcignaW50ZXJhY3RpdmUnLCBmdW5jdGlvbiggcGFyZW50ICl7XG5cbiAgICBpZiAoICFkb2N1bWVudCApe1xuICAgICAgICAvLyBtdXN0IGJlIGluIG5vZGUgZW52aXJvbm1lbnRcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIC8vIHRoZSBlbGVtZW50IHRvIG1vbml0b3JcbiAgICAgICAgICAgIGVsOiBudWxsLFxuICAgICAgICAgICAgLy8gdGltZSBiZXR3ZWVuIG1vdmUgZXZlbnRzXG4gICAgICAgICAgICBtb3ZlVGhyb3R0bGU6IDEwMDAgLyAxMDAgfCAwLFxuICAgICAgICAgICAgLy8gbWluaW11bSB2ZWxvY2l0eSBjbGFtcFxuICAgICAgICAgICAgbWluVmVsOiB7IHg6IC01LCB5OiAtNSB9LFxuICAgICAgICAgICAgLy8gbWF4aW11bSB2ZWxvY2l0eSBjbGFtcFxuICAgICAgICAgICAgbWF4VmVsOiB7IHg6IDUsIHk6IDUgfVxuICAgICAgICB9XG4gICAgICAgICxnZXRFbGVtZW50T2Zmc2V0ID0gZnVuY3Rpb24oIGVsICl7XG4gICAgICAgICAgICB2YXIgY3VybGVmdCA9IDBcbiAgICAgICAgICAgICAgICAsY3VydG9wID0gMFxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgaWYgKGVsLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgY3VybGVmdCArPSBlbC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgICAgICBjdXJ0b3AgKz0gZWwub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGVsID0gZWwub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogY3VybGVmdCwgdG9wOiBjdXJ0b3AgfTtcbiAgICAgICAgfVxuICAgICAgICA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBpbml0OiBmdW5jdGlvbiggb3B0aW9ucyApe1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIGNhbGwgcGFyZW50IGluaXQgbWV0aG9kXG4gICAgICAgICAgICBwYXJlbnQuaW5pdC5jYWxsKCB0aGlzICk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZGVmYXVsdHMoIGRlZmF1bHRzICk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMoIG9wdGlvbnMgKTtcblxuICAgICAgICAgICAgLy8gdmFyc1xuICAgICAgICAgICAgdGhpcy5ib2R5RGF0YSA9IHt9O1xuICAgICAgICAgICAgdGhpcy5ib2R5RGF0YUJ5VUlEID0ge307XG5cbiAgICAgICAgICAgIHRoaXMuZWwgPSB0eXBlb2YgdGhpcy5vcHRpb25zLmVsID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMub3B0aW9ucy5lbCkgOiB0aGlzLm9wdGlvbnMuZWw7XG5cbiAgICAgICAgICAgIGlmICggIXRoaXMuZWwgKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIk5vIERPTSBlbGVtZW50IHNwZWNpZmllZFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbml0IGV2ZW50c1xuICAgICAgICAgICAgLy8gd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUgdG91Y2hkb3ducywgZ3JhYiBpcyB1c3VhbGx5IGNhbGxlZCBzZXBhcmF0ZWx5IGZvciBlYWNoLFxuICAgICAgICAgICAgLy8gYnV0IHdlIGxvb3AgdGhyb3VnaCBlLmNoYW5nZWRUb3VjaGVzIGp1c3QgaW4gY2FzZVxuICAgICAgICAgICAgc2VsZi5ncmFiID0gZnVuY3Rpb24gZ3JhYiggZSApe1xuICAgICAgICAgICAgICAgIHZhciBwb3NcbiAgICAgICAgICAgICAgICAgICAgLGJvZHlcbiAgICAgICAgICAgICAgICAgICAgLHRvdWNoSWRcbiAgICAgICAgICAgICAgICAgICAgLHRvdWNoXG4gICAgICAgICAgICAgICAgICAgICxvZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgLGRhdGFcbiAgICAgICAgICAgICAgICAgICAgLHRvdWNoSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgLGxcbiAgICAgICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBzZWxmLl93b3JsZCApe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkanVzdCBmb3IgUG9pbnRlckV2ZW50IGFuZCBvbGRlciBicm93c2Vyc1xuICAgICAgICAgICAgICAgICAgICBpZiAoICFlLmNoYW5nZWRUb3VjaGVzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5jaGFuZ2VkVG91Y2hlcyA9IFsgZSBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gZ2V0RWxlbWVudE9mZnNldCggZS50YXJnZXQgKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKCB0b3VjaEluZGV4ID0gMCwgbCA9IGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyB0b3VjaEluZGV4IDwgbDsgdG91Y2hJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXNbdG91Y2hJbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaElkID0gdG91Y2guaWRlbnRpZmllciB8fCB0b3VjaC5wb2ludGVySWQgfHwgXCJtb3VzZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0geyBpZHg6IHRvdWNoSWQsIHg6IHRvdWNoLnBhZ2VYIC0gb2Zmc2V0LmxlZnQsIHk6IHRvdWNoLnBhZ2VZIC0gb2Zmc2V0LnRvcCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSA9IHNlbGYuX3dvcmxkLmZpbmRPbmUoeyAkYXQ6IG5ldyBQaHlzaWNzLnZlY3RvciggcG9zICksICRpbjogc2VsZi5nZXRUYXJnZXRzKCkgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYm9keSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlJ3JlIHRyeWluZyB0byBncmFiIGEgYm9keVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZml4IHRoZSBib2R5IGluIHBsYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5zdGF0ZS52ZWwuemVybygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuc3RhdGUuYW5ndWxhci52ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuaXNHcmFiYmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1lbWJlciB0aGUgY3VycmVudGx5IGdyYWJiZWQgYm9kaWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuYm9keURhdGFbdG91Y2hJZF0gfHwge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2R5ID0gYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3YWtlIHRoZSBib2R5IHVwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5zbGVlcCggZmFsc2UgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnRpbWUgPSBQaHlzaWNzLnV0aWwudGlja2VyLm5vdygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UncmUgZ3JhYmJpbmcgdGhlIHNhbWUgYm9keSB0d2ljZSB3ZSBkb24ndCB3YW50IHRvIHJlbWVtYmVyIHRoZSB3cm9uZyB0cmVhdG1lbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS50cmVhdG1lbnQgPSBzZWxmLmJvZHlEYXRhQnlVSURbIGJvZHkudWlkIF0gPyBzZWxmLmJvZHlEYXRhQnlVSURbIGJvZHkudWlkIF0udHJlYXRtZW50IDogYm9keS50cmVhdG1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIGl0cyB0cmVhdG1lbnQgYnV0IHJlbWVtYmVyIGl0cyBvbGQgdHJlYXRtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS50cmVhdG1lbnQgPSAna2luZW1hdGljJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1lbWJlciB0aGUgY2xpY2svdG91Y2ggb2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3MgPSBkYXRhLnBvcyB8fCBuZXcgUGh5c2ljcy52ZWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnBvcy5jbG9uZSggcG9zICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm9mZnNldCA9IGRhdGEub2Zmc2V0IHx8IG5ldyBQaHlzaWNzLnZlY3RvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEub2Zmc2V0LmNsb25lKCBwb3MgKS52c3ViKCBib2R5LnN0YXRlLnBvcyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluaXQgdG91Y2hQb2ludHNPbGQgaGVyZSwgdG9vLCBzbyB3ZSBkb24ndCBoYXZlIHRvIGRvIGl0IGluIFwibW92ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5vbGRQb3MgPSBkYXRhLm9sZFBvcyB8fCBuZXcgUGh5c2ljcy52ZWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm9sZFBvcy5jbG9uZSggcG9zICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuYm9keSA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ib2R5RGF0YVt0b3VjaElkXSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ib2R5RGF0YUJ5VUlEWyBib2R5LnVpZCBdID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl93b3JsZC5lbWl0KCdpbnRlcmFjdDpncmFiJywgcG9zKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3dvcmxkLmVtaXQoJ2ludGVyYWN0OnBva2UnLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUgdG91Y2hkb3ducywgbW92ZSBpcyBjYWxsZWQgb25jZVxuICAgICAgICAgICAgLy8gYW5kIGUuY2hhbmdlZFRvdWNoZXMgd2lsbCBoYXZlIG9uZSBvciBtb3JlIHRvdWNoZXMgaW4gaXRcbiAgICAgICAgICAgIHNlbGYubW92ZSA9IFBoeXNpY3MudXRpbC50aHJvdHRsZShmdW5jdGlvbiBtb3ZlKCBlICl7XG4gICAgICAgICAgICAgICAgdmFyIHBvc1xuICAgICAgICAgICAgICAgICAgICAsc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgLGJvZHlcbiAgICAgICAgICAgICAgICAgICAgLHRvdWNoSWRcbiAgICAgICAgICAgICAgICAgICAgLHRvdWNoXG4gICAgICAgICAgICAgICAgICAgICxvZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgLGRhdGFcbiAgICAgICAgICAgICAgICAgICAgLHRvdWNoSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgLGxcbiAgICAgICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBzZWxmLl93b3JsZCApe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkanVzdCBmb3IgUG9pbnRlckV2ZW50IGFuZCBvbGRlciBicm93c2Vyc1xuICAgICAgICAgICAgICAgICAgICBpZiAoICFlLmNoYW5nZWRUb3VjaGVzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5jaGFuZ2VkVG91Y2hlcyA9IFsgZSBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gZ2V0RWxlbWVudE9mZnNldCggc2VsZi5lbCApO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIHRvdWNoSW5kZXggPSAwLCBsID0gZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IHRvdWNoSW5kZXggPCBsOyB0b3VjaEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1t0b3VjaEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoSWQgPSB0b3VjaC5pZGVudGlmaWVyIHx8IHRvdWNoLnBvaW50ZXJJZCB8fCBcIm1vdXNlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSB7IGlkeDogdG91Y2hJZCwgeDogdG91Y2gucGFnZVggLSBvZmZzZXQubGVmdCwgeTogdG91Y2gucGFnZVkgLSBvZmZzZXQudG9wIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5ib2R5RGF0YVt0b3VjaElkXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBkYXRhICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keSA9IGRhdGEuYm9keTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdha2UgdGhlIGJvZHkgdXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnNsZWVwKCBmYWxzZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudGltZSA9IFBoeXNpY3MudXRpbC50aWNrZXIubm93KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgb2xkIG1vdXNlIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5vbGRQb3MuY2xvbmUoIGRhdGEucG9zICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IG5ldyBtb3VzZSBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucG9zLmNsb25lKCBwb3MgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5ib2R5ID0gYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fd29ybGQuZW1pdCgnaW50ZXJhY3Q6bW92ZScsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIHNlbGYub3B0aW9ucy5tb3ZlVGhyb3R0bGUpO1xuXG4gICAgICAgICAgICAvLyB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSB0b3VjaHVwcywgcmVsZWFzZSBpcyBjYWxsZWQgb25jZVxuICAgICAgICAgICAgLy8gYW5kIGUuY2hhbmdlZFRvdWNoZXMgd2lsbCBoYXZlIG9uZSBvciBtb3JlIHRvdWNoZXMgaW4gaXRcbiAgICAgICAgICAgIHNlbGYucmVsZWFzZSA9IGZ1bmN0aW9uIHJlbGVhc2UoIGUgKXtcbiAgICAgICAgICAgICAgICB2YXIgcG9zXG4gICAgICAgICAgICAgICAgICAgICxib2R5XG4gICAgICAgICAgICAgICAgICAgICx0b3VjaElkXG4gICAgICAgICAgICAgICAgICAgICx0b3VjaFxuICAgICAgICAgICAgICAgICAgICAsb2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICxkYXRhXG4gICAgICAgICAgICAgICAgICAgICxkdFxuICAgICAgICAgICAgICAgICAgICAsdG91Y2hJbmRleFxuICAgICAgICAgICAgICAgICAgICAsbFxuICAgICAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHNlbGYuX3dvcmxkICl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWRqdXN0IGZvciBQb2ludGVyRXZlbnQgYW5kIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWUuY2hhbmdlZFRvdWNoZXMgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLmNoYW5nZWRUb3VjaGVzID0gWyBlIF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKCB0b3VjaEluZGV4ID0gMCwgbCA9IGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyB0b3VjaEluZGV4IDwgbDsgdG91Y2hJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBnZXRFbGVtZW50T2Zmc2V0KCBzZWxmLmVsICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXNbdG91Y2hJbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaElkID0gdG91Y2guaWRlbnRpZmllciB8fCB0b3VjaC5wb2ludGVySWQgfHwgXCJtb3VzZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0geyBpZHg6IHRvdWNoSWQsIHg6IHRvdWNoLnBhZ2VYIC0gb2Zmc2V0LmxlZnQsIHk6IHRvdWNoLnBhZ2VZIC0gb2Zmc2V0LnRvcCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuYm9keURhdGFbdG91Y2hJZF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbGVhc2UgdGhlIGJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZGF0YSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgPSBkYXRhLmJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2FrZSB0aGUgYm9keSB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuc2xlZXAoIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IG5ldyBtb3VzZSBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucG9zLmNsb25lKCBwb3MgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0ID0gTWF0aC5tYXgoUGh5c2ljcy51dGlsLnRpY2tlci5ub3coKSAtIGRhdGEudGltZSwgc2VsZi5vcHRpb25zLm1vdmVUaHJvdHRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS50cmVhdG1lbnQgPSBkYXRhLnRyZWF0bWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHJlbGVhc2UgdmVsb2NpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnN0YXRlLnZlbC5jbG9uZSggZGF0YS5wb3MgKS52c3ViKCBkYXRhLm9sZFBvcyApLm11bHQoIDEgLyBkdCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBpdCdzIG5vdCB0b28gYmlnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5zdGF0ZS52ZWwuY2xhbXAoIHNlbGYub3B0aW9ucy5taW5WZWwsIHNlbGYub3B0aW9ucy5tYXhWZWwgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuaXNHcmFiYmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmJvZHkgPSBib2R5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGJvZHkuaXNHcmFiYmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbWl0IGJlZm9yZSB3ZSBkZWxldGUgdGhlIHZhcnMgaW4gY2FzZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGxpc3RlbmVycyBuZWVkIHRoZSBib2R5XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl93b3JsZC5lbWl0KCdpbnRlcmFjdDpyZWxlYXNlJywgcG9zKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHZhcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLmJvZHlEYXRhW3RvdWNoSWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBjb25uZWN0OiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgLy8gc3Vic2NyaWJlIHRoZSAuYmVoYXZlKCkgbWV0aG9kIHRvIHRoZSBwb3NpdGlvbiBpbnRlZ3JhdGlvbiBzdGVwXG4gICAgICAgICAgICB3b3JsZC5vbignaW50ZWdyYXRlOnBvc2l0aW9ucycsIHRoaXMuYmVoYXZlLCB0aGlzKTtcblxuICAgICAgICAgICAgaWYgKCB3aW5kb3cuUG9pbnRlckV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMuZ3JhYik7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5tb3ZlKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgdGhpcy5yZWxlYXNlKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5ncmFiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmdyYWIpO1xuXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZSk7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW92ZSk7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMucmVsZWFzZSk7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5yZWxlYXNlKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCB3b3JsZCApe1xuXG4gICAgICAgICAgICAvLyB1bnN1YnNjcmliZSB3aGVuIGRpc2Nvbm5lY3RlZFxuICAgICAgICAgICAgd29ybGQub2ZmKCdpbnRlZ3JhdGU6cG9zaXRpb25zJywgdGhpcy5iZWhhdmUsIHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoIHdpbmRvdy5Qb2ludGVyRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5ncmFiKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLm1vdmUpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLnJlbGVhc2UpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmdyYWIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuZ3JhYik7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZWxlYXNlKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnJlbGVhc2UpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgYmVoYXZlOiBmdW5jdGlvbiggZGF0YSApe1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICAsc3RhdGVcbiAgICAgICAgICAgICAgICAsZHQgPSBNYXRoLm1heChkYXRhLmR0LCBzZWxmLm9wdGlvbnMubW92ZVRocm90dGxlKVxuICAgICAgICAgICAgICAgICxib2R5XG4gICAgICAgICAgICAgICAgLGRcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgb25lIG9yIG1vcmUgYm9kaWVzIGdyYWJiZWQsIHdlIG5lZWQgdG8gbW92ZSB0aGVtIHRvIHRoZSBuZXcgbW91c2UvZmluZ2VyIHBvc2l0aW9ucy5cbiAgICAgICAgICAgIC8vIHdlJ2xsIGRvIHRoaXMgYnkgYWRqdXN0aW5nIHRoZSB2ZWxvY2l0eSBzbyB0aGV5IGdldCB0aGVyZSBhdCB0aGUgbmV4dCBzdGVwXG4gICAgICAgICAgICBmb3IgKCB2YXIgdG91Y2hJZCBpbiBzZWxmLmJvZHlEYXRhICkge1xuICAgICAgICAgICAgICAgIGQgPSBzZWxmLmJvZHlEYXRhW3RvdWNoSWRdO1xuICAgICAgICAgICAgICAgIGJvZHkgPSBkLmJvZHk7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBib2R5LnN0YXRlO1xuICAgICAgICAgICAgICAgIHN0YXRlLnZlbC5jbG9uZSggZC5wb3MgKS52c3ViKCBkLm9mZnNldCApLnZzdWIoIHN0YXRlLnBvcyApLm11bHQoIDEgLyBkdCApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvYmVoYXZpb3JzL25ld3Rvbmlhbi5qc1xuXG4vKipcbiAqIGNsYXNzIE5ld3RvbmlhbkJlaGF2aW9yIDwgQmVoYXZpb3JcbiAqXG4gKiBgUGh5c2ljcy5iZWhhdmlvcignbmV3dG9uaWFuJylgLlxuICpcbiAqIE5ld3RvbmlhbiBhdHRyYWN0aW9uIGJldHdlZW4gYm9kaWVzIChpbnZlcnNlIHNxdWFyZSBsYXcpLlxuICpcbiAqIEFkZGl0aW9uYWwgb3B0aW9ucyBpbmNsdWRlOlxuICogLSBzdHJlbmd0aDogVGhlIHN0cmVuZ3RoIG9mIHRoZSBpbnRlcmFjdGlvbiBiZXR3ZWVuIGJvZGllcy4gKGRlZmF1bHQ6IGAxYClcbiAqIC0gbWF4OiBUaGUgbWF4aW11bSBkaXN0YW5jZSBiZXR3ZWVuIGJvZGllcyBhdCB3aGljaCB0byBhcHBseSB0aGUgYmVoYXZpb3IuIChkZWZhdWx0OiBgZmFsc2VgLi4uIGluZmluaXRlKVxuICogLSBtaW46IFRoZSBtaW5pbXVtIGRpc3RhbmNlIGJldHdlZW4gYm9kaWVzIGF0IHdoaWNoIHRvIGFwcGx5IHRoZSBiZWhhdmlvci4gKGRlZmF1bHQ6IGBmYWxzZWAuLi4gYXV0b2NhbGN1bGF0ZSlcbiAqKi9cblBoeXNpY3MuYmVoYXZpb3IoJ25ld3RvbmlhbicsIGZ1bmN0aW9uKCBwYXJlbnQgKXtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcblxuICAgICAgICBzdHJlbmd0aDogMSxcbiAgICAgICAgLy8gbWF4IGRpc3RhbmNlIHRvIGFwcGx5IGl0IHRvXG4gICAgICAgIG1heDogZmFsc2UsIC8vIGluZmluaXRlXG4gICAgICAgIC8vIG1pbiBkaXN0YW5jZSB0byBhcHBseSBpdCB0b1xuICAgICAgICBtaW46IGZhbHNlIC8vIGF1dG8gY2FsY1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8vIGNhbGwgcGFyZW50IGluaXQgbWV0aG9kXG4gICAgICAgICAgICBwYXJlbnQuaW5pdC5jYWxsKCB0aGlzICk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZGVmYXVsdHMoIGRlZmF1bHRzICk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25DaGFuZ2UoZnVuY3Rpb24oIG9wdHMgKXtcbiAgICAgICAgICAgICAgICBzZWxmLl9tYXhEaXN0U3EgPSBvcHRzLm1heCA9PT0gZmFsc2UgPyBJbmZpbml0eSA6IG9wdHMubWF4ICogb3B0cy5tYXg7XG4gICAgICAgICAgICAgICAgc2VsZi5fbWluRGlzdFNxID0gb3B0cy5taW4gPyBvcHRzLm1pbiAqIG9wdHMubWluIDogMTAwICogb3B0cy5zdHJlbmd0aDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zKCBvcHRpb25zICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2FsY1BvdGVudGlhbDogZnVuY3Rpb24oIHBvc0EsIHBvc0IsIG91dCApe1xuXG4gICAgICAgICAgICB2YXIgc3RyZW5ndGggPSB0aGlzLm9wdGlvbnMuc3RyZW5ndGhcbiAgICAgICAgICAgICAgICAsbWluRGlzdFNxID0gdGhpcy5fbWluRGlzdFNxXG4gICAgICAgICAgICAgICAgLG1heERpc3RTcSA9IHRoaXMuX21heERpc3RTcVxuICAgICAgICAgICAgICAgICxub3Jtc3FcbiAgICAgICAgICAgICAgICAsZ1xuICAgICAgICAgICAgICAgICxwb3NcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHBvcyA9IG91dCB8fCBuZXcgUGh5c2ljcy52ZWN0b3IoKTtcblxuICAgICAgICAgICAgLy8gY2xvbmUgdGhlIHBvc2l0aW9uXG4gICAgICAgICAgICBwb3MuY2xvbmUoIHBvc0IgKS52c3ViKCBwb3NBICk7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIHNxdWFyZSBkaXN0YW5jZVxuICAgICAgICAgICAgbm9ybXNxID0gcG9zLm5vcm1TcSgpO1xuXG4gICAgICAgICAgICBpZiAobm9ybXNxID4gbWluRGlzdFNxICYmIG5vcm1zcSA8IG1heERpc3RTcSl7XG5cbiAgICAgICAgICAgICAgICBnID0gc3RyZW5ndGggLyBub3Jtc3E7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvcy5ub3JtYWxpemUoKS5tdWx0KCBnICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwb3MuemVybygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGJlaGF2ZTogZnVuY3Rpb24oIGRhdGEgKXtcblxuICAgICAgICAgICAgdmFyIGJvZGllcyA9IHRoaXMuZ2V0VGFyZ2V0cygpXG4gICAgICAgICAgICAgICAgLGJvZHlcbiAgICAgICAgICAgICAgICAsb3RoZXJcbiAgICAgICAgICAgICAgICAsc2NyYXRjaCA9IFBoeXNpY3Muc2NyYXRjaHBhZCgpXG4gICAgICAgICAgICAgICAgLHBvdGVudGlhbCA9IHNjcmF0Y2gudmVjdG9yKClcbiAgICAgICAgICAgICAgICAsY29tcFxuICAgICAgICAgICAgICAgICxib2R5QVxuICAgICAgICAgICAgICAgICxib2R5QlxuICAgICAgICAgICAgICAgICxwb3NBID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgICAgICxwb3NCID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgICAgICxpLCBqLCBrLCBtLCBsLCBsbCwgbGxsXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBmb3IgKCBqID0gMCwgbCA9IGJvZGllcy5sZW5ndGg7IGogPCBsOyBqKysgKXtcblxuICAgICAgICAgICAgICAgIGJvZHkgPSBib2RpZXNbIGogXTtcblxuICAgICAgICAgICAgICAgIGZvciAoIGkgPSBqICsgMTsgaSA8IGw7IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgICAgIG90aGVyID0gYm9kaWVzWyBpIF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBib2R5Lm5hbWUgPT09ICdjb21wb3VuZCcgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXAgPSBib2R5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBvdGhlci5uYW1lID09PSAnY29tcG91bmQnICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wID0gb3RoZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlciA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbXAgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggb3RoZXIubmFtZSA9PT0gJ2NvbXBvdW5kJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIGsgPSAwLCBsbCA9IGNvbXAuY2hpbGRyZW4ubGVuZ3RoOyBrIDwgbGw7IGsrKyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5QSA9IGNvbXAuY2hpbGRyZW5bIGsgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcC50b1dvcmxkQ29vcmRzKCBwb3NBLmNsb25lKCBib2R5QS5zdGF0ZS5wb3MgKS52YWRkKCBjb21wLm9mZnNldCApICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIG0gPSAwLCBsbGwgPSBvdGhlci5jaGlsZHJlbi5sZW5ndGg7IG0gPCBsbGw7IG0rKyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keUIgPSBvdGhlci5jaGlsZHJlblsgbSBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXIudG9Xb3JsZENvb3JkcyggcG9zQi5jbG9uZSggYm9keUIuc3RhdGUucG9zICkudmFkZCggb3RoZXIub2Zmc2V0ICkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY1BvdGVudGlhbCggcG9zQSwgcG9zQiwgcG90ZW50aWFsICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wLmFjY2VsZXJhdGUoIHBvdGVudGlhbC5tdWx0KCBib2R5Qi5tYXNzICkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyLmFjY2VsZXJhdGUoIHBvdGVudGlhbC5tdWx0KCBib2R5QS5tYXNzL2JvZHlCLm1hc3MgKS5uZWdhdGUoKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCBrID0gMCwgbGwgPSBjb21wLmNoaWxkcmVuLmxlbmd0aDsgayA8IGxsOyBrKysgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keUEgPSBjb21wLmNoaWxkcmVuWyBrIF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXAudG9Xb3JsZENvb3JkcyggcG9zQS5jbG9uZSggYm9keUEuc3RhdGUucG9zICkudmFkZCggY29tcC5vZmZzZXQgKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGNQb3RlbnRpYWwoIHBvc0EsIG90aGVyLnN0YXRlLnBvcywgcG90ZW50aWFsICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXAuYWNjZWxlcmF0ZSggcG90ZW50aWFsLm11bHQoIG90aGVyLm1hc3MgKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlci5hY2NlbGVyYXRlKCBwb3RlbnRpYWwubXVsdCggYm9keUEubWFzcy9vdGhlci5tYXNzICkubmVnYXRlKCkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxjUG90ZW50aWFsKCBib2R5LnN0YXRlLnBvcywgb3RoZXIuc3RhdGUucG9zLCBwb3RlbnRpYWwgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuYWNjZWxlcmF0ZSggcG90ZW50aWFsLm11bHQoIG90aGVyLm1hc3MgKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXIuYWNjZWxlcmF0ZSggcG90ZW50aWFsLm11bHQoIGJvZHkubWFzcy9vdGhlci5tYXNzICkubmVnYXRlKCkgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9iZWhhdmlvcnMvc3dlZXAtcHJ1bmUuanNcblxuLyoqXG4gKiBjbGFzcyBTd2VlcFBydW5lQmVoYXZpb3IgPCBCZWhhdmlvclxuICpcbiAqIGBQaHlzaWNzLmJlaGF2aW9yKCdzd2VlcC1wcnVuZScpYC5cbiAqXG4gKiBTd2VlcCBhbmQgUHJ1bmUgaW1wbGVtZW50YXRpb24gZm9yIGJyb2FkIHBoYXNlIGNvbGxpc2lvbiBkZXRlY3Rpb24uXG4gKlxuICogVGhpcyBtYXNzaXZlbHkgaW1wcm92ZXMgdGhlIHNwZWVkIG9mIGNvbGxpc2lvbiBkZXRlY3Rpb24uIEl0J3Mgc2V0IHVwIHRvIGFsd2F5cyBiZSB1c2VkIHdpdGggW1tCb2R5Q29sbGlzaW9uRGV0ZWN0aW9uXV0sIGFuZCBbW0JvZHlJbXB1bHNlUmVzcG9uc2VdXS5cbiAqXG4gKiBBZGRpdGlvbmFsIG9wdGlvbnMgaW5jbHVkZTpcbiAqIC0gY2hhbm5lbDogVGhlIGNoYW5uZWwgdG8gcHVibGlzaCBjb2xsaXNpb24gY2FuZGlkYXRlcyB0by4gKGRlZmF1bHQ6IGBjb2xsaXNpb25zOmNhbmRpZGF0ZXNgKVxuICoqL1xuUGh5c2ljcy5iZWhhdmlvcignc3dlZXAtcHJ1bmUnLCBmdW5jdGlvbiggcGFyZW50ICl7XG5cbiAgICB2YXIgdWlkID0gMTtcblxuICAgIC8vIEdldCBhIHVuaXF1ZSBudW1lcmljIGlkIGZvciBpbnRlcm5hbCB1c2VcbiAgICB2YXIgZ2V0VW5pcXVlSWQgPSBmdW5jdGlvbiBnZXRVbmlxdWVJZCgpe1xuXG4gICAgICAgIHJldHVybiB1aWQrKztcbiAgICB9O1xuXG4gICAgLy8gYWRkIHo6IDIgdG8gZ2V0IHRoaXMgdG8gd29yayBpbiAzRFxuICAgIHZhciBkb2YgPSB7IHg6IDAsIHk6IDEgfTsgLy8gZGVncmVlcyBvZiBmcmVlZG9tXG4gICAgLy8gY2hhbmdlIHRvIFwiM1wiIHRvIGdldCBpdCB0byB3b3JrIGluIDNEXG4gICAgdmFyIG1heERvZiA9IDI7XG5cbiAgICB2YXIgcGFpckhhc2ggPSBQaHlzaWNzLnV0aWwucGFpckhhc2g7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwoIHRoaXMgKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0cyh7XG4gICAgICAgICAgICAgICAgY2hhbm5lbDogJ2NvbGxpc2lvbnM6Y2FuZGlkYXRlcycgLy9kZWZhdWx0IGNoYW5uZWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zKCBvcHRpb25zICk7XG5cbiAgICAgICAgICAgIHRoaXMuZW5jb3VudGVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jYW5kaWRhdGVzID0gW107XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3dlZXBQcnVuZUJlaGF2aW9yI2NsZWFyKClcbiAgICAgICAgICpcbiAgICAgICAgICogUmVmcmVzaCB0cmFja2luZyBkYXRhXG4gICAgICAgICAqKi9cbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHRoaXMudHJhY2tlZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5wYWlycyA9IFtdOyAvLyBwYWlycyBzZWxlY3RlZCBhcyBjYW5kaWRhdGUgY29sbGlzaW9ucyBieSBicm9hZCBwaGFzZVxuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbExpc3RzID0gW107IC8vIHN0b3JlcyBsaXN0cyBvZiBhYWJiIHByb2plY3Rpb24gaW50ZXJ2YWxzIHRvIGJlIHNvcnRlZFxuXG4gICAgICAgICAgICAvLyBpbml0IGludGVydmFsTGlzdHNcbiAgICAgICAgICAgIGZvciAoIHZhciB4eXogPSAwOyB4eXogPCBtYXhEb2Y7ICsreHl6ICl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsTGlzdHNbIHh5eiBdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgY29ubmVjdDogZnVuY3Rpb24oIHdvcmxkICl7XG5cbiAgICAgICAgICAgIHdvcmxkLm9uKCAnYWRkOmJvZHknLCB0aGlzLnRyYWNrQm9keSwgdGhpcyApO1xuICAgICAgICAgICAgd29ybGQub24oICdyZW1vdmU6Ym9keScsIHRoaXMudW50cmFja0JvZHksIHRoaXMgKTtcbiAgICAgICAgICAgIHdvcmxkLm9uKCAnaW50ZWdyYXRlOnBvc2l0aW9ucycsIHRoaXMuc3dlZXAsIHRoaXMsIDEgKTtcblxuICAgICAgICAgICAgLy8gYWRkIGN1cnJlbnQgYm9kaWVzXG4gICAgICAgICAgICB2YXIgYm9kaWVzID0gd29ybGQuZ2V0Qm9kaWVzKCk7XG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBib2RpZXMubGVuZ3RoOyBpIDwgbDsgKytpICl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNrQm9keSh7IGJvZHk6IGJvZGllc1sgaSBdIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCB3b3JsZCApe1xuXG4gICAgICAgICAgICB3b3JsZC5vZmYoICdhZGQ6Ym9keScsIHRoaXMudHJhY2tCb2R5LCB0aGlzICk7XG4gICAgICAgICAgICB3b3JsZC5vZmYoICdyZW1vdmU6Ym9keScsIHRoaXMudW50cmFja0JvZHksIHRoaXMgKTtcbiAgICAgICAgICAgIHdvcmxkLm9mZiggJ2ludGVncmF0ZTpwb3NpdGlvbnMnLCB0aGlzLnN3ZWVwLCB0aGlzLCAxICk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIFN3ZWVwUHJ1bmVCZWhhdmlvciNicm9hZFBoYXNlKCkgLT4gQXJyYXlcbiAgICAgICAgICogKyAoQXJyYXkpOiBUaGUgY2FuZGlkYXRlIGRhdGEgb2Ygb3ZlcmxhcHBpbmcgYWFiYnNcbiAgICAgICAgICpcbiAgICAgICAgICogRXhlY3V0ZSB0aGUgYnJvYWQgcGhhc2UgYW5kIGdldCBjYW5kaWRhdGUgY29sbGlzaW9uc1xuICAgICAgICAgKiovXG4gICAgICAgIGJyb2FkUGhhc2U6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW50ZXJ2YWxzKCk7XG4gICAgICAgICAgICB0aGlzLnNvcnRJbnRlcnZhbExpc3RzKCk7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5fd29ybGQgKXtcbiAgICAgICAgICAgICAgICB0aGlzLl93b3JsZC5lbWl0KCdzd2VlcC1wcnVuZTppbnRlcnZhbHMnLCB0aGlzLmludGVydmFsTGlzdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja092ZXJsYXBzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIFN3ZWVwUHJ1bmVCZWhhdmlvciNzb3J0SW50ZXJ2YWxMaXN0cygpXG4gICAgICAgICAqXG4gICAgICAgICAqIFNpbXBsZSBpbnNlcnRpb24gc29ydCBmb3IgZWFjaCBheGlzXG4gICAgICAgICAqKi9cbiAgICAgICAgc29ydEludGVydmFsTGlzdHM6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBsaXN0XG4gICAgICAgICAgICAgICAgLGxlblxuICAgICAgICAgICAgICAgICxpXG4gICAgICAgICAgICAgICAgLGhvbGVcbiAgICAgICAgICAgICAgICAsYm91bmRcbiAgICAgICAgICAgICAgICAsYm91bmRWYWxcbiAgICAgICAgICAgICAgICAsbGVmdFxuICAgICAgICAgICAgICAgICxsZWZ0VmFsXG4gICAgICAgICAgICAgICAgLGF4aXNcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIC8vIGZvciBlYWNoIGF4aXMuLi5cbiAgICAgICAgICAgIGZvciAoIHZhciB4eXogPSAwOyB4eXogPCBtYXhEb2Y7ICsreHl6ICl7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGludGVydmFscyBmb3IgdGhhdCBheGlzXG4gICAgICAgICAgICAgICAgbGlzdCA9IHRoaXMuaW50ZXJ2YWxMaXN0c1sgeHl6IF07XG4gICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgYXhpcyA9IHh5ejtcblxuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIGludGVydmFsIGJvdW5kLi4uXG4gICAgICAgICAgICAgICAgd2hpbGUgKCAoKytpKSA8IGxlbiApe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0b3JlIGJvdW5kXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kID0gbGlzdFsgaSBdO1xuICAgICAgICAgICAgICAgICAgICBib3VuZFZhbCA9IGJvdW5kLnZhbC5nZXQoIGF4aXMgKTtcbiAgICAgICAgICAgICAgICAgICAgaG9sZSA9IGk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGxpc3RbIGhvbGUgLSAxIF07XG4gICAgICAgICAgICAgICAgICAgIGxlZnRWYWwgPSBsZWZ0ICYmIGxlZnQudmFsLmdldCggYXhpcyApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoaWxlIG90aGVycyBhcmUgZ3JlYXRlciB0aGFuIGJvdW5kLi4uXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvbGUgPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdFZhbCA+IGJvdW5kVmFsIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQncyBhbiBlcXVhbGl0eSwgb25seSBtb3ZlIGl0IG92ZXIgaWZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgaG9sZSB3YXMgY3JlYXRlZCBieSBhIG1pbmltdW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIHByZXZpb3VzIGlzIGEgbWF4aW11bVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHRoYXQgd2UgZGV0ZWN0IGNvbnRhY3RzIGFsc29cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0VmFsID09PSBib3VuZFZhbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICggbGVmdC50eXBlICYmICFib3VuZC50eXBlIClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgb3RoZXJzIGdyZWF0ZXIgdGhhbiBib3VuZCB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RbIGhvbGUgXSA9IGxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBob2xlLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gbGlzdFsgaG9sZSAtIDEgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRWYWwgPSBsZWZ0ICYmIGxlZnQudmFsLmdldCggYXhpcyApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW5zZXJ0IGJvdW5kIGluIHRoZSBob2xlXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbIGhvbGUgXSA9IGJvdW5kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogU3dlZXBQcnVuZUJlaGF2aW9yI2dldFBhaXIoIHRyMSwgdHIyLCBkb0NyZWF0ZSApIC0+IE9iamVjdFxuICAgICAgICAgKiAtIHRyMSAoT2JqZWN0KTogRmlyc3QgdHJhY2tlclxuICAgICAgICAgKiAtIHRyMiAoT2JqZWN0KTogU2Vjb25kIHRyYWNrZXJcbiAgICAgICAgICogLSBkb0NyZWF0ZSAoQm9vbGVhbik6IENyZWF0ZSBpZiBub3QgZm91bmRcbiAgICAgICAgICogKyAoT2JqZWN0KTogUGFpciBvYmplY3Qgb3IgbnVsbCBpZiBub3QgZm91bmRcbiAgICAgICAgICpcbiAgICAgICAgICogR2V0IGEgcGFpciBvYmplY3QgZm9yIHRoZSB0cmFja2VyIG9iamVjdHNcbiAgICAgICAgICoqL1xuICAgICAgICBnZXRQYWlyOiBmdW5jdGlvbih0cjEsIHRyMiwgZG9DcmVhdGUpe1xuXG4gICAgICAgICAgICB2YXIgaGFzaCA9IHBhaXJIYXNoKCB0cjEuaWQsIHRyMi5pZCApO1xuXG4gICAgICAgICAgICBpZiAoIGhhc2ggPT09IGZhbHNlICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjID0gdGhpcy5wYWlyc1sgaGFzaCBdO1xuXG4gICAgICAgICAgICBpZiAoICFjICl7XG5cbiAgICAgICAgICAgICAgICBpZiAoICFkb0NyZWF0ZSApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjID0gdGhpcy5wYWlyc1sgaGFzaCBdID0ge1xuICAgICAgICAgICAgICAgICAgICBib2R5QTogdHIxLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGJvZHlCOiB0cjIuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggZG9DcmVhdGUpe1xuICAgICAgICAgICAgICAgIGMuZmxhZyA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGdldFBhaXI6IGZ1bmN0aW9uKHRyMSwgdHIyLCBkb0NyZWF0ZSl7XG5cbiAgICAgICAgLy8gICAgIHZhciBoYXNoID0gTWF0aC5taW4odHIxLmlkLCB0cjIuaWQpIC8vID0gcGFpckhhc2goIHRyMS5pZCwgdHIyLmlkIClcbiAgICAgICAgLy8gICAgICAgICAsb3RoZXIgPSBNYXRoLm1heCh0cjEuaWQsIHRyMi5pZClcbiAgICAgICAgLy8gICAgICAgICAsZmlyc3RcbiAgICAgICAgLy8gICAgICAgICAsY1xuICAgICAgICAvLyAgICAgICAgIDtcblxuICAgICAgICAvLyAgICAgaWYgKCBoYXNoID09PSBmYWxzZSApe1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAvLyAgICAgfVxuXG4gICAgICAgIC8vICAgICBmaXJzdCA9IHRoaXMucGFpcnNbIGhhc2ggXTtcblxuICAgICAgICAvLyAgICAgaWYgKCAhZmlyc3QgKXtcbiAgICAgICAgLy8gICAgICAgICBpZiAoICFkb0NyZWF0ZSApe1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gICAgICAgICB9XG5cbiAgICAgICAgLy8gICAgICAgICBmaXJzdCA9IHRoaXMucGFpcnNbIGhhc2ggXSA9IFtdO1xuICAgICAgICAvLyAgICAgfVxuXG4gICAgICAgIC8vICAgICBjID0gZmlyc3RbIG90aGVyIF07XG5cbiAgICAgICAgLy8gICAgIGlmICggIWMgKXtcblxuICAgICAgICAvLyAgICAgICAgIGlmICggIWRvQ3JlYXRlICl7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAvLyAgICAgICAgIH1cblxuICAgICAgICAvLyAgICAgICAgIGMgPSBmaXJzdFsgb3RoZXIgXSA9IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgYm9keUE6IHRyMS5ib2R5LFxuICAgICAgICAvLyAgICAgICAgICAgICBib2R5QjogdHIyLmJvZHksXG4gICAgICAgIC8vICAgICAgICAgICAgIGZsYWc6IDFcbiAgICAgICAgLy8gICAgICAgICB9O1xuICAgICAgICAvLyAgICAgfVxuXG4gICAgICAgIC8vICAgICByZXR1cm4gYztcbiAgICAgICAgLy8gfSxcblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogU3dlZXBQcnVuZUJlaGF2aW9yI2NoZWNrT3ZlcmxhcHMoKSAtPiBBcnJheVxuICAgICAgICAgKiArIChBcnJheSk6IExpc3Qgb2YgY2FuZGlkYXRlIGNvbGxpc2lvbnNcbiAgICAgICAgICpcbiAgICAgICAgICogQ2hlY2sgZWFjaCBheGlzIGZvciBvdmVybGFwcyBvZiBib2RpZXMgQUFCQnNcbiAgICAgICAgICoqL1xuICAgICAgICBjaGVja092ZXJsYXBzOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgaXNYXG4gICAgICAgICAgICAgICAgLGhhc2hcbiAgICAgICAgICAgICAgICAsdHIxXG4gICAgICAgICAgICAgICAgLHRyMlxuICAgICAgICAgICAgICAgICxib3VuZFxuICAgICAgICAgICAgICAgICxsaXN0XG4gICAgICAgICAgICAgICAgLGxlblxuICAgICAgICAgICAgICAgICxpXG4gICAgICAgICAgICAgICAgLGpcbiAgICAgICAgICAgICAgICAsY1xuICAgICAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGljaCBheGlzIGlzIHRoZSBsYXN0IHdlIG5lZWQgdG8gY2hlY2tcbiAgICAgICAgICAgICAgICAsY29sbGlzaW9uRmxhZyA9IDEgPDwgKGRvZi56ICsgMSkgPDwgKGRvZi55ICsgMSkgPDwgKGRvZi54ICsgMSlcbiAgICAgICAgICAgICAgICAsZW5jb3VudGVycyA9IHRoaXMuZW5jb3VudGVyc1xuICAgICAgICAgICAgICAgICxlbmNsZW4gPSAwXG4gICAgICAgICAgICAgICAgLGNhbmRpZGF0ZXMgPSB0aGlzLmNhbmRpZGF0ZXNcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIFBoeXNpY3MudXRpbC5jbGVhckFycmF5KCBlbmNvdW50ZXJzICk7XG4gICAgICAgICAgICBQaHlzaWNzLnV0aWwuY2xlYXJBcnJheSggY2FuZGlkYXRlcyApO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgeHl6ID0gMDsgeHl6IDwgbWF4RG9mOyArK3h5eiApe1xuXG4gICAgICAgICAgICAgICAgLy8gaXMgdGhlIHggY29vcmRcbiAgICAgICAgICAgICAgICBpc1ggPSAoeHl6ID09PSAwKTtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGludGVydmFsIGxpc3QgZm9yIHRoaXMgYXhpc1xuICAgICAgICAgICAgICAgIGxpc3QgPSB0aGlzLmludGVydmFsTGlzdHNbIHh5eiBdO1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggaW50ZXJ2YWwgYm91bmRcbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kID0gbGlzdFsgaSBdO1xuICAgICAgICAgICAgICAgICAgICB0cjEgPSBib3VuZC50cmFja2VyO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggYm91bmQudHlwZSApe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpcyBhIG1heFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gZW5jbGVuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCBqID0gZW5jbGVuIC0gMTsgaiA+PSAwOyBqLS0gKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyMiA9IGVuY291bnRlcnNbIGogXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXkgYXJlIHRoZSBzYW1lIHRyYWNrZWQgaW50ZXJ2YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRyMiA9PT0gdHIxICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBpbnRlcnZhbCBmcm9tIHRoZSBlbmNvdW50ZXJzIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFzdGVyIHRoYW4gLnNwbGljZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaiA8IGVuY2xlbiAtIDEgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuY291bnRlcnNbIGogXSA9IGVuY291bnRlcnMucG9wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5jb3VudGVyZWQgYSBtYXggcmlnaHQgYWZ0ZXIgYSBtaW4uLi4gbm8gb3ZlcmxhcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb3VudGVycy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuY2xlbi0tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBoYXZlIGZsYWdnZWQgdGhpcyBwYWlyIGJlZm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIHRoZSB4IGF4aXMsIGNyZWF0ZSBhIHBhaXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IHRoaXMuZ2V0UGFpciggdHIxLCB0cjIsIGlzWCApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYyAmJiBjLmZsYWcgPCBjb2xsaXNpb25GbGFnICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0J3MgZ3JlYXRlciB0aGFuIHRoZSBheGlzIGluZGV4LCBzZXQgdGhlIGZsYWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvID0gMC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5vdCwgaW5jcmVtZW50IHRoZSBmbGFnIGJ5IG9uZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuZmxhZyA9IGMuZmxhZyA8PCAoeHl6ICsgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGMuZmxhZyB3aWxsIGVxdWFsIGNvbGxpc2lvbkZsYWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlJ3ZlIGluY3JlbWVudGVkIHRoZSBmbGFnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbm91Z2ggdGhhdCBhbGwgYXhlcyBhcmUgb3ZlcmxhcHBpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYy5mbGFnID09PSBjb2xsaXNpb25GbGFnICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdmVybGFwcyBvbiBhbGwgYXhlcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgaXQgdG8gcG9zc2libGUgY29sbGlzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FuZGlkYXRlcyBsaXN0IGZvciBuYXJyb3cgcGhhc2VcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXMucHVzaCggYyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlzIGEgbWluXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBqdXN0IGFkZCB0aGlzIG1pbmltdW0gdG8gdGhlIGVuY291bnRlcnMgbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5jbGVuID0gZW5jb3VudGVycy5wdXNoKCB0cjEgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIFN3ZWVwUHJ1bmVCZWhhdmlvciN1cGRhdGVJbnRlcnZhbHMoKVxuICAgICAgICAgKlxuICAgICAgICAgKiBVcGRhdGUgcG9zaXRpb24gaW50ZXJ2YWxzIG9uIGVhY2ggYXhpc1xuICAgICAgICAgKiovXG4gICAgICAgIHVwZGF0ZUludGVydmFsczogZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIHRyXG4gICAgICAgICAgICAgICAgLGludHJcbiAgICAgICAgICAgICAgICAsYWFiYlxuICAgICAgICAgICAgICAgICxsaXN0ID0gdGhpcy50cmFja2VkXG4gICAgICAgICAgICAgICAgLGkgPSBsaXN0Lmxlbmd0aFxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgLy8gZm9yIGFsbCB0cmFja2VkIGJvZGllc1xuICAgICAgICAgICAgd2hpbGUgKCAoLS1pKSA+PSAwICl7XG5cbiAgICAgICAgICAgICAgICB0ciA9IGxpc3RbIGkgXTtcbiAgICAgICAgICAgICAgICBpbnRyID0gdHIuaW50ZXJ2YWw7XG4gICAgICAgICAgICAgICAgYWFiYiA9IHRyLmJvZHkuYWFiYigpO1xuXG4gICAgICAgICAgICAgICAgLy8gY29weSB0aGUgcG9zaXRpb24gKHBsdXMgb3IgbWludXMpIHRoZSBhYWJiIGhhbGYtZGltZW5zaW9uc1xuICAgICAgICAgICAgICAgIC8vIGludG8gdGhlIG1pbi9tYXggaW50ZXJ2YWxzXG4gICAgICAgICAgICAgICAgaW50ci5taW4udmFsLmNsb25lKCBhYWJiICkuc3ViKCBhYWJiLmh3LCBhYWJiLmhoICk7XG4gICAgICAgICAgICAgICAgaW50ci5tYXgudmFsLmNsb25lKCBhYWJiICkuYWRkKCBhYWJiLmh3LCBhYWJiLmhoICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIFN3ZWVwUHJ1bmVCZWhhdmlvciN0cmFja0JvZHkoIGRhdGEgKVxuICAgICAgICAgKiAtIGRhdGEgKE9iamVjdCk6IEV2ZW50IGRhdGFcbiAgICAgICAgICpcbiAgICAgICAgICogRXZlbnQgY2FsbGJhY2sgdG8gYWRkIGJvZHkgdG8gbGlzdCBvZiB0aG9zZSB0cmFja2VkIGJ5IHN3ZWVwIGFuZCBwcnVuZVxuICAgICAgICAgKiovXG4gICAgICAgIHRyYWNrQm9keTogZnVuY3Rpb24oIGRhdGEgKXtcblxuICAgICAgICAgICAgdmFyIGJvZHkgPSBkYXRhLmJvZHlcbiAgICAgICAgICAgICAgICAsdHJhY2tlciA9IHtcblxuICAgICAgICAgICAgICAgICAgICBpZDogZ2V0VW5pcXVlSWQoKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsaW50ciA9IHtcblxuICAgICAgICAgICAgICAgICAgICBtaW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZhbHNlLCAvL21pblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsOiBuZXcgUGh5c2ljcy52ZWN0b3IoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrZXI6IHRyYWNrZXJcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBtYXg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRydWUsIC8vbWF4XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWw6IG5ldyBQaHlzaWNzLnZlY3RvcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tlcjogdHJhY2tlclxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgdHJhY2tlci5pbnRlcnZhbCA9IGludHI7XG4gICAgICAgICAgICB0aGlzLnRyYWNrZWQucHVzaCggdHJhY2tlciApO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgeHl6ID0gMDsgeHl6IDwgbWF4RG9mOyArK3h5eiApe1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbExpc3RzWyB4eXogXS5wdXNoKCBpbnRyLm1pbiwgaW50ci5tYXggKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogU3dlZXBQcnVuZUJlaGF2aW9yI3VudHJhY2tCb2R5KCBkYXRhIClcbiAgICAgICAgICogLSBkYXRhIChPYmplY3QpOiBFdmVudCBkYXRhXG4gICAgICAgICAqXG4gICAgICAgICAqIEV2ZW50IGNhbGxiYWNrIHRvIHJlbW92ZSBib2R5IGZyb20gbGlzdCBvZiB0aG9zZSB0cmFja2VkXG4gICAgICAgICAqKi9cbiAgICAgICAgdW50cmFja0JvZHk6IGZ1bmN0aW9uKCBkYXRhICl7XG5cbiAgICAgICAgICAgIHZhciBib2R5ID0gZGF0YS5ib2R5XG4gICAgICAgICAgICAgICAgLGxpc3RcbiAgICAgICAgICAgICAgICAsbWlubWF4XG4gICAgICAgICAgICAgICAgLHRyYWNrZWRMaXN0ID0gdGhpcy50cmFja2VkXG4gICAgICAgICAgICAgICAgLHRyYWNrZXJcbiAgICAgICAgICAgICAgICAsY291bnRcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IHRyYWNrZWRMaXN0Lmxlbmd0aDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgdHJhY2tlciA9IHRyYWNrZWRMaXN0WyBpIF07XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRyYWNrZXIuYm9keSA9PT0gYm9keSApe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgdHJhY2tlciBhdCB0aGlzIGluZGV4XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrZWRMaXN0LnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKCB2YXIgeHl6ID0gMDsgeHl6IDwgbWF4RG9mOyArK3h5eiApe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0gdGhpcy5pbnRlcnZhbExpc3RzWyB4eXogXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggdmFyIGogPSAwLCBtID0gbGlzdC5sZW5ndGg7IGogPCBtOyArK2ogKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbm1heCA9IGxpc3RbIGogXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWlubWF4ID09PSB0cmFja2VyLmludGVydmFsLm1pbiB8fCBtaW5tYXggPT09IHRyYWNrZXIuaW50ZXJ2YWwubWF4ICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGludGVydmFsIGZyb20gbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsLS07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBpbnRlcm5hbFxuICAgICAgICAgKiBTd2VlcFBydW5lQmVoYXZpb3Ijc3dlZXAoIGRhdGEgKVxuICAgICAgICAgKiAtIGRhdGEgKE9iamVjdCk6IEV2ZW50IGRhdGFcbiAgICAgICAgICpcbiAgICAgICAgICogRXZlbnQgY2FsbGJhY2sgdG8gc3dlZXAgYW5kIHB1Ymxpc2ggZXZlbnQgaWYgYW55IGNhbmRpZGF0ZSBjb2xsaXNpb25zIGFyZSBmb3VuZFxuICAgICAgICAgKiovXG4gICAgICAgIHN3ZWVwOiBmdW5jdGlvbiggZGF0YSApe1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICAsY2FuZGlkYXRlc1xuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgY2FuZGlkYXRlcyA9IHNlbGYuYnJvYWRQaGFzZSgpO1xuXG4gICAgICAgICAgICBpZiAoIGNhbmRpZGF0ZXMubGVuZ3RoICl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl93b3JsZC5lbWl0KCB0aGlzLm9wdGlvbnMuY2hhbm5lbCwge1xuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBjYW5kaWRhdGVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9iZWhhdmlvcnMvdmVybGV0LWNvbnN0cmFpbnRzLmpzXG5cbi8qKlxuICogY2xhc3MgVmVybGV0Q29uc3RyYWludHNCZWhhdmlvciA8IEJlaGF2aW9yXG4gKlxuICogYFBoeXNpY3MuYmVoYXZpb3IoJ3ZlcmxldC1jb25zdHJhaW50cycpYC5cbiAqXG4gKiBWZXJsZXQgY29uc3RyYWludHMgbWFuYWdlci5cbiAqXG4gKiBIYW5kbGVzIGRpc3RhbmNlIGNvbnN0cmFpbnRzLCBhbmQgYW5nbGUgY29uc3RyYWludHNcbiAqXG4gKiBBZGRpdGlvbmFsIG9wdGlvbnMgaW5jbHVkZTpcbiAqIC0gaXRlcmF0aW9uczogVGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIHRha2UgdG8gcmVsYXggdGhlIGNvbnN0cmFpbnRzLiAoZGVmYXVsdDogYDJgKVxuICoqL1xuUGh5c2ljcy5iZWhhdmlvcigndmVybGV0LWNvbnN0cmFpbnRzJywgZnVuY3Rpb24oIHBhcmVudCApe1xuXG4gICAgdmFyIFRXT1BJID0gMiAqIE1hdGguUEk7XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG5cbiAgICAgICAgLy8gbnVtYmVyIG9mIGl0ZXJhdGlvbnMgdG8gcmVzb2x2ZSBjb25zdHJhaW50c1xuICAgICAgICBpdGVyYXRpb25zOiAyXG4gICAgfTtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgcGFyZW50LmluaXQuY2FsbCggdGhpcyApO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRlZmF1bHRzKCBkZWZhdWx0cyApO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zKCBvcHRpb25zICk7XG5cbiAgICAgICAgICAgIHRoaXMuX2Rpc3RhbmNlQ29uc3RyYWludHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2FuZ2xlQ29uc3RyYWludHMgPSBbXTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBjb25uZWN0OiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgdmFyIGludGcgPSB3b3JsZC5pbnRlZ3JhdG9yKCk7XG5cbiAgICAgICAgICAgIGlmICggaW50ZyAmJiBpbnRnLm5hbWUuaW5kZXhPZigndmVybGV0JykgPCAwICl7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyAnVGhlIHJpZ2lkIGNvbnN0cmFpbnQgbWFuYWdlciBuZWVkcyBhIHdvcmxkIHdpdGggYSBcInZlcmxldFwiIGNvbXBhdGlibGUgaW50ZWdyYXRvci4nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3b3JsZC5vbignaW50ZWdyYXRlOnBvc2l0aW9ucycsIHRoaXMucmVzb2x2ZSwgdGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgZGlzY29ubmVjdDogZnVuY3Rpb24oIHdvcmxkICl7XG5cbiAgICAgICAgICAgIHdvcmxkLm9mZignaW50ZWdyYXRlOnBvc2l0aW9ucycsIHRoaXMucmVzb2x2ZSwgdGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZlcmxldENvbnN0cmFpbnRzQmVoYXZpb3IjZHJvcCgpIC0+IHRoaXNcbiAgICAgICAgICpcbiAgICAgICAgICogUmVtb3ZlIGFsbCBjb25zdHJhaW50c1xuICAgICAgICAgKiovXG4gICAgICAgIGRyb3A6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIC8vIGRyb3AgdGhlIGN1cnJlbnQgY29uc3RyYWludHNcbiAgICAgICAgICAgIHRoaXMuX2Rpc3RhbmNlQ29uc3RyYWludHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2FuZ2xlQ29uc3RyYWludHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWZXJsZXRDb25zdHJhaW50c0JlaGF2aW9yI2Rpc3RhbmNlQ29uc3RyYWludCggYm9keUEsIGJvZHlCWywgc3RpZmZuZXNzLCB0YXJnZXRMZW5ndGhdICkgLT4gT2JqZWN0XG4gICAgICAgICAqIC0gYm9keUEgKEJvZHkpOiBGaXJzdCBib2R5XG4gICAgICAgICAqIC0gYm9keUIgKEJvZHkpOiBTZWNvbmQgYm9keVxuICAgICAgICAgKiAtIHN0aWZmbmVzcyAoTnVtYmVyKTogQSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxIHRoYXQgcmVwcmVzZW50cyB0aGUgc3RpZmZuZXNzIG9mIHRoZSBjb25zdHJhaW50LiBEZWZhdWx0cyB0bzogYDAuNWBcbiAgICAgICAgICogLSB0YXJnZXRMZW5ndGggKE51bWJlcik6IFRhcmdldCBsZW5ndGguIGRlZmF1bHRzIHRvIGN1cnJlbnQgZGlzdGFuY2UgYmV0d2VlbiB0aGUgYm9kaWVzXG4gICAgICAgICAqICsgKE9iamVjdCk6IFRoZSBjb25zdHJhaW50IGRhdGEgb2JqZWN0XG4gICAgICAgICAqXG4gICAgICAgICAqIENvbnN0cmFpbiB0d28gYm9kaWVzIHRvIGEgdGFyZ2V0IHJlbGF0aXZlIGRpc3RhbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIGNvbnN0cmFpbnQgZGF0YSB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlbW92ZSB0aGUgY29uc3RyYWludCBsYXRlci5cbiAgICAgICAgICpcbiAgICAgICAgICogLSBgLmJvZHlBYCBhbmQgYC5ib2R5QmAgYXJlIHJlZmVyZW5jZXMgdG8gdGhlIGJvZGllc1xuICAgICAgICAgKiAtIGAudHlwZWAgaXMgdGhlIHR5cGUgb2YgY29uc3RyYWludFxuICAgICAgICAgKiAtIGAuaWRgIGlzIHRoZSBzdHJpbmcgSUQgb2YgdGhlIGNvbnN0cmFpbnRcbiAgICAgICAgICogLSBgLnN0aWZmbmVzc2AgaXMgdGhlIHN0aWZmbmVzc1xuICAgICAgICAgKiAtIGAudGFyZ2V0TGVuZ3RoYCBpcyB0aGUgdGFyZ2V0IGxlbmd0aFxuICAgICAgICAgKiovXG4gICAgICAgIGRpc3RhbmNlQ29uc3RyYWludDogZnVuY3Rpb24oIGJvZHlBLCBib2R5Qiwgc3RpZmZuZXNzLCB0YXJnZXRMZW5ndGggKXtcblxuICAgICAgICAgICAgdmFyIGNzdDtcblxuICAgICAgICAgICAgaWYgKCFib2R5QSB8fCAhYm9keUIpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjc3QgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IFBoeXNpY3MudXRpbC51bmlxdWVJZCgnZGlzLWNvbnN0cmFpbnQnKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZGlzJyxcbiAgICAgICAgICAgICAgICBib2R5QTogYm9keUEsXG4gICAgICAgICAgICAgICAgYm9keUI6IGJvZHlCLFxuICAgICAgICAgICAgICAgIHN0aWZmbmVzczogc3RpZmZuZXNzIHx8IDAuNSxcbiAgICAgICAgICAgICAgICB0YXJnZXRMZW5ndGg6IHRhcmdldExlbmd0aCB8fCBib2R5Qi5zdGF0ZS5wb3MuZGlzdCggYm9keUEuc3RhdGUucG9zIClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNzdC50YXJnZXRMZW5ndGhTcSA9IGNzdC50YXJnZXRMZW5ndGggKiBjc3QudGFyZ2V0TGVuZ3RoO1xuXG4gICAgICAgICAgICB0aGlzLl9kaXN0YW5jZUNvbnN0cmFpbnRzLnB1c2goIGNzdCApO1xuICAgICAgICAgICAgcmV0dXJuIGNzdDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVmVybGV0Q29uc3RyYWludHNCZWhhdmlvciNhbmdsZUNvbnN0cmFpbnQoIGJvZHlBLCBib2R5QiwgYm9keUNbLCBzdGlmZm5lc3MsIHRhcmdldEFuZ2xlXSApIC0+IE9iamVjdFxuICAgICAgICAgKiAtIGJvZHlBIChCb2R5KTogRmlyc3QgYm9keVxuICAgICAgICAgKiAtIGJvZHlCIChCb2R5KTogU2Vjb25kIGJvZHlcbiAgICAgICAgICogLSBib2R5QyAoQm9keSk6IFRoaXJkIGJvZHlcbiAgICAgICAgICogLSBzdGlmZm5lc3MgKE51bWJlcik6IEEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMSB0aGF0IHJlcHJlc2VudHMgdGhlIHN0aWZmbmVzcyBvZiB0aGUgY29uc3RyYWludC4gRGVmYXVsdHMgdG86IGAwLjVgXG4gICAgICAgICAqIC0gdGFyZ2V0QW5nbGUgKE51bWJlcik6IFRhcmdldCBhbmdsZS4gRGVmYXVsdHMgdG8gdGhlIGN1cnJlbnQgYW5nbGUgYmV0d2VlbiBib2RpZXNcbiAgICAgICAgICogKyAoT2JqZWN0KTogVGhlIGNvbnN0cmFpbnQgZGF0YSBvYmplY3RcbiAgICAgICAgICpcbiAgICAgICAgICogQ29uc3RyYWluIHRocmVlIGJvZGllcyB0byBhIHRhcmdldCByZWxhdGl2ZSBhbmdsZVxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIGNvbnN0cmFpbnQgZGF0YSB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlbW92ZSB0aGUgY29uc3RyYWludCBsYXRlci5cbiAgICAgICAgICpcbiAgICAgICAgICogLSBgLmJvZHlBYCwgYC5ib2R5QmAsIGFuZCBgLmJvZHlDYCBhcmUgcmVmZXJlbmNlcyB0byB0aGUgYm9kaWVzXG4gICAgICAgICAqIC0gYC50eXBlYCBpcyB0aGUgdHlwZSBvZiBjb25zdHJhaW50XG4gICAgICAgICAqIC0gYC5pZGAgaXMgdGhlIHN0cmluZyBJRCBvZiB0aGUgY29uc3RyYWludFxuICAgICAgICAgKiAtIGAuc3RpZmZuZXNzYCBpcyB0aGUgc3RpZmZuZXNzXG4gICAgICAgICAqIC0gYC50YXJnZXRBbmdsZWAgaXMgdGhlIHRhcmdldCBhbmdsZVxuICAgICAgICAgKiovXG4gICAgICAgIGFuZ2xlQ29uc3RyYWludDogZnVuY3Rpb24oIGJvZHlBLCBib2R5QiwgYm9keUMsIHN0aWZmbmVzcywgdGFyZ2V0QW5nbGUgKXtcblxuICAgICAgICAgICAgdmFyIGNzdDtcblxuICAgICAgICAgICAgaWYgKCFib2R5QSB8fCAhYm9keUIpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjc3QgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IFBoeXNpY3MudXRpbC51bmlxdWVJZCgnYW5nLWNvbnN0cmFpbnQnKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnYW5nJyxcbiAgICAgICAgICAgICAgICBib2R5QTogYm9keUEsXG4gICAgICAgICAgICAgICAgYm9keUI6IGJvZHlCLFxuICAgICAgICAgICAgICAgIGJvZHlDOiBib2R5QyxcbiAgICAgICAgICAgICAgICBzdGlmZm5lc3M6IHN0aWZmbmVzcyB8fCAwLjUsXG4gICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGU6IHRhcmdldEFuZ2xlIHx8IGJvZHlCLnN0YXRlLnBvcy5hbmdsZTIoIGJvZHlBLnN0YXRlLnBvcywgYm9keUMuc3RhdGUucG9zIClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuX2FuZ2xlQ29uc3RyYWludHMucHVzaCggY3N0ICk7XG4gICAgICAgICAgICByZXR1cm4gY3N0O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWZXJsZXRDb25zdHJhaW50c0JlaGF2aW9yI3JlbW92ZSggY29uc3RyYWludERhdGEgKSAtPiB0aGlzXG4gICAgICAgICAqIFZlcmxldENvbnN0cmFpbnRzQmVoYXZpb3IjcmVtb3ZlKCBjb25zdHJhaW50SWQgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gY29uc3RyYWludERhdGEgKE9iamVjdCk6IFRoZSBjb25zdHJhaW50IGRhdGEgcmV0dXJuZWQgd2hlbiBjcmVhdGluZyBhIGNvbnN0cmFpbnRcbiAgICAgICAgICogLSBjb25zdHJhaW50SWQgKFN0cmluZyk6IFRoZSBjb25zdHJhaW50IGlkXG4gICAgICAgICAqXG4gICAgICAgICAqIFJlbW92ZSBhIGNvbnN0cmFpbnRcbiAgICAgICAgICoqL1xuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCBjc3RyT3JJZCApe1xuXG4gICAgICAgICAgICB2YXIgY29uc3RyYWludHNcbiAgICAgICAgICAgICAgICAsdHlwZVxuICAgICAgICAgICAgICAgICxpc09ialxuICAgICAgICAgICAgICAgICxpXG4gICAgICAgICAgICAgICAgLGxcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGlzT2JqID0gUGh5c2ljcy51dGlsLmlzT2JqZWN0KCBjc3RyT3JJZCApO1xuXG4gICAgICAgICAgICB0eXBlID0gKGlzT2JqKSA/IGNzdHJPcklkLnR5cGUgOiBjc3RyT3JJZC5zdWJzdHIoMCwgMyk7XG4gICAgICAgICAgICBjb25zdHJhaW50cyA9ICggdHlwZSA9PT0gJ2FuZycgKSA/IHRoaXMuX2FuZ2xlQ29uc3RyYWludHMgOiB0aGlzLl9kaXN0YW5jZUNvbnN0cmFpbnRzO1xuXG4gICAgICAgICAgICBpZiAoIGlzT2JqICl7XG5cbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMCwgbCA9IGNvbnN0cmFpbnRzLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggY29uc3RyYWludHNbIGkgXSA9PT0gY3N0ck9ySWQgKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHMuc3BsaWNlKCBpLCAxICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMCwgbCA9IGNvbnN0cmFpbnRzLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggY29uc3RyYWludHNbIGkgXS5pZCA9PT0gY3N0ck9ySWQgKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHMuc3BsaWNlKCBpLCAxICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIFZlcmxldENvbnN0cmFpbnRzQmVoYXZpb3IjcmVzb2x2ZUFuZ2xlQ29uc3RyYWludHMoIGNvZWYgKVxuICAgICAgICAgKiAtIGNvZWYgKE51bWJlcik6IENvZWZmaWNpZW50IGZvciB0aGlzIHJlc29sdXRpb24gcGhhc2VcbiAgICAgICAgICpcbiAgICAgICAgICogUmVzb2x2ZSBhbmdsZSBjb25zdHJhaW50cy5cbiAgICAgICAgICoqL1xuICAgICAgICByZXNvbHZlQW5nbGVDb25zdHJhaW50czogZnVuY3Rpb24oIGNvZWYgKXtcblxuICAgICAgICAgICAgdmFyIGNvbnN0cmFpbnRzID0gdGhpcy5fYW5nbGVDb25zdHJhaW50c1xuICAgICAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAsdHJhbnMgPSBzY3JhdGNoLnRyYW5zZm9ybSgpXG4gICAgICAgICAgICAgICAgLGNvblxuICAgICAgICAgICAgICAgICxhbmdcbiAgICAgICAgICAgICAgICAsY29yclxuICAgICAgICAgICAgICAgICxwcm9wb3J0aW9uXG4gICAgICAgICAgICAgICAgLGludk1hc3NTdW1cbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGNvbnN0cmFpbnRzLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgY29uID0gY29uc3RyYWludHNbIGkgXTtcblxuICAgICAgICAgICAgICAgIGFuZyA9IGNvbi5ib2R5Qi5zdGF0ZS5wb3MuYW5nbGUyKCBjb24uYm9keUEuc3RhdGUucG9zLCBjb24uYm9keUMuc3RhdGUucG9zICk7XG4gICAgICAgICAgICAgICAgY29yciA9IGFuZyAtIGNvbi50YXJnZXRBbmdsZTtcblxuICAgICAgICAgICAgICAgIGlmICghY29ycil7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvcnIgPD0gLU1hdGguUEkpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvcnIgKz0gVFdPUEk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvcnIgPj0gTWF0aC5QSSl7XG5cbiAgICAgICAgICAgICAgICAgICAgY29yciAtPSBUV09QSTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cmFucy5zZXRUcmFuc2xhdGlvbiggY29uLmJvZHlCLnN0YXRlLnBvcyApO1xuXG4gICAgICAgICAgICAgICAgY29yciAqPSAtY29lZiAqIGNvbi5zdGlmZm5lc3M7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGNvbi5ib2R5QS50cmVhdG1lbnQgPT09ICdkeW5hbWljJyAmJiBjb24uYm9keUIudHJlYXRtZW50ID09PSAnZHluYW1pYycgJiYgY29uLmJvZHlDLnRyZWF0bWVudCA9PT0gJ2R5bmFtaWMnICl7XG4gICAgICAgICAgICAgICAgICAgIGludk1hc3NTdW0gPSAxIC8gKGNvbi5ib2R5QS5tYXNzICsgY29uLmJvZHlCLm1hc3MgKyBjb24uYm9keUMubWFzcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCBjb24uYm9keUEudHJlYXRtZW50ID09PSAnZHluYW1pYycgKXtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbi5ib2R5Qi50cmVhdG1lbnQgPT09ICdkeW5hbWljJyAmJiBjb24uYm9keUMudHJlYXRtZW50ID09PSAnZHluYW1pYycgKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nID0gY29yciAqIChjb24uYm9keUIubWFzcyArIGNvbi5ib2R5Qy5tYXNzKSAqIGludk1hc3NTdW07XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggY29uLmJvZHlCLnRyZWF0bWVudCAhPT0gJ2R5bmFtaWMnICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZyA9IGNvcnIgKiBjb24uYm9keUMubWFzcyAvICggY29uLmJvZHlDLm1hc3MgKyBjb24uYm9keUEubWFzcyApO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZyA9IGNvcnIgKiBjb24uYm9keUIubWFzcyAvICggY29uLmJvZHlCLm1hc3MgKyBjb24uYm9keUEubWFzcyApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB0cmFucy5zZXRSb3RhdGlvbiggYW5nICk7XG4gICAgICAgICAgICAgICAgICAgIGNvbi5ib2R5QS5zdGF0ZS5wb3MudHJhbnNsYXRlSW52KCB0cmFucyApO1xuICAgICAgICAgICAgICAgICAgICBjb24uYm9keUEuc3RhdGUucG9zLnJvdGF0ZSggdHJhbnMgKTtcbiAgICAgICAgICAgICAgICAgICAgY29uLmJvZHlBLnN0YXRlLnBvcy50cmFuc2xhdGUoIHRyYW5zICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCBjb24uYm9keUMudHJlYXRtZW50ID09PSAnZHluYW1pYycgKXtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbi5ib2R5QS50cmVhdG1lbnQgPT09ICdkeW5hbWljJyAmJiBjb24uYm9keUIudHJlYXRtZW50ID09PSAnZHluYW1pYycgKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nID0gLWNvcnIgKiAoY29uLmJvZHlCLm1hc3MgKyBjb24uYm9keUEubWFzcykgKiBpbnZNYXNzU3VtO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGNvbi5ib2R5Qi50cmVhdG1lbnQgIT09ICdkeW5hbWljJyApe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmcgPSAtY29yciAqIGNvbi5ib2R5QS5tYXNzIC8gKCBjb24uYm9keUMubWFzcyArIGNvbi5ib2R5QS5tYXNzICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nID0gLWNvcnIgKiBjb24uYm9keUIubWFzcyAvICggY29uLmJvZHlCLm1hc3MgKyBjb24uYm9keUMubWFzcyApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnMuc2V0Um90YXRpb24oIGFuZyApO1xuICAgICAgICAgICAgICAgICAgICBjb24uYm9keUMuc3RhdGUucG9zLnRyYW5zbGF0ZUludiggdHJhbnMgKTtcbiAgICAgICAgICAgICAgICAgICAgY29uLmJvZHlDLnN0YXRlLnBvcy5yb3RhdGUoIHRyYW5zICk7XG4gICAgICAgICAgICAgICAgICAgIGNvbi5ib2R5Qy5zdGF0ZS5wb3MudHJhbnNsYXRlKCB0cmFucyApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggY29uLmJvZHlCLnRyZWF0bWVudCA9PT0gJ2R5bmFtaWMnICl7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjb24uYm9keUEudHJlYXRtZW50ID09PSAnZHluYW1pYycgJiYgY29uLmJvZHlDLnRyZWF0bWVudCA9PT0gJ2R5bmFtaWMnICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZyA9IGNvcnIgKiAoY29uLmJvZHlBLm1hc3MgKyBjb24uYm9keUMubWFzcykgKiBpbnZNYXNzU3VtO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGNvbi5ib2R5QS50cmVhdG1lbnQgIT09ICdkeW5hbWljJyApe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmcgPSBjb3JyICogY29uLmJvZHlDLm1hc3MgLyAoIGNvbi5ib2R5Qy5tYXNzICsgY29uLmJvZHlCLm1hc3MgKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmcgPSBjb3JyICogY29uLmJvZHlBLm1hc3MgLyAoIGNvbi5ib2R5QS5tYXNzICsgY29uLmJvZHlDLm1hc3MgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZyA9IGNvcnI7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnMuc2V0Um90YXRpb24oIGFuZyApLnNldFRyYW5zbGF0aW9uKCBjb24uYm9keUEuc3RhdGUucG9zICk7XG4gICAgICAgICAgICAgICAgICAgIGNvbi5ib2R5Qi5zdGF0ZS5wb3MudHJhbnNsYXRlSW52KCB0cmFucyApO1xuICAgICAgICAgICAgICAgICAgICBjb24uYm9keUIuc3RhdGUucG9zLnJvdGF0ZSggdHJhbnMgKTtcbiAgICAgICAgICAgICAgICAgICAgY29uLmJvZHlCLnN0YXRlLnBvcy50cmFuc2xhdGUoIHRyYW5zICk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnMuc2V0VHJhbnNsYXRpb24oIGNvbi5ib2R5Qy5zdGF0ZS5wb3MgKTtcbiAgICAgICAgICAgICAgICAgICAgY29uLmJvZHlCLnN0YXRlLnBvcy50cmFuc2xhdGVJbnYoIHRyYW5zICk7XG4gICAgICAgICAgICAgICAgICAgIGNvbi5ib2R5Qi5zdGF0ZS5wb3Mucm90YXRlSW52KCB0cmFucyApO1xuICAgICAgICAgICAgICAgICAgICBjb24uYm9keUIuc3RhdGUucG9zLnRyYW5zbGF0ZSggdHJhbnMgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb24uYm9keUEuc2xlZXBDaGVjaygpO1xuICAgICAgICAgICAgICAgIGNvbi5ib2R5Qi5zbGVlcENoZWNrKCk7XG4gICAgICAgICAgICAgICAgY29uLmJvZHlDLnNsZWVwQ2hlY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIFZlcmxldENvbnN0cmFpbnRzQmVoYXZpb3IjcmVzb2x2ZURpc3RhbmNlQ29uc3RyYWludHMoIGNvZWYgKVxuICAgICAgICAgKiAtIGNvZWYgKE51bWJlcik6IENvZWZmaWNpZW50IGZvciB0aGlzIHJlc29sdXRpb24gcGhhc2VcbiAgICAgICAgICpcbiAgICAgICAgICogUmVzb2x2ZSBkaXN0YW5jZSBjb25zdHJhaW50cy5cbiAgICAgICAgICoqL1xuICAgICAgICByZXNvbHZlRGlzdGFuY2VDb25zdHJhaW50czogZnVuY3Rpb24oIGNvZWYgKXtcblxuICAgICAgICAgICAgdmFyIGNvbnN0cmFpbnRzID0gdGhpcy5fZGlzdGFuY2VDb25zdHJhaW50c1xuICAgICAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAsQkEgPSBzY3JhdGNoLnZlY3RvcigpXG4gICAgICAgICAgICAgICAgLGNvblxuICAgICAgICAgICAgICAgICxsZW5cbiAgICAgICAgICAgICAgICAsY29yclxuICAgICAgICAgICAgICAgICxwcm9wb3J0aW9uXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBjb25zdHJhaW50cy5sZW5ndGg7IGkgPCBsOyArK2kgKXtcblxuICAgICAgICAgICAgICAgIGNvbiA9IGNvbnN0cmFpbnRzWyBpIF07XG5cbiAgICAgICAgICAgICAgICAvLyBtb3ZlIGNvbnN0cmFpbmVkIGJvZGllcyB0byB0YXJnZXQgbGVuZ3RoIGJhc2VkIG9uIHRoZWlyXG4gICAgICAgICAgICAgICAgLy8gbWFzcyBwcm9wb3J0aW9uc1xuICAgICAgICAgICAgICAgIEJBLmNsb25lKCBjb24uYm9keUIuc3RhdGUucG9zICkudnN1YiggY29uLmJvZHlBLnN0YXRlLnBvcyApO1xuICAgICAgICAgICAgICAgIGxlbiA9IEJBLm5vcm1TcSgpIHx8IE1hdGgucmFuZG9tKCkgKiAwLjAwMDE7XG4gICAgICAgICAgICAgICAgY29yciA9IGNvZWYgKiBjb24uc3RpZmZuZXNzICogKCBsZW4gLSBjb24udGFyZ2V0TGVuZ3RoU3EgKSAvIGxlbjtcblxuICAgICAgICAgICAgICAgIEJBLm11bHQoIGNvcnIgKTtcbiAgICAgICAgICAgICAgICBwcm9wb3J0aW9uID0gKGNvbi5ib2R5QS50cmVhdG1lbnQgIT09ICdkeW5hbWljJyB8fCBjb24uYm9keUIudHJlYXRtZW50ICE9PSAnZHluYW1pYycpID8gMSA6IGNvbi5ib2R5Qi5tYXNzIC8gKGNvbi5ib2R5QS5tYXNzICsgY29uLmJvZHlCLm1hc3MpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBjb24uYm9keUEudHJlYXRtZW50ID09PSAnZHluYW1pYycgKXtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbi5ib2R5Qi50cmVhdG1lbnQgPT09ICdkeW5hbWljJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgQkEubXVsdCggcHJvcG9ydGlvbiApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uLmJvZHlBLnN0YXRlLnBvcy52YWRkKCBCQSApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggY29uLmJvZHlCLnRyZWF0bWVudCA9PT0gJ2R5bmFtaWMnICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBCQS5tdWx0KCAxIC8gcHJvcG9ydGlvbiApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCBjb24uYm9keUIudHJlYXRtZW50ID09PSAnZHluYW1pYycgKXtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbi5ib2R5QS50cmVhdG1lbnQgPT09ICdkeW5hbWljJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgQkEubXVsdCggMSAtIHByb3BvcnRpb24gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbi5ib2R5Qi5zdGF0ZS5wb3MudnN1YiggQkEgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb24uYm9keUEuc2xlZXBDaGVjaygpO1xuICAgICAgICAgICAgICAgIGNvbi5ib2R5Qi5zbGVlcENoZWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBpbnRlcm5hbFxuICAgICAgICAgKiBWZXJsZXRDb25zdHJhaW50c0JlaGF2aW9yI3NodWZmbGVDb25zdHJhaW50cygpXG4gICAgICAgICAqXG4gICAgICAgICAqIE1peCB1cCB0aGUgY29uc3RyYWludHMuXG4gICAgICAgICAqKi9cbiAgICAgICAgc2h1ZmZsZUNvbnN0cmFpbnRzOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB0aGlzLl9kaXN0YW5jZUNvbnN0cmFpbnRzID0gUGh5c2ljcy51dGlsLnNodWZmbGUoIHRoaXMuX2Rpc3RhbmNlQ29uc3RyYWludHMgKTtcbiAgICAgICAgICAgIHRoaXMuX2FuZ2xlQ29uc3RyYWludHMgPSBQaHlzaWNzLnV0aWwuc2h1ZmZsZSggdGhpcy5fYW5nbGVDb25zdHJhaW50cyApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBpbnRlcm5hbFxuICAgICAgICAgKiBWZXJsZXRDb25zdHJhaW50c0JlaGF2aW9yI3Jlc29sdmUoKVxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXNvbHZlIGFsbCBjb25zdHJhaW50cy5cbiAgICAgICAgICoqL1xuICAgICAgICByZXNvbHZlOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgaXRzID0gdGhpcy5vcHRpb25zLml0ZXJhdGlvbnNcbiAgICAgICAgICAgICAgICAsY29lZiA9IDEgLyBpdHNcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRzOyBpKyspe1xuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zaHVmZmxlQ29uc3RyYWludHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVEaXN0YW5jZUNvbnN0cmFpbnRzKCBjb2VmICk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlQW5nbGVDb25zdHJhaW50cyggY29lZiApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWZXJsZXRDb25zdHJhaW50c0JlaGF2aW9yI2dldENvbnN0cmFpbnRzKCkgLT4gT2JqZWN0XG4gICAgICAgICAqICsgKE9iamVjdCk6IFRoZSBvYmplY3QgY29udGFpbmluZyBjb3BpZWQgYXJyYXlzIG9mIHRoZSBjb25zdHJhaW50c1xuICAgICAgICAgKlxuICAgICAgICAgKiBHZXQgYWxsIGNvbnN0cmFpbnRzLlxuICAgICAgICAgKiovXG4gICAgICAgIGdldENvbnN0cmFpbnRzOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlQ29uc3RyYWludHM6IFtdLmNvbmNhdCh0aGlzLl9kaXN0YW5jZUNvbnN0cmFpbnRzKSxcbiAgICAgICAgICAgICAgICBhbmdsZUNvbnN0cmFpbnRzOiBbXS5jb25jYXQodGhpcy5fYW5nbGVDb25zdHJhaW50cylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9pbnRlZ3JhdG9ycy9pbXByb3ZlZC1ldWxlci5qc1xuXG5QaHlzaWNzLmludGVncmF0b3IoJ2ltcHJvdmVkLWV1bGVyJywgZnVuY3Rpb24oIHBhcmVudCApe1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNsYXNzIEltcHJvdmVkRXVsZXIgPCBJbnRlZ3JhdG9yXG4gICAgICAgICAqXG4gICAgICAgICAqIGBQaHlzaWNzLmludGVncmF0b3IoJ2ltcHJvdmVkLWV1bGVyJylgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgaW1wcm92ZWQgZXVsZXIgaW50ZWdyYXRvci5cbiAgICAgICAgICoqL1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIC8vIGNhbGwgcGFyZW50IGluaXRcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW50ZWdyYXRlVmVsb2NpdGllczogZnVuY3Rpb24oIGJvZGllcywgZHQgKXtcblxuICAgICAgICAgICAgLy8gaGFsZiB0aGUgdGltZXN0ZXAgc3F1YXJlZFxuICAgICAgICAgICAgdmFyIGRyYWcgPSAxIC0gdGhpcy5vcHRpb25zLmRyYWdcbiAgICAgICAgICAgICAgICAsYm9keSA9IG51bGxcbiAgICAgICAgICAgICAgICAsc3RhdGVcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGJvZGllcy5sZW5ndGg7IGkgPCBsOyArK2kgKXtcblxuICAgICAgICAgICAgICAgIGJvZHkgPSBib2RpZXNbIGkgXTtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGJvZHkuc3RhdGU7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGludGVncmF0ZSBpZiB0aGUgYm9keSBpc24ndCBmaXhlZFxuICAgICAgICAgICAgICAgIGlmICggYm9keS50cmVhdG1lbnQgIT09ICdzdGF0aWMnICYmICFib2R5LnNsZWVwKCBkdCApICl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSW5zcGlyZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc291bHdpcmUvQ29mZmVlLVBoeXNpY3NcbiAgICAgICAgICAgICAgICAgICAgLy8gQGxpY2VuY2UgTUlUXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIHggKz0gKHYgKiBkdCkgKyAoYSAqIDAuNSAqIGR0ICogZHQpXG4gICAgICAgICAgICAgICAgICAgIC8vIHYgKz0gYSAqIGR0XG5cblxuICAgICAgICAgICAgICAgICAgICAvLyBTY2FsZSBmb3JjZSB0byBtYXNzLlxuICAgICAgICAgICAgICAgICAgICAvLyBzdGF0ZS5hY2MubXVsdCggYm9keS5tYXNzSW52ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdmVsb2NpdHkgZm9yIGZ1dHVyZSB1c2UuXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC52ZWwuY2xvbmUoIHN0YXRlLnZlbCApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbWVtYmVyIG9yaWdpbmFsIGFjY1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQuYWNjLmNsb25lKCBzdGF0ZS5hY2MgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdmVsb2NpdHkgZmlyc3Qgc28gd2UgY2FuIHJldXNlIHRoZSBhY2MgdmVjdG9yLlxuICAgICAgICAgICAgICAgICAgICAvLyBhICo9IGR0XG4gICAgICAgICAgICAgICAgICAgIC8vIHYgKz0gYSAuLi5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudmVsLnZhZGQoIHN0YXRlLmFjYy5tdWx0KCBkdCApICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwbHkgXCJhaXIgcmVzaXN0YW5jZVwiLlxuICAgICAgICAgICAgICAgICAgICBpZiAoIGRyYWcgKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudmVsLm11bHQoIGRyYWcgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IGFjY2VsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFjYy56ZXJvKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gQW5ndWxhciBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vXG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFuZ3VsYXIudmVsID0gc3RhdGUuYW5ndWxhci52ZWw7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIudmVsICs9IHN0YXRlLmFuZ3VsYXIuYWNjICogZHQ7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIuYWNjID0gMDtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgdmVsb2NpdHkgYW5kIGFjY2VsZXJhdGlvbiB0byB6ZXJvIVxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS52ZWwuemVybygpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hY2MuemVybygpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hbmd1bGFyLnZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIuYWNjID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW50ZWdyYXRlUG9zaXRpb25zOiBmdW5jdGlvbiggYm9kaWVzLCBkdCApe1xuXG4gICAgICAgICAgICAvLyBoYWxmIHRoZSB0aW1lc3RlcCBzcXVhcmVkXG4gICAgICAgICAgICB2YXIgaGFsZmR0ZHQgPSAwLjUgKiBkdCAqIGR0XG4gICAgICAgICAgICAgICAgLGJvZHkgPSBudWxsXG4gICAgICAgICAgICAgICAgLHN0YXRlXG4gICAgICAgICAgICAgICAgLy8gdXNlIGNhY2hlZCB2ZWN0b3IgaW5zdGFuY2VzXG4gICAgICAgICAgICAgICAgLy8gc28gd2UgZG9uJ3QgbmVlZCB0byByZWNyZWF0ZSB0aGVtIGluIGEgbG9vcFxuICAgICAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAsdmVsID0gc2NyYXRjaC52ZWN0b3IoKVxuICAgICAgICAgICAgICAgICxhbmdWZWxcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGJvZGllcy5sZW5ndGg7IGkgPCBsOyArK2kgKXtcblxuICAgICAgICAgICAgICAgIGJvZHkgPSBib2RpZXNbIGkgXTtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGJvZHkuc3RhdGU7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGludGVncmF0ZSBpZiB0aGUgYm9keSBpc24ndCBmaXhlZFxuICAgICAgICAgICAgICAgIGlmICggYm9keS50cmVhdG1lbnQgIT09ICdzdGF0aWMnICYmICFib2R5LnNsZWVwKCkgKXtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIHByZXZpb3VzIGxvY2F0aW9uLlxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQucG9zLmNsb25lKCBzdGF0ZS5wb3MgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIC4uLlxuICAgICAgICAgICAgICAgICAgICAvLyBvbGRWICo9IGR0XG4gICAgICAgICAgICAgICAgICAgIC8vIGEgKj0gMC41ICogZHRcbiAgICAgICAgICAgICAgICAgICAgLy8geCArPSBvbGRWICsgYVxuICAgICAgICAgICAgICAgICAgICB2ZWwuY2xvbmUoIHN0YXRlLm9sZC52ZWwgKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucG9zLnZhZGQoIHZlbC5tdWx0KCBkdCApICkudmFkZCggc3RhdGUub2xkLmFjYy5tdWx0KCBoYWxmZHRkdCApICk7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFjYy56ZXJvKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gQW5ndWxhciBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vXG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFuZ3VsYXIucG9zID0gc3RhdGUuYW5ndWxhci5wb3M7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIucG9zICs9IHN0YXRlLm9sZC5hbmd1bGFyLnZlbCAqIGR0ICsgc3RhdGUub2xkLmFuZ3VsYXIuYWNjICogaGFsZmR0ZHQ7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hbmd1bGFyLmFjYyA9IDA7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvaW50ZWdyYXRvcnMvdmVsb2NpdHktdmVybGV0LWFsdC5qc1xuXG5QaHlzaWNzLmludGVncmF0b3IoJ3ZlbG9jaXR5LXZlcmxldC1hbHQnLCBmdW5jdGlvbiggcGFyZW50ICl7XG5cbiAgICAvLyBmb3IgdGhpcyBpbnRlZ3JhdG9yIHdlIG5lZWQgdG8ga25vdyBpZiB0aGUgb2JqZWN0IGhhcyBiZWVuIGludGVncmF0ZWQgYmVmb3JlXG4gICAgLy8gc28gbGV0J3MgYWRkIGEgbWl4aW4gdG8gYm9kaWVzXG5cbiAgICBQaHlzaWNzLmJvZHkubWl4aW4oe1xuXG4gICAgICAgIHN0YXJ0ZWQ6IGZ1bmN0aW9uKCB2YWwgKXtcbiAgICAgICAgICAgIGlmICggdmFsICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5fc3RhcnRlZDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogY2xhc3MgVmVsb2NpdHlWZXJsZXQgPCBJbnRlZ3JhdG9yXG4gICAgICAgICAqXG4gICAgICAgICAqIGBQaHlzaWNzLmludGVncmF0b3IoJ3ZlbG9jaXR5LXZlcmxldCcpYC5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIHZlbG9jaXR5LXZlcmxldCBpbnRlZ3JhdG9yLlxuICAgICAgICAgKiovXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgLy8gY2FsbCBwYXJlbnQgaW5pdFxuICAgICAgICAgICAgcGFyZW50LmluaXQuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBpbnRlZ3JhdGVWZWxvY2l0aWVzOiBmdW5jdGlvbiggYm9kaWVzLCBkdCApe1xuXG4gICAgICAgICAgICAvLyBoYWxmIHRoZSB0aW1lc3RlcFxuICAgICAgICAgICAgdmFyIGR0ZHQgPSBkdCAqIGR0XG4gICAgICAgICAgICAgICAgLGRyYWcgPSAxIC0gdGhpcy5vcHRpb25zLmRyYWdcbiAgICAgICAgICAgICAgICAsYm9keSA9IG51bGxcbiAgICAgICAgICAgICAgICAsc3RhdGVcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGJvZGllcy5sZW5ndGg7IGkgPCBsOyArK2kgKXtcblxuICAgICAgICAgICAgICAgIGJvZHkgPSBib2RpZXNbIGkgXTtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGJvZHkuc3RhdGU7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGludGVncmF0ZSBpZiB0aGUgYm9keSBpc24ndCBzdGF0aWNcbiAgICAgICAgICAgICAgICBpZiAoIGJvZHkudHJlYXRtZW50ICE9PSAnc3RhdGljJyApe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHYgPSB2X3ByZXYgKyAwLjUgKiAoYV9wcmV2ICsgYSkgKiBkdFxuICAgICAgICAgICAgICAgICAgICAvLyB4ID0geF9wcmV2ICsgdl9wcmV2ICogZHQgKyAwLjUgKiBhX3ByZXYgKiBkdCAqIGR0XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHRoZSB2ZWxvY2l0eSBpbiB2ZWwgaWYgdGhlIHZlbG9jaXR5IGhhcyBiZWVuIGNoYW5nZWQgbWFudWFsbHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhYm9keS5zdGFydGVkKCkgKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IG9sZCB2YWxzIG9uIGZpcnN0IGludGVncmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQuYWNjLmNsb25lKCBzdGF0ZS5hY2MgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hY2MubXVsdCggZHQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC52ZWwuY2xvbmUoIHN0YXRlLnZlbCApLnZzdWIoIHN0YXRlLm9sZC5hY2MgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hY2MubXVsdCggMS9kdCApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwbHkgXCJhaXIgcmVzaXN0YW5jZVwiLlxuICAgICAgICAgICAgICAgICAgICBpZiAoIGRyYWcgKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudmVsLm11bHQoIGRyYWcgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IGFjY2VsZXJhdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyB2ICs9IDAuNSAqIChhX3ByZXYgKyBhKSAqIGR0XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnZlbC52YWRkKCBzdGF0ZS5vbGQuYWNjLnZhZGQoIHN0YXRlLmFjYyApLm11bHQoIDAuNSAqIGR0ICkgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNldCBhY2NlbFxuICAgICAgICAgICAgICAgICAgICAvLyBzdGF0ZS5hY2MuemVybygpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuZ3VsYXIgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgICAgICAvL1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWJvZHkuc3RhcnRlZCgpICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldCBvbGQgdmFscyBvbiBmaXJzdCBpbnRlZ3JhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFuZ3VsYXIuYWNjID0gc3RhdGUuYW5ndWxhci5hY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQuYW5ndWxhci52ZWwgPSBzdGF0ZS5hbmd1bGFyLnZlbCAtIHN0YXRlLm9sZC5hbmd1bGFyLmFjYyAqIGR0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYW5ndWxhci52ZWwgKz0gMC41ICogKHN0YXRlLmFuZ3VsYXIuYWNjICsgc3RhdGUub2xkLmFuZ3VsYXIuYWNjKSAqIGR0O1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hbmd1bGFyLmFjYyA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgYm9keS5zdGFydGVkKCB0cnVlICk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHZlbG9jaXR5IGFuZCBhY2NlbGVyYXRpb24gdG8gemVybyFcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudmVsLnplcm8oKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYWNjLnplcm8oKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYW5ndWxhci52ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hbmd1bGFyLmFjYyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGludGVncmF0ZVBvc2l0aW9uczogZnVuY3Rpb24oIGJvZGllcywgZHQgKXtcblxuICAgICAgICAgICAgLy8gaGFsZiB0aGUgdGltZXN0ZXBcbiAgICAgICAgICAgIHZhciBkdGR0ID0gZHQgKiBkdFxuICAgICAgICAgICAgICAgICxib2R5ID0gbnVsbFxuICAgICAgICAgICAgICAgICxzdGF0ZVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgZm9yICggdmFyIGkgPSAwLCBsID0gYm9kaWVzLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgYm9keSA9IGJvZGllc1sgaSBdO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gYm9keS5zdGF0ZTtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgaW50ZWdyYXRlIGlmIHRoZSBib2R5IGlzbid0IHN0YXRpY1xuICAgICAgICAgICAgICAgIGlmICggYm9keS50cmVhdG1lbnQgIT09ICdzdGF0aWMnICl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8geCA9IHhfcHJldiArIHZfcHJldiAqIGR0ICsgMC41ICogYV9wcmV2ICogZHQgKiBkdFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIG9sZCBwb3NpdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgLy8geG9sZCA9IHhcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLnBvcy5jbG9uZSggc3RhdGUucG9zICk7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLnZlbC5tdWx0KCBkdCApO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQuYWNjLm11bHQoIDAuNSAqIGR0ZHQgKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucG9zLnZhZGQoIHN0YXRlLm9sZC52ZWwgKS52YWRkKCBzdGF0ZS5vbGQuYWNjICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc3RvcmUgY2FsY3VsYXRlZCB2ZWxvY2l0eVxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQudmVsLmNsb25lKCBzdGF0ZS52ZWwgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzdG9yZSBvbGQgYWNjXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hY2MuY2xvbmUoIHN0YXRlLmFjYyApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IGFjY2VsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFjYy56ZXJvKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gQW5ndWxhciBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hbmd1bGFyLnBvcyA9IHN0YXRlLmFuZ3VsYXIucG9zO1xuXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIucG9zICs9IHN0YXRlLmFuZ3VsYXIudmVsICogZHQgKyAwLjUgKiBzdGF0ZS5vbGQuYW5ndWxhci5hY2MgKiBkdGR0O1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQuYW5ndWxhci52ZWwgPSBzdGF0ZS5hbmd1bGFyLnZlbDtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFuZ3VsYXIuYWNjID0gc3RhdGUuYW5ndWxhci5hY2M7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIuYWNjID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9pbnRlZ3JhdG9ycy92ZWxvY2l0eS12ZXJsZXQuanNcblxuUGh5c2ljcy5pbnRlZ3JhdG9yKCd2ZWxvY2l0eS12ZXJsZXQnLCBmdW5jdGlvbiggcGFyZW50ICl7XG5cbiAgICAvLyBmb3IgdGhpcyBpbnRlZ3JhdG9yIHdlIG5lZWQgdG8ga25vdyBpZiB0aGUgb2JqZWN0IGhhcyBiZWVuIGludGVncmF0ZWQgYmVmb3JlXG4gICAgLy8gc28gbGV0J3MgYWRkIGEgbWl4aW4gdG8gYm9kaWVzXG5cbiAgICBQaHlzaWNzLmJvZHkubWl4aW4oe1xuXG4gICAgICAgIHN0YXJ0ZWQ6IGZ1bmN0aW9uKCB2YWwgKXtcbiAgICAgICAgICAgIGlmICggdmFsICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5fc3RhcnRlZDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogY2xhc3MgVmVsb2NpdHlWZXJsZXQgPCBJbnRlZ3JhdG9yXG4gICAgICAgICAqXG4gICAgICAgICAqIGBQaHlzaWNzLmludGVncmF0b3IoJ3ZlbG9jaXR5LXZlcmxldCcpYC5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIHZlbG9jaXR5LXZlcmxldCBpbnRlZ3JhdG9yLlxuICAgICAgICAgKiovXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgLy8gY2FsbCBwYXJlbnQgaW5pdFxuICAgICAgICAgICAgcGFyZW50LmluaXQuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW50ZWdyYXRvciNpbnRlZ3JhdGUoIGJvZGllcywgZHQgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gYm9kaWVzIChBcnJheSk6IExpc3Qgb2YgYm9kaWVzIHRvIGludGVncmF0ZVxuICAgICAgICAgKiAtIGR0IChOdW1iZXIpOiBUaW1lc3RlcCBzaXplXG4gICAgICAgICAqXG4gICAgICAgICAqIEludGVncmF0ZSBib2RpZXMgYnkgdGltZXN0ZXAuXG4gICAgICAgICAqXG4gICAgICAgICAqIFdpbGwgZW1pdCBgaW50ZWdyYXRlOnZlbG9jaXRpZXNgIGFuZCBgaW50ZWdyYXRlOnBvc2l0aW9uc2BcbiAgICAgICAgICogZXZlbnRzIG9uIHRoZSB3b3JsZC5cbiAgICAgICAgICoqL1xuICAgICAgICBpbnRlZ3JhdGU6IGZ1bmN0aW9uKCBib2RpZXMsIGR0ICl7XG5cbiAgICAgICAgICAgIHZhciB3b3JsZCA9IHRoaXMuX3dvcmxkO1xuXG4gICAgICAgICAgICB0aGlzLmludGVncmF0ZVBvc2l0aW9ucyggYm9kaWVzLCBkdCApO1xuXG4gICAgICAgICAgICBpZiAoIHdvcmxkICl7XG4gICAgICAgICAgICAgICAgd29ybGQuZW1pdCgnaW50ZWdyYXRlOnBvc2l0aW9ucycsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9kaWVzOiBib2RpZXMsXG4gICAgICAgICAgICAgICAgICAgIGR0OiBkdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmludGVncmF0ZVZlbG9jaXRpZXMoIGJvZGllcywgZHQgKTtcblxuICAgICAgICAgICAgaWYgKCB3b3JsZCApe1xuICAgICAgICAgICAgICAgIHdvcmxkLmVtaXQoJ2ludGVncmF0ZTp2ZWxvY2l0aWVzJywge1xuICAgICAgICAgICAgICAgICAgICBib2RpZXM6IGJvZGllcyxcbiAgICAgICAgICAgICAgICAgICAgZHQ6IGR0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGludGVncmF0ZVZlbG9jaXRpZXM6IGZ1bmN0aW9uKCBib2RpZXMsIGR0ICl7XG5cbiAgICAgICAgICAgIC8vIGhhbGYgdGhlIHRpbWVzdGVwXG4gICAgICAgICAgICB2YXIgZHRkdCA9IGR0ICogZHRcbiAgICAgICAgICAgICAgICAsZHJhZyA9IDEgLSB0aGlzLm9wdGlvbnMuZHJhZ1xuICAgICAgICAgICAgICAgICxib2R5ID0gbnVsbFxuICAgICAgICAgICAgICAgICxzdGF0ZVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgZm9yICggdmFyIGkgPSAwLCBsID0gYm9kaWVzLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgYm9keSA9IGJvZGllc1sgaSBdO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gYm9keS5zdGF0ZTtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgaW50ZWdyYXRlIGlmIHRoZSBib2R5IGlzbid0IHN0YXRpY1xuICAgICAgICAgICAgICAgIGlmICggYm9keS50cmVhdG1lbnQgIT09ICdzdGF0aWMnICYmICFib2R5LnNsZWVwKCkgKXtcblxuICAgICAgICAgICAgICAgICAgICAvLyB2ID0gdl9wcmV2ICsgMC41ICogKGFfcHJldiArIGEpICogZHRcbiAgICAgICAgICAgICAgICAgICAgLy8geCA9IHhfcHJldiArIHZfcHJldiAqIGR0ICsgMC41ICogYV9wcmV2ICogZHQgKiBkdFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IFwiYWlyIHJlc2lzdGFuY2VcIi5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBkcmFnICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnZlbC5tdWx0KCBkcmFnICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBhY2NlbGVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gdiArPSAwLjUgKiAoYV9wcmV2ICsgYSkgKiBkdFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQudmVsLmNsb25lKCBzdGF0ZS52ZWwgKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudmVsLnZhZGQoIHN0YXRlLm9sZC5hY2MudmFkZCggc3RhdGUuYWNjICkubXVsdCggMC41ICogZHQgKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IGFjY2VsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hY2MuY2xvbmUoIHN0YXRlLmFjYyApO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hY2MuemVybygpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuZ3VsYXIgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgICAgICAvL1xuXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hbmd1bGFyLnZlbCA9IHN0YXRlLmFuZ3VsYXIudmVsO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQuYW5ndWxhci5hY2MgPSBzdGF0ZS5hbmd1bGFyLmFjYztcblxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hbmd1bGFyLnZlbCArPSAwLjUgKiAoc3RhdGUuYW5ndWxhci5hY2MgKyBzdGF0ZS5vbGQuYW5ndWxhci5hY2MpICogZHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYW5ndWxhci5hY2MgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuc3RhcnRlZCggdHJ1ZSApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSB2ZWxvY2l0eSBhbmQgYWNjZWxlcmF0aW9uIHRvIHplcm8hXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnZlbC56ZXJvKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFjYy56ZXJvKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFuZ3VsYXIudmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYW5ndWxhci5hY2MgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBpbnRlZ3JhdGVQb3NpdGlvbnM6IGZ1bmN0aW9uKCBib2RpZXMsIGR0ICl7XG5cbiAgICAgICAgICAgIC8vIGhhbGYgdGhlIHRpbWVzdGVwXG4gICAgICAgICAgICB2YXIgZHRkdCA9IGR0ICogZHRcbiAgICAgICAgICAgICAgICAsYm9keSA9IG51bGxcbiAgICAgICAgICAgICAgICAsc3RhdGVcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGJvZGllcy5sZW5ndGg7IGkgPCBsOyArK2kgKXtcblxuICAgICAgICAgICAgICAgIGJvZHkgPSBib2RpZXNbIGkgXTtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGJvZHkuc3RhdGU7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGludGVncmF0ZSBpZiB0aGUgYm9keSBpc24ndCBzdGF0aWNcbiAgICAgICAgICAgICAgICBpZiAoIGJvZHkudHJlYXRtZW50ICE9PSAnc3RhdGljJyAmJiAhYm9keS5zbGVlcCggZHQgKSApe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHggPSB4X3ByZXYgKyB2X3ByZXYgKiBkdCArIDAuNSAqIGFfcHJldiAqIGR0ICogZHRcblxuICAgICAgICAgICAgICAgICAgICAvLyB1c2UgdGhlIHZlbG9jaXR5IGluIHZlbCBpZiB0aGUgdmVsb2NpdHkgaGFzIGJlZW4gY2hhbmdlZCBtYW51YWxseVxuICAgICAgICAgICAgICAgICAgICBpZiAoICFib2R5LnN0YXJ0ZWQoKSApe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgb2xkIHZhbHMgb24gZmlyc3QgaW50ZWdyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5hY2MuY2xvbmUoIHN0YXRlLmFjYyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFjYy5tdWx0KCBkdCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLnZlbC5jbG9uZSggc3RhdGUudmVsICkudnN1Yiggc3RhdGUub2xkLmFjYyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFjYy5tdWx0KCAxL2R0ICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSBvbGQgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIHhvbGQgPSB4XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC5wb3MuY2xvbmUoIHN0YXRlLnBvcyApO1xuXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9sZC52ZWwubXVsdCggZHQgKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFjYy5tdWx0KCAwLjUgKiBkdGR0ICk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnBvcy52YWRkKCBzdGF0ZS5vbGQudmVsICkudmFkZCggc3RhdGUub2xkLmFjYyApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldmVydFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQudmVsLm11bHQoIDEvZHQgKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFjYy5tdWx0KCAyIC8gZHRkdCApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuZ3VsYXIgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgICAgICAvL1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWJvZHkuc3RhcnRlZCgpICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldCBvbGQgdmFscyBvbiBmaXJzdCBpbnRlZ3JhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFuZ3VsYXIuYWNjID0gc3RhdGUuYW5ndWxhci5hY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vbGQuYW5ndWxhci52ZWwgPSBzdGF0ZS5hbmd1bGFyLnZlbCAtIHN0YXRlLm9sZC5hbmd1bGFyLmFjYyAqIGR0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub2xkLmFuZ3VsYXIucG9zID0gc3RhdGUuYW5ndWxhci5wb3M7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYW5ndWxhci5wb3MgKz0gc3RhdGUuYW5ndWxhci52ZWwgKiBkdCArIDAuNSAqIHN0YXRlLm9sZC5hbmd1bGFyLmFjYyAqIGR0ZHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG5cbi8vIC0tLVxuLy8gaW5zaWRlOiBzcmMvcmVuZGVyZXJzL2NhbnZhcy5qc1xuXG4vKipcbiAqIGNsYXNzIENhbnZhc1JlbmRlcmVyIDwgUmVuZGVyZXJcbiAqXG4gKiBQaHlzaWNzLnJlbmRlcmVyKCdjYW52YXMnKVxuICpcbiAqIFJlbmRlcmVyIHRoYXQgdXNlcyBIVE1MQ2FudmFzIHRvIHJlbmRlciB0aGUgd29ybGQgYm9kaWVzLlxuICpcbiAqIEFkZGl0aW9uYWwgY29uZmlnIG9wdGlvbnM6XG4gKlxuICogLSBtZXRhRWw6IEhUTUxFbGVtZW50IHRvIHdyaXRlIG1ldGEgaW5mb3JtYXRpb24gbGlrZSBGUFMgYW5kIElQRiBpbnRvLiAoZGVmYXVsdDogYXV0b2dlbmVyYXRlZClcbiAqIC0gb2Zmc2V0OiBPZmZzZXQgdGhlIHNoYXBlcyBieSB0aGlzIGFtb3VudC4gKGRlZmF1bHQ6IGB7IHg6IDAsIHk6IDAgfWApXG4gKiAtIHN0eWxlczogU3R5bGVzIHRvIHVzZSB0byBkcmF3IHRoZSBzaGFwZXMuIChzZWUgYmVsb3cpXG4gKlxuICogVGhlIHN0eWxlcyBwcm9wZXJ0eSBzaG91bGQgY29udGFpbiBfZGVmYXVsdF8gc3R5bGVzIGZvciBlYWNoIHNoYXBlIHlvdSB3YW50IHRvIGRyYXcuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBzdHlsZXM6IHtcbiAqXG4gKiAgICAnY2lyY2xlJyA6IHtcbiAqICAgICAgICBzdHJva2VTdHlsZTogJyM1NDI0MzcnLFxuICogICAgICAgIGxpbmVXaWR0aDogMSxcbiAqICAgICAgICBmaWxsU3R5bGU6ICcjNTQyNDM3JyxcbiAqICAgICAgICBhbmdsZUluZGljYXRvcjogJ3doaXRlJ1xuICogICAgfSxcbiAqXG4gKiAgICAnY29udmV4LXBvbHlnb24nIDoge1xuICogICAgICAgIHN0cm9rZVN0eWxlOiAnIzU0MjQzNycsXG4gKiAgICAgICAgbGluZVdpZHRoOiAxLFxuICogICAgICAgIGZpbGxTdHlsZTogJyM1NDI0MzcnLFxuICogICAgICAgIGFuZ2xlSW5kaWNhdG9yOiAnd2hpdGUnXG4gKiAgICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBTdHlsZXMgY2FuIGFsc28gYmUgZGVmaW5lZCBvbiBhIHBlci1ib2R5IGJhc2lzLiBVc2UgdGhlIFwic3R5bGVzXCIgcHJvcGVydHkgZm9yIGEgYm9keTpcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIFBoeXNpY3MuYm9keSgnY2lyY2xlJywge1xuICogICAgIC8vIC4uLlxuICogICAgIHN0eWxlczoge1xuICogICAgICAgIHN0cm9rZVN0eWxlOiAnIzU0MjQzNycsXG4gKiAgICAgICAgbGluZVdpZHRoOiAxLFxuICogICAgICAgIGZpbGxTdHlsZTogJyM1NDI0MzcnLFxuICogICAgICAgIGFuZ2xlSW5kaWNhdG9yOiAnd2hpdGUnXG4gKiAgICB9XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIFlvdSBjYW4gYWxzbyBkZWZpbmUgYW4gaW1hZ2UgdG8gdXNlIGZvciBhIGJvZHk6XG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBQaHlzaWNzLmJvZHkoJ2NpcmNsZScsIHtcbiAqICAgICAvLyAuLi5cbiAqICAgICBzdHlsZXM6IHtcbiAqICAgICAgICBzcmM6ICdwYXRoL3RvL2ltYWdlLmpwZycsXG4gKiAgICAgICAgd2lkdGg6IDQwLFxuICogICAgICAgIGhlaWdodDogNTBcbiAqICAgIH1cbiAqIH0pO1xuICogYGBgXG4gKiovXG5QaHlzaWNzLnJlbmRlcmVyKCdjYW52YXMnLCBmdW5jdGlvbiggcHJvdG8gKXtcblxuICAgIGlmICggIWRvY3VtZW50ICl7XG4gICAgICAgIC8vIG11c3QgYmUgaW4gbm9kZSBlbnZpcm9ubWVudFxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgdmFyIFBpMiA9IE1hdGguUEkgKiAyXG4gICAgICAgIC8vIGhlbHBlciB0byBjcmVhdGUgbmV3IGRvbSBlbGVtZW50c1xuICAgICAgICAsbmV3RWwgPSBmdW5jdGlvbiggbm9kZSwgY29udGVudCApe1xuICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlIHx8ICdkaXYnKTtcbiAgICAgICAgICAgIGlmIChjb250ZW50KXtcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgICxjb2xvcnMgPSB7XG4gICAgICAgICAgICB3aGl0ZTogJyNmZmYnXG4gICAgICAgICAgICAsdmlvbGV0OiAnIzU0MjQzNydcbiAgICAgICAgICAgICxibHVlOiAnIzUzNzc3QSdcbiAgICAgICAgfVxuICAgICAgICA7XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG5cbiAgICAgICAgLy8gdGhlIGVsZW1lbnQgdG8gcGxhY2UgbWV0YSBkYXRhIGludG9cbiAgICAgICAgbWV0YUVsOiBudWxsLFxuICAgICAgICAvLyBkZWZhdWx0IHN0eWxlcyBvZiBkcmF3biBvYmplY3RzXG4gICAgICAgIHN0eWxlczoge1xuXG4gICAgICAgICAgICAncG9pbnQnOiBjb2xvcnMuYmx1ZSxcblxuICAgICAgICAgICAgJ2NpcmNsZScgOiB7XG4gICAgICAgICAgICAgICAgc3Ryb2tlU3R5bGU6IGNvbG9ycy5ibHVlLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcbiAgICAgICAgICAgICAgICBmaWxsU3R5bGU6IGNvbG9ycy5ibHVlLFxuICAgICAgICAgICAgICAgIGFuZ2xlSW5kaWNhdG9yOiBjb2xvcnMud2hpdGVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdyZWN0YW5nbGUnIDoge1xuICAgICAgICAgICAgICAgIHN0cm9rZVN0eWxlOiBjb2xvcnMudmlvbGV0LFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcbiAgICAgICAgICAgICAgICBmaWxsU3R5bGU6IGNvbG9ycy52aW9sZXQsXG4gICAgICAgICAgICAgICAgYW5nbGVJbmRpY2F0b3I6IGNvbG9ycy53aGl0ZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ2NvbnZleC1wb2x5Z29uJyA6IHtcbiAgICAgICAgICAgICAgICBzdHJva2VTdHlsZTogY29sb3JzLnZpb2xldCxcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgZmlsbFN0eWxlOiBjb2xvcnMudmlvbGV0LFxuICAgICAgICAgICAgICAgIGFuZ2xlSW5kaWNhdG9yOiBjb2xvcnMud2hpdGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgLy8gY2FsbCBwcm90byBpbml0XG4gICAgICAgICAgICBwcm90by5pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIC8vIGZ1cnRoZXIgb3B0aW9uc1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRlZmF1bHRzKCBkZWZhdWx0cywgdHJ1ZSApO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uQ2hhbmdlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLm9mZnNldCA9IG5ldyBQaHlzaWNzLnZlY3Rvciggc2VsZi5vcHRpb25zLm9mZnNldCApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMoIG9wdGlvbnMsIHRydWUgKTtcblxuICAgICAgICAgICAgLy8gaGlkZGVuIGNhbnZhc1xuICAgICAgICAgICAgdGhpcy5oaWRkZW5DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuQ2FudmFzLndpZHRoID0gdGhpcy5oaWRkZW5DYW52YXMuaGVpZ2h0ID0gMTAwO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGlkZGVuQ2FudmFzLmdldENvbnRleHQpe1xuICAgICAgICAgICAgICAgIHRocm93IFwiQ2FudmFzIG5vdCBzdXBwb3J0ZWRcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5oaWRkZW5DdHggPSB0aGlzLmhpZGRlbkNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAvLyBhY3R1YWwgdmlld3BvcnRcbiAgICAgICAgICAgIHZhciB2aWV3cG9ydCA9IHRoaXMuZWw7XG4gICAgICAgICAgICBpZiAodmlld3BvcnQubm9kZU5hbWUudG9VcHBlckNhc2UoKSAhPT0gJ0NBTlZBUycpe1xuXG4gICAgICAgICAgICAgICAgdmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKCB2aWV3cG9ydCApO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmVsID09PSAnc3RyaW5nJyAmJiB0aGlzLmVsID09PSBkb2N1bWVudC5ib2R5KXtcbiAgICAgICAgICAgICAgICAgICAgdmlld3BvcnQuaWQgPSB0aGlzLm9wdGlvbnMuZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWwgPSB2aWV3cG9ydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmVsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB0aGlzLmN0eCA9IHZpZXdwb3J0LmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZWxzID0ge307XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWV0YSl7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRzID0gdGhpcy5vcHRpb25zLm1ldGFFbCB8fCBuZXdFbCgpO1xuICAgICAgICAgICAgICAgIHN0YXRzLmNsYXNzTmFtZSA9ICdwanMtbWV0YSc7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuZnBzID0gbmV3RWwoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVscy5pcGYgPSBuZXdFbCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHN0YXRzLmFwcGVuZENoaWxkKG5ld0VsKCdzcGFuJywgJ2ZwczogJykpO1xuICAgICAgICAgICAgICAgIHN0YXRzLmFwcGVuZENoaWxkKHRoaXMuZWxzLmZwcyk7XG4gICAgICAgICAgICAgICAgc3RhdHMuYXBwZW5kQ2hpbGQobmV3RWwoJ2JyJykpO1xuICAgICAgICAgICAgICAgIHN0YXRzLmFwcGVuZENoaWxkKG5ld0VsKCdzcGFuJywgJ2lwZjogJykpO1xuICAgICAgICAgICAgICAgIHN0YXRzLmFwcGVuZENoaWxkKHRoaXMuZWxzLmlwZik7XG5cbiAgICAgICAgICAgICAgICB2aWV3cG9ydC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdGF0cywgdmlld3BvcnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9sYXllcnMgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuYWRkTGF5ZXIoICdtYWluJywgdGhpcy5lbCApO1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMub3B0aW9ucy5hdXRvUmVzaXplICl7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoIHRoaXMub3B0aW9ucy53aWR0aCwgdGhpcy5vcHRpb25zLmhlaWdodCApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW52YXNSZW5kZXJlciNsYXllciggaWQgKSAtPiBMYXllclxuICAgICAgICAgKiAtIGlkIChTdHJpbmcpOiBUaGUgaWQgZm9yIHRoZSBsYXllclxuICAgICAgICAgKlxuICAgICAgICAgKiBHZXQgdGhlIGxheWVyIGJ5IGlkLlxuICAgICAgICAgKiovXG4gICAgICAgIGxheWVyOiBmdW5jdGlvbiggaWQgKXtcblxuICAgICAgICAgICAgaWYgKCBpZCBpbiB0aGlzLl9sYXllcnMgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJzWyBpZCBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FudmFzUmVuZGVyZXIjYWRkTGF5ZXIoIGlkWywgZWwsIG9wdHMgXSApIC0+IExheWVyXG4gICAgICAgICAqIC0gaWQgKFN0cmluZyk6IFRoZSBpZCBmb3IgdGhlIGxheWVyXG4gICAgICAgICAqIC0gZWwgKEhUTUxFbGVtZW50KTogVGhlIGNhbnZhcyBlbGVtZW50IHRvIHVzZSBmb3IgdGhpcyBsYXllclxuICAgICAgICAgKiAtIG9wdHMgKE9iamVjdCk6IFRoZSBvcHRpb25zIGZvciB0aGlzIGxheWVyIChzZWUgYmVsb3cpXG4gICAgICAgICAqXG4gICAgICAgICAqIENyZWF0ZSBhIG5ldyBsYXllci5cbiAgICAgICAgICpcbiAgICAgICAgICogTGF5ZXJzIGNhbiBoYXZlIHRoZSBmb2xsb3dpbmcgb3B0aW9uczpcbiAgICAgICAgICpcbiAgICAgICAgICogLSB3aWR0aDogVGhlIHdpZHRoXG4gICAgICAgICAqIC0gaGVpZ2h0OiBUaGUgaGVpZ2h0XG4gICAgICAgICAqIC0gbWFudWFsOiBEcmF3IG1hbnVhbGx5IChkZWZhdWx0OiBgZmFsc2VgKVxuICAgICAgICAgKiAtIGF1dG9SZXNpemU6IEF1dG9tYXRpY2FsbHkgcmVzaXplIHRoZSBsYXllciB3aGVuIHRoZSByZW5kZXJlcidzIFtbQ2FudmFzUmVuZGVyZXIjcmVzaXplXV0gbWV0aG9kIGlzIGNhbGxlZC4gKGRlZmF1bHQ6IGB0cnVlYClcbiAgICAgICAgICogLSBmb2xsb3c6IEEgW1tCb2R5XV0uIE9mZnNldCB0aGlzIGxheWVyJ3MgcmVuZGVyaW5nIHRvIGZvbGxvdyBhIGJvZHkncyBwb3NpdGlvbi4gKGRlZmF1bHQ6IGBudWxsYClcbiAgICAgICAgICogLSBvZmZzZXQ6IFRoZSBvZmZzZXQgW1tWZWN0b3Jpc2hdXSBmb3IgdGhpcyBsYXllci4gKGRlZmF1bHQ6IGBudWxsYClcbiAgICAgICAgICogLSBzY2FsZTogU2NhbGUgdGhlIGxheWVyIGJ5IHRoaXMgYW1vdW50LiAoZGVmYXVsdDogYDFgKVxuICAgICAgICAgKiAtIHpJbmRleDogVGhlIHpJbmRleCBmb3IgdGhlIGxheWVyJ3MgSFRNTEVsZW1lbnQuIChkZWZhdWx0OiBgMWApXG4gICAgICAgICAqKi9cbiAgICAgICAgYWRkTGF5ZXI6IGZ1bmN0aW9uKCBpZCwgZWwsIG9wdHMgKXtcblxuICAgICAgICAgICAgLyoqIGJlbG9uZ3MgdG86IENhbnZhc1JlbmRlcmVyXG4gICAgICAgICAgICAgKiBjbGFzcyBMYXllclxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEEgcmVuZGVyaW5nIGxheWVyIGZvciB0aGUgY2FudmFzIHJlbmRlcmVyLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIENyZWF0ZSBieSBjYWxsaW5nIFtbQ2FudmFzUmVuZGVyZXIjYWRkTGF5ZXJdXS5cbiAgICAgICAgICAgICAqKi9cblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAgICAgLGJvZGllcyA9IFtdXG4gICAgICAgICAgICAgICAgLHN0eWxlcyA9IFBoeXNpY3MudXRpbC5leHRlbmQoe30sIHRoaXMub3B0aW9ucy5zdHlsZXMpXG4gICAgICAgICAgICAgICAgLGxheWVyID0ge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogTGF5ZXIjaWQgPSBTdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICogVGhlIGxheWVyJ3MgSURcbiAgICAgICAgICAgICAgICAgICAgICoqL1xuICAgICAgICAgICAgICAgICAgICBpZDogaWRcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIExheWVyI2VsID0gSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICogVGhlIGxheWVyJ3MgQ2FudmFzXG4gICAgICAgICAgICAgICAgICAgICAqKi9cbiAgICAgICAgICAgICAgICAgICAgLGVsOiBlbCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgICAgICAgICAgICAgICAvKiogcmVsYXRlZCB0bzogUGh5c2ljcy51dGlsLm9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAqIExheWVyI29wdGlvbnMoIG9wdGlvbnMgKSAtPiBPYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAqIC0gb3B0aW9ucyAoT2JqZWN0KTogVGhlIG9wdGlvbnMgdG8gc2V0IGFzIGFuIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICogKyAoT2JqZWN0KTogVGhlIG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAgKiBTZXQgb3B0aW9ucyBvbiB0aGlzIGxheWVyLlxuICAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICAqIEFjY2VzcyBvcHRpb25zIGRpcmVjdGx5IGZyb20gdGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICAqIEV4YW1wbGU6XG4gICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICogYGBgamF2YXNjcmlwdFxuICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5vcHRpb25zLnNvbWVPcHRpb247XG4gICAgICAgICAgICAgICAgICAgICAgKiBgYGBcbiAgICAgICAgICAgICAgICAgICAgICAqKi9cbiAgICAgICAgICAgICAgICAgICAgLG9wdGlvbnM6IFBoeXNpY3MudXRpbC5vcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLmVsLndpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICAsaGVpZ2h0OiB0aGlzLmVsLmhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgLG1hbnVhbDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICxhdXRvUmVzaXplOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAsZm9sbG93OiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAsb2Zmc2V0OiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAsc2NhbGU6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICx6SW5kZXg6IDFcbiAgICAgICAgICAgICAgICAgICAgfSkoIG9wdHMgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGlmICggaWQgaW4gdGhpcy5fbGF5ZXJzICl7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0xheWVyIFwiJyArIGlkICsgJ1wiIGFscmVhZHkgYWRkZWQuJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggbGF5ZXIuZWwsIHRoaXMuZWwgKTtcbiAgICAgICAgICAgIGxheWVyLmVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIGxheWVyLmVsLnN0eWxlLnpJbmRleCA9IGxheWVyLm9wdGlvbnMuekluZGV4O1xuICAgICAgICAgICAgbGF5ZXIuZWwuY2xhc3NOYW1lICs9ICcgcGpzLWxheWVyLScgKyBsYXllci5pZDtcbiAgICAgICAgICAgIGxheWVyLmN0eCA9IGxheWVyLmVsLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICBsYXllci5jdHguc2NhbGUoIDEsIDEgKTtcbiAgICAgICAgICAgIGxheWVyLmVsLndpZHRoID0gbGF5ZXIub3B0aW9ucy53aWR0aDtcbiAgICAgICAgICAgIGxheWVyLmVsLmhlaWdodCA9IGxheWVyLm9wdGlvbnMuaGVpZ2h0O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIExheWVyI2JvZGllcyA9IEFycmF5XG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogVGhlIEJvZGllcyB0aGlzIGxheWVyIGlzIHJlbmRlcmluZy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBUaGUgXCJtYWluXCIgbGF5ZXIgd2lsbCByZW5kZXIgYWxsIHdvcmxkIGJvZGllcyBpZiBpdCdzIGVtcHR5LlxuICAgICAgICAgICAgICoqL1xuICAgICAgICAgICAgbGF5ZXIuYm9kaWVzID0gYm9kaWVzO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIExheWVyI3Jlc2V0KCBbYXJyXSApIC0+IHRoaXNcbiAgICAgICAgICAgICAqIC0gYXJyIChBcnJheSk6IEFycmF5IHRvIHJlcGxhY2UgdGhlIGN1cnJlbnQgc3RhY2sgb2YgQm9kaWVzLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIFJlc2V0IHRoZSBzdGFjay5cbiAgICAgICAgICAgICAqKi9cbiAgICAgICAgICAgIGxheWVyLnJlc2V0ID0gZnVuY3Rpb24oIGFyciApe1xuXG4gICAgICAgICAgICAgICAgYm9kaWVzID0gYXJyIHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTGF5ZXIjYWRkVG9TdGFjayggYXJyICkgLT4gdGhpc1xuICAgICAgICAgICAgICogTGF5ZXIjYWRkVG9TdGFjayggYm9keSApIC0+IHRoaXNcbiAgICAgICAgICAgICAqIC0gYm9keSAoQm9keSk6IEJvZHkgdG8gYWRkXG4gICAgICAgICAgICAgKiAtIGFyciAoQXJyYXkpOiBBcnJheSBvZiBib2RpZXMgdG8gYWRkXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQWRkIGJvZHkgKGJvZGllcykgdG8gdGhlIHJlbmRlcmluZyBzdGFjayBmb3IgdGhpcyBsYXllci5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBCb2RpZXMgbXVzdCBiZSBhZGRlZCB0byB0aGUgc3RhY2sgaW4gb3JkZXIgdG8gYmUgcmVuZGVyZWQgYnkgdGhpcyBsYXllciBVTkxFU1MgaXQgaXMgdGhlIFwibWFpblwiIGxheWVyLlxuICAgICAgICAgICAgICoqL1xuICAgICAgICAgICAgbGF5ZXIuYWRkVG9TdGFjayA9IGZ1bmN0aW9uKCB0aGluZyApe1xuXG4gICAgICAgICAgICAgICAgaWYgKCBQaHlzaWNzLnV0aWwuaXNBcnJheSggdGhpbmcgKSApe1xuICAgICAgICAgICAgICAgICAgICBib2RpZXMucHVzaC5hcHBseSggYm9kaWVzLCB0aGluZyApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZGllcy5wdXNoKCB0aGluZyApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIExheWVyI3JlbW92ZUZyb21TdGFjayggYXJyICkgLT4gdGhpc1xuICAgICAgICAgICAgICogTGF5ZXIjcmVtb3ZlRnJvbVN0YWNrKCBib2R5ICkgLT4gdGhpc1xuICAgICAgICAgICAgICogLSBib2R5IChCb2R5KTogQm9keSB0byByZW1vdmVcbiAgICAgICAgICAgICAqIC0gYXJyIChBcnJheSk6IEFycmF5IG9mIGJvZGllcyB0byByZW1vdmVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBSZW1vdmUgYm9keSAoYm9kaWVzKSBmcm9tIHRoZSByZW5kZXJpbmcgc3RhY2sgZm9yIHRoaXMgbGF5ZXIuXG4gICAgICAgICAgICAgKiovXG4gICAgICAgICAgICBsYXllci5yZW1vdmVGcm9tU3RhY2sgPSBmdW5jdGlvbiggdGhpbmcgKXtcblxuICAgICAgICAgICAgICAgIHZhciBpLCBsO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBQaHlzaWNzLnV0aWwuaXNBcnJheSggdGhpbmcgKSApe1xuICAgICAgICAgICAgICAgICAgICBmb3IgKCBpID0gMCwgbCA9IHRoaW5nLmxlbmd0aDsgaSA8IGw7ICsraSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIucmVtb3ZlRnJvbVN0YWNrKHRoaW5nWyBpIF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IFBoeXNpY3MudXRpbC5pbmRleE9mKCBib2RpZXMsIHRoaW5nICk7XG4gICAgICAgICAgICAgICAgICAgIGlmICggaSA+IC0xICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2RpZXMuc3BsaWNlKCBpLCAxICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBMYXllciNyZW5kZXIoIFtjbGVhcl0gKSAtPiB0aGlzXG4gICAgICAgICAgICAgKiAtIGNsZWFyIChCb29sZWFuKTogQ2xlYXIgdGhlIGNhbnZhcyAoZGVmYXVsdDogYHRydWVgKVxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIFJlbmRlciB0aGUgYm9kaWVzIGluIHRoaXMgbGF5ZXIncyBzdGFjay5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBJZiB5b3Ugd2FudCB5b3UgY2FuIHJlcGxhY2UgdGhpcyBmdW5jdGlvbiB3aXRoIHlvdXIgb3duIHRvIGRvIGN1c3RvbSByZW5kZXJpbmcuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogRXhhbXBsZTpcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICAgICAgICAgKiBsYXllci5yZW5kZXIgPSBteUN1c3RvbVJlbmRlckZuO1xuICAgICAgICAgICAgICogYGBgXG4gICAgICAgICAgICAgKiovXG4gICAgICAgICAgICBsYXllci5yZW5kZXIgPSBmdW5jdGlvbiggY2xlYXIgKXtcblxuICAgICAgICAgICAgICAgIHZhciBib2R5XG4gICAgICAgICAgICAgICAgICAgICxzY3JhdGNoID0gUGh5c2ljcy5zY3JhdGNocGFkKClcbiAgICAgICAgICAgICAgICAgICAgLG9mZnNldCA9IHNjcmF0Y2gudmVjdG9yKCkuc2V0KDAsIDApXG4gICAgICAgICAgICAgICAgICAgICxzY2FsZSA9IGxheWVyLm9wdGlvbnMuc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgLHZpZXdcbiAgICAgICAgICAgICAgICAgICAgLGlcbiAgICAgICAgICAgICAgICAgICAgLGwgPSBib2RpZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICx0ID0gc2VsZi5faW50ZXJwb2xhdGVUaW1lXG4gICAgICAgICAgICAgICAgICAgICxzdGFjayA9IChsIHx8IGxheWVyLmlkICE9PSAnbWFpbicpID8gYm9kaWVzIDogc2VsZi5fd29ybGQuX2JvZGllc1xuICAgICAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGxheWVyLm9wdGlvbnMubWFudWFsICl7XG4gICAgICAgICAgICAgICAgICAgIHNjcmF0Y2guZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCBsYXllci5vcHRpb25zLm9mZnNldCApe1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGxheWVyLm9wdGlvbnMub2Zmc2V0ID09PSAnY2VudGVyJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LmFkZCggbGF5ZXIuZWwud2lkdGggKiAwLjUsIGxheWVyLmVsLmhlaWdodCAqIDAuNSApLm11bHQoIDEvc2NhbGUgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldC52YWRkKCBsYXllci5vcHRpb25zLm9mZnNldCApLm11bHQoIDEvc2NhbGUgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggbGF5ZXIub3B0aW9ucy5mb2xsb3cgKXtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LnZzdWIoIGxheWVyLm9wdGlvbnMuZm9sbG93LnN0YXRlLnBvcyApO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQuc3ViKCBsYXllci5vcHRpb25zLmZvbGxvdy5zdGF0ZS52ZWwuZ2V0KDApKnQsIGxheWVyLm9wdGlvbnMuZm9sbG93LnN0YXRlLnZlbC5nZXQoMSkqdCApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggY2xlYXIgIT09IGZhbHNlICl7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmN0eC5jbGVhclJlY3QoMCwgMCwgbGF5ZXIuZWwud2lkdGgsIGxheWVyLmVsLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCBzY2FsZSAhPT0gMSApe1xuICAgICAgICAgICAgICAgICAgICBsYXllci5jdHguc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBsYXllci5jdHguc2NhbGUoIHNjYWxlLCBzY2FsZSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgKytpICl7XG5cbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IHN0YWNrWyBpIF07XG4gICAgICAgICAgICAgICAgICAgIGlmICggIWJvZHkuaGlkZGVuICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3ID0gYm9keS52aWV3IHx8ICggYm9keS52aWV3ID0gc2VsZi5jcmVhdGVWaWV3KGJvZHkuZ2VvbWV0cnksIGJvZHkuc3R5bGVzIHx8IHN0eWxlc1sgYm9keS5nZW9tZXRyeS5uYW1lIF0pICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRyYXdCb2R5KCBib2R5LCBib2R5LnZpZXcsIGxheWVyLmN0eCwgb2Zmc2V0ICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIHNjYWxlICE9PSAxICl7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2NyYXRjaC5kb25lKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtZW1iZXIgbGF5ZXJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyc1sgaWQgXSA9IGxheWVyO1xuXG4gICAgICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbnZhc1JlbmRlcmVyI3JlbW92ZUxheWVyKCBpZCApIC0+IHRoaXNcbiAgICAgICAgICogQ2FudmFzUmVuZGVyZXIjcmVtb3ZlTGF5ZXIoIGxheWVyICkgLT4gdGhpc1xuICAgICAgICAgKiAtIGlkIChTdHJpbmcpOiBUaGUgaWQgZm9yIHRoZSBsYXllclxuICAgICAgICAgKiAtIGxheWVyIChMYXllcik6IFRoZSBsYXllclxuICAgICAgICAgKlxuICAgICAgICAgKiBSZW1vdmUgYSBsYXllci5cbiAgICAgICAgICoqL1xuICAgICAgICByZW1vdmVMYXllcjogZnVuY3Rpb24oIGlkT3JMYXllciApe1xuXG4gICAgICAgICAgICB2YXIgaWQgPSBpZE9yTGF5ZXIuaWQgPyBpZE9yTGF5ZXIuaWQgOiBpZE9yTGF5ZXJcbiAgICAgICAgICAgICAgICAsZWwgPSB0aGlzLl9sYXllcnNbIGlkIF0uZWxcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGlmICggZWwgIT09IHRoaXMuZWwgKXtcbiAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlbCApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2xheWVyc1sgaWQgXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW52YXNSZW5kZXJlciNyZXNpemUoIHdpZHRoLCBoZWlnaHQgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gd2lkdGggKE51bWJlcik6IFRoZSB3aWR0aFxuICAgICAgICAgKiAtIGhlaWdodCAoTnVtYmVyKTogVGhlIGhlaWdodFxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXNpemUgYWxsIGxheWVyIGNhbnZhc2VzIHRoYXQgaGF2ZSB0aGUgYGF1dG9SZXNpemVgIG9wdGlvbiBzZXQgdG8gYHRydWVgLlxuICAgICAgICAgKiovXG4gICAgICAgIHJlc2l6ZTogZnVuY3Rpb24oIHdpZHRoLCBoZWlnaHQgKXtcblxuICAgICAgICAgICAgdmFyIGxheWVyO1xuICAgICAgICAgICAgcHJvdG8ucmVzaXplLmNhbGwoIHRoaXMsIHdpZHRoLCBoZWlnaHQgKTtcblxuICAgICAgICAgICAgZm9yICggdmFyIGlkIGluIHRoaXMuX2xheWVycyApe1xuXG4gICAgICAgICAgICAgICAgbGF5ZXIgPSB0aGlzLl9sYXllcnNbIGlkIF07XG4gICAgICAgICAgICAgICAgaWYgKCBsYXllci5vcHRpb25zLmF1dG9SZXNpemUgKXtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuZWwud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBsYXllci5lbC5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW52YXNSZW5kZXJlciNzZXRTdHlsZSggc3R5bGVzWywgY3R4XSApXG4gICAgICAgICAqIC0gc3R5bGVzIChPYmplY3R8U3RyaW5nKTogU3R5bGVzIHRvIHNldCBvbiB0aGUgY2FudmFzIGNvbnRleHRcbiAgICAgICAgICogLSBjdHggKENhbnZhczJEQ29udGV4dCk6IFRoZSBjYW52YXMgY29udGV4dFxuICAgICAgICAgKlxuICAgICAgICAgKiBTZXQgc3R5bGVzIG9uIHRoZSBzcGVjaWZpZWQgY2FudmFzIGNvbnRleHQgKG9yIG1haW4gY29udGV4dCkuXG4gICAgICAgICAqKi9cbiAgICAgICAgc2V0U3R5bGU6IGZ1bmN0aW9uKCBzdHlsZXMsIGN0eCApe1xuXG4gICAgICAgICAgICBjdHggPSBjdHggfHwgdGhpcy5jdHg7XG5cbiAgICAgICAgICAgIGlmICggUGh5c2ljcy51dGlsLmlzT2JqZWN0KHN0eWxlcykgKXtcblxuICAgICAgICAgICAgICAgIHN0eWxlcy5zdHJva2VTdHlsZSA9IHN0eWxlcy5saW5lV2lkdGggPyBzdHlsZXMuc3Ryb2tlU3R5bGUgOiAncmdiYSgwLDAsMCwwKSc7XG4gICAgICAgICAgICAgICAgUGh5c2ljcy51dGlsLmV4dGVuZChjdHgsIHN0eWxlcyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY3R4LnN0cm9rZVN0eWxlID0gc3R5bGVzO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW52YXNSZW5kZXJlciNkcmF3Q2lyY2xlKCB4LCB5LCByLCBzdHlsZXNbLCBjdHhdIClcbiAgICAgICAgICogLSB4IChOdW1iZXIpOiBUaGUgeCBjb29yZFxuICAgICAgICAgKiAtIHkgKE51bWJlcik6IFRoZSB5IGNvb3JkXG4gICAgICAgICAqIC0gciAoTnVtYmVyKTogVGhlIGNpcmNsZSByYWRpdXNcbiAgICAgICAgICogLSBzdHlsZXMgKE9iamVjdCk6IFRoZSBzdHlsZXMgY29uZmlndXJhdGlvblxuICAgICAgICAgKiAtIGN0eCAoQ2FudmFzMkRDb250ZXh0KTogVGhlIGNhbnZhcyBjb250ZXh0XG4gICAgICAgICAqXG4gICAgICAgICAqIERyYXcgYSBjaXJjbGUgdG8gc3BlY2lmaWVkIGNhbnZhcyBjb250ZXh0LlxuICAgICAgICAgKiovXG4gICAgICAgIGRyYXdDaXJjbGU6IGZ1bmN0aW9uKHgsIHksIHIsIHN0eWxlcywgY3R4KXtcblxuICAgICAgICAgICAgY3R4ID0gY3R4IHx8IHRoaXMuY3R4O1xuXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKCBzdHlsZXMsIGN0eCApO1xuICAgICAgICAgICAgY3R4LmFyYyh4LCB5LCByLCAwLCBQaTIsIGZhbHNlKTtcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbnZhc1JlbmRlcmVyI2RyYXdQb2x5Z29uKCB2ZXJ0cywgc3R5bGVzWywgY3R4XSApXG4gICAgICAgICAqIC0gdmVydHMgKEFycmF5KTogQXJyYXkgb2YgW1tWZWN0b3Jpc2hdXSB2ZXJ0aWNlc1xuICAgICAgICAgKiAtIHN0eWxlcyAoT2JqZWN0KTogVGhlIHN0eWxlcyBjb25maWd1cmF0aW9uXG4gICAgICAgICAqIC0gY3R4IChDYW52YXMyRENvbnRleHQpOiBUaGUgY2FudmFzIGNvbnRleHRcbiAgICAgICAgICpcbiAgICAgICAgICogRHJhdyBhIHBvbHlnb24gdG8gc3BlY2lmaWVkIGNhbnZhcyBjb250ZXh0LlxuICAgICAgICAgKiovXG4gICAgICAgIGRyYXdQb2x5Z29uOiBmdW5jdGlvbih2ZXJ0cywgc3R5bGVzLCBjdHgpe1xuXG4gICAgICAgICAgICB2YXIgdmVydCA9IHZlcnRzWzBdXG4gICAgICAgICAgICAgICAgLHggPSB2ZXJ0LnhcbiAgICAgICAgICAgICAgICAseSA9IHZlcnQueVxuICAgICAgICAgICAgICAgICxsID0gdmVydHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBjdHggPSBjdHggfHwgdGhpcy5jdHg7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKCBzdHlsZXMsIGN0eCApO1xuXG4gICAgICAgICAgICBjdHgubW92ZVRvKHgsIHkpO1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDE7IGkgPCBsOyArK2kgKXtcblxuICAgICAgICAgICAgICAgIHZlcnQgPSB2ZXJ0c1sgaSBdO1xuICAgICAgICAgICAgICAgIHggPSB2ZXJ0Lng7XG4gICAgICAgICAgICAgICAgeSA9IHZlcnQueTtcbiAgICAgICAgICAgICAgICBjdHgubGluZVRvKHgsIHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGwgPiAyICl7XG4gICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW52YXNSZW5kZXJlciNkcmF3UmVjdCggeCwgeSwgd2lkdGgsIGhlaWdodCwgc3R5bGVzWywgY3R4XSApXG4gICAgICAgICAqIC0geCAoTnVtYmVyKTogVGhlIHggY29vcmRcbiAgICAgICAgICogLSB5IChOdW1iZXIpOiBUaGUgeSBjb29yZFxuICAgICAgICAgKiAtIHdpZHRoIChOdW1iZXIpOiBUaGUgd2lkdGhcbiAgICAgICAgICogLSBoZWlnaHQgKE51bWJlcik6IFRoZSBoZWlnaHRcbiAgICAgICAgICogLSBzdHlsZXMgKE9iamVjdCk6IFRoZSBzdHlsZXMgY29uZmlndXJhdGlvblxuICAgICAgICAgKiAtIGN0eCAoQ2FudmFzMkRDb250ZXh0KTogVGhlIGNhbnZhcyBjb250ZXh0XG4gICAgICAgICAqXG4gICAgICAgICAqIERyYXcgYSByZWN0YW5nbGUgdG8gc3BlY2lmaWVkIGNhbnZhcyBjb250ZXh0LlxuICAgICAgICAgKiovXG4gICAgICAgIGRyYXdSZWN0OiBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBzdHlsZXMsIGN0eCl7XG5cbiAgICAgICAgICAgIHZhciBodyA9IHdpZHRoICogMC41XG4gICAgICAgICAgICAgICAgLGhoID0gaGVpZ2h0ICogMC41XG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBjdHggPSBjdHggfHwgdGhpcy5jdHg7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKCBzdHlsZXMsIGN0eCApO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJlY3QoeCAtIGh3LCB5IC0gaGgsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FudmFzUmVuZGVyZXIjZHJhd0xpbmUoIGZyb20sIHRvLCBzdHlsZXNbLCBjdHhdIClcbiAgICAgICAgICogLSBmcm9tIChWZWN0b3Jpc2gpOiBUaGUgc3RhcnRpbmcgcHRcbiAgICAgICAgICogLSB0byAoVmVjdG9yaXNoKTogVGhlIGVuZGluZyBwdFxuICAgICAgICAgKiAtIHN0eWxlcyAoT2JqZWN0KTogVGhlIHN0eWxlcyBjb25maWd1cmF0aW9uXG4gICAgICAgICAqIC0gY3R4IChDYW52YXMyRENvbnRleHQpOiBUaGUgY2FudmFzIGNvbnRleHRcbiAgICAgICAgICpcbiAgICAgICAgICogRHJhdyBhIGxpbmUgb250byBzcGVjaWZpZWQgY2FudmFzIGNvbnRleHQuXG4gICAgICAgICAqKi9cbiAgICAgICAgZHJhd0xpbmU6IGZ1bmN0aW9uKGZyb20sIHRvLCBzdHlsZXMsIGN0eCl7XG5cbiAgICAgICAgICAgIHZhciB4ID0gZnJvbS54XG4gICAgICAgICAgICAgICAgLHkgPSBmcm9tLnlcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGN0eCA9IGN0eCB8fCB0aGlzLmN0eDtcblxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZSggc3R5bGVzLCBjdHggKTtcblxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcblxuICAgICAgICAgICAgeCA9IHRvLng7XG4gICAgICAgICAgICB5ID0gdG8ueTtcblxuICAgICAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FudmFzUmVuZGVyZXIjZHJhdyggZ2VvbWV0cnlbLCBzdHlsZXMsIGN0eCwgb2Zmc2V0XSApIC0+IHRoaXNcbiAgICAgICAgICogLSBnZW9tZXRyeSAoR2VvbWV0cnkpOiBUaGUgc2hhcGUgdG8gZHJhd1xuICAgICAgICAgKiAtIHN0eWxlcyAoT2JqZWN0KTogVGhlIHN0eWxlcyBjb25maWd1cmF0aW9uXG4gICAgICAgICAqIC0gY3R4IChDYW52YXMyRENvbnRleHQpOiBUaGUgY2FudmFzIGNvbnRleHRcbiAgICAgICAgICogLSBvZmZzZXQgKFZlY3RvcmlzaCk6IFRoZSBvZmZzZXQgZnJvbSBjZW50ZXJcbiAgICAgICAgICpcbiAgICAgICAgICogRHJhdyBhIGdlb21ldHJ5IHRvIGEgY29udGV4dC5cbiAgICAgICAgICoqL1xuICAgICAgICBkcmF3OiBmdW5jdGlvbiggZ2VvbWV0cnksIHN0eWxlcywgY3R4LCBvZmZzZXQgKXtcblxuICAgICAgICAgICAgdmFyIG5hbWUgPSBnZW9tZXRyeS5uYW1lXG4gICAgICAgICAgICAgICAgLHggPSArKG9mZnNldCAmJiBvZmZzZXQueClcbiAgICAgICAgICAgICAgICAseSA9ICsob2Zmc2V0ICYmIG9mZnNldC55KVxuICAgICAgICAgICAgICAgICx3ID0gZ2VvbWV0cnkuYWFiYigpLmh3XG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBjdHggPSBjdHggfHwgdGhpcy5jdHg7XG4gICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgfHwgdGhpcy5vcHRpb25zLnN0eWxlc1sgbmFtZSBdIHx8IHRoaXMub3B0aW9ucy5zdHlsZXMuY2lyY2xlIHx8IHt9O1xuXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh4LCB5KTtcblxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdjaXJjbGUnKXtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NpcmNsZSgwLCAwLCBnZW9tZXRyeS5yYWRpdXMsIHN0eWxlcywgY3R4KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnY29udmV4LXBvbHlnb24nKXtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BvbHlnb24oZ2VvbWV0cnkudmVydGljZXMsIHN0eWxlcywgY3R4KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAncmVjdGFuZ2xlJyl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdSZWN0KDAsIDAsIGdlb21ldHJ5LndpZHRoLCBnZW9tZXRyeS5oZWlnaHQsIHN0eWxlcywgY3R4KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnY29tcG91bmQnKXtcblxuICAgICAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbCA9IGdlb21ldHJ5LmNoaWxkcmVuLmxlbmd0aCwgY2g7IGkgPCBsOyBpKysgKXtcbiAgICAgICAgICAgICAgICAgICAgY2ggPSBnZW9tZXRyeS5jaGlsZHJlblsgaSBdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRyYW5zbGF0ZVxuICAgICAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKGNoLnBvcy54LCBjaC5wb3MueSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJvdGF0ZVxuICAgICAgICAgICAgICAgICAgICBjdHgucm90YXRlKGNoLmFuZ2xlKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoIGNoLmcsIHN0eWxlcywgY3R4ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdW5yb3RhdGVcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgtY2guYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAvLyB1bnRyYW5zbGF0ZVxuICAgICAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKC1jaC5wb3MueCwgLWNoLnBvcy55KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBhc3N1bWUgaXQncyBhIHBvaW50XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2lyY2xlKDAsIDAsIDEsIHN0eWxlcywgY3R4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5hbWUgIT09ICdjb21wb3VuZCcgJiYgc3R5bGVzLmFuZ2xlSW5kaWNhdG9yKXtcblxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0eWxlKCBzdHlsZXMuYW5nbGVJbmRpY2F0b3IsIGN0eCApO1xuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8oMCwgMCk7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh3LCAwKTtcbiAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBjcmVhdGVWaWV3OiBmdW5jdGlvbiggZ2VvbWV0cnksIHN0eWxlcyApe1xuXG4gICAgICAgICAgICB2YXIgdmlld1xuICAgICAgICAgICAgICAgICxhYWJiID0gZ2VvbWV0cnkuYWFiYigpXG4gICAgICAgICAgICAgICAgLGh3ID0gYWFiYi5odyArIE1hdGguYWJzKGFhYmIueClcbiAgICAgICAgICAgICAgICAsaGggPSBhYWJiLmhoICsgTWF0aC5hYnMoYWFiYi55KVxuICAgICAgICAgICAgICAgICxvZmZzZXQgPSB7IHg6IGh3ICsgMSwgeTogaGggKyAxIH1cbiAgICAgICAgICAgICAgICAsaGlkZGVuQ3R4ID0gdGhpcy5oaWRkZW5DdHhcbiAgICAgICAgICAgICAgICAsaGlkZGVuQ2FudmFzID0gdGhpcy5oaWRkZW5DYW52YXNcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcyB8fCB0aGlzLm9wdGlvbnMuc3R5bGVzWyBuYW1lIF0gfHwgdGhpcy5vcHRpb25zLnN0eWxlcy5jaXJjbGUgfHwge307XG5cbiAgICAgICAgICAgIC8vIG11c3Qgd2FudCBhbiBpbWFnZVxuICAgICAgICAgICAgaWYgKCBzdHlsZXMuc3JjICl7XG4gICAgICAgICAgICAgICAgdmlldyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIHZpZXcuc3JjID0gc3R5bGVzLnNyYztcbiAgICAgICAgICAgICAgICBpZiAoIHN0eWxlcy53aWR0aCApe1xuICAgICAgICAgICAgICAgICAgICB2aWV3LndpZHRoID0gc3R5bGVzLndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIHN0eWxlcy5oZWlnaHQgKXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5oZWlnaHQgPSBzdHlsZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2Zmc2V0LnggKz0gc3R5bGVzLmxpbmVXaWR0aCB8IDA7XG4gICAgICAgICAgICBvZmZzZXQueSArPSBzdHlsZXMubGluZVdpZHRoIHwgMDtcblxuICAgICAgICAgICAgLy8gY2xlYXIgYW5kIHJlc2l6ZVxuICAgICAgICAgICAgaGlkZGVuQ2FudmFzLndpZHRoID0gMiAqIGh3ICsgMiArICgyICogc3R5bGVzLmxpbmVXaWR0aHwwKTtcbiAgICAgICAgICAgIGhpZGRlbkNhbnZhcy5oZWlnaHQgPSAyICogaGggKyAyICsgKDIgKiBzdHlsZXMubGluZVdpZHRofDApO1xuXG4gICAgICAgICAgICB0aGlzLmRyYXcoIGdlb21ldHJ5LCBzdHlsZXMsIGhpZGRlbkN0eCwgb2Zmc2V0ICk7XG5cbiAgICAgICAgICAgIHZpZXcgPSBuZXcgSW1hZ2UoIGhpZGRlbkNhbnZhcy53aWR0aCwgaGlkZGVuQ2FudmFzLmhlaWdodCApO1xuICAgICAgICAgICAgdmlldy5zcmMgPSBoaWRkZW5DYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgICAgIHJldHVybiB2aWV3O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGRyYXdNZXRhOiBmdW5jdGlvbiggbWV0YSApe1xuXG4gICAgICAgICAgICB0aGlzLmVscy5mcHMuaW5uZXJIVE1MID0gbWV0YS5mcHMudG9GaXhlZCgyKTtcbiAgICAgICAgICAgIHRoaXMuZWxzLmlwZi5pbm5lckhUTUwgPSBtZXRhLmlwZjtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBkcmF3Qm9keTogZnVuY3Rpb24oIGJvZHksIHZpZXcsIGN0eCwgb2Zmc2V0ICl7XG5cbiAgICAgICAgICAgIHZhciBwb3MgPSBib2R5LnN0YXRlLnBvc1xuICAgICAgICAgICAgICAgICxvcyA9IGJvZHkub2Zmc2V0XG4gICAgICAgICAgICAgICAgLHYgPSBib2R5LnN0YXRlLnZlbFxuICAgICAgICAgICAgICAgICx0ID0gdGhpcy5faW50ZXJwb2xhdGVUaW1lIHx8IDBcbiAgICAgICAgICAgICAgICAseFxuICAgICAgICAgICAgICAgICx5XG4gICAgICAgICAgICAgICAgLGFuZ1xuICAgICAgICAgICAgICAgICxhYWJiXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBvZmZzZXQgPSBvZmZzZXQgfHwgdGhpcy5vcHRpb25zLm9mZnNldDtcbiAgICAgICAgICAgIGN0eCA9IGN0eCB8fCB0aGlzLmN0eDtcblxuICAgICAgICAgICAgLy8gaW50ZXJwb2xhdGUgcG9zaXRpb25zXG4gICAgICAgICAgICB4ID0gcG9zLl9bMF0gKyBvZmZzZXQueCArIHYuX1swXSAqIHQ7XG4gICAgICAgICAgICB5ID0gcG9zLl9bMV0gKyBvZmZzZXQueSArIHYuX1sxXSAqIHQ7XG4gICAgICAgICAgICBhbmcgPSBib2R5LnN0YXRlLmFuZ3VsYXIucG9zICsgYm9keS5zdGF0ZS5hbmd1bGFyLnZlbCAqIHQ7XG5cbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKCB4LCB5ICk7XG4gICAgICAgICAgICBjdHgucm90YXRlKCBhbmcgKTtcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoIG9zLl9bMF0sIG9zLl9bMV0gKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodmlldywgLXZpZXcud2lkdGgvMiwgLXZpZXcuaGVpZ2h0LzIsIHZpZXcud2lkdGgsIHZpZXcuaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiggYm9kaWVzLCBtZXRhICl7XG5cbiAgICAgICAgICAgIHZhciBib2R5XG4gICAgICAgICAgICAgICAgLHZpZXdcbiAgICAgICAgICAgICAgICAscG9zXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICB0aGlzLl93b3JsZC5lbWl0KCdiZWZvcmVSZW5kZXInLCB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgbWV0YTogbWV0YVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5vcHRpb25zLm1ldGEgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWV0YSggbWV0YSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnBvbGF0ZVRpbWUgPSBtZXRhLmludGVycG9sYXRlVGltZTtcblxuICAgICAgICAgICAgZm9yICggdmFyIGlkIGluIHRoaXMuX2xheWVycyApe1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzWyBpZCBdLnJlbmRlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL3JlbmRlcmVycy9kb20uanNcblxuLyoqXG4gKiBjbGFzcyBEb21SZW5kZXJlciA8IFJlbmRlcmVyXG4gKlxuICogUGh5c2ljcy5yZW5kZXJlcignZG9tJylcbiAqXG4gKiBSZW5kZXJlciB0aGF0IG1hbmlwdWxhdGVzIERPTSBlbGVtZW50cyBhY2NvcmRpbmcgdG8gdGhlIHBoeXNpY3Mgc2ltdWxhdGlvbi4gVmVyeSBwcmltYXRpdmUuLi5cbiAqKi9cblBoeXNpY3MucmVuZGVyZXIoJ2RvbScsIGZ1bmN0aW9uKCBwcm90byApe1xuXG4gICAgaWYgKCAhZG9jdW1lbnQgKXtcbiAgICAgICAgLy8gbXVzdCBiZSBpbiBub2RlIGVudmlyb25tZW50XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICAvLyB1dGlsaXR5IG1ldGhvZHNcbiAgICB2YXIgdGhlUHJlZml4ID0ge31cbiAgICAgICAgLHRtcGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLHRvVGl0bGVDYXNlID0gZnVuY3Rpb24gdG9UaXRsZUNhc2Uoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyg/Ol58XFxzKVxcdy9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBwcmVmaXhlZCBuYW1lIGZvciB0aGUgc3BlY2lmaWVkIGNzcyBwcm9wZXJ0eVxuICAgICAgICAscGZ4ID0gZnVuY3Rpb24gcGZ4KHByb3ApIHtcblxuICAgICAgICAgICAgaWYgKHRoZVByZWZpeFtwcm9wXSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoZVByZWZpeFtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFycmF5T2ZQcmVmaXhlcyA9IFsnV2Via2l0JywgJ01veicsICdNcycsICdPJ11cbiAgICAgICAgICAgICAgICAsbmFtZVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnJheU9mUHJlZml4ZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG5cbiAgICAgICAgICAgICAgICBuYW1lID0gYXJyYXlPZlByZWZpeGVzW2ldICsgdG9UaXRsZUNhc2UocHJvcCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobmFtZSBpbiB0bXBkaXYuc3R5bGUpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhlUHJlZml4W3Byb3BdID0gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuYW1lIGluIHRtcGRpdi5zdHlsZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoZVByZWZpeFtwcm9wXSA9IHByb3A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICA7XG5cbiAgICB2YXIgY2xhc3NwZnggPSAncGpzLSdcbiAgICAgICAgLHB4ID0gJ3B4J1xuICAgICAgICAsY3NzVHJhbnNmb3JtID0gcGZ4KCd0cmFuc2Zvcm0nKVxuICAgICAgICAsYm9yZGVyUmFkaXVzID0gcGZ4KCdib3JkZXJSYWRpdXMnKVxuICAgICAgICA7XG5cbiAgICB2YXIgbmV3RWwgPSBmdW5jdGlvbiggbm9kZSwgY29udGVudCApe1xuICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlIHx8ICdkaXYnKTtcbiAgICAgICAgICAgIGlmIChjb250ZW50KXtcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgICxkcmF3Qm9keVxuICAgICAgICA7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIC8vIGNhbGwgcHJvdG8gaW5pdFxuICAgICAgICAgICAgcHJvdG8uaW5pdC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB2YXIgdmlld3BvcnQgPSB0aGlzLmVsO1xuICAgICAgICAgICAgdmlld3BvcnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgdmlld3BvcnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIHZpZXdwb3J0LnN0eWxlW2Nzc1RyYW5zZm9ybV0gPSAndHJhbnNsYXRlWigwKSc7IC8vIGZvcmNlIEdQVSBhY2NlbFxuICAgICAgICAgICAgdmlld3BvcnQuc3R5bGUud2lkdGggPSB0aGlzLm9wdGlvbnMud2lkdGggKyBweDtcbiAgICAgICAgICAgIHZpZXdwb3J0LnN0eWxlLmhlaWdodCA9IHRoaXMub3B0aW9ucy5oZWlnaHQgKyBweDtcblxuICAgICAgICAgICAgdGhpcy5lbHMgPSB7fTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YSl7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRzID0gbmV3RWwoKTtcbiAgICAgICAgICAgICAgICBzdGF0cy5jbGFzc05hbWUgPSAncGpzLW1ldGEnO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxzLmZwcyA9IG5ld0VsKCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuaXBmID0gbmV3RWwoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBzdGF0cy5hcHBlbmRDaGlsZChuZXdFbCgnc3BhbicsICdmcHM6ICcpKTtcbiAgICAgICAgICAgICAgICBzdGF0cy5hcHBlbmRDaGlsZCh0aGlzLmVscy5mcHMpO1xuICAgICAgICAgICAgICAgIHN0YXRzLmFwcGVuZENoaWxkKG5ld0VsKCdicicpKTtcbiAgICAgICAgICAgICAgICBzdGF0cy5hcHBlbmRDaGlsZChuZXdFbCgnc3BhbicsICdpcGY6ICcpKTtcbiAgICAgICAgICAgICAgICBzdGF0cy5hcHBlbmRDaGlsZCh0aGlzLmVscy5pcGYpO1xuXG4gICAgICAgICAgICAgICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoc3RhdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRoaXMub3B0aW9ucy5hdXRvUmVzaXplICl7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoIHRoaXMub3B0aW9ucy53aWR0aCwgdGhpcy5vcHRpb25zLmhlaWdodCApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIHJlc2l6ZTogZnVuY3Rpb24oIHdpZHRoLCBoZWlnaHQgKXtcblxuICAgICAgICAgICAgcHJvdG8ucmVzaXplLmNhbGwoIHRoaXMsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgcHg7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgcHg7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqIGludGVybmFsXG4gICAgICAgICAqIERvbVJlbmRlcmVyI3BvaW50UHJvcGVydGllcyggZWwsIGdlb21ldHJ5IClcbiAgICAgICAgICogLSBlbCAoSFRNTEVsZW1lbnQpOiBUaGUgZWxlbWVudFxuICAgICAgICAgKiAtIGdlb21ldHJ5IChHZW9tZXRyeSk6IFRoZSBib2R5J3MgZ2VvbWV0cnlcbiAgICAgICAgICpcbiAgICAgICAgICogU2V0IGRvbSBlbGVtZW50IHN0eWxlIHByb3BlcnRpZXMgZm9yIGEgcG9pbnQuXG4gICAgICAgICAqKi9cbiAgICAgICAgcG9pbnRQcm9wZXJ0aWVzOiBmdW5jdGlvbiggZWwsIGdlb21ldHJ5ICl7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gJzJweCc7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnMnB4JztcbiAgICAgICAgICAgIGVsLnN0eWxlLm1hcmdpbkxlZnQgPSAnLTFweCc7XG4gICAgICAgICAgICBlbC5zdHlsZS5tYXJnaW5Ub3AgPSAnLTFweCc7XG4gICAgICAgICAgICBlbC5zdHlsZVsgYm9yZGVyUmFkaXVzIF0gPSAnNTAlJztcbiAgICAgICAgfSxcblxuICAgICAgICAvKiogaW50ZXJuYWxcbiAgICAgICAgICogRG9tUmVuZGVyZXIjY2lyY2xlUHJvcGVydGllcyggZWwsIGdlb21ldHJ5IClcbiAgICAgICAgICogLSBlbCAoSFRNTEVsZW1lbnQpOiBUaGUgZWxlbWVudFxuICAgICAgICAgKiAtIGdlb21ldHJ5IChHZW9tZXRyeSk6IFRoZSBib2R5J3MgZ2VvbWV0cnlcbiAgICAgICAgICpcbiAgICAgICAgICogU2V0IGRvbSBlbGVtZW50IHN0eWxlIHByb3BlcnRpZXMgZm9yIGEgY2lyY2xlLlxuICAgICAgICAgKiovXG4gICAgICAgIGNpcmNsZVByb3BlcnRpZXM6IGZ1bmN0aW9uKCBlbCwgZ2VvbWV0cnkgKXtcblxuICAgICAgICAgICAgdmFyIGFhYmIgPSBnZW9tZXRyeS5hYWJiKCk7XG5cbiAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gKGFhYmIuaHcgKiAyKSArIHB4O1xuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gKGFhYmIuaGggKiAyKSArIHB4O1xuICAgICAgICAgICAgZWwuc3R5bGUubWFyZ2luTGVmdCA9ICgtYWFiYi5odykgKyBweDtcbiAgICAgICAgICAgIGVsLnN0eWxlLm1hcmdpblRvcCA9ICgtYWFiYi5oaCkgKyBweDtcbiAgICAgICAgICAgIGVsLnN0eWxlWyBib3JkZXJSYWRpdXMgXSA9ICc1MCUnO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKiBpbnRlcm5hbFxuICAgICAgICAgKiBEb21SZW5kZXJlciNyZWN0YW5nbGVQcm9wZXJ0aWVzKCBlbCwgZ2VvbWV0cnkgKVxuICAgICAgICAgKiAtIGVsIChIVE1MRWxlbWVudCk6IFRoZSBlbGVtZW50XG4gICAgICAgICAqIC0gZ2VvbWV0cnkgKEdlb21ldHJ5KTogVGhlIGJvZHkncyBnZW9tZXRyeVxuICAgICAgICAgKlxuICAgICAgICAgKiBTZXQgZG9tIGVsZW1lbnQgc3R5bGUgcHJvcGVydGllcyBmb3IgYSByZWN0YW5nbGUuXG4gICAgICAgICAqKi9cbiAgICAgICAgcmVjdGFuZ2xlUHJvcGVydGllczogZnVuY3Rpb24oIGVsLCBnZW9tZXRyeSApe1xuXG4gICAgICAgICAgICB2YXIgYWFiYiA9IGdlb21ldHJ5LmFhYmIoKTtcblxuICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSAoYWFiYi5odyAqIDIpICsgcHg7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAoYWFiYi5oaCAqIDIpICsgcHg7XG4gICAgICAgICAgICBlbC5zdHlsZS5tYXJnaW5MZWZ0ID0gKC1hYWJiLmh3KSArIHB4O1xuICAgICAgICAgICAgZWwuc3R5bGUubWFyZ2luVG9wID0gKC1hYWJiLmhoKSArIHB4O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGNyZWF0ZVZpZXc6IGZ1bmN0aW9uKCBnZW9tZXRyeSApe1xuXG4gICAgICAgICAgICB2YXIgZWwgPSBuZXdFbCgpXG4gICAgICAgICAgICAgICAgLGNoZWxcbiAgICAgICAgICAgICAgICAsZm4gPSBnZW9tZXRyeS5uYW1lICsgJ1Byb3BlcnRpZXMnXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBjbGFzc3BmeCArIGdlb21ldHJ5Lm5hbWU7XG4gICAgICAgICAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICBlbC5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgICAgICAgIGVsLnN0eWxlLmxlZnQgPSAnMHB4JztcblxuICAgICAgICAgICAgaWYgKCBnZW9tZXRyeS5uYW1lID09PSAnY29tcG91bmQnICl7XG5cbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBnZW9tZXRyeS5jaGlsZHJlbi5sZW5ndGgsIGNoOyBpIDwgbDsgaSsrICl7XG4gICAgICAgICAgICAgICAgICAgIGNoID0gZ2VvbWV0cnkuY2hpbGRyZW5bIGkgXTtcbiAgICAgICAgICAgICAgICAgICAgY2hlbCA9IG5ld0VsKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoZWwuY2xhc3NOYW1lID0gY2xhc3NwZnggKyBnZW9tZXRyeS5uYW1lICsgJyAnICsgY2xhc3NwZnggKyAnY2hpbGQnO1xuICAgICAgICAgICAgICAgICAgICBjaGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgICAgICAgICAgY2hlbC5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgICAgICAgICAgICAgICAgY2hlbC5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgICAgICAgICAgICAgICAgIGlmICggdGhpc1sgY2guZy5uYW1lICsgJ1Byb3BlcnRpZXMnIF0gKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbIGNoLmcubmFtZSArICdQcm9wZXJ0aWVzJyBdKGNoZWwsIGNoLmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNoZWwuc3R5bGVbY3NzVHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoJytjaC5wb3MuX1swXSsncHgsJytjaC5wb3MuX1sxXSsncHgpIHJvdGF0ZSgnKyBjaC5hbmdsZSArJ3JhZCknO1xuICAgICAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZCggY2hlbCApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmICggdGhpc1sgZm4gXSApe1xuICAgICAgICAgICAgICAgIHRoaXNbIGZuIF0oZWwsIGdlb21ldHJ5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCggZWwgKTtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBjb25uZWN0OiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgd29ybGQub24oICdhZGQ6Ym9keScsIHRoaXMuYXR0YWNoLCB0aGlzICk7XG4gICAgICAgICAgICB3b3JsZC5vbiggJ3JlbW92ZTpib2R5JywgdGhpcy5kZXRhY2gsIHRoaXMgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBkaXNjb25uZWN0OiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgd29ybGQub2ZmKCAnYWRkOmJvZHknLCB0aGlzLmF0dGFjaCwgdGhpcyApO1xuICAgICAgICAgICAgd29ybGQub2ZmKCAncmVtb3ZlOmJvZHknLCB0aGlzLmRldGFjaCwgdGhpcyApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEb21SZW5kZXJlciNkZXRhY2goIGRhdGEgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gZGF0YSAoSFRNTEVsZW1lbnR8T2JqZWN0KTogRE9NIG5vZGUgb3IgZXZlbnQgZGF0YSAoYGRhdGEuYm9keWApXG4gICAgICAgICAqXG4gICAgICAgICAqIEV2ZW50IGNhbGxiYWNrIHRvIGRldGFjaCBhIG5vZGUgZnJvbSB0aGUgRE9NXG4gICAgICAgICAqKi9cbiAgICAgICAgZGV0YWNoOiBmdW5jdGlvbiggZGF0YSApe1xuXG4gICAgICAgICAgICAvLyBpbnRlcnByZWQgZGF0YSBhcyBlaXRoZXIgZG9tIG5vZGUgb3IgZXZlbnQgZGF0YVxuICAgICAgICAgICAgdmFyIGVsID0gKGRhdGEubm9kZVR5cGUgJiYgZGF0YSkgfHwgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudmlldylcbiAgICAgICAgICAgICAgICAscGFyID0gZWwgJiYgZWwucGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgaWYgKCBlbCAmJiBwYXIgKXtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdmlldyBmcm9tIGRvbVxuICAgICAgICAgICAgICAgIHBhci5yZW1vdmVDaGlsZCggZWwgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERvbVJlbmRlcmVyI2F0dGFjaCggZGF0YSApIC0+IHRoaXNcbiAgICAgICAgICogLSBkYXRhIChIVE1MRWxlbWVudHxPYmplY3QpOiBET00gbm9kZSBvciBldmVudCBkYXRhIChgZGF0YS5ib2R5YClcbiAgICAgICAgICpcbiAgICAgICAgICogRXZlbnQgY2FsbGJhY2sgdG8gYXR0YWNoIGEgbm9kZSB0byB0aGUgdmlld3BvcnRcbiAgICAgICAgICoqL1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uKCBkYXRhICl7XG5cbiAgICAgICAgICAgIC8vIGludGVycHJlZCBkYXRhIGFzIGVpdGhlciBkb20gbm9kZSBvciBldmVudCBkYXRhXG4gICAgICAgICAgICB2YXIgZWwgPSAoZGF0YS5ub2RlVHlwZSAmJiBkYXRhKSB8fCAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS52aWV3KVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgaWYgKCBlbCApe1xuICAgICAgICAgICAgICAgIC8vIGF0dGFjaCB0byB2aWV3cG9ydFxuICAgICAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoIGVsICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGRyYXdNZXRhOiBmdW5jdGlvbiggbWV0YSApe1xuXG4gICAgICAgICAgICB0aGlzLmVscy5mcHMuaW5uZXJIVE1MID0gbWV0YS5mcHMudG9GaXhlZCgyKTtcbiAgICAgICAgICAgIHRoaXMuZWxzLmlwZi5pbm5lckhUTUwgPSBtZXRhLmlwZjtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBkcmF3Qm9keTogZnVuY3Rpb24oIGJvZHksIHZpZXcgKXtcblxuICAgICAgICAgICAgdmFyIHBvcyA9IGJvZHkuc3RhdGUucG9zXG4gICAgICAgICAgICAgICAgLHYgPSBib2R5LnN0YXRlLnZlbFxuICAgICAgICAgICAgICAgICxvcyA9IGJvZHkub2Zmc2V0XG4gICAgICAgICAgICAgICAgLHhcbiAgICAgICAgICAgICAgICAseVxuICAgICAgICAgICAgICAgICxhbmdcbiAgICAgICAgICAgICAgICAsdCA9IHRoaXMuX2ludGVycG9sYXRlVGltZVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgLy8gaW50ZXJwb2xhdGUgcG9zaXRpb25zXG4gICAgICAgICAgICB4ID0gcG9zLl9bMF0gKyB2Ll9bMF0gKiB0O1xuICAgICAgICAgICAgeSA9IHBvcy5fWzFdICsgdi5fWzFdICogdDtcbiAgICAgICAgICAgIGFuZyA9IGJvZHkuc3RhdGUuYW5ndWxhci5wb3MgKyBib2R5LnN0YXRlLmFuZ3VsYXIudmVsICogdDtcbiAgICAgICAgICAgIHZpZXcuc3R5bGVbY3NzVHJhbnNmb3JtXSA9ICd0cmFuc2xhdGUoJyt4KydweCwnK3krJ3B4KSByb3RhdGUoJysgYW5nICsncmFkKSB0cmFuc2xhdGUoJytvcy5fWzBdKydweCwnK29zLl9bMV0rJ3B4KSc7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cblxuLy8gLS0tXG4vLyBpbnNpZGU6IHNyYy9yZW5kZXJlcnMvcGl4aS1yZW5kZXJlci5qc1xuXG4vKlxuICogQHJlcXVpcmVzIHBpeGkuanNcbiAqL1xuLyoqXG4gKiBjbGFzcyBQaXhpUmVuZGVyZXIgPCBSZW5kZXJlclxuICpcbiAqIFBoeXNpY3MucmVuZGVyZXIoJ3BpeGknKVxuICpcbiAqIFJlbmRlcmVyIHRoYXQgdXNlcyB0aGUgUElYSS5qcyBsaWJyYXJ5LiBbRG9jdW1lbnRhdGlvbiBjYW4gYmUgZm91bmQgaGVyZV0oaHR0cHM6Ly9naXRodWIuY29tL3dlbGxjYWZmZWluYXRlZC9QaHlzaWNzSlMvd2lraS9QSVhJLVJlbmRlcmVyKS5cbiAqXG4gKiBBZGRpdGlvbmFsIGNvbmZpZyBvcHRpb25zOlxuICpcbiAqIC0gbWV0YUVsOiBIVE1MRWxlbWVudCB0byB3cml0ZSBtZXRhIGluZm9ybWF0aW9uIGxpa2UgRlBTIGFuZCBJUEYgaW50by4gKGRlZmF1bHQ6IGF1dG9nZW5lcmF0ZWQpXG4gKiAtIG9mZnNldDogT2Zmc2V0IHRoZSBzaGFwZXMgYnkgdGhpcyBhbW91bnQuIChkZWZhdWx0OiBgeyB4OiAwLCB5OiAwIH1gKVxuICogLSBzdHlsZXM6IFN0eWxlcyB0byB1c2UgdG8gZHJhdyB0aGUgc2hhcGVzLiAoc2VlIGJlbG93KVxuICpcbiAqIFRoZSBzdHlsZXMgcHJvcGVydHkgc2hvdWxkIGNvbnRhaW4gX2RlZmF1bHRfIHN0eWxlcyBmb3IgZWFjaCBzaGFwZSB5b3Ugd2FudCB0byBkcmF3LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogc3R5bGVzOiB7XG4gKiAgICAvLyBEZWZpbmVzIHRoZSBkZWZhdWx0IGNhbnZhcyBjb2xvdXJcbiAqICAgICdjb2xvcic6ICcweDY2RkY5OScsXG4gKlxuICogICAgJ2NpcmNsZScgOiB7XG4gKiAgICAgICAgc3Ryb2tlU3R5bGU6ICcweEU4OTAwQycsXG4gKiAgICAgICAgbGluZVdpZHRoOiAzLFxuICogICAgICAgIGZpbGxTdHlsZTogJzB4RDVERTRDJyxcbiAqICAgICAgICBhbmdsZUluZGljYXRvcjogJzB4RTg5MDBDJyxcbiAqICAgICAgICBzdHJva2VBbHBoYTogMSxcbiAqICAgICAgICBmaWxsQWxwaGE6IDFcbiAqICAgIH0sXG4gKlxuICogICAgJ2NvbnZleC1wb2x5Z29uJyA6IHtcbiAqICAgICAgICBzdHJva2VTdHlsZTogJzB4RTg5MDBDJyxcbiAqICAgICAgICBsaW5lV2lkdGg6IDMsXG4gKiAgICAgICAgZmlsbFN0eWxlOiAnMHhENURFNEMnLFxuICogICAgICAgIGFuZ2xlSW5kaWNhdG9yOiAnMHhFODkwMEMnXG4gKiAgICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBTdHlsZXMgY2FuIGFsc28gYmUgZGVmaW5lZCBvbiBhIHBlci1ib2R5IGJhc2lzLiBVc2UgdGhlIFwic3R5bGVzXCIgcHJvcGVydHkgZm9yIGEgYm9keTpcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIFBoeXNpY3MuYm9keSgnY2lyY2xlJywge1xuICogICAgIC8vIC4uLlxuICogICAgIHN0eWxlczoge1xuICogICAgICAgIHN0cm9rZVN0eWxlOiAnMHg1NDI0MzcnLFxuICogICAgICAgIGxpbmVXaWR0aDogMSxcbiAqICAgICAgICBmaWxsU3R5bGU6ICcweDU0MjQzNycsXG4gKiAgICAgICAgYW5nbGVJbmRpY2F0b3I6ICcweEZGRkZGRidcbiAqICAgIH1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogWW91IGNhbiBhbHNvIGRlZmluZSBhbiBpbWFnZSB0byB1c2UgZm9yIGEgYm9keTpcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIFBoeXNpY3MuYm9keSgnY2lyY2xlJywge1xuICogICAgIC8vIC4uLlxuICogICAgIHN0eWxlczoge1xuICogICAgICAgIHNyYzogJ3BhdGgvdG8vaW1hZ2UuanBnJyxcbiAqICAgICAgICB3aWR0aDogNDAsXG4gKiAgICAgICAgaGVpZ2h0OiA1MCxcbiAqICAgICAgICBhbmNob3I6IHsgeDogMC41LCB5OiAwLjUgfVxuICogICAgfVxuICogfSk7XG4gKiBgYGBcbiAqKi9cbi8qIGdsb2JhbCBQSVhJICovXG5QaHlzaWNzLnJlbmRlcmVyKCdwaXhpJywgZnVuY3Rpb24oIHBhcmVudCApe1xuXG4gICAgaWYgKCAhZG9jdW1lbnQgKXtcbiAgICAgICAgLy8gbXVzdCBiZSBpbiBub2RlIGVudmlyb25tZW50XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICB2YXIgUGkyID0gTWF0aC5QSSAqIDJcbiAgICAgICAgLGNvbG9ycyA9IHtcbiAgICAgICAgICAgIHdoaXRlOiAnMHhGRkZGRkYnXG4gICAgICAgICAgICAsdmlvbGV0OiAnMHg1NDI0MzcnXG4gICAgICAgICAgICAsYmx1ZTogJzB4NTM3NzdBJ1xuICAgICAgICB9XG4gICAgICAgICxmb250U3R5bGVzID0ge1xuICAgICAgICAgICAgZm9udDogXCIxOHB4IG1vbm9zcGFjZVwiLFxuICAgICAgICAgICAgZmlsbDogXCJibGFja1wiLFxuICAgICAgICAgICAgYWxpZ246IFwibGVmdFwiXG4gICAgICAgIH1cblxuICAgICAgICAsZGVmYXVsdHMgPSB7XG5cbiAgICAgICAgICAgIC8vIHRoZSBlbGVtZW50IHRvIHBsYWNlIG1ldGEgZGF0YSBpbnRvXG4gICAgICAgICAgICBtZXRhRWw6IG51bGwsXG4gICAgICAgICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgLy8gUHJvdmlkZSBzb21lIGRlZmF1bHQgY29sb3Vyc1xuICAgICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lcyB0aGUgZGVmYXVsdCBjYW52YXMgY29sb3VyXG4gICAgICAgICAgICAgICAgJ2NvbG9yJzogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICAncG9pbnQnOiBjb2xvcnMuYmx1ZSxcblxuICAgICAgICAgICAgICAgICdjaXJjbGUnIDoge1xuICAgICAgICAgICAgICAgICAgICBzdHJva2VTdHlsZTogY29sb3JzLmJsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbFN0eWxlOiBjb2xvcnMuYmx1ZSxcbiAgICAgICAgICAgICAgICAgICAgYW5nbGVJbmRpY2F0b3I6IGNvbG9ycy53aGl0ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbEFscGhhOiAxLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VBbHBoYTogMSxcbiAgICAgICAgICAgICAgICAgICAgYWxwaGE6IDFcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgJ3JlY3RhbmdsZScgOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVN0eWxlOiBjb2xvcnMudmlvbGV0LFxuICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgIGZpbGxTdHlsZTogY29sb3JzLnZpb2xldCxcbiAgICAgICAgICAgICAgICAgICAgYW5nbGVJbmRpY2F0b3I6IGNvbG9ycy53aGl0ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbEFscGhhOiAxLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VBbHBoYTogMSxcbiAgICAgICAgICAgICAgICAgICAgYWxwaGE6IDFcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgJ2NvbnZleC1wb2x5Z29uJyA6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlU3R5bGU6IGNvbG9ycy52aW9sZXQsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbFN0eWxlOiBjb2xvcnMudmlvbGV0LFxuICAgICAgICAgICAgICAgICAgICBhbmdsZUluZGljYXRvcjogY29sb3JzLndoaXRlLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQWxwaGE6IDEsXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZUFscGhhOiAxLFxuICAgICAgICAgICAgICAgICAgICBhbHBoYTogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICA7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zICl7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICAgICxlbFxuICAgICAgICAgICAgICAgICxpc1RyYW5zcGFyZW50XG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIFBJWEkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJQSVhJIG5vdCBwcmVzZW50IC0gY2Fubm90IGNvbnRpbnVlXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhbGwgcGFyZW50IGluaXRcbiAgICAgICAgICAgIHBhcmVudC5pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIC8vIGZ1cnRoZXIgb3B0aW9uc1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRlZmF1bHRzKCBkZWZhdWx0cywgdHJ1ZSApO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uQ2hhbmdlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLm9mZnNldCA9IG5ldyBQaHlzaWNzLnZlY3Rvciggc2VsZi5vcHRpb25zLm9mZnNldCApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMoIG9wdGlvbnMsIHRydWUgKTtcblxuICAgICAgICAgICAgaXNUcmFuc3BhcmVudCA9ICghdGhpcy5vcHRpb25zLnN0eWxlcy5jb2xvciB8fCB0aGlzLm9wdGlvbnMuc3R5bGVzLmNvbG9yID09PSAndHJhbnNwYXJlbnQnKTtcbiAgICAgICAgICAgIC8vIEhvb2sgaW4gUElYSSBzdGFnZSBoZXJlXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuU3RhZ2UodGhpcy5vcHRpb25zLnN0eWxlcy5jb2xvcik7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBlbXB0eSBtZXRhIG9iamVjdCBmb3IgdXNlIGxhdGVyXG4gICAgICAgICAgICB0aGlzLm1ldGEgPSB7fTtcblxuICAgICAgICAgICAgZWwgPSAodGhpcy5lbCAmJiB0aGlzLmVsLm5vZGVOYW1lID09PSAnQ0FOVkFTJykgPyBlbCA6IG51bGw7XG4gICAgICAgICAgICAvLyBhZGQgdGhlIHJlbmRlcmVyIHZpZXcgZWxlbWVudCB0byB0aGUgRE9NIGFjY29yZGluZyB0byBpdHMgdHlwZVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih0aGlzLm9wdGlvbnMud2lkdGgsIHRoaXMub3B0aW9ucy5oZWlnaHQsIHtcbiAgICAgICAgICAgICAgICB2aWV3OiBlbCxcbiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogaXNUcmFuc3BhcmVudCxcbiAgICAgICAgICAgICAgICByZXNvbHV0aW9uOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCAhZWwgKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVsID0gdGhpcy5lbCB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0byBwYXNzZWQgaW4gZWxlbWVudFxuICAgICAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoIHRoaXMucmVuZGVyZXIudmlldyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRoaXMub3B0aW9ucy5hdXRvUmVzaXplICl7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoIHRoaXMub3B0aW9ucy53aWR0aCwgdGhpcy5vcHRpb25zLmhlaWdodCApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGV4dGVuZGVkXG4gICAgICAgIHJlc2l6ZTogZnVuY3Rpb24oIHdpZHRoLCBoZWlnaHQgKXtcblxuICAgICAgICAgICAgcGFyZW50LnJlc2l6ZS5jYWxsKCB0aGlzLCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlc2l6ZSggdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBjb25uZWN0OiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgd29ybGQub24oICdhZGQ6Ym9keScsIHRoaXMuYXR0YWNoLCB0aGlzICk7XG4gICAgICAgICAgICB3b3JsZC5vbiggJ3JlbW92ZTpib2R5JywgdGhpcy5kZXRhY2gsIHRoaXMgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBkaXNjb25uZWN0OiBmdW5jdGlvbiggd29ybGQgKXtcblxuICAgICAgICAgICAgd29ybGQub2ZmKCAnYWRkOmJvZHknLCB0aGlzLmF0dGFjaCwgdGhpcyApO1xuICAgICAgICAgICAgd29ybGQub2ZmKCAncmVtb3ZlOmJvZHknLCB0aGlzLmRldGFjaCwgdGhpcyApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaXhpUmVuZGVyZXIjZGV0YWNoKCBkYXRhICkgLT4gdGhpc1xuICAgICAgICAgKiAtIGRhdGEgKFBJWEkuR3JhcGhpY3N8T2JqZWN0KTogR3JhcGhpY3Mgb2JqZWN0IG9yIGV2ZW50IGRhdGEgKGBkYXRhLmJvZHlgKVxuICAgICAgICAgKlxuICAgICAgICAgKiBFdmVudCBjYWxsYmFjayB0byBkZXRhY2ggYSBjaGlsZCBmcm9tIHRoZSBzdGFnZVxuICAgICAgICAgKiovXG4gICAgICAgIGRldGFjaDogZnVuY3Rpb24oIGRhdGEgKXtcblxuICAgICAgICAgICAgLy8gaW50ZXJwcmVkIGRhdGEgYXMgZWl0aGVyIGRvbSBub2RlIG9yIGV2ZW50IGRhdGFcbiAgICAgICAgICAgIHZhciBlbCA9IChkYXRhIGluc3RhbmNlb2YgUElYSS5HcmFwaGljcyAmJiBkYXRhKSB8fCAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS52aWV3KTtcblxuICAgICAgICAgICAgaWYgKCBlbCApe1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB2aWV3IGZyb20gZG9tXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCggZWwgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBpeGlSZW5kZXJlciNhdHRhY2goIGRhdGEgKSAtPiB0aGlzXG4gICAgICAgICAqIC0gZGF0YSAoUElYSS5HcmFwaGljc3xPYmplY3QpOiBHcmFwaGljcyBvYmplY3Qgb3IgZXZlbnQgZGF0YSAoYGRhdGEuYm9keWApXG4gICAgICAgICAqXG4gICAgICAgICAqIEV2ZW50IGNhbGxiYWNrIHRvIGF0dGFjaCBhIGNoaWxkIHRvIHRoZSBzdGFnZVxuICAgICAgICAgKiovXG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24oIGRhdGEgKXtcblxuICAgICAgICAgICAgLy8gaW50ZXJwcmVkIGRhdGEgYXMgZWl0aGVyIGRvbSBub2RlIG9yIGV2ZW50IGRhdGFcbiAgICAgICAgICAgIHZhciBlbCA9IChkYXRhIGluc3RhbmNlb2YgUElYSS5HcmFwaGljcyAmJiBkYXRhKSB8fCAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS52aWV3KTtcblxuICAgICAgICAgICAgaWYgKCBlbCApe1xuICAgICAgICAgICAgICAgIC8vIGF0dGFjaCB0byB2aWV3cG9ydFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQoIGVsICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaXhpUmVuZGVyZXIjbG9hZFNwcml0ZVNoZWV0cyggYXNzZXRzVG9Mb2FkLCBjYWxsYmFjayApIC0+IHRoaXNcbiAgICAgICAgICogLSBhc3NldHNUb0xvYWQgKEFycmF5KTogQXJyYXkgb2Ygc3ByaXRlc2hlZXRzIHRvIGxvYWRcbiAgICAgICAgICogLSBjYWxsYmFjayAoRnVuY3Rpb24pOiBGdW5jdGlvbiB0byBjYWxsIHdoZW4gbG9hZGluZyBpcyBjb21wbGV0ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBMb2FkcyB0ZXh0dXJlcyBkZWZpbmVkIGluIGEgc3ByaXRlc2hlZXRcbiAgICAgICAgICoqL1xuICAgICAgICBsb2FkU3ByaXRlU2hlZXRzOiBmdW5jdGlvbiggYXNzZXRzVG9Mb2FkLCBjYWxsYmFjayApe1xuXG4gICAgICAgICAgICBpZiAoICFQaHlzaWNzLnV0aWwuaXNBcnJheSggYXNzZXRzVG9Mb2FkICkgKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ1Nwcml0ZXNoZWV0cyBtdXN0IGJlIGRlZmluZWQgaW4gYXJyYXlzJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAgICAgLGxvYWRlciA9IG5ldyBQSVhJLkFzc2V0TG9hZGVyKGFzc2V0c1RvTG9hZClcbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IGxvYWRpbmcgcmVzb3VyY2VzIVxuICAgICAgICAgICAgbG9hZGVyLmxvYWQoKTtcblxuICAgICAgICAgICAgbG9hZGVyLm9uKCdvbkNvbXBsZXRlJywgZnVuY3Rpb24oZXZ0KXtcbiAgICAgICAgICAgICAgICBzZWxmLmFzc2V0c0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGl4aVJlbmRlcmVyI2RyYXdCb2R5KCBib2R5LCB2aWV3IClcbiAgICAgICAgICogLSBib2R5IChCb2R5KTogVGhlIGJvZHkgdG8gZHJhd1xuICAgICAgICAgKiAtIHZpZXcgKERpc3BsYXlPYmplY3QpOiBUaGUgcGl4aSBkaXNwbGF5IG9iamVjdFxuICAgICAgICAgKlxuICAgICAgICAgKiBEcmF3IGEgUElYSS5EaXNwbGF5T2JqZWN0IHRvIHRoZSBzdGFnZS5cbiAgICAgICAgICoqL1xuICAgICAgICBkcmF3Qm9keTogZnVuY3Rpb24oIGJvZHksIHZpZXcgKXtcbiAgICAgICAgICAgIHZhciBwb3MgPSBib2R5LnN0YXRlLnBvc1xuICAgICAgICAgICAgICAgICx2ID0gYm9keS5zdGF0ZS52ZWxcbiAgICAgICAgICAgICAgICAsb3MgPSBib2R5Lm9mZnNldFxuICAgICAgICAgICAgICAgICx0ID0gdGhpcy5faW50ZXJwb2xhdGVUaW1lIHx8IDBcbiAgICAgICAgICAgICAgICAseFxuICAgICAgICAgICAgICAgICx5XG4gICAgICAgICAgICAgICAgLGFuZ1xuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgLy8gaW50ZXJwb2xhdGUgcG9zaXRpb25zXG4gICAgICAgICAgICB4ID0gcG9zLl9bMF0gKyB2Ll9bMF0gKiB0O1xuICAgICAgICAgICAgeSA9IHBvcy5fWzFdICsgdi5fWzFdICogdDtcbiAgICAgICAgICAgIGFuZyA9IGJvZHkuc3RhdGUuYW5ndWxhci5wb3MgKyBib2R5LnN0YXRlLmFuZ3VsYXIudmVsICogdDtcblxuICAgICAgICAgICAgdmlldy5wb3NpdGlvbi5zZXQoIHgsIHkgKTtcbiAgICAgICAgICAgIHZpZXcucGl2b3Quc2V0KCAtb3MuX1swXSwgLW9zLl9bMV0gKTtcbiAgICAgICAgICAgIHZpZXcucm90YXRpb24gPSBhbmc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZXh0ZW5kZWRcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiggYm9kaWVzLCBtZXRhICl7XG5cbiAgICAgICAgICAgIHBhcmVudC5yZW5kZXIuY2FsbCh0aGlzLCBib2RpZXMsIG1ldGEpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zdGFnZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBpeGlSZW5kZXJlciNzZXRTdHlsZXMoIGdyYXBoaWNzLCBzdHlsZXMgKSAtPiBQSVhJLkdyYXBoaWNzXG4gICAgICAgICAqIC0gZ3JhcGhpY3MgKFBJWEkuR3JhcGhpY3MpOiBUaGUgZ3JhcGhpY3Mgb2JqZWN0IHRvIHNldCBzdHlsZXMgb25cbiAgICAgICAgICogLSBzdHlsZXMgKE9iamVjdCk6IFRoZSBzdHlsZXMgY29uZmlndXJhdGlvblxuICAgICAgICAgKiArIChQSVhJLkdyYXBoaWNzKTogQSBncmFwaGljIG9iamVjdFxuICAgICAgICAgKlxuICAgICAgICAgKiBTZXQgc3R5bGVzIG9uIHBpeGkgZ3JhcGhpY3Mgb2JqZWN0XG4gICAgICAgICAqKi9cbiAgICAgICAgc2V0U3R5bGVzOiBmdW5jdGlvbiggZ3JhcGhpY3MsIHN0eWxlcyApe1xuXG4gICAgICAgICAgICBpZiAoIFBoeXNpY3MudXRpbC5pc09iamVjdChzdHlsZXMpICl7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHN0eWxlcy5maWxsU3R5bGUgJiYgc3R5bGVzLmZpbGxTdHlsZSAhPT0gJ3RyYW5zcGFyZW50JyApe1xuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5iZWdpbkZpbGwoIHN0eWxlcy5maWxsU3R5bGUgKTtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbEFscGhhID0gc3R5bGVzLmZpbGxBbHBoYSAhPT0gdW5kZWZpbmVkID8gc3R5bGVzLmZpbGxBbHBoYSA6IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuYmVnaW5GaWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxBbHBoYSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVN0eWxlKCBzdHlsZXMubGluZVdpZHRoIHx8IDAsIHN0eWxlcy5zdHJva2VTdHlsZSwgc3R5bGVzLnN0cm9rZUFscGhhICE9PSB1bmRlZmluZWQgPyBzdHlsZXMuc3Ryb2tlQWxwaGEgOiAxICk7XG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MuYWxwaGEgPSBzdHlsZXMuYWxwaGEgIT09IHVuZGVmaW5lZCA/IHN0eWxlcy5hbHBoYSA6IDE7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHN0eWxlcyAmJiBzdHlsZXMgIT09ICd0cmFuc3BhcmVudCcgKXtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuYmVnaW5GaWxsKCBzdHlsZXMgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5iZWdpbkZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbEFscGhhID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lU3R5bGUoIDAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGdyYXBoaWNzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaXhpUmVuZGVyZXIjY3JlYXRlQ2lyY2xlKCB4LCB5LCByLCBzdHlsZXMgKSAtPiBQSVhJLkdyYXBoaWNzXG4gICAgICAgICAqIC0geCAoTnVtYmVyKTogVGhlIHggY29vcmRcbiAgICAgICAgICogLSB5IChOdW1iZXIpOiBUaGUgeSBjb29yZFxuICAgICAgICAgKiAtIHIgKE51bWJlcik6IFRoZSBjaXJjbGUgcmFkaXVzXG4gICAgICAgICAqIC0gc3R5bGVzIChPYmplY3QpOiBUaGUgc3R5bGVzIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICogKyAoUElYSS5HcmFwaGljcyk6IEEgZ3JhcGhpYyBvYmplY3QgcmVwcmVzZW50aW5nIGEgY2lyY2xlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBDcmVhdGUgYSBjaXJjbGUgZm9yIHVzZSBpbiBQSVhJIHN0YWdlXG4gICAgICAgICAqKi9cbiAgICAgICAgY3JlYXRlQ2lyY2xlOiBmdW5jdGlvbiggeCwgeSwgciwgc3R5bGVzICl7XG5cbiAgICAgICAgICAgIHZhciBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlcyggZ3JhcGhpY3MsIHN0eWxlcyApO1xuICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSggeCwgeSwgciApO1xuICAgICAgICAgICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgICAgICAgICAgcmV0dXJuIGdyYXBoaWNzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaXhpUmVuZGVyZXIjY3JlYXRlUmVjdCggeCwgeSwgciwgc3R5bGVzICkgLT4gUElYSS5HcmFwaGljc1xuICAgICAgICAgKiAtIHggKE51bWJlcik6IFRoZSB4IGNvb3JkXG4gICAgICAgICAqIC0geSAoTnVtYmVyKTogVGhlIHkgY29vcmRcbiAgICAgICAgICogLSB3aWR0aCAoTnVtYmVyKTogVGhlIHJlY3RhbmdsZSB3aWR0aFxuICAgICAgICAgKiAtIGhlaWdodCAoTnVtYmVyKTogVGhlIHJlY3RhbmdsZSBoZWlnaHRcbiAgICAgICAgICogLSBzdHlsZXMgKE9iamVjdCk6IFRoZSBzdHlsZXMgY29uZmlndXJhdGlvblxuICAgICAgICAgKiArIChQSVhJLkdyYXBoaWNzKTogQSBncmFwaGljIG9iamVjdCByZXByZXNlbnRpbmcgYSBjaXJjbGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIENyZWF0ZSBhIHJlY3RhbmdsZSBmb3IgdXNlIGluIFBJWEkgc3RhZ2VcbiAgICAgICAgICoqL1xuICAgICAgICBjcmVhdGVSZWN0OiBmdW5jdGlvbiggeCwgeSwgd2lkdGgsIGhlaWdodCwgc3R5bGVzICl7XG5cbiAgICAgICAgICAgIHZhciBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlcyggZ3JhcGhpY3MsIHN0eWxlcyApO1xuICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd1JlY3QoIHgsIHksIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICAgICAgICAgIHJldHVybiBncmFwaGljcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGl4aVJlbmRlcmVyI2NyZWF0ZVBvbHlnb24oIHZlcnRzLCBzdHlsZXMgKSAtPiBQSVhJLkdyYXBoaWNzXG4gICAgICAgICAqIC0gdmVydHMgKEFycmF5KTogQXJyYXkgb2YgW1tWZWN0b3Jpc2hdXSB2ZXJ0aWNlc1xuICAgICAgICAgKiAtIHN0eWxlcyAoT2JqZWN0KTogVGhlIHN0eWxlcyBjb25maWd1cmF0aW9uXG4gICAgICAgICAqICsgKFBJWEkuR3JhcGhpY3MpOiBBIGdyYXBoaWMgb2JqZWN0IHJlcHJlc2VudGluZyBhIHBvbHlnb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIENyZWF0ZSBhIHBvbHlnb24gZm9yIHVzZSBpbiBQSVhJIHN0YWdlXG4gICAgICAgICAqKi9cbiAgICAgICAgY3JlYXRlUG9seWdvbjogZnVuY3Rpb24oIHZlcnRzLCBzdHlsZXMgKXtcblxuICAgICAgICAgICAgdmFyIHZlcnQgPSB2ZXJ0c1swXVxuICAgICAgICAgICAgICAgICx4ID0gdmVydC54XG4gICAgICAgICAgICAgICAgLHkgPSB2ZXJ0LnlcbiAgICAgICAgICAgICAgICAsbCA9IHZlcnRzLmxlbmd0aFxuICAgICAgICAgICAgICAgICxzdGFydCA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogeFxuICAgICAgICAgICAgICAgICAgICAseTogeVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlcyggZ3JhcGhpY3MsIHN0eWxlcyApO1xuXG4gICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8oeCwgeSk7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMTsgaSA8IGw7ICsraSApe1xuXG4gICAgICAgICAgICAgICAgdmVydCA9IHZlcnRzWyBpIF07XG4gICAgICAgICAgICAgICAgeCA9IHZlcnQueDtcbiAgICAgICAgICAgICAgICB5ID0gdmVydC55O1xuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyh4LCB5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGwgPiAyKXtcbiAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lVG8oc3RhcnQueCwgc3RhcnQueSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICAgICAgICAgIHJldHVybiBncmFwaGljcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGl4aVJlbmRlcmVyI2NyZWF0ZUxpbmUoIGZyb20sIHRvLCBzdHlsZXMgKSAtPiBQSVhJLkdyYXBoaWNzXG4gICAgICAgICAqIC0gZnJvbSAoVmVjdG9yaXNoKTogU3RhcnRpbmcgcG9pbnRcbiAgICAgICAgICogLSB0byAoVmVjdG9yaXNoKTogRW5kaW5nIHBvaW50XG4gICAgICAgICAqIC0gc3R5bGVzIChPYmplY3QpOiBUaGUgc3R5bGVzIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICogKyAoUElYSS5HcmFwaGljcyk6IEEgZ3JhcGhpYyBvYmplY3QgcmVwcmVzZW50aW5nIGEgcG9seWdvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQ3JlYXRlIGEgbGluZSBmb3IgdXNlIGluIFBJWEkgc3RhZ2VcbiAgICAgICAgICoqL1xuICAgICAgICBjcmVhdGVMaW5lOiBmdW5jdGlvbiggZnJvbSwgdG8sIHN0eWxlcyApe1xuXG4gICAgICAgICAgICB2YXIgeCA9IGZyb20ueFxuICAgICAgICAgICAgICAgICx5ID0gZnJvbS55XG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICB2YXIgZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZXMoIGdyYXBoaWNzLCBzdHlsZXMgKTtcblxuICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKHgsIHkpO1xuXG4gICAgICAgICAgICB4ID0gdG8ueDtcbiAgICAgICAgICAgIHkgPSB0by55O1xuXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oeCwgeSk7XG5cbiAgICAgICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICAgICAgICAgIHJldHVybiBncmFwaGljcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBjcmVhdGVWaWV3OiBmdW5jdGlvbiggZ2VvbWV0cnksIHN0eWxlcywgcGFyZW50ICl7XG5cbiAgICAgICAgICAgIHZhciB2aWV3ID0gbnVsbFxuICAgICAgICAgICAgICAgICxhYWJiID0gZ2VvbWV0cnkuYWFiYigpXG4gICAgICAgICAgICAgICAgLGh3ID0gYWFiYi5odyArIE1hdGguYWJzKGFhYmIueClcbiAgICAgICAgICAgICAgICAsaGggPSBhYWJiLmhoICsgTWF0aC5hYnMoYWFiYi55KVxuICAgICAgICAgICAgICAgICxuYW1lID0gZ2VvbWV0cnkubmFtZVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50IHx8IHRoaXMuc3RhZ2U7XG4gICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgfHwgdGhpcy5vcHRpb25zLnN0eWxlc1sgbmFtZSBdIHx8IHRoaXMub3B0aW9ucy5zdHlsZXMuY2lyY2xlIHx8IHt9O1xuXG4gICAgICAgICAgICAvLyBtdXN0IHdhbnQgYW4gaW1hZ2VcbiAgICAgICAgICAgIGlmICggc3R5bGVzLnNyYyApe1xuICAgICAgICAgICAgICAgIHZpZXcgPSBQSVhJLlNwcml0ZS5mcm9tSW1hZ2UoIHN0eWxlcy5zcmMgKTtcbiAgICAgICAgICAgICAgICB2aWV3LmFuY2hvci5zZXQoIDAuNSwgMC41ICk7XG4gICAgICAgICAgICAgICAgaWYgKCBzdHlsZXMuYW5jaG9yICkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmFuY2hvci54ID0gc3R5bGVzLmFuY2hvci54O1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmFuY2hvci55ID0gc3R5bGVzLmFuY2hvci55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIHN0eWxlcy53aWR0aCApe1xuICAgICAgICAgICAgICAgICAgICB2aWV3LndpZHRoID0gc3R5bGVzLndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIHN0eWxlcy5oZWlnaHQgKXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5oZWlnaHQgPSBzdHlsZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQuYWRkQ2hpbGQodmlldyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuYW1lID09PSAnY2lyY2xlJyl7XG5cbiAgICAgICAgICAgICAgICB2aWV3ID0gdGhpcy5jcmVhdGVDaXJjbGUoMCwgMCwgZ2VvbWV0cnkucmFkaXVzLCBzdHlsZXMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdjb252ZXgtcG9seWdvbicpe1xuXG4gICAgICAgICAgICAgICAgdmlldyA9IHRoaXMuY3JlYXRlUG9seWdvbihnZW9tZXRyeS52ZXJ0aWNlcywgc3R5bGVzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAncmVjdGFuZ2xlJyl7XG5cbiAgICAgICAgICAgICAgICB2aWV3ID0gdGhpcy5jcmVhdGVSZWN0KC1nZW9tZXRyeS53aWR0aC8yLCAtZ2VvbWV0cnkuaGVpZ2h0LzIsIGdlb21ldHJ5LndpZHRoLCBnZW9tZXRyeS5oZWlnaHQsIHN0eWxlcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdjb21wb3VuZCcpe1xuXG4gICAgICAgICAgICAgICAgdmlldyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBnZW9tZXRyeS5jaGlsZHJlbi5sZW5ndGgsIGNoLCBjaHZpZXc7IGkgPCBsOyBpKysgKXtcbiAgICAgICAgICAgICAgICAgICAgY2ggPSBnZW9tZXRyeS5jaGlsZHJlblsgaSBdO1xuICAgICAgICAgICAgICAgICAgICBjaHZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoIGNoLmcsIHN0eWxlcywgdmlldyApO1xuICAgICAgICAgICAgICAgICAgICBjaHZpZXcucG9zaXRpb24uc2V0KCBjaC5wb3MueCwgY2gucG9zLnkgKTtcbiAgICAgICAgICAgICAgICAgICAgY2h2aWV3LnJvdGF0aW9uID0gY2guYW5nbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIGFzc3VtZSBpdCdzIGEgcG9pbnRcbiAgICAgICAgICAgICAgICB2aWV3ID0gdGhpcy5jcmVhdGVDaXJjbGUoMCwgMCwgMSwgc3R5bGVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBuYW1lICE9PSAnY29tcG91bmQnICYmIHN0eWxlcy5hbmdsZUluZGljYXRvciAmJiBzdHlsZXMuYW5nbGVJbmRpY2F0b3IgIT09ICd0cmFuc3BhcmVudCcgKXtcblxuICAgICAgICAgICAgICAgIHZpZXcubGluZVN0eWxlKCBzdHlsZXMubGluZVdpZHRoLCBzdHlsZXMuYW5nbGVJbmRpY2F0b3IgKTtcbiAgICAgICAgICAgICAgICB2aWV3Lm1vdmVUbyggMCwgMCApO1xuICAgICAgICAgICAgICAgIHZpZXcubGluZVRvKCBodywgMCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIG5hbWUgIT09ICdjb21wb3VuZCcgKXtcbiAgICAgICAgICAgICAgICB2aWV3LmNhY2hlQXNCaXRtYXAgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2hpbGQodmlldyk7XG4gICAgICAgICAgICByZXR1cm4gdmlldztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBleHRlbmRlZFxuICAgICAgICBkcmF3TWV0YTogZnVuY3Rpb24oIG1ldGEgKXtcbiAgICAgICAgICAgIGlmICghdGhpcy5tZXRhLmxvYWRlZCl7XG4gICAgICAgICAgICAgICAgLy8gZGVmaW5lIHRoZSBmb250IHN0eWxlcyBoZXJlXG4gICAgICAgICAgICAgICAgdGhpcy5tZXRhLmZwcyA9IG5ldyBQSVhJLlRleHQoJ0ZQUzogJyArIG1ldGEuZnBzLnRvRml4ZWQoMiksIGZvbnRTdHlsZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMubWV0YS5mcHMucG9zaXRpb24ueCA9IDE1O1xuICAgICAgICAgICAgICAgIHRoaXMubWV0YS5mcHMucG9zaXRpb24ueSA9IDU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1ldGEuaXBmID0gbmV3IFBJWEkuVGV4dCgnSVBGOiAnICsgbWV0YS5pcGYsIGZvbnRTdHlsZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMubWV0YS5pcGYucG9zaXRpb24ueCA9IDE1O1xuICAgICAgICAgICAgICAgIHRoaXMubWV0YS5pcGYucG9zaXRpb24ueSA9IDMwO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLm1ldGEuZnBzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubWV0YS5pcGYpO1xuICAgICAgICAgICAgICAgIHRoaXMubWV0YS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGEuZnBzLnNldFRleHQoJ0ZQUzogJyArIG1ldGEuZnBzLnRvRml4ZWQoMikpO1xuICAgICAgICAgICAgICAgIHRoaXMubWV0YS5pcGYuc2V0VGV4dCgnSVBGOiAnICsgbWV0YS5pcGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQaXhpUmVuZGVyZXIjY3JlYXRlRGlzcGxheSggdHlwZSwgb3B0aW9ucyApIC0+IFBJWEkuRGlzcGxheU9iamVjdFxuICAgICAgICAgKiAtIHR5cGUgKFN0cmluZyk6IFRoZSB0eXBlIG9mIFBJWEkuRGlzcGxheU9iamVjdCB0byBtYWtlXG4gICAgICAgICAqIC0gb3B0aW9ucyAoT2JqZWN0KTogT3B0aW9ucyB0byBhcHBseSB0byB0aGUgdmlldy5cbiAgICAgICAgICogKyAoUElYSS5EaXNwbGF5T2JqZWN0KTogQW4gb2JqZWN0IHRoYXQgaXMgcmVuZGVyYWJsZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQ3JlYXRlIGEgUElYSSBzcHJpdGUgb3IgbW92aWUgY2xpcC5cbiAgICAgICAgICoqL1xuICAgICAgICBjcmVhdGVEaXNwbGF5OiBmdW5jdGlvbiggdHlwZSwgb3B0aW9ucyApe1xuICAgICAgICAgICAgdmFyIHZpZXcgPSBudWxsXG4gICAgICAgICAgICAgICAgLHRleHR1cmUgPSBudWxsXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKXtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBzcHJpdGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgY2FzZSAnc3ByaXRlJzpcbiAgICAgICAgICAgICAgICAgICAgdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2Uob3B0aW9ucy50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgdmlldyA9IG5ldyBQSVhJLlNwcml0ZSh0ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5hbmNob3IueCA9IG9wdGlvbnMuYW5jaG9yLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmFuY2hvci55ID0gb3B0aW9ucy5hbmNob3IueTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBhIGNvbnRhaW5lciBpcyBzcGVjaWZpZWQsIHVzZSBhZGQgdG8gdGhhdCBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRhaW5lci5hZGRDaGlsZCh2aWV3KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBqdXN0IGFkZCB0aGUgdmlldyB0byB0aGUgc3RhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodmlldyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbW92aWVjbGlwIG9iamVjdFxuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmllY2xpcCc6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hc3NldHNMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiTm8gYXNzZXRzIGhhdmUgYmVlbiBsb2FkZWQuIFVzZSBsb2FkU3ByaXRlc2hlZXQoKSBmaXJzdFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXggPSBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgLGkgPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBvcHVsYXRlIG91ciBtb3ZpZWNsaXBcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpOyBpIDwgb3B0aW9ucy5mcmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUZyYW1lKG9wdGlvbnMuZnJhbWVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleC5wdXNoKHRleHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgUElYSS5Nb3ZpZUNsaXAodGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5hbmNob3IueCA9IG9wdGlvbnMuYW5jaG9yLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmFuY2hvci55ID0gb3B0aW9ucy5hbmNob3IueTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBhIGNvbnRhaW5lciBpcyBzcGVjaWZpZWQsIHVzZSBhZGQgdG8gdGhhdCBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRhaW5lci5hZGRDaGlsZCh2aWV3KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBqdXN0IGFkZCB0aGUgdmlldyB0byB0aGUgc3RhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodmlldyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZGVmYXVsdCBjYXNlXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgUElYSS5EaXNwbGF5T2JqZWN0IHBhc3NlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBpeGlSZW5kZXJlciNjZW50ZXJBbmNob3IoIHZpZXcgKVxuICAgICAgICAgKiAtIHZpZXcgKFBJWEkuRGlzcGxheU9iamVjdCk6IFRoZSB2aWV3IHRvIGNlbnRlclxuICAgICAgICAgKlxuICAgICAgICAgKiBDZW50ZXJzIHRoZSBhbmNob3IgdG8ge3g6IDAuNSwgeTogMC41fSBvZiBhIHZpZXdcbiAgICAgICAgICoqL1xuICAgICAgICBjZW50ZXJBbmNob3I6IGZ1bmN0aW9uKCB2aWV3ICkge1xuICAgICAgICAgICAgaWYgKHZpZXcgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHZpZXcuYW5jaG9yLnggPSAwLjU7XG4gICAgICAgICAgICAgICAgdmlldy5hbmNob3IueSA9IDAuNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG4vLyAtLS1cbi8vIGluc2lkZTogc3JjL291dHJvLmpzXG5cbnJldHVybiBQaHlzaWNzO1xufSkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vcGh5c2ljc2pzL2Rpc3QvcGh5c2ljc2pzLWZ1bGwuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFBoeXNpY3MgZnJvbSBcInBoeXNpY3Nqc1wiO1xyXG5cclxubGV0IHBhdXNlZCA9IGZhbHNlO1xyXG5sZXQgYm9keVJhZGl1cyA9IDI7XHJcbmxldCBncmF2aXR5V2VsbCA9IGZhbHNlO1xyXG5cclxuXHRmdW5jdGlvbiBhY3Rpb25TZWxlY3RvcihhY3Rpb25CKSB7XHJcblx0XHRcdHN3aXRjaChhY3Rpb25CKSB7XHJcblx0XHRcdFx0Y2FzZSAnZ3Jhdml0eVdlbGwnOlxyXG5cdFx0XHRcdGdyYXZpdHlXZWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzbWFsbCc6XHJcblx0XHRcdFx0Ym9keVJhZGl1cyA9IDI7XHJcblx0XHRcdFx0Z3Jhdml0eVdlbGwgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdtZWRpdW0nOlxyXG5cdFx0XHRcdGJvZHlSYWRpdXMgPSA0O1xyXG5cdFx0XHRcdGdyYXZpdHlXZWxsID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnbGFyZ2UnOlxyXG5cdFx0XHRcdGJvZHlSYWRpdXMgPSA2O1xyXG5cdFx0XHRcdGdyYXZpdHlXZWxsID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnaHVnZSc6XHJcblx0XHRcdFx0Ym9keVJhZGl1cyA9IDg7XHJcblx0XHRcdFx0Z3Jhdml0eVdlbGwgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cclxuXHJcblx0UGh5c2ljcyh7c2xlZXBEaXNhYmxlZDogdHJ1ZX0sIGZ1bmN0aW9uKHdvcmxkKSB7XHJcblx0XHR2YXIgdmlld3BvcnRXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydCcpLnNjcm9sbFdpZHRoO1xyXG5cdFx0dmFyIHZpZXdwb3J0SGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdwb3J0Jykuc2Nyb2xsSGVpZ2h0O1xyXG5cdFx0dmFyIGJvdW5kcyA9IFBoeXNpY3MuYWFiYigwLCAwLCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCk7XHJcblx0XHR2YXIgZWRnZUJvdW5jZSA9IFBoeXNpY3MuYmVoYXZpb3IoJ2VkZ2UtY29sbGlzaW9uLWRldGVjdGlvbicsIHthYWJiOiBib3VuZHMsIHJlc3RpdHV0aW9uOiAxLCBjaGFubmVsOidjb2xsaXNpb25zLWVkZ2U6ZGV0ZWN0ZWQnfSk7XHJcblxyXG5cdFx0Ly9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld3BvcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZENpcmNsZSk7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF1c2VCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhdXNlR2FtZSk7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc2V0V29ybGQpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblx0XHR2YXIgcmVuZGVyZXIgPSBQaHlzaWNzLnJlbmRlcmVyKCdjYW52YXMnLCB7XHJcblx0XHRcdGVsOiAndmlld3BvcnQnLFxyXG5cdFx0XHR3aWR0aDogdmlld3BvcnRXaWR0aCxcclxuXHRcdFx0aGVpZ2h0OiB2aWV3cG9ydEhlaWdodFxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmlld3BvcnRXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydCcpLnNjcm9sbFdpZHRoO1xyXG5cdFx0XHR2aWV3cG9ydEhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydCcpLnNjcm9sbEhlaWdodDtcclxuXHRcdFx0cmVuZGVyZXIuZWwud2lkdGggPSB2aWV3cG9ydFdpZHRoO1xyXG5cdFx0XHRyZW5kZXJlci5lbC5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcclxuXHJcblx0XHRcdGJvdW5kcyA9IFBoeXNpY3MuYWFiYigwLCAwLCB2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCk7XHJcblx0XHRcdGVkZ2VCb3VuY2Uuc2V0QUFCQihib3VuZHMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d29ybGQuYWRkKHJlbmRlcmVyKTtcclxuXHJcblx0XHR3b3JsZC5hZGQoW1xyXG5cdFx0XHRQaHlzaWNzLmJlaGF2aW9yKCduZXd0b25pYW4nKSxcclxuXHRcdFx0ZWRnZUJvdW5jZSxcclxuXHRcdFx0UGh5c2ljcy5iZWhhdmlvcignYm9keS1pbXB1bHNlLXJlc3BvbnNlJywge1xyXG5cdFx0XHRcdGNoZWNrOiAnY29sbGlzaW9ucy1lZGdlOmRldGVjdGVkJ1xyXG5cdFx0XHR9KSxcclxuXHRcdFx0UGh5c2ljcy5iZWhhdmlvcignYm9keS1jb2xsaXNpb24tZGV0ZWN0aW9uJywge1xyXG5cdFx0XHRcdGNoYW5uZWw6ICdjb2xsaXNpb25zLWJvZHk6ZGV0ZWN0ZWQnXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRQaHlzaWNzLmJlaGF2aW9yKCdzd2VlcC1wcnVuZScpLFxyXG5cdFx0XHRQaHlzaWNzLmJlaGF2aW9yKCdpbnRlcmFjdGl2ZScsIHtlbDogcmVuZGVyZXIuY29udGFpbmVyfSlcclxuXHRcdF0pO1xyXG5cclxuXHRcdHZhciBhdHRyYWN0b3IgPSBQaHlzaWNzLmJlaGF2aW9yKCdhdHRyYWN0b3InLCB7XHJcbiAgICAgICAgb3JkZXI6IDAsXHJcbiAgICAgICAgc3RyZW5ndGg6IDAuMDAxXHJcblx0XHR9KTtcclxuXHRcdHdvcmxkLm9uKHtcclxuXHRcdFx0J2ludGVyYWN0OnBva2UnOiBmdW5jdGlvbiggcG9zICl7XHJcblx0XHRcdFx0aWYoIWdyYXZpdHlXZWxsKSB7XHJcblx0XHRcdFx0XHR2YXIgY2lyY2xlID0gYWRkQ2lyY2xlKHBvcywgYm9keVJhZGl1cyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIm1hc3M6XCIrY2lyY2xlLm1hc3MgKTtcclxuXHRcdFx0XHRcdHdvcmxkLmFkZChjaXJjbGUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR3b3JsZC53YWtlVXBBbGwoKTtcclxuXHRcdFx0XHRcdGF0dHJhY3Rvci5wb3NpdGlvbiggcG9zICk7XHJcblx0XHRcdFx0XHR3b3JsZC5hZGQoIGF0dHJhY3RvciApO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0LCdpbnRlcmFjdDptb3ZlJzogZnVuY3Rpb24oIHBvcyApe1xyXG5cdFx0XHRcdGF0dHJhY3Rvci5wb3NpdGlvbiggcG9zICk7XHJcblx0XHRcdH1cclxuXHRcdFx0LCdpbnRlcmFjdDpyZWxlYXNlJzogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR3b3JsZC53YWtlVXBBbGwoKTtcclxuXHRcdFx0XHR3b3JsZC5yZW1vdmUoIGF0dHJhY3RvciApO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR3b3JsZC5vbignY29sbGlzaW9ucy1ib2R5OmRldGVjdGVkJywgZnVuY3Rpb24oZGF0YSkge1x0XHQvL2NvbGxpc2lvbiBkZXRlY3Rpb24gZm9yIG1lcmdpbmcgYm9kaWVzXHJcblxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gY2FsY0ltcHVsc2UoYmlnZ2VyQm9keSwgc21hbGxlckJvZHkpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkluaXRpYWwgdmVsb2NpdGllczogQmlnOlwiK2JpZ2dlckJvZHkuc3RhdGUub2xkLnZlbCtcIiBTbWFsbDpcIitzbWFsbGVyQm9keS5zdGF0ZS5vbGQudmVsICsgXCIvblwiKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkluIGNhbGNJbXB1bHNlIDogSW5pdGlhbCBtYXNzZXM6IEJpZzogXCIgKyBiaWdnZXJCb2R5Lm1hc3MgKyBcIiBzbWFsbDogXCIrIHNtYWxsZXJCb2R5Lm1hc3MrXCIgL25cIik7XHJcblx0XHRcdFx0dmFyIGkxID0gYmlnZ2VyQm9keS5zdGF0ZS52ZWwubXVsdChiaWdnZXJCb2R5Lm1hc3MpO1xyXG5cdFx0XHRcdHZhciBpMiA9IHNtYWxsZXJCb2R5LnN0YXRlLnZlbC5tdWx0KHNtYWxsZXJCb2R5Lm1hc3MpO1xyXG5cdFx0XHRcdHZhciBhZGRlZE1hc3NlcyA9IGJpZ2dlckJvZHkubWFzcyArIHNtYWxsZXJCb2R5Lm1hc3M7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJpbXB1bHNlMTogXCIrIGkxICsgXCJpbXB1bHNlMjpcIiArIGkyICsgXCJBZGRlZCBtYXNzZXM6IFwiKyBhZGRlZE1hc3Nlcyk7XHJcblx0XHRcdFx0aTEudmFkZChpMik7XHJcblx0XHRcdFx0aTEueCA9IGkxLnggLyBhZGRlZE1hc3NlcztcclxuXHRcdFx0XHRpMS55ID0gaTEueSAvIGFkZGVkTWFzc2VzO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRmluYWwgaW1wdWxzZTogXCIgKyBpMSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBpMTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGNhbGNOZXdCb2R5KGJpZ2dlckJvZHksIHNtYWxsZXJCb2R5KSB7XHJcblx0XHRcdFx0YmlnZ2VyQm9keS5zdGF0ZS52ZWwgPSBjYWxjSW1wdWxzZShiaWdnZXJCb2R5LCBzbWFsbGVyQm9keSk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJpbiBjYWxjTmV3Qm9keSAxIDpcIiArIGJpZ2dlckJvZHkubWFzcyk7XHJcblx0XHRcdFx0YmlnZ2VyQm9keS5tYXNzICs9IHNtYWxsZXJCb2R5Lm1hc3M7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJpbiBjYWxjTmV3Qm9keSAyIDpcIiArIGJpZ2dlckJvZHkubWFzcyk7XHJcblx0XHRcdFx0YmlnZ2VyQm9keS5yYWRpdXMgPSBNYXRoLmNicnQoKGJpZ2dlckJvZHkubWFzcyoxMjAwMCkvKDQqTWF0aC5QSSkpO1xyXG5cdFx0XHRcdGJpZ2dlckJvZHkuZ2VvbWV0cnkucmFkaXVzID0gTWF0aC5jYnJ0KChiaWdnZXJCb2R5Lm1hc3MqMTIwMDApLyg0Kk1hdGguUEkpKTtcclxuXHRcdFx0XHRiaWdnZXJCb2R5LnZpZXcgPSBudWxsO1xyXG5cdFx0XHRcdGJpZ2dlckJvZHkucmVjYWxjKCk7XHJcblx0XHRcdFx0d29ybGQucmVtb3ZlKHNtYWxsZXJCb2R5KTtcclxuXHRcdFx0fTtcclxuXHJcblxyXG5cdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5jb2xsaXNpb25zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0YyA9IGRhdGEuY29sbGlzaW9uc1tpXTtcclxuXHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJvdmVybGFwOiBcIitjLm92ZXJsYXApO1xyXG5cdFx0XHRcdGlmICgoYy5vdmVybGFwID4gYy5ib2R5QS5yYWRpdXMvNCkgfHwgKGMub3ZlcmxhcCA+IGMuYm9keUIucmFkaXVzLzQpKXtcclxuXHRcdFx0XHRcdGlmKGMuYm9keUEubWFzcyA+PSBjLmJvZHlCLm1hc3MpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJJbiBNYXNzQ2hlY2sgQSBtYXNzOiBcIiArIGMuYm9keUEubWFzcysgXCJCIG1hc3M6IFwiKyBjLmJvZHlCLm1hc3MpO1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhLmNvbGxpc2lvbnNbaV0pO1xyXG5cclxuXHRcdFx0XHRcdFx0Y2FsY05ld0JvZHkoYy5ib2R5QSwgYy5ib2R5Qik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjYWxjTmV3Qm9keShjLmJvZHlCLCBjLmJvZHlBKTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBhZGRDaXJjbGUocG9zLFxyXG5cdFx0YlJhZGl1cyxcclxuXHRcdGJNYXNzID0gKCg0LzMpKk1hdGguUEkqTWF0aC5wb3coYm9keVJhZGl1cywgMykpLzQwMDAsXHJcblx0XHRiVmVsb2NpdHkgPSBuZXcgUGh5c2ljcy52ZWN0b3Ioe3g6IDAuMDAsIHk6IDAuMDB9KSlcclxuXHRcdHtcclxuXHRcdFx0dmFyIHhQb3MgPSBwb3MueDtcclxuXHRcdFx0dmFyIHlQb3MgPSBwb3MueTtcclxuXHRcdFx0dmFyIGNpcmNsZSA9IFBoeXNpY3MuYm9keSgnY2lyY2xlJywge1xyXG5cdFx0XHR4OiB4UG9zLFxyXG5cdFx0XHR5OiB5UG9zLFxyXG5cdFx0XHRyYWRpdXM6IGJSYWRpdXMsXHJcblx0XHRcdG1hc3M6IGJNYXNzLFxyXG5cdFx0XHR2eDogYlZlbG9jaXR5LngsXHJcblx0XHRcdHZ5OiBiVmVsb2NpdHkueSxcclxuXHRcdFx0c3R5bGVzOiB7XHJcblx0XHRcdFx0ZmlsbFN0eWxlOiAnI0ZGRjg4MCcsXHJcblx0XHRcdFx0YW5nbGVJbmRpY2F0b3I6ICcjRkZGODgwJ1xyXG5cdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwidmVsOlwiKyBjaXJjbGUuc3RhdGUudmVsKTtcclxuXHRcdFx0cmV0dXJuIGNpcmNsZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVzZXRXb3JsZCgpIHtcclxuXHRcdFx0dmFyIGNpcmNsZXMgPSBbXTtcclxuXHRcdFx0Y2lyY2xlcyA9IHdvcmxkLmdldEJvZGllcygpO1xyXG5cdFx0XHR3b3JsZC5yZW1vdmUoY2lyY2xlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gcGF1c2VHYW1lKCkge1xyXG5cdFx0XHRpZighcGF1c2VkKSB7XHJcblx0XHRcdFx0d29ybGQucGF1c2UoKTtcclxuXHRcdFx0XHRwYXVzZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHdvcmxkLnVucGF1c2UoKTtcclxuXHRcdFx0XHRwYXVzZWQgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHR3b3JsZC5yZW5kZXIoKTtcclxuXHRcdFBoeXNpY3MudXRpbC50aWNrZXIub24oZnVuY3Rpb24gKHRpbWUsIGR0KSB7XHJcblx0XHRcdHdvcmxkLnN0ZXAodGltZSk7XHJcblx0XHR9KTtcclxuXHRcdFBoeXNpY3MudXRpbC50aWNrZXIuc3RhcnQoKTtcclxuXHRcdHdvcmxkLm9uKCdzdGVwJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHdvcmxkLnJlbmRlcigpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=