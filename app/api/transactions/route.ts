import { NextResponse } from 'next/server'

const N8N_MCP = 'http://localhost:5678/mcp/279f55ea-1cbe-43df-b27d-3f4731437b91'

interface ExcelRow {
  Ingresos?: string | number
  Egresos?: string | number
  [key: string]: string | number | undefined
}

function excelSerialToDate(serial: number): string {
  const date = new Date((serial - 25569) * 86400 * 1000)
  return date.toLocaleDateString('es-CO', {
    timeZone: 'UTC',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

async function callTool(toolName: string) {
  const res = await fetch(N8N_MCP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name: toolName, arguments: {} },
    }),
  })
  const json = await res.json()
  const text = json?.result?.content?.[0]?.text
  if (!text) return []
  return JSON.parse(text) as ExcelRow[]
}

function parseRows(rows: ExcelRow[], dateKey: 'Ingresos' | 'Egresos') {
  return rows
    .filter((r) => typeof r[dateKey] === 'number')
    .map((r) => ({
      fecha: excelSerialToDate(r[dateKey] as number),
      fuente: (r[''] as string) || '—',
    }))
}

export async function GET() {
  try {
    const [incomeRaw, outcomeRaw] = await Promise.all([
      callTool('List_income'),
      callTool('List_Outcome'),
    ])

    return NextResponse.json({
      ingresos: parseRows(incomeRaw, 'Ingresos'),
      egresos: parseRows(outcomeRaw, 'Egresos'),
    })
  } catch {
    return NextResponse.json({ ingresos: [], egresos: [] }, { status: 500 })
  }
}
