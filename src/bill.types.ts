export type BillSession = {
    id: string;
    host_id: string;
    status: "open" | "locked" | "closed";
    session_token: string;
    items: BillItem[];
    service_charge: number;
    grand_total: number;
}

export type BillItem = {
    id: number;
    name: string;
    unit_price: number;
    quantity: number;
}
