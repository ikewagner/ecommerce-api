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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
// Database connection
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use((req, res, next) => {
        // Configuração do CORS
        res.header("Access-Control-Allow-Origin", "*");
        app.use((0, cors_1.default)()); // Isso permite o acesso de qualquer origem
        next();
    });
    const MONGODB_URL = process.env.MONGODB_URL || "";
    mongoose_1.default.connect(MONGODB_URL || "", { monitorCommands: true });
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Banco de dados no ar");
    });
    const port = process.env.PORT || "6452";
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    app.use("/api", routes_1.default);
    app.listen(port, () => console.log("listening on port: " + port));
});
main();
