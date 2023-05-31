import React from 'react'
import ApplicationTable from '../components/ApplicationTable'
import Infobar from '../../Common_Components/Infobar'
import Sidebar from '../components/Sidebar'

const ApplicationScreen = () => {
  return (
    <div className='flex flex-row'>

        <Sidebar />

        <div className="w-full relative">
            <Infobar start_text={'Applications'} end_text={'with us'} additonalClass={"mt-0 bg-white"}/>
            <section className="h-auto w-5/6 py-4 px-2 relative md:mt-0 mt-10 mx-auto">
                <div className="h-full md:flex-row right-4">
                    <ApplicationTable />
                </div>
            </section>
        </div>
    </div>
  )
}

export default ApplicationScreen;
