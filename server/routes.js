"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
var http_1 = require("http");
var express_session_1 = require("express-session");
var bcryptjs_1 = require("bcryptjs");
var storage_1 = require("./storage");
var schema_1 = require("@shared/schema");
var zod_validation_error_1 = require("zod-validation-error");
function registerRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var requireAuth, httpServer;
        var _this = this;
        return __generator(this, function (_a) {
            // Session configuration
            app.use((0, express_session_1.default)({
                secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: false, // Set to true in production with HTTPS
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000 // 24 hours
                }
            }));
            requireAuth = function (req, res, next) {
                if (!req.session.userId) {
                    return res.status(401).json({ message: "Não autorizado" });
                }
                next();
            };
            // Register endpoint
            app.post("/api/auth/register", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var validatedData, existingUser, hashedPassword, user, error_1, validationError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            validatedData = schema_1.insertUserSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.getUserByEmail(validatedData.email)];
                        case 1:
                            existingUser = _a.sent();
                            if (existingUser) {
                                return [2 /*return*/, res.status(400).json({ message: "Email já está em uso" })];
                            }
                            return [4 /*yield*/, bcryptjs_1.default.hash(validatedData.password, 10)];
                        case 2:
                            hashedPassword = _a.sent();
                            return [4 /*yield*/, storage_1.storage.createUser(__assign(__assign({}, validatedData), { password: hashedPassword }))];
                        case 3:
                            user = _a.sent();
                            // Set session
                            req.session.userId = user.id;
                            res.json({
                                user: { id: user.id, name: user.name, email: user.email }
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            if (error_1.name === "ZodError") {
                                validationError = (0, zod_validation_error_1.fromZodError)(error_1);
                                return [2 /*return*/, res.status(400).json({ message: validationError.message })];
                            }
                            res.status(500).json({ message: "Erro interno do servidor" });
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            // Login endpoint
            app.post("/api/auth/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var validatedData, user, isValidPassword, error_2, validationError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            validatedData = schema_1.loginSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.getUserByEmail(validatedData.email)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, res.status(401).json({ message: "Email ou senha inválidos" })];
                            }
                            return [4 /*yield*/, bcryptjs_1.default.compare(validatedData.password, user.password)];
                        case 2:
                            isValidPassword = _a.sent();
                            if (!isValidPassword) {
                                return [2 /*return*/, res.status(401).json({ message: "Email ou senha inválidos" })];
                            }
                            // Set session
                            req.session.userId = user.id;
                            res.json({
                                user: { id: user.id, name: user.name, email: user.email }
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            if (error_2.name === "ZodError") {
                                validationError = (0, zod_validation_error_1.fromZodError)(error_2);
                                return [2 /*return*/, res.status(400).json({ message: validationError.message })];
                            }
                            res.status(500).json({ message: "Erro interno do servidor" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // Logout endpoint
            app.post("/api/auth/logout", function (req, res) {
                req.session.destroy(function (err) {
                    if (err) {
                        return res.status(500).json({ message: "Erro ao fazer logout" });
                    }
                    res.json({ message: "Logout realizado com sucesso" });
                });
            });
            // Get current user
            app.get("/api/auth/me", requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var user, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_1.storage.getUser(req.session.userId)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, res.status(404).json({ message: "Usuário não encontrado" })];
                            }
                            res.json({ user: { id: user.id, name: user.name, email: user.email } });
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            res.status(500).json({ message: "Erro interno do servidor" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Get notes
            app.get("/api/notes", requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var notes, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_1.storage.getNotesByUserId(req.session.userId)];
                        case 1:
                            notes = _a.sent();
                            res.json(notes);
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            res.status(500).json({ message: "Erro ao buscar anotações" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Create note
            app.post("/api/notes", requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var validatedData, note, error_5, validationError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            validatedData = schema_1.insertNoteSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.createNote(__assign(__assign({}, validatedData), { userId: req.session.userId }))];
                        case 1:
                            note = _a.sent();
                            res.json(note);
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            if (error_5.name === "ZodError") {
                                validationError = (0, zod_validation_error_1.fromZodError)(error_5);
                                return [2 /*return*/, res.status(400).json({ message: validationError.message })];
                            }
                            res.status(500).json({ message: "Erro ao criar anotação" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Update note
            app.put("/api/notes/:id", requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var noteId, validatedData, updatedNote, error_6, validationError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            noteId = parseInt(req.params.id);
                            validatedData = schema_1.insertNoteSchema.partial().parse(req.body);
                            return [4 /*yield*/, storage_1.storage.updateNote(noteId, req.session.userId, validatedData)];
                        case 1:
                            updatedNote = _a.sent();
                            if (!updatedNote) {
                                return [2 /*return*/, res.status(404).json({ message: "Anotação não encontrada" })];
                            }
                            res.json(updatedNote);
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _a.sent();
                            if (error_6.name === "ZodError") {
                                validationError = (0, zod_validation_error_1.fromZodError)(error_6);
                                return [2 /*return*/, res.status(400).json({ message: validationError.message })];
                            }
                            res.status(500).json({ message: "Erro ao atualizar anotação" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Delete note
            app.delete("/api/notes/:id", requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var noteId, deleted, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            noteId = parseInt(req.params.id);
                            return [4 /*yield*/, storage_1.storage.deleteNote(noteId, req.session.userId)];
                        case 1:
                            deleted = _a.sent();
                            if (!deleted) {
                                return [2 /*return*/, res.status(404).json({ message: "Anotação não encontrada" })];
                            }
                            res.json({ message: "Anotação excluída com sucesso" });
                            return [3 /*break*/, 3];
                        case 2:
                            error_7 = _a.sent();
                            res.status(500).json({ message: "Erro ao excluir anotação" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            httpServer = (0, http_1.createServer)(app);
            return [2 /*return*/, httpServer];
        });
    });
}
