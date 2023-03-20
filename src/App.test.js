import { render } from '@testing-library/react';
// to test
import App from './App';

describe('<App>', function() {
  it('should be tested at the component level', function() {
    render(<App />)
  })
})