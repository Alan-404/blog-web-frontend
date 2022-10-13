import React, {useEffect, useState} from 'react'
/* import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; */
import { Container, InputGroup, Form, FloatingLabel, Button, Image } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { getAllCategoriesAction } from '../../../store/entities/category';
import swal from 'sweetalert';
import { createBlogAction } from '../../../store/entities/blog';
import MyCkeditor from './Editor';

const AddPost = () => {
    const dispatch = useDispatch()

    const [blogData, setData] = useState({
        categoryId: [],
        title: "",
        content: "",
        intro: "",
        thumnail: ""
    })

    const [info, setInfo] = useState({
        imageShow: ""
    })


    const {categories} = useSelector(state => state.category.getAllCategories)
    const {successCreateBlog} = useSelector(state => state.blog.createBlog)

    const getInfo = (event) => {
        setData({
            ...blogData,
            [event.target.name]: event.target.value
        })
    }

    const getCategory = (event) => {
        var temp = blogData.categoryId
        temp.push(event.target.value)

        setData({
            ...blogData,
            categoryId: temp
        })
    }

    const uploadImage = (event) => {
        const file = event.target.files[0]

        setData({
            ...blogData,
            thumnail: file
        })

        var reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = _event => {
            setInfo({
                ...info,
                imageShow: reader.result
            })
        }
    }

    const submitCreateBlog = () => {
        console.log(blogData)
        dispatch(createBlogAction(blogData))
    }


    
    const API_URl = "https://noteyard-backend.herokuapp.com"
    const UPLOAD_ENDPOINT = "api/blogs/uploadImg";
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("uploadImg", file);
                        fetch(`${API_URl}/${UPLOAD_ENDPOINT}`, {
                            method: "post",
                            body: body
                        })
                            .then((res => res.json()))
                            .then((res) => {
                                resolve({ default: `${API_URl}/${res.url}` })
                            })
                            .catch((err) => {
                                reject(err);
                            })
                    })
                })
            }
        }
    }

    const uploadPlugin = (editor) => {
        console.log("YOLO")
        editor.plugins.get("FileRepository").createUploadAdaper = (loader) => {
            return uploadAdapter(loader);
        }
    }

    const config = {
        extraPlugins: [uploadPlugin],
    };

    useEffect(() => {
        if (successCreateBlog){
            swal({
                content: "Create Blog Success",
                icon: "success",
                title: "Create Blog Success"
            })
        }
    }, [successCreateBlog])

    useEffect(()=> {
        dispatch(getAllCategoriesAction())
    }, [])
    return (
        <Container>
            <h2>Add Post</h2>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                <Form.Control
                    placeholder="Enter title of Blog..."
                    name="title"
                    onChange={getInfo}
                />
            </InputGroup>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Avatar</Form.Label>
                <Form.Control onChange={uploadImage} type="file"  />
                </Form.Group>
            <Image className='mb-3' style={{width: "150px", height: "150px"}} src={info.imageShow}/>
            <FloatingLabel className='mb-3' label="Introduction of Blog">
                <Form.Control
                    name="intro"
                    as="textarea"
                    style={{ height: '100px' }}
                    onChange={getInfo}
                />
            </FloatingLabel>
            <div className="mb-3">
                <select onChange={getCategory} name='categoryId' className="form-select mb-3">
                    <option defaultValue>Open this select category</option>
                    {categories && categories.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            {/* <CKEditor
                config={config}
                editor={ ClassicEditor }
                data=""
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                }}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setData({
                        ...blogData,
                        content: data
                    })
                }}
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                }}
                onFocus={( event, editor ) => {
                    console.log(event)
                    console.log( 'Focus.', editor );
                }}      
            /> */}
            <MyCkeditor />
            <Button onClick={submitCreateBlog} className='mt-3'>Submit</Button>
        </Container>
    )
}

export default AddPost