import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import DestinationInner from '../Components/Destination/DestinationInner'
import FooterFour from '../Components/Footer/FooterFour'

function Destination() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb
                title="Destination"
            />
            <DestinationInner />
            <FooterFour />
        </>
    )
}

export default Destination
