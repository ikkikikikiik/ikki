"use client";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import "./partytime.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faEthereum, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState, useRef, useEffect } from "react";

export default function Home() {
    const [isStatic, setIsStatic] = useState(true);
    const videoLeftRef = useRef(null);
    const videoRightRef = useRef(null);
    const [copied, setCopied] = useState(false); // State for copy feedback

    const ethAddress = "0x8F7E1Da883d7FA1C839C18E8BdfcE499D732ebF2";

    const handleCopy = () => {
        navigator.clipboard.writeText(ethAddress).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // Reset after 1.5 seconds
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // Optionally handle the error, e.g., show an error message
        });
    };

    useEffect(() => {
        const videoLeft = videoLeftRef.current;
        const videoRight = videoRightRef.current;

        if (!videoLeft || !videoRight) return;

        const waitForReady = (video) => new Promise((resolve) => {
            if (video.readyState >= 3) {
                resolve();
                return;
            }
            const handleCanPlay = () => resolve();
            video.addEventListener("canplay", handleCanPlay, { once: true });
        });

        if (!isStatic) {
            Promise.all([waitForReady(videoLeft), waitForReady(videoRight)])
                .then(() => {
                    const leftPlay = videoLeft.play();
                    videoRight.muted = false; // music playback from just one video
                    const rightPlay = videoRight.play();
                    return Promise.all([leftPlay, rightPlay]);
                })
                .catch(() => {
                    // Autoplay can fail; user can retry by toggling.
                });
        } else {
            videoLeft.pause();
            videoRight.pause();
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

                    <li>
                        <button
                            className="partytime-link"
                            onClick={handleCopy}
                        >
                            <FontAwesomeIcon icon={faEthereum} size="lg" />
                        </button>
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
            {copied && (
                <div className="copy-toast">
                    ETH address copied!
                </div>
            )}
        </main>
    );
}
