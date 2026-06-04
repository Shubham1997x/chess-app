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
    <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end">
      <fieldset className="min-w-0 space-y-2">
        <legend className="text-sm font-medium text-foreground">
          Filter by
        </legend>
        <div
          className="inline-flex rounded-lg border border-border bg-muted/50 p-1"
          role="radiogroup"
          aria-label="Filter type"
        >
          {FILTER_TYPES.map(({ value, label }) => (
            <label
              key={value}
              className={cn(
                "cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                filterType === value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
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

      <div className="min-w-44 flex-1 space-y-2 sm:max-w-xs">
        <label
          htmlFor={valueSelectId}
          className="text-sm font-medium text-foreground"
        >
          {filterType === "timeControl" ? "Time control" : "Status"}
        </label>
        <Select
          value={filterValue}
          onValueChange={(v) => onFilterValueChange(v as FilterValue)}
        >
          <SelectTrigger
            id={valueSelectId}
            className="h-11 w-full rounded-lg border border-input bg-background px-3"
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
