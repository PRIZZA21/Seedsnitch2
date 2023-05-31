import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile,faHome,faBuildingColumns,faSchool,faBlog } from '@fortawesome/free-solid-svg-icons'


const Sidebar = () => {

    let sidebar_items = [
        {icon: faFile, name:'Applications',link:'/admin/applications/page/1'},
        {icon: faBuildingColumns, name:'Incubators',link:'/admin/incubators/page/1'},
        {icon: faSchool, name:'E-cells',link:'/admin/ecells/page/1'},
        {icon: faBlog, name:'Blogs',link:'/admin/blogs/page/1'},
        {icon: faHome, name:'Home',link:'/'}
    ]

    return (
        <div className='sidebar bg-white pt-4 min-h-screen w-1/6 bg-[#f8f8f8] relative rounded-tr-3xl rounded-br-3xl drop-shadow-2xl z-50 border-t '>
            <Link to='/' className='flex flex-row'>
                <img src='https://i.ibb.co/mBv3jLQ/favicon-ico.png' className='max-w-max h-10 px-5' alt=''/>
                <h1 className="hidden lg:inline-block font-title pt-2 text-3xl text-black font-normal"> SEEDSNITCH </h1>
            </Link>    

            <section id="sidebar" className="gap-x-8 mt-5 md:flex-row px-4 md:px-0 md:gap-x-16 bg-white-700 w-full border-t">
                {sidebar_items.map((item)=>(
                    <NavLink to={item.link} key={item.name} className=" rounded-full my-4 flex flex-row items-center w-4/5 mx-auto h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span className="inline-flex items-center justify-center w-12 text-lg text-gray-400"><FontAwesomeIcon icon={item.icon}/></span>
                        <span className="text-lg font-medium pl-1">{item.name}</span>
                    </NavLink>
                ))}
            </section>
        </div>
    )
}

export default Sidebar;