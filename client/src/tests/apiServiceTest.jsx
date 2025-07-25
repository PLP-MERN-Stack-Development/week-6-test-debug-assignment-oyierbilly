// tests/services/bugService.test.js
import { getBugs, createBug } from '../../services/bugService';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Bug Service', () => {
  let mockAxios;
  
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });
  
  afterEach(() => {
    mockAxios.restore();
  });
  
  it('fetches bugs successfully', async () => {
    const mockBugs = [
      { id: 1, title: 'Bug 1' },
      { id: 2, title: 'Bug 2' }
    ];
    
    mockAxios.onGet('/api/bugs').reply(200, mockBugs);
    
    const result = await getBugs();
    expect(result).toEqual(mockBugs);
  });
  
  it('handles fetch errors', async () => {
    mockAxios.onGet('/api/bugs').reply(500);
    
    await expect(getBugs()).rejects.toThrow('Failed to fetch bugs');
  });
});