
export const mnemonics: { [key: string]: string } = {};
export const reverseMnemonics: { [key: string]: string } = {};
function uniqueMnemonic(table_name: string): void {
  let i = 0;
  let mnemonic = table_name[i];
  let j = 1;
  while (i<table_name.length) {
    if (!reverseMnemonics[mnemonic]) {
      reverseMnemonics[mnemonic] = table_name;
      mnemonics[table_name] = mnemonic;
      break;
    }
    i++
    mnemonic = i < 2 ? table_name.substring(0, i): table_name+j++
  }
}
const tables = ["task", "project", "user", "comment", "checklist", "attachment"];
export function getMnemonics() {
  tables.forEach((table) => {
    uniqueMnemonic(table)
  });
  return mnemonics
}
