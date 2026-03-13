import { env } from "@/env"
import { setupWorker } from "msw/browser"
import { signInMock } from "./sign-in-mock"
import { registerRestaurantMock } from "./register-restaurant-mock"

import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount"
import { getMonthRevenueAmountMock } from "./get-month-revenue"
import { getDayOrderAmountMock } from "./get-day-order-amount"
import { getMonthOrderAmountMock } from "./get-month-order-amount"

import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period"
import { getPopularProductsMock } from "./get-popular-products-mocks"



export const worker = setupWorker(
    signInMock,
    registerRestaurantMock,
    getDayOrderAmountMock,
    getMonthOrderAmountMock,

    getMonthCanceledOrdersAmountMock,

    getMonthRevenueAmountMock,
    getDailyRevenueInPeriodMock,
    getPopularProductsMock
)





export async function enableMSW() {

    if (env.MODE != "test") {
        return
    }

    await worker.start()

}