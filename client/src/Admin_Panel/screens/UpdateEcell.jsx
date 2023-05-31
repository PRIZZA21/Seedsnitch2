import React, { useEffect, useState } from 'react'
import Infobar from '../../Common_Components/Infobar'
import Sidebar from '../components/Sidebar'
import Input from '../components/Input'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateEcell = () => {

    const [name,setName] = useState('')
    const [college,setCollege] = useState('')
    const [email,setEmail] = useState('')
    const [uploading,setUploading] = useState(false)
    const [image,setImage] = useState('')
    const {id} = useParams()

    const uploadFileHandler = async(e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
  
        try {
          
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
  
          var { data } = await axios.post('/api/uploads', formData, config)
          
          data = (data.substr(8))
          data = '/' +data;
  
          setImage(data)
          setUploading(false)
  
        } 
        
        catch (error) {
          console.error(error)
          setUploading(false)
        }
  
    }
    
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/admin/ecells/page/1'
    let navigate = useNavigate();
    
    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`/api/ecells/details/${id}`,{name,college,email,image})
        navigate(redirect);
    }

    useEffect(() => {
        axios.get(`/api/ecells/details/${id}`)
        .then(res=> {
            let {name,email,logo,college} =res.data;
            setName(name);
            setCollege(college);
            setEmail(email);
            setImage(logo);
        })
    }, [id])
    


  return (
    <div className='flex flex-row'>

        <Sidebar />

        <div className="w-full bg-white relative">
            <Infobar start_text={'Update'} end_text={'E-cell'} additonalClass={"mt-0 bg-white"}/>
       
            <section className="h-auto py-10 mx-auto relative md:mb-20 md:mt-0 mt-10">
                <div className="h-full w-full mx-auto  gap-4 md:flex-row right-4">
                    <div className="w-full md:w-1/2 h-full rounded-md mx-auto flex flex-row justify-center">
                        <form className="w-full h-full max-w-lg px-4 py-6 mx-auto" id="blog-form" name="blog" onSubmit={submitHandler}>
                            
                            <Input 
                                label="E-cell Logo"
                                type="file"
                                name="image"
                                placeholder={image}
                                onChange={uploadFileHandler}
                            />

                            <Input 
                                label="Ecell Name"
                                type="text"
                                name="name"
                                placeholder={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input 
                                label="College"
                                type="text"
                                name="college"
                                placeholder={college}
                                onChange={(e) => setCollege(e.target.value)}
                            />

                            <Input 
                                label="Email"
                                type="email"
                                name="email"
                                placeholder={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

        
                            <div className="w-5/6 mx-auto">
                                <div className="w-full flex flex-row items-center">
                                    { !uploading ?
                                        (<input className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697] cursor-pointer" type="submit" value="Update Now"/>): (
                                            <div className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697] text-center">Please wait till uploading</div>) }
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </section>


        </div> 
    </div>
  )
}

export default UpdateEcell
