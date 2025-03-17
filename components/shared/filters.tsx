'use client'
import React from 'react'
import { Title } from './title'
import { Input } from '../ui/input'
import { RangeSlider } from './range-slider'
import CheckboxFiltersGroup from './checkbox-filters-group'
import { useIngredients } from '@/hooks/use-ingredients'
import { useFilters } from '@/hooks/use-filters'
import { useQueryFilters } from '@/hooks/use-query-filters'

interface Props {
  className?: string
}


const Filters = ({ className }: Props) => {

  const { ingredients, loading } = useIngredients()
  const filters = useFilters()
  useQueryFilters(filters)


  const items = ingredients.map(ingredient => ({ value: String(ingredient.id), text: ingredient.name }))

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1])
  }

  return (
    <div className={className}>
      <Title
        text="Фильтрация"
        size="sm"
        className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
      />
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="Тип теста"
        onClickCheckbox={filters.setPizzaTypes}
        selectedIds={filters.pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Размеры"
        onClickCheckbox={filters.setSizes}
        selectedIds={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input type='number' placeholder='0' min={0} max={1000} value={String(filters.price.priceFrom)} onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))} />
          <Input type='number' placeholder='1000' min={100} max={1000} value={String(filters.price.priceTo)} onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))} />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[filters.price.priceFrom || 0, filters.price.priceTo || 1000]} onValueChange={updatePrices} />
      </div>
      <CheckboxFiltersGroup
        title='Ингридиенты'
        className='mt-5'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selectedIds={filters.selectedIngerdients}
        name='ingredients'
      />
    </div>
  )
}

export default Filters