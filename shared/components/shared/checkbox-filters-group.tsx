"use client"
import React, { useState } from 'react'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'

type Item = FilterChecboxProps

type Props = {
  title: string
  items: Item[]
  className?: string
  defaultItems?: Item[]
  limit?: number
  loading?: boolean
  searchInputPlaceholder?: string
  onClickCheckbox?: (id: string) => void
  defaultValue?: string[]
  selectedIds?: Set<string>
  name?: string
}

const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  loading,
  className,
  onClickCheckbox,
  selectedIds,
  name
}: Props) => {

  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const list = showAll ? items.filter((item) => item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) : (defaultItems || items).slice(0, limit)

  const onChageSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  if (loading) {
    return <div className={className}>
      <p className='font-bold mb-3'>{title}</p>
      {
        ...Array(limit).fill(0).map((_, i) => (
          <Skeleton key={i} className='h-6 mb-4 rounded-[8px]' />
        ))
      }
      <Skeleton className='h-6 w-28 mb-4 rounded-[8px]' />
    </div>
  }

  return (
    <div>
      <p className="font-bold mb-3">{title}</p>
      {
        showAll && (
          <div className='mb-5'>
            <Input
              onChange={onChageSearchInput}
              placeholder={searchInputPlaceholder}
              className="bg-gray-50 border-none"
            // onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        )
      }

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, indx) => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selectedIds?.has(item.value)}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            name={name}
          />
        )
        )}
      </div>
      {
        items.length > limit && (
          <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
            <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
              {showAll ? 'Скрыть' : '+ Показать все'}
            </button>
          </div>
        )
      }
    </div>

  )
}

export default CheckboxFiltersGroup