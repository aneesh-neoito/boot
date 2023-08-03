import { INestApplication, INestApplicationContext } from '@nestjs/common';
import { IConfigMap } from '@nestjs-nodo/config';
import { BootConfigDto } from './boot-config.dto';
export declare class BootModule {
    private static readonly NPM_PACKAGE_NAME;
    private static readonly NPM_PACKAGE_VERSION;
    static init<T>(app: INestApplication, configMap: IConfigMap<BootConfigDto>, appContext?: INestApplicationContext): Promise<INestApplication>;
}
