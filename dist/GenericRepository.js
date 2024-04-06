"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepository = void 0;
class GenericRepository {
    constructor(repository) {
        this.repository = repository;
    }
    get manager() {
        return this.repository.manager;
    }
    async findOne(options) {
        return await this.repository.findOne(options);
    }
    async findMany(options) {
        return await this.repository.find(options);
    }
    async findManyAndCount(options) {
        return await this.repository.findAndCount(options);
    }
    async create(data, saveOptions = {}) {
        const baseRecord = this.repository.create(data);
        return await this.repository.save(baseRecord, saveOptions);
    }
    async createMany(data, saveOptions = {}) {
        const records = this.repository.create(data);
        return await this.repository.save(records, saveOptions);
    }
    async update(data, saveOptions = {}) {
        return await this.repository.save(data, saveOptions);
    }
    async updateMany(updateQuery, data) {
        return await this.repository.update(updateQuery, data);
    }
    async rawQuery(query, parameters) {
        return await this.repository.query(query, parameters);
    }
    async delete(query) {
        return await this.repository.softDelete(query);
    }
    async count(options) {
        const count = await this.repository.count(options);
        return { count };
    }
}
exports.GenericRepository = GenericRepository;
exports.default = GenericRepository;
