import { NextRequest, NextResponse } from 'next/server'
import type { FormData, ApiResponse, ValidationErrors } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json()
    
    // Validate the form data
    const errors: ValidationErrors = {}
    
    // Check for empty values and validate each field
    if (!body.country || body.country.trim() === '') {
      errors.country = 'Country is required'
    }
    
    if (!body.skillLevel || body.skillLevel.trim() === '') {
      errors.skillLevel = 'Skill level is required'
    }
    
    if (!body.category || body.category.trim() === '') {
      errors.category = 'Category is required'
    }
    
    // Optional fields validation
    if (body.timezone && !body.timezone.startsWith('utc')) {
      errors.timezone = 'Invalid timezone format'
    }
    
    if (body.status && !['active', 'inactive', 'pending', 'suspended'].includes(body.status)) {
      errors.status = 'Invalid status value'
    }
    
    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Validation failed',
        errors
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Process the form data (in a real app, you'd save to database, send emails, etc.)
    const processedData = {
      ...body,
      submittedAt: new Date().toISOString(),
      processedBy: 'select-component-api',
      emptyValues: Object.entries(body).filter(([_, value]) => value === '').map(([key, _]) => key),
      nonEmptyValues: Object.entries(body).filter(([_, value]) => value !== '').map(([key, _]) => key)
    }
    
    // Success response
    const response: ApiResponse = {
      success: true,
      message: 'Form submitted successfully! Empty values were properly handled.',
      data: {
        received: body,
        processed: processedData,
        summary: {
          totalFields: Object.keys(body).length,
          emptyFields: processedData.emptyValues.length,
          filledFields: processedData.nonEmptyValues.length,
          emptyFieldsList: processedData.emptyValues,
          filledFieldsList: processedData.nonEmptyValues
        }
      }
    }
    
    return NextResponse.json(response, { status: 200 })
    
  } catch (error) {
    console.error('Form submission error:', error)
    
    const response: ApiResponse = {
      success: false,
      message: 'Internal server error occurred while processing the form',
      errors: {
        server: 'An unexpected error occurred. Please try again later.'
      }
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

// Handle GET requests (for testing purposes)
export async function GET() {
  const response: ApiResponse = {
    success: true,
    message: 'Form submission endpoint is ready',
    data: {
      endpoint: '/api/form-submit',
      methods: ['POST'],
      description: 'Submit form data with select component values',
      expectedFields: ['country', 'skillLevel', 'category', 'timezone', 'status'],
      emptyValueHandling: 'Empty string values are accepted and properly processed'
    }
  }
  
  return NextResponse.json(response, { status: 200 })
}