import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mobilePic from '../../../assets/images/mobile.png'
import LandingNavbar from "../LandingNavbar/LandingNavbar.jsx";
import LandingPagePic from "../../../assets/images/LandingPagePic.jpg";
import Page2 from "../Page2/Page2.jsx";
import Page3 from "../Page3/Page3.jsx";
import Page4 from "../Page4/Page4.jsx";
import Page5 from "../Page5/Page5.jsx";
import Page6 from "../Page6/Page6.jsx";
import Page7 from "../Page7/Page7.jsx";
import Page8 from "../Page8/Page8.jsx";
import LandingFooter from "../LandingFooter/LandingFooter.jsx";
import './LandingPage.css';

const LandingPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [navbarColor, setNavbarColor] = useState("transparent");
    const [showNavbar, setShowNavbar] = useState(true);
    const [animationClass, setAnimationClass] = useState("");
    const [lineHeight, setLineHeight] = useState(0);

    const subPhraseRef = useRef(null);
    const verticalLineRef = useRef(null);

    const phrases = [
        "La plus grande journée de recrutement",
        "Rebondir votre carriére !",
        "We invest in you"
    ];

    const totalPhrases = phrases.length;

    // Handle phrase animation cycle
    useEffect(() => {
        const phraseInterval = setInterval(() => {
            setAnimationClass("animate-slide-in");
            setTimeout(() => setAnimationClass(""), 1000); // Remove animation after 1 second
        }, 7000); // Repeat animation every 7 seconds (to allow 3 seconds for pause)

        return () => clearInterval(phraseInterval);
    }, []);

    // Measure the height of the sub-phrase when it mounts
    useEffect(() => {
        if (subPhraseRef.current) {
            setLineHeight(subPhraseRef.current.offsetHeight);
        }
    }, []);

    useEffect(() => {
        if (verticalLineRef.current) {
            verticalLineRef.current.style.height = `${lineHeight}px`;
        }
    }, [lineHeight]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition < 200) {
                setCurrentPage(1);
                setNavbarColor("transparent");
                setShowNavbar(true);
                document.querySelector('.landing-navbar').classList.remove('scrolled');
            } else if (scrollPosition < 1300) {
                setCurrentPage(2);
                setNavbarColor("#002665");
                setShowNavbar(true);
                document.querySelector('.landing-navbar').classList.add('scrolled');
            } else if (scrollPosition < 2300) {
                setCurrentPage(3);
                setShowNavbar(true);
            } else if (scrollPosition < 3300) {
                setCurrentPage(4);
                setShowNavbar(true);
            } else if (scrollPosition < 4300) {
                setCurrentPage(5);
                setShowNavbar(true);
            } else if (scrollPosition < 5300) {
                setCurrentPage(6);
                setShowNavbar(true);
            } else if (scrollPosition < 6300) {
                setCurrentPage(7);
                setShowNavbar(true);
            } else {
                setCurrentPage(8);
                setShowNavbar(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            {showNavbar && <LandingNavbar navbarColor={navbarColor}/>}

            <section className={`landing-content ${currentPage === 1 ? "active" : ""}`}>
                <img src={LandingPagePic} alt="Landing Image" className="landing-image"/>

                {/* Animated Phrases */}
                <div className="animated-phrases">
                    {phrases.map((phrase, index) => (
                        <div
                            key={index}
                            className={`phrase ${animationClass}`}
                            style={{animationDelay: `${index * 2}s`}} // Stagger the phrases with a delay
                        >
                            {phrase}
                        </div>
                    ))}
                </div>

                {/* Fixed Phrases */}
                <div className="fixed-phrases">
                    <div className="vertical-line" ref={verticalLineRef}></div>
                    <div className="phrases-content">
                        <p className="main-phrase">Faites le premier pas vers une carrière qui change votre vie !</p>
                        <p className="sub-phrase" ref={subPhraseRef}>Une journée, mille opportunités.<br/> Saisissez cette chance pour explorer des carrières, rencontrer des <br/> recruteurs et faire de votre avenir un succès !</p>
                    </div>
                </div>

            </section>

            <section>
                <Page2/>
            </section>
            <section>
                <Page3/>
            </section>
            <section>
                <Page4/>
            </section>
            <section>
                <Page5/>
            </section>
            <section>
                <Page6/>
            </section>
            <section>
                <Page7/>
            </section>
            <section>
                <Page8/>
            </section>
            <LandingFooter/>
        </div>
    );
};

export default LandingPage;
