/**
 * Returns a new identity transform.
 *
 * @class Represents a transformation matrix. The transformation matrix is
 * limited to expressing translate and uniform scale transforms only; shearing,
 * rotation, general affine, and other transforms are not supported.
 *
 * <p>The methods on this class treat the transform as immutable, returning a
 * copy of the transformation matrix with the specified transform applied. Note,
 * alternatively, that the matrix fields can be get and set directly.
 */
pv.Transform = function() {};
pv.Transform.prototype = {k: 1, f:1, x: 0, y: 0};

/**
 * The y-scale magnitude; defaults to 1.
 *
 * @type number
 * @name pv.Transform.prototype.k
 */

/**
 * The x-scale magnitude; defaults to 1.
 *
 * @type number
 * @name pv.Transform.prototype.f
 */

/**
 * The x-offset; defaults to 0.
 *
 * @type number
 * @name pv.Transform.prototype.x
 */

/**
 * The y-offset; defaults to 0.
 *
 * @type number
 * @name pv.Transform.prototype.y
 */

/**
 * @private The identity transform.
 *
 * @type pv.Transform
 */
pv.Transform.identity = new pv.Transform();

// k 0 x   1 0 a   k 0 ka+x
// 0 f y * 0 1 b = 0 f fb+y
// 0 0 1   0 0 1   0 0 1

/**
 * Returns a translated copy of this transformation matrix.
 *
 * @param {number} x the x-offset.
 * @param {number} y the y-offset.
 * @returns {pv.Transform} the translated transformation matrix.
 */
pv.Transform.prototype.translate = function(x, y) {
  var v = new pv.Transform();
  v.k = this.k;
  v.f = this.f;
  v.x = this.k * x + this.x;
  v.y = this.f * y + this.y;
  return v;
};

// k 0 x   d 0 0   kd  0 x
// 0 f y * 0 e 0 =  0 fe y
// 0 0 1   0 0 1    0  0 1

/**
 * Returns a scaled copy of this transformation matrix.
 *
 * @param {number} k
 * @param {number} f
 * @returns {pv.Transform} the scaled transformation matrix.
 */
pv.Transform.prototype.scale = function(k, f) {
  if (arguments.length < 2) f = k;

  var v = new pv.Transform();
  v.k = this.k * k;
  v.f = this.f * f
  v.x = this.x;
  v.y = this.y;
  return v;
};

/**
 * Returns the inverse of this transformation matrix.
 *
 * @returns {pv.Transform} the inverted transformation matrix.
 */
pv.Transform.prototype.invert = function() {
  var v = new pv.Transform(), k = 1 / this.k, f = 1 / this.f;
  v.k = k;
  v.f = f;
  v.x = -this.x * k;
  v.y = -this.y * f;
  return v;
};

// k 0 x   d 0 a   kd  0 ka+x
// 0 f y * 0 e b =  0 fe fb+y
// 0 0 1   0 0 1    0  0    1

/**
 * Returns this matrix post-multiplied by the specified matrix <i>m</i>.
 *
 * @param {pv.Transform} m
 * @returns {pv.Transform} the post-multiplied transformation matrix.
 */
pv.Transform.prototype.times = function(m) {
  var v = new pv.Transform();
  v.k = this.k * m.k;
  v.f = this.f * m.f;
  v.x = this.k * m.x + this.x;
  v.y = this.f * m.y + this.y;
  return v;
};
