import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import '../styles/default.css';

const Home = () => {
    const canvasRef = useRef(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showGallery, setShowGallery] = useState(false);

    useEffect(() => {
        // Load legacy scripts dynamically
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = false;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        const initAnimation = async () => {
            try {
                // Ensure jQuery is loaded first if needed by other scripts, 
                // though modern React apps usually avoid this. 
                // The legacy code uses $.
                await loadScript('/js/jquery.min.js');
                await loadScript('/js/jscex.min.js');
                await loadScript('/js/jscex-parser.js');
                await loadScript('/js/jscex-jit.js');
                await loadScript('/js/jscex-builderbase.min.js');
                await loadScript('/js/jscex-async.min.js');
                await loadScript('/js/jscex-async-powerpack.min.js');
                await loadScript('/js/function.js');
                await loadScript('/js/love.js');

                // logic from index.html
                // We need to access global variables defined by these scripts or define our own scope
                // Since the original script used an IIFE, we might need to replicate the initialization here
                // or ensure the global window objects are available.

                // Triggering the IIFE logic manually if possible, or extracting it.
                // For now, let's assume the scripts populate the window object and we can call init logic.
                // However, the original index.html had the main logic inside an inline <script>.
                // We need to port that inline script here.

                startTreeAnimation();

            } catch (err) {
                console.error("Failed to load scripts", err);
            }
        };

        initAnimation();

        return () => {
            // Cleanup if necessary
        }
    }, []);

    const startTreeAnimation = () => {
        // Ported from index.html inline script
        if (!window.$) return;
        const $ = window.$;
        const Jscex = window.Jscex;
        const Tree = window.Tree;

        const canvas = $('#canvas');
        if (!canvas[0].getContext) return;

        var width = canvas.width();
        var height = canvas.height();
        canvas.attr("width", width);
        canvas.attr("height", height);

        var opts = {
            seed: {
                x: width / 2 - 20,
                color: "rgb(190, 26, 37)",
                scale: 2
            },
            branch: [
                [535, 680, 570, 250, 500, 200, 30, 100, [
                    [540, 500, 455, 417, 340, 400, 13, 100, [
                        [450, 435, 434, 430, 394, 395, 2, 40]
                    ]],
                    [550, 445, 600, 356, 680, 345, 12, 100, [
                        [578, 400, 648, 409, 661, 426, 3, 80]
                    ]],
                    [539, 281, 537, 248, 534, 217, 3, 40],
                    [546, 397, 413, 247, 328, 244, 9, 80, [
                        [427, 286, 383, 253, 371, 205, 2, 40],
                        [498, 345, 435, 315, 395, 330, 4, 60]
                    ]],
                    [546, 357, 608, 252, 678, 221, 6, 100, [
                        [590, 293, 646, 277, 648, 271, 2, 80]
                    ]]
                ]]
            ],
            bloom: {
                num: 700,
                width: 1080,
                height: 650,
            },
            footer: {
                width: 1200,
                height: 5,
                speed: 10,
            }
        }

        var tree = new Tree(canvas[0], width, height, opts);
        var seed = tree.seed;
        var foot = tree.footer;
        var hold = 1;

        canvas.click(function (e) {
            toggleAudio();
            var offset = canvas.offset(), x, y;
            x = e.pageX - offset.left;
            y = e.pageY - offset.top;
            if (seed.hover(x, y)) {
                hold = 0;
                canvas.unbind("click");
                canvas.unbind("mousemove");
                canvas.removeClass('hand');
            }
        }).mousemove(function (e) {
            var offset = canvas.offset(), x, y;
            x = e.pageX - offset.left;
            y = e.pageY - offset.top;
            canvas.toggleClass('hand', seed.hover(x, y));
        });

        // Async animations
        var seedAnimate = eval(Jscex.compile("async", function () {
            seed.draw();
            while (hold) {
                $await(Jscex.Async.sleep(10));
            }
            while (seed.canScale()) {
                seed.scale(0.95);
                $await(Jscex.Async.sleep(10));
            }
            while (seed.canMove()) {
                seed.move(0, 2);
                foot.draw();
                $await(Jscex.Async.sleep(10));
            }
        }));

        var growAnimate = eval(Jscex.compile("async", function () {
            do {
                tree.grow();
                $await(Jscex.Async.sleep(10));
            } while (tree.canGrow());
        }));

        var flowAnimate = eval(Jscex.compile("async", function () {
            do {
                tree.flower(2);
                $await(Jscex.Async.sleep(10));
            } while (tree.canFlower());
        }));

        var moveAnimate = eval(Jscex.compile("async", function () {
            tree.snapshot("p1", 240, 0, 610, 680);
            while (tree.move("p1", 500, 0)) {
                foot.draw();
                $await(Jscex.Async.sleep(10));
            }
            foot.draw();
            tree.snapshot("p2", 500, 0, 610, 680);

            canvas.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
            canvas.css("background", "rgba(255, 255, 255, 0.05)");
            $await(Jscex.Async.sleep(300));
            canvas.css("background", "none");
        }));

        var textAnimate = eval(Jscex.compile("async", function () {
            $("#code").show().typewriter();
        }));

        var runAsync = eval(Jscex.compile("async", function () {
            $await(seedAnimate());
            $await(growAnimate());
            $await(flowAnimate());
            $await(moveAnimate());

            // Start text
            textAnimate().start();

            // Show surprise button after text is likely done
            $await(Jscex.Async.sleep(5000));
            $("#surprise-trigger").fadeIn(1000);
        }));

        runAsync().start();
    };

    const toggleAudio = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play().catch(e => console.log("Audio play error", e));
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleSurprise = () => {
        $("#surprise-trigger").fadeOut();
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        setTimeout(function () {
            setShowGallery(true);
        }, 500);
    };

    return (
        <div id="main">
            <div className="hearts-container">
                <div className="heart-float" style={{ left: '10%', animationDelay: '0s' }}></div>
                <div className="heart-float" style={{ left: '30%', animationDelay: '2s' }}></div>
                <div className="heart-float" style={{ left: '50%', animationDelay: '4s' }}></div>
                <div className="heart-float" style={{ left: '70%', animationDelay: '6s' }}></div>
                <div className="heart-float" style={{ left: '90%', animationDelay: '8s' }}></div>
            </div>

            <audio ref={audioRef} loop id="myAudio">
                <source src="/assets/aud.mp3" type="audio/mp3" />
            </audio>

            <div id="music-control" onClick={toggleAudio}>
                {isPlaying ? '🎵' : '🔇'}
            </div>

            <div id="wrap">
                <div id="text">
                    <div id="code" className="glass" style={{ animation: 'pulse 15s infinite' }}>
                        <span className="say">Hey my love 💞</span><br />
                        <span className="say">I just wanted to say...</span><br />
                        <span className="say">You mean the world to me 🌎</span><br />
                        <span className="say">Every moment with you is magic ✨</span><br />
                        <span className="say">Thank you for being you ❤️</span><br />
                        <span className="say">I love you more than words can say</span><br />
                        <span className="say">Forever and always yours 💑</span><br />
                    </div>
                </div>

                <div id="surprise-trigger" onClick={handleSurprise}
                    style={{
                        display: 'none', position: 'absolute', bottom: '50px', left: '40%', transform: 'translateX(-30%)', zIndex: 20, cursor: 'pointer',
                        background: 'linear-gradient(45deg, #ff69b4, #ff8da1)', padding: '15px 30px', borderRadius: '50px', color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold', boxShadow: '0 5px 15px rgba(255,105,180,0.4)', animation: 'pulse 2s infinite'
                    }}>
                    🎁 Tap for a Surprise
                </div>

                <canvas id="canvas" ref={canvasRef} width="1100" height="680"></canvas>
            </div>

            {/* Navigation Hub - Outside wrap div */}
            <div id="nav-links" style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 100,
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '800px',
                padding: '15px 20px',
                background: 'rgba(26, 11, 46, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <Link to="/letter" className="nav-btn glass" style={{ fontSize: '0.85em', padding: '8px 15px' }}>
                    💌 Love Letter
                </Link>
                <Link to="/messages" className="nav-btn glass" style={{ fontSize: '0.85em', padding: '8px 15px' }}>
                    💬 Messages
                </Link>
                <Link to="/memory" className="nav-btn glass" style={{ fontSize: '0.85em', padding: '8px 15px' }}>
                    🕰️ Memories
                </Link>
                <Link to="/gallery" className="nav-btn glass" style={{ fontSize: '0.85em', padding: '8px 15px' }}>
                    📸 Gallery
                </Link>
                <Link to="/dates" className="nav-btn glass" style={{ fontSize: '0.85em', padding: '8px 15px' }}>
                    ⏰ Dates
                </Link>
                <Link to="/reasons" className="nav-btn glass" style={{ fontSize: '0.85em', padding: '8px 15px' }}>
                    💖 Why I Love You
                </Link>
                <Link to="/quiz" className="nav-btn glass" style={{ fontSize: '0.85em', padding: '8px 15px' }}>
                    💕 Quiz
                </Link>
            </div>

            {/* Gallery Overlay */}
            {showGallery && (
                <div id="gallery"
                    style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20, textAlign: 'center', display: 'block'
                    }}
                    className="glass">
                    <h2 style={{ fontFamily: 'Dancing Script', fontSize: '40px', color: '#ff69b4' }}>Our Memories 💖</h2>
                    <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
                        <div style={{ width: '150px', height: '150px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>Photo 1</div>
                        <div style={{ width: '150px', height: '150px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>Photo 2</div>
                        <div style={{ width: '150px', height: '150px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>Photo 3</div>
                    </div>
                    <button onClick={() => setShowGallery(false)}
                        style={{ marginTop: '10px', padding: '5px 15px', border: 'none', background: '#ff69b4', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Home;
