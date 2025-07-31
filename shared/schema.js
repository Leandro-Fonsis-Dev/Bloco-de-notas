"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNoteSchema = exports.loginSchema = exports.insertUserSchema = exports.notesRelations = exports.usersRelations = exports.notes = exports.users = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var zod_1 = require("zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.integer)("id").primaryKey().generatedByDefaultAsIdentity(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
});
exports.notes = (0, pg_core_1.pgTable)("notes", {
    id: (0, pg_core_1.integer)("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(function () { return exports.users.id; }, { onDelete: "cascade" }),
    title: (0, pg_core_1.text)("title").notNull(),
    createdDate: (0, pg_core_1.date)("created_date").notNull(),
    completedDate: (0, pg_core_1.date)("completed_date").notNull(),
    status: (0, pg_core_1.text)("status").notNull().$type(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
    var many = _a.many;
    return ({
        notes: many(exports.notes),
    });
});
exports.notesRelations = (0, drizzle_orm_1.relations)(exports.notes, function (_a) {
    var one = _a.one;
    return ({
        user: one(exports.users, {
            fields: [exports.notes.userId],
            references: [exports.users.id],
        }),
    });
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users, {
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    name: zod_1.z.string().min(1, "Nome é obrigatório"),
}).omit({ id: true });
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(1, "Senha é obrigatória"),
});
exports.insertNoteSchema = (0, drizzle_zod_1.createInsertSchema)(exports.notes, {
    title: zod_1.z.string().min(1, "Nome da tarefa é obrigatório"),
    status: zod_1.z.enum(["A Fazer", "Concluída"]),
    createdDate: zod_1.z.string(),
    completedDate: zod_1.z.string().min(1, "Data de conclusão é obrigatória"),
}).omit({ id: true, userId: true });
