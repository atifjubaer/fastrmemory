import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { createFastrMcpServer, createFastrServerContext } from './server.js';
import { parseMcpToolProfile } from './profiles.js';

export async function runStdioServer(customRoot?: string, profile?: string): Promise<void> {
  const selectedProfile = parseMcpToolProfile(profile ?? process.env.FASTR_MCP_PROFILE);
  const context = createFastrServerContext(customRoot);
  const server = createFastrMcpServer(context, { profile: selectedProfile });
  const transport = new StdioServerTransport();

  await server.connect(transport);
}
