
import { render } from "@testing-library/react";
import { OrdersStatus } from "./order-status";


describe("order-status", () => {
    it("should display the right text  when order status is pending", () => {


        const wrapper = render(<OrdersStatus status="pending" />)

        const statusText = wrapper.getByText("Pendente")
        const badgeElement = wrapper.getByTestId("badge")


        console.log(badgeElement.outerHTML)

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass("bg-slate-400")




    })

    it("should display the right text when order status is canceled ", () => {

        /*Pending*/
        const wrapper = render(<OrdersStatus status="canceled" />)

        const statusText = wrapper.getByText("Cancelado")
        const badgeElement = wrapper.getByTestId("badge")


        console.log(badgeElement.outerHTML)

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass("bg-rose-500")

    })


    it("should display the right text when order status is delivering ", () => {

        /*Pending*/
        const wrapper = render(<OrdersStatus status="delivering" />)

        const statusText = wrapper.getByText("Em entrega")
        const badgeElement = wrapper.getByTestId("badge")


        console.log(badgeElement.outerHTML)

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass("bg-amber-400")

    })



    it("should display the right text when order status is processing ", () => {

        /*Pending*/
        const wrapper = render(<OrdersStatus status="processing" />)

        const statusText = wrapper.getByText("Em preparo")
        const badgeElement = wrapper.getByTestId("badge")


        console.log(badgeElement.outerHTML)

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass("bg-amber-400")

    })

    it("should display the right text when order status is delivered ", () => {

        /*Pending*/
        const wrapper = render(<OrdersStatus status="delivered" />)

        const statusText = wrapper.getByText("Entregue")
        const badgeElement = wrapper.getByTestId("badge")


        console.log(badgeElement.outerHTML)

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass("bg-emerald-500")

    })



})