import React from "react";
import {render, waitForElement, fireEvent} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OfferPosition from "./OfferPosition";

describe('OfferPosition', () => {
    let fetchType;
    let offer = {
        category: "IT",
        company_address: {
            city: "Wwa",
            postal_code: "21-371",
            street: "Polna",
            street_number: "225"
        },
        company_name: "Firemka",
        description: "Szukamy lajkoników w mediach spolecznosciowych. Oferujemy dobra place, karte Multisport...",
        expiration_date: "2020-12-21",
        id: "sadgergerfwefwe",
        offer_name: "Lajkonik",
        type: "Praca",
        voivodeship: "mazowieckie"
    };

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                switch (fetchType) {
                    case "approveOk":
                        resolve({ status: 200, json: () => Promise.resolve("Ustawiono potwierdzenie oferty pracy") });
                        break;
                    case "rejectOk":
                        resolve({ status: 200, json: () => Promise.resolve("Ustawiono odrzucenie oferty pracy") });
                        break;
                    case "odd":
                        resolve({ status: 200, json: () => Promise.resolve("Suma podstawy równa się kwadratowi obu ramion") });
                        break;
                    case "fail":
                        resolve({ status: 500 });
                        break;
                    default:
                        reject();
                        break;
                }
            });
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should match snapshot', async () => {
        const { container, getByText } = render (
            <MemoryRouter>
                <OfferPosition offer={offer} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("mazowieckie"));
        expect(container).toMatchSnapshot();
    });

    it('should approve offer', async () => {
        fetchType = "approveOk";
        const { getByText } = render (
            <MemoryRouter>
                <OfferPosition offer={offer} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Akceptuj"));
        fireEvent.click(getByText("Akceptuj"));
        await expect(fetch).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/job/admin/confirm/sadgergerfwefwe/",
            {
                headers: {
                    Authorization: "token undefined",
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );
        await waitForElement(() => getByText("Oferta zatwierdzona pomyślnie."));
        expect(getByText("Oferta zatwierdzona pomyślnie.")).toBeInTheDocument();
    });

    it('should view error when approving offer fails', async () => {
        fetchType = "fail";
        const { getByText } = render (
            <MemoryRouter>
                <OfferPosition offer={offer} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Akceptuj"));
        fireEvent.click(getByText("Akceptuj"));
        await waitForElement(() => getByText("Ups, wystąpił błąd..."));
        expect(getByText("Ups, wystąpił błąd...")).toBeInTheDocument();
    });

    it('should view error when approving offer returns odd api response', async () => {
        fetchType = "odd";
        const { getByText } = render (
            <MemoryRouter>
                <OfferPosition offer={offer} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Akceptuj"));
        fireEvent.click(getByText("Akceptuj"));
        await waitForElement(() => getByText("Ups, wystąpił błąd..."));
        expect(getByText("Ups, wystąpił błąd...")).toBeInTheDocument();
    });

    it('should reject offer', async () => {
        fetchType = "rejectOk";
        const { getByText } = render (
            <MemoryRouter>
                <OfferPosition offer={offer} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Odrzuć"));
        fireEvent.click(getByText("Odrzuć"));
        await expect(fetch).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/job/admin/reject/sadgergerfwefwe/",
            {
                headers: {
                    Authorization: "token undefined",
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );
        await waitForElement(() => getByText("Oferta odrzucona pomyślnie."));
        expect(getByText("Oferta odrzucona pomyślnie.")).toBeInTheDocument();
    });

    it('should view error when rejecting offer fails', async () => {
        fetchType = "fail";
        const { getByText } = render (
            <MemoryRouter>
                <OfferPosition offer={offer} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Odrzuć"));
        fireEvent.click(getByText("Odrzuć"));
        await waitForElement(() => getByText("Ups, wystąpił błąd..."));
        expect(getByText("Ups, wystąpił błąd...")).toBeInTheDocument();
    });

    it('should view error when rejecting offer returns odd api response', async () => {
        fetchType = "odd";
        const { getByText } = render (
            <MemoryRouter>
                <OfferPosition offer={offer} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Odrzuć"));
        fireEvent.click(getByText("Odrzuć"));
        await waitForElement(() => getByText("Ups, wystąpił błąd..."));
        expect(getByText("Ups, wystąpił błąd...")).toBeInTheDocument();
    });

});