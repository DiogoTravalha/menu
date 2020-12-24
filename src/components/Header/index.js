import React, { useState } from 'react'
import { Container, Logo, SearchInput } from './styled'

export default function Header({ search, onSearch }) {
  const [inputActive, setInputActive] = useState(false)

  const handleInputFocus = () => {
    setInputActive(true)
  }

  const handleInputBlur = () => {
    setInputActive(false)
  }

  const handleChange = (e) => {
    onSearch(e.target.value)
  }
  return (
    <Container>
      <Logo src="/assets/logo.png" />
      <SearchInput
        value={search}
        onChange={handleChange}
        type="text"
        placeholder="Digite um produto ..."
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        active={inputActive}
      />
    </Container>
  )
}
