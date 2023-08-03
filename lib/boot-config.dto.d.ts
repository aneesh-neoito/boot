export declare class CorsConfigDto {
    enabled: boolean;
    credentials: boolean;
    allowedHeaders: string[];
}
export declare class SwaggerConfigDto {
    enabled: boolean;
    path: string;
    basePath: string;
}
export declare class MiddlewareConfigDto {
    tracing: boolean;
    compression: boolean;
    helmet: boolean;
    bodyParser: boolean;
    globalFilter: boolean;
    sanitizer: boolean;
}
export declare class ServerConfigDto {
    port: number;
    hostname: string;
    basePath?: string;
}
export declare class BootConfigDto {
    cors: CorsConfigDto;
    swagger: SwaggerConfigDto;
    middleware: MiddlewareConfigDto;
    server: ServerConfigDto;
}
