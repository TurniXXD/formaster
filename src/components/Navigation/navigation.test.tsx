import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For extended DOM matchers
import Navigation from './Navigation';

describe('Navigation Component', () => {
  it('renders navigation links correctly', () => {
    const { getByText } = render(<Navigation />);

    expect(getByText('availableForms')).toBeInTheDocument();
    expect(getByText('formBuilder')).toBeInTheDocument();
    expect(getByText('formTester')).toBeInTheDocument();
  });

  it('adds active class to active link', () => {
    // Mocking the usePathname hook
    jest.mock('next/navigation', () => ({
      usePathname: () => '/en/form-tester/', // You can change the path as needed
    }));

    const { getByText } = render(<Navigation />);

    expect(getByText('availableForms')).not.toHaveClass('active');
    expect(getByText('formBuilder')).not.toHaveClass('active');
    expect(getByText('formTester')).toHaveClass('active');
  });
});
