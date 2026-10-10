import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('shows the prototype title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: '未來科技校園 RPG' })).toBeInTheDocument();
  });
});
