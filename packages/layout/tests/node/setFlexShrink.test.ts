import { beforeEach, describe, expect, test, vi } from 'vitest';
import setFlexShrink from '../../src/node/setFlexShrink';
import { SafeNode } from '../../src/types';

describe('node setFlexShrink', () => {
  const mock = vi.fn();
  const node = {
    type: 'VIEW',
    props: {},
    style: {},
    children: [],
    yogaNode: { setFlexShrink: mock },
  } as SafeNode;

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = {
      type: 'VIEW',
      props: {},
      style: {},
      children: [],
      box: { top: 0, right: 0, bottom: 0, left: 0, width: 10, height: 20 },
    } as SafeNode;

    const result = setFlexShrink(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set one by default', () => {
    const result = setFlexShrink(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(1);
    expect(result).toBe(node);
  });

  test('Should set provided value', () => {
    const result = setFlexShrink(2)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(2);
    expect(result).toBe(node);
  });
});
