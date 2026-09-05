import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import TourDetailsMain from '../Components/Tour/TourDetailsMain'
import FooterFour from '../Components/Footer/FooterFour'

function TourDetails() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb
                title="Tour Details"
            />
            <TourDetailsMain />
            <FooterFour />
        </>
    )
}

export default TourDetails
