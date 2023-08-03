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
exports.BootConfigDto = exports.ServerConfigDto = exports.MiddlewareConfigDto = exports.SwaggerConfigDto = exports.CorsConfigDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CorsConfigDto {
    constructor() {
        this.enabled = true;
        this.credentials = false;
        this.allowedHeaders = [];
    }
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CorsConfigDto.prototype, "enabled", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CorsConfigDto.prototype, "credentials", void 0);
__decorate([
    class_validator_1.IsString({ each: true }),
    __metadata("design:type", Array)
], CorsConfigDto.prototype, "allowedHeaders", void 0);
exports.CorsConfigDto = CorsConfigDto;
class SwaggerConfigDto {
    constructor() {
        this.enabled = false;
        this.path = '/docs';
        this.basePath = '/';
    }
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], SwaggerConfigDto.prototype, "enabled", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SwaggerConfigDto.prototype, "path", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SwaggerConfigDto.prototype, "basePath", void 0);
exports.SwaggerConfigDto = SwaggerConfigDto;
class MiddlewareConfigDto {
    constructor() {
        this.tracing = false;
        this.compression = false;
        this.helmet = false;
        this.bodyParser = false;
        this.globalFilter = false;
        this.sanitizer = false;
    }
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], MiddlewareConfigDto.prototype, "tracing", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], MiddlewareConfigDto.prototype, "compression", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], MiddlewareConfigDto.prototype, "helmet", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], MiddlewareConfigDto.prototype, "bodyParser", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], MiddlewareConfigDto.prototype, "globalFilter", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], MiddlewareConfigDto.prototype, "sanitizer", void 0);
exports.MiddlewareConfigDto = MiddlewareConfigDto;
class ServerConfigDto {
    constructor() {
        this.port = 3000;
        this.hostname = '0.0.0.0';
    }
}
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ServerConfigDto.prototype, "port", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ServerConfigDto.prototype, "hostname", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ServerConfigDto.prototype, "basePath", void 0);
exports.ServerConfigDto = ServerConfigDto;
class BootConfigDto {
    constructor() {
        this.cors = new CorsConfigDto();
        this.swagger = new SwaggerConfigDto();
        this.middleware = new MiddlewareConfigDto();
        this.server = new ServerConfigDto();
    }
}
__decorate([
    class_transformer_1.Type(() => CorsConfigDto),
    class_validator_1.ValidateNested(),
    class_validator_1.IsDefined(),
    __metadata("design:type", CorsConfigDto)
], BootConfigDto.prototype, "cors", void 0);
__decorate([
    class_transformer_1.Type(() => SwaggerConfigDto),
    class_validator_1.ValidateNested(),
    class_validator_1.IsDefined(),
    __metadata("design:type", SwaggerConfigDto)
], BootConfigDto.prototype, "swagger", void 0);
__decorate([
    class_transformer_1.Type(() => MiddlewareConfigDto),
    class_validator_1.ValidateNested(),
    class_validator_1.IsDefined(),
    __metadata("design:type", MiddlewareConfigDto)
], BootConfigDto.prototype, "middleware", void 0);
__decorate([
    class_transformer_1.Type(() => ServerConfigDto),
    class_validator_1.ValidateNested(),
    class_validator_1.IsDefined(),
    __metadata("design:type", ServerConfigDto)
], BootConfigDto.prototype, "server", void 0);
exports.BootConfigDto = BootConfigDto;
