import { TicketDAO } from '../dao/classes/ticket.dao.js';

export class TicketRepository {
    constructor() {
        this.dao = new TicketDAO();
    }

    async createTicket(ticketData) {
        return this.dao.create(ticketData);
    }

    async getTicketByCode(code) {
        return this.dao.findByCode(code);
    }
}