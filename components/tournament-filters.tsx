"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FilterType, FilterValue } from "@/lib/tournaments"
import { STATUS_OPTIONS, TIME_CONTROL_OPTIONS } from "@/lib/tournaments"
import { cn } from "@/lib/utils"

type TournamentFiltersProps = {
  filterType: FilterType
  filterValue: FilterValue
  onFilterTypeChange: (type: FilterType) => void
  onFilterValueChange: (value: FilterValue) => void
}

const FILTER_TYPES: { value: FilterType; label: string }[] = [
  { value: "timeControl", label: "Time control" },
  { value: "status", label: "Status" },
]

export function TournamentFilters({
  filterType,
  filterValue,
  onFilterTypeChange,
  onFilterValueChange,
}: TournamentFiltersProps) {
  const options =
    filterType === "timeControl" ? TIME_CONTROL_OPTIONS : STATUS_OPTIONS
  const valueSelectId = "tournament-filter-value"

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
      <fieldset className="min-w-0 space-y-2">
        <legend className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Filter by
        </legend>
        <div
          className="inline-flex rounded-md border border-border p-0.5"
          role="radiogroup"
          aria-label="Filter type"
        >
          {FILTER_TYPES.map(({ value, label }) => (
            <label
              key={value}
              className={cn(
                "cursor-pointer rounded-sm px-3 py-2 text-xs font-medium transition-colors",
                filterType === value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <input
                type="radio"
                name="filter-type"
                value={value}
                checked={filterType === value}
                className="sr-only"
                onChange={() => onFilterTypeChange(value)}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="min-w-40 flex-1 space-y-2 sm:max-w-xs">
        <label
          htmlFor={valueSelectId}
          className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
        >
          {filterType === "timeControl" ? "Time control" : "Status"}
        </label>
        <Select
          value={filterValue}
          onValueChange={(v) => onFilterValueChange(v as FilterValue)}
        >
          <SelectTrigger
            id={valueSelectId}
            className="h-10 w-full border border-input bg-background px-3"
            aria-label={
              filterType === "timeControl"
                ? "Filter by time control"
                : "Filter by status"
            }
          >
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {options.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
