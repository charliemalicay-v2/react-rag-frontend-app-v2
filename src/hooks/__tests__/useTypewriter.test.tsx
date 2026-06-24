import { renderHook, act } from "@testing-library/react";
import { useTypewriter } from "../useTypewriter";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it("returns empty string for empty text", () => {
  const { result } = renderHook(() => useTypewriter(""));
  expect(result.current).toBe("");
});

it("returns full text when text does not change", () => {
  const { result, rerender } = renderHook(
    ({ text }: { text: string }) => useTypewriter(text, 100),
    { initialProps: { text: "" } }
  );

  rerender({ text: "hello world" });

  act(() => {
    jest.advanceTimersByTime(500);
  });
  expect(result.current).toBe("hello world");
});

it("reveals text word by word", () => {
  const { result, rerender } = renderHook(
    ({ text }: { text: string }) => useTypewriter(text, 50),
    { initialProps: { text: "" } }
  );
  expect(result.current).toBe("");

  rerender({ text: "hello world" });

  act(() => {
    jest.advanceTimersByTime(50);
  });
  expect(result.current).toBe("hello");

  act(() => {
    jest.advanceTimersByTime(50);
  });
  expect(result.current).toBe("hello ");

  act(() => {
    jest.advanceTimersByTime(50);
  });
  expect(result.current).toBe("hello world");
});

it("catches up when text grows during streaming", () => {
  const { result, rerender } = renderHook(
    ({ text }: { text: string }) => useTypewriter(text, 50),
    { initialProps: { text: "" } }
  );

  rerender({ text: "hello" });
  act(() => {
    jest.advanceTimersByTime(50);
  });
  expect(result.current).toBe("hello");

  rerender({ text: "hello beautiful world" });

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(result.current).toBe("hello beautiful");

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(result.current).toBe("hello beautiful world");
});
