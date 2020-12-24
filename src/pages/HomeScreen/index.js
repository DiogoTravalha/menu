import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  CategoryArea,
  CategoryList,
  ProductArea,
  ProductList,
  ProductPaginationArea,
  ProductPaginationItem,
} from './styled'
import firebase from '../../components/firebase'
import ReactToolTip from 'react-tooltip'

import Header from '../../components/Header'
import CategoryItem from '../../components/CategoryItem'
import ProductItem from '../../components/ProductItem'
import Modal from '../../components/Modal'
import ModalProduct from '../../components/ModalProduct'

let searchTimer = null

export default function HomeScreen() {
  const history = useHistory()
  const [headerSearch, setHeaderSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalData, setModalData] = useState({})

  const [activeCategory, setActiveCategory] = useState(0)
  const [activePage, setActivePage] = useState(0)
  const [activeSearch, setActiveSearch] = useState('')

  const [productsFilter, setProductsFilter] = useState([])

  useEffect(() => {
    if (!headerSearch) {
      setProductsFilter(products)
    } else {
      clearTimeout(searchTimer)
      searchTimer = setTimeout(() => {
        const novoArray = products.filter((item) =>
          item.name.toUpperCase().includes(headerSearch.toUpperCase())
        )
        setProductsFilter(novoArray)
      }, 2000)
    }
  }, [headerSearch])

  useEffect(() => {
    const firestoreRef = firebase
      .firestore()
      .collection('Items')
      .orderBy('name', 'asc')

    const unsub = firestoreRef.onSnapshot(getCollection)

    return () => {
      unsub()
    }
  }, [])

  useEffect(() => {
    setProducts([])
    getProducts()
  }, [activeCategory, activePage, activeSearch])

  function getCollection(querySnapshot) {
    const array = []
    querySnapshot.forEach((res) => {
      const { name, image } = res.data()
      array.push({
        id: res.id,
        name,
        image,
      })
      const novo = array.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
      }))
      setCategories(novo)
      setTotalPages(1)
      setActivePage(1)
    })
    ReactToolTip.rebuild()
  }

  async function getProducts() {
    if (activeCategory != 0) {
      firebase
        .firestore()
        .collection('Items')
        .doc(activeCategory)
        .collection('Produtos')
        .get()
        .then(function (querySnapshot) {
          const array = []
          querySnapshot.forEach(function (doc) {
            const { name, image, price, ingredients } = doc.data()
            array.push({
              id: doc.id,
              name,
              image,
              price,
              ingredients,
            })
            const novo = array.map((item) => ({
              id: item.id,
              name: item.name,
              image: item.image,
              price: item.price,
              ingredients: item.ingredients,
            }))
            setProducts(novo)
            setProductsFilter(novo)
          })
        })
    } else {
      firebase
        .firestore()
        .collection('Items')
        .get()
        .then(function (querySnapshot) {
          const array = []
          querySnapshot.forEach(function (doc) {
            firebase
              .firestore()
              .collection('Items')
              .doc(doc.id)
              .collection('Produtos')
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  const { name, image, price, ingredients } = doc.data()
                  array.push({
                    id: doc.id,
                    name,
                    image,
                    price,
                    ingredients,
                  })
                  const novo = array.map((item) => ({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    ingredients: item.ingredients,
                  }))
                  setProducts(novo)
                  setProductsFilter(novo)
                })
              })
          })
        })
    }
  }

  const handleProductClick = (data) => {
    setModalData(data)
    setModalStatus(true)
  }

  return (
    <Container>
      <Header search={headerSearch} onSearch={setHeaderSearch} />
      {categories.length > 0 && (
        <CategoryArea>
          Selecione uma categoria
          <CategoryList>
            <CategoryItem
              data={{
                id: 0,
                name: 'Todas as Categorias',
                image: '/assets/food-and-restaurant.png',
              }}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            {categories.map((item, index) => (
              <CategoryItem
                key={index}
                data={item}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            ))}
          </CategoryList>
        </CategoryArea>
      )}
      {products.length > 0 && (
        <ProductArea>
          <ProductList>
            {productsFilter.map((item, index) => (
              <ProductItem
                key={index}
                data={item}
                onClick={handleProductClick}
              />
            ))}
          </ProductList>
        </ProductArea>
      )}

      {/* {totalPages > 0 && (
        <ProductPaginationArea>
          {Array(totalPages)
            .fill(0)
            .map((item, index) => (
              <ProductPaginationItem
                key={index}
                active={activePage}
                current={index + 1}
                onClick={() => setActivePage(index + 1)}
              >
                {index + 1}
              </ProductPaginationItem>
            ))}
        </ProductPaginationArea>
      )} */}
      <Modal status={modalStatus} setStatus={setModalStatus}>
        <ModalProduct data={modalData} setStatus={setModalStatus} />
      </Modal>
    </Container>
  )
}
