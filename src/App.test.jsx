import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App'
import { AppProvider } from './context/AppContext'

test('renders brand title', () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>
  )
  const brandTitles = screen.getAllByText(/Beyazit Cargo/i)
  expect(brandTitles.length).toBeGreaterThan(0)
})
