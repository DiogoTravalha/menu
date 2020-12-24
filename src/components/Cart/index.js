import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CartArea,
  CartHeader,
  CartIcon,
  CartText,
  CardBody,
  ProductsArea,
  ProductItem,
  ProductPhoto,
  ProductInfoArea,
  ProductName,
  ProductPrice,
  ProductQuantityArea,
  ProductQtText,
  ProductQtIcon,
  ProductAddress,
  ProductAddressTitle,
  ProductAddressComplement,
  ProductAddressPublicPlace,
  ProductAddressStateCity,
  ProductAddressIcon,
  ProductAreaAddress,
  ProductAreaCoupon,
  ProductTitleCoupon,
  ProductInputCoupon,
  ProductValuesArea,
  ProductAreaDiscount,
  Discount,
  ValuesDiscount,
  ProductButtomBuy,
  ProductInput,
} from './styled'

export default function Cart() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart.products)
  const [opened, setOpened] = useState(true)
  const [show, setShow] = useState(false)
  const [valorTotal, setValorTotal] = useState()
  const [entrega, setEntrega] = useState()
  const [descount, setDescount] = useState()
  const [cidade, setCidade] = useState()
  const [rua, setRua] = useState()
  const address = useSelector((state) => state.user.address)
  const city = useSelector((state) => state.user.city)

  const handleCartClick = () => {
    if (products.length > 0) {
      setOpened(!opened)
    }
  }

  const handleProductChange = (key, type) => {
    dispatch({
      type: 'CHANGE_PRODUCT',
      payload: {
        key,
        type,
      },
    })
    Total()
  }

  const handleShowOpen = () => {
    setShow(true)
  }

  const handleAddressChange = () => {
    setShow(false)
    dispatch({
      type: 'ADD_ADDRESS',
      payload: {
        address: rua == '' ? address : rua,
        city: cidade == '' ? city : cidade,
      },
    })
    Total()
  }

  useEffect(() => {
    if (products.length == 0) {
      setOpened(false)
    }
    Total()
  }, [products.length, valorTotal])

  const Total = () => {
    const Porcentagem = 10
    const entrega = 5
    var numero = products.reduce(getTotal, 0)
    function getTotal(numero, item) {
      return numero + item.price * item.qt
    }
    const n = numero + entrega
    const total = n - (n / 100) * Porcentagem
    const desconto = n - total

    const totalString = `${total.toFixed(3)}`
    const descountString = `${desconto.toFixed(3)}`

    const totalNumber = totalString.substring(5, 0)
    const descountNumber = descountString.substring(4, 0)

    setValorTotal(totalNumber)
    setDescount(descountNumber)
    setEntrega(entrega.toFixed(2))
  }

  const FinalizarPedido = () => {
    const produtos = products.map((item, index) => {
      return `Item n° ${index + 1}  ${item.name} - R$ ${
        item.price
      } - Quantidade: ${item.qt}\n\n`
    })
    let mensagem =
      'MenuDigital \n\n---MeuPedido--- \n\n' +
      produtos +
      '------------- \n\n---Entrega--- \n\n' +
      address +
      ' ' +
      city +
      '\n \n------------- \n\n---Valor Total--- \n\n' +
      'R$ ' +
      valorTotal

    mensagem = window.encodeURIComponent(mensagem.replaceAll(',', ''))

    window.open(
      `https://api.whatsapp.com/send?phone=+5547984832451&text=${mensagem}`
    )
  }

  return (
    <CartArea>
      <CartHeader onClick={handleCartClick}>
        <CartIcon src="/assets/cart.png" />
        <CartText>Meu Carrinho ({products.length})</CartText>
        {opened && <CartIcon src="/assets/down.png" />}
      </CartHeader>
      <CardBody opened={opened}>
        <ProductsArea>
          {products.map((item, index) => (
            <ProductItem key={index}>
              <ProductPhoto src={item.image} />
              <ProductInfoArea>
                <ProductName>{item.name}</ProductName>
                <ProductPrice>
                  R$ {(item.price * item.qt).toFixed(2)}
                </ProductPrice>
              </ProductInfoArea>
              <ProductQuantityArea>
                <ProductQtIcon
                  src="/assets/minus.png"
                  onClick={() => handleProductChange(index, '-')}
                />
                <ProductQtText>{item.qt}</ProductQtText>
                <ProductQtIcon
                  src="/assets/plus.png"
                  onClick={() => handleProductChange(index, '+')}
                />
              </ProductQuantityArea>
            </ProductItem>
          ))}
        </ProductsArea>
        <ProductAddressTitle>Entrega</ProductAddressTitle>
        {show == false ? (
          <ProductAddress>
            <ProductAreaAddress>
              <ProductAddressComplement>Minha Casa</ProductAddressComplement>
              <ProductAddressPublicPlace>
                Rua: {address}
              </ProductAddressPublicPlace>
              <ProductAddressStateCity>Cidade: {city}</ProductAddressStateCity>
            </ProductAreaAddress>
            <ProductAddressIcon
              src="/assets/edit.png"
              onClick={handleShowOpen}
            />
          </ProductAddress>
        ) : (
          <ProductAddress>
            <ProductAreaAddress>
              <ProductAddressComplement>Minha Casa</ProductAddressComplement>
              <ProductAddressPublicPlace>
                Rua:
                <ProductInput
                  show={show}
                  onChange={(e) => setRua(e.target.value)}
                  value={rua}
                />
              </ProductAddressPublicPlace>

              <ProductAddressStateCity>
                Cidade:
                <ProductInput
                  show={show}
                  onChange={(e) => setCidade(e.target.value)}
                  value={cidade}
                />
              </ProductAddressStateCity>
            </ProductAreaAddress>
            <ProductAddressIcon
              src="/assets/save.png"
              onClick={handleAddressChange}
            />
          </ProductAddress>
        )}

        <ProductAreaCoupon>
          <ProductTitleCoupon>Cupom de Desconto</ProductTitleCoupon>
          <ProductInputCoupon />
        </ProductAreaCoupon>
        <ProductValuesArea>
          <ProductAreaDiscount>
            <Discount>Desconto</Discount>
            <ValuesDiscount>R$ {descount}</ValuesDiscount>
          </ProductAreaDiscount>
          <ProductAreaDiscount>
            <Discount>Taxa de Entrega</Discount>
            <ValuesDiscount>R$ {entrega}</ValuesDiscount>
          </ProductAreaDiscount>
          <ProductAreaDiscount>
            <Discount>Total</Discount>
            <ValuesDiscount>R$ {valorTotal}</ValuesDiscount>
          </ProductAreaDiscount>
        </ProductValuesArea>
        <ProductButtomBuy onClick={FinalizarPedido}>
          FINALIZAR COMPRA
        </ProductButtomBuy>
      </CardBody>
    </CartArea>
  )
}
