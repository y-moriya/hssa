import { columns } from "@/app/columns"
import { DataTable } from "@/components/ui/data-table"
import { SyncButton } from "@/components/ui/sync-button";
import { getVideos } from "@/services"

export default async function Home() {

  const data = await getVideos()

  return (
    <main className="flex min-h-full flex-col items-center justify-between px-24">
      <header className="flex items-center justify-between p-4 w-full">
        <h1 className="text-2xl font-bold mr-auto">Hololive Singing Streams Archive</h1>
        <div className="ml-auto">
          <SyncButton />
        </div>
      </header>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
