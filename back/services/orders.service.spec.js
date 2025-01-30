import { createOrder, getUserOrders, updateOrderState, getOrders } from './orders.service'
import { expect, jest } from '@jest/globals'
import prisma from '../db.js'

test('createOrder computes total amount correctly and performs connect', async () => {
    // Given
    const items = [
        { itemId: 1, amount: 2 },
        { itemId: 2, amount: 3 }
    ]

    // Mock
    prisma.items.findUnique = jest.fn().mockImplementation(async ({ where }) => {
        if (where.id === 1) return { price: 10 }
        if (where.id === 2) return { price: 20 }
    })

    jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        jest.spyOn(prisma.orders, 'create').mockImplementation(async ({ data }) => {
            return { ...data }
        })
        return callback(prisma)
    })

    // When
    await createOrder(1, items)

    // Then
    expect(prisma.orders.create).toHaveBeenCalledWith({
        data: {
            userId: 1,
            amountPayed: 80,
            items: {
                create: [
                    { amount: 2, item: { connect: { id: 1 } } },
                    { amount: 3, item: { connect: { id: 2 } } }
                ]
            }
        },
        include: {
            items: {
                include: {
                    item: true
                }
            }
        }
    })
})

test('createOrder throw error when item not found', async () => {
    // Given
    const items = [
        { itemId: 1, amount: 2 },
        { itemId: 2, amount: 3 }
    ]

    // Mock
    prisma.items.findUnique = jest.fn().mockImplementation(async ({ where }) => {
        if (where.id === 1) return { price: 10 }
        return null
    })


    // When/Then
    await expect(createOrder(1, items)).rejects.toThrow('Item 2 not found')
})

test('getUserOrders returns orders with items', async () => {
    // Given
    const userId = 1

    // Mock
    prisma.orders.findMany = jest.fn().mockImplementation(async ({ where }) => {
        if (where.userId === 1) {
            return [
                {
                    id: 1,
                    userId: 1,
                    items: [
                        { amount: 2, item: { id: 1, name: 'Item 1' } },
                        { amount: 3, item: { id: 2, name: 'Item 2' } }
                    ]
                }
            ]
        }
    })

    // When
    const orders = await getUserOrders(1)

    // Then
    expect(orders).toEqual([
        {
            id: 1,
            userId: 1,
            items: [
                { amount: 2, item: { id: 1, name: 'Item 1' } },
                { amount: 3, item: { id: 2, name: 'Item 2' } }
            ]
        }
    ])
})

test('updateOrderState change state of order', async () => {
    // Given
    const orderId = 1
    const state = 'PAID'

    // Mock
    prisma.orders.update = jest.fn()

    // When
    await updateOrderState(1, 'PAID')

    // Then
    expect(prisma.orders.update).toHaveBeenCalledWith({
        where: { id: orderId },
        data: { state }
    })
})

test('updateOrderState fails for invalid state', async () => {
    // Given
    const orderId = 1
    const state = 'INVALID'

    // When/Then
    await expect(() => updateOrderState(orderId, state)).rejects.toThrow('Invalid order state')
})

test('getOrders call db', async () => {
    // Mock
    prisma.orders.findMany = jest.fn()

    // When
    await getOrders()

    // Then
    expect(prisma.orders.findMany).toHaveBeenCalledWith({
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true
                }
            },
            items: {
                include: {
                    item: true
                }
            }
        }
    })
})