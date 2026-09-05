import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import AboutFour from '../Components/About/AboutFour'
import TourGuideTwo from '../Components/Guide/TourGuideTwo'
import GalleryFive from '../Components/Gallery/GalleryFive'
import FooterFour from '../Components/Footer/FooterFour'

function About() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb
                title="About NBTT"
            />
            <AboutFour />
            <TourGuideTwo />
            <GalleryFive />
            <FooterFour />
        </>
    )
}

export default About
