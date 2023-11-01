import messageModel from "./models/message.model.js";

export default class MessageManager {
    static get(query = {}) {
        const criteria = {};
        if (query.course) {
            criteria.course = query.course;
        }
        return messageModel.find(criteria);
    }

    static async create(data) {
        const message = await messageModel.create(data);
        return message;
    }
}