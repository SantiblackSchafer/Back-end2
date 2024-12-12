import { TicketModel } from '../models/ticket.model.js';

export class TicketDAO {
    async create(ticketData) {
        return TicketModel.create(ticketData);
    }

    async findByCode(code) {
        return TicketModel.findOne({ code });
    }
}