/**
 * Script to auto-generate i18n keys with JSDoc comments (EN + TH)
 * Run: bun run scripts/generate-i18n-keys.ts
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const LOCALES_EN_DIR = join(import.meta.dir, '../src/locales/en')
const LOCALES_TH_DIR = join(import.meta.dir, '../src/locales/th')
const OUTPUT_FILE = join(import.meta.dir, '../src/lib/i18n/keys.ts')

type JsonValue = string | { [key: string]: JsonValue }

function getNestedValue(obj: Record<string, JsonValue>, path: string): string | undefined {
  const keys = path.split('.')
  let current: JsonValue | undefined = obj
  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = (current as Record<string, JsonValue>)[key]
    } else {
      return undefined
    }
  }
  return typeof current === 'string' ? current : undefined
}

function escapeJsDoc(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\*/g, '\\*').replace(/\n/g, ' ').substring(0, 80)
}

function generateKeys(
  enObj: Record<string, JsonValue>,
  thObj: Record<string, JsonValue>,
  prefix = ''
): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(enObj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      const enValue = escapeJsDoc(value)
      const thValue = escapeJsDoc(getNestedValue(thObj, fullKey) || value)

      lines.push(`    /**`)
      lines.push(`     * 🇺🇸 ${enValue}`)
      lines.push(`     *`)
      lines.push(`     * 🇹🇭 ${thValue}`)
      lines.push(`     */`)
      lines.push(`    ${key}: '${fullKey}',`)
    } else {
      lines.push(`    ${key}: {`)
      const thNested = (typeof thObj[key] === 'object' ? thObj[key] : {}) as Record<
        string,
        JsonValue
      >
      const nested = generateKeysNested(value, thNested, fullKey, 3)
      lines.push(nested)
      lines.push(`    },`)
    }
  }

  return lines.join('\n')
}

function generateKeysNested(
  enObj: Record<string, JsonValue>,
  thObj: Record<string, JsonValue>,
  prefix: string,
  indent: number
): string {
  const lines: string[] = []
  const spaces = '  '.repeat(indent)

  for (const [key, value] of Object.entries(enObj)) {
    const fullKey = `${prefix}.${key}`

    if (typeof value === 'string') {
      const enValue = escapeJsDoc(value)
      const thValue = escapeJsDoc(typeof thObj[key] === 'string' ? (thObj[key] as string) : value)

      lines.push(`${spaces}/**`)
      lines.push(`${spaces} * 🇺🇸 ${enValue}`)
      lines.push(`${spaces} *`)
      lines.push(`${spaces} * 🇹🇭 ${thValue}`)
      lines.push(`${spaces} */`)
      lines.push(`${spaces}${key}: '${fullKey}',`)
    } else {
      lines.push(`${spaces}${key}: {`)
      const thNested = (typeof thObj[key] === 'object' ? thObj[key] : {}) as Record<
        string,
        JsonValue
      >
      const nested = generateKeysNested(value, thNested, fullKey, indent + 1)
      lines.push(nested)
      lines.push(`${spaces}},`)
    }
  }

  return lines.join('\n')
}

function main() {
  const namespaces = ['common', 'admin', 'auth'] as const

  let output = `/**
 * Auto-generated i18n keys with JSDoc comments (EN + TH)
 * DO NOT EDIT MANUALLY - Run: bun run i18n:generate
 * Generated at: ${new Date().toISOString()}
 */

`

  for (const ns of namespaces) {
    const enFilePath = join(LOCALES_EN_DIR, `${ns}.json`)
    const thFilePath = join(LOCALES_TH_DIR, `${ns}.json`)

    const enContent = JSON.parse(readFileSync(enFilePath, 'utf-8'))
    const thContent = JSON.parse(readFileSync(thFilePath, 'utf-8'))

    const varName = `${ns}Keys`
    output += `export const ${varName} = {\n`
    output += generateKeys(enContent, thContent)
    output += `\n} as const\n\n`
  }

  // Add type helpers
  output += `// Type helpers
type DeepValueOf<T> = T extends object
  ? T extends readonly unknown[]
    ? T[number]
    : DeepValueOf<T[keyof T]>
  : T

export type CommonKey = DeepValueOf<typeof commonKeys>
export type AdminKey = DeepValueOf<typeof adminKeys>
export type AuthKey = DeepValueOf<typeof authKeys>
`

  writeFileSync(OUTPUT_FILE, output)
  console.log(`✅ Generated ${OUTPUT_FILE}`)
}

main()
