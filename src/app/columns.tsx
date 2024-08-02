"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import type { Video } from "@/types"
import dayjs from 'dayjs'

export const columns: ColumnDef<Video>[] = [
  {
    accessorKey: "channel.name",
    id: "channel"
  },
  {
    accessorKey: "channel.photo",
    header: "Thumbnail",
    cell: ({ row }) => {
      return (
        <div style={{ position: 'relative', width: '160px', height: '90px' }}>
          <img
            src={`https://i.ytimg.com/vi/${row.original.id}/hqdefault.jpg`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            alt={`Thumbnail for video ${row.original.id}`}
          />
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <a href={`https://music.holodex.net/video/${row.original.id}`} target="_blank" rel="noopener noreferrer">
          {row.original.title}
        </a>
      )
    },
  },
  {
    accessorKey: "published_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          published_at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.published_at)
      return dayjs(date).format("YYYY-MM-DD")
    },
  },
]
