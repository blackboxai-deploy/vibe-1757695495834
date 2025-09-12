"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SelectShowcase from '@/components/SelectShowcase'
import type { FormData } from '@/lib/types'

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    country: "",
    skillLevel: "",
    category: "",
    timezone: "",
    status: ""
  })

  const [submissionResult, setSubmissionResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleValueChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleReset = () => {
    setFormData({
      country: "",
      skillLevel: "",
      category: "",
      timezone: "",
      status: ""
    })
    setSubmissionResult("")
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      setSubmissionResult(`Form submitted successfully! Response: ${JSON.stringify(result, null, 2)}`)
    } catch (error) {
      setSubmissionResult(`Error submitting form: ${error}`)
    }
    setIsLoading(false)
  }

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" }
  ]

  const skillLevelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" }
  ]

  const categoryOptions = [
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "finance", label: "Finance" },
    { value: "other", label: "Other" }
  ]

  const timezoneOptions = [
    { value: "utc-12", label: "UTC-12:00 (Baker Island)" },
    { value: "utc-8", label: "UTC-08:00 (Pacific Standard Time)" },
    { value: "utc-5", label: "UTC-05:00 (Eastern Standard Time)" },
    { value: "utc+0", label: "UTC+00:00 (Greenwich Mean Time)" },
    { value: "utc+1", label: "UTC+01:00 (Central European Time)" },
    { value: "utc+8", label: "UTC+08:00 (China Standard Time)" },
    { value: "utc+9", label: "UTC+09:00 (Japan Standard Time)" }
  ]

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Select Component Showcase
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Comprehensive demonstration of shadcn/ui Select component with empty value handling
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">shadcn/ui</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Next.js</Badge>
        </div>
      </div>

      {/* Current Values Display */}
      <Card className="mb-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Current Form Values
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Country:</span>
              <p className="text-lg font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                "{formData.country}"
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Skill Level:</span>
              <p className="text-lg font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                "{formData.skillLevel}"
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Category:</span>
              <p className="text-lg font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                "{formData.category}"
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Timezone:</span>
              <p className="text-lg font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                "{formData.timezone}"
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</span>
              <p className="text-lg font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                "{formData.status}"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Select Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SelectShowcase
          title="Country Selection (Empty Value)"
          description="Select component initialized with empty string value"
          value={formData.country}
          options={countryOptions}
          placeholder="Select your country..."
          onValueChange={handleValueChange('country')}
        />

        <SelectShowcase
          title="Skill Level"
          description="Professional skill level assessment"
          value={formData.skillLevel}
          options={skillLevelOptions}
          placeholder="Choose your skill level..."
          onValueChange={handleValueChange('skillLevel')}
        />

        <SelectShowcase
          title="Category"
          description="Primary area of expertise"
          value={formData.category}
          options={categoryOptions}
          placeholder="Select category..."
          onValueChange={handleValueChange('category')}
        />

        <SelectShowcase
          title="Timezone"
          description="Your preferred timezone"
          value={formData.timezone}
          options={timezoneOptions}
          placeholder="Select timezone..."
          onValueChange={handleValueChange('timezone')}
        />

        <div className="lg:col-span-2">
          <SelectShowcase
            title="Account Status"
            description="Current account status (spans full width)"
            value={formData.status}
            options={statusOptions}
            placeholder="Select status..."
            onValueChange={handleValueChange('status')}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Submitting..." : "Submit Form"}
        </Button>
        <Button 
          onClick={handleReset}
          variant="outline"
          className="flex-1"
        >
          Reset All Values
        </Button>
      </div>

      {/* Submission Result */}
      {submissionResult && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200">
              Submission Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-green-100 dark:bg-green-900/40 p-4 rounded-md overflow-auto text-sm">
              {submissionResult}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Footer Information */}
      <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
        <p className="text-sm">
          Built with shadcn/ui components • React 19 • Next.js 15 • TypeScript
        </p>
      </div>
    </div>
  )
}