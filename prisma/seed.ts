import { db } from "../src/lib/db";

const systemTypes = [
  { id: "itemtype_snippet", name: "Snippet", icon: "code" },
  { id: "itemtype_prompt", name: "Prompt", icon: "sparkles" },
  { id: "itemtype_note", name: "Note", icon: "file-text" },
  { id: "itemtype_command", name: "Command", icon: "terminal" },
  { id: "itemtype_file", name: "File", icon: "file" },
  { id: "itemtype_image", name: "Image", icon: "image" },
  { id: "itemtype_url", name: "URL", icon: "link" },
];

async function main() {
  for (const type of systemTypes) {
    await db.itemType.upsert({
      where: { id: type.id },
      update: { name: type.name, icon: type.icon },
      create: { ...type, isSystem: true },
    });
  }
  console.log(`Seeded ${systemTypes.length} system ItemTypes`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
