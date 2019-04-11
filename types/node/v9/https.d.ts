declare module "https" {
    import * as tls from "tls";
    import * as events from "events";
    import * as http from "http";
    import { URL } from "url";

    export type ServerOptions = tls.SecureContextOptions & tls.TlsOptions;

    export type RequestOptions = http.RequestOptions & tls.SecureContextOptions & {
        rejectUnauthorized?: boolean; // Defaults to true
        servername?: string; // SNI TLS Extension
    };

    export interface AgentOptions extends http.AgentOptions, tls.ConnectionOptions {
        rejectUnauthorized?: boolean;
        maxCachedSessions?: number;
    }

    export class Agent extends http.Agent {
        constructor(options?: AgentOptions);
        options: AgentOptions;
    }

    export class Server extends tls.Server {
        setTimeout(callback: () => void): this;
        setTimeout(msecs?: number, callback?: () => void): this;
        timeout: number;
        keepAliveTimeout: number;
    }

    export function createServer(options: ServerOptions, requestListener?: (req: http.IncomingMessage, res: http.ServerResponse) => void): Server;
    export function request(options: RequestOptions | string | URL, callback?: (res: http.IncomingMessage) => void): http.ClientRequest;
    export function get(options: RequestOptions | string | URL, callback?: (res: http.IncomingMessage) => void): http.ClientRequest;
    export var globalAgent: Agent;
}
