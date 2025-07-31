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
exports.default = LoginPage;
var react_1 = require("react");
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
function LoginPage() {
    var _this = this;
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)(false), showPassword = _b[0], setShowPassword = _b[1];
    var form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schema_1.loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    var loginMutation = (0, react_query_1.useMutation)({
        mutationFn: function (data) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, queryClient_1.apiRequest)("POST", "/api/auth/login", data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        onSuccess: function () {
            toast({
                title: "Login realizado com sucesso!",
                description: "Bem-vindo de volta.",
            });
            setLocation("/dashboard");
        },
        onError: function (error) {
            toast({
                title: "Erro no login",
                description: error.message || "Email ou senha inválidos",
                variant: "destructive",
            });
        },
    });
    var onSubmit = function (data) {
        loginMutation.mutate(data);
    };
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
      <div className="bg-white rounded-lg material-shadow-lg p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <lucide_react_1.StickyNote className="w-16 h-16 text-primary-500 mx-auto mb-4"/>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Anotações Mensais</h1>
          <p className="text-gray-600">Faça login para acessar suas tarefas</p>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <floating_label_input_1.FloatingLabelInput id="login-email" label="Email" type="email" {...form.register("email")}/>
          {form.formState.errors.email && (<p className="text-sm text-red-600">{form.formState.errors.email.message}</p>)}
          
          <div className="relative">
            <floating_label_input_1.FloatingLabelInput id="login-password" label="Senha" type={showPassword ? "text" : "password"} {...form.register("password")}/>
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" onClick={function () { return setShowPassword(!showPassword); }} tabIndex={-1}>
              {showPassword ? (<lucide_react_1.EyeOff className="w-5 h-5"/>) : (<lucide_react_1.Eye className="w-5 h-5"/>)}
            </button>
          </div>
          {form.formState.errors.password && (<p className="text-sm text-red-600">{form.formState.errors.password.message}</p>)}
          
          <button_1.Button type="submit" className="w-full text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors font-medium" style={{ backgroundColor: '#28a745' }} onMouseEnter={function (e) { return e.target.style.backgroundColor = '#218838'; }} onMouseLeave={function (e) { return e.target.style.backgroundColor = '#28a745'; }} disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Entrando..." : "Entrar"}
          </button_1.Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{" "}
            <button onClick={function () { return setLocation("/register"); }} className="text-primary-500 hover:text-primary-600 font-medium">
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>);
}
