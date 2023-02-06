var canvas;

var delta = [ 0, 0 ];
var stage = [ window.screenX, window.screenY, window.innerWidth, window.innerHeight ];
getBrowserDimensions();

var themes = [ [ "#10222B", "#95AB63", "#BDD684", "#E2F0D6", "#F6FFE0" ],
		[ "#362C2A", "#732420", "#BF734C", "#FAD9A0", "#736859" ],
		[ "#0D1114", "#102C2E", "#695F4C", "#EBBC5E", "#FFFBB8" ],
		[ "#2E2F38", "#FFD63E", "#FFB54B", "#E88638", "#8A221C" ],
		[ "#121212", "#E6F2DA", "#C9F24B", "#4D7B85", "#23383D" ],
		[ "#343F40", "#736751", "#F2D7B6", "#BFAC95", "#8C3F3F" ],
		[ "#000000", "#2D2B2A", "#561812", "#B81111", "#FFFFFF" ],
		[ "#333B3A", "#B4BD51", "#543B38", "#61594D", "#B8925A" ] ];
var theme;

var worldAABB, world, iterations = 1, timeStep = 1 / 15;

var walls = [];
var wall_thickness = 200;
var wallsSetted = false;

var bodies, elements, text;

var createMode = false;
var destroyMode = false;

var isMouseDown = false;
var mouseJoint;
var mouse = { x: 0, y: 0 };
var gravity = { x: 0, y: 1 };

var PI2 = Math.PI * 2;

var timeOfLastTouch = 0;

init();
play();

function init() {

	canvas = document.getElementById( 'canvas' );

	document.onmousedown = onDocumentMouseDown;
	document.onmouseup = onDocumentMouseUp;
	document.onmousemove = onDocumentMouseMove;
	document.ondblclick = onDocumentDoubleClick;

	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	document.addEventListener( 'touchend', onDocumentTouchEnd, false );

	window.addEventListener( 'deviceorientation', onWindowDeviceOrientation, false );

	// init box2d

	worldAABB = new b2AABB();
	worldAABB.minVertex.Set( -200, -200 );
	worldAABB.maxVertex.Set( window.innerWidth + 200, window.innerHeight + 200 );

	world = new b2World( worldAABB, new b2Vec2( 0, 0 ), true );

	setWalls();
	reset();
}


function play() {

	setInterval( loop, 1000 / 40 );
}

function reset() {

	var i;

	if ( bodies ) {

		for ( i = 0; i < bodies.length; i++ ) {

			var body = bodies[ i ]
			canvas.removeChild( body.GetUserData().element );
			world.DestroyBody( body );
			body = null;
		}
	}

	// color theme
	theme = themes[ Math.random() * themes.length >> 0 ];
	document.body.style[ 'backgroundColor' ] = theme[ 0 ];

	bodies = [];
	elements = [];

	createInstructions();

	for( i = 0; i < 10; i++ ) {

		createBall();

	}

}

//

function onDocumentMouseDown() {

	isMouseDown = true;
	return false;
}

function onDocumentMouseUp() {

	isMouseDown = false;
	return false;
}

function onDocumentMouseMove( event ) {

	mouse.x = event.clientX;
	mouse.y = event.clientY;
}

function onDocumentDoubleClick() {

	reset();
}

function onDocumentTouchStart( event ) {

	if( event.touches.length == 1 ) {

		event.preventDefault();

		// Faking double click for touch devices

		var now = new Date().getTime();

		if ( now - timeOfLastTouch  < 250 ) {

			reset();
			return;
		}

		timeOfLastTouch = now;

		mouse.x = event.touches[ 0 ].pageX;
		mouse.y = event.touches[ 0 ].pageY;
		isMouseDown = true;
	}
}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouse.x = event.touches[ 0 ].pageX;
		mouse.y = event.touches[ 0 ].pageY;

	}

}

function onDocumentTouchEnd( event ) {

	if ( event.touches.length == 0 ) {

		event.preventDefault();
		isMouseDown = false;

	}

}

function onWindowDeviceOrientation( event ) {

	if ( event.beta ) {

		gravity.x = Math.sin( event.gamma * Math.PI / 180 );
		gravity.y = Math.sin( ( Math.PI / 4 ) + event.beta * Math.PI / 180 );

	}

}

//

function createInstructions() {

	var size = 250;

	var element = document.createElement( 'div' );
	element.width = size;
	element.height = size;	
	element.style.position = 'absolute';
	element.style.left = -200 + 'px';
	element.style.top = -200 + 'px';
	element.style.cursor = "default";

	canvas.appendChild(element);
	elements.push( element );

	var circle = document.createElement( 'canvas' );
	circle.width = size;
	circle.height = size;

	var graphics = circle.getContext( '2d' );

	graphics.fillStyle = theme[ 3 ];
	graphics.beginPath();
	graphics.arc( size * .5, size * .5, size * .5, 0, PI2, true );
	graphics.closePath();
	graphics.fill();

	element.appendChild( circle );

	text = document.createElement( 'div' );
	text.onSelectStart = null;
	var flinks = ["https://npm.elemecdn.com/akilar-friends@latest/avatar/akilar.top.jpg", "https://img.zhheo.com/i/2022/08/19/62ff32fa28da1.png", "https://image.anzhiy.cn/adminuploads/1/2022/09/15/63232b7d91d22.jpg", "https://www.chuckle.top/img/head.webp", "https://ichika.cc/img/Page/HeadIcon.jpg", "https://q1.qlogo.cn/g?b=qq&nk=553344777&s=5", "https://cdn1.4t.pw/npm/picture-sianx@1.0.0/Blog/logo.png", "https://www.fomal.cc/assets/head.jpg", "https://npm.elemecdn.com/webxc/logo/logo.jpg", "https://daiyu-233.top/img/avatar.png", "https://bu.dusays.com/2022/05/02/626f92e193879.jpg", "https://www.qingyi1220.cn/img/Tsingyi.jpg", "https://ghost.xiaozhuzi.xyz/cc3/99.jpg", "https://i.imgtg.com/2022/12/01/DM501.jpg", "https://cdn1.4t.pw/gh/612901/661111@main/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-12-21%20102358.png", "https://wlopck.gitee.io/img/avatar.png", "https://wsbblog.cn/img/wsb.webp", "https://www.lyshark.com/images/baidu_logo.png", "https://cdn1.4t.pw/gh/roydonGuo/CDN/avatar/ganyu.webp", "https://s1.vika.cn/space/2023/01/03/bc351f958fab4640853c5193afefe0fe", "https://s1.vika.cn/space/2023/01/08/ccf7921738f741dbbd0a261c4b8fce1c", "https://imgfiles-debin.oss-accelerate.aliyuncs.com/base_imgfiles/Head.jpg", "https://i0.hdslb.com/bfs/album/bd30e045cf48d8fb26b51a841f77b2cf2cf4da02.jpg", "https://img.lzxjack.top/img/202203302154224.webp", "https://android99.com/img/avatar.png", "https://cdn.dusays.com/avatar.png", "https://dorakika.cn/img/favicon.jpg", "https://public.cdn.nesxc.com/avatar.jpg", "https://npm.elemecdn.com/imgscdn/img/202111191951780.JPG", "https://img1.tianli0.top/logo.png", "https://blog.eurkon.com/images/user/avatar.jpg", "https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/head.jpg", "https://blog.linkinstars.com/blog-static/LLX.jpg", "https://cravatar.cn/avatar/05bb2aa29c9da6ef65fabd321135e7b6?s=200", "https://cdn1.4t.pw/npm/kang-static@latest/avatar.jpg", "https://cdn1.4t.pw/npm/@kmar/fonts/avatar/own.png", "https://photo.jakehu.cn/favicon.png", "https://ahzoo.cn/img/avatar.jpg", "https://www.beacox.space/assets/avatar.8df22d7f.png", "https://blog.zwying.com/avatar.jpg", "https://images.boysec.cn/medias/avatar.jpg", "https://blog.gahotx.cn/sinnerimages/icon.png?20220830194706", "https://img-blog.csdnimg.cn/224d6d7e13c048b289001e417de85622.png", "https://cdn.h3cfan.com/blog/logo.jpg", "https://wsbblog.cn/img/wsb.webp", "https://pic.cnblogs.com/avatar/2353241/20220424000642.png", "https://npm.mrzefr.cn/hexo-mrzefr-filebed@1.3.4/image/ICO/Doraemon.ico", "https://www.515code.com/img/profilephoto.jpg", "https://ll.sc.cn/img/avatar.png", "https://seayj.cn/medias/logo.png", "https://api.kloudy.cn/img/icon.png", "https://img.zsyyblog.com/favicon.jpg", "https://cloud-image-host.oss-cn-beijing.aliyuncs.com/wo.jpg", "https://lskypro.acozycotage.net/LightPicture/2023/01/2d02753ae747ac6e.webp", "https://bu.dusays.com/2022/10/29/635d11ccac58c.png", "https://www.z4a.net/images/2023/01/13/2db261ae30b42041db913074994ee5e4.jpg", "https://www.515code.com/img/profilephoto.jpg", "https://s3.bmp.ovh/imgs/2022/11/23/129c19d56d22c637.png", "https://lizilong.oss-cn-hangzhou.aliyuncs.com/typora/lizilong.jpg", "https://q1.qlogo.cn/g?b=qq&nk=1043865083&s=5", "https://i.imgtg.com/2023/01/06/GZRKN.jpg"];
	text.innerHTML = '<span class="gdtx" style="color:' + theme[0] + '"><img src='+(flinks[Math.floor(Math.random() * flinks.length)])+'></img></span>';
	text.style.color = theme[1];
	text.style.position = 'absolute';
	text.style.left = '0px';
	text.style.top = '0px';
	text.style.fontFamily = 'Georgia';
	text.style.textAlign = 'center';
	element.appendChild(text);

	text.style.left = ((250 - text.clientWidth) / 2) +'px';
	text.style.top = ((250 - text.clientHeight) / 2) +'px';	

	var b2body = new b2BodyDef();

	var circle = new b2CircleDef();
	circle.radius = size / 2;
	circle.density = 1;
	circle.friction = 0.3;
	circle.restitution = 0.3;
	b2body.AddShape(circle);
	b2body.userData = {element: element};

	b2body.position.Set( Math.random() * stage[2], Math.random() * -200 );
	b2body.linearVelocity.Set( Math.random() * 400 - 200, Math.random() * 400 - 200 );
	bodies.push( world.CreateBody(b2body) );	
}

function createBall( x, y ) {

	var x = x || Math.random() * stage[2];
	var y = y || Math.random() * -200;

	var size = (Math.random() * 100 >> 0) + 20;

	var element = document.createElement("canvas");
	element.width = size;
	element.height = size;
	element.style.position = 'absolute';
	element.style.left = -200 + 'px';
	element.style.top = -200 + 'px';
	element.style.WebkitTransform = 'translateZ(0)';
	element.style.MozTransform = 'translateZ(0)';
	element.style.OTransform = 'translateZ(0)';
	element.style.msTransform = 'translateZ(0)';
	element.style.transform = 'translateZ(0)';

	var graphics = element.getContext("2d");

	var num_circles = Math.random() * 10 >> 0;

	for (var i = size; i > 0; i-= (size/num_circles)) {

		graphics.fillStyle = theme[ (Math.random() * 4 >> 0) + 1];
		graphics.beginPath();
		graphics.arc(size * .5, size * .5, i * .5, 0, PI2, true); 
		graphics.closePath();
		graphics.fill();
	}

	canvas.appendChild(element);

	elements.push( element );

	var b2body = new b2BodyDef();

	var circle = new b2CircleDef();
	circle.radius = size >> 1;
	circle.density = 1;
	circle.friction = 0.3;
	circle.restitution = 0.3;
	b2body.AddShape(circle);
	b2body.userData = {element: element};

	b2body.position.Set( x, y );
	b2body.linearVelocity.Set( Math.random() * 400 - 200, Math.random() * 400 - 200 );
	bodies.push( world.CreateBody(b2body) );
}

//

function loop() {

	if (getBrowserDimensions()) {

		setWalls();

	}

	delta[0] += (0 - delta[0]) * .5;
	delta[1] += (0 - delta[1]) * .5;

	world.m_gravity.x = gravity.x * 350 + delta[0];
	world.m_gravity.y = gravity.y * 350 + delta[1];

	mouseDrag();
	world.Step(timeStep, iterations);

	for (i = 0; i < bodies.length; i++) {

		var body = bodies[i];
		var element = elements[i];

		element.style.left = (body.m_position0.x - (element.width >> 1)) + 'px';
		element.style.top = (body.m_position0.y - (element.height >> 1)) + 'px';

		if (element.tagName == 'DIV') {

			var style = 'rotate(' + (body.m_rotation0 * 57.2957795) + 'deg) translateZ(0)';
			text.style.WebkitTransform = style;
			text.style.MozTransform = style;
			text.style.OTransform = style;
			text.style.msTransform = style;
			text.style.transform = style;

		}

	}

}


// .. BOX2D UTILS

function createBox(world, x, y, width, height, fixed) {

	if (typeof(fixed) == 'undefined') {

		fixed = true;

	}

	var boxSd = new b2BoxDef();

	if (!fixed) {

		boxSd.density = 1.0;

	}

	boxSd.extents.Set(width, height);

	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);

	return world.CreateBody(boxBd);

}

function mouseDrag()
{
	// mouse press
	if (createMode) {

		createBall( mouse.x, mouse.y );

	} else if (isMouseDown && !mouseJoint) {

		var body = getBodyAtMouse();

		if (body) {

			var md = new b2MouseJointDef();
			md.body1 = world.m_groundBody;
			md.body2 = body;
			md.target.Set(mouse.x, mouse.y);
			md.maxForce = 30000 * body.m_mass;
			// md.timeStep = timeStep;
			mouseJoint = world.CreateJoint(md);
			body.WakeUp();

		} else {

			createMode = true;

		}

	}

	// mouse release
	if (!isMouseDown) {

		createMode = false;
		destroyMode = false;

		if (mouseJoint) {

			world.DestroyJoint(mouseJoint);
			mouseJoint = null;

		}

	}

	// mouse move
	if (mouseJoint) {

		var p2 = new b2Vec2(mouse.x, mouse.y);
		mouseJoint.SetTarget(p2);
	}
}

function getBodyAtMouse() {

	// Make a small box.
	var mousePVec = new b2Vec2();
	mousePVec.Set(mouse.x, mouse.y);

	var aabb = new b2AABB();
	aabb.minVertex.Set(mouse.x - 1, mouse.y - 1);
	aabb.maxVertex.Set(mouse.x + 1, mouse.y + 1);

	// Query the world for overlapping shapes.
	var k_maxCount = 10;
	var shapes = new Array();
	var count = world.Query(aabb, shapes, k_maxCount);
	var body = null;

	for (var i = 0; i < count; ++i) {

		if (shapes[i].m_body.IsStatic() == false) {

			if ( shapes[i].TestPoint(mousePVec) ) {

				body = shapes[i].m_body;
				break;

			}

		}

	}

	return body;

}

function setWalls() {

	if (wallsSetted) {

		world.DestroyBody(walls[0]);
		world.DestroyBody(walls[1]);
		world.DestroyBody(walls[2]);
		world.DestroyBody(walls[3]);

		walls[0] = null; 
		walls[1] = null;
		walls[2] = null;
		walls[3] = null;
	}

	walls[0] = createBox(world, stage[2] / 2, - wall_thickness, stage[2], wall_thickness);
	walls[1] = createBox(world, stage[2] / 2, stage[3] + wall_thickness, stage[2], wall_thickness);
	walls[2] = createBox(world, - wall_thickness, stage[3] / 2, wall_thickness, stage[3]);
	walls[3] = createBox(world, stage[2] + wall_thickness, stage[3] / 2, wall_thickness, stage[3]);	

	wallsSetted = true;

}

// BROWSER DIMENSIONS

function getBrowserDimensions() {

	var changed = false;

	if (stage[0] != window.screenX) {

		delta[0] = (window.screenX - stage[0]) * 50;
		stage[0] = window.screenX;
		changed = true;

	}

	if (stage[1] != window.screenY) {

		delta[1] = (window.screenY - stage[1]) * 50;
		stage[1] = window.screenY;
		changed = true;

	}

	if (stage[2] != window.innerWidth) {

		stage[2] = window.innerWidth;
		changed = true;

	}

	if (stage[3] != window.innerHeight) {

		stage[3] = window.innerHeight;
		changed = true;

	}

	return changed;

}
