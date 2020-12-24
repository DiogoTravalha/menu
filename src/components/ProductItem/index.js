import React from 'react'
import {
  Container,
  ProductButtom,
  ProductButtomArea,
  ProductInfoArea,
  ProductIngredients,
  ProductName,
  ProductPhoto,
  ProductPhotoArea,
  ProductPrice,
} from './styled'

export default ({ data, onClick }) => {
  const handleClick = () => {
    onClick(data)
  }

  return (
    <Container onClick={handleClick}>
      <ProductPhotoArea>
        <ProductPhoto src={data.image} />
      </ProductPhotoArea>
      <ProductInfoArea>
        <ProductName>{data.name}</ProductName>
        <ProductPrice>R$ {(data.price * 1).toFixed(2)}</ProductPrice>
        <ProductIngredients>{data.ingredients}</ProductIngredients>
      </ProductInfoArea>
      <ProductButtomArea>
        <ProductButtom src="/assets/next.png" />
      </ProductButtomArea>
    </Container>
  )
}
