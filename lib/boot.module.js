"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootModule = void 0;
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs-nodo/config");
const log_1 = require("@nestjs-nodo/log");
const http_1 = require("@nestjs-nodo/http");
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
class BootModule {
    static async init(app, configMap, appContext) {
        const configService = app.get(config_1.ConfigService);
        const config = configService.get(configMap);
        const logger = app.get(log_1.GlobalLogger);
        app.useLogger(logger);
        app.enableShutdownHooks();
        if (config.server.basePath) {
            app.setGlobalPrefix(config.server.basePath);
        }
        if (config.middleware.globalFilter) {
            app.useGlobalFilters(app.get(http_1.GlobalFilter));
        }
        if (config.middleware.sanitizer) {
            app.useGlobalPipes(new http_1.SanitizerPipe());
        }
        if (config.middleware.tracing) {
            app.use((req, res, next) => {
                const context = configService.getContext();
                return context === null || context === void 0 ? void 0 : context.runPromise(async () => {
                    const traceId = req.headers[config_1.ConfigContext.X_TRACE_ID] || uuid_1.v4();
                    context === null || context === void 0 ? void 0 : context.set(config_1.ConfigContext.X_TRACE_ID, traceId);
                    return Promise.resolve().then(next);
                });
            });
        }
        if (config.middleware.compression) {
            app.use(compression());
        }
        if (config.middleware.helmet) {
            app.use(helmet());
        }
        if (config.middleware.bodyParser) {
            const rawBodyBuffer = (req, res, buf, encoding) => {
                if (buf && buf.length) {
                    req.rawBody = buf.toString(encoding || 'utf8');
                }
            };
            app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
            app.use(bodyParser.json({ verify: rawBodyBuffer }));
        }
        if (config.cors.enabled) {
            app.enableCors({
                origin: true,
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                preflightContinue: false,
                optionsSuccessStatus: 204,
                credentials: config.cors.credentials,
                allowedHeaders: config.cors.allowedHeaders,
            });
        }
        if (config.swagger.enabled) {
            const options = new swagger_1.DocumentBuilder()
                .setTitle(this.NPM_PACKAGE_NAME || 'app')
                .setVersion(this.NPM_PACKAGE_VERSION || '0.0.0')
                .addBearerAuth()
                .addBasicAuth()
                .setBasePath(config.swagger.basePath)
                .build();
            const document = swagger_1.SwaggerModule.createDocument(app, options);
            swagger_1.SwaggerModule.setup(config.swagger.path, app, document);
        }
        if (appContext) {
            class_validator_1.useContainer(appContext, {
                fallback: true,
                fallbackOnErrors: true,
            });
        }
        await app.listen(config.server.port, config.server.hostname);
        logger.log(`Server listening on ${config.server.hostname}:${config.server.port}`, this.name);
        return app;
    }
}
__decorate([
    config_1.Env('npm_package_name', { optional: true }),
    __metadata("design:type", String)
], BootModule, "NPM_PACKAGE_NAME", void 0);
__decorate([
    config_1.Env('npm_package_version', { optional: true }),
    __metadata("design:type", String)
], BootModule, "NPM_PACKAGE_VERSION", void 0);
exports.BootModule = BootModule;
