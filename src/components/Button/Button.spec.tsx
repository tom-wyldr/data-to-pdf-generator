import { render } from '@testing-library/react'
import { Button } from 'index.ts'

test('button should renders', () => {
  const { getByText } = render(<Button>ButtonContent</Button>)

  expect(getByText('ButtonContent')).toBeTruthy()
  expect(getByText('ButtonContent')).toHaveAttribute('type', 'button')
})
