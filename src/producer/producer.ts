import rand from "../lib/rand";

export namespace ProducerSchema {
    export interface Producer{
        _id: string;
        producer_name: string;
        producer_address: string;
        producer_email: string;
        producer_phone: string;
        ctime: string;
        utime: string;
        dtime?: string;
    }

    export interface CreateProducerParams{
        producer_name: string;
        producer_address: string;
        producer_email: string;
        producer_phone: string;
    }

    export interface UpdateProducerParams{
        producer_name?: string;
        producer_address?: string;
        producer_email?: string;
        producer_phone?: string;
        utime?: string;
    }
    
    export const Generator = {
        NewProducerId: () => rand.uppercase(12),
    };
}