import React, {useState, useEffect} from 'react'
import {InputGroup, Form, Button, Container, Image, Pagination} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import swal from 'sweetalert';
import { calNumPage, generateCategoryImage, num2Vec } from '../../common/lib';
import { numCategoriesShow } from '../../common/consts';
import { addCategoryAction, getCategoriesAction, getSizeCategoriesAction } from '../../store/entities/category';
import AddCategory from './handle/AddCategory';
const Category = ({}) => {

  const [info, setInfo] = useState({
    showAddForm: false,
    pageShow: 1
  })

  const dispatch = useDispatch()
  const {categories} = useSelector(state => state.category.getCategories)
  const {number} = useSelector(state => state.category.getSizeCategories)

  const handleAddForm = () => {
    setInfo({
      ...info,
      showAddForm: !info.showAddForm
    })
  }

  const changePage = (event) => {
    setInfo({
      ...info,
      pageShow: parseInt(event.target.text)
    })
    dispatch(getCategoriesAction({number: numCategoriesShow, page: parseInt(event.target.text)}))
  } 


  useEffect(() => {
    dispatch(getCategoriesAction({number: numCategoriesShow, page: info.pageShow}))
    dispatch(getSizeCategoriesAction())
  }, [])

  return (
    <Container>
      <Button onClick={handleAddForm}>More...</Button>
      <hr />
      <div className=''>
        {categories && categories.map((item, index) => (
          <div style={{cursor:'pointer'}} className='admin-category p-2 mb-3 px-3 d-flex' key={item.id}>
            <Image style={{width: "150px", height: "150px", borderRadius: "20px"}} src={generateCategoryImage(item.id)}/>
            <div className='mx-4'>
              <h2>{item.name}</h2>
              <hr />
              <p>{item.description}</p>
            </div>
          </div>
        ))}
        {number && <Pagination className='justify-content-center'>{num2Vec(calNumPage(numCategoriesShow, number)).map(item => (
          <Pagination.Item onClick={changePage} active={item == info.pageShow} key={item}>{item}</Pagination.Item>
        ))}</Pagination>}
      </div>
      {info.showAddForm && <AddCategory handleForm={handleAddForm} />}
    </Container>
  )
}

export default Category