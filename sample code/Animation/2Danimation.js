/*
How to load animations
An animation is a series of images that are displayed one after the other at a fast enough rate to give the appearance of motion.

The loadAni/loadAnimation function has three different modes: sequence, list, and sprite sheet.

In this code example, the cloud breathing animation is loaded using a numbered sequence of images given the path to the first image and the index of the last image in the sequence.

The animation function is similar to the q5.js image function. Use it inside the draw loop to display an animation at a position.
*/
//SEQUENCE MODE
let cloudAni;

function setup() {
	new Canvas(500, 160);

	//         loadAni(firstFile,         lastFrameIndex)
	cloudAni = loadAni('assets/cloud_breathing1.webp', 9);
}

function update() {
	clear();
	animation(cloudAni, 250, 80);
}

//LIST MODE
/*
The loadAni function can also be provided a list of images.

The ani.frameDelay property defines how many frames an image in the animation is displayed before the next image is displayed. The default is 4. Higher values make the animation play slower. A frame delay of 1 would make the animation play as fast as possible.
*/
let shapeShifterAni;

function setup() {
	new Canvas(500, 160);

	//                loadAni(...files)
	shapeShifterAni = loadAni(
		'assets/asterisk.webp',
		'assets/mess.webp',
		'assets/cloud.webp',
		'assets/triangle.webp',
		'assets/star.webp'
	);

	shapeShifterAni.frameDelay = 20;
}

function update() {
	clear();
	animation(shapeShifterAni, 250, 80);
}

//SPRITE SHEET
/*
A sprite sheet is a single image that contains all the frames of an animation. ani.spriteSheet is displayed in the sketch so you can see what one looks like.

In sprite sheet mode, loadAni accepts an "atlas" JS object that specifies the size of each frame and how many frames of animation there are.

This easy way to load animations requires that every frame in your sprite sheet is the same size, grid aligned, and in order from left to right, top to bottom.
*/

let splatAni;

function setup() {
	new Canvas(500, 200);

	//         loadAni(spriteSheet, atlas)
	splatAni = loadAni('assets/explode.webp', {
		width: 342, height: 316, frames: 11
	});
}

function update() {
	clear();
	animation(splatAni, 100, 100);

	image(splatAni.spriteSheet, 200, 50, 300, 92);
}

/*
If you want an animation to only use specific frames from the sprite sheet, set the "frames" property of the atlas object to an array of frame indexes */

let wobbleAni;

function setup() {
	new Canvas(500, 200);

	wobbleAni = loadAni('assets/explode_labeled.webp', {
		width: 342, height: 316, frames: [0, 1, 9, 10]
	});
}

function update() {
	clear();
	animation(wobbleAni, 100, 100);

	image(wobbleAni.spriteSheet, 200, 50, 300, 92);
}


/*
Another way to use loadAni in sprite sheet mode, is to provide an array of frame locators, arrays that specify the position and size of a frame.

When creating sprite sheets consider the tradeoff between the image space efficiency gained by tightly packing irregular sized frames together, versus the ease of loading a grid aligned sprite sheet.

Note that the animations in these examples are being lazy loaded in setup. If you really need to use an animation when your program starts, load it in the q5.js preload function instead.
 */

let splatAni;

function setup() {
	new Canvas(500, 200);

	splatAni = loadAni('assets/explode.webp', [
	//[  x,   y,   w,  h]
		[796, 138, 110, 72]
	]);
}

function update() {
	clear();
	animation(splatAni, 100, 100);

	image(splatAni.spriteSheet, 200, 50, 300, 92);
}