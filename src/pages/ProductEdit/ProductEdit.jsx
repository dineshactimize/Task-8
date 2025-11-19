import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductForm from '../ProductForm/ProductForm'
import Loader from '../../components/Loader/Loader'
import { getProductDataActionInitiate } from '../../redux/actions/getProductAction'
import { useDispatch, useSelector } from 'react-redux'
// import { getProductById, updateProduct } from '../../api/products.api'

const ProductEdit = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  // const [loading, setLoading] = useState(true)

const dispatch = useDispatch()
  const getproductdata = useSelector((state) => state.getproductdata.data)
  const loading = useSelector((state) => state.getproductdata.loading)

  useEffect(() => {
    dispatch(getProductDataActionInitiate())
  }, [dispatch])
  useEffect(() => {
    if (!getproductdata) return
    if (Array.isArray(getproductdata)) {
      const found = getproductdata.find((p) => String(p.id) === String(id))
      setProduct(found || null)
    } else if (typeof getproductdata === 'object' && getproductdata !== null) {
      setProduct(String(getproductdata.id) === String(id) ? getproductdata : null)
    } else {
      setProduct(null)
    }
  }, [getproductdata, id])

  if (loading) return <Loader />
  if (!product) return <div>Product not found</div>

  return <ProductForm initialValues={product}  isEdit={true} />
}

export default ProductEdit

