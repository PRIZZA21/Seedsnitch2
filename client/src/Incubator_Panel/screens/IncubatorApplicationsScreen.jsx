import React from 'react'
import Infobar from '../../Common_Components/Infobar'
import IncubatorApplications from '../components/IncubatorApplications'

const IncubatorApplicationsScreen = () => {
  return (
    <>
        <div className="w-full bg-white relative">
            <Infobar start_text={'My'} end_text={'Applications'} />

            <section className="h-auto w-5/6 py-10 px-2 relative md:mb-20 md:mt-0 mt-10 mx-auto">
                <div className="h-full md:flex-row right-4">
                    <IncubatorApplications/>
                </div>
            </section>

        </div>
    </>
  )
}

export default IncubatorApplicationsScreen
