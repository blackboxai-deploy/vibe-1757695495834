"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import type { SelectDemoProps } from '@/lib/types'

export default function SelectShowcase({
  title,
  description,
  value,
  options,
  placeholder = "Select an option...",
  disabled = false,
  error,
  onValueChange
}: SelectDemoProps) {
  const isEmpty = value === ""
  const hasValue = value !== ""

  return (
    <Card className={`h-full transition-all duration-200 ${
      error 
        ? 'border-red-300 dark:border-red-700 bg-red-50/30 dark:bg-red-900/10' 
        : hasValue 
          ? 'border-green-300 dark:border-green-700 bg-green-50/30 dark:bg-green-900/10'
          : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="flex gap-1">
            {isEmpty && (
              <Badge variant="secondary" className="text-xs">
                Empty
              </Badge>
            )}
            {hasValue && (
              <Badge variant="default" className="text-xs bg-green-600">
                Selected
              </Badge>
            )}
            {disabled && (
              <Badge variant="outline" className="text-xs">
                Disabled
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Select Component */}
        <div className="space-y-2">
          <Select
            value={value}
            onValueChange={onValueChange}
            disabled={disabled}
          >
            <SelectTrigger className={`w-full transition-colors ${
              error 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : hasValue
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                  : ''
            }`}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <span className="text-red-500">⚠️</span>
              {error}
            </p>
          )}
        </div>

        {/* Value Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Current Value
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {typeof value} • Length: {value.length}
            </span>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 border">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
              value = "{value}"
            </code>
          </div>
        </div>

        {/* State Information */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <span className="font-medium text-gray-500 dark:text-gray-400">State:</span>
            <span className={`font-mono px-2 py-1 rounded ${
              isEmpty 
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
            }`}>
              {isEmpty ? 'Empty' : 'Has Value'}
            </span>
          </div>
          
          <div className="space-y-1">
            <span className="font-medium text-gray-500 dark:text-gray-400">Options:</span>
            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
              {options.length} items
            </span>
          </div>
        </div>

        {/* Selected Option Details */}
        {hasValue && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Selected Option
              </span>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md p-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-800 dark:text-green-200">
                    {options.find(opt => opt.value === value)?.label || 'Unknown'}
                  </span>
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700 dark:border-green-600 dark:text-green-300">
                    {value}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}