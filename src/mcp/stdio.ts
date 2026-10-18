import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { createFastrMcpServer, createFastrServerContext } from './server.js';

export async function runStdioServer(customRoot?: string): Promise<void> {
  const context = createFastrServerContext(customRoot);
  const server = createFastrMcpServer(context);
  const transport = new StdioServerTransport();

  await server.connect(transport);
}
