import { renderHook } from '@testing-library/react';
import { useConfirmExit } from '../../hooks/useConfirmExit';
import { on, off } from '../../helpers/event';

jest.mock('../../helpers/event')

const mockOn = on as jest.MockedFunction<typeof on>;
const mockOff = off as jest.MockedFunction<typeof off>;

const event = new Event('beforeunload');
Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

describe('useConfirmExit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add event listener when enabled is true', () => {
    renderHook(() => useConfirmExit(true));

    expect(mockOn).toHaveBeenCalledWith(window, 'beforeunload', expect.any(Function));
  });

  it('should not add event listener when enabled is false', () => {
    renderHook(() => useConfirmExit(false));

    expect(mockOn).not.toHaveBeenCalled();
  });

  it('should add event listener when enabled function returns true', () => {
    const enabledFn = jest.fn().mockReturnValue(true);
    renderHook(() => useConfirmExit(enabledFn));

    expect(on).toHaveBeenCalledWith(window, 'beforeunload', expect.any(Function));
  });

  it('should remove event listener on cleanup', () => {
    const { unmount } = renderHook(() => useConfirmExit(true));

    unmount();

    expect(mockOff).toHaveBeenCalledWith(window, 'beforeunload', expect.any(Function));
  });

  it('should call preventDefault', () => {
    renderHook(() => useConfirmExit(true, 'Custom message'));

    // Get the handler function.
    const handler = mockOn.mock.calls[0]?.[2];

    handler(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should not call preventDefault when enabled is false', () => {
    renderHook(() => useConfirmExit(() => false, 'Custom message'));

    // Get the handler function.
    const handler = mockOn.mock.calls[0]?.[2];

    handler(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
