import React, { useState } from 'react'
import "./SelectTone.scss"
import { useParams } from 'react-router-dom'
import icon from "../assets/image.png"


const SelectTone = ({ setTopics, topics }) => {
    const params = useParams()
    const i = topics.findIndex((topic) => {
        return topic.id === params.id
    })
    const [data, setData] = useState(topics[i])
    const handleOnChange = (e) => {
        setData((pre) => {
            return {
                ...pre,
                tone: e.target.value
            }
        })
    }
    const handleContent = (e) => {
        setData((pre) => {
            return {
                ...pre,
                content: e.target.value
            }
        })
    }
    const handleFile = (e) => {
        const file = e.target.files[0]
        const b = new FileReader()
        b.readAsDataURL(file)
        b.onload = () => {

            setData((pre) => {
                return {
                    ...pre,
                    img: b.result
                }
            })
        }
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        topics.splice(i, 1, data)
        let arr = [...topics]
        setTopics(arr)
    }
    return (


        <div className='SelectTone'>
            <div className='container'>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    {/* <textarea type="text" value={data.content} placeholder={`write your ${data.tone}`} onChange={(e) => handleContent(e)} /> */}
                    <h3 className='topicTitle'>Topic : {data.title}</h3>
                    <p>Tone : </p>
                    <select name="tone" id="tone" value={data.tone} onChange={(e) => handleOnChange(e)}>
                        {/* <option value="" disabled selected hidden>Choose</option> */}
                        <option value="Professional">Professional</option>
                        <option value="Friendly">Friendly</option>
                        <option value="Funny">Funny</option>
                        <option value="Insightful">Insightful</option>
                        <option value="Informational">Informational</option>
                        <option value="Inspirational">Inspirational</option>
                    </select>
                    <label htmlFor="img" className='img'> <h5>Add Image</h5><img src={icon}></img></label>

                    <input type="file" accept='image/*' id='img' onChange={(e) => handleFile(e)} />
                    <button className='button'>Generate Blog</button>
                </form>
            </div>

            {
                data.img ? <img src={data.img} className='outside-img'></img> : null
            }
        </div>

    )
}

export default SelectTone