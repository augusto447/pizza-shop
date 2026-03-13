import { http, HttpResponse } from "msw";
import type { GetMounthOrdersAmountResponse } from "../get-mounth-orders-amount";

export const getMonthOrderAmountMock = http.get<never, never, GetMounthOrdersAmountResponse>("/metrics/month-orders-amount", () => {
    return HttpResponse.json({
        amount: 200,
        diffFromLastMonth: -5
    })
})