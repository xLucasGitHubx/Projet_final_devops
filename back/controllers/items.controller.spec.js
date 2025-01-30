import { beforeEach, describe, expect, jest } from '@jest/globals'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { createItem, deleteItem, getAllItems, updateItem } from '../services/items.service'

beforeEach(() => {
    jest.resetModules()
})

describe('createNewItem', () => {
    test('createNewItem call next when error', async () => {
        // Given
        const req = getMockReq({
            body: {
                name: 'item name',
                price: 100
            }
        })

        // Mock
        jest.unstable_mockModule("../services/items.service.js", () => {
            return {
                __esModule: true,
                createItem: jest.fn().mockRejectedValue(new Error('Error')),
                getAllItems,
                updateItem,
                deleteItem
            }
        })
        const handle = (await import('./items.controller.js'))
        const { res, next } = getMockRes()

        // When
        await handle.createNewItem(req, res, next)

        // Then
        expect(next).toHaveBeenCalled()
    })

    test('createNewItem return valid json', async () => {
        // Given
        const req = getMockReq({
            body: {
                name: 'item name',
                price: 100
            }
        })

        // Mock
        jest.unstable_mockModule("../services/items.service.js", () => {
            return {
                __esModule: true,
                createItem: jest.fn().mockResolvedValue({ id: 1, name: 'item name', price: 100 }),
                getAllItems,
                updateItem,
                deleteItem
            }
        })
        const handle = (await import('./items.controller.js'))
        const { res, next } = getMockRes()

        // When
        await handle.createNewItem(req, res, next)

        // Then
        expect(next).not.toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: { id: 1, name: 'item name', price: 100 }
        })
    })
})

describe('getItems', () => {
    test('getItems call next when error', async () => {
        // Mock
        jest.unstable_mockModule("../services/items.service.js", () => {
            return {
                __esModule: true,
                createItem,
                getAllItems: jest.fn().mockRejectedValue(new Error('Error')),
                updateItem,
                deleteItem
            }
        })
        const handle = (await import('./items.controller.js'))
        const { req, res, next } = getMockRes()

        // When
        await handle.getItems(req, res, next)

        // Then
        expect(next).toHaveBeenCalled()
    })

    test('getItems return valid array json', async () => {
        // Mock
        jest.unstable_mockModule("../services/items.service.js", () => {
            return {
                __esModule: true,
                createItem,
                getAllItems: jest.fn().mockResolvedValue([{ id: 1, name: 'item name', price: 100 }]),
                updateItem,
                deleteItem
            }
        })
        const handle = (await import('./items.controller.js'))
        const { req, res, next } = getMockRes()

        // When
        await handle.getItems(req, res, next)

        // Then
        expect(next).not.toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: [{ id: 1, name: 'item name', price: 100 }]
        })
    })
})

describe('updateItemById', () => {
    test('updateItemById call next when error', async () => {
        // Given
        const req = getMockReq({
            params: {
                id: 1
            },
            body: {
                name: 'item name',
                price: 100
            }
        })

        // Mock
        jest.unstable_mockModule("../services/items.service.js", () => {
            return {
                __esModule: true,
                createItem,
                getAllItems,
                updateItem: jest.fn().mockRejectedValue(new Error('Error')),
                deleteItem
            }
        })
        const handle = (await import('./items.controller.js'))
        const { res, next } = getMockRes()

        // When
        await handle.updateItemById(req, res, next)

        // Then
        expect(next).toHaveBeenCalled()
    })

    test('updateItemById return valid json', async () => {
        // Given
        const req = getMockReq({
            params: {
                id: 1
            },
            body: {
                name: 'item name updated',
                price: 100
            }
        })

        // Mock
        jest.unstable_mockModule("../services/items.service.js", () => {
            return {
                __esModule: true,
                createItem,
                getAllItems,
                updateItem: jest.fn().mockResolvedValue({ id: 1, name: 'item name updated', price: 100 }),
                deleteItem
            }
        })
        const handle = (await import('./items.controller.js'))
        const { res, next } = getMockRes()

        // When
        await handle.updateItemById(req, res, next)

        // Then
        expect(next).not.toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: { id: 1, name: 'item name updated', price: 100 }
        })
    })
})

describe('deleteItemById', () => {
    test('deleteItemById call next when error', async () => {
        // Given
        const req = getMockReq({
            params: {
                id: 1
            }
        })

        // Mock
        jest.unstable_mockModule("../services/items.service.js", () => {
            return {
                __esModule: true,
                createItem,
                getAllItems,
                updateItem,
                deleteItem: jest.fn().mockRejectedValue(new Error('Error'))
            }
        })
        const handle = (await import('./items.controller.js'))
        const { res, next } = getMockRes()

        // When
        await handle.deleteItemById(req, res, next)

        // Then
        expect(next).toHaveBeenCalled()
    })

    test('deleteItemById return valid json', async () => {
        // Given
        const req = getMockReq({
            params: {
                id: 1
            }
        })

        // Mock
        jest.unstable_mockModule("../services/items.service.js", () => {
            return {
                __esModule: true,
                createItem,
                getAllItems,
                updateItem,
                deleteItem: jest.fn()
            }
        })
        const handle = (await import('./items.controller.js'))
        const { res, next } = getMockRes()

        // When
        await handle.deleteItemById(req, res, next)

        // Then
        expect(next).not.toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Item deleted'
        })
    })
})