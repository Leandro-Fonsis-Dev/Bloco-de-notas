"use strict";
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
exports.default = DashboardPage;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var react_query_1 = require("@tanstack/react-query");
var queryClient_1 = require("@/lib/queryClient");
var wouter_1 = require("wouter");
var lucide_react_1 = require("lucide-react");
var floating_label_input_1 = require("@/components/ui/floating-label-input");
var button_1 = require("@/components/ui/button");
var use_toast_1 = require("@/hooks/use-toast");
var queryClient_2 = require("@/lib/queryClient");
var schema_1 = require("@shared/schema");
function DashboardPage() {
    var _this = this;
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)("all"), filter = _b[0], setFilter = _b[1];
    var _c = (0, react_1.useState)(null), editingNote = _c[0], setEditingNote = _c[1];
    var form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schema_1.insertNoteSchema),
        defaultValues: {
            title: "",
            createdDate: new Date().toISOString().split('T')[0],
            completedDate: new Date().toISOString().split('T')[0],
            status: "A Fazer",
        },
    });
    // Get current user
    var _d = (0, react_query_1.useQuery)({
        queryKey: ["/api/auth/me"],
    }), userResponse = _d.data, userLoading = _d.isLoading;
    // Get notes
    var _e = (0, react_query_1.useQuery)({
        queryKey: ["/api/notes"],
        enabled: !!userResponse,
    }), _f = _e.data, notes = _f === void 0 ? [] : _f, notesLoading = _e.isLoading;
    // Logout mutation
    var logoutMutation = (0, react_query_1.useMutation)({
        mutationFn: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, queryClient_2.apiRequest)("POST", "/api/auth/logout")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        onSuccess: function () {
            setLocation("/login");
        },
    });
    // Create note mutation
    var createNoteMutation = (0, react_query_1.useMutation)({
        mutationFn: function (data) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, queryClient_2.apiRequest)("POST", "/api/notes", data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        onSuccess: function () {
            form.reset({
                title: "",
                createdDate: new Date().toISOString().split('T')[0],
                completedDate: new Date().toISOString().split('T')[0],
                status: "A Fazer",
            });
            queryClient_1.queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
            toast({
                title: "Anotação criada!",
                description: "Sua anotação foi criada com sucesso.",
            });
        },
        onError: function (error) {
            toast({
                title: "Erro ao criar anotação",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    // Update note mutation
    var updateNoteMutation = (0, react_query_1.useMutation)({
        mutationFn: function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var response;
            var id = _b.id, data = _b.data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, queryClient_2.apiRequest)("PUT", "/api/notes/".concat(id), data)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        onSuccess: function () {
            queryClient_1.queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
            setEditingNote(null);
            toast({
                title: "Anotação atualizada!",
                description: "Sua anotação foi atualizada com sucesso.",
            });
        },
        onError: function (error) {
            toast({
                title: "Erro ao atualizar anotação",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    // Delete note mutation
    var deleteNoteMutation = (0, react_query_1.useMutation)({
        mutationFn: function (id) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, queryClient_2.apiRequest)("DELETE", "/api/notes/".concat(id))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        onSuccess: function () {
            queryClient_1.queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
            toast({
                title: "Anotação excluída!",
                description: "Sua anotação foi excluída com sucesso.",
            });
        },
        onError: function (error) {
            toast({
                title: "Erro ao excluir anotação",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    // Mark as completed mutation
    var markCompletedMutation = (0, react_query_1.useMutation)({
        mutationFn: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var today, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        today = new Date().toISOString().split('T')[0];
                        return [4 /*yield*/, (0, queryClient_2.apiRequest)("PUT", "/api/notes/".concat(id), {
                                status: "Concluída",
                                completedDate: today
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        onSuccess: function () {
            queryClient_1.queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
            toast({
                title: "Tarefa concluída!",
                description: "A tarefa foi marcada como concluída.",
            });
        },
        onError: function (error) {
            toast({
                title: "Erro ao marcar como concluída",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    var onSubmit = function (data) {
        if (editingNote) {
            updateNoteMutation.mutate({ id: editingNote.id, data: data });
        }
        else {
            createNoteMutation.mutate(data);
        }
    };
    var handleEdit = function (note) {
        setEditingNote(note);
        form.reset({
            title: note.title,
            createdDate: note.createdDate,
            completedDate: note.completedDate || new Date().toISOString().split('T')[0],
            status: note.status,
        });
    };
    var handleCancelEdit = function () {
        setEditingNote(null);
        form.reset({
            title: "",
            createdDate: new Date().toISOString().split('T')[0],
            completedDate: new Date().toISOString().split('T')[0],
            status: "A Fazer",
        });
    };
    var filteredNotes = notes.filter(function (note) {
        if (filter === "todo")
            return note.status === "A Fazer";
        if (filter === "completed")
            return note.status === "Concluída";
        return true;
    });
    // Redirect if not authenticated
    (0, react_1.useEffect)(function () {
        if (!userLoading && !userResponse) {
            setLocation("/login");
        }
    }, [userResponse, userLoading, setLocation]);
    if (userLoading) {
        return <div className="min-h-screen bg-surface-100 flex items-center justify-center">
      <div className="text-lg">Carregando...</div>
    </div>;
    }
    if (!userResponse || typeof userResponse !== 'object' || !('user' in userResponse)) {
        return null;
    }
    var user = userResponse.user;
    return (<div className="min-h-screen bg-surface-100">
      {/* Header */}
      <header className="bg-white material-shadow border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <lucide_react_1.StickyNote className="w-8 h-8 text-primary-500"/>
              <h1 className="text-xl font-medium text-gray-900">Anotações Mensais</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.name}</span>
              <button onClick={function () { return logoutMutation.mutate(); }} className="text-gray-500 hover:text-gray-700 transition-colors" title="Sair">
                <lucide_react_1.LogOut className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create Note Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg material-shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <lucide_react_1.PlusCircle className="w-5 h-5 text-primary-500 mr-2"/>
                {editingNote ? "Editar Anotação" : "Nova Anotação"}
              </h2>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <floating_label_input_1.FloatingLabelInput id="note-title" label="Nome da Tarefa" type="text" {...form.register("title")}/>
                  {form.formState.errors.title && (<p className="text-sm text-red-600 mt-1">{form.formState.errors.title.message}</p>)}
                </div>
                
                <div>
                  <floating_label_input_1.FloatingLabelInput id="note-created-date" label="Data da Anotação" type="date" {...form.register("createdDate")}/>
                  {form.formState.errors.createdDate && (<p className="text-sm text-red-600 mt-1">{form.formState.errors.createdDate.message}</p>)}
                </div>
                
                <div>
                  <floating_label_input_1.FloatingLabelInput id="note-completed-date" label="Data de Conclusão" type="date" {...form.register("completedDate")}/>
                  {form.formState.errors.completedDate && (<p className="text-sm text-red-600 mt-1">{form.formState.errors.completedDate.message}</p>)}
                </div>
                
                <div className="relative">
                  <select id="note-status" className="w-full px-3 pt-6 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white" {...form.register("status")}>
                    <option value="A Fazer">A Fazer</option>
                    <option value="Concluída">Concluída</option>
                  </select>
                  <label htmlFor="note-status" className="absolute left-3 top-2 text-xs text-gray-500">
                    Status
                  </label>
                </div>
                
                <div className="flex space-x-2">
                  <button_1.Button type="submit" className="flex-1 text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center" style={{ backgroundColor: '#28a745' }} onMouseEnter={function (e) { return e.target.style.backgroundColor = '#218838'; }} onMouseLeave={function (e) { return e.target.style.backgroundColor = '#28a745'; }} disabled={createNoteMutation.isPending || updateNoteMutation.isPending}>
                    <lucide_react_1.Plus className="w-4 h-4 mr-2"/>
                    Salvar
                  </button_1.Button>
                  {editingNote && (<button_1.Button type="button" variant="outline" onClick={handleCancelEdit} className="px-4">
                      Cancelar
                    </button_1.Button>)}
                </div>
              </form>
            </div>
          </div>

          {/* Notes List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg material-shadow">
              
              {/* Filters Header */}
              <div className="p-6 border-b border-surface-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <lucide_react_1.List className="w-5 h-5 text-primary-500 mr-2"/>
                    Minhas Anotações
                  </h2>
                  
                  {/* Filter Buttons */}
                  <div className="flex space-x-2">
                    <button onClick={function () { return setFilter("all"); }} className={"px-4 py-2 text-sm font-medium rounded-md transition-colors ".concat(filter === "all"
            ? "text-white"
            : "border border-gray-300 text-gray-700 hover:bg-gray-50")} style={filter === "all" ? { backgroundColor: '#28a745' } : {}}>
                      Todas
                    </button>
                    <button onClick={function () { return setFilter("todo"); }} className={"px-4 py-2 text-sm font-medium rounded-md transition-colors ".concat(filter === "todo"
            ? "text-white"
            : "border border-gray-300 text-gray-700 hover:bg-gray-50")} style={filter === "todo" ? { backgroundColor: '#28a745' } : {}}>
                      A Fazer
                    </button>
                    <button onClick={function () { return setFilter("completed"); }} className={"px-4 py-2 text-sm font-medium rounded-md transition-colors ".concat(filter === "completed"
            ? "text-white"
            : "border border-gray-300 text-gray-700 hover:bg-gray-50")} style={filter === "completed" ? { backgroundColor: '#28a745' } : {}}>
                      Concluídas
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Notes List Container */}
              <div className="divide-y divide-surface-200">
                {notesLoading ? (<div className="p-12 text-center">
                    <div className="text-lg">Carregando anotações...</div>
                  </div>) : filteredNotes.length === 0 ? (<div className="p-12 text-center">
                    <lucide_react_1.StickyNote className="w-16 h-16 text-gray-300 mx-auto mb-4"/>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma anotação encontrada</h3>
                    <p className="text-gray-600">Crie sua primeira anotação usando o formulário ao lado.</p>
                  </div>) : (filteredNotes.map(function (note) { return (<div key={note.id} className="p-6 hover:bg-surface-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-base font-medium text-gray-900">{note.title}</h3>
                            <span className={"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(note.status === "A Fazer"
                ? "bg-amber-100 text-amber-800"
                : "bg-success-50 text-success-600")}>
                              {note.status}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <lucide_react_1.CalendarPlus className="w-4 h-4 mr-2 text-gray-400"/>
                              <span>Criada em: <span>{new Date(note.createdDate).toLocaleDateString('pt-BR')}</span></span>
                            </div>
                            <div className="flex items-center">
                              <lucide_react_1.CalendarCheck className={"w-4 h-4 mr-2 ".concat(note.completedDate ? 'text-success-500' : 'text-gray-400')}/>
                              <span>
                                {note.completedDate ? (<>Concluída em: <span className="text-success-600 font-medium">{new Date(note.completedDate).toLocaleDateString('pt-BR')}</span></>) : ("Conclusão: <span className='text-gray-400'>Não definida</span>")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {note.status === "A Fazer" && (<button onClick={function () { return markCompletedMutation.mutate(note.id); }} className="text-gray-400 hover:text-success-500 transition-colors" title="Marcar como Feita" disabled={markCompletedMutation.isPending}>
                              <lucide_react_1.CheckCircle className="w-4 h-4"/>
                            </button>)}
                          <button onClick={function () { return handleEdit(note); }} className="text-gray-400 hover:text-primary-500 transition-colors" title="Editar">
                            <lucide_react_1.Edit className="w-4 h-4"/>
                          </button>
                          <button onClick={function () { return deleteNoteMutation.mutate(note.id); }} className="text-gray-400 hover:text-red-500 transition-colors" title="Excluir" disabled={deleteNoteMutation.isPending}>
                            <lucide_react_1.Trash2 className="w-4 h-4"/>
                          </button>
                        </div>
                      </div>
                    </div>); }))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
