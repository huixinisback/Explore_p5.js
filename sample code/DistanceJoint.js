/*By default, a DistanceJoint is attached at the center of each sprite that it's connected to. To shift the joint's attachment points, edit its offsetA and offsetB vectors.

Adjusting the joint's springiness ratio changes the amount it can stretch and compress.

0.0 = steel rod (default)
0.2 = stiff spring
0.4 = tight spring
0.6 = bouncy spring
0.8 = slinky
1.0 = bungee cord

You can also adjust the joints's damping ratio to change how quickly it loses vibrational energy.

Set collideConnected to true to make connected sprites collide with each other.
*/

let spA, spB, j;
function setup() {
	new Canvas(500, 500);
	world.gravity.y = 10;

	spA = new Sprite(250, 0, 300, 20, KIN);
	spB = new Sprite(200, 20, 40);

	j = new DistanceJoint(spA, spB);
	j.offsetA.y = 10;
	j.collideConnected = true;

	j.springiness = 0.8; // try changing this!
}

function update() {
	clear();
	spA.moveTowards(mouse);
}