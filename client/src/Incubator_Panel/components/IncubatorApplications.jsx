import React ,{useEffect, useMemo, useState}from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Loader from '../../Common_Components/Loader'
import { Pagination } from 'react-bootstrap'
import axios from 'axios';
import { useSelector } from 'react-redux';

const Paginate = ({pages,page}) => {    
    return pages>1 && (
        <Pagination>
          {
              [...Array(pages).keys()].map(x=>(
                  
                      <Pagination.Item >
                          <Link key={x+1} to={`/incubator/page/${x+1}`}>
                              {x+1} 
                          </Link>
                      </Pagination.Item>
                  
              ))
          }
        </Pagination>
    )
}

const TableData = ({child}) => {
    return(
        <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm">{child}</td>
    )
}

const TableDataText = ({text}) => {
    return (
        <p className="text-center text-gray-900 whitespace-no-wrap">
            {text}
        </p>
    )
}



const IncubatorApplications = () => {

    const table_headers = ['Startup Name','Founder','College','Startup Stage','Linkedin','Status','']
    
    const {pageNumber} = useParams() ||1;
    const [loading,setLoading] =useState('true')
    const [applications,setApplications] = useState([])
    const [page,setPage] = useState(1)
    const [pages,setPages] = useState(1);


    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin  

    const config = useMemo(() => {
        return {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json'
          }
        };
      }, [userInfo.token]);

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/applications/incubator?pageNumber=${pageNumber}`,config)
        .then(res=> {
            setApplications(res.data.applications)
            setPage(res.data.page)
            setPages(res.data.pages)
        })
        setLoading(false)
    }, [pageNumber,config])

    const navigate = useNavigate();

    const inc_detailsHandler = (id) => {
        navigate(`/application/${id}`)
    }
    
 

    if(applications.length===0){ 
        return (
    <div> No applications with you right now</div>)}

    if(loading) return <Loader />

    return (
        <div className="sm:px-8 py-4 overflow-x-auto ">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              
                <table className="min-w-full leading-normal">
        
                <thead>
                    {table_headers.map((theader)=>(
                        <th className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            {theader}
                        </th>
                    ))}
                </thead>


                <tbody>
                    { applications && applications.map((application)=>(
                        <tr key={application._id}>

                            <TableData child={
                                <TableDataText text={application.startup_name} />
                            }/>

                            <TableData child={
                                <>
                                    <TableDataText text={application.name} />
                                    <p className="text-gray-600 whitespace-no-wrap">{application.email}</p>
                                </>
                            }/>

                            <TableData child={
                                <TableDataText text={application.college_name} />
                            } />

                            <TableData child={
                                <TableDataText text={application.startup_stage} />
                            } />

                            <TableData child={
                                <Link as={'p'} to={application.linkedin_profile} target="_blank" className="text-gray-900 whitespace-no-wrap">Visit</Link>
                            } />


                                    {application.curr_status==='Accepted'?
                                        <td className="px-4 mx-auto py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className="text-center relative inline-block px-3 py-1 font-semibold text-green-900 ml-5 -mr-6">
                                            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                                            <span className="relative text-center max-auto">{application.curr_status}</span>
                                        </span>
                                            </td>:

                                        application.curr_status==='Applied'?
                                        <td className="px-4 mx-auto py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="text-center relative inline-block px-3 py-1 font-semibold text-yellow-900 ml-5 -mr-6">
                                                <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full" />
                                                <span className="relative text-center max-auto">{application.curr_status}</span>
                                            </span>
                                        </td>:


                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="text-center  relative inline-block px-3 py-1 font-semibold text-red-900  ml-5 -mr-6">
                                                <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full" />
                                                <span className="relative text-center mx-auto">{application.curr_status}</span>
                                            </span>
                                        </td>
                                    }
        
        
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                <button type="button" className="inline-block text-gray hover:text-gray-700">
                                    <FontAwesomeIcon icon={faPlay} onClick={()=>inc_detailsHandler(application._id)}/>
                                </button>
                            </td>

                        </tr>))
                    }
                </tbody>


                </table>
                
            </div>
            <Paginate pages={pages} page={page}/>
        </div>
    )
}

export default IncubatorApplications