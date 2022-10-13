import React, {useState, useEffect} from 'react'
import {InputGroup, Form, Button, Container, Image, FloatingLabel} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import swal from 'sweetalert';
import { addCategoryAction } from '../../../store/entities/category';
import Dark from '../../effect/Dark';
const AddCategory = ({handleForm}) => {
    const [info, setInfo] = useState({
        imageShow: ""
      })
    
      const dispatch = useDispatch()
      const [categoryData, setData] = useState({
        name: '',
        description: "",
        image: ""
      })
    
    
      const {successAddCategory} = useSelector(state => state.category.addCategory)
    
      const getInfo = (event) => {
        setData({
          ...categoryData,
          [event.target.name]: event.target.value
        })
      }
    
      const submitAddCategory = () => {
        dispatch(addCategoryAction(categoryData))
      }
    
      const uploadImage = (event) => {
        setData({
            ...categoryData,
            image: event.target.files[0]
        })

        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = _event => {
            setInfo({
                ...info,
                imageShow: reader.result
            })
        }
      }

      useEffect(() => {
        if (successAddCategory){
          swal({
            content: "Add Category Success",
            icon: "success",
            title: "Add Category Success"
          })
        }
      }, [successAddCategory])
      return (
        <div>
            <div onClick={handleForm}>
                <Dark />
            </div>
            <div className='handle-form add-category-form'>
                <h3 className='text-light'>Create Category</h3>
                <hr />
                <InputGroup className="mb-3">
                    <InputGroup.Text>Category Name</InputGroup.Text>
                    <Form.Control
                    placeholder="Enter category name here ..."
                    name = "name"
                    onChange={getInfo}
                    />
                </InputGroup>
                <FloatingLabel controlId="floatingTextarea2" label="Description">
                    <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    name="description"
                    onChange={getInfo}
                    />
                </FloatingLabel>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control onChange={uploadImage} type="file"  />
                </Form.Group>
                <div className='d-flex flex-column'>
                    <Image className='mb-3' style={{width: "150px", height: "150px"}} src={info.imageShow}/>
                    <Button className='w-25' onClick={submitAddCategory}>Add Category</Button>
                </div>
                
            </div>
        </div>
      )
}

export default AddCategory