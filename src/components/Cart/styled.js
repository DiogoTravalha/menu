import styled from 'styled-components'

export const CartArea = styled.div`
  background-color: #136713;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: fixed;
  bottom: 0;
  align-items: center;
`
export const CartHeader = styled.div`
  height: 50px;
  display: flex;
  width: 250px;
  align-items: center;
  cursor: pointer;
`

export const CartIcon = styled.img`
  height: auto;
  width: 23px;
  margin-left: 10px;
  margin-right: 10px;
`
export const CartText = styled.text`
  color: #fff;
  font-size: 17px;
  flex: 1;
`

export const CardBody = styled.div`
  display: ${(props) => (props.opened ? 'block' : 'none')};
  color: #fff;
`
export const ProductsArea = styled.div`
  height: auto;
`

export const ProductItem = styled.div`
  display: flex;
  margin: 10px;
`
export const ProductPhoto = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 10px;
`
export const ProductInfoArea = styled.div`
  flex: 1;
  margin-left: 10px;
`
export const ProductName = styled.div`
  font-weight: bold;
  font-size: 15px;
`
export const ProductPrice = styled.div`
  font-size: 13px;
`
export const ProductQuantityArea = styled.div`
  display: flex;
  align-items: center;
`

export const ProductQtIcon = styled.img`
  width: 13px;
  height: auto;
  cursor: pointer;
`

export const ProductQtText = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin: 0px 5px;
`
export const ProductAddress = styled.div`
  margin-left: 10px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ProductAddressTitle = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
`
export const ProductAddressDescription = styled.div``
export const ProductAddressComplement = styled.div`
  width: 170;
`
export const ProductAddressPublicPlace = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const ProductAddressStateCity = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const ProductAddressIcon = styled.img`
  width: 20px;
  cursor: pointer;
  margin-left: 50px;
  margin-right: 10px;
`
export const ProductAreaAddress = styled.div`
  width: 207px;
  word-wrap: break-word;
  margin-bottom: 20px;
`
export const ProductAreaCoupon = styled.div`
  margin-left: 10px;
  margin-bottom: 20px;
`
export const ProductTitleCoupon = styled.div`
  font-weight: bold;
`
export const ProductInput = styled.input`
  width: 150px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  height: 20px;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  margin-left: 10px;
`

export const ProductInputCoupon = styled.input`
  margin-top: 10px;
  border-radius: 10px;
  width: 267px;
  height: 20px;
`
export const ProductValuesArea = styled.div`
  margin-left: 10px;
`
export const ProductAreaDiscount = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
  margin-right: 5px;
`
export const Discount = styled.div`
  width: 215px;
`
export const ValuesDiscount = styled.div``
export const ProductButtomBuy = styled.button`
  border: 0;
  background-color: #073c07;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 50px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 40px;
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
`
