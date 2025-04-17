"use client";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import "./partytime.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState, useRef, useEffect } from "react";

export default function Home() {
    const [isStatic, setIsStatic] = useState(true);
    const videoLeftRef = useRef(null);
    const videoRightRef = useRef(null);

    useEffect(() => {
        const videoLeft = videoLeftRef.current;
        const videoRight = videoRightRef.current;

        if (!videoLeft || !videoRight) return;
        if (!isStatic) {
            // Ensure videos are ready before playing
            const playWhenReady = Promise.all([
                new Promise(resolve => { videoLeft.oncanplaythrough = resolve; if (videoLeft.readyState >= 4) resolve(); }),
                new Promise(resolve => { videoRight.oncanplaythrough = resolve; if (videoRight.readyState >= 4) resolve(); })
            ]);

            playWhenReady.then(() => {
                videoLeft.play();
                videoRight.muted = false; // music playback from just one video
                videoRight.play();
            });

            // Cleanup function
            return () => {
                videoLeft.oncanplaythrough = null;
                videoRight.oncanplaythrough = null;
            };
        } else {
            videoLeft.pause();
            videoRight.pause();
            videoLeft.currentTime = 0;
            videoRight.currentTime = 0;
            videoRight.muted = true; // music playback from just one video
        }
    }, [isStatic]);

    return (
        <main className={`partytime-bg ${isStatic ? 'static' : ''}`}>
            <div className="grid-bg absolute inset-0 opacity-30 z-1"></div>

            <div className={`video-container video-left ${isStatic ? 'hidden' : ''}`}>
                <video
                    ref={videoLeftRef}
                    loop
                    muted // Always muted
                    playsInline
                    preload="auto"
                    loading="eager"
                    disablePictureInPicture
                    disableRemotePlayback
                >
                    <source src="/chika-dance-hard.mp4" type="video/mp4" />
                </video>
            </div>
            <div className={`video-container video-right ${isStatic ? 'hidden' : ''}`}>
                <video
                    ref={videoRightRef}
                    loop
                    muted // Initially muted for silent preload
                    playsInline
                    preload="auto"
                    loading="eager"
                    disablePictureInPicture
                    disableRemotePlayback
                >
                    <source src="/chika-dance-hard.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="partytime-content flex flex-col items-center justify-center gap-8">
                <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="neon-border rounded-full p-1">
                    <img
                        className="rounded-full w-32 h-32 object-cover"
                        src="/chika-dance.gif"
                        alt="Dancing in the moonlight. Gazing at the stars so bright. Holding you until the sunrise. Sleeping until the midnight."
                    />
                </div>

                <section className="flex flex-col items-center text-center">
                    <h1 className="neon-text text-4xl font-bold mb-2">ikki</h1>
                    <p className="partytime-subtitle text-lg font-medium italic">
                    {isStatic
                      ? 'the lion rapes the small dog when it barks'
                      : 'the small dog rapes the lion when it roars'}                       
                    </p>
                </section>

                <ul className="text-xl font-medium flex gap-8 items-center">
                    <li>
                        <Link
                            className="partytime-link"
                            href={"https://github.com/ikkikikikiik"}
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faGithub} size="lg" />
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="partytime-link"
                            href={"https://x.com/ikkikikikiik"}
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faXTwitter} size="lg" />
                        </Link>
                    </li>
                </ul>
                </div>

                <button
                    className={`partytime-button z-10 ${isStatic ? 'static' : ''}`}
                    onClick={() => setIsStatic(!isStatic)}
                >
                    {isStatic ? 'Seizure Alert' : 'MAKE IT STOP'}
                </button>

                <Footer />
            </div>
        </main>
    );
}
