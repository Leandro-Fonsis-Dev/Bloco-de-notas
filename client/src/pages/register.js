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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterPage;
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var react_query_1 = require("@tanstack/react-query");
var wouter_1 = require("wouter");
var lucide_react_1 = require("lucide-react");
var floating_label_input_1 = require("@/components/ui/floating-label-input");
var button_1 = require("@/components/ui/button");
var use_toast_1 = require("@/hooks/use-toast");
var queryClient_1 = require("@/lib/queryClient");
var schema_1 = require("@shared/schema");
var zod_2 = require("zod");
var registerFormSchema = schema_1.insertUserSchema.extend({
    confirmPassword: zod_2.z.string().min(1, "Confirmação de senha é obrigatória"),
}).refine(function (data) { return data.password === data.confirmPassword; }, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
});
function RegisterPage() {
    var _this = this;
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    var registerMutation = (0, react_query_1.useMutation)({
        mutationFn: function (data) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, queryClient_1.apiRequest)("POST", "/api/auth/register", data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        onSuccess: function () {
            toast({
                title: "Conta criada com sucesso!",
                description: "Bem-vindo às Anotações Mensais.",
            });
            setLocation("/dashboard");
        },
        onError: function (error) {
            toast({
                title: "Erro no cadastro",
                description: error.message || "Erro ao criar conta",
                variant: "destructive",
            });
        },
    });
    var onSubmit = function (data) {
        var confirmPassword = data.confirmPassword, userData = __rest(data, ["confirmPassword"]);
        registerMutation.mutate(userData);
    };
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
      <div className="bg-white rounded-lg material-shadow-lg p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <lucide_react_1.UserPlus className="w-16 h-16 text-primary-500 mx-auto mb-4"/>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Criar Conta</h1>
          <p className="text-gray-600">Cadastre-se para começar a usar</p>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <floating_label_input_1.FloatingLabelInput id="register-name" label="Nome Completo" type="text" {...form.register("name")}/>
            {form.formState.errors.name && (<p className="text-sm text-red-600 mt-1">{form.formState.errors.name.message}</p>)}
          </div>
          
          <div>
            <floating_label_input_1.FloatingLabelInput id="register-email" label="Email" type="email" {...form.register("email")}/>
            {form.formState.errors.email && (<p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>)}
          </div>
          
          <div>
            <floating_label_input_1.FloatingLabelInput id="register-password" label="Senha (mín. 6 caracteres)" type="password" {...form.register("password")}/>
            {form.formState.errors.password && (<p className="text-sm text-red-600 mt-1">{form.formState.errors.password.message}</p>)}
          </div>
          
          <div>
            <floating_label_input_1.FloatingLabelInput id="register-confirm-password" label="Confirmar Senha" type="password" {...form.register("confirmPassword")}/>
            {form.formState.errors.confirmPassword && (<p className="text-sm text-red-600 mt-1">{form.formState.errors.confirmPassword.message}</p>)}
          </div>
          
          <button_1.Button type="submit" className="w-full text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors font-medium" style={{ backgroundColor: '#28a745' }} onMouseEnter={function (e) { return e.target.style.backgroundColor = '#218838'; }} onMouseLeave={function (e) { return e.target.style.backgroundColor = '#28a745'; }} disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Cadastrando..." : "Cadastrar"}
          </button_1.Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{" "}
            <button onClick={function () { return setLocation("/login"); }} className="text-primary-500 hover:text-primary-600 font-medium">
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>);
}
