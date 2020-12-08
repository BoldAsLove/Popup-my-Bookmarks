import { render, screen } from '@testing-library/react'

import { NavigationProvider } from '../navigationContext'
import NavBar from '.'

describe('NavBar', () => {
  it('should render four items', () => {
    render(
      <NavigationProvider>
        <NavBar />
      </NavigationProvider>,
    )

    expect(screen.getByRole('button', { name: 'General' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'UI' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Control' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Contributors' })).toBeVisible()
  })
})
