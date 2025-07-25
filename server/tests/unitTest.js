// tests/unit/bugValidation.test.js
const { validateBug } = require('../../middleware/bugValidation');

describe('Bug Validation', () => {
  it('should pass with valid bug data', () => {
    const validBug = {
      title: 'Login page not working',
      description: 'Getting 500 error when submitting login form',
      priority: 'high'
    };
    
    const { error } = validateBug(validBug);
    expect(error).toBeUndefined();
  });

  it('should fail with missing title', () => {
    const invalidBug = {
      description: 'Some description',
      priority: 'medium'
    };
    
    const { error } = validateBug(invalidBug);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('title');
  });
});