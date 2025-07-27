import { renderHook } from '@testing-library/react';
import { useTitle } from '../../hooks/useTitle';

jest.mock('../../hooks/useIsomorphicLayoutEffect', () => ({
  useIsomorphicLayoutEffect: jest.fn((callback) => {
    callback();
  })
}));

describe('useTitle', () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  it('should set document title with valid string', () => {
    renderHook(() => useTitle('Test Title'));

    expect(document.title).toBe('Test Title');
  });

  it('should trim whitespace from title', () => {
    renderHook(() => useTitle('  Trimmed Title  '));

    expect(document.title).toBe('Trimmed Title');
  });

  it('should not set document title with empty string', () => {
    renderHook(() => useTitle(''));

    expect(document.title).toBe(originalTitle);
  });

  it('should not set document title with whitespace-only string', () => {
    renderHook(() => useTitle('   '));

    expect(document.title).toBe(originalTitle);
  });

  it('should update title when title prop changes', () => {
    const { rerender } = renderHook(({ title }) => useTitle(title), {
      initialProps: { title: 'First Title' }
    });

    expect(document.title).toBe('First Title');

    rerender({ title: 'Second Title' });

    expect(document.title).toBe('Second Title');
  });
});
