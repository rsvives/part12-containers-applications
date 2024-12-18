import { screen, render } from "@testing-library/react";
import { Todo } from "../Todos/Todo";
import { describe, expect, test, vi } from "vitest";

describe('Todo Component', () => {
    test('config', () => {
        expect(1).toBe(1)
    })
    test('should be defined', () => {
        const todo = {
            text: 'write tests',
            done: false
        }
        const mockfn = vi.fn(() => console.log('mock fn'))
        render(<Todo todo={todo} onComplete={mockfn} onDelete={mockfn} />)

        const element = screen.getByText('write tests')
        expect(element).toBeDefined()
    })

})