import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import GetInTouch from '../Components/Contact/GetInTouch'
import ContactMap from '../Components/Contact/ContactMap'
import FooterFour from '../Components/Footer/FooterFour'

function Contact() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb
                title='Contact Us'
            />
            <GetInTouch />
            <ContactMap />
            <FooterFour />
        </>
    )
}

export default Contact
