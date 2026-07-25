import type { BillItem, BillSession, Payer } from "./bill.types";
import { supabase } from "./supabaseClient";

export const fetchBillSession = async (): Promise<BillSession | undefined> => {
    const { data, error, status } = await supabase
        .from("bill_sessions")
        .select()
        .single();

    if (error) return;
    if (status !== 200) return;
    if (!data || !data.items) return;

    const billItems = data.items as BillItem[];

    const billStatus = (() => {
        if (
            data.status == "open" ||
            data.status == "locked" ||
            data.status == "closed"
        ) {
            return data.status;
        }
        throw error;
    })();

    const billSession: BillSession = {
        id: data.id,
        host_id: data.host_id,
        name: data.name,
        service_charge: data.service_charge,
        grand_total: data.grand_total,
        items: billItems,
        session_token: data.session_token,
        status: billStatus,
    };

    return billSession
};

export const fetchPayers = async (sessionId: string): Promise<Payer[]> => {
    const { data, error, status } = await supabase
        .from("session_payers")
        .select()
        .eq("session_id", sessionId);

    if (error) throw error;
    if (status !== 200) return [];
    if (!data) return [];

    const payers: Payer[] = data.map<Payer>((payer) => ({
        id: payer.id,
        name: payer.name,
    }));

    return payers;
};
