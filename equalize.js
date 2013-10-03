(function(){
    var camera, scene, renderer;

    var maxmin=[],
        mouse = { x: 0, y: 0 },
        windowHalfX = window.innerWidth/2,
        windowHalfY = window.innerHeight/2;

    init();
    animate();

    function init() {
        var w = window.innerWidth,
            h = window.innerHeight,
            container = document.createElement( 'div' );

        document.body.appendChild( container );

        // Camera

        camera = new THREE.OrthographicCamera( w/-2, w/ 2, h/2, h/-2, -500, 1000 );
        camera.position.z = 200;
        scene = new THREE.Scene();

        // Cubes
        var cubeGeometry = new THREE.CubeGeometry( 48, 20, 20 );
        var material =  new THREE.MeshLambertMaterial( { color: '#189dff' } );

        var cube;
        for ( var i = 0; i < 20; ++i) {
            cube = new THREE.Mesh( cubeGeometry, material );
            cube.scale.y = 1;
            cube.position.x =  i * 60 - 570;
            cube.position.y = ( cube.scale.y * 20 ) / 2-100;
            maxmin[i] =  Math.floor(Math.random() * 10 +1 );
            scene.add( cube );
        } 

        //Text
        var theText = "Love Music";
        var text3d = new THREE.TextGeometry(theText, {
            size: 70,
            height: 20,
            font: "helvetiker",
        });
        var text = new THREE.Mesh(text3d, material);
        text.position.x = -595;
        text.position.y = -200;
        var group = new THREE.Object3D();
        group.add(text);
        scene.add(group);


        // Lights

        scene.add(new THREE.AmbientLight('#007fff'));
        var light = new THREE.DirectionalLight('#ffffff', 0.7);
        light.position.set( 50, 200, 100 );
        scene.add( light );


        //renderer

        //renderer = new THREE.CanvasRenderer();
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(w, h);
        container.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);


    }

    function onWindowResize() {
        var w = window.innerWidth;
        var h = window.innerHeight
        windowHalfX = w/2;
        windowHalfY = h/2;
        camera.left = w/-2;
        camera.right = w/2;
        camera.top = h/2;
        camera.bottom = h/- 2;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }


    function onDocumentMouseMove(event) {
        mouse.x = (event.clientX - windowHalfX);
        mouse.y = (event.clientY - windowHalfY);
    }


    function animate() {
        requestAnimationFrame(animate);
        render()
    }


    function render() {
        for (var i = 0; i < scene.children.length; i ++) {
            var object = scene.children[ i ];
            if ( object instanceof THREE.Mesh ) {
                if (maxmin[i] === 1) {
                    maxmin[i] = Math.floor( Math.random() * 10 + 1) ;
                }
                if (object.scale.y < maxmin[i] ) {                      
                    object.scale.y +=  1;
                } else if (object.scale.y > maxmin[i]) {
                    object.scale.y -= 1 ;   
                } else if (object.scale.y == maxmin[i]) {
                    maxmin[i] = 1 ;
                }
                object.position.y = ( object.scale.y * 20 ) / 2-100;
            }
        }
        if ((camera.position.x  > -100 && mouse.x < 0) || (camera.position.x  < 100 && mouse.x >0)) {
            camera.position.x += (mouse.x - camera.position.x) * 0.005;
        }; 
        camera.position.y += (-mouse.y - camera.position.y) * 0.005;
        camera.lookAt( scene.position );
        renderer.render( scene, camera );

    }
})()

