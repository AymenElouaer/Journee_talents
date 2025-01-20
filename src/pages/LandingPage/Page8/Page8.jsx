import React, { useState, useEffect } from "react";
import "./Page8.css";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Importing all images
import img1a from "../../../assets/images/img1a.jpg";
import img1b from "../../../assets/images/img1b.jpg";
import img1c from "../../../assets/images/img1c.jpg";
import img1d from "../../../assets/images/img1d.jpg";

import img2a from "../../../assets/images/img2a.jpg";
import img2b from "../../../assets/images/img2b.jpg";
import img2c from "../../../assets/images/img2c.jpg";
import img2d from "../../../assets/images/img2d.jpg";

import img3a from "../../../assets/images/img3a.jpg";
import img3b from "../../../assets/images/img3b.jpg";
import img3c from "../../../assets/images/img3c.jpg";
import img3d from "../../../assets/images/img3d.jpg";

import img4a from "../../../assets/images/img4a.jpg";
import img4b from "../../../assets/images/img4b.jpg";
import img4c from "../../../assets/images/img4c.jpg";
import img4d from "../../../assets/images/img4d.jpg";


import img6a from "../../../assets/images/img6a.jpg";
import img6b from "../../../assets/images/img6b.jpg";
import img6c from "../../../assets/images/img6c.jpg";
import img6d from "../../../assets/images/img6d.jpg";

import img7a from "../../../assets/images/img7a.jpg";
import img7b from "../../../assets/images/img7b.jpg";
import img7c from "../../../assets/images/img7c.jpg";
import img7d from "../../../assets/images/img7d.jpg";

import img8a from "../../../assets/images/img8a.jpg";
import img8b from "../../../assets/images/img8b.jpg";
import img8c from "../../../assets/images/img8c.jpg";
import img8d from "../../../assets/images/img8d.jpg";

import img9a from "../../../assets/images/img9a.jpg";
import img9b from "../../../assets/images/img9b.jpg";
import img9c from "../../../assets/images/img9c.jpg";
import img9d from "../../../assets/images/img9d.jpg";

// import img10a from "../../../assets/images/img10a.jpg";
// import img10b from "../../../assets/images/img10b.jpg";
// import img10c from "../../../assets/images/img10c.jpg";
// import img10d from "../../../assets/images/img10d.jpg";

import img11a from "../../../assets/images/img11a.jpg";
import img11b from "../../../assets/images/img11b.jpg";
import img11c from "../../../assets/images/img11c.jpg";
import img11d from "../../../assets/images/img11d.jpg";

import img12a from "../../../assets/images/img12a.jpg";
import img12b from "../../../assets/images/img12b.jpg";
import img12c from "../../../assets/images/img12c.jpg";
import img12d from "../../../assets/images/img12d.jpg";

import img13a from "../../../assets/images/img13a.jpg";
import img13b from "../../../assets/images/img13b.jpg";
import img13c from "../../../assets/images/img13c.jpg";
import img13d from "../../../assets/images/img13d.jpg";

import img14a from "../../../assets/images/img14a.jpg";
import img14b from "../../../assets/images/img14b.jpg";
import img14c from "../../../assets/images/img14c.jpg";
import img14d from "../../../assets/images/img14d.jpg";

import img15a from "../../../assets/images/img15a.jpg";
import img15b from "../../../assets/images/img15b.jpg";
import img15c from "../../../assets/images/img15c.jpg";
import img15d from "../../../assets/images/img15d.jpg";

// Organizing images into sets
const imageSets = [
    [img1a, img1b, img1c, img1d],
    [img2a, img2b, img2c, img2d],
    [img3a, img3b, img3c, img3d],
    [img4a, img4b, img4c, img4d],
    [img6a, img6b, img6c, img6d],
    [img7a, img7b, img7c, img7d],
    [img8a, img8b, img8c, img8d],
    [img9a, img9b, img9c, img9d],
    // [img10a, img10b, img10c, img10d],
    [img11a, img11b, img11c, img11d],
    [img12a, img12b, img12c, img12d],
    [img13a, img13b, img13c, img13d],
    [img14a, img14b, img14c, img14d],
    [img15a, img15b, img15c, img15d],
];


const titles = [
    "Journées France",
    "Journées Canada",
    "Journées Qatar",
    "Bourse d'Études Nationale",
    "Bourse d'Études Internationale",
    "Bourse de Stage Nationale",
    "Bourse de Stage Internationale",
    "Journées Talents",
];

const descriptions = [
    "Combinez études et expérience professionnelle grâce à nos stages, et ouvrez les portes d'un avenir prometteur dans votre domaine !",
    "Faites le choix d’une éducation internationale et ouvrez-vous à un monde d'opportunités professionnelles et personnelles.",
    "Donnez une dimension internationale à votre carrière – explorez des opportunités de travail à l'étranger et élargissez vos horizons professionnels.",
    "Transformez votre avenir académique avec des programmes d’études nationaux qui vous ouvrent les portes du marché de l’emploi local.",
    "Étudier à l'international, c’est plus qu’un diplôme – c’est une aventure qui enrichit votre savoir-faire et votre réseau.",
    "Donnez un nouveau tournant à votre carrière en découvrant des opportunités professionnelles passionnantes à l'échelle nationale.",
    "Un stage à l’étranger est l’opportunité idéale pour développer des compétences globales et renforcer votre CV.",
    "L'événement de recrutement international le plus important de l'année.",
];


const Page8 = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const [textStartIndex, setTextStartIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState("");

    const totalImageSlides = imageSets.length;

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % totalImageSlides);
        }, 3000);

        return () => clearInterval(imageInterval);
    }, []);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setTextStartIndex((prevIndex) => (prevIndex + 4) % titles.length);
            setAnimationClass("animate-slide-in");
            setTimeout(() => setAnimationClass(""), 2000);
        }, 5000);

        return () => clearInterval(textInterval);
    }, [titles.length]);

    const handleNextText = () => {
        setTextStartIndex((prevIndex) => (prevIndex + 4) % titles.length);
        setAnimationClass("animate-slide-in");
        setTimeout(() => setAnimationClass(""), 1000);
    };

    const handlePrevText = () => {
        setTextStartIndex((prevIndex) => (prevIndex - 4 + titles.length) % titles.length);
        setAnimationClass("animate-slide-in");
        setTimeout(() => setAnimationClass(""), 1000);
    };

    const currentTitles = [];
    const currentDescriptions = [];
    for (let i = 0; i < 4; i++) {
        const index = (textStartIndex + i) % titles.length;
        currentTitles.push(titles[index]);
        currentDescriptions.push(descriptions[index]);
    }

    return (
        <div className="agenda-container">
            <h1 className="agenda-title">Actualités</h1>
            <button className="nav-arrow left-arrow" onClick={handlePrevText}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <div className="agenda-slider">
                {currentTitles.map((title, index) => (
                    <div
                        key={textStartIndex + index}
                        className={`agenda-section ${animationClass}`}
                        style={{
                            backgroundImage: `url(${imageSets[imageIndex % imageSets.length][index % 4]})`,
                        }}
                    >
                        <div className="agenda-overlay">
                            <h2 className="agenda-title-text">{title}</h2>
                            <p className="agenda-description">{currentDescriptions[index]}</p>
                            <a href="/login" className="agenda-link">
                                Découvrir &rarr;
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <button className="nav-arrow right-arrow" onClick={handleNextText}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </button>
        </div>
    );
};

export default Page8;
