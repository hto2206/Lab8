/**
 * @jest-environment jsdom
 */
 import { pushToHistory } from '../scripts/router.js';
 describe('Tests pushToHistory function', () => {
    test('Test length of stack 1', () => {
        expect(pushToHistory('entry', 0).length).toBe(2);
    });
    test('Test length of stack 2', () => {
        expect(pushToHistory('settings', 1).length).toBe(3);
    });
    test('Test current obj', () => {
        expect(pushToHistory('settings', 2).state).toEqual({page: 'settings'});
    });
    test('Test current obj 2', () => {
        expect(pushToHistory('entry', 1).state).toEqual({page: 'entry1'});
    });
    test('Test current obj 2', () => {
        expect(pushToHistory('home', 1).state).toEqual({});
    });
 });
 