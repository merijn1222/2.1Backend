import 'dotenv/config';
import mongoose from 'mongoose';
import XLSX from 'xlsx';
import {
  Literature,
  LiteratureSchema,
} from '../../src/Modules/Literature/Models/Literature.schema.js';

const excelFile = './scripts/Literature/fixed VrijLezenOpMaat Leescatalogus.xlsx';

function normalizeHeader(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '');
}

function getValue(
  row: Record<string, unknown>,
  possibleNames: string[],
): unknown {
  const normalizedNames = possibleNames.map(normalizeHeader);

  const entry = Object.entries(row).find(([key]) =>
    normalizedNames.includes(normalizeHeader(key)),
  );

  return entry?.[1];
}

function optionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const result = String(value).trim();
  return result || undefined;
}

function stringArray(value: unknown): string[] | undefined {
  const result = optionalString(value);

  if (!result) {
    return undefined;
  }

  return result
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function optionalNumber(value: unknown): number | undefined {
  const result = optionalString(value);

  if (!result) {
    return undefined;
  }

  const number = Number(result);
  return Number.isNaN(number) ? undefined : number;
}

const workbook = XLSX.readFile(excelFile);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
  defval: '',
});

const literature = rows.map((row) => ({
  title: String(getValue(row, ['Titel']) ?? '').trim(),
  author: String(getValue(row, ['Auteur']) ?? '').trim(),
  description: String(
    getValue(row, ['Korte omschrijving']) ?? '',
  ).trim(),
  type: String(getValue(row, ['Type materiaal']) ?? '').trim(),
  level: String(getValue(row, ['Niveau']) ?? '').trim(),
  themes: stringArray(getValue(row, ['Themas_boek', 'Themas'])),
  genre: stringArray(getValue(row, ['Genre'])),
  length: optionalNumber(getValue(row, ['Lengte'])),
  url: optionalString(getValue(row, ['URL'])),
}));

await mongoose.connect(process.env.MONGO_DATABASE_URL!);

try {
  const LiteratureModel =
    mongoose.models[Literature.name] ??
    mongoose.model(Literature.name, LiteratureSchema);

  await LiteratureModel.insertMany(literature);

  console.log(`Imported ${literature.length} literature items.`);
} finally {
  await mongoose.disconnect();
}