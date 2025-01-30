import { createItem, deleteItem, getAllItems, updateItem } from './items.service'
import { beforeEach, expect, jest } from '@jest/globals'
import prisma from '../db.js'

// Global mocks
beforeEach(() => {
    prisma.items.create = jest.fn()
    prisma.items.update = jest.fn()
    prisma.items.findMany = jest.fn()
    prisma.items.delete = jest.fn()
})

test('create item in database', async () => {
    // Given/When
    const item = await createItem('test-item', 10)

    // Then
    expect(prisma.items.create).toHaveBeenCalledWith({
        data: {
            name: 'test-item',
            price: 10
        }
    })
})

test('create item in database throws error when price negative', async () => {
    // When/Then
    await expect(createItem('test', -10)).rejects.toThrowError('Price cannot be negative')
})

test('getAllItems call db', () => {
    // When/Then
    expect(prisma.items.findMany).not.toHaveBeenCalled()
    getAllItems()
    expect(prisma.items.findMany).toHaveBeenCalled()
})

test('updateItem call db', () => {
    // When
    updateItem(1, { name: 'test' })

    // Then
    expect(prisma.items.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'test' }
    })
})

test('deleteItem call db', () => {
    // When
    deleteItem(1)

    // Then
    expect(prisma.items.delete).toHaveBeenCalledWith({
        where: { id: 1 }
    })
})